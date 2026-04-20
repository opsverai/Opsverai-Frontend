import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";

import { cn } from "@/lib/utils";

type TiltSurfaceProps = {
  children: ReactNode;
  className?: string;
  /** Max tilt in degrees (each axis). */
  tiltAmount?: number;
  /** Perspective distance in px. */
  perspective?: number;
};

export function TiltSurface({
  children,
  className,
  tiltAmount = 11,
  perspective = 1000,
}: TiltSurfaceProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [reduceMotion, setReduceMotion] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
    const onChange = () => setReduceMotion(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const reset = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) translateZ(0)`;
  }, [perspective]);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduceMotion) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    const rx = (-y * tiltAmount).toFixed(2);
    const ry = (x * tiltAmount).toFixed(2);
    el.style.transform = `perspective(${perspective}px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(0)`;
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      className={cn(
        "[transform-style:preserve-3d] transition-transform duration-300 ease-out-expo will-change-transform",
        !reduceMotion && "transform-gpu",
        className,
      )}
      style={{
        transform: `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) translateZ(0)`,
      }}
    >
      {children}
    </div>
  );
}
