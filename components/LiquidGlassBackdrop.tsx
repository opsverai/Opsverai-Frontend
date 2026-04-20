import { useEffect, useState } from "react";

/**
 * Fixed iridescent mesh behind the app so frosted surfaces (glass-*) pick up depth and motion.
 */
export function LiquidGlassBackdrop() {
  const [showBackdrop, setShowBackdrop] = useState(true);

  useEffect(() => {
    const compact = window.matchMedia("(max-width: 767px)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const sync = () => setShowBackdrop(!compact.matches && !reducedMotion.matches);
    sync();

    compact.addEventListener("change", sync);
    reducedMotion.addEventListener("change", sync);
    return () => {
      compact.removeEventListener("change", sync);
      reducedMotion.removeEventListener("change", sync);
    };
  }, []);

  if (!showBackdrop) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden>
      <div className="liquid-glass-ambient" />
      <div className="liquid-glass-ambient-shimmer" />
    </div>
  );
}
