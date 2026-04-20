import { useEffect, useRef, useState, type ReactNode } from "react";

import { cn } from "@/lib/utils";

type SectionRevealProps = {
  children: ReactNode;
  className?: string;
  /** Delay after the section intersects before the animation starts */
  delayMs?: number;
};

/**
 * Scroll-triggered fade + rise for section body content.
 * Decorative backgrounds should stay outside this wrapper.
 */
export function SectionReveal({ children, className, delayMs = 0 }: SectionRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
    const onChange = () => setReduceMotion(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (reduceMotion) {
      setShown(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setShown(true);
          obs.disconnect();
        }
      },
      { root: null, rootMargin: "0px 0px -8% 0px", threshold: [0, 0.05, 0.1] },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [reduceMotion]);

  return (
    <div
      ref={ref}
      className={cn(
        "w-full",
        !reduceMotion && !shown && "opacity-0",
        !reduceMotion && shown && "motion-safe:animate-section-in",
        reduceMotion && "opacity-100",
        className,
      )}
      style={
        shown && !reduceMotion && delayMs > 0 ? { animationDelay: `${delayMs}ms` } : undefined
      }
    >
      {children}
    </div>
  );
}
