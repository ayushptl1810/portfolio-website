import express from "express";
import cors from "cors";
import { fileURLToPath, pathToFileURL } from "url";
import { dirname, join } from "path";
import fs from "fs/promises";
import dotenv from "dotenv";
import { Resend } from "resend";

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

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

// API Routes
app.post("/api/llm", async (req, res) => {
  try {
    const { query, history } = req.body || {};
    console.log("LLM hit:", { query, hasHistory: Array.isArray(history) });

    if (!query || typeof query !== "string") {
      return res.status(400).json({ ok: false, error: "Query is required" });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({
        ok: false,
        error: "LLM not configured (missing GEMINI_API_KEY)",
      });
    }

    // Read base and tech prompts
    const basePromptPath = join(__dirname, "src", "assets", "llm_info.md");
    const techPromptPath = join(__dirname, "src", "assets", "llm_info_tech.md");
    const basePrompt = await readTextFile(basePromptPath);
    const techPrompt = await readTextFile(techPromptPath);

    // Detect project by name in query and optionally fetch README
    let project = await detectProjectByName(query);
    // If not found in current query, try recent history for a project mention
    if (!project && Array.isArray(history) && history.length > 0) {
      for (let i = history.length - 1; i >= 0; i--) {
        const h = history[i];
        if (!h || typeof h.text !== "string") continue;
        const candidate = await detectProjectByName(h.text);
        if (candidate) {
          project = candidate;
          break;
        }
      }
    }
    let readmeSnippet = "";
    if (project?.owner && project?.repo) {
      const md = await fetchProjectReadme(project.owner, project.repo);
      if (md) {
        // Limit README to avoid overlong prompts
        const setupIntent =
          /\b(setup|install|run|local|getting\s*started|build)\b/i.test(query);
        const maxChars = setupIntent ? 12000 : 4000;
        readmeSnippet = md.slice(0, maxChars);
      }
    }

    // If README is empty but we have project metadata, build a concise project summary
    let projectSummary = "";
    if (project && !readmeSnippet) {
      try {
        const bullets = [];
        if (project.description) bullets.push(project.description);
        if (Array.isArray(project.points) && project.points.length > 0) {
          bullets.push(`Key points: ${project.points.slice(0, 3).join("; ")}`);
        }
        if (Array.isArray(project.tags) && project.tags.length > 0) {
          bullets.push(`Tags: ${project.tags.join(", ")}`);
        }
        projectSummary = bullets.join("\n");
      } catch {}
    }

    // Compose system prompt
    // Always include the tech file to strengthen technical grounding as requested
    const composedSystem = [
      basePrompt?.trim(),
      techPrompt?.trim(),
      project
        ? `\nProject Focus: ${project.name}\nRepo: ${project.owner}/${project.repo}`
        : "",
      projectSummary ? `\nProject Summary:\n${projectSummary}` : "",
      readmeSnippet ? `\nProject README (excerpt):\n${readmeSnippet}` : "",
    ]
      .filter(Boolean)
      .join("\n\n");

    // Debug logs to verify prompt composition
    console.log("LLM compose:", {
      hasBase: !!basePrompt,
      hasTech: !!techPrompt,
      projectMatched: project?.name || null,
      readmeChars: readmeSnippet.length,
      summaryChars: projectSummary.length,
      systemChars: composedSystem.length,
    });

    // Build conversation contents from history + current user message
    const contents = [];
    if (Array.isArray(history)) {
      const recent = history.slice(-8); // limit turns
      for (const msg of recent) {
        if (!msg || typeof msg.text !== "string") continue;
        const role = msg.from === "bot" ? "model" : "user";
        contents.push({ role, parts: [{ text: msg.text }] });
      }
    }
    contents.push({ role: "user", parts: [{ text: query }] });

    // Call Gemini API
    console.log("LLM request -> Gemini start");
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          systemInstruction: {
            parts: [{ text: composedSystem }],
          },
          contents,
          generationConfig: {
            temperature: 0.2,
            maxOutputTokens: 1000,
          },
        }),
      }
    );
    console.log("LLM request -> Gemini done", {
      ok: response.ok,
      status: response.status,
    });

    if (!response.ok) {
      const errorText = await response.text();
      return res
        .status(502)
        .json({ ok: false, error: `LLM error: ${errorText}` });
    }

    const json = await response.json();
    const content = json?.candidates?.[0]?.content?.parts?.[0]?.text || "";

    return res.status(200).json({ ok: true, content });
  } catch (err) {
    console.error("LLM handler error:", err);
    return res.status(500).json({ ok: false, error: "Internal Server Error" });
  }
});

app.post("/api/contact", async (req, res) => {
  try {
    console.log("Contact API called with body:", req.body);

    const formData =
      typeof req.body === "string" ? JSON.parse(req.body) : req.body;

    const {
      name = "",
      email = "",
      linkedinUrl = "",
      role = "General",
      subject = "Message",
      message = "",
      replyVia = "Email",
      meta = {},
    } = formData || {};

    // Require at least one contact: email OR LinkedIn URL, plus message
    if ((!email && !linkedinUrl) || !message) {
      return res
        .status(400)
        .json({ ok: false, error: "Missing required fields" });
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.log("Missing RESEND_API_KEY");
      return res
        .status(500)
        .json({ ok: false, error: "Email service not configured" });
    }

    const toEmail = process.env.CONTACT_TO_EMAIL;
    const fromEmail = process.env.CONTACT_FROM_EMAIL;

    console.log("Email config:", {
      hasApiKey: !!apiKey,
      toEmail,
      fromEmail,
      apiKeyPrefix: apiKey ? apiKey.substring(0, 3) : "none",
    });

    const resend = new Resend(apiKey);

    const html = `
      <div style="font-family: system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif; line-height:1.6;">
        <h2 style="margin:0 0 12px;">New Contact Transmission</h2>
        <p><strong>Role:</strong> ${role}</p>
        <p><strong>Name:</strong> ${name || "—"}</p>
        <p><strong>Email:</strong> ${email || "—"}</p>
        <p><strong>LinkedIn:</strong> ${
          linkedinUrl ? `<a href="${linkedinUrl}">${linkedinUrl}</a>` : "—"
        }</p>
        <p><strong>Reply via:</strong> ${replyVia}</p>
        <hr style="border:none;border-top:1px solid #e5e5e5;margin:16px 0;" />
        <p style="white-space:pre-wrap;">${message}</p>
        <hr style="border:none;border-top:1px solid #e5e5e5;margin:16px 0;" />
        <p style="font-size:12px;color:#666;">User-Agent: ${meta.ua || "—"}</p>
        <p style="font-size:12px;color:#666;">Timestamp: ${
          meta.ts || Date.now()
        }</p>
      </div>
    `;

    console.log("Attempting to send email with Resend...");

    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      subject: `[Contact] ${subject}`,
      html,
      ...(email && { reply_to: email }),
    });

    if (error) {
      console.error("Resend error:", error);
      return res.status(500).json({ ok: false, error: "Failed to send email" });
    }

    console.log("Email sent successfully:", data);
    return res
      .status(200)
      .json({ ok: true, message: "Email sent successfully" });
  } catch (err) {
    console.error("Contact handler error:", err);
    return res.status(500).json({ ok: false, error: "Internal Server Error" });
  }
});

// Simple ping for connectivity diagnostics
app.get("/api/ping", (req, res) => {
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
