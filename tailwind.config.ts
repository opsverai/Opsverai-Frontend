import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./index.html",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        heading: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        body: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      transitionTimingFunction: {
        "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
        spring: "cubic-bezier(0.34, 1.25, 0.64, 1)",
      },
      transitionDuration: {
        450: "450ms",
        650: "650ms",
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        warm: {
          DEFAULT: "hsl(var(--warm))",
          foreground: "hsl(var(--warm-foreground))",
        },
        rose: {
          DEFAULT: "hsl(var(--rose))",
          foreground: "hsl(var(--rose-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0", opacity: "0" },
          to: { height: "var(--radix-accordion-content-height)", opacity: "1" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)", opacity: "1" },
          to: { height: "0", opacity: "0" },
        },
        "fade-in": {
          "0%": { opacity: "0", transform: "translate3d(0, 20px, 0)" },
          "100%": { opacity: "1", transform: "translate3d(0, 0, 0)" },
        },
        "reveal-hero-line": {
          "0%": { opacity: "0", transform: "translate3d(0, 44px, 0) scale(0.97)" },
          "100%": { opacity: "1", transform: "translate3d(0, 0, 0) scale(1)" },
        },
        "reveal-right": {
          "0%": { opacity: "0", transform: "translate3d(32px, 28px, 0) scale(0.96)" },
          "100%": { opacity: "1", transform: "translate3d(0, 0, 0) scale(1)" },
        },
        "fade-in-left": {
          "0%": { opacity: "0", transform: "translateX(-16px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        "scale-in": {
          "0%": { transform: "scale(0.96)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        "glow-3d-pulse": {
          "0%, 100%": { opacity: "0.35", transform: "scale(1) translateZ(0)" },
          "50%": { opacity: "0.55", transform: "scale(1.05) translateZ(0)" },
        },
        "hero-bg-drift": {
          "0%": { transform: "scale(1.08) translate3d(0, -1.5%, 0)" },
          "100%": { transform: "scale(1.14) translate3d(-2%, 1.5%, 0)" },
        },
        "section-in": {
          "0%": { opacity: "0", transform: "translate3d(0, 1.75rem, 0)" },
          "100%": { opacity: "1", transform: "translate3d(0, 0, 0)" },
        },
        /** Top accent rule: horizontal reveal */
        "hero-line-in": {
          "0%": { opacity: "0", transform: "scaleX(0)" },
          "100%": { opacity: "1", transform: "scaleX(1)" },
        },
        "hero-shimmer": {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "200% 50%" },
        },
        /** Hero / CTA animated grid & lines (`animated-background-lines` UI component) */
        "cta-grid-move": {
          "0%": { backgroundPosition: "0 0" },
          "100%": { backgroundPosition: "50px 50px" },
        },
        "cta-line-move": {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
        "cta-corner-line": {
          "0%": { strokeDashoffset: "0" },
          "25%": { strokeDashoffset: "100" },
          "50%": { strokeDashoffset: "200" },
          "75%": { strokeDashoffset: "300" },
          "100%": { strokeDashoffset: "400" },
        },
        "cta-gradient-shift": {
          "0%": { filter: "hue-rotate(0deg)" },
          "100%": { filter: "hue-rotate(30deg)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "reveal-hero-line": "reveal-hero-line 1s cubic-bezier(0.16, 1, 0.3, 1) both",
        "reveal-right": "reveal-right 0.9s cubic-bezier(0.16, 1, 0.3, 1) both",
        "fade-in-left": "fade-in-left 0.6s ease-out forwards",
        "scale-in": "scale-in 0.4s ease-out forwards",
        "float": "float 6s ease-in-out infinite",
        "glow-3d-pulse": "glow-3d-pulse 5s ease-in-out infinite",
        "hero-bg-drift": "hero-bg-drift 42s ease-in-out infinite alternate",
        "section-in": "section-in 0.95s cubic-bezier(0.16, 1, 0.3, 1) both",
        "hero-line-in": "hero-line-in 0.85s cubic-bezier(0.16, 1, 0.3, 1) both",
        "hero-shimmer": "hero-shimmer 7s linear infinite",
        "cta-grid-move": "cta-grid-move 20s linear infinite",
        "cta-line-move": "cta-line-move 4s linear infinite",
        "cta-corner-line": "cta-corner-line 6s linear infinite",
        "cta-gradient-shift": "cta-gradient-shift 3s ease-in-out infinite alternate",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
