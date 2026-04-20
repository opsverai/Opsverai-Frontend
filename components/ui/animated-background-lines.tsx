import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

const lineWrapperTops = ["top-[10%]", "top-[30%]", "top-[50%]", "top-[70%]", "top-[90%]"] as const;

/** Gold sweep — aligned with brand primary; tweak stops if you adjust theme. */
const LINE_SWEEP_GRADIENT =
  "linear-gradient(90deg, transparent 0%, rgb(244 165 36 / 0.95) 20%, rgb(253 224 72) 50%, rgb(244 165 36 / 0.95) 80%, transparent 100%)";

export type AnimatedHeroBackgroundProps = {
  className?: string;
};

/**
 * Animated grid, horizontal sweeps, and corner bracket strokes.
 * Place inside a `relative` + `overflow-hidden` container (e.g. hero). `pointer-events-none` built in.
 * Keyframes live in `tailwind.config.ts` (`cta-*`); no `styled-jsx` (Next-only).
 */
export function AnimatedHeroBackground({ className }: AnimatedHeroBackgroundProps) {
  return (
    <div className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)} aria-hidden>
      <div
        className={cn(
          "absolute inset-0 z-0 h-full w-full",
          "bg-[linear-gradient(rgb(244_206_20/0.07)_1px,transparent_1px),linear-gradient(90deg,rgb(244_206_20/0.07)_1px,transparent_1px)]",
          "bg-[length:50px_50px] motion-safe:animate-cta-grid-move motion-reduce:animate-none",
        )}
      />
      <div className="absolute inset-0 z-[1] h-full w-full overflow-hidden">
        {lineWrapperTops.map((topClass, index) => (
          <div key={topClass} className={cn("absolute h-[100px] w-full", topClass)}>
            <div className="relative h-0.5 w-full overflow-hidden">
              <div
                className={cn(
                  "absolute top-0 h-full w-full motion-safe:animate-cta-line-move motion-reduce:animate-none",
                  index % 2 !== 0 ? "[animation-direction:reverse] [animation-delay:2s]" : "",
                )}
                style={{ background: LINE_SWEEP_GRADIENT }}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="absolute left-1/2 top-1/2 z-[5] hidden h-[100px] w-[300px] -translate-x-1/2 -translate-y-1/2 md:block">
        <svg
          className="absolute left-[-150px] top-1/2 h-[60px] w-[120px] -translate-y-1/2 text-primary"
          viewBox="0 0 120 60"
          fill="none"
        >
          <path
            className="motion-safe:animate-cta-corner-line motion-reduce:animate-none"
            d="M120 0 L20 0 Q0 0 0 20 L0 60"
            stroke="currentColor"
            strokeWidth="2"
            strokeDasharray="50"
          />
        </svg>
        <svg
          className="absolute right-[-150px] top-1/2 h-[60px] w-[120px] -translate-y-1/2 scale-x-[-1] text-primary"
          viewBox="0 0 120 60"
          fill="none"
        >
          <path
            className="motion-safe:animate-cta-corner-line motion-safe:[animation-delay:3s] motion-reduce:animate-none"
            d="M120 0 L20 0 Q0 0 0 20 L0 60"
            stroke="currentColor"
            strokeWidth="2"
            strokeDasharray="50"
          />
        </svg>
      </div>
    </div>
  );
}

export type AnimatedCTASectionProps = {
  className?: string;
  headlineLine1?: string;
  headlineLine2?: ReactNode;
  ctaHref?: string;
  ctaLabel?: string;
};

/** Full-screen block matching the reference (headline + CTA). Optional standalone page / demo. */
export function AnimatedCTASection({
  className,
  headlineLine1 = "Ready to build",
  headlineLine2,
  ctaHref = "#",
  ctaLabel = "Start building",
}: AnimatedCTASectionProps) {
  const line2 =
    headlineLine2 ??
    (
      <span
        className="inline-block motion-safe:animate-cta-gradient-shift motion-reduce:animate-none"
        style={{
          backgroundImage: "linear-gradient(45deg, rgb(244 165 36), rgb(255 179 71), rgb(253 224 72))",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        the software of the future?
      </span>
    );

  return (
    <section
      className={cn(
        "relative flex min-h-screen items-center justify-center overflow-hidden bg-black p-8 font-sans text-white sm:p-16",
        className,
      )}
    >
      <AnimatedHeroBackground />
      <div className="relative z-10 max-w-3xl text-center">
        <h1 className="mb-8 text-[clamp(2.5rem,5vw,4rem)] font-bold leading-tight">
          {headlineLine1}
          <br />
          {line2}
        </h1>
        <a
          href={ctaHref}
          className="mt-8 inline-block rounded-lg bg-white px-8 py-3 text-base font-semibold text-black no-underline transition-all duration-300 ease-in-out hover:-translate-y-0.5 hover:shadow-[0_10px_30px_rgba(255,255,255,0.15)] active:translate-y-0 active:shadow-[0_5px_15px_rgba(255,255,255,0.1)] sm:px-10 sm:py-4 sm:text-lg"
        >
          {ctaLabel}
        </a>
      </div>
    </section>
  );
}

/** Default export for `import CtaPage from "@/components/ui/animated-background-lines"`. */
export default function AnimatedBackgroundLinesPage() {
  return (
    <div className="bg-black">
      <AnimatedCTASection />
    </div>
  );
}
