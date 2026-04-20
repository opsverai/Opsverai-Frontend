import { useEffect, useRef } from "react";

import { SectionReveal } from "@/components/landing/SectionReveal";
import { useHowItWorksStepHash } from "@/hooks/useHowItWorksStepHash";
import { cn } from "@/lib/utils";

function withAlpha(rgb: string, alpha: number) {
  return rgb.replace("rgb(", "rgba(").replace(")", `, ${alpha})`);
}

/** Site brand RGB: charcoal · deep sage · sage · gold */
const INK = "rgb(69, 71, 75)";
const DEEP = "rgb(60, 77, 71)";
const CORE = "rgb(73, 94, 87)";
const FLAME = "rgb(244, 206, 20)";

type HowStep = {
  num: string;
  tag: string;
  title: readonly [string, string];
  body: string;
  pill: string;
  color: string;
};

const steps: HowStep[] = [
  {
    num: "01",
    tag: "Capture",
    title: ["DROP YOUR", "IDEA HERE"],
    body: "Notes, voice, links, or half-formed decks: one intake layer for every kind of beginning.",
    pill: "Voice · Paste · File",
    color: FLAME,
  },
  {
    num: "02",
    tag: "Structure",
    title: ["THE SYSTEM MAPS", "YOUR STARTUP"],
    body: "Business model, feature outline, market positioning, and milestones, organized into a structured canvas you can defend.",
    pill: "Lean · Memo · Deck",
    color: CORE,
  },
  {
    num: "03",
    tag: "Stress-test",
    title: ["CHALLENGE", "ASSUMPTIONS"],
    body: "Guided prompts surface risks, comparables, and the experiments that strengthen your concept.",
    pill: "What-if prompts",
    color: FLAME,
  },
  {
    num: "04",
    tag: "Export",
    title: ["EXPORT &", "SHARE"],
    body: "Reports, summaries, investor one-pagers, and collaborator views, ready to share without rebuilding from scratch.",
    pill: "PDF · Link · Snapshot",
    color: CORE,
  },
];

const stats = [
  { num: "Under 3 min", label: "to first canvas", color: FLAME },
  { num: "40+", label: "guided blocks", color: CORE },
  { num: "24/7", label: "intelligent co-pilot", color: FLAME },
  { num: "Unlimited", label: "idea iterations", color: CORE },
] as const;

const links = [
  { c1: FLAME, c2: CORE },
  { c1: CORE, c2: DEEP },
  { c1: DEEP, c2: FLAME },
] as const;

function drawChainSVG(svgEl: SVGSVGElement, outerEl: HTMLElement) {
  const W = outerEl.offsetWidth;
  const stepW = W / 4;
  const svgW = 1060;
  const svgH = 120;
  const scale = svgW / W;
  const nodeRadius = 48 * scale;
  const nodeCY = svgH / 2;

  const ns = "http://www.w3.org/2000/svg";
  svgEl.innerHTML = "";
  svgEl.setAttribute("viewBox", `0 0 ${svgW} ${svgH}`);

  const defs = document.createElementNS(ns, "defs");
  svgEl.appendChild(defs);

  links.forEach((link, i) => {
    const fromX = (stepW * i + stepW / 2) * scale;
    const toX = (stepW * (i + 1) + stepW / 2) * scale;
    const startX = fromX + nodeRadius * 0.82;
    const endX = toX - nodeRadius * 0.82;

    const gradId = `hiw-grad-${i}`;
    const grad = document.createElementNS(ns, "linearGradient");
    grad.setAttribute("id", gradId);
    grad.setAttribute("x1", "0%");
    grad.setAttribute("x2", "100%");
    grad.innerHTML = `
      <stop offset="0%"   stop-color="${link.c1}" stop-opacity="0.8"/>
      <stop offset="100%" stop-color="${link.c2}" stop-opacity="0.8"/>
    `;
    defs.appendChild(grad);

    const numLinks = 5;
    const spacing = (endX - startX) / numLinks;

    for (let k = 0; k < numLinks; k++) {
      const x = startX + spacing * k + spacing / 2;
      const isH = k % 2 === 0;
      const rx = isH ? spacing * 0.44 : spacing * 0.22;
      const ry = isH ? 5 : 9;

      const el = document.createElementNS(ns, "ellipse");
      el.setAttribute("cx", String(x));
      el.setAttribute("cy", String(nodeCY));
      el.setAttribute("rx", String(rx));
      el.setAttribute("ry", String(ry));
      el.setAttribute("fill", "none");
      el.setAttribute("stroke", `url(#${gradId})`);
      el.setAttribute("stroke-width", "1.5");
      el.setAttribute("opacity", "0.7");
      svgEl.appendChild(el);

      const hi = document.createElementNS(ns, "ellipse");
      hi.setAttribute("cx", String(x));
      hi.setAttribute("cy", String(nodeCY - ry * 0.3));
      hi.setAttribute("rx", String(rx * 0.5));
      hi.setAttribute("ry", String(ry * 0.25));
      hi.setAttribute("fill", "none");
      hi.setAttribute("stroke", k % 2 === 0 ? link.c1 : link.c2);
      hi.setAttribute("stroke-width", "0.8");
      hi.setAttribute("opacity", "0.4");
      svgEl.appendChild(hi);
    }

    const dot = document.createElementNS(ns, "circle");
    dot.setAttribute("r", "3");
    dot.setAttribute("fill", link.c1);
    dot.setAttribute("opacity", "0.9");
    const anim = document.createElementNS(ns, "animateMotion");
    anim.setAttribute("dur", `${2.2 + i * 0.4}s`);
    anim.setAttribute("repeatCount", "indefinite");
    anim.setAttribute("begin", `${i * 0.7}s`);
    anim.setAttribute(
      "path",
      `M${startX},${nodeCY} C${startX + 20},${nodeCY - 8} ${endX - 20},${nodeCY + 8} ${endX},${nodeCY}`,
    );
    dot.appendChild(anim);
    svgEl.appendChild(dot);
  });
}

