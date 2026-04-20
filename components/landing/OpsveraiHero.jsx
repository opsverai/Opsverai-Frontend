import { Button } from "@/components/ui/button";
import { useHowItWorksStepHash } from "@/hooks/useHowItWorksStepHash";
import { COMPANY } from "@/lib/company";
import { cn } from "@/lib/utils";
import { ArrowRight, Play } from "lucide-react";
import { images } from "@/lib/publicImages";

const hiwStepLinkBase =
  "inline-flex min-h-9 min-w-9 items-center justify-center rounded-md px-2 py-1 text-[10px] font-bold uppercase tracking-[0.24em] text-foreground/90 transition-[background-color,color,box-shadow,border-color] duration-450 ease-out-expo focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[rgb(69_71_75)] sm:text-[11px]";

export default function OpsveraiHero() {
  const hashStep = useHowItWorksStepHash();
  const activeNavStep = hashStep ?? 1;

  return (
    <section
      id="home"
      className="relative flex min-h-svh flex-col overflow-hidden pt-28 text-foreground sm:pt-32"
    >
      <div className="pointer-events-none absolute inset-0 z-0 bg-black" aria-hidden>
        <img
          src={images.hero}
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-[60%_center] opacity-100 brightness-[0.86] sm:object-center"
          loading="eager"
          decoding="async"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/62 via-black/52 to-black/82" />
      </div>
      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col px-4 sm:px-6 md:pl-16 md:pr-6 lg:pl-28 lg:pr-8">
        <div className="flex flex-1 flex-col justify-center pb-8 pt-6 lg:pb-12 lg:pt-4">
          <div className="mx-auto flex w-full max-w-3xl translate-x-0 flex-col items-center text-center sm:max-w-4xl sm:translate-x-2 md:translate-x-16 lg:translate-x-[6.25rem]">
            <div className="relative w-full max-w-4xl">
              <div
                className="mx-auto mb-5 h-px w-[min(12rem,40vw)] origin-center bg-gradient-to-r from-transparent via-primary/60 to-transparent motion-reduce:animate-none animate-hero-line-in"
                style={{ animationDelay: "0.08s" }}
                aria-hidden
              />
              <h1 className="font-heading text-[2.35rem] font-extrabold leading-[1.08] tracking-tight transition-[opacity,transform,filter] duration-700 ease-out-expo sm:text-5xl sm:leading-[1.06] lg:text-6xl lg:leading-[1.04] xl:text-[4rem]">
                <span className="block opacity-0 drop-shadow-sm animate-reveal-hero-line transition-[opacity,transform,filter] duration-700 ease-out-expo motion-reduce:opacity-100" style={{ animationDelay: "0.1s" }}>
                  Turn Raw Ideas into
                </span>
                <span className="mt-2 block opacity-0 animate-reveal-hero-line transition-[opacity,transform,filter] duration-700 ease-out-expo motion-reduce:opacity-100" style={{ animationDelay: "0.22s" }}>
                  <span className="text-[hsl(47,88%,48%)] transition-[color,filter] duration-500 ease-out-expo [text-shadow:0_1px_2px_rgb(0_0_0/0.95),0_0_1px_rgb(0_0_0/0.9),0_4px_22px_rgb(0_0_0/0.78),0_0_36px_rgb(0_0_0/0.5)] motion-reduce:transition-none">
                    Structured Startup
                  </span>
                  <span className="block text-foreground transition-colors duration-500 ease-out-expo [text-shadow:0_1px_2px_rgb(0_0_0/0.85)] motion-reduce:transition-none">
                    concepts
                  </span>
                </span>
              </h1>
            </div>

            <p
              className="mt-6 max-w-2xl text-pretty text-[15px] font-normal leading-relaxed text-muted-foreground opacity-0 animate-fade-in transition-[opacity,transform,color] duration-650 ease-out-expo motion-reduce:opacity-100 motion-reduce:transition-none sm:mt-7 sm:text-base sm:hover:text-foreground/90"
              style={{ animationDelay: "0.34s" }}
            >
              {COMPANY.legalName} helps entrepreneurs, creators, and teams turn raw ideas into clear business models, feature
              plans, and execution-ready strategies.
            </p>

            <div
              className="mt-8 mb-10 flex w-full flex-col items-center gap-3 opacity-0 animate-fade-in motion-reduce:opacity-100 sm:mt-9 sm:mb-12 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-4 lg:mb-14"
              style={{ animationDelay: "0.42s" }}
            >
              <Button
                asChild
                variant="hero"
                size="lg"
                className="group h-12 w-full min-w-[10.5rem] rounded-full border border-primary/45 bg-[linear-gradient(110deg,rgb(244_206_20)_0%,rgb(244_206_20)_80%,rgb(69_71_75)_100%)] px-8 text-base font-semibold text-[rgb(26_26_26)] shadow-[0_18px_40px_-22px_rgb(0_0_0/0.65)] transition-[filter,transform,box-shadow] duration-450 ease-out-expo hover:scale-[1.02] hover:brightness-105 hover:shadow-[0_22px_48px_-20px_rgb(244_206_20/0.22)] active:scale-[0.98] motion-reduce:transition-none motion-reduce:hover:scale-100 sm:h-11 sm:w-auto"
              >
                <a href="/product">
                  Start Now{" "}
                  <ArrowRight
                    className="ml-1 transition-transform duration-450 ease-out-expo group-hover:translate-x-1"
                    size={18}
                  />
                </a>
              </Button>
              <Button
                asChild
                variant="ghost"
                size="lg"
                className="group h-12 w-full min-w-[10.5rem] rounded-full border border-border/55 bg-[rgb(69_71_75)]/50 px-8 text-base font-semibold text-foreground shadow-[inset_0_1px_0_rgb(255_255_255/0.05)] backdrop-blur-md transition-[transform,background-color,border-color,box-shadow] duration-450 ease-out-expo hover:scale-[1.02] hover:border-primary/35 hover:bg-muted/40 active:scale-[0.98] motion-reduce:transition-none motion-reduce:hover:scale-100 sm:h-11 sm:w-auto"
              >
                <a href="#how-it-works" className="inline-flex items-center justify-center gap-0">
                  <Play size={18} className="mr-2 text-primary transition-transform duration-450 ease-out-expo group-hover:scale-110 motion-reduce:transition-none" />
                  Explore platform
                </a>
              </Button>
            </div>

          </div>

        </div>

        {/* Bottom rail — angled, not a centered pill ribbon */}
        <div
          className="mt-auto w-full border-t border-border/35 bg-[rgb(10_10_10)]/55 py-4 opacity-0 backdrop-blur-xl transition-[background-color,border-color] duration-500 ease-out-expo animate-fade-in motion-reduce:opacity-100 motion-reduce:transition-none md:rounded-t-xl md:border md:border-b-0 md:border-border/40"
          style={{ animationDelay: "0.58s" }}
        >
          <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
            <p className="max-w-2xl text-center text-xs leading-relaxed text-foreground/85 sm:text-left sm:text-[13px]">
              <span className="font-semibold text-foreground">{COMPANY.domain}</span> · AI innovation workspace from ideation to
              structured startup blueprints.
            </p>
            <nav
              aria-label="Jump to How it works steps"
              className="flex shrink-0 items-center justify-center text-foreground/75 sm:justify-end"
            >
              <a
                href="#how-it-works-step-1"
                aria-label="How it works, step 1: Capture"
                aria-current={activeNavStep === 1 ? "step" : undefined}
                className={cn(
                  hiwStepLinkBase,
                  activeNavStep === 1
                    ? "border border-primary/35 bg-primary/25 text-foreground hover:bg-primary/30 focus-visible:ring-primary/40"
                    : "text-foreground/80 hover:bg-foreground/[0.06] hover:text-foreground focus-visible:ring-primary/35",
                )}
              >
                01
              </a>
              <span
                className={cn(
                  "mx-2 h-px w-5 shrink-0 rounded-full sm:mx-2.5 sm:w-8",
                  activeNavStep > 1
                    ? "bg-gradient-to-r from-primary/55 via-primary/25 to-border/75"
                    : "bg-gradient-to-r from-primary/45 via-primary/15 to-border/70",
                )}
                aria-hidden
              />
              <a
                href="#how-it-works-step-2"
                aria-label="How it works, step 2: Structure"
                aria-current={activeNavStep === 2 ? "step" : undefined}
                className={cn(
                  hiwStepLinkBase,
                  activeNavStep === 2
                    ? "border border-primary/25 bg-primary/10 text-primary hover:bg-primary/18 focus-visible:ring-primary/40"
                    : "text-foreground/80 hover:bg-foreground/[0.06] hover:text-foreground focus-visible:ring-primary/35",
                )}
              >
                02
              </a>
              <span
                className={cn(
                  "mx-2 h-px w-5 shrink-0 rounded-full sm:mx-2.5 sm:w-8",
                  activeNavStep > 2
                    ? "bg-gradient-to-r from-primary/50 via-primary/22 to-border/78"
                    : "bg-gradient-to-r from-border/80 via-border/50 to-border/80",
                )}
                aria-hidden
              />
              <a
                href="#how-it-works-step-3"
                aria-label="How it works, step 3: Stress-test"
                aria-current={activeNavStep === 3 ? "step" : undefined}
                className={cn(
                  hiwStepLinkBase,
                  activeNavStep === 3
                    ? "border border-primary/25 bg-primary/10 text-primary hover:bg-primary/18 focus-visible:ring-primary/40"
                    : "text-foreground/80 hover:bg-foreground/[0.06] hover:text-foreground focus-visible:ring-primary/35",
                )}
              >
                03
              </a>
              <span
                className={cn(
                  "mx-2 h-px w-5 shrink-0 rounded-full sm:mx-2.5 sm:w-8",
                  activeNavStep > 3
                    ? "bg-gradient-to-r from-primary/50 via-primary/22 to-border/78"
                    : "bg-gradient-to-r from-border/80 via-border/50 to-border/80",
                )}
                aria-hidden
              />
              <a
                href="#how-it-works-step-4"
                aria-label="How it works, step 4: Ship"
                aria-current={activeNavStep === 4 ? "step" : undefined}
                className={cn(
                  hiwStepLinkBase,
                  activeNavStep === 4
                    ? "border border-primary/25 bg-primary/10 text-primary hover:bg-primary/18 focus-visible:ring-primary/40"
                    : "text-foreground/80 hover:bg-foreground/[0.06] hover:text-foreground focus-visible:ring-primary/35",
                )}
              >
                04
              </a>
            </nav>
          </div>
        </div>
      </div>
    </section>
  );
}
