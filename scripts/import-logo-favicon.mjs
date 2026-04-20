/**
 * One-off: raster favicon + logo from Cursor assets → public/*.webp
 * Re-run when replacing source PNGs in asset-sources/.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const outDir = path.join(root, "public");
const importedDir = path.join(root, "asset-sources", "imported-png");

const CURSOR_ASSETS = path.join(
  "C:",
  "Users",
  "User",
  ".cursor",
  "projects",
  "c-Users-User-Desktop-Front",
  "assets",
);

function findFile(includes) {
  if (!fs.existsSync(CURSOR_ASSETS)) return null;
  const n = fs.readdirSync(CURSOR_ASSETS).find((f) => f.endsWith(".png") && f.includes(includes));
  return n ? path.join(CURSOR_ASSETS, n) : null;
}

async function main() {
  const favSrc = findFile("Favicon_OA-") ?? path.join(importedDir, "Favicon OA.png");
  const logoSrc = findFile("Logo_OA-") ?? path.join(importedDir, "Logo OA.png");

  if (!favSrc || !fs.existsSync(favSrc)) {
    console.error("Missing favicon source PNG");
    process.exit(1);
  }
  if (!logoSrc || !fs.existsSync(logoSrc)) {
    console.error("Missing logo source PNG");
    process.exit(1);
  }

  const favOut = path.join(outDir, "Favicon OA.webp");
  await sharp(favSrc)
    .resize(128, 128, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 1 } })
    .webp({ quality: 92, alphaQuality: 100, effort: 6 })
    .toFile(favOut);
  console.log("Wrote", path.relative(root, favOut));

  const logoOut = path.join(outDir, "Logo OA.webp");
  await sharp(logoSrc)
    .resize({ width: 360, withoutEnlargement: true, fit: "inside" })
    .webp({ quality: 92, alphaQuality: 100, effort: 6 })
    .toFile(logoOut);
  console.log("Wrote", path.relative(root, logoOut));

  if (!fs.existsSync(importedDir)) fs.mkdirSync(importedDir, { recursive: true });
  fs.copyFileSync(favSrc, path.join(importedDir, "Favicon OA.png"));
  fs.copyFileSync(logoSrc, path.join(importedDir, "Logo OA.png"));
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
