import { useEffect, useState } from "react";
import type { LucideIcon } from "lucide-react";
import { Cpu, Radio, ShieldCheck, Sparkles, Zap } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { SectionReveal } from "@/components/landing/SectionReveal";
import { cssBgUrl, images } from "@/lib/publicImages";

const WHY_CLARITY_IMAGE = images.clarity;
const WHY_VALIDATION_IMAGE = images.centralizedValidation;
const WHY_SOLOS_IMAGE = images.builtForSolos;
const WHY_BLUEPRINTS_IMAGE = images.completeBlueprints;

type Reason = {
  id: string;
  title: string;
  short: string;
  detail: string;
  icon: LucideIcon;
  stats: { value: string; label: string }[];
  accent: string;
  /** Decorative AI-generated background for the spotlight card */
  image: string;
};

const REASONS: Reason[] = [
  {
    id: "latency",
    title: "Clarity over chaotic planning",
    short: "Replace scattered brainstorming with one structured blueprint; problem, market, model, and milestones in sync.",
    detail:
      "Early-stage work stays unclear when ideas are scattered across tools. Opsverai captures inputs however they arrive and organizes them into structured startup concepts, so you see the full picture without starting over every week.",
    icon: Radio,
    stats: [
      { value: "<3m", label: "to first canvas" },
      { value: "40+", label: "framework blocks" },
    ],
    accent: "from-primary/25 via-transparent to-accent/15",
    image: WHY_CLARITY_IMAGE,
  },
  {
    id: "trust",
    title: "Centralized validation",
    short: "One workspace for idea validation and structuring. No more disjointed sticky notes and slide decks.",
    detail:
      "Assumptions, evidence, and decisions stay anchored to the same blocks. Scoped sharing means advisors and teammates see what matters, while sensitive IP stays under your control. One workspace for idea validation and structuring. No more disjointed sticky notes and slide decks.",
    icon: ShieldCheck,
    stats: [
      { value: "100%", label: "workspace control" },
      { value: "Safe", label: "share links" },
    ],
    accent: "from-accent/20 via-transparent to-primary/20",
    image: WHY_VALIDATION_IMAGE,
  },
  {
    id: "surface",
    title: "Built for founders, teams, and programs",
    short: "Founders, freelancers, product teams, and incubators, one shared innovation workflow.",
    detail:
      "Stop circulating version twelve of a PDF. Opsverai keeps comments, decisions, and open questions tied to the canvas. So cofounders, mentors, and cohorts share one source of truth.",
    icon: Cpu,
    stats: [
      { value: "1", label: "source of truth" },
      { value: "∞", label: "iterations" },
    ],
    accent: "from-primary/20 via-accent/10 to-transparent",
    image: WHY_SOLOS_IMAGE,
  },
  {
    id: "velocity",
    title: "Complete blueprints, not generic notes",
    short: "Structured business models, feature plans, positioning, and execution handoffs, all in one workspace.",
    detail:
      "Unlike lightweight idea tools, Opsverai delivers full startup blueprints with clear direction; summaries, checklists, and exports that stay aligned as the concept evolves. Structured business models, feature plans, positioning, and execution handoffs, all in one workspace.",
    icon: Zap,
    stats: [
      { value: "24/7", label: "AI partner" },
      { value: "14d", label: "trial window" },
    ],
    accent: "from-accent/25 via-primary/15 to-transparent",
    image: WHY_BLUEPRINTS_IMAGE,
  },
];

