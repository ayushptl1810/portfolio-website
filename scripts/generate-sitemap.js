import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { getProjectRoutes } from "./lib/routes.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");

const SITE_URL = "https://www.ayush.info";

// Some project names contain "&" (e.g. "StackIt - Community Q&A Forum"),
// which is a valid path character but must be escaped inside XML text.
const escapeXml = (value) => value.replace(/&/g, "&amp;");

const { web: webProjectRoutes, ai: aiProjectRoutes } = getProjectRoutes();

const today = new Date().toISOString().split("T")[0];

const staticRoutes = [
  { loc: "/", changefreq: "monthly", priority: "1.0" },
  { loc: "/web", changefreq: "weekly", priority: "0.9" },
  { loc: "/ai", changefreq: "weekly", priority: "0.9" },
  { loc: "/web/about", changefreq: "monthly", priority: "0.8" },
  { loc: "/ai/about", changefreq: "monthly", priority: "0.8" },
  { loc: "/web/projects", changefreq: "weekly", priority: "0.8" },
  { loc: "/web/contact", changefreq: "monthly", priority: "0.7" },
  { loc: "/ai/contact", changefreq: "monthly", priority: "0.7" },
];

const projectRoutes = [...webProjectRoutes, ...aiProjectRoutes].map(
  (loc) => ({ loc, changefreq: "monthly", priority: "0.8" })
);

const allRoutes = [...staticRoutes, ...projectRoutes];

const urlEntries = allRoutes
  .map(
    ({ loc, changefreq, priority }) => `  <url>
    <loc>${escapeXml(SITE_URL + loc)}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`
  )
  .join("\n");

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>
`;

const outPath = path.join(rootDir, "public/sitemap.xml");
fs.writeFileSync(outPath, sitemap);

console.log(
  `generate-sitemap: wrote ${allRoutes.length} URLs (${staticRoutes.length} static, ${webProjectRoutes.length} web projects, ${aiProjectRoutes.length} AI projects) to public/sitemap.xml`
);
