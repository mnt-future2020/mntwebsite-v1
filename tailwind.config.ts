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
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "Segoe UI", "Roboto", "sans-serif"],
        display: ["Sora", "Inter", "system-ui", "sans-serif"],
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
      },
      animation: {
        "fade-up": "fade-up 0.6s ease-out both",
        float: "float 6s ease-in-out infinite",
      },
    },
  },
  plugins: [typography],
};

export default config;
