import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary brand colour extracted from the MnT logo
        brand: {
          DEFAULT: "#2095F1",
          50: "#EAF4FE",
          100: "#D2E8FD",
          200: "#A9D2FB",
          300: "#7BB9F8",
          400: "#479FF4",
          500: "#2095F1",
          600: "#1380E0",
          700: "#0E66C2",
          800: "#0F529C",
          900: "#11457D",
        },
        navy: {
          DEFAULT: "#081A33",
          800: "#0C2547",
          700: "#123058",
        },
        // Endpoints of the brand gradient. Derived from #2095F1 and #3E51B6 by
        // darkening each until white/55 — the tightest opacity the site uses on
        // a dark background — clears AA. The brand hues at full strength give
        // 2.81:1 and 3.27:1 there, which is the exact class of failure the WCAG
        // case study is about.
        deep: {
          blue: "#083B71",
          indigo: "#2A367A",
        },
        ink: "#0E1B2E",
        slatey: "#475569",
        soft: "#F4F8FD",
        // v3 design surfaces: tinted section background + hairline border
        mist: "#F5F9FD",
        line: "#E8EDF3",
        // Blueprint: the technical redesign layer. Square corners, hairline
        // grids, mono labels. Kept as its own scale so v3 pages are untouched.
        bp: {
          ink: "#0B1524", // headings and dark bands
          body: "#24344A", // body copy
          mute: "#4E5F76", // secondary copy
          soft: "#6C7D93", // labels
          faint: "#8394AA", // meta
          ghost: "#E7EDF5", // the giant section numerals
          wash: "#F4F7FB", // alternating section background
          tint: "#FAFCFE", // frame chrome
          line: "#E4EAF2", // section borders
          hair: "#EDF1F7", // inner cell borders
          edge: "#DDE5EF", // stronger card borders
        },
      },
      fontFamily: {
        sans: ["var(--font-source-sans)", "system-ui", "-apple-system", '"Segoe UI"', "Roboto", "sans-serif"],
        display: ["var(--font-sora)", "var(--font-source-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-plex-mono)", "ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },
      borderRadius: {
        "4xl": "2rem",
      },
      boxShadow: {
        card: "0 1px 2px rgba(16,27,46,0.04), 0 12px 32px -12px rgba(16,27,46,0.12)",
        cardhover: "0 2px 4px rgba(16,27,46,0.06), 0 24px 48px -16px rgba(20,131,224,0.28)",
        glow: "0 20px 60px -20px rgba(32,149,241,0.55)",
      },
      backgroundImage: {
        "grid-faint":
          "linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)",
        // The dark sections. Replaces flat navy — same diagonal as the brand
        // spec, at the depth the text scale needs. `bg-deep` is a
        // background-image, so opacity modifiers (bg-deep/70) do nothing; use
        // bg-navy/x for scrims.
        deep: "linear-gradient(135deg, #083B71 0%, #2A367A 100%)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        // Blueprint motion.
        "rise-in": {
          from: { opacity: "0", transform: "translateY(18px)" },
          to: { opacity: "1", transform: "none" },
        },
        "word-in": {
          from: { opacity: "0", transform: "translateY(0.38em) rotateX(58deg) scale(0.97)", filter: "blur(10px)" },
          to: { opacity: "1", transform: "none", filter: "none" },
        },
        "pop-q": {
          "0%": { opacity: "0", transform: "scale(0.2) rotate(-16deg)" },
          "55%": { opacity: "1", transform: "scale(1.26) rotate(4deg)" },
          "100%": { opacity: "1", transform: "none" },
        },
        "ring-out": {
          "0%": { opacity: "0.55", transform: "scale(0.5)" },
          "100%": { opacity: "0", transform: "scale(2.4)" },
        },
        "draw-rule": { from: { transform: "scaleX(0)" }, to: { transform: "scaleX(1)" } },
        "live-pulse": {
          "0%,100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: ".35", transform: "scale(.72)" },
        },
        caret: { "0%,49%": { opacity: "1" }, "50%,100%": { opacity: "0" } },
      },
      animation: {
        "fade-up": "fade-up 0.6s ease-out both",
        float: "float 6s ease-in-out infinite",
        "rise-in": "rise-in 0.7s cubic-bezier(.22,1,.36,1) both",
        "word-in": "word-in 0.75s cubic-bezier(.22,1,.36,1) both",
        "pop-q": "pop-q 0.65s cubic-bezier(.34,1.56,.64,1) both",
        "ring-out": "ring-out 0.8s ease-out both",
        "draw-rule": "draw-rule 0.8s cubic-bezier(.22,1,.36,1) both",
        "live-pulse": "live-pulse 1.6s ease-in-out infinite",
        caret: "caret 1s step-end infinite",
      },
    },
  },
  plugins: [typography],
};

export default config;
