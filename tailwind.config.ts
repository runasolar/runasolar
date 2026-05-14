import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: "1.25rem", lg: "2rem" },
      screens: { "2xl": "1280px" },
    },
    extend: {
      colors: {
        bg: {
          DEFAULT: "rgb(var(--color-bg) / <alpha-value>)",
          warm: "rgb(var(--color-bg-warm) / <alpha-value>)",
          deep: "rgb(var(--color-bg-deep) / <alpha-value>)",
        },
        ink: {
          DEFAULT: "rgb(var(--color-ink) / <alpha-value>)",
          muted: "rgb(var(--color-ink-muted) / <alpha-value>)",
          soft: "rgb(var(--color-ink-soft) / <alpha-value>)",
        },
        leaf: {
          50: "rgb(var(--color-leaf-50) / <alpha-value>)",
          100: "rgb(var(--color-leaf-100) / <alpha-value>)",
          200: "rgb(var(--color-leaf-200) / <alpha-value>)",
          400: "rgb(var(--color-leaf-400) / <alpha-value>)",
          500: "rgb(var(--color-leaf-500) / <alpha-value>)",
          600: "rgb(var(--color-leaf-600) / <alpha-value>)",
          700: "rgb(var(--color-leaf-700) / <alpha-value>)",
          900: "rgb(var(--color-leaf-900) / <alpha-value>)",
        },
        sun: {
          50: "rgb(var(--color-sun-50) / <alpha-value>)",
          200: "rgb(var(--color-sun-200) / <alpha-value>)",
          400: "rgb(var(--color-sun-400) / <alpha-value>)",
          500: "rgb(var(--color-sun-500) / <alpha-value>)",
          600: "rgb(var(--color-sun-600) / <alpha-value>)",
        },
        line: "rgb(var(--color-line) / <alpha-value>)",
        sky: {
          mist: "rgb(var(--color-sky-mist) / <alpha-value>)",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      fontSize: {
        "display-1": ["clamp(2.75rem, 6vw + 1rem, 6rem)", { lineHeight: "1.02", letterSpacing: "-0.02em" }],
        "display-2": ["clamp(2rem, 3vw + 1rem, 3.75rem)", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
        "display-3": ["clamp(1.5rem, 1.5vw + 1rem, 2.5rem)", { lineHeight: "1.15", letterSpacing: "-0.01em" }],
      },
      borderRadius: {
        "4xl": "2rem",
      },
      boxShadow: {
        soft: "0 1px 2px rgba(26,31,27,0.04), 0 8px 24px -8px rgba(26,31,27,0.08)",
        lift: "0 2px 4px rgba(26,31,27,0.04), 0 24px 48px -16px rgba(26,31,27,0.16)",
      },
      backgroundImage: {
        "grain": "url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.5'/></svg>\")",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "marquee-reverse": {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0)" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        marquee: "marquee 50s linear infinite",
        "marquee-slow": "marquee 80s linear infinite",
        "marquee-reverse": "marquee-reverse 60s linear infinite",
        "fade-up": "fade-up 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards",
        shimmer: "shimmer 2.5s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
