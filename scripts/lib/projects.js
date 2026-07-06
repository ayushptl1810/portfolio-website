import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

// ProjectList.js imports image assets that only resolve under Vite, so this
// parses project records out of the source text instead of importing it.

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "../..");

// Must match the slug logic in src/pages/ProjectDetail.jsx exactly, or
// generated routes won't resolve to the right project.
export const slugify = (name) => name.toLowerCase().replace(/\s+/g, "-");

function parseImportMap(source) {
  const map = {};
  const importRegex = /import\s+(\w+)\s+from\s+"([^"]+)";/g;
  let match;
  while ((match = importRegex.exec(source)) !== null) {
    map[match[1]] = match[2];
  }
  return map;
}

function splitProjectBlocks(sectionSource) {
  return sectionSource
    .split(/(?=\{\s*\n\s*id:\s*")/)
    .map((block) => block.trim())
    .filter((block) => block.startsWith("{") && block.includes("id:"));
}

function extractField(block, regex) {
  const match = block.match(regex);
  return match ? match[1] : null;
}

function extractTags(block) {
  const raw = extractField(block, /tags:\s*\[([^\]]*)\]/);
  if (!raw) return [];
  return raw
    .split(",")
    .map((tag) => tag.trim().replace(/^"|"$/g, ""))
    .filter(Boolean);
}

function parseProjectBlock(block, importMap) {
  const name = extractField(block, /name:\s*"([^"]+)"/);
  const description = extractField(block, /description:\s*"([^"]+)"/);
  const github_url = extractField(block, /github_url:\s*"([^"]+)"/);
  const deployed_url = extractField(block, /deployed_url:\s*"([^"]+)"/);
  const imageVar = extractField(block, /image:\s*([A-Za-z0-9_]+)/);
  const importPath = imageVar ? importMap[imageVar] : null;

  // ProjectList.js lives at src/utils/ProjectList.js — its relative image
  // imports resolve from that directory. The manifest keys assets by their
  // path relative to the project root, so resolve+re-relativize to match.
  const imageManifestKey = importPath
    ? path
        .relative(rootDir, path.resolve(rootDir, "src/utils", importPath))
        .split(path.sep)
        .join("/")
    : null;

  return {
    name,
    slug: slugify(name),
    description,
    github_url,
    deployed_url,
    tags: extractTags(block),
    imageManifestKey,
  };
}

export function getProjects() {
  const source = fs.readFileSync(
    path.join(rootDir, "src/utils/ProjectList.js"),
    "utf8"
  );

  const webStart = source.indexOf("const WebProjectList");
  const aiStart = source.indexOf("const AIProjectList");
  const combinedStart = source.indexOf("const ProjectList = [...");

  if (webStart === -1 || aiStart === -1 || combinedStart === -1) {
    throw new Error(
      "projects: could not locate WebProjectList/AIProjectList/ProjectList sections in ProjectList.js — update the parser if the file structure changed."
    );
  }

  const importMap = parseImportMap(source.slice(0, webStart));
  const webSection = source.slice(webStart, aiStart);
  const aiSection = source.slice(aiStart, combinedStart);

  return {
    web: splitProjectBlocks(webSection).map((block) =>
      parseProjectBlock(block, importMap)
    ),
    ai: splitProjectBlocks(aiSection).map((block) =>
      parseProjectBlock(block, importMap)
    ),
  };
}
