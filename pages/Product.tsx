import type { ElementType, ReactNode } from "react";
import { Rocket } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { images } from "@/lib/publicImages";

const colors = {
  bg: "#111111",
  bgCard: "rgba(73, 94, 87, 0.2)",
  textMain: "#F5F7F8",
  accent: "#F4CE14",
  textSub: "rgba(245, 247, 248, 0.7)",
  glassBorder: "rgba(245, 247, 248, 0.1)",
} as const;

const glassEffect =
  "bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] rounded-3xl";
const sectionPadding = "py-24 px-6 md:px-12 lg:px-24";
const maxContent = "mx-auto max-w-7xl";

function BrainIcon() {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 24 24"
      fill="none"
      stroke={colors.accent}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.94-1.94A2.5 2.5 0 0 1 9.5 2Z" />
      <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.94-1.94A2.5 2.5 0 0 0 14.5 2Z" />
    </svg>
  );
}

function NvidiaLogo() {
  return (
    <svg
      width="120"
      height="30"
      viewBox="0 0 134 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="NVIDIA logo"
    >
      <path
        d="M14.931 0H0V24H14.931V16.7119C14.931 16.7119 19.3444 14.2882 23.3619 16.7119C23.3619 20.3475 23.3619 24 23.3619 24H38.293V11.5306C38.293 4.25763 32.2478 0 24.9749 0C19.866 0 17.1306 1.83182 14.931 3.86441V0ZM14.931 12.0136C14.931 12.0136 17.514 10.4284 19.4678 11.5306C19.4678 13.0645 19.4678 14.5983 19.4678 16.1322C17.7027 14.8698 14.931 16.0336 14.931 16.0336V12.0136Z"
        fill="#76B900"
      />
      <path d="M46.721 0H41.34V24H46.721V0Z" fill="white" />
      <path d="M60.155 0L54.12 11.45L48.085 0H42.704L51.428 15.658V24H56.809V15.658L65.536 0H60.155Z" fill="white" />
      <path
        d="M73.589 0H68.208V15.358C68.208 17.96 69.136 19.263 70.994 19.263C72.851 19.263 73.78 17.96 73.78 15.358V0H73.589ZM73.589 24H68.208V20.334C69.601 21.139 71.18 21.517 72.946 21.517C74.712 21.517 76.291 21.139 77.684 20.334V24H73.589Z"
        fill="white"
      />
      <path d="M82.836 0H77.455V24H82.836V0Z" fill="white" />
      <path
        d="M96.27 0H90.889V15.358C90.889 17.96 91.817 19.263 93.675 19.263C95.532 19.263 96.461 17.96 96.461 15.358V0H96.27ZM96.27 24H90.889V20.334C92.282 21.139 93.861 21.517 95.627 21.517C97.393 21.517 98.972 21.139 100.365 20.334V24H96.27Z"
        fill="white"
      />
      <path d="M110.12 0L105.19 14.156L100.26 0H94.879L102.5 20.669V24H107.88V20.669L115.5 0H110.12Z" fill="white" />
      <path
        d="M133.6 15.658H122.9V0H117.52V24H133.6V15.658ZM122.9 19.263V17.068H129.8V19.263H122.9Z"
        fill="white"
      />
    </svg>
  );
}

function CircuitGraph() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-10" aria-hidden>
      <svg width="100%" height="100%" viewBox="0 0 800 600" fill="none">
        <defs>
          <pattern id="circuit" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
            <path d="M 0 10 L 40 10 L 50 20 L 80 20 L 90 30" stroke={colors.textMain} strokeWidth="0.5" />
            <path d="M 50 20 L 50 60 L 60 70" stroke={colors.textMain} strokeWidth="0.5" />
            <circle cx="50" cy="20" r="1.5" fill={colors.accent} />
            <circle cx="90" cy="30" r="1.5" fill={colors.accent} />
          </pattern>
        </defs>
        <rect width="800" height="600" fill="url(#circuit)" />
      </svg>
    </div>
  );
}

