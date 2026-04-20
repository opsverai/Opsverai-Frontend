import { publicAsset } from "./publicUrl";

/** Encoded root URL for static files in `public/` (spaces, commas, etc.). */
function pub(file: string) {
  return encodeURI(publicAsset(file));
}

/** Raster WebP assets (regenerate from `asset-sources/*.svg` via `npm run assets`). */
export const images = {
  logo: pub("Logo OA.webp"),
  hero: pub("Hero.webp"),
  intake: pub("Intake.webp"),
  generate: pub("Generate.webp"),
  plan: pub("plan.webp"),
  visualization: pub("Visualization.webp"),
  validation: pub("Validation.webp"),
  scale: pub("Scale.webp"),
  contactBg: pub("Contact.webp"),
  pricingBg: pub("Pricing.webp"),
  whyChooseUsBg: pub("Why choose us.webp"),
  whoItsForBg: pub("Who its for.webp"),
  completeBlueprints: pub("Complete Blu-Prints.webp"),
  clarity: pub("Clarity beats chaotic planning.webp"),
  centralizedValidation: pub("Centralized validation.webp"),
  builtForSolos: pub("Built for solos.webp"),
  founders: pub("Founders, solopreneurs & non-technical builders.webp"),
  creator: pub("Creator.webp"),
  team: pub("Team.webp"),
  program: pub("Program.webp"),
  studio: pub("Studio.webp"),
  testimonial22: pub("22.webp"),
  testimonial23: pub("23.webp"),
  testimonial24: pub("24.webp"),
  testimonial25: pub("25.webp"),
  testimonial26: pub("26.webp"),
  testimonial27: pub("27.webp"),
  /** How it works step art (from designer PNGs) */
  oneTapExports: pub("One-Tap Exports.webp"),
  assumptionCheck: pub("Assumption check.webp"),
  rawToBlueprintIcon: pub("Raw to blueprint icon.webp"),
} as const;

/** Safe `url("...")` for inline `backgroundImage` styles. */
export function cssBgUrl(encodedPath: string) {
  return `url(${JSON.stringify(encodedPath)})`;
}
