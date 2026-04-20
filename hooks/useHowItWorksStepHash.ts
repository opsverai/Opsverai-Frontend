import { useEffect, useState } from "react";

function readStepFromHash(): number | null {
  if (typeof window === "undefined") return null;
  const m = window.location.hash.match(/how-it-works-step-(\d+)/i);
  if (!m) return null;
  const n = Number(m[1]);
  if (Number.isInteger(n) && n >= 1 && n <= 4) return n;
  return null;
}

/** Active How it works step (1–4) when the URL hash matches `#how-it-works-step-N`; otherwise `null`. */
export function useHowItWorksStepHash(): number | null {
  const [step, setStep] = useState<number | null>(() =>
    typeof window !== "undefined" ? readStepFromHash() : null,
  );

  useEffect(() => {
    const sync = () => setStep(readStepFromHash());
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  return step;
}