function TechBadge({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium uppercase tracking-wider text-[#F5F7F8]">
      {children}
    </span>
  );
}

type FeatureCardProps = {
  icon: ElementType;
  title: string;
  desc: string;
};

function FeatureCard({ icon: Icon, title, desc }: FeatureCardProps) {
  return (
    <div className={`p-8 ${glassEffect}`}>
      <div
        className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10"
        style={{ backgroundColor: colors.bgCard }}
      >
        <Icon />
      </div>
      <h3 className="mb-4 text-2xl font-bold tracking-tight">{title}</h3>
      <p className="leading-relaxed text-[#F5F7F8]/70">{desc}</p>
    </div>
  );
}

const Product = () => {
  return (
    <div
      className="min-h-screen w-full min-w-0 overflow-x-clip pl-[max(0px,env(safe-area-inset-left))] pr-[max(0px,env(safe-area-inset-right))]"
      style={{ backgroundColor: colors.bg, color: colors.textMain }}
    >
      <Navbar />
      <main id="home" className="pt-28 sm:pt-32">
        <section className={`${sectionPadding} relative flex min-h-[90vh] items-center overflow-hidden`}>
          <div className="absolute inset-0 z-0">
            <img
              src="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2000&auto=format&fit=crop"
              alt="AI visualization background"
              className="h-full w-full scale-105 object-cover opacity-[0.03]"
              loading="lazy"
              decoding="async"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = images.hero;
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#111111] via-transparent to-[#111111]" />
          </div>

          <div className={`${maxContent} relative z-10 grid w-full grid-cols-1 items-center gap-16 lg:grid-cols-12`}>
            <div className="lg:col-span-7">
              <div className="mb-6 flex items-center gap-3">
                <BrainIcon />
                <span className="text-sm font-semibold uppercase tracking-widest" style={{ color: colors.accent }}>
                  OPSVER AI
                </span>
              </div>

              <h1 className="mb-8 text-5xl font-extrabold leading-[0.95] tracking-tighter md:text-7xl">
                Transform <span style={{ color: colors.accent }}>Raw Ideas</span> into Scalable Startups.
              </h1>
              <p className="mb-12 max-w-2xl text-xl leading-relaxed text-[#F5F7F8]/80">
                OpsverAI is the intelligent engine for creators. We bridge the gap between inspiration and execution, converting your
                concepts into structured, actionable business blueprints instantly.
              </p>
              <div className="flex flex-col gap-6 sm:flex-row">
                <a
                  href="https://app.opsverai.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-xl bg-[#F4CE14] px-8 py-4 text-center text-lg font-bold text-[#111111] transition-colors hover:bg-white"
                >
                  Validate Your Idea
                </a>

                <a
                  href="#innovation-workflow"
                  className={`rounded-xl px-8 py-4 text-center text-lg font-bold transition-colors hover:bg-white/10 ${glassEffect}`}
                >
                  Explore Platform
                </a>
              </div>
            </div>

            <div className="flex justify-center lg:col-span-5 lg:justify-end">
              <div className={`${glassEffect} relative aspect-[10/11] w-full max-w-md overflow-hidden p-4`}>
                <div className="absolute inset-4 overflow-hidden rounded-2xl border border-white/10 bg-[#0d0d0d]">
                  <img
                    src={images.completeBlueprints}
                    alt="Opsver AI product workspace preview"
                    className="h-full w-full object-cover opacity-85"
                    loading="lazy"
                    decoding="async"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = images.hero;
                    }}
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#111111]/90 via-transparent to-[#111111]/25" />
                  <div className="absolute bottom-4 left-4 right-4 rounded-xl border border-white/15 bg-black/45 px-4 py-3 backdrop-blur-sm">
                    <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#F4CE14]">Live Product Snapshot</p>
                    <p className="mt-1 text-sm text-[#F5F7F8]/90">See how raw ideas become structured startup blueprints.</p>
                  </div>
                </div>
                <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-[#F4CE14]/12 blur-3xl" aria-hidden />
                <div className="pointer-events-none absolute -left-10 bottom-2 h-28 w-28 rounded-full bg-[#495E57]/35 blur-3xl" aria-hidden />
              </div>
            </div>
          </div>
        </section>

        <section id="innovation-workflow" className={`${sectionPadding} relative bg-[#161616]`}>
          <CircuitGraph />
          <div className={`${maxContent} relative z-10`}>
            <div className="mx-auto mb-20 max-w-3xl text-center">
              <h2 className="mb-4 text-sm font-semibold uppercase tracking-widest" style={{ color: colors.accent }}>
                THE INNOVATION WORKFLOW
              </h2>
              <p className="text-4xl font-extrabold leading-tight tracking-tighter md:text-5xl">
                From Conception to Validation, <span className="opacity-60">Automated.</span>
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
              <FeatureCard
                icon={() => (
                  <svg viewBox="0 0 24 24" fill="none" stroke={colors.accent} strokeWidth="1.5" className="h-8 w-8">
                    <path d="M12 2v20M2 12h20" strokeLinecap="round" />
                  </svg>
                )}
                title="Idea Input"
                desc="Submit raw concepts via voice or text. Our platform captures intent without requiring structure."
              />
              <FeatureCard
                icon={() => (
                  <svg viewBox="0 0 24 24" fill="none" stroke={colors.accent} strokeWidth="1.5" className="h-8 w-8">
                    <path d="M16 4h4v4M8 20H4v-4M16 20h4v-4M8 4H4v4" strokeLinecap="round" />
                    <path d="M8 12h8m-4-4v8" strokeLinecap="round" />
                  </svg>
                )}
                title="Intelligent Structuring"
                desc="AI analyzes and organizes inputs into clear modules like feature plans and positioning."
              />
              <FeatureCard
                icon={() => (
                  <svg viewBox="0 0 24 24" fill="none" stroke={colors.accent} strokeWidth="1.5" className="h-8 w-8">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" strokeLinecap="round" />
                    <path d="M22 4L12 14.01l-3-3" strokeLinecap="round" />
                  </svg>
                )}
                title="Concept Validation"
                desc="Automated research and pattern recognition evaluate market viability and reduce risk."
              />
              <FeatureCard
                icon={() => <Rocket className="h-8 w-8" color={colors.accent} strokeWidth={1.75} aria-hidden />}
                title="Actionable Output"
                desc="Receive executable startup blueprints, business models, and strategic roadmaps."
              />
            </div>
          </div>
        </section>

        <section className={sectionPadding}>
          <div className={maxContent}>
            <div className={`${glassEffect} grid grid-cols-1 items-center gap-12 p-12 lg:grid-cols-12 lg:p-16`}>
              <div className="lg:col-span-8">
                <div className="mb-8 flex items-center gap-6">
                  <NvidiaLogo />
                  <div className="h-10 w-px bg-white/20" />
                  <span className="text-2xl font-bold tracking-tight">Infrastructure Partnership</span>
                </div>
                <h2 className="mb-8 text-4xl font-extrabold leading-tight tracking-tighter md:text-5xl">
                  Powered by <span style={{ color: colors.accent }}>NVIDIA</span> Acceleration for Enterprise Performance.
                </h2>
                <p className="mb-10 max-w-3xl text-lg leading-relaxed text-[#F5F7F8]/80">
                  At OpsverAI, we leverage NVIDIA&apos;s advanced AI technology stack and H100 Tensor Core GPUs to redefine real-time
                  innovation. Our platform integrates Riva for voice synthesis, TensorRT and Triton for ultra-low latency inference,
                  and CUDA for accelerated parallel processing of complex predictive models.
                </p>
                <div className="flex flex-wrap gap-3">
                  <TechBadge>NVIDIA Riva</TechBadge>
                  <TechBadge>TensorRT</TechBadge>
                  <TechBadge>Triton Inference Server</TechBadge>
                  <TechBadge>CUDA</TechBadge>
                  <TechBadge>H100 Tensor Core GPUs</TechBadge>
                </div>
              </div>
              <div className="flex justify-center lg:col-span-4">
                <div className="relative flex h-48 w-48 items-center justify-center rounded-full border-4 border-[#76B900]/35 bg-[#76B900]/12 p-4 shadow-[0_0_60px_10px_rgba(118,185,0,0.2)]">
                  <div className="pointer-events-none absolute inset-2 rounded-full border border-[#76B900]/30" aria-hidden />
                  <div className="flex h-32 w-32 flex-col items-center justify-center rounded-2xl border border-[#76B900]/45 bg-black/35 shadow-[inset_0_0_0_1px_rgba(118,185,0,0.2)]">
                    <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#76B900]/80">NVIDIA</span>
                    <span className="mt-1 text-3xl font-extrabold leading-none text-[#76B900]">H100</span>
                    <span className="mt-1 text-[10px] uppercase tracking-[0.12em] text-[#F5F7F8]/70">Tensor Core</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className={`${sectionPadding} bg-[#161616]`}>
          <div className={maxContent}>
            <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
              <div className={`${glassEffect} relative aspect-[16/10] overflow-hidden p-6`}>
                <div className="absolute left-4 top-4 flex gap-1.5">
                  <div className="h-3 w-3 rounded-full bg-red-500" />
                  <div className="h-3 w-3 rounded-full bg-yellow-500" />
                  <div className="h-3 w-3 rounded-full bg-green-500" />
                </div>
                <div className="mt-8 space-y-4">
                  <div className="h-6 w-2/3 rounded bg-white/10" />
                  <div className="h-4 w-full rounded bg-white/5" />
                  <div className="h-4 w-5/6 rounded bg-white/5" />
                  <div className="grid grid-cols-3 gap-4 pt-6">
                    <div className="h-24 rounded-xl border border-white/10 bg-[#495E57]/40 p-3">
                      <div className="mb-2 h-3 w-1/2 rounded bg-[#F4CE14]/70" />
                      <div className="h-2 w-full rounded bg-white/10" />
                    </div>
                    <div className="h-24 rounded-xl border border-white/10 bg-white/5 p-3">
                      <div className="mb-2 h-3 w-1/2 rounded bg-white/20" />
                      <div className="h-2 w-full rounded bg-white/10" />
                    </div>
                    <div className="h-24 rounded-xl border border-white/10 bg-white/5 p-3">
                      <div className="mb-2 h-3 w-1/2 rounded bg-white/20" />
                      <div className="h-2 w-full rounded bg-white/10" />
                    </div>
                  </div>

                  <div className="mt-6 h-32 w-full rounded-xl border border-white/10 bg-white/5" />
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-[#161616] via-transparent to-transparent" />
              </div>
              <div>
                <h2 className="mb-8 text-4xl font-extrabold leading-tight tracking-tighter md:text-5xl">
                  Your Idea, <span style={{ color: colors.accent }}>Structured.</span> Actionable Outputs.
                </h2>
                <p className="mb-10 text-lg leading-relaxed text-[#F5F7F8]/80">
                  Witness your raw inspiration synthesize into professional-grade startup components. OpsverAI automatically
                  generates the crucial documents needed to move from concept to execution.
                </p>
                <ul className="space-y-5 text-lg">
                  {[
                    "Dynamic Business Model Canvas",
                    "Prioritized Feature Roadmaps",
                    "Market Positioning Analysis",
                    "Execution & Go-to-Market Strategies",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-4">
                      <svg viewBox="0 0 24 24" fill="none" stroke={colors.accent} strokeWidth="2" className="h-6 w-6 shrink-0">
                        <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className={`${sectionPadding} relative`}>
          <div className="pointer-events-none absolute inset-0 opacity-[0.02]" aria-hidden>
            <svg width="100%" height="100%">
              <defs>
                <pattern id="dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                  <circle cx="2" cy="2" r="1" fill="white" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#dots)" />
            </svg>
          </div>
          <div className={`${maxContent} relative z-10 text-center`}>
            <div className={`${glassEffect} mx-auto max-w-4xl p-16`}>
              <div className="mb-8 flex justify-center">
                <div className="rounded-full border border-white/10 bg-white/5 p-5">
                  <BrainIcon />
                </div>
              </div>
              <h2 className="mb-6 text-4xl font-extrabold leading-tight tracking-tighter md:text-5xl">
                Ready to <span style={{ color: colors.accent }}>Build</span> Your Vision?
              </h2>

              <p className="mx-auto mb-12 max-w-2xl text-xl leading-relaxed text-[#F5F7F8]/80">
                OpsverAI is deploying on AWS P4/P5 GPU-optimized infrastructure for global scalability. Join the platform redefining
                the early-stage startup ecosystem.
              </p>
              <Link
                to="/#contact"
                className="inline-block rounded-xl bg-[#F4CE14] px-10 py-5 text-xl font-bold text-[#111111] shadow-[0_10px_40px_0_rgba(244,206,20,0.3)] transition-colors hover:bg-white"
              >
                Get Early Access
              </Link>
              <div className="mt-16 border-t border-white/10 pt-10 text-sm tracking-wide text-[#F5F7F8]/50">
                OPERATING ON AMAZON WEB SERVICES &amp; NVIDIA H100 ARCHITECTURE
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Product;
