import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

// ProjectList.js imports image assets that only resolve under Vite, so build
// scripts parse project names out of the source text instead of importing it.

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "../..");

// Must match the slug logic in src/pages/ProjectDetail.jsx exactly, or
// generated routes won't resolve to the right project.
export const slugify = (name) => name.toLowerCase().replace(/\s+/g, "-");

const extractNames = (source) => {
  const names = [];
  const nameRegex = /name:\s*"([^"]+)"/g;
  let match;
  while ((match = nameRegex.exec(source)) !== null) {
    names.push(match[1]);
  }
  return names;
};

export const STATIC_ROUTES = [
  "/",
  "/web",
  "/ai",
  "/web/about",
  "/ai/about",
  "/web/projects",
  "/web/contact",
  "/ai/contact",
];

export function getProjectRoutes() {
  const projectListSource = fs.readFileSync(
    path.join(rootDir, "src/utils/ProjectList.js"),
    "utf8"
  );

  const webStart = projectListSource.indexOf("const WebProjectList");
  const aiStart = projectListSource.indexOf("const AIProjectList");
  const combinedStart = projectListSource.indexOf("const ProjectList = [...");

  if (webStart === -1 || aiStart === -1 || combinedStart === -1) {
    throw new Error(
      "routes: could not locate WebProjectList/AIProjectList/ProjectList sections in ProjectList.js — update the parser if the file structure changed."
    );
  }

  const webNames = extractNames(projectListSource.slice(webStart, aiStart));
  const aiNames = extractNames(
    projectListSource.slice(aiStart, combinedStart)
  );

  return {
    web: webNames.map((name) => `/web/projects/${slugify(name)}`),
    ai: aiNames.map((name) => `/ai/projects/${slugify(name)}`),
  };
}

export function getAllRoutes() {
  const { web, ai } = getProjectRoutes();
  return [...STATIC_ROUTES, ...web, ...ai];
}
