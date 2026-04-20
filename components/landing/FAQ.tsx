import { MessageCircle, RotateCcw } from "lucide-react";
import { useState } from "react";

import { SectionReveal } from "@/components/landing/SectionReveal";
import { cn } from "@/lib/utils";

type FaqEntry = {
  id: string;
  question: string;
  answer: string;
};

const FAQ_ITEMS: FaqEntry[] = [
  {
    id: "what-is-opsverai",
    question: "What is Opsverai?",
    answer:
      "Opsverai is an innovation workspace where entrepreneurs, creators, and teams convert raw ideas into structured startup concepts, including business models, feature plans, market positioning, execution strategies, and summaries, built on intelligent processing rather than disconnected brainstorming tools.",
  },
  {
    id: "how-it-works",
    question: "How does it work?",
    answer:
      "Bring notes, links, voice memos, or half-formed decks. Opsverai organizes them into guided blocks, surfaces assumptions to validate, suggests experiments, and keeps every iteration in one centralised workspace. Export blueprint-ready summaries, lean canvases, feature outlines, or investor packages when stakeholders are ready.",
  },
  {
    id: "data-safe",
    question: "Is my idea data safe?",
    answer:
      "Yes. All data is encrypted in transit and at rest, sharing is controlled per workspace, and you decide what collaborators can see. Business plans add SSO, admin controls, and history exports that innovation programs and studios require.",
  },
  {
    id: "can-i-collaborate",
    question: "Can I collaborate with my team or mentors?",
    answer:
      "Yes. Invite cofounders, advisors, or teammates into the same workspace with scoped access. Everyone comments and iterates on one shared canvas, so decisions stay centralized instead of scattered across documents.",
  },
  {
    id: "what-can-i-export",
    question: "What can I export from Opsverai?",
    answer:
      "Export structured outputs including startup summaries, lean-style canvases, feature plans, market positioning notes, and presentation-ready reports. All exports stay aligned with your latest iteration so handoffs are faster.",
  },
  {
    id: "is-it-for-non-technical-users",
    question: "Is Opsverai suitable for non-technical founders?",
    answer:
      "Yes. Opsverai is built for both technical and non-technical founders, with guided prompts and structured blocks that help you shape ideas into actionable startup concepts, no product or engineering background needed.",
  },
  {
    id: "cancel",
    question: "Can I cancel anytime?",
    answer:
      "Monthly plans can be cancelled before renewal with no long-term lock-in. Annual plans include a defined exit window, and you retain exports of canvases, snapshots, and comments in line with your agreement.",
  },
];

export default function FAQ() {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggleFlip = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      id="faq"
      className="relative overflow-hidden bg-black px-4 py-16 font-body sm:px-6 md:py-20 lg:px-10 lg:py-24"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      <SectionReveal>
      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-14 xl:gap-16">
          {/* Left column ~40% */}
          <div className="flex flex-col gap-8 lg:col-span-5">
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/35 bg-primary/10 px-3.5 py-1.5 text-xs font-medium tracking-wide text-primary">
                <MessageCircle className="h-3.5 w-3.5 text-primary" strokeWidth={2} />
                Your Questions, Answered
              </div>

              <h2 className="text-3xl font-extrabold leading-[1.1] tracking-tight text-foreground md:text-4xl lg:text-[2.75rem]">
                Frequently Asked <span className="text-primary">Questions</span>
              </h2>

              <p className="mt-5 max-w-md text-[15px] leading-relaxed text-muted-foreground md:text-base">
                Everything you need to know about Opsverai: how it structures ideas, how your work is protected, and how to begin. Tap any question to expand the answer. Tap again to close, or select another to switch.
              </p>
            </div>

            <div className="glass-panel rounded-2xl p-6 md:p-7">
              <h3 className="text-lg font-bold text-foreground md:text-xl">Still Have Questions?</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground md:text-[15px]">
                Book a short walkthrough. We&apos;ll map your idea stage, run a live workspace tour, and answer your questions on the spot.
              </p>
              <a
                href="#contact"
                className="mt-5 inline-flex items-center justify-center rounded-xl bg-foreground px-6 py-3 text-sm font-semibold text-background shadow-lg transition-[transform,box-shadow] duration-200 hover:scale-[1.02] hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                Book a Demo
              </a>
            </div>
          </div>

          {/* Right column ~60% */}
          <div className="mt-6 min-w-0 sm:mt-7 lg:col-span-7 lg:mt-8">
            <ul className="flex list-none flex-col gap-3 p-0">
              {FAQ_ITEMS.map((item) => {
                const isFlipped = openId === item.id;
                return (
                  <li key={item.id} className="[perspective:1200px]">
                    <button
                      type="button"
                      onClick={() => toggleFlip(item.id)}
                      aria-expanded={isFlipped}
                      aria-controls={`faq-a-${item.id}`}
                      id={`faq-q-${item.id}`}
                      className={cn(
                        "relative block w-full cursor-pointer overflow-hidden rounded-xl text-left outline-none",
                        "shadow-[0_12px_40px_rgba(0,0,0,0.18)] hover:brightness-[1.02] focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                        "motion-reduce:hover:brightness-100",
                        "transform-gpu transition-[min-height] duration-500 ease-out-expo motion-reduce:transition-[min-height] motion-reduce:duration-200",
                        isFlipped
                          ? "min-h-[min(26rem,72vh)] sm:min-h-[22rem]"
                          : "min-h-[3.75rem] sm:min-h-16",
                      )}
                    >
                      <div
                        className={cn(
                          "absolute inset-0 origin-center [transform-style:preserve-3d] transition-transform duration-500 ease-out-expo motion-reduce:duration-200",
                          isFlipped && "[transform:rotateY(180deg)]",
                        )}
                      >
                        {/* Front — compact question bar */}
                        <div
                          className={cn(
                            "glass-panel-strong absolute inset-0 flex items-center gap-3 rounded-xl border border-border/60 [backface-visibility:hidden]",
                            "px-3.5 py-2.5 sm:px-5 sm:py-3",
                          )}
                        >
                          <p className="min-w-0 flex-1 text-left text-[15px] font-semibold leading-snug text-foreground sm:text-base">
                            <span className="line-clamp-2">{item.question}</span>
                          </p>
                          <span
                            className="pointer-events-none flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-border/70 bg-background/80 text-foreground/80 shadow-inner sm:h-9 sm:w-9"
                            aria-hidden
                          >
                            <RotateCcw className="h-3.5 w-3.5 opacity-70 sm:h-4 sm:w-4" strokeWidth={2} />
                          </span>
                        </div>
                        {/* Back — answer (taller panel) */}
                        <div
                          id={`faq-a-${item.id}`}
                          role="region"
                          aria-labelledby={`faq-q-${item.id}`}
                          className={cn(
                            "glass-panel-strong absolute inset-0 flex min-h-full [transform:rotateY(180deg)] flex-col rounded-xl border border-primary/35 [backface-visibility:hidden]",
                            "px-4 py-4 sm:px-5 sm:py-5",
                          )}
                        >
                          <p className="min-h-0 flex-1 overflow-y-auto pr-1 text-[14px] leading-relaxed text-muted-foreground sm:text-[15px]">
                            {item.answer}
                          </p>
                          <p className="mt-3 shrink-0 text-xs font-medium text-primary/90">Tap to flip</p>
                        </div>
                      </div>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
      </SectionReveal>
    </section>
  );
}
