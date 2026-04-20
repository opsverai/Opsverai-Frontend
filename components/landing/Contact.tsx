import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { Mail, MapPin, Phone } from "lucide-react";

import { ContactGlobalHubsPanel } from "@/components/landing/ContactGlobalHubsPanel";
import { SectionReveal } from "@/components/landing/SectionReveal";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { COMPANY, companyMailto, companyMapsUrl } from "@/lib/company";
import { cssBgUrl, images } from "@/lib/publicImages";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const FALLBACK_RECAPTCHA_SITE_KEY = "6Lem06wsAAAAAAOUl8n9XwN8ueS5S2r4pKl645CR";
const DEFAULT_FORMSPREE_ENDPOINT = "https://formspree.io/f/mdapjdjb";

/** Early-access reference: dark field, ~8px radius, thin neutral border */
const fieldClass =
  "h-11 w-full rounded-lg border border-neutral-700 bg-[#0a0a0a] px-3.5 text-sm text-white shadow-none transition-colors placeholder:text-neutral-500 focus-visible:border-neutral-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-500";

const selectTriggerClass =
  "h-11 w-full rounded-lg border border-neutral-700 bg-[#0a0a0a] px-3.5 text-sm text-white shadow-none focus:ring-1 focus:ring-neutral-500 data-[placeholder]:text-neutral-500 [&>svg]:text-neutral-400";

const emptyForm = {
  firstName: "",
  lastName: "",
  email: "",
  company: "",
  companySize: "",
};

const ReCAPTCHA = lazy(() => import("react-google-recaptcha"));
type ReCAPTCHARef = { reset: () => void };

