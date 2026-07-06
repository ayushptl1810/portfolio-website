import { spawn } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import puppeteer from "puppeteer";
import { getAllRoutes } from "./lib/routes.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const PORT = process.env.PRERENDER_PORT || 4174;
const BASE_URL = `http://localhost:${PORT}`;

function waitForServer(url, timeoutMs = 20000) {
  const start = Date.now();
  return new Promise((resolve, reject) => {
    const attempt = async () => {
      try {
        const res = await fetch(url);
        if (res.status < 500) return resolve();
      } catch {
        // server not up yet
      }
      if (Date.now() - start > timeoutMs) {
        return reject(
          new Error(`prerender: server did not start within ${timeoutMs}ms`)
        );
      }
      setTimeout(attempt, 300);
    };
    attempt();
  });
}

function routeToOutputPath(route) {
  const trimmed = route.replace(/^\//, "");
  return trimmed === ""
    ? path.join(rootDir, "dist", "index.html")
    : path.join(rootDir, "dist", trimmed, "index.html");
}

async function main() {
  const distIndexPath = path.join(rootDir, "dist", "index.html");
  if (!fs.existsSync(distIndexPath)) {
    throw new Error(
      "prerender: dist/index.html not found — run `vite build` before prerendering."
    );
  }

  const server = spawn("node", ["server.js"], {
    cwd: rootDir,
    env: { ...process.env, PORT: String(PORT) },
    stdio: ["ignore", "ignore", "pipe"],
  });
  server.stderr.on("data", (chunk) => process.stderr.write(chunk));

  let browser;
  try {
    await waitForServer(`${BASE_URL}/api/ping`);

    browser = await puppeteer.launch({ headless: true });
    const routes = getAllRoutes();
    console.log(`prerender: rendering ${routes.length} routes...`);

    let failures = 0;
    for (const route of routes) {
      const page = await browser.newPage();
      try {
        await page.goto(`${BASE_URL}${route}`, {
          waitUntil: "domcontentloaded",
          timeout: 30000,
        });
        // Give React (and usePageSEO's effect) time to mount and update
        // document title/meta/canonical/JSON-LD before we snapshot the DOM.
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const html = await page.content();
        const outPath = routeToOutputPath(route);
        fs.mkdirSync(path.dirname(outPath), { recursive: true });
        fs.writeFileSync(outPath, html);
        console.log(`  ✓ ${route}`);
      } catch (err) {
        failures += 1;
        console.warn(`  ✗ ${route}: ${err.message}`);
      } finally {
        await page.close();
      }
    }

    if (failures > 0) {
      console.warn(
        `prerender: ${failures} of ${routes.length} routes failed — those routes keep serving the client-rendered shell as a fallback.`
      );
    }
  } finally {
    if (browser) await browser.close();
    server.kill();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
