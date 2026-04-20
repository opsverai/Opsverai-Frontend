import { useCallback, useEffect, useRef, useState } from "react";
import type { LucideIcon } from "lucide-react";
import { Check, GraduationCap, Layers, Palette, Rocket, Users } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { images } from "@/lib/publicImages";
import { SectionReveal } from "@/components/landing/SectionReveal";

/** Public file: `public/Founders, solopreneurs & non-technical builders.webp` */
const FOUNDERS_CARD_IMAGE = images.founders;

function bgUrl(href: string) {
  return `url(${JSON.stringify(href)})`;
}

export type UseCaseTab = {
  id: string;
  label: string;
  /** Short label for collapsed sector rail */
  shortCode: string;
  icon: LucideIcon;
  description: string;
  features: [string, string, string];
  quote: { text: string; author: string; role: string };
  metrics: { label: string; value: string }[];
  image: string;
};

const USE_CASES: UseCaseTab[] = [
  {
    id: "founders",
    shortCode: "Founder",
    label: "Founders, solopreneurs & non-technical builders",
    icon: Rocket,
    description:
      "When it is just you and an idea, Opsverai becomes your second brain, turning early thoughts into problem statements, target markets, feature outlines, and experiments you can validate without a team.",
    features: [
      "Plain-language prompts for business model and positioning",
      "Assumption maps with intelligent counterpoints.",
      "Starter blueprint exports ready to share with mentors.",
    ],
    quote: {
      text: "I stopped rewriting the same idea in six tools. Opsverai keeps my story tight when investors ask ‘why now?’",
      author: "Jordan Lee",
      role: "Indie SaaS founder",
    },
    metrics: [
      { label: "Time to first canvas", value: "−72%" },
      { label: "Duplicate drafts", value: "−58%" },
      { label: "Advisor clarity", value: "4.8/5" },
    ],
    image: FOUNDERS_CARD_IMAGE,
  },
  {
    id: "creators",
    shortCode: "Creator",
    label: "Creators & makers",
    icon: Palette,
    description:
      "Turn audience insights, brand collabs, and product drops into structured business models, without losing the creative voice that got you here.",
    features: [
      "Story-first canvases that preserve tone of voice",
      "Licensing + partnership paths spelled out for agents",
      "Launch timelines tied to narrative milestones",
    ],
    quote: {
      text: "Fans see the art; my team sees the operating plan. Same workspace, zero vibe tax.",
      author: "Mira Santos",
      role: "Creator-entrepreneur",
    },
    metrics: [
      { label: "Pitch prep hours", value: "−41%" },
      { label: "Stakeholder loops", value: "−55%" },
      { label: "Concept clarity", value: "3×" },
    ],
    image: images.creator,
  },
  {
    id: "teams",
    shortCode: "Team",
    label: "Startup & product teams",
    icon: Users,
    description:
      "Keep product, growth, and leadership aligned on one narrative canvas, so roadmap bets, GTM slices, and investor updates never drift apart.",
    features: [
      "Shared blocks with comments anchored to assumptions",
      "Role-aware views for ICs vs. executives",
      "Snapshot milestones after every planning ritual",
    ],
    quote: {
      text: "We debate in Opsverai now. The disagreement is healthy, the doc debt is gone.",
      author: "Chris Ortega",
      role: "Head of Product, Lumen Labs",
    },
    metrics: [
      { label: "Meeting recap time", value: "−36%" },
      { label: "Misaligned bets", value: "−51%" },
      { label: "Quarterly cadence", value: "On rails" },
    ],
    image: images.team,
  },
  {
    id: "programs",
    shortCode: "Programs",
    label: "Incubators, accelerators & classrooms",
    icon: GraduationCap,
    description:
      "Give cohorts one innovation workflow to capture, structure, and validate, so mentors coach ideas instead of reformatting scattered homework.",
    features: [
      "Cohort templates with facilitator notes",
      "Student-safe sharing boundaries",
      "Exportable demo day one-pagers",
    ],
    quote: {
      text: "Every founder showed up with the same vocabulary by week three. That never happened with loose Google Docs.",
      author: "Dr. Amira Khan",
      role: "Program Director, Studio 404",
    },
    metrics: [
      { label: "Mentor prep hours", value: "−44%" },
      { label: "Founder retention", value: "+18%" },
      { label: "Portfolio reviews", value: "2× faster" },
    ],
    image: images.program,
  },
  {
    id: "studios",
    shortCode: "Studio",
    label: "Studios & innovation labs",
    icon: Layers,
    description:
      "Run multiple concepts in parallel, compare narratives side by side, and hand clients an artifact they can defend internally.",
    features: [
      "Workspace per engagement with branded exports",
      "Scenario branches for “premium vs. freemium” stories",
      "Audit trail of decisions for procurement-heavy clients",
    ],
    quote: {
      text: "We pitch faster because Opsverai keeps client voices and our POV in one structured thread.",
      author: "Elena Vogt",
      role: "Partner, Meridian Venture Studio",
    },
    metrics: [
      { label: "Proposal cycles", value: "−29%" },
      { label: "Rewrite requests", value: "−62%" },
      { label: "NPS (clients)", value: "68" },
    ],
    image: images.studio,
  },
];

