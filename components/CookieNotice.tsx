import { useEffect, useId, useState } from "react";
import { Cookie, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const STORAGE_KEY = "opsverai-cookie-consent";

/** Fixed overlay so the banner sits on top of hero / footer / other sections. */
export function CookieNotice() {
  const [visible, setVisible] = useState(false);
  const titleId = useId();
  const descId = useId();

  useEffect(() => {
    try {
      if (!localStorage.getItem(STORAGE_KEY)) setVisible(true);
    } catch {
      setVisible(true);
    }
  }, []);

  const save = (value: "accepted" | "declined" | "dismissed") => {
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch {
      /* private mode / blocked storage */
    }
    setVisible(false);
  };

  if (!visible) return null;

  const body = (
    <>
      <div className="flex min-w-0 flex-1 gap-2.5 sm:gap-3">
        <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-primary/30 bg-primary/10 sm:h-9 sm:w-9">
          <Cookie className="h-3.5 w-3.5 text-primary sm:h-4 sm:w-4" strokeWidth={2} aria-hidden />
        </div>
        <div className="min-w-0">
          <p id={titleId} className="font-heading text-xs font-semibold text-foreground sm:text-sm">
            Cookies &amp; privacy
          </p>
          <p id={descId} className="mt-1 text-[11px] leading-relaxed text-muted-foreground sm:text-xs sm:leading-relaxed">
            We use cookies and similar technologies to run the site, remember preferences, and understand how visitors use Opsver AI.
            By continuing you agree to our use of cookies as described in our{" "}
            <a href="/privacy" className="font-medium text-primary underline-offset-2 hover:underline">
              Privacy
            </a>{" "}
            and{" "}
            <a href="/terms" className="font-medium text-primary underline-offset-2 hover:underline">
              Terms
            </a>
            .
          </p>
        </div>
      </div>
      <div className="flex shrink-0 flex-col gap-2 sm:flex-row sm:flex-wrap sm:justify-end">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="h-9 rounded-full border border-border/60 bg-background/30 text-foreground hover:bg-muted/50"
          onClick={() => save("declined")}
        >
          Decline optional
        </Button>
        <Button
          type="button"
          variant="hero"
          size="sm"
          className="h-9 rounded-full border border-primary/45 bg-[linear-gradient(110deg,rgb(244_206_20)_0%,rgb(244_206_20)_80%,rgb(69_71_75)_100%)] px-4 font-semibold text-[rgb(26_26_26)] transition-[filter,transform] hover:brightness-105"
          onClick={() => save("accepted")}
        >
          Accept all
        </Button>
      </div>
    </>
  );

  return (
    <div
      className={cn(
        "pointer-events-none fixed inset-x-0 z-[110] flex justify-center px-4",
        "bottom-[max(1.25rem,env(safe-area-inset-bottom))] sm:bottom-6",
        "pl-[max(1rem,env(safe-area-inset-left))] pr-[max(1rem,env(safe-area-inset-right))]",
      )}
      role="dialog"
      aria-modal="false"
      aria-labelledby={titleId}
      aria-describedby={descId}
    >
      <div className="pointer-events-auto relative flex w-full max-w-xl flex-col gap-4 rounded-2xl border border-border/60 bg-card/95 py-4 pl-4 pr-12 shadow-[0_16px_56px_-8px_rgb(0_0_0/0.85)] backdrop-blur-xl sm:max-w-3xl sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:py-5 sm:pl-5 sm:pr-14 lg:max-w-4xl">
        <button
          type="button"
          onClick={() => save("dismissed")}
          className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full border border-border/50 bg-background/40 text-muted-foreground transition-colors hover:border-primary/35 hover:bg-muted/50 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:right-3 sm:top-3"
          aria-label="Close cookie notice"
        >
          <X className="h-4 w-4" strokeWidth={2} aria-hidden />
        </button>
        {body}
      </div>
    </div>
  );
}
