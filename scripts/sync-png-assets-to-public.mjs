/**
 * Converts designer PNGs from Cursor workspace assets (or asset-sources/imported-png)
 * into `public/*.webp` using the same filenames as `src/lib/publicImages.ts`.
 *
 * Run: npm run sync-assets
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const outDir = path.join(root, "public");
const importedDir = path.join(root, "asset-sources", "imported-png");

const CURSOR_ASSETS =
  process.env.CURSOR_ASSETS_PATH ||
  path.join(
    "C:",
    "Users",
    "User",
    ".cursor",
    "projects",
    "c-Users-User-Desktop-Front",
    "assets",
  );

/** Match: first file in search dirs whose name includes `includes` wins. */
const JOBS = [
  { includes: "Hero-645ecd", out: "Hero.webp", width: 1920 },
  { includes: "Intake-4216", out: "Intake.webp", width: 512 },
  { includes: "Generate-31081", out: "Generate.webp", width: 512 },
  { includes: "plan-34f8", out: "plan.webp", width: 512 },
  { includes: "Visualization-33782", out: "Visualization.webp", width: 512 },
  { includes: "Validation-134cdf", out: "Validation.webp", width: 512 },
  { includes: "Scale-40419", out: "Scale.webp", width: 512 },
  { includes: "Contact-244c", out: "Contact.webp", width: 1600 },
  { includes: "Pricing-420f", out: "Pricing.webp", width: 1600 },
  { includes: "Why_choose_us-1108", out: "Why choose us.webp", width: 1600 },
  { includes: "Who_its_for-f2d3", out: "Who its for.webp", width: 1600 },
  { includes: "Complete_Blu-Prints", out: "Complete Blu-Prints.webp", width: 1200 },
  { includes: "Clarity_beats_chaotic_planning", out: "Clarity beats chaotic planning.webp", width: 1200 },
  { includes: "Centralized_validation-d4fd", out: "Centralized validation.webp", width: 1200 },
  { includes: "Built_for_solos-8b8e", out: "Built for solos.webp", width: 1200 },
  {
    includes: "Founders__solopreneurs___non-technical_builders",
    out: "Founders, solopreneurs & non-technical builders.webp",
    width: 1200,
  },
  { includes: "Creator-2f698", out: "Creator.webp", width: 1200 },
  { includes: "Team-113ed", out: "Team.webp", width: 1200 },
  { includes: "Program-544a", out: "Program.webp", width: 1200 },
  { includes: "Studio-5af3", out: "Studio.webp", width: 1200 },
  { includes: "One-Tap_Exports-88c04", out: "One-Tap Exports.webp", width: 900 },
  { includes: "Assumption_check-dd7f", out: "Assumption check.webp", width: 512 },
  { includes: "Raw_to_blueprint_icon-f029", out: "Raw to blueprint icon.webp", width: 512 },
  /** Testimonial avatars: 26→26.webp, 27→27.webp; 28–31→22–25.webp */
  { includes: "images_26-c5259b15", out: "26.webp", width: 400 },
  { includes: "images_27-2be59ec0", out: "27.webp", width: 400 },
  { includes: "images_28-67d05707", out: "22.webp", width: 400 },
  { includes: "images_29-03a1be56", out: "23.webp", width: 400 },
  { includes: "images_30-cc4770c1", out: "24.webp", width: 400 },
  { includes: "images_31-d612ebfb", out: "25.webp", width: 400 },
];

function listPngDirs() {
  const dirs = [];
  if (fs.existsSync(importedDir)) dirs.push(importedDir);
  if (fs.existsSync(CURSOR_ASSETS)) dirs.push(CURSOR_ASSETS);
  return dirs;
}

function findPng(includes) {
  for (const dir of listPngDirs()) {
    let names;
    try {
      names = fs.readdirSync(dir);
    } catch {
      continue;
    }
    const hit = names.find((n) => n.endsWith(".png") && n.includes(includes));
    if (hit) return path.join(dir, hit);
  }
  return null;
}

async function main() {
  let ok = 0;
  let missing = 0;
  for (const job of JOBS) {
    const input = findPng(job.includes);
    if (!input) {
      console.warn(`Missing source (skipped): ${job.includes} → ${job.out}`);
      missing++;
      continue;
    }
    const output = path.join(outDir, job.out);
    await sharp(input)
      .resize({ width: job.width, withoutEnlargement: true, fit: "inside" })
      .webp({ quality: 90, alphaQuality: 100, effort: 6 })
      .toFile(output);
    console.log(`Wrote ${path.relative(root, output)} ← ${path.basename(input)}`);
    ok++;

    const stash = path.join(importedDir, path.basename(input));
    if (!fs.existsSync(importedDir)) fs.mkdirSync(importedDir, { recursive: true });
    try {
      fs.copyFileSync(input, stash);
    } catch {
      /* ignore */
    }
  }
  console.log(`Done: ${ok} written, ${missing} missing sources.`);
  if (missing && !fs.existsSync(CURSOR_ASSETS)) {
    console.warn(`Set CURSOR_ASSETS_PATH or add PNGs under asset-sources/imported-png/`);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
