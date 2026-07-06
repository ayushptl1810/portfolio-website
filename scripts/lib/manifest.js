import fs from "node:fs";
import path from "node:path";

export function loadManifest(rootDir) {
  const manifestPath = path.join(rootDir, "dist/.vite/manifest.json");
  if (!fs.existsSync(manifestPath)) {
    throw new Error(
      "manifest: dist/.vite/manifest.json not found — run `vite build` (with build.manifest: true) first."
    );
  }
  return JSON.parse(fs.readFileSync(manifestPath, "utf8"));
}

export function resolveAssetUrl(manifest, manifestKey) {
  if (!manifestKey) return null;
  const entry = manifest[manifestKey];
  return entry ? `/${entry.file}` : null;
}