export default function WhyChooseUs() {
  const [active, setActive] = useState(0);
  const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>({});
  const [visibleIndex, setVisibleIndex] = useState(0);

  useEffect(() => {
    // Preload spotlight images to avoid black flash before first paint.
    REASONS.forEach((reason) => {
      const img = new Image();
      img.onload = () => {
        setLoadedImages((prev) => ({ ...prev, [reason.id]: true }));
      };
      img.onerror = () => {
        // Mark errored images as "loaded" to prevent getting stuck in hidden state.
        setLoadedImages((prev) => ({ ...prev, [reason.id]: true }));
      };
      img.src = reason.image;
    });
  }, []);

  useEffect(() => {
    const activeReason = REASONS[active];
    if (activeReason && loadedImages[activeReason.id]) {
      setVisibleIndex(active);
    }
  }, [active, loadedImages]);

  const current = REASONS[active];

  return (
    <section
      id="why-choose-us"
      className="relative overflow-hidden border-y border-border/60 bg-black py-20 md:py-28"
      aria-labelledby="why-choose-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.18]"
        aria-hidden
        style={{
          backgroundImage: cssBgUrl(images.whyChooseUsBg),
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />

      <SectionReveal>
        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center md:mb-12">
            <Badge variant="outline" className="glass-pill border-primary/30">
              <Sparkles className="mr-1.5 h-3 w-3 text-primary" strokeWidth={2} aria-hidden />
              Why choose us
            </Badge>
            <h2
              id="why-choose-heading"
              className="mt-4 font-heading text-3xl font-extrabold text-foreground md:text-4xl lg:text-[2.75rem]"
            >
              Why Choose Opsverai
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground md:text-lg">
              Why founders and teams trust Opsverai for structured innovation.
            </p>
          </div>

          <div id="why-choose-panel" role="tabpanel" aria-labelledby={`why-card-${current.id}`} className="mt-12 grid w-full gap-3 lg:mt-16 lg:grid-cols-12">
            <div className="flex min-h-[460px] gap-3 lg:col-span-4" role="tablist" aria-label="Reasons to choose Opsverai">
              {REASONS.map((reason, i) => {
                const isActive = i === active;
                return (
                  <button
                    key={reason.id}
                    type="button"
                    id={`why-card-${reason.id}`}
                    role="tab"
                    aria-selected={isActive}
                    aria-controls="why-choose-panel"
                    onMouseEnter={() => setActive(i)}
                    onMouseMove={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    onClick={() => setActive(i)}
                    className={cn(
                      "group relative overflow-hidden rounded-2xl border border-border/60 transition-[flex,border-color,box-shadow,transform] duration-300 ease-out-expo",
                      isActive ? "flex-[7] border-primary/55 shadow-none" : "flex-[4] hover:flex-[5] hover:border-primary/35",
                    )}
                  >
                    <div className="pointer-events-none absolute inset-0 bg-black/62" aria-hidden />
                    <div className="relative z-10 flex h-full flex-col items-center justify-between px-1 py-6">
                      <p className="text-lg font-bold text-primary">{String(i + 1).padStart(2, "0")}</p>
                      <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-foreground/72 [writing-mode:vertical-rl] [text-orientation:mixed]">
                        {reason.title}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="relative min-h-[460px] overflow-hidden rounded-3xl border border-border/60 lg:col-span-8">
              {REASONS.map((reason, index) => (
                <div
                  key={reason.id}
                  className={cn(
                    "pointer-events-none absolute inset-0 bg-cover bg-center brightness-[0.5] contrast-110 transition-opacity duration-500",
                    index === visibleIndex ? "opacity-100" : "opacity-0",
                  )}
                  style={{ backgroundImage: `url(${reason.image})` }}
                  aria-hidden
                />
              ))}
              <div className={cn("pointer-events-none absolute inset-0 transition-opacity duration-300", loadedImages[REASONS[visibleIndex]?.id] ? "bg-black/45 opacity-100" : "opacity-0")} aria-hidden />
              <div className="relative z-10 flex h-full flex-col justify-end p-6 sm:p-8 lg:p-10">
                <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-primary/95">
                  Prot_{String(active + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-4 max-w-2xl font-heading text-2xl font-bold leading-[0.95] text-foreground sm:text-3xl md:text-4xl">
                  {current.title}
                </h3>
                <p className="mt-4 max-w-xl text-sm leading-relaxed text-foreground/92 sm:text-base">
                  {current.detail}
                </p>
                <div className="mt-4 max-w-xl rounded-xl border border-border/60 bg-black/50 p-4">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-primary/90">Common explanation</p>
                  <p className="mt-2 text-sm leading-relaxed text-foreground/90">{current.short}</p>
                </div>
                <dl className="mt-7 flex flex-wrap gap-6">
                  {current.stats.map((s) => (
                    <div key={s.label}>
                      <dt className="text-[10px] font-medium uppercase tracking-[0.16em] text-foreground/78">{s.label}</dt>
                      <dd className="mt-1 font-heading text-2xl font-bold tabular-nums text-foreground sm:text-3xl">{s.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>
        </div>
      </SectionReveal>
    </section>
  );
}
