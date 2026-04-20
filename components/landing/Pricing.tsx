import { useState } from "react";
import { SectionReveal } from "@/components/landing/SectionReveal";
import { Button } from "@/components/ui/button";
import { TiltSurface } from "@/components/ui/tilt-surface";
import { cn } from "@/lib/utils";
import { cssBgUrl, images } from "@/lib/publicImages";
import { Check, Sparkles } from "lucide-react";

const plans = [
  {
    name: "Starter",
    monthly: 0,
    yearly: 0,
    description: "For solo founders and creators building their first structured concept.",
    features: ["Up to 3 active concepts", "Core blueprint & framing blocks", "Community office hours", "Standard PDF & link exports"],
    popular: false,
    tierLabel: "Launch",
    cardTone: "starter",
    stripeMonthlyUrl: "https://buy.stripe.com/test_dRmcN5fYW9cW06sb819R60c",
    stripeYearlyUrl: "https://buy.stripe.com/test_00w8wP8wu88Sf1m4JD9R60f",
  },
  {
    name: "Pro",
    monthly: 29,
    yearly: 24,
    description: "For teams needing advanced concept generation and collaboration.",
    features: ["Unlimited concepts", "Advanced intelligent generation and scenario critiques.", "Priority support", "Shared workspaces & comments", "Version snapshots", "Premium blueprint templates"],
    popular: true,
    tierLabel: "Growth",
    cardTone: "pro",
    stripeMonthlyUrl: "https://buy.stripe.com/test_00w7sL9Aydtc06s4JD9R60d",
    stripeYearlyUrl: "https://buy.stripe.com/test_3cI6oHcMK3SC7yUcc59R60h",
  },
  {
    name: "Business",
    monthly: 79,
    yearly: 66,
    description: "For programs, studios, and venture teams operating at scale.",
    features: ["Everything in Pro", "SSO & admin controls", "Dedicated success partner", "Portfolio-level reporting", "API access and integrations", "Audit-ready history"],
    popular: false,
    tierLabel: "Scale",
    cardTone: "business",
    stripeMonthlyUrl: "https://buy.stripe.com/test_fZu7sLbIG3SCcTegsl9R60e",
    stripeYearlyUrl: "https://buy.stripe.com/test_5kQ28r3ca2OydXi3Fz9R60i",
  },
] as const;

