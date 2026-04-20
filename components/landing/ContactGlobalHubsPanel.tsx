import { useEffect, useId, useState } from "react";

import { COMPANY } from "@/lib/company";
import { cn } from "@/lib/utils";

const HUBS = [
  { name: "New York (HQ)", detail: COMPANY.address.oneLine },
  {
    name: COMPANY.founder.name,
    detail: `${COMPANY.founder.role} · ${COMPANY.legalName}, est. ${COMPANY.foundedDisplay}`,
  },
] as const;

export function ContactGlobalHubsPanel({ className }: { className?: string }) {
  const headingId = useId();
  const [utcNow, setUtcNow] = useState(() => new Date());

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    const id = window.setInterval(() => setUtcNow(new Date()), 1000);
    return () => window.clearInterval(id);
  }, []);

  const utcLabel = utcNow.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
    timeZone: "UTC",
  });

  return (
    <div
      className={cn("flex min-h-0 flex-1 flex-col", className)}
      role="region"
      aria-labelledby={headingId}
    >
      <div className="flex flex-col px-3 pb-2 pt-4 sm:px-4 lg:pt-5">
        <h3
          id={headingId}
          className="text-center font-heading text-[1.15rem] font-bold leading-tight tracking-tight text-primary-foreground drop-shadow-sm sm:text-[1.3rem]"
        >
          Headquarters
        </h3>
        <p className="mx-auto mt-1.5 max-w-[17.5rem] text-center text-[11px] leading-snug text-primary-foreground/88 sm:max-w-[20rem] sm:text-xs">
          {COMPANY.legalName} is based in Midtown Manhattan. We work with teams globally via {COMPANY.domain}.
        </p>
        <p
          className="mt-2 text-center font-mono text-[10px] tracking-wide text-primary-foreground/75 sm:text-[11px]"
          aria-live="polite"
          aria-atomic="true"
        >
          UTC <time dateTime={utcNow.toISOString()}>{utcLabel}</time>
        </p>
      </div>

      <div className="relative z-10 mx-3 mb-3 min-h-[min(170px,28vh)] flex-1 sm:mx-4 sm:min-h-[min(200px,32vh)] lg:mb-4">
        <div className="absolute inset-0 overflow-hidden rounded-2xl border border-primary-foreground/25 bg-[#070708] shadow-[inset_0_0_0_1px_rgb(244_206_20/0.1)]">
          <svg
            className="h-full w-full opacity-[0.95]"
            viewBox="0 0 320 200"
            preserveAspectRatio="xMidYMid slice"
            aria-hidden
          >
            <defs>
              <radialGradient id="contact-hub-gold" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="rgb(253 224 72)" />
                <stop offset="100%" stopColor="rgb(200 155 28)" />
              </radialGradient>
              <linearGradient id="contact-hub-fade" x1="50%" y1="0%" x2="50%" y2="100%">
                <stop offset="0%" stopColor="rgb(244 206 20)" stopOpacity="0.08" />
                <stop offset="100%" stopColor="rgb(0 0 0)" stopOpacity="0" />
              </linearGradient>
            </defs>
            <rect width="320" height="200" fill="url(#contact-hub-fade)" />
            <path
              d="M 0 120 Q 80 100 160 88 T 320 72"
              fill="none"
              stroke="rgb(244 206 20)"
              strokeOpacity="0.12"
              strokeWidth="1"
            />
            <path
              d="M 52 118 Q 158 42 268 92"
              fill="none"
              stroke="rgb(244 206 20)"
              strokeOpacity="0.42"
              strokeWidth="1.5"
              strokeDasharray="9 12"
              strokeLinecap="round"
            />
            <circle cx="52" cy="118" r="8" fill="url(#contact-hub-gold)" opacity="0.95" />
            <circle cx="52" cy="118" r="8" fill="none" stroke="rgb(255 255 255 / 0.2)" strokeWidth="1" />
            <circle cx="268" cy="92" r="8" fill="url(#contact-hub-gold)" opacity="0.95" />
            <circle cx="268" cy="92" r="8" fill="none" stroke="rgb(255 255 255 / 0.2)" strokeWidth="1" />
          </svg>
          <div
            className="pointer-events-none absolute inset-0 rounded-2xl opacity-[0.07] motion-reduce:opacity-0"
            style={{
              backgroundImage:
                "linear-gradient(rgb(244 206 20 / 0.15) 1px, transparent 1px), linear-gradient(90deg, rgb(244 206 20 / 0.12) 1px, transparent 1px)",
              backgroundSize: "20px 20px",
            }}
            aria-hidden
          />
        </div>
      </div>

      <ul className="relative z-10 mt-auto space-y-2.5 px-3 pb-[max(5rem,env(safe-area-inset-bottom))] text-left sm:space-y-3 sm:px-5 sm:pb-5">
        {HUBS.map((hub) => (
          <li
            key={hub.name}
            className="rounded-xl border border-primary-foreground/18 bg-black/30 px-3 py-2.5 backdrop-blur-sm sm:px-4 sm:py-3"
          >
            <p className="font-heading text-sm font-bold tracking-tight text-primary-foreground">{hub.name}</p>
            <p className="mt-1 break-words text-[11px] leading-snug text-primary-foreground/82 sm:text-xs">{hub.detail}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
