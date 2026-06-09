import type { Config } from "tailwindcss";

/**
 * Tailwind config consumindo CSS custom properties definidas em
 * `src/styles/tokens.css`. Toda paleta, tipografia, raio, sombra
 * e espaçamento referenciam os tokens canônicos do Design System
 * (Etapa 5 / `Design System.md`).
 */
const config: Config = {
  content: ["./src/**/*.{ts,tsx,js,jsx,mdx}"],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: "var(--c-navy)",
          deep: "var(--c-navy-deep)",
          soft: "var(--c-navy-soft)",
        },
        gold: {
          DEFAULT: "var(--c-gold)",
          light: "var(--c-gold-light)",
          deep: "var(--c-gold-deep)",
        },
        offwhite: "var(--c-offwhite)",
        paper: "var(--c-paper)",
        line: "var(--c-line)",
        ink: {
          1: "var(--c-ink-1)",
          2: "var(--c-ink-2)",
          3: "var(--c-ink-3)",
        },
        success: "var(--c-success)",
        warning: "var(--c-warning)",
        danger: "var(--c-danger)",
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "-apple-system", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "Courier New", "monospace"],
      },
      fontSize: {
        "2xs": "var(--fs-2xs)",
        xs: "var(--fs-xs)",
        sm: "var(--fs-sm)",
        base: "var(--fs-md)",
        lg: "var(--fs-lg)",
        xl: "var(--fs-xl)",
        "2xl": "var(--fs-2xl)",
        "3xl": "var(--fs-3xl)",
        "4xl": "var(--fs-4xl)",
        "5xl": "var(--fs-5xl)",
      },
      spacing: {
        1: "var(--s-1)",
        2: "var(--s-2)",
        3: "var(--s-3)",
        4: "var(--s-4)",
        5: "var(--s-5)",
        6: "var(--s-6)",
        8: "var(--s-8)",
        10: "var(--s-10)",
        12: "var(--s-12)",
        16: "var(--s-16)",
        20: "var(--s-20)",
        24: "var(--s-24)",
      },
      borderRadius: {
        sm: "var(--r-sm)",
        md: "var(--r-md)",
        lg: "var(--r-lg)",
        xl: "var(--r-xl)",
        "2xl": "var(--r-2xl)",
        pill: "var(--r-pill)",
      },
      boxShadow: {
        1: "var(--sh-1)",
        2: "var(--sh-2)",
        3: "var(--sh-3)",
        4: "var(--sh-4)",
        gold: "var(--sh-gold)",
      },
      transitionTimingFunction: {
        ease: "var(--ease)",
      },
      transitionDuration: {
        fast: "150ms",
        base: "250ms",
        slow: "400ms",
      },
      maxWidth: {
        container: "1280px",
      },
    },
  },
  plugins: [],
};

export default config;
