import { Button } from "@/components/ui/button";
import { COMPANY } from "@/lib/company";
import { ArrowRight, ChevronDown, Lightbulb, Play } from "lucide-react";

const Hero = () => {
  return (
    <section
      id="home"
      className="relative flex min-h-svh flex-col overflow-hidden border-b border-border/40 bg-gradient-to-b from-background via-muted/[0.35] to-background pt-32 text-foreground sm:pt-36"
    >
      {/* Match Core features / site sections: theme orbs + grid */}
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
        <div className="absolute -left-[20%] top-[8%] h-[min(32rem,70vw)] w-[min(32rem,70vw)] rounded-full bg-primary/[0.09] blur-3xl dark:bg-primary/[0.12]" />
        <div className="absolute -right-[15%] bottom-[10%] h-[min(28rem,55vw)] w-[min(28rem,55vw)] rounded-full bg-accent/[0.07] blur-3xl dark:bg-accent/[0.1]" />
        <div
          className="absolute inset-0 opacity-[0.4] dark:opacity-[0.22]"
          style={{
            backgroundImage: `linear-gradient(hsl(var(--foreground) / 0.045) 1px, transparent 1px),
              linear-gradient(90deg, hsl(var(--foreground) / 0.045) 1px, transparent 1px)`,
            backgroundSize: "56px 56px",
            maskImage: "radial-gradient(ellipse 80% 55% at 50% 35%, black 15%, transparent 68%)",
            WebkitMaskImage: "radial-gradient(ellipse 80% 55% at 50% 35%, black 15%, transparent 68%)",
          }}
        />
      </div>

      {/* Copy column */}
      <div className="relative z-10 mx-auto flex w-full max-w-none flex-1 flex-col px-4 sm:px-6 lg:px-10 xl:px-14">
        <div className="flex w-full flex-1 flex-col items-center justify-start pb-6 pt-8 text-center sm:pt-10 md:pb-10">
          <div className="flex w-full max-w-4xl flex-col items-center text-center">
            <div className="mb-6 flex w-full justify-center sm:mb-8">
              <div
                className="glass-pill inline-flex items-center gap-2 rounded-full border border-border/50 bg-card/40 px-4 py-2 opacity-0 shadow-sm backdrop-blur-md animate-fade-in motion-reduce:opacity-100"
                style={{ animationDelay: "0.06s" }}
              >
                <Lightbulb className="h-3.5 w-3.5 text-primary" strokeWidth={2} />
                <span className="text-xs font-medium tracking-wide text-muted-foreground">
                  Smart Idea-to-Startup Platform · <span className="text-foreground">AI-assisted</span>
                </span>
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary/45 opacity-75 motion-reduce:animate-none" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
                </span>
              </div>
            </div>

            <h1 className="w-full text-balance text-center font-heading text-4xl font-extrabold leading-[1.12] tracking-tight text-foreground sm:text-5xl sm:leading-[1.1] lg:text-6xl lg:leading-[1.08] xl:text-7xl xl:leading-[1.06]">
              <span
                className="block opacity-0 drop-shadow-sm animate-reveal-hero-line motion-reduce:opacity-100"
                style={{ animationDelay: "0.1s" }}
              >
                Turn raw ideas into
              </span>
              <span
                className="mt-2 block opacity-0 drop-shadow-sm animate-reveal-hero-line motion-reduce:opacity-100"
                style={{ animationDelay: "0.22s" }}
              >
                Actionable startup concepts
              </span>
            </h1>

            <p
              className="mt-6 w-full max-w-2xl text-pretty font-body font-normal text-base leading-relaxed text-muted-foreground opacity-0 animate-fade-in motion-reduce:opacity-100 sm:mt-7 sm:text-lg"
              style={{ animationDelay: "0.34s" }}
            >
              {COMPANY.legalName} is the AI innovation workspace where entrepreneurs, creators, and teams refine raw input into
              structured outputs—business models, feature plans, market positioning, and execution strategies—so early-stage
              development stays clear, centralized, and ready for stakeholders.
            </p>

            <div
              className="mt-8 flex w-full max-w-md flex-col items-stretch justify-center gap-3 opacity-0 animate-fade-in motion-reduce:opacity-100 sm:mt-9 sm:max-w-none sm:w-auto sm:flex-row sm:items-center sm:gap-4"
              style={{ animationDelay: "0.42s" }}
            >
              <Button
                variant="ghost"
                size="lg"
                className="group h-12 w-full rounded-full border border-primary/45 bg-card/60 px-8 text-base font-semibold text-foreground shadow-sm backdrop-blur-sm transition-[transform,box-shadow,border-color,background-color] duration-450 ease-out-expo hover:scale-[1.02] hover:border-primary/60 hover:bg-card/80 hover:shadow-md sm:h-11 sm:w-auto"
              >
                Try now{" "}
                <ArrowRight className="ml-1 transition-transform duration-450 ease-out-expo group-hover:translate-x-1" size={18} />
              </Button>
              <Button
                asChild
                variant="ghost"
                size="lg"
                className="group h-12 w-full rounded-full border border-border/60 bg-muted/40 px-8 text-base font-semibold text-foreground backdrop-blur-md transition-[transform,background-color,border-color] duration-450 ease-out-expo hover:border-border hover:bg-muted/55 sm:h-11 sm:w-auto"
              >
                <a href="#how-it-works" className="flex w-full items-center justify-center gap-0 sm:inline-flex sm:w-auto">
                  <Play size={18} className="mr-2 text-foreground" /> Explore platform
                </a>
              </Button>
            </div>

            <div
              className="mt-9 flex flex-wrap justify-center gap-2 opacity-0 animate-fade-in motion-reduce:opacity-100 sm:mt-10"
              style={{ animationDelay: "0.5s" }}
            >
              {["Business & feature blueprints", "Market positioning", "Execution-ready exports"].map((label) => (
                <span
                  key={label}
                  className="rounded-full border border-border/50 bg-muted/30 px-3 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur-sm transition-[border-color,background-color,color,transform] duration-450 ease-out-expo hover:-translate-y-0.5 hover:border-primary/35 hover:text-foreground"
                >
                  {label}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll cue */}
        <div
          className="pointer-events-none absolute bottom-28 left-4 z-20 hidden flex-col items-center gap-2 sm:bottom-32 sm:left-8 md:flex motion-safe:animate-fade-in"
          style={{ animationDelay: "0.55s" }}
        >
          <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">Scroll for more</span>
          <div className="flex h-9 w-9 items-center justify-center rounded-full border border-border/50 bg-card/50 backdrop-blur-md">
            <ChevronDown className="h-4 w-4 text-muted-foreground motion-safe:animate-bounce motion-reduce:animate-none" />
          </div>
        </div>

        {/* Bottom ribbon */}
        <div
          className="mt-auto flex w-full shrink-0 flex-col flex-wrap items-center justify-center gap-x-8 gap-y-3 rounded-2xl border border-border/50 bg-card/40 px-4 py-4 pb-[max(1.25rem,env(safe-area-inset-bottom))] text-center opacity-0 shadow-sm backdrop-blur-xl animate-fade-in motion-reduce:opacity-100 sm:px-6 sm:pb-6 sm:flex-row md:pb-8"
          style={{ animationDelay: "0.66s" }}
        >
          <p className="text-xs text-muted-foreground">
            <span className="font-semibold text-foreground">{COMPANY.domain}</span> – AI Innovation &amp; Idea Development Platform:
            your innovation engine from ideation to structured startup blueprints.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
            <span className="text-foreground">Ideate</span>
            <span className="hidden h-3 w-px bg-border sm:block" />
            <span>Structure</span>
            <span className="hidden h-3 w-px bg-border sm:block" />
            <span>Execute</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