function StepNode({ step, idx, active }: { step: (typeof steps)[number]; idx: number; active?: boolean }) {
  return (
    <div className={cn("hiw-node-ring", active && "hiw-node-ring--active")}>
      <div
        className="hiw-node-outer"
        style={{ borderColor: step.color, animationDelay: `${idx * 0.55}s` }}
      />
      <div className="hiw-node-mid" style={{ borderColor: `${step.color}60` }} />
      <div className="hiw-node-core" style={{ background: `${step.color}18` }}>
        <span className="hiw-node-num" style={{ color: step.color }}>
          {step.num}
        </span>
      </div>
      <div className="hiw-orb" style={{ background: step.color, animationDelay: `${idx * -0.7}s` }} />
    </div>
  );
}

const HowItWorks = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const outerRef = useRef<HTMLDivElement>(null);
  const highlightedStep = useHowItWorksStepHash();

  useEffect(() => {
    const draw = () => {
      if (svgRef.current && outerRef.current) {
        drawChainSVG(svgRef.current, outerRef.current);
      }
    };
    const t = window.setTimeout(draw, 80);
    window.addEventListener("resize", draw);
    return () => {
      window.clearTimeout(t);
      window.removeEventListener("resize", draw);
    };
  }, []);

  return (
    <section id="how-it-works" className="hiw">
      <SectionReveal className="flex w-full flex-col items-center">
      <div className="hiw-hdr">
        <div className="hiw-eyebrow">HOW IT WORKS</div>
        <div className="hiw-title">
          From Raw Idea to Structured Concept
        </div>
        <p className="hiw-sub">Each step builds on the last: capture, structure, test, and share without losing your direction.</p>
      </div>

      <div className="hiw-chain-outer" ref={outerRef}>
        <svg className="hiw-chain-svg" ref={svgRef} aria-hidden />
        <div className="hiw-steps-row">
          {steps.map((step, i) => {
            const isHighlighted = highlightedStep === i + 1;
            return (
            <div
              key={step.num}
              id={`how-it-works-step-${i + 1}`}
              className={cn(
                "hiw-step scroll-mt-[5.25rem] sm:scroll-mt-[4.5rem] rounded-2xl transition-[box-shadow,background-color] duration-300 ease-out",
                isHighlighted && "z-[8] px-2 pb-3 pt-1 sm:px-2.5",
              )}
              style={{
                animationDelay: `${0.05 + i * 0.13}s`,
                ...(isHighlighted
                  ? {
                      backgroundColor: withAlpha(step.color, 0.09),
                      boxShadow: `0 0 0 1px ${withAlpha(step.color, 0.5)}, 0 22px 52px -18px ${withAlpha(step.color, 0.28)}`,
                    }
                  : {}),
              }}
            >
              <StepNode step={step} idx={i} active={isHighlighted} />
              <span className="hiw-step-tag" style={{ color: step.color }}>
                {step.tag}
              </span>
              <div className="hiw-step-title">
                {step.title[0]}
                <br />
                {step.title[1]}
              </div>
              <p className="hiw-step-body">{step.body}</p>
              <div className="hiw-pill" style={{ color: step.color, borderColor: `${step.color}40` }}>
                {step.pill}
              </div>
            </div>
            );
          })}
        </div>
      </div>

      <div className="hiw-bottom">
        {stats.map((s) => (
          <div key={s.label} className="hiw-stat">
            <div className="hiw-stat-num" style={{ color: s.color }}>
              {s.num}
            </div>
            <div className="hiw-stat-label">{s.label}</div>
          </div>
        ))}
        <a href="#contact" className="hiw-cta-btn">
          Open the workspace →
        </a>
      </div>
      </SectionReveal>
    </section>
  );
};

export default HowItWorks;
