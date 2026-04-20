import { useMemo, useState } from "react";
import { Sparkles } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { SectionReveal } from "@/components/landing/SectionReveal";
import { images } from "@/lib/publicImages";

type CoreFeature = {
  id: string;
  orbitLabel: string;
  title: string;
  excerpt: string;
  dialogDetails: string;
  /** Public asset under `/public` */
  iconSrc: string;
};

/** BA §4.1 — six integrated capability pillars */
const CORE_FEATURES: CoreFeature[] = [
  {
    id: "idea-input",
    orbitLabel: "Intake",
    title: "Idea input and structuring system",
    excerpt:
      "Capture voice, notes, links, and files in one intake layer. Opsverai organizes scattered inputs into structured blocks ready for synthesis.",
    iconSrc: images.intake,
    dialogDetails:
      "Unified ingestion with flexible templates, light structuring, and guardrails so early thoughts do not get lost between tools. Every entry maps into a structured format ready for generation, planning, and validation.",
  },
  {
    id: "concept-engine",
    orbitLabel: "Generate",
    title: "Startup concept generation engine",
    excerpt:
      "Turn raw inputs into coherent startup concepts; problem, market, model, milestones, and narrative with intelligent processing you steer.",
    iconSrc: images.generate,
    dialogDetails:
      "The engine works across your inputs, proposes missing layers, and keeps traceable versions so you can compare concept directions before advisors or investors see a single line. You stay author; the system accelerates depth and coverage.",
  },
  {
    id: "model-planning",
    orbitLabel: "Plan",
    title: "Business model and feature planning tools",
    excerpt:
      "Shape revenue logic, feature scope, and roadmap priorities in purpose-built canvases without losing the thread in generic docs.",
    iconSrc: images.plan,
    dialogDetails:
      "Link assumptions to features, dependencies, and positioning. Planning views stay tied to the living concept so business model updates ripple into feature outlines and execution handoffs automatically.",
  },
  {
    id: "workflow-dashboard",
    orbitLabel: "Visualize",
    title: "Idea workflow and visualization dashboard",
    excerpt:
      "Monitor pipelines, stages, and momentum across ideas from one command surface, built for weekly founder reviews and program cadence.",
    iconSrc: images.visualization,
    dialogDetails:
      "Stage-based and timeline-friendly layouts surface stuck concepts, owner handoffs, and upcoming validation work. Teams, studios, and cohorts gain shared visibility without duplicating slide decks.",
  },
  {
    id: "validation",
    orbitLabel: "Validate",
    title: "Concept validation and refinement tools",
    excerpt:
      "Stress-test assumptions, log evidence, and refine language with prompts anchored to your canvas, not disconnected chat threads.",
    iconSrc: images.validation,
    dialogDetails:
      "Structured experiments, counter-arguments, and refinement loops help non-technical founders ship defensible concepts. Comments, decisions, and evidence stay attached to the exact block they concern.",
  },
  {
    id: "scale",
    orbitLabel: "Scale",
    title: "Scalable system for innovation and startup development",
    excerpt:
      "Grow from solo founder to multi-team innovation programs with workspaces, permissions, and exports that match how serious ventures operate.",
    iconSrc: images.scale,
    dialogDetails:
      "Multi-workspace structures, role-based access, program rollups, and audit-ready history support incubators, venture studios, and enterprise teams managing multiple concepts in parallel.",
  },
];

