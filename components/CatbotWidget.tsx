import { useCallback, useEffect, useId, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { MessageCircle, Radio, Send, X } from "lucide-react";

type Msg = { id: string; role: "user" | "bot"; text: string; at: number };

/** Custom cat + chat bubble hybrid (unique mark, not a stock robot). */
function CatbotIcon({ className }: { className?: string }) {
  const rid = useId().replace(/:/g, "");
  const faceId = `cb-face-${rid}`;
  const earId = `cb-ear-${rid}`;
  return (
    <svg viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg" className={cn("text-primary-foreground", className)} aria-hidden>
      <defs>
        <linearGradient id={faceId} x1="12" y1="8" x2="56" y2="64" gradientUnits="userSpaceOnUse">
          <stop stopColor="hsl(var(--primary))" />
          <stop offset="1" stopColor="hsl(var(--accent))" />
        </linearGradient>
        <linearGradient id={earId} x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="hsl(var(--primary))" stopOpacity="0.95" />
          <stop offset="1" stopColor="hsl(var(--accent))" stopOpacity="0.8" />
        </linearGradient>
      </defs>
      <path
        d="M52 58c4 0 8-3 10-8l4 12c-6 4-12 6-18 6H22c-8 0-14-6-14-14V28c0-8 6-14 14-14h22c11 0 20 9 20 20v12c0 6-4.5 10-10 12z"
        fill={`url(#${faceId})`}
        className="opacity-[0.92]"
      />
      <path d="M22 22 L14 6 L30 18 Z" fill={`url(#${earId})`} stroke="hsl(var(--background) / 0.4)" strokeWidth="1" />
      <path d="M50 22 L58 6 L42 18 Z" fill={`url(#${earId})`} stroke="hsl(var(--background) / 0.4)" strokeWidth="1" />
      <path d="M22 20 L18 12 L26 17 Z" className="fill-primary-foreground/25" />
      <path d="M50 20 L54 12 L46 17 Z" className="fill-primary-foreground/25" />
      <ellipse cx="30" cy="34" rx="4" ry="5" className="fill-primary-foreground/95" />
      <ellipse cx="44" cy="34" rx="4" ry="5" className="fill-primary-foreground/95" />
      <circle cx="31" cy="33" r="1.6" className="fill-background" />
      <circle cx="45" cy="33" r="1.6" className="fill-background" />
      <path d="M35 40 l2 3 l2-3 z" className="fill-primary-foreground/55" />
      <path
        d="M14 36 h10 M14 40 h12 M58 36 h-10 M58 40 h-12"
        className="stroke-primary-foreground/40"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path
        d="M32 46 q4 4 8 0"
        className="stroke-primary-foreground/55"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

function TypingDots() {
  return (
    <div className="flex gap-1 px-1 py-0.5" aria-hidden>
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="h-2 w-2 rounded-full bg-primary/75 motion-safe:animate-bounce motion-reduce:animate-none [animation-duration:0.55s]"
          style={{ animationDelay: `${i * 120}ms` }}
        />
      ))}
    </div>
  );
}

const defaults = [
  "Could you ask that in one short sentence? I’ll route you to the best answer.",
  "Try asking about pricing, blueprints, or how Opsverai structures startup concepts.",
  "I’m a demo assistant on this page. Replies stay in your session until you refresh.",
  "Not sure where to start? Say “pricing” or jump to the FAQ section.",
];

function botReply(userText: string): string {
  const t = userText.toLowerCase().trim();
  if (!t) return "Type something first. I’m ready when you are.";
  if (/^(hi|hello|hey)\b/.test(t)) {
    return "Hey! I’m the Opsverai helper. Ask about plans, security, or how we turn raw ideas into structured blueprints, or say “help”.";
  }
  if (t.includes("help")) {
    return "Try: pricing, privacy, demo, contact, or describe your idea stage and I’ll point you somewhere useful.";
  }
  if (t.includes("price") || t.includes("plan") || t.includes("cost")) {
    return "Starter is free; Pro adds advanced generation and premium exports; Business is for enterprise innovation teams. See Pricing on this page.";
  }
  if (t.includes("secure") || t.includes("security") || t.includes("privacy") || t.includes("soc")) {
    return "The marketing site outlines encryption and workspace controls. This chat is a local demo and doesn’t send data to a backend.";
  }
  if (t.includes("demo") || t.includes("trial")) {
    return "Tap “Try now” in the hero or “Explore platform”. Both walk you through the founder workflow.";
  }
  if (t.includes("contact") || t.includes("human")) {
    return "Scroll to Get in Touch. Our team answers there. I’m here for quick navigation questions.";
  }
  if (t.includes("who") && t.includes("you")) {
    return "I’m the Opsverai assistant, a lightweight guide to this Smart Idea-to-Startup Platform landing page.";
  }
  return defaults[Math.floor(Math.random() * defaults.length)] ?? defaults[0];
}

