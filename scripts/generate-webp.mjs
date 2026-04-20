/**
 * Regenerates raster WebP files in `public/` from vector sources in `asset-sources/`.
 * Run: npm run assets
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const srcDir = path.join(root, "asset-sources");
const outDir = path.join(root, "public");

/** Target width (px); height follows SVG aspect ratio. Tune for crisp retina icons. */
const WIDTH_BY_FILE = {
  "Logo OA.svg": 200,
  "Hero.svg": 1920,
  "Contact.svg": 1600,
  "Pricing.svg": 1600,
  "Why choose us.svg": 1600,
  "Who its for.svg": 1600,
  "Intake.svg": 256,
  "Generate.svg": 256,
  "plan.svg": 256,
  "Visualization.svg": 256,
  "Validation.svg": 256,
  "Scale.svg": 256,
  "Complete Blu-Prints.svg": 960,
  "Clarity beats chaotic planning.svg": 960,
  "Centralized validation.svg": 960,
  "Built for solos.svg": 960,
  "Founders, solopreneurs & non-technical builders.svg": 960,
  "Creator.svg": 960,
  "Team.svg": 960,
  "Program.svg": 960,
  "Studio.svg": 960,
  "22.svg": 192,
  "23.svg": 192,
  "24.svg": 192,
  "25.svg": 192,
  "26.svg": 192,
  "27.svg": 192,
};

async function main() {
  const heroPng = path.join(srcDir, "Hero.png");
  if (fs.existsSync(heroPng)) {
    const heroOut = path.join(outDir, "Hero.webp");
    await sharp(heroPng)
      .resize({ width: 1920, withoutEnlargement: true, fit: "inside" })
      .webp({ quality: 90, alphaQuality: 100, effort: 6 })
      .toFile(heroOut);
    console.log(`Wrote ${path.relative(root, heroOut)} (from Hero.png)`);
  }

  const entries = fs.readdirSync(srcDir).filter((f) => f.endsWith(".svg"));
  if (!entries.length) {
    console.error("No SVG files in asset-sources/");
    process.exit(1);
  }
  for (const file of entries) {
    if (file === "Hero.svg" && fs.existsSync(heroPng)) {
      continue;
    }
    const w = WIDTH_BY_FILE[file];
    if (!w) {
      console.warn(`Skip (add WIDTH_BY_FILE): ${file}`);
      continue;
    }
    const input = path.join(srcDir, file);
    const outName = file.replace(/\.svg$/i, ".webp");
    const output = path.join(outDir, outName);
    await sharp(input)
      .resize({ width: w, withoutEnlargement: false })
      .webp({ quality: 92, alphaQuality: 100, effort: 6 })
      .toFile(output);
    console.log(`Wrote ${path.relative(root, output)}`);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