export default function UseCasesSection() {
  const [activeId, setActiveId] = useState(USE_CASES[0].id);
  const [reduceMotion, setReduceMotion] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);
  const [parallax, setParallax] = useState({ x: 0, y: 0 });

  const active = USE_CASES.find((u) => u.id === activeId) ?? USE_CASES[0];
  const activeIndex = USE_CASES.findIndex((u) => u.id === activeId);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
    const fn = () => setReduceMotion(mq.matches);
    mq.addEventListener("change", fn);
    return () => mq.removeEventListener("change", fn);
  }, []);

  const onStagePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (reduceMotion) return;
      const el = stageRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const nx = ((e.clientX - r.left) / r.width) * 2 - 1;
      const ny = ((e.clientY - r.top) / r.height) * 2 - 1;
      setParallax({ x: nx * 14, y: ny * 10 });
    },
    [reduceMotion],
  );

  const onStagePointerLeave = useCallback(() => {
    setParallax({ x: 0, y: 0 });
  }, []);

  const cycle = useCallback((delta: number) => {
    const next = (activeIndex + delta + USE_CASES.length) % USE_CASES.length;
    setActiveId(USE_CASES[next].id);
  }, [activeIndex]);

  return (
    <section
      id="use-cases"
      className="relative overflow-hidden border-y border-border/60 bg-black py-16 md:py-20 lg:py-24"
      aria-labelledby="use-cases-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.28]"
        aria-hidden
        style={{
          backgroundImage: bgUrl(images.whoItsForBg),
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        aria-hidden
        style={{
          backgroundImage: `
            linear-gradient(to right, hsl(var(--border) / 0.45) 1px, transparent 1px),
            linear-gradient(to bottom, hsl(var(--border) / 0.45) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
        }}
      />

      <SectionReveal>
      <div className="container relative z-10 mx-auto max-w-6xl px-4 lg:px-8">
        <div className="mx-auto mb-8 max-w-2xl text-center md:mb-10">
          <Badge variant="outline" className="glass-pill mb-4 border-primary/30">
            Who it&apos;s for
          </Badge>
          <h2
            id="use-cases-heading"
            className="font-heading text-3xl font-extrabold tracking-tight text-foreground md:text-4xl lg:text-[2.75rem]"
          >
            Built for entrepreneurs, creators, and innovation teams
          </h2>
          <p className="mt-4 text-base text-muted-foreground md:text-lg">
            From freelancers and solopreneurs to startup teams and incubators, each path shows how Opsverai transforms ideas into structured, actionable concepts.
          </p>
        </div>

        {/* Expanding sector rail — desktop */}
        <div
          className="mb-8 hidden gap-2 md:flex"
          role="tablist"
          aria-label="Ways teams use Opsverai"
        >
          {USE_CASES.map((item) => {
            const isActive = item.id === activeId;
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                id={`use-case-tab-${item.id}`}
                aria-controls="use-case-panel"
                tabIndex={0}
                onClick={() => setActiveId(item.id)}
                onKeyDown={(e) => {
                  if (e.key === "ArrowRight" || e.key === "ArrowDown") {
                    e.preventDefault();
                    cycle(1);
                  }
                  if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
                    e.preventDefault();
                    cycle(-1);
                  }
                }}
                className={cn(
                  "group relative flex min-h-[5.5rem] min-w-0 flex-col items-center justify-center gap-1 rounded-2xl px-2 py-3 transition-[flex-grow,box-shadow,transform,border-color,background-color] duration-500 ease-out-expo md:min-h-[6.25rem] md:px-3",
                  isActive
                    ? "glass-panel-strong flex-[2.4] border-primary/40 shadow-md shadow-primary/10 ring-1 ring-inset ring-primary/10"
                    : "glass-panel flex-[1] hover:flex-[1.15] hover:border-primary/30 hover:shadow-md",
                )}
              >
                <span
                  className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl"
                  aria-hidden
                >
                  <span
                    className={cn(
                      "absolute inset-0 bg-cover bg-center transition-[opacity,transform] duration-500",
                      isActive ? "opacity-35 scale-105" : "opacity-20",
                    )}
                    style={{ backgroundImage: bgUrl(item.image) }}
                  />
                  <span className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/65 to-background/90" />
                </span>
                <span
                  className={cn(
                    "relative z-10 flex h-10 w-10 items-center justify-center rounded-xl border transition-colors duration-300",
                    isActive
                      ? "border-primary/35 bg-primary/15 text-primary"
                      : "border-border/50 bg-muted/30 text-muted-foreground group-hover:text-foreground",
                  )}
                >
                  <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden />
                </span>
                <span
                  className={cn(
                    "relative z-10 w-full truncate text-center font-heading text-xs font-semibold uppercase tracking-wide md:text-[11px]",
                    isActive ? "text-foreground" : "text-muted-foreground",
                  )}
                >
                  {item.shortCode}
                </span>
                <span
                  className={cn(
                    "relative z-10 line-clamp-2 w-full text-center text-[11px] leading-tight text-muted-foreground transition-opacity duration-300 md:text-xs",
                    isActive ? "opacity-100" : "max-md:hidden md:opacity-0 md:group-hover:opacity-100",
                  )}
                >
                  {item.label}
                </span>
                {isActive && (
                  <span
                    className="absolute bottom-0 left-3 right-3 h-0.5 rounded-full bg-gradient-to-r from-transparent via-primary to-transparent"
                    aria-hidden
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Mobile: horizontal chips */}
        <div
          className="mb-6 flex snap-x snap-mandatory gap-2 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] md:hidden [&::-webkit-scrollbar]:hidden"
          role="tablist"
          aria-label="Ways teams use Opsverai"
        >
          {USE_CASES.map((item) => {
            const isActive = item.id === activeId;
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveId(item.id)}
                className={cn(
                  "relative flex w-[42vw] max-w-[9.5rem] shrink-0 snap-center flex-col items-center gap-2 rounded-2xl px-3 py-3 transition-colors",
                  isActive
                    ? "glass-panel-strong border-primary/45 ring-1 ring-primary/15"
                    : "glass-panel",
                )}
              >
                <span
                  className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl"
                  aria-hidden
                >
                  <span
                    className={cn(
                      "absolute inset-0 bg-cover bg-center transition-opacity duration-500",
                      isActive ? "opacity-30" : "opacity-15",
                    )}
                    style={{ backgroundImage: bgUrl(item.image) }}
                  />
                  <span className="absolute inset-0 bg-gradient-to-b from-background/78 via-background/68 to-background/88" />
                </span>
                <Icon
                  className={cn("relative z-10 h-5 w-5", isActive ? "text-primary" : "text-muted-foreground")}
                  aria-hidden
                />
                <span className="relative z-10 text-center text-xs font-semibold leading-tight">{item.shortCode}</span>
              </button>
            );
          })}
        </div>

        <div className="grid items-start gap-8 lg:grid-cols-12 lg:gap-10">
          {/* Visual stage — crossfade + parallax */}
          <div className="lg:col-span-7">
            <div
              ref={stageRef}
              onPointerMove={onStagePointerMove}
              onPointerLeave={onStagePointerLeave}
              className="group/stage glass-panel relative aspect-[5/4] w-full overflow-hidden rounded-3xl shadow-depth-lg sm:aspect-[16/11] lg:aspect-[4/3]"
            >
              <div
                className="absolute inset-[-12%] bg-muted/15 transition-transform duration-700 ease-out"
                style={
                  reduceMotion
                    ? undefined
                    : {
                        transform: `translate3d(${parallax.x}px, ${parallax.y}px, 0) scale(1.08)`,
                      }
                }
              >
                {USE_CASES.map((item) => (
                  <img
                    key={item.id}
                    src={item.image}
                    alt=""
                    loading={item.id === activeId ? "eager" : "lazy"}
                    decoding="async"
                    {...(item.id === activeId ? {} : { fetchPriority: "low" as const })}
                    className={cn(
                      "absolute inset-0 h-full w-full object-contain object-center transition-[opacity,filter] duration-700 ease-out",
                      item.id === activeId
                        ? "z-[2] opacity-100"
                        : "pointer-events-none z-0 opacity-0 brightness-75",
                    )}
                  />
                ))}
              </div>
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background via-background/25 to-transparent"
                aria-hidden
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-background/60 via-transparent to-transparent opacity-80 lg:opacity-100" />
              <div className="absolute bottom-0 left-0 right-0 z-10 p-5 sm:p-6 md:p-8">
                <Badge
                  variant="outline"
                  className="glass-pill mb-2 border-primary/30 text-xs"
                >
                  {active.shortCode} track
                </Badge>
                <p className="font-heading text-xl font-bold tracking-tight text-foreground sm:text-2xl">
                  {active.label}
                </p>
                <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base">
                  {active.features[0]}
                </p>
              </div>
              {/* Decorative scan hint */}
              <div
                className="pointer-events-none absolute right-4 top-4 flex items-center gap-1.5 rounded-full border border-border/50 bg-background/60 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-muted-foreground backdrop-blur-sm opacity-0 transition-opacity duration-300 group-hover/stage:opacity-100 motion-reduce:opacity-100"
                aria-hidden
              >
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary/50 opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
                </span>
                Live preview
              </div>
            </div>
          </div>

          {/* Detail panel */}
          <div
            id="use-case-panel"
            role="tabpanel"
            aria-labelledby={`use-case-tab-${active.id}`}
            className="min-w-0 lg:col-span-5"
          >
            <div
              key={active.id}
              className="animate-in fade-in-0 slide-in-from-right-2 duration-300 fill-mode-both"
            >
              <div className="glass-panel-strong relative overflow-hidden rounded-2xl p-5 shadow-lg sm:p-6 md:p-7">
                <span className="pointer-events-none absolute inset-0" aria-hidden>
                  <span
                    className="absolute inset-0 bg-cover bg-center opacity-[0.18] sm:opacity-[0.22]"
                    style={{ backgroundImage: bgUrl(active.image) }}
                  />
                  <span className="absolute inset-0 bg-gradient-to-br from-background/92 via-background/88 to-background/95" />
                </span>
                <div className="relative z-10">
                <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                  {active.description}
                </p>

                <ul className="mt-6 space-y-2.5">
                  {active.features.map((line, i) => (
                    <li
                      key={line}
                      className="group/feat flex items-start gap-3 rounded-xl border border-transparent px-2 py-2 text-sm transition-[border-color,background-color] duration-300 hover:border-border/60 hover:bg-muted/25 sm:text-base"
                      style={{ animationDelay: `${i * 60}ms` }}
                    >
                      <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary ring-2 ring-transparent transition-[transform,box-shadow] duration-300 group-hover/feat:scale-110 group-hover/feat:ring-primary/20">
                        <Check className="h-3 w-3" strokeWidth={3} />
                      </span>
                      <span className="min-w-0 flex-1 text-pretty text-foreground/95">{line}</span>
                    </li>
                  ))}
                </ul>

                <Separator className="my-6 bg-border/80" />

                <blockquote className="glass-pill relative rounded-xl p-4 pl-5">
                  <span
                    className="absolute left-0 top-3 h-8 w-1 rounded-full bg-gradient-to-b from-primary to-accent"
                    aria-hidden
                  />
                  <p className="text-pretty text-sm italic leading-relaxed text-foreground/90">
                    &ldquo;{active.quote.text}&rdquo;
                  </p>
                  <footer className="mt-3 text-xs text-muted-foreground sm:text-sm">
                    <span className="font-medium text-foreground">{active.quote.author}</span>
                    <span className="text-muted-foreground"> · </span>
                    {active.quote.role}
                  </footer>
                </blockquote>

                <Separator className="my-6 bg-border/80" />

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-2">
                  {active.metrics.map((m) => (
                    <button
                      key={m.label}
                      type="button"
                      className="glass-panel group/m flex min-h-[4.75rem] flex-col justify-center rounded-xl px-3 py-2.5 text-left transition-[transform,border-color,box-shadow,background-color] duration-300 hover:-translate-y-0.5 hover:border-primary/30 hover:bg-primary/5 hover:shadow-md sm:min-h-[5rem]"
                    >
                      <span className="font-heading text-lg font-bold tabular-nums tracking-tight text-foreground transition-colors group-hover/m:text-primary sm:text-xl">
                        {m.value}
                      </span>
                      <span className="mt-0.5 text-[11px] leading-snug text-muted-foreground sm:text-xs">
                        {m.label}
                      </span>
                    </button>
                  ))}
                </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </SectionReveal>
    </section>
  );
}
