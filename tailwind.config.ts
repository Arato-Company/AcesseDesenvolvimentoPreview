import type { Config } from "tailwindcss";

/**
 * Tailwind config consumindo CSS custom properties definidas em
 * `src/styles/tokens.css`. Toda paleta, tipografia, raio, sombra
 * e espaçamento referenciam os tokens canônicos do Design System
 * (Etapa 5 / `Design System.md`).
 *
 * Caminho C híbrido (decisão 2026-06-15): a partir do bloco "Material
 * aliases" cada chave Material aponta para o mesmo token v0 via CSS
 * custom property. Isso permite portar HTML do Stitch direto para o
 * Next sem reescrever classes (`bg-surface-container-lowest`,
 * `text-on-primary`, `font-headline-lg`, etc) preservando a paleta
 * editorial navy/gold/paper/offwhite.
 */
const config: Config = {
  content: ["./src/**/*.{ts,tsx,js,jsx,mdx}"],
  theme: {
    extend: {
      colors: {
        // ----- Tokens canonicos v0 -----
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

        // ----- Material aliases (Caminho C hibrido) -----
        // Primary family
        primary: "var(--c-navy)",
        "on-primary": "var(--c-offwhite)",
        "primary-container": "var(--c-navy-deep)",
        "on-primary-container": "var(--c-offwhite)",
        "primary-fixed": "var(--c-paper)",
        "primary-fixed-dim": "var(--c-gold-light)",
        "on-primary-fixed": "var(--c-navy-deep)",
        "on-primary-fixed-variant": "var(--c-navy-soft)",
        "inverse-primary": "var(--c-gold-light)",

        // Secondary family
        secondary: "var(--c-gold-deep)",
        "on-secondary": "var(--c-offwhite)",
        "secondary-container": "var(--c-gold-light)",
        "on-secondary-container": "var(--c-gold-deep)",
        "secondary-fixed": "var(--c-gold-light)",
        "secondary-fixed-dim": "var(--c-gold)",
        "on-secondary-fixed": "var(--c-navy-deep)",
        "on-secondary-fixed-variant": "var(--c-gold-deep)",

        // Tertiary family (Stitch usa tertiary como navy/preto suave)
        tertiary: "var(--c-navy-deep)",
        "on-tertiary": "var(--c-offwhite)",
        "tertiary-container": "var(--c-navy-deep)",
        "on-tertiary-container": "var(--c-ink-2)",
        "tertiary-fixed": "var(--c-paper)",
        "tertiary-fixed-dim": "var(--c-line)",
        "on-tertiary-fixed": "var(--c-ink-1)",
        "on-tertiary-fixed-variant": "var(--c-ink-2)",

        // Background / surface family
        background: "var(--c-offwhite)",
        "on-background": "var(--c-ink-1)",
        surface: "var(--c-offwhite)",
        "on-surface": "var(--c-ink-1)",
        "surface-variant": "var(--c-paper)",
        "on-surface-variant": "var(--c-ink-2)",
        "surface-bright": "var(--c-offwhite)",
        "surface-dim": "var(--c-paper)",
        "surface-tint": "var(--c-navy-soft)",
        "surface-container-lowest": "var(--c-offwhite)",
        "surface-container-low": "var(--c-paper)",
        "surface-container": "var(--c-paper)",
        "surface-container-high": "var(--c-paper)",
        "surface-container-highest": "var(--c-line)",
        "inverse-surface": "var(--c-navy)",
        "inverse-on-surface": "var(--c-offwhite)",

        // Outline
        outline: "var(--c-line)",
        "outline-variant": "var(--c-line)",

        // Error
        error: "var(--c-danger)",
        "on-error": "var(--c-offwhite)",
        "error-container": "var(--c-line)",
        "on-error-container": "var(--c-danger)",
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "-apple-system", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "Courier New", "monospace"],

        // ----- Material aliases (Caminho C hibrido) -----
        "display-lg": ["var(--font-fraunces)", "Georgia", "serif"],
        "display-lg-mobile": ["var(--font-fraunces)", "Georgia", "serif"],
        "display-md": ["var(--font-fraunces)", "Georgia", "serif"],
        "headline-lg": ["var(--font-fraunces)", "Georgia", "serif"],
        "headline-sm": ["var(--font-fraunces)", "Georgia", "serif"],
        "body-lg": [
          "var(--font-inter)",
          "-apple-system",
          "system-ui",
          "sans-serif",
        ],
        "body-md": [
          "var(--font-inter)",
          "-apple-system",
          "system-ui",
          "sans-serif",
        ],
        "body-sm": [
          "var(--font-inter)",
          "-apple-system",
          "system-ui",
          "sans-serif",
        ],
        "label-caps": [
          "var(--font-jetbrains-mono)",
          "Courier New",
          "monospace",
        ],
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

        // ----- Material aliases (Caminho C hibrido) -----
        // Tuplas preservam lineHeight/letterSpacing/fontWeight Material.
        "display-lg": [
          "48px",
          { lineHeight: "1.1", letterSpacing: "-0.02em", fontWeight: "700" },
        ],
        "display-lg-mobile": [
          "32px",
          { lineHeight: "1.2", fontWeight: "700" },
        ],
        "display-md": [
          "36px",
          { lineHeight: "1.2", fontWeight: "600" },
        ],
        "headline-lg": [
          "28px",
          { lineHeight: "1.3", fontWeight: "600" },
        ],
        "headline-sm": [
          "20px",
          { lineHeight: "1.4", fontWeight: "500" },
        ],
        "body-lg": [
          "18px",
          { lineHeight: "1.6", fontWeight: "400" },
        ],
        "body-md": [
          "16px",
          { lineHeight: "1.6", fontWeight: "400" },
        ],
        "body-sm": [
          "14px",
          { lineHeight: "1.5", fontWeight: "400" },
        ],
        "label-caps": [
          "12px",
          {
            lineHeight: "1",
            letterSpacing: "0.16em",
            fontWeight: "500",
          },
        ],
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

        // ----- Material aliases (Caminho C hibrido) -----
        unit: "var(--s-2)", // 8px
        gutter: "var(--s-6)", // 24px
        "margin-desktop": "var(--s-10)", // 40px
        "margin-mobile": "var(--s-4)", // 16px
        "sidebar-width": "var(--sidebar-w)", // 240px
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
        // ----- Material alias (Caminho C hibrido) -----
        "container-max": "1280px",
      },
      width: {
        // ----- Material alias (Caminho C hibrido) -----
        "sidebar-width": "var(--sidebar-w)",
      },
    },
  },
  plugins: [],
};

export default config;