const Pricing = () => {
  const [yearly, setYearly] = useState(false);

  return (
    <section
      id="pricing"
      className="relative overflow-hidden border-y border-border/40 bg-black py-24 lg:py-32"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.3]"
        aria-hidden
        style={{
          backgroundImage: cssBgUrl(images.pricingBg),
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
      {/* Ambient backdrop */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.4] dark:opacity-[0.22]"
        aria-hidden
        style={{
          backgroundImage: `linear-gradient(hsl(var(--foreground) / 0.04) 1px, transparent 1px),
            linear-gradient(90deg, hsl(var(--foreground) / 0.04) 1px, transparent 1px)`,
          backgroundSize: "52px 52px",
        }}
      />
      <div
        className="pointer-events-none absolute -left-1/4 top-1/2 h-[min(32rem,70vw)] w-[min(32rem,70vw)] -translate-y-1/2 rounded-full bg-primary/[0.07] blur-3xl dark:bg-primary/[0.12]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-1/4 bottom-0 h-[min(28rem,60vw)] w-[min(28rem,60vw)] translate-y-1/3 rounded-full bg-accent/[0.06] blur-3xl dark:bg-accent/[0.1]"
        aria-hidden
      />

      <SectionReveal>
      <div className="container relative mx-auto px-4 lg:px-8">
        <div className="mx-auto mb-12 max-w-2xl text-center md:mb-14">
          <div className="glass-pill mx-auto mb-6 inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium text-muted-foreground">
            <Sparkles className="h-3.5 w-3.5 text-accent" strokeWidth={2} aria-hidden />
            <span>Pricing</span>
          </div>
          <h2 className="font-heading text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-[2.75rem]">
            Simple, transparent{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">pricing</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Tiered plans with structured depth- upgrade for advanced outputs, premium blueprint exports, and enterprise
            packages for innovation programs.
          </p>
        </div>

        {/* Billing toggle */}
        <div className="mb-14 flex w-full max-w-full flex-col items-center gap-2 px-1">
          <div className="flex w-full max-w-md flex-wrap items-center justify-center gap-1 rounded-2xl border border-border/70 bg-card/35 p-1.5 shadow-sm backdrop-blur-md sm:max-w-none sm:flex-nowrap">
            <button
              type="button"
              onClick={() => setYearly(false)}
              className={cn(
                "rounded-xl px-4 py-2 text-sm font-semibold transition-all duration-300 ease-out-expo sm:px-5",
                !yearly
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              Monthly
            </button>
            <button
              type="button"
              onClick={() => setYearly(true)}
              className={cn(
                "flex items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition-all duration-300 ease-out-expo sm:px-5",
                yearly
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              Yearly
              <span
                className={cn(
                  "rounded-md px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide",
                  yearly ? "bg-primary-foreground/20 text-primary-foreground" : "bg-accent/15 text-accent",
                )}
              >
                Save 20%
              </span>
            </button>
          </div>
          <p className="text-xs text-muted-foreground">Annual plans save the equivalent of two months.</p>
        </div>

        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-3 md:gap-5 lg:gap-6">
          {plans.map((plan) => {
            const isStarter = plan.cardTone === "starter";
            const isPro = plan.cardTone === "pro";
            const isBusiness = plan.cardTone === "business";

            return (
            <TiltSurface key={plan.name} tiltAmount={plan.popular ? 3 : 5} perspective={1000} className={plan.popular ? "md:-mt-1 md:mb-1" : ""}>
              <div
                className={cn(
                  "relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border p-6 pt-8 shadow-depth-lg backdrop-blur-xl transition-[transform,box-shadow,border-color] duration-500 ease-out-expo md:p-7 md:pt-9",
                  "bg-gradient-to-b from-card/85 via-card/55 to-card/25 ring-1 ring-inset ring-white/[0.06] dark:from-card/70 dark:via-card/45 dark:to-background/25 dark:ring-white/[0.04]",
                  "before:pointer-events-none before:absolute before:left-0 before:top-1/2 before:h-[min(65%,15rem)] before:w-[3px] before:-translate-y-1/2 before:rounded-full before:content-['']",
                  isPro &&
                    "border-primary/40 shadow-[0_28px_72px_-36px_hsl(var(--primary)/0.42)] ring-primary/10 before:bg-gradient-to-b before:from-primary before:via-primary/80 before:to-accent/90 hover:border-primary/55 hover:shadow-[0_32px_80px_-32px_hsl(var(--primary)/0.38)]",
                  isStarter &&
                    "border-border/55 before:bg-gradient-to-b before:from-emerald-400/90 before:via-emerald-500/50 before:to-emerald-600/40 hover:-translate-y-1 hover:border-emerald-400/25",
                  isBusiness &&
                    "border-border/55 before:bg-gradient-to-b before:from-sky-400/90 before:via-sky-500/50 before:to-sky-600/40 hover:-translate-y-1 hover:border-sky-400/25",
                )}
              >
                <div
                  className={cn(
                    "pointer-events-none absolute inset-0 opacity-90",
                    isPro && "bg-[radial-gradient(ellipse_90%_55%_at_50%_-10%,hsl(var(--primary)/0.2),transparent_52%)]",
                    isStarter && "bg-[radial-gradient(ellipse_90%_50%_at_50%_-8%,rgb(52_211_153/0.14),transparent_50%)]",
                    isBusiness && "bg-[radial-gradient(ellipse_90%_50%_at_50%_-8%,rgb(56_189_248/0.14),transparent_50%)]",
                  )}
                  aria-hidden
                />
                {plan.popular && (
                  <>
                    <div
                      className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-primary/70 to-transparent"
                      aria-hidden
                    />
                    <div className="absolute left-1/2 top-2.5 z-10 -translate-x-1/2 whitespace-nowrap rounded-full border border-primary/35 bg-primary/12 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-primary shadow-md backdrop-blur-md sm:px-3.5 sm:text-[11px]">
                      Most popular
                    </div>
                  </>
                )}

                <div className="relative z-10 flex flex-1 flex-col pl-1 sm:pl-1.5">
                  <div className="mb-2">
                    <span
                      className={cn(
                        "inline-flex rounded-full border px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.14em] backdrop-blur-sm",
                        isPro && "border-primary/35 bg-primary/12 text-primary",
                        isStarter && "border-emerald-400/30 bg-emerald-500/10 text-emerald-100/90",
                        isBusiness && "border-sky-400/30 bg-sky-500/10 text-sky-100/90",
                      )}
                    >
                      {plan.tierLabel}
                    </span>
                  </div>
                  <h3 className="font-heading text-lg font-bold tracking-tight text-foreground md:text-xl">{plan.name}</h3>
                  <p className="mt-1.5 text-sm leading-snug text-muted-foreground">
                    {plan.description}
                  </p>

                  <div className="mt-4 mb-1 rounded-xl border border-border/40 bg-background/25 px-3 py-3.5 backdrop-blur-sm dark:bg-background/15">
                    <div className="flex items-baseline gap-1">
                      <span className="font-heading text-3xl font-bold tabular-nums tracking-tight text-foreground sm:text-4xl">
                        {plan.monthly === 0 && plan.yearly === 0 ? (
                          "$0"
                        ) : (
                          <>
                            <span className="text-xl font-semibold text-muted-foreground sm:text-2xl">$</span>
                            {yearly ? plan.yearly : plan.monthly}
                          </>
                        )}
                      </span>
                      <span className="text-sm font-medium text-muted-foreground">/mo</span>
                    </div>
                    {yearly && plan.monthly > 0 && (
                      <p className="mt-1 text-xs text-muted-foreground">
                        <span className="line-through opacity-60">${plan.monthly * 12}/yr at monthly</span>
                        <span className="mx-1.5 text-border">·</span>
                        <span className="font-medium text-foreground/80">${plan.yearly * 12}/yr billed</span>
                      </p>
                    )}
                    {!yearly && plan.monthly > 0 && (
                      <p className="mt-1 text-xs text-muted-foreground">Or ${plan.yearly * 12}/yr when billed yearly.</p>
                    )}
                  </div>

                  <Button
                    variant={plan.popular ? "hero" : "hero-outline"}
                    size="default"
                    className="mb-5 h-10 w-full rounded-full text-sm font-semibold shadow-sm transition-[transform,box-shadow] duration-300 hover:shadow-md sm:h-11"
                    asChild
                  >
                    <a
                      href={yearly ? plan.stripeYearlyUrl : plan.stripeMonthlyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {plan.monthly === 0 ? "Get started free" : "Start free trial"}
                    </a>
                  </Button>

                  <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground/90">
                    Included
                  </p>
                  <ul className="space-y-1.5">
                    {plan.features.map((f) => (
                      <li
                        key={f}
                        className="flex gap-2.5 rounded-lg border border-border/25 bg-card/20 px-2.5 py-2 text-[13px] leading-snug backdrop-blur-sm dark:bg-card/10"
                      >
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-primary/25 bg-primary/10 text-primary">
                          <Check className="h-3 w-3" strokeWidth={2.25} aria-hidden />
                        </span>
                        <span className="text-muted-foreground">{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </TiltSurface>
            );
          })}
        </div>
      </div>
      </SectionReveal>
    </section>
  );
};

export default Pricing;