const Contact = () => {
  const recaptchaRef = useRef<ReCAPTCHARef | null>(null);
  const recaptchaMountRef = useRef<HTMLDivElement | null>(null);
  const recaptchaSiteKey = (import.meta.env.VITE_RECAPTCHA_SITE_KEY as string | undefined) || FALLBACK_RECAPTCHA_SITE_KEY;
  const formspreeEndpoint =
    (import.meta.env.VITE_FORMSPREE_ENDPOINT as string | undefined)?.trim() || DEFAULT_FORMSPREE_ENDPOINT;
  const [form, setForm] = useState(emptyForm);
  const [recaptchaToken, setRecaptchaToken] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [shouldLoadRecaptcha, setShouldLoadRecaptcha] = useState(false);

  useEffect(() => {
    if (shouldLoadRecaptcha) return;
    const node = recaptchaMountRef.current;
    if (!node || typeof IntersectionObserver === "undefined") {
      setShouldLoadRecaptcha(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setShouldLoadRecaptcha(true);
          observer.disconnect();
        }
      },
      { rootMargin: "320px 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [shouldLoadRecaptcha]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    if (!recaptchaToken) {
      toast.error("Please complete the reCAPTCHA verification.");
      return;
    }
    try {
      setIsSubmitting(true);
      const res = await fetch(formspreeEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          company: form.company,
          companySize: form.companySize || undefined,
          recaptchaToken,
          source: "opsverai-contact-form",
        }),
      });

      if (!res.ok) {
        throw new Error("Form submission failed");
      }

      toast.success("Thanks. We'll be in touch shortly.");
      setForm(emptyForm);
      setRecaptchaToken("");
      recaptchaRef.current?.reset();
    } catch {
      toast.error("Could not send. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="relative overflow-hidden border-t border-border/60 bg-black py-20 lg:py-28"
      aria-labelledby="contact-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.28]"
        aria-hidden
        style={{
          backgroundImage: cssBgUrl(images.contactBg),
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
      <SectionReveal>
      <div className="mx-auto w-full max-w-7xl px-3 sm:px-5 lg:px-8">
        <header className="mb-10 text-left md:mb-14">
          <h2
            id="contact-heading"
            className="font-heading text-3xl font-bold tracking-tight text-white md:text-4xl lg:text-[2.5rem]"
          >
            Apply for early access
          </h2>
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-neutral-400 md:text-base">
            Request access to the {COMPANY.legalName} workspace for structured ideation, blueprint exports, and team-ready outputs.
            A short form helps us route you to the right program and onboarding path.
          </p>
        </header>

        {/* Top row: ~66% form / ~33% global hubs */}
        <div className="grid min-w-0 items-stretch gap-5 lg:grid-cols-12 lg:gap-6">
          {/* Early access form — 8/12 */}
          <form
            onSubmit={handleSubmit}
            className="flex min-w-0 flex-col gap-5 rounded-lg border border-neutral-800 bg-black p-5 sm:gap-6 sm:p-8 lg:col-span-8"
          >
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-4">
              <div className="space-y-2">
                <Label htmlFor="contact-first-name" className="text-sm font-semibold text-white">
                  First name<span className="text-red-500"> *</span>
                </Label>
                <Input
                  id="contact-first-name"
                  type="text"
                  value={form.firstName}
                  onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                  required
                  maxLength={80}
                  autoComplete="given-name"
                  className={fieldClass}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact-last-name" className="text-sm font-semibold text-white">
                  Last name
                </Label>
                <Input
                  id="contact-last-name"
                  type="text"
                  value={form.lastName}
                  onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                  maxLength={80}
                  autoComplete="family-name"
                  className={fieldClass}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="contact-work-email" className="text-sm font-semibold text-white">
                Work email<span className="text-red-500"> *</span>
              </Label>
              <Input
                id="contact-work-email"
                type="email"
                placeholder="you@company.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
                maxLength={255}
                autoComplete="email"
                className={fieldClass}
              />
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-4">
              <div className="space-y-2">
                <Label htmlFor="contact-company" className="text-sm font-semibold text-white">
                  Company
                </Label>
                <Input
                  id="contact-company"
                  type="text"
                  placeholder="Company, Inc."
                  value={form.company}
                  onChange={(e) => setForm({ ...form, company: e.target.value })}
                  maxLength={120}
                  autoComplete="organization"
                  className={fieldClass}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact-company-size" className="text-sm font-semibold text-white">
                  Company size (employees)
                </Label>
                <Select
                  value={form.companySize ? form.companySize : undefined}
                  onValueChange={(value) => setForm({ ...form, companySize: value })}
                >
                  <SelectTrigger id="contact-company-size" className={selectTriggerClass}>
                    <SelectValue placeholder="Select company size" />
                  </SelectTrigger>
                  <SelectContent className="border-neutral-700 bg-[#141414] text-white">
                    <SelectItem value="1-10" className="focus:bg-neutral-800 focus:text-white">
                      1 to 10
                    </SelectItem>
                    <SelectItem value="11-50" className="focus:bg-neutral-800 focus:text-white">
                      11 to 50
                    </SelectItem>
                    <SelectItem value="51-200" className="focus:bg-neutral-800 focus:text-white">
                      51 to 200
                    </SelectItem>
                    <SelectItem value="201-500" className="focus:bg-neutral-800 focus:text-white">
                      201 to 500
                    </SelectItem>
                    <SelectItem value="501-1000" className="focus:bg-neutral-800 focus:text-white">
                      501 to 1,000
                    </SelectItem>
                    <SelectItem value="1000+" className="focus:bg-neutral-800 focus:text-white">
                      1,000+
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div ref={recaptchaMountRef} className="overflow-hidden rounded-lg border border-neutral-800 bg-[#0a0a0a] p-3">
              <div className="origin-left scale-[0.86] sm:scale-100">
                {shouldLoadRecaptcha ? (
                  <Suspense
                    fallback={<div className="h-[78px] w-[304px] rounded-md border border-neutral-700/60 bg-neutral-900/70" />}
                  >
                    <ReCAPTCHA
                      ref={recaptchaRef as never}
                      sitekey={recaptchaSiteKey}
                      onChange={(token) => setRecaptchaToken(token ?? "")}
                      onExpired={() => setRecaptchaToken("")}
                      theme="dark"
                    />
                  </Suspense>
                ) : (
                  <div className="h-[78px] w-[304px] rounded-md border border-neutral-700/60 bg-neutral-900/70" />
                )}
              </div>
            </div>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="h-9 w-auto min-w-[5.5rem] self-start rounded-md bg-white px-4 text-xs font-bold text-black shadow-none hover:bg-neutral-200 disabled:opacity-60"
            >
              {isSubmitting ? "Sending…" : "Submit"}
            </Button>
          </form>

          {/* Global hubs — 4/12 */}
          <div
            className={cn(
              "glass-primary relative flex min-h-[300px] w-full min-w-0 max-w-full flex-col overflow-hidden rounded-2xl text-primary-foreground shadow-depth-lg sm:rounded-[28px] lg:col-span-4 lg:min-h-0",
            )}
          >
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.14]"
              aria-hidden
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E")`,
              }}
            />
            <div
              className="pointer-events-none absolute -left-10 top-0 h-56 w-56 rounded-full bg-primary-foreground/15 blur-3xl"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute -right-2 bottom-0 h-48 w-48 rounded-full bg-primary-foreground/10 blur-3xl sm:-right-6"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/35 via-black/20 to-black/45"
              aria-hidden
            />
            <ContactGlobalHubsPanel className="relative z-10 flex min-h-0 flex-1 flex-col" />
          </div>
        </div>

        {/* Bottom row: three equal-width cards, icon left + copy right */}
        <div className="mt-9 grid grid-cols-1 gap-5 md:mt-11 md:grid-cols-3 md:gap-5 lg:gap-6">
          <a
            id="contact-phone"
            href={COMPANY.phone.telHref}
            className="glass-primary group flex min-h-[118px] scroll-mt-28 flex-row items-start gap-4 rounded-[24px] p-5 text-primary-foreground shadow-sm transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-md md:min-h-[124px] md:p-6"
          >
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[18px] bg-primary-foreground/15">
              <Phone className="h-7 w-7" strokeWidth={1.65} aria-hidden />
            </span>
            <div className="min-w-0 flex-1 pt-0.5 text-left">
              <p className="font-heading text-base font-bold leading-snug tracking-tight md:text-[1.05rem]">
                {COMPANY.phone.display}
              </p>
              <p className="mt-2 text-[13px] leading-snug text-primary-foreground/85 md:text-sm">
                {COMPANY.legalName}, weekdays 9am to 6pm ET.
              </p>
              <p className="mt-1 text-[13px] leading-snug text-primary-foreground/75 md:text-sm">
                We typically respond within one business day.
              </p>
            </div>
          </a>

          <a
            href={companyMailto}
            className="group flex min-h-[118px] flex-row items-start gap-4 rounded-[24px] bg-muted/80 p-5 text-foreground shadow-sm ring-1 ring-border/40 transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-md dark:bg-muted/40 md:min-h-[124px] md:p-6"
          >
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[18px] border-2 border-primary/50 bg-background/60 text-primary">
              <Mail className="h-7 w-7" strokeWidth={1.65} aria-hidden />
            </span>
            <div className="min-w-0 flex-1 pt-0.5 text-left">
              <p className="font-heading text-base font-bold leading-snug tracking-tight text-foreground md:text-[1.05rem]">
                {COMPANY.email}
              </p>
              <p className="mt-2 text-[13px] leading-snug text-muted-foreground md:text-sm">
                Engineering, partnerships, and press: we read everything.
              </p>
              <p className="mt-1 text-[13px] leading-snug text-muted-foreground md:text-sm">
                Attach context; we route to the right owner.
              </p>
            </div>
          </a>

          <a
            href={companyMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="glass-panel group flex min-h-[118px] flex-row items-start gap-4 rounded-[24px] p-5 shadow-sm ring-1 ring-border/30 transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-md md:min-h-[124px] md:p-6"
          >
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[18px] border-2 border-primary/40 bg-black text-primary">
              <MapPin className="h-7 w-7" strokeWidth={1.65} aria-hidden />
            </span>
            <div className="min-w-0 flex-1 pt-0.5 text-left">
              <p className="font-heading text-base font-bold leading-snug tracking-tight md:text-[1.05rem]">
                {COMPANY.address.city}, {COMPANY.address.state} {COMPANY.address.postalCode}
              </p>
              <p className="mt-2 text-[13px] leading-snug text-muted-foreground md:text-sm">{COMPANY.address.street}</p>
              <p className="mt-1 text-[13px] leading-snug text-muted-foreground md:text-sm">
                {COMPANY.legalName} · Est. {COMPANY.foundedDisplay} · {COMPANY.founder.name}, {COMPANY.founder.role}
              </p>
              <p className="mt-1 text-[11px] text-primary/90 underline-offset-2 group-hover:underline md:text-xs">
                Open in Maps
              </p>
            </div>
          </a>
        </div>
      </div>
      </SectionReveal>
    </section>
  );
};

export default Contact;