const CoreFeatures = () => {
  const [openId, setOpenId] = useState<string | null>(null);

  const dialogFeature = useMemo(() => CORE_FEATURES.find((f) => f.id === openId), [openId]);
  const orbitPositions = [
    "left-1/2 top-[4%] -translate-x-1/2",
    "right-[2%] top-[27%]",
    "right-[8%] bottom-[17%]",
    "left-1/2 bottom-[2%] -translate-x-1/2",
    "left-[8%] bottom-[17%]",
    "left-[2%] top-[27%]",
  ] as const;

  return (
    <section
      id="core-features"
      className="relative overflow-hidden border-y border-border/40 bg-gradient-to-b from-background via-muted/[0.35] to-background py-24 lg:py-32"
    >
      {/* Atmosphere — slow blobs, aurora mesh, drifting grid */}
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
        <div className="core-features-blob-a absolute -left-[20%] top-[8%] h-[min(32rem,70vw)] w-[min(32rem,70vw)] rounded-full bg-primary/[0.09] blur-3xl motion-reduce:animate-none dark:bg-primary/[0.12]" />
        <div className="core-features-blob-b absolute -right-[15%] bottom-[5%] h-[min(28rem,55vw)] w-[min(28rem,55vw)] rounded-full bg-accent/[0.07] blur-3xl motion-reduce:animate-none dark:bg-accent/[0.1]" />
        <div
          className="core-features-aurora-mesh absolute -inset-[22%] opacity-90 motion-reduce:animate-none motion-reduce:opacity-30"
          style={{
            backgroundImage: `radial-gradient(ellipse 50% 42% at 26% 30%, hsl(var(--primary) / 0.22), transparent 58%),
              radial-gradient(ellipse 46% 40% at 76% 64%, hsl(var(--accent) / 0.18), transparent 55%),
              radial-gradient(ellipse 38% 32% at 52% 88%, hsl(var(--secondary) / 0.12), transparent 62%)`,
          }}
        />
        <div
          className="core-features-grid-ambient absolute inset-0 opacity-[0.4] motion-reduce:animate-none dark:opacity-[0.22]"
          style={{
            backgroundImage: `linear-gradient(hsl(var(--foreground) / 0.045) 1px, transparent 1px),
              linear-gradient(90deg, hsl(var(--foreground) / 0.045) 1px, transparent 1px)`,
            backgroundSize: "56px 56px",
            backgroundPosition: "0 0",
            maskImage: "radial-gradient(ellipse 75% 60% at 50% 40%, black 20%, transparent 70%)",
            WebkitMaskImage: "radial-gradient(ellipse 75% 60% at 50% 40%, black 20%, transparent 70%)",
          }}
        />

        {/* Animated graphics backdrop */}
        <div className="absolute left-1/2 top-1/2 h-[68rem] w-[68rem] -translate-x-1/2 -translate-y-1/2 opacity-30 dark:opacity-40 motion-safe:animate-[spin_140s_linear_infinite] motion-reduce:animate-none">
          <div className="absolute inset-[9%] rounded-full border border-primary/18" />
          <div className="absolute inset-[23%] rounded-full border border-primary/15" />
          <div className="absolute inset-[37%] rounded-full border border-primary/12" />
        </div>
        <div className="absolute left-1/2 top-1/2 h-[60rem] w-[60rem] -translate-x-1/2 -translate-y-1/2 opacity-20 dark:opacity-30 motion-safe:animate-[spin_110s_linear_infinite_reverse] motion-reduce:animate-none">
          <div className="absolute inset-[14%] rounded-full border border-dashed border-accent/20" />
          <div className="absolute inset-[31%] rounded-full border border-dashed border-primary/18" />
        </div>
        <div className="absolute left-[18%] top-[30%] h-3 w-3 rounded-full bg-primary/70 shadow-[0_0_0_8px_hsl(var(--primary)/0.08)] motion-safe:animate-pulse" />
        <div className="absolute right-[20%] top-[22%] h-2.5 w-2.5 rounded-full bg-accent/70 shadow-[0_0_0_7px_hsl(var(--accent)/0.08)] motion-safe:animate-pulse [animation-delay:800ms]" />
        <div className="absolute right-[26%] bottom-[24%] h-3 w-3 rounded-full bg-primary/65 shadow-[0_0_0_8px_hsl(var(--primary)/0.08)] motion-safe:animate-pulse [animation-delay:1400ms]" />
        <div className="absolute left-[24%] bottom-[20%] h-2.5 w-2.5 rounded-full bg-accent/65 shadow-[0_0_0_7px_hsl(var(--accent)/0.08)] motion-safe:animate-pulse [animation-delay:500ms]" />
        <div className="absolute inset-x-[8%] top-[18%] h-px bg-gradient-to-r from-transparent via-primary/28 to-transparent motion-safe:animate-[pulse_5s_ease-in-out_infinite]" />
        <div className="absolute inset-x-[12%] bottom-[19%] h-px bg-gradient-to-r from-transparent via-accent/24 to-transparent motion-safe:animate-[pulse_6s_ease-in-out_infinite] [animation-delay:1200ms]" />
      </div>

      <SectionReveal>
        <div className="relative w-full max-w-none px-4 sm:px-6 lg:px-10 xl:px-14">
          {/* Editorial header */}
          <div className="mx-auto mb-14 max-w-3xl text-center lg:mb-16">
            <div className="mb-5 flex flex-wrap items-center justify-center gap-x-3 gap-y-2">
              <span className="h-px min-w-[2.5rem] flex-1 bg-gradient-to-r from-transparent to-border sm:max-w-[5rem] sm:flex-none sm:from-transparent sm:to-border" aria-hidden />
              <div className="inline-flex shrink-0 items-center gap-2 rounded-full border border-primary/25 bg-primary/5 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                <Sparkles className="h-3 w-3 text-primary" strokeWidth={2} aria-hidden />
                Core features
              </div>
              <span className="h-px min-w-[2.5rem] flex-1 bg-gradient-to-r from-border to-transparent sm:max-w-[5rem] sm:flex-none" aria-hidden />
            </div>
            <h2 className="mx-auto max-w-full px-2 text-center font-heading text-[clamp(0.8125rem,2.2vw+0.6rem,2.75rem)] font-bold leading-[1.2] tracking-tight text-foreground whitespace-nowrap">
              Everything your startup concept needs.
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-balance text-base leading-relaxed text-muted-foreground md:text-lg">
              Six integrated systems from input to scale cover the full Opsverai architecture. Open any card for a deeper walkthrough.
            </p>
          </div>

          {/* Orbit layout (desktop/tablet) */}
          <div className="relative mx-auto hidden w-full max-w-[56rem] sm:block">
            <div className="relative aspect-square">
              <div
                className="pointer-events-none absolute inset-[8%] opacity-[0.08]"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(0deg, transparent 0 18px, hsl(var(--primary) / 0.35) 18px 19px)",
                  maskImage: "radial-gradient(circle at center, black 35%, transparent 78%)",
                  WebkitMaskImage: "radial-gradient(circle at center, black 35%, transparent 78%)",
                }}
              />
              <div className="pointer-events-none absolute inset-0 rounded-full bg-[radial-gradient(circle_at_center,hsl(var(--primary)/0.12)_0%,transparent_62%)]" />
              <div className="absolute inset-[12%] rounded-full border border-primary/35 shadow-[0_0_0_1px_hsl(var(--primary)/0.12)]" />
              <div className="absolute inset-[26%] rounded-full border border-primary/25" />
              <div className="absolute inset-[40%] rounded-full border border-primary/20" />

              <div className="absolute left-1/2 top-1/2 h-[76%] w-px -translate-x-1/2 -translate-y-1/2 border-l border-dashed border-primary/30" />
              <div className="absolute left-1/2 top-1/2 h-px w-[76%] -translate-x-1/2 -translate-y-1/2 border-t border-dashed border-primary/30" />
              <div className="absolute left-1/2 top-1/2 h-px w-[76%] -translate-x-1/2 -translate-y-1/2 rotate-30 border-t border-dashed border-primary/20" />
              <div className="absolute left-1/2 top-1/2 h-px w-[76%] -translate-x-1/2 -translate-y-1/2 -rotate-30 border-t border-dashed border-primary/20" />

              <div className="absolute left-1/2 top-1/2 z-10 h-36 w-36 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/55 bg-primary/15 shadow-[0_0_36px_hsl(var(--primary)/0.22)] backdrop-blur-sm">
                <div className="pointer-events-none absolute inset-0 rounded-full bg-[conic-gradient(from_0deg,hsl(var(--primary)/0.18),transparent_35%,hsl(var(--primary)/0.18)_65%,transparent)] motion-safe:animate-[spin_14s_linear_infinite]" />
                <div className="flex h-full w-full flex-col items-center justify-center text-center">
                  <p className="font-heading text-2xl font-semibold tracking-tight text-primary">OPSVERAI</p>
                  <p className="text-xs text-muted-foreground">Core Engine</p>
                </div>
              </div>

              <div className="absolute inset-0 motion-safe:animate-[spin_55s_linear_infinite] motion-reduce:animate-none">
                {CORE_FEATURES.map((item, idx) => {
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setOpenId(item.id)}
                      className={`absolute ${orbitPositions[idx]} group/cf w-52 text-center outline-none`}
                      aria-label={`Open details: ${item.title}`}
                    >
                      <div
                        className="motion-reduce:[animation:none]"
                        style={{ animation: "spin 55s linear infinite reverse" }}
                      >
                        <div className="mx-auto mb-2.5 h-3.5 w-3.5 rounded-full border border-primary/80 bg-primary/70 shadow-[0_0_0_4px_hsl(var(--primary)/0.16)]" />
                        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl border border-primary/25 bg-background/15 shadow-sm backdrop-blur-[2px]">
                          <img
                            src={item.iconSrc}
                            alt=""
                            className="h-8 w-8 object-contain transition-transform duration-450 ease-out-expo group-hover/cf:scale-110"
                            loading="lazy"
                            decoding="async"
                          />
                        </div>
                        <p className="text-xs font-medium uppercase tracking-[0.16em] text-white/85">{item.orbitLabel}</p>
                        <h3 className="mt-1.5 font-heading text-[1.22rem] font-medium leading-[1.2] tracking-tight text-white">
                          {item.title}
                        </h3>
                        <p className="mt-1 text-[10px] uppercase tracking-[0.16em] text-white/70">
                          AI node active
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Mobile fallback (no cards) */}
          <div className="mx-auto grid w-full max-w-5xl grid-cols-1 gap-10 text-center sm:hidden">
            {CORE_FEATURES.map((item) => {
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setOpenId(item.id)}
                  className="group/cf mx-auto flex w-full max-w-sm flex-col items-center outline-none transition-transform duration-450 ease-out-expo hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  aria-label={`Open details: ${item.title}`}
                >
                  <span className="flex h-14 w-14 items-center justify-center rounded-2xl border border-primary/25 bg-muted/40 shadow-sm">
                    <img
                      src={item.iconSrc}
                      alt=""
                      className="h-9 w-9 object-contain transition-transform duration-450 ease-out-expo group-hover/cf:scale-[1.04]"
                      loading="lazy"
                      decoding="async"
                    />
                  </span>
                  <p className="mt-3 text-xs font-medium uppercase tracking-[0.16em] text-white/85">{item.orbitLabel}</p>
                  <h3 className="mt-2 font-heading text-base font-medium tracking-tight text-white sm:text-lg">{item.title}</h3>
                </button>
              );
            })}
          </div>
        </div>
      </SectionReveal>

      <Dialog open={openId !== null} onOpenChange={(open) => !open && setOpenId(null)}>
        <DialogContent className="max-h-[90vh] max-w-lg overflow-y-auto sm:max-w-lg">
          {dialogFeature ? (
            <>
              <DialogHeader>
                <div className="flex items-start gap-3 sm:gap-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-border/80 bg-muted/40">
                    <img
                      src={dialogFeature.iconSrc}
                      alt=""
                      className="h-8 w-8 object-contain"
                      loading="lazy"
                      decoding="async"
                    />
                  </span>
                  <DialogTitle className="font-heading pt-0.5 text-left text-xl sm:text-2xl">{dialogFeature.title}</DialogTitle>
                </div>
                <DialogDescription className="sr-only">Details for {dialogFeature.title}</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <p className="text-sm leading-relaxed text-muted-foreground">{dialogFeature.excerpt}</p>
                <p className="text-sm leading-relaxed text-muted-foreground">{dialogFeature.dialogDetails}</p>
              </div>
            </>
          ) : null}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default CoreFeatures;
