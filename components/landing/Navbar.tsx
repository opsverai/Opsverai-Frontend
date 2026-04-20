import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { COMPANY, companyMailto } from "@/lib/company";
import { cn } from "@/lib/utils";
import { Mail, Menu, X } from "lucide-react";
import { images } from "@/lib/publicImages";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Core features", href: "#core-features" },
  { label: "How it works", href: "#how-it-works" },
  { label: "Contact", href: "#contact" },
] as const;

const SECTION_IDS: string[] = navLinks.map((l) => l.href.slice(1));

/** Offset from top of viewport (nav + scroll-margin) — last section whose top is at or above this wins. */
const HIGHLIGHT_OFFSET_PX = 100;

function computeActiveSectionId(): string {
  const y = window.scrollY + HIGHLIGHT_OFFSET_PX;
  let active = SECTION_IDS[0] ?? "home";
  for (const id of SECTION_IDS) {
    const el = document.getElementById(id);
    if (!el) continue;
    const top = el.getBoundingClientRect().top + window.scrollY;
    if (top <= y) active = id;
  }
  return active;
}

const pillBase =
  "rounded-full border border-border/50 shadow-depth-lg backdrop-blur-xl transition-[transform,box-shadow,border-color,background-color] duration-450 ease-out-expo motion-safe:animate-in motion-safe:fade-in motion-safe:zoom-in-95 motion-safe:duration-500";

