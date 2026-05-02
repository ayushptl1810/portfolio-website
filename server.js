import express from "express";
import cors from "cors";
import { fileURLToPath, pathToFileURL } from "url";
import { dirname, join } from "path";
import fs from "fs/promises";
import helmet from "helmet";
import { rateLimit } from "express-rate-limit";
import contactHandler from "./src/server/contactHandler.js";
import llmHandler from "./src/server/llmHandler.js";
import spotifyHandler from "./src/server/spotifyHandler.js";
import dotenv from "dotenv";
import { Resend } from "resend";

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;
const DEPLOYED_URL = process.env.DEPLOYED_URL || "https://ayush.info";

// Security Headers
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'", "https://unpkg.com", "https://api.fontshare.com"],
        styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com", "https://api.fontshare.com"],
        imgSrc: ["'self'", "data:", "https:", "blob:"],
        connectSrc: [
          "'self'", 
          "https://prod.spline.design", 
          "https://api.github.com", 
          "https://raw.githubusercontent.com",
          "https://events.spline.design",
          "https://*.google-analytics.com",
          "https://*.analytics.google.com"
        ],
        fontSrc: ["'self'", "https://fonts.gstatic.com", "https://api.fontshare.com"],
        objectSrc: ["'none'"],
        mediaSrc: ["'self'"],
        frameSrc: ["'self'", "https://www.youtube.com", "https://player.vimeo.com"],
        workerSrc: ["'self'", "blob:"],
      },
    },
    crossOriginEmbedderPolicy: false,
  })
);

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(join(__dirname, "dist")));

// --- Helpers for LLM system prompt composition ---
const readTextFile = async (p) => {
  try {
    return await fs.readFile(p, "utf8");
  } catch {
    return "";
  }
};

const normalize = (s = "") => s.toLowerCase().replace(/\s+/g, " ").trim();

const detectProjectByName = async (query) => {
  try {
    const projectListPath = join(__dirname, "src", "utils", "ProjectList.js");
    const { default: ProjectList } = await import(
      pathToFileURL(projectListPath).href
    );
    const q = normalize(query);
    let match = null;
    for (const proj of ProjectList || []) {
      const name = normalize(proj?.name || "");
      const repo = normalize(proj?.repo || "");
      if (!name && !repo) continue;
      if (q.includes(name) || (repo && q.includes(repo))) {
        match = proj;
        break;
      }
    }
    return match;
  } catch (e) {
    return null;
  }
};

const fetchProjectReadme = async (owner, repo) => {
  console.log("README: start", { owner, repo });
  // 1) Try the existing client util first
  try {
    if (typeof globalThis.atob !== "function") {
      globalThis.atob = (b64) => Buffer.from(b64, "base64").toString("binary");
    }
    const utilUrl = pathToFileURL(
      join(__dirname, "src", "hooks", "useReadme.js")
    ).href;
    const readmeUtil = await import(utilUrl);
    const { content } = await readmeUtil.fetchReadme(owner, repo);
    console.log("README: util result", {
      ok: !!content,
      len: content ? content.length : 0,
    });
    if (content && content.length > 0) return content;
  } catch (e) {
    console.log("README: util error", e?.message);
  }

  // 2) Raw GitHub fallbacks (main/master)
  const rawCandidates = [
    `https://raw.githubusercontent.com/${owner}/${repo}/main/README.md`,
    `https://raw.githubusercontent.com/${owner}/${repo}/master/README.md`,
  ];
  for (const url of rawCandidates) {
    try {
      const r = await fetch(url);
      console.log("README: raw try", { url, ok: r.ok, status: r.status });
      if (r.ok) {
        const txt = await r.text();
        console.log("README: raw len", { url, len: txt.length });
        if (txt && txt.length > 0) return txt;
      }
    } catch (e) {
      console.log("README: raw error", { url, err: e?.message });
    }
  }

  // 3) GitHub API fallback with optional token (supports base64)
  try {
    const headers = {
      Accept: "application/vnd.github.v3.raw",
      "User-Agent": "Portfolio-Website-Server",
    };
    const token = process.env.GITHUB_TOKEN || process.env.VITE_GITHUB_TOKEN;
    if (token) headers["Authorization"] = `token ${token}`;
    const apiUrl = `https://api.github.com/repos/${owner}/${repo}/readme`;
    const r = await fetch(apiUrl, { headers });
    console.log("README: api try", { apiUrl, ok: r.ok, status: r.status });
    if (r.ok) {
      const txt = await r.text();
      if (txt && txt.length > 0 && !txt.startsWith('{"content":')) {
        console.log("README: api raw len", { len: txt.length });
        return txt;
      }
      try {
        const json = JSON.parse(txt);
        if (json && json.content) {
          const buff = Buffer.from(json.content, "base64");
          const dec = buff.toString("utf8");
          console.log("README: api base64 len", { len: dec.length });
          return dec;
        }
      } catch (e) {
        console.log("README: api json parse error", e?.message);
      }
    }
  } catch (e) {
    console.log("README: api error", e?.message);
  }

  console.log("README: not found", { owner, repo });
  return "";
};

// --- Rate Limiters ---
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

const llmLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 10,
  message: { error: "Chat limit reached. Please wait a minute." },
});

const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 5,
  message: { error: "Message limit reached. Please try again in an hour." },
});

// API Routes
app.post("/api/llm", llmLimiter, (req, res) => llmHandler(req, res));

app.post("/api/contact", contactLimiter, (req, res) => contactHandler(req, res));

app.post("/api/spotify", apiLimiter, (req, res) => spotifyHandler(req, res));

// Spotify OAuth callback route
app.get("/callback", async (req, res) => {
  const { code, error } = req.query;

  if (error) {
    return res.redirect(
      `${DEPLOYED_URL}/web/about?spotify_error=${encodeURIComponent(error)}`
    );
  }

  if (!code) {
    return res.redirect(`${DEPLOYED_URL}/web/about?spotify_error=no_code`);
  }

  try {
    // Exchange code for tokens
    const tokenResponse = await fetch(`${DEPLOYED_URL}/api/spotify`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "callback", code }),
    });

    if (tokenResponse.ok) {
      res.redirect(`${DEPLOYED_URL}/web/about?spotify_success=true`);
    } else {
      res.redirect(
        `${DEPLOYED_URL}/web/about?spotify_error=token_exchange_failed`
      );
    }
  } catch (error) {
    console.error("Callback error:", error);
    res.redirect(`${DEPLOYED_URL}/web/about?spotify_error=callback_error`);
  }
});

// Simple ping for connectivity diagnostics
app.get("/api/ping", apiLimiter, (req, res) => {
  console.log("PING hit");
  res.json({ ok: true, ts: Date.now() });
});

// Serve React app for all other routes
app.get("*", (req, res) => {
  try {
    res.sendFile(join(__dirname, "dist", "index.html"));
  } catch (error) {
    res.status(404).send("Page not found");
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`API available at http://localhost:${PORT}/api`);
});