export function CatbotWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [messages, setMessages] = useState<Msg[]>(() => [
    {
      id: "welcome",
      role: "bot",
      text: "Hi, I’m your Opsverai guide. Ask about structuring ideas, plans, or your first workspace.",
      at: Date.now(),
    },
  ]);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollBottom = useCallback(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollBottom();
  }, [messages, typing, open, scrollBottom]);

  useEffect(() => {
    if (!open) return;
    const t = window.setTimeout(() => inputRef.current?.focus(), 200);
    return () => clearTimeout(t);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const send = () => {
    const text = input.trim();
    if (!text || typing) return;
    setInput("");
    const userMsg: Msg = { id: `u-${Date.now()}`, role: "user", text, at: Date.now() };
    setMessages((m) => [...m, userMsg]);
    setTyping(true);
    const delay = 380 + Math.random() * 520;
    window.setTimeout(() => {
      const reply = botReply(text);
      setMessages((m) => [...m, { id: `b-${Date.now()}`, role: "bot", text: reply, at: Date.now() }]);
      setTyping(false);
    }, delay);
  };

  return (
    <div className="pointer-events-none fixed bottom-0 right-0 z-[100] flex flex-col items-end gap-3 p-4 pb-[max(1rem,env(safe-area-inset-bottom))] pr-[env(safe-area-inset-right)]">
      <div
        className={cn(
          "glass-panel-strong pointer-events-auto flex max-h-[min(520px,calc(100dvh-8rem))] w-[min(calc(100vw-2rem),380px)] flex-col overflow-hidden rounded-3xl shadow-depth-lg transition-[opacity,transform] duration-450 ease-out-expo",
          open ? "translate-y-0 scale-100 opacity-100" : "pointer-events-none translate-y-3 scale-95 opacity-0",
        )}
        role="dialog"
        aria-label="Opsverai assistant chat"
        aria-hidden={!open}
      >
        <div className="flex items-center justify-between gap-2 border-b border-border/60 bg-gradient-to-r from-primary/12 via-transparent to-accent/10 px-4 py-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="glass-pill relative flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl shadow-inner ring-1 ring-primary/20">
              <CatbotIcon className="h-9 w-9" />
              <span
                className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full border-2 border-card bg-emerald-600 shadow-md dark:bg-emerald-500"
                title="Live on this page"
              >
                <Radio className="h-3 w-3 text-white" strokeWidth={2.5} aria-hidden />
              </span>
            </div>
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <p className="truncate font-heading text-sm font-bold tracking-tight text-foreground">Opsverai</p>
                <span
                  className="inline-flex shrink-0 items-center gap-1 rounded-full border border-emerald-500/35 bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-emerald-700 dark:text-emerald-400"
                  title="Connected · replies on this page"
                >
                  <Radio
                    className="h-2.5 w-2.5 shrink-0 text-emerald-600 motion-safe:animate-pulse dark:text-emerald-400"
                    strokeWidth={2.5}
                    aria-hidden
                  />
                  Live
                </span>
              </div>
              <p className="mt-0.5 truncate text-[11px] text-muted-foreground">Catbot · instant replies here</p>
            </div>
          </div>
          <Button type="button" variant="ghost" size="icon" className="h-9 w-9 shrink-0 rounded-xl" onClick={() => setOpen(false)} aria-label="Close chat">
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div ref={listRef} className="min-h-[200px] flex-1 space-y-3 overflow-y-auto px-4 py-4">
          {messages.map((m) => (
            <div
              key={m.id}
              className={cn("flex", m.role === "user" ? "justify-end" : "justify-start")}
            >
              <div
                className={cn(
                  "max-w-[88%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed shadow-sm",
                  m.role === "user"
                    ? "rounded-br-md bg-primary text-primary-foreground"
                    : "glass-pill rounded-bl-md text-foreground",
                )}
              >
                {m.text}
              </div>
            </div>
          ))}
          {typing && (
            <div className="flex justify-start">
              <div className="glass-pill flex items-center gap-2 rounded-2xl rounded-bl-md px-4 py-3">
                <TypingDots />
                <span className="text-xs text-muted-foreground">Opsverai is typing…</span>
              </div>
            </div>
          )}
        </div>

        <div className="border-t border-border/60 p-3">
          <form
            className="flex gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              send();
            }}
          >
            <Input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about Opsverai…"
              maxLength={500}
              className="glass-pill h-11 flex-1 rounded-xl text-sm"
              aria-label="Message Opsverai assistant"
            />
            <Button type="submit" size="icon" className="h-11 w-11 shrink-0 rounded-xl" disabled={typing || !input.trim()} aria-label="Send message">
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </div>

      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={cn(
          "glass-panel-strong pointer-events-auto relative flex h-16 w-16 items-center justify-center rounded-[1.35rem] border-2 border-primary/35 text-primary shadow-depth-lg transition-[transform,box-shadow] duration-450 ease-out-expo hover:scale-[1.06] hover:border-primary/50 hover:shadow-lg active:scale-[0.96] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background dark:border-primary/40",
          open && "ring-2 ring-primary/40",
        )}
        aria-label={open ? "Close Opsverai chat" : "Open Opsverai chat"}
        aria-expanded={open}
      >
        <span className="absolute inset-0 overflow-hidden rounded-[1.2rem]">
          <span className="absolute -right-1 -top-1 h-10 w-10 rounded-full bg-primary/15 blur-xl motion-safe:animate-pulse motion-reduce:animate-none" />
        </span>
        {!open && (
          <span
            className="absolute -right-0.5 -top-0.5 z-[2] flex h-6 min-w-[1.35rem] items-center justify-center gap-0.5 rounded-full border-2 border-card bg-emerald-600 px-1 shadow-md dark:bg-emerald-500"
            title="Live"
            aria-hidden
          >
            <Radio className="h-2.5 w-2.5 shrink-0 text-white" strokeWidth={2.5} />
          </span>
        )}
        {open ? (
          <MessageCircle className="relative z-[1] h-7 w-7 text-primary" strokeWidth={2} />
        ) : (
          <CatbotIcon className="relative z-[1] h-11 w-11 drop-shadow-sm" />
        )}
      </button>
    </div>
  );
}