const Navbar = () => {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>(() => {
    if (typeof window === "undefined") return "home";
    const id = window.location.hash.slice(1);
    return SECTION_IDS.includes(id) ? id : "home";
  });

  useEffect(() => {
    let raf = 0;
    const syncFromScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setActiveSection(computeActiveSectionId()));
    };

    const syncFromHash = () => {
      const id = window.location.hash.slice(1);
      if (id && SECTION_IDS.includes(id)) setActiveSection(id);
      else syncFromScroll();
    };

    syncFromScroll();
    window.addEventListener("scroll", syncFromScroll, { passive: true });
    window.addEventListener("resize", syncFromScroll);
    window.addEventListener("hashchange", syncFromHash);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", syncFromScroll);
      window.removeEventListener("resize", syncFromScroll);
      window.removeEventListener("hashchange", syncFromHash);
    };
  }, []);

  const resolveSectionHref = (href: string) => {
    if (!href.startsWith("#")) return href;
    return pathname === "/" ? href : `/${href}`;
  };

  return (
    <>
      <nav
        className="pointer-events-none fixed left-0 right-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4 lg:px-8"
        aria-label="Main"
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-2 max-md:gap-3 sm:grid sm:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] sm:items-center sm:justify-center sm:gap-3 lg:gap-4">
          {/* Left — logo; below md: smaller scale + no translate so it does not overlap the pill */}
          <a
            href="/"
            className="group/logo pointer-events-auto hidden h-11 w-11 shrink-0 items-center justify-center justify-self-start self-center overflow-visible md:flex md:ml-1.5 md:translate-x-9 lg:ml-2 lg:translate-x-12 sm:col-start-1 sm:row-start-1"
            aria-label={`${COMPANY.legalName} home`}
            aria-current={activeSection === "home" ? "page" : undefined}
          >
            <img
              src={images.logo}
              alt=""
              className="h-9 w-9 origin-center object-contain transition-transform duration-450 ease-out-expo max-md:scale-[1.92] max-md:group-hover/logo:scale-[2.05] md:scale-[3.52] md:group-hover/logo:scale-[3.72]"
              aria-hidden
              loading="eager"
              decoding="async"
            />
          </a>

          {/* Center — links + CTA */}
          <div
            className={cn(
              pillBase,
              "glass-panel-strong pointer-events-auto flex min-h-11 min-w-0 flex-1 max-w-full items-center justify-center gap-1 justify-self-center overflow-visible py-1.5 pl-1.5 pr-2 sm:col-start-2 sm:flex-initial sm:gap-2 sm:py-2 sm:pl-2 sm:pr-3 md:gap-3 md:py-2",
            )}
          >
            <div className="hidden min-w-0 items-center gap-1 md:flex lg:gap-2">
              {navLinks.map((link) => {
                const id = link.href.slice(1);
                const isActive = activeSection === id;
                return (
                  <a
                    key={link.href}
                    href={resolveSectionHref(link.href)}
                    className={cn(
                      "whitespace-nowrap rounded-full px-2 py-1 text-xs font-medium transition-colors duration-450 ease-out-expo lg:px-2.5 lg:text-[13px]",
                      isActive
                        ? "bg-primary/15 font-semibold text-primary"
                        : "text-muted-foreground hover:text-foreground",
                    )}
                    aria-current={isActive ? "true" : undefined}
                  >
                    {link.label}
                  </a>
                );
              })}
            </div>

            <Button
              variant="hero"
              size="sm"
              className="ml-auto hidden h-9 shrink-0 rounded-full border border-primary/45 bg-[linear-gradient(110deg,rgb(244_206_20)_0%,rgb(244_206_20)_78%,rgb(69_71_75)_100%)] px-4 text-xs font-semibold text-[rgb(26_26_26)] shadow-[0_10px_24px_-14px_rgb(0_0_0/0.6)] transition-[filter,transform] hover:brightness-105 md:inline-flex"
              asChild
            >
              <a href="/product">opsventure</a>
            </Button>

            {/* Mobile: menu (logo is the overlapping mark on the left) */}
            <div className="flex min-w-0 flex-1 items-center justify-between gap-2 md:hidden pl-1">
              <a
                href="/"
                className="group/logo pointer-events-auto ml-2 flex h-9 w-9 shrink-0 items-center justify-center"
                aria-label={`${COMPANY.legalName} home`}
                aria-current={activeSection === "home" ? "page" : undefined}
              >
                <img
                  src={images.logo}
                  alt=""
                  className="h-9 w-9 scale-[1.95] object-contain drop-shadow-[0_0_12px_rgba(244,206,20,0.3)] transition-transform duration-450 ease-out-expo group-hover/logo:scale-[2.05]"
                  aria-hidden
                  loading="eager"
                  decoding="async"
                />
              </a>
              <button
                type="button"
                onClick={() => setOpen((o) => !o)}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border/60 bg-background/40 text-foreground transition-colors hover:bg-muted/50"
                aria-expanded={open}
                aria-label={open ? "Close menu" : "Open menu"}
              >
                {open ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </div>

          {/* Right — contact pill */}
          <a
            href={companyMailto}
            className={cn(
              pillBase,
              "glass-pill pointer-events-auto hidden min-h-11 shrink-0 items-center justify-self-end gap-2.5 py-2 pl-3 pr-4 transition-colors hover:border-primary/35 sm:flex",
            )}
          >
            <Mail className="h-4 w-4 shrink-0 text-primary" strokeWidth={2} aria-hidden />
            <span className="max-w-[9rem] truncate text-[11px] font-medium text-foreground lg:max-w-none lg:text-xs">
              {COMPANY.email}
            </span>
          </a>

          {/* Mobile mail icon only when right pill hidden */}
          <a
            href={companyMailto}
            className={cn(
              pillBase,
              "glass-pill pointer-events-auto flex h-11 w-11 shrink-0 items-center justify-center sm:hidden",
            )}
            aria-label={`Email ${COMPANY.email}`}
          >
            <Mail className="h-4 w-4 text-primary" strokeWidth={2} />
          </a>
        </div>
      </nav>

      {/* Mobile menu — full-width glass panel below pills */}
      {open && (
        <div
          className="glass-panel-strong fixed left-3 right-3 top-[4.25rem] z-[70] max-h-[min(70dvh,calc(100dvh-5.5rem))] overflow-y-auto overscroll-contain rounded-2xl border border-border/50 p-4 shadow-depth-lg motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-top-2 motion-safe:duration-300 md:hidden"
          role="dialog"
          aria-label="Navigation menu"
        >
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => {
              const id = link.href.slice(1);
              const isActive = activeSection === id;
              return (
                <a
                  key={link.href}
                  href={resolveSectionHref(link.href)}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-primary/15 font-semibold text-primary"
                      : "text-muted-foreground hover:bg-muted/40 hover:text-foreground",
                  )}
                  aria-current={isActive ? "true" : undefined}
                >
                  {link.label}
                </a>
              );
            })}
            <Button variant="hero" size="sm" className="mt-2 w-full rounded-xl" asChild>
              <a href="/product" onClick={() => setOpen(false)}>
                opsventure
              </a>
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
