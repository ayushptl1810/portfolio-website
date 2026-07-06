import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { getAllRoutes } from "./lib/routes.js";
import { getProjects } from "./lib/projects.js";
import { loadManifest, resolveAssetUrl } from "./lib/manifest.js";
import {
  SITE_URL,
  DEFAULT_TITLE,
  DEFAULT_DESCRIPTION,
  DEFAULT_IMAGE,
  GATEWAY_H1,
  PERSON_SCHEMA,
  STATIC_PAGE_META,
  buildProjectSchema,
} from "../src/utils/seoDefaults.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const distDir = path.join(rootDir, "dist");

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function toJsonLdScript(schema) {
  // Guard against a "</script>" sequence inside stringified data (e.g. a
  // description containing that literal text) closing the tag early.
  const json = JSON.stringify(schema).replace(/<\//g, "<\\/");
  return `<script type="application/ld+json">${json}</script>`;
}

function setMetaContent(html, attr, attrValue, newContent) {
  const re = new RegExp(
    `(<meta[^>]*${attr}="${attrValue}"[^>]*content=")[^"]*(")`,
    "i"
  );
  if (!re.test(html)) {
    throw new Error(
      `prerender: expected <meta ${attr}="${attrValue}"> in base dist/index.html but didn't find it.`
    );
  }
  return html.replace(re, `$1${escapeHtml(newContent)}$2`);
}

function setLinkHref(html, rel, newHref) {
  const re = new RegExp(`(<link[^>]*rel="${rel}"[^>]*href=")[^"]*(")`, "i");
  if (!re.test(html)) {
    throw new Error(
      `prerender: expected <link rel="${rel}"> in base dist/index.html but didn't find it.`
    );
  }
  return html.replace(re, `$1${escapeHtml(newHref)}$2`);
}

function setTitle(html, newTitle) {
  return html.replace(
    /<title>[^<]*<\/title>/,
    `<title>${escapeHtml(newTitle)}</title>`
  );
}

function injectBeforeHeadClose(html, markup) {
  return html.replace("</head>", `${markup}</head>`);
}

function renderFallbackContent({ h1, description, tags, links }) {
  const tagsHtml = tags?.length
    ? `<ul>${tags.map((t) => `<li>${escapeHtml(t)}</li>`).join("")}</ul>`
    : "";
  const linksHtml = links?.length
    ? links
        .map(
          ({ href, label }) =>
            `<a href="${escapeHtml(href)}">${escapeHtml(label)}</a>`
        )
        .join(" ")
    : "";
  return `<div id="root"><main><h1>${escapeHtml(
    h1
  )}</h1><p>${escapeHtml(description)}</p>${tagsHtml}${linksHtml}</main></div>`;
}

function buildRouteData({ manifest, webProjects, aiProjects }) {
  const projectBySlugAndBase = new Map();
  for (const project of webProjects) {
    projectBySlugAndBase.set(`/web/projects/${project.slug}`, project);
  }
  for (const project of aiProjects) {
    projectBySlugAndBase.set(`/ai/projects/${project.slug}`, project);
  }

  const staticMetaByRoute = {
    "/web": STATIC_PAGE_META.home,
    "/ai": STATIC_PAGE_META.aiHome,
    "/web/about": STATIC_PAGE_META.about,
    "/ai/about": STATIC_PAGE_META.about,
    "/web/contact": STATIC_PAGE_META.contact,
    "/ai/contact": STATIC_PAGE_META.contact,
    "/web/projects": STATIC_PAGE_META.projects,
  };

  return function getRouteData(route) {
    if (route === "/") {
      return {
        title: DEFAULT_TITLE,
        description: DEFAULT_DESCRIPTION,
        image: DEFAULT_IMAGE,
        jsonLd: [PERSON_SCHEMA],
        fallback: renderFallbackContent({
          h1: GATEWAY_H1,
          description: DEFAULT_DESCRIPTION,
        }),
      };
    }

    const project = projectBySlugAndBase.get(route);
    if (project) {
      const image = project.imageManifestKey
        ? `${SITE_URL}${resolveAssetUrl(manifest, project.imageManifestKey) ?? ""}`
        : DEFAULT_IMAGE;
      return {
        title: `${project.name} | Ayush Patel`,
        description: project.description,
        image: resolveAssetUrl(manifest, project.imageManifestKey)
          ? image
          : DEFAULT_IMAGE,
        jsonLd: [PERSON_SCHEMA, buildProjectSchema(project, route)],
        fallback: renderFallbackContent({
          h1: project.name,
          description: project.description,
          tags: project.tags,
          links: [
            project.github_url && {
              href: project.github_url,
              label: "Source Code",
            },
            project.deployed_url && {
              href: project.deployed_url,
              label: "Live Demo",
            },
          ].filter(Boolean),
        }),
      };
    }

    const staticMeta = staticMetaByRoute[route];
    if (staticMeta) {
      return {
        title: `${staticMeta.title} | Ayush Patel`,
        description: staticMeta.description,
        image: DEFAULT_IMAGE,
        jsonLd: [PERSON_SCHEMA],
        fallback: renderFallbackContent({
          h1: staticMeta.title,
          description: staticMeta.description,
        }),
      };
    }

    throw new Error(`prerender: no metadata mapping found for route "${route}"`);
  };
}

function routeToOutputPath(route) {
  const trimmed = route.replace(/^\//, "");
  return trimmed === ""
    ? path.join(distDir, "index.html")
    : path.join(distDir, trimmed, "index.html");
}

function renderRouteHtml(baseHtml, route, data) {
  const canonicalUrl = `${SITE_URL}${route}`;
  let html = baseHtml;

  html = setTitle(html, data.title);
  html = setMetaContent(html, "name", "description", data.description);
  html = setLinkHref(html, "canonical", canonicalUrl);

  html = setMetaContent(html, "property", "og:title", data.title);
  html = setMetaContent(html, "property", "og:description", data.description);
  html = setMetaContent(html, "property", "og:url", canonicalUrl);
  html = setMetaContent(html, "property", "og:image", data.image);

  html = setMetaContent(html, "property", "twitter:title", data.title);
  html = setMetaContent(
    html,
    "property",
    "twitter:description",
    data.description
  );
  html = setMetaContent(html, "property", "twitter:url", canonicalUrl);
  html = setMetaContent(html, "property", "twitter:image", data.image);

  html = injectBeforeHeadClose(
    html,
    data.jsonLd.map(toJsonLdScript).join("")
  );

  html = html.replace('<div id="root"></div>', data.fallback);

  return html;
}

function main() {
  const baseIndexPath = path.join(distDir, "index.html");
  if (!fs.existsSync(baseIndexPath)) {
    throw new Error(
      "prerender: dist/index.html not found — run `vite build` before prerendering."
    );
  }

  const baseHtml = fs.readFileSync(baseIndexPath, "utf8");
  const manifest = loadManifest(rootDir);
  const { web: webProjects, ai: aiProjects } = getProjects();
  const getRouteData = buildRouteData({ manifest, webProjects, aiProjects });
  const routes = getAllRoutes();

  console.log(`prerender: rendering ${routes.length} routes...`);

  for (const route of routes) {
    const data = getRouteData(route);
    const html = renderRouteHtml(baseHtml, route, data);
    const outPath = routeToOutputPath(route);
    fs.mkdirSync(path.dirname(outPath), { recursive: true });
    fs.writeFileSync(outPath, html);
    console.log(`  ✓ ${route}`);
  }
}

main();
