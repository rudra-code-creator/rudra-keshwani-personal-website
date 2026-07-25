import type { Config } from "tailwindcss";

const withAlpha = (variable: string, alphaVar?: string) =>
  alphaVar
    ? `rgb(var(${variable}) / var(${alphaVar}))`
    : `rgb(var(${variable}) / <alpha-value>)`;

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      fontSize: {
        "display-xl": ["64px", { lineHeight: "1.1", fontWeight: "600", letterSpacing: "0" }],
        "display-lg": ["56px", { lineHeight: "1.17", fontWeight: "500", letterSpacing: "0.2px" }],
        "heading-xl": ["24px", { lineHeight: "1.6", fontWeight: "500", letterSpacing: "0.2px" }],
        "heading-lg": ["22px", { lineHeight: "1.15", fontWeight: "500", letterSpacing: "0" }],
        "heading-md": ["20px", { lineHeight: "1.4", fontWeight: "500", letterSpacing: "0.2px" }],
        "heading-sm": ["18px", { lineHeight: "1.4", fontWeight: "500", letterSpacing: "0.2px" }],
        "body-lg": ["18px", { lineHeight: "1.6", fontWeight: "400", letterSpacing: "0" }],
        "body-md": ["16px", { lineHeight: "1.6", fontWeight: "400", letterSpacing: "0" }],
        "body-strong": ["16px", { lineHeight: "1.4", fontWeight: "500", letterSpacing: "0.2px" }],
        "body-sm": ["14px", { lineHeight: "1.6", fontWeight: "400", letterSpacing: "0" }],
        "body-sm-strong": ["14px", { lineHeight: "1.6", fontWeight: "500", letterSpacing: "0.2px" }],
        "caption-md": ["13px", { lineHeight: "1.4", fontWeight: "400", letterSpacing: "0.1px" }],
        "caption-sm": ["12px", { lineHeight: "1.5", fontWeight: "400", letterSpacing: "0.4px" }],
        "link-md": ["16px", { lineHeight: "1.4", fontWeight: "500", letterSpacing: "0.3px" }],
        "button-md": ["14px", { lineHeight: "1.6", fontWeight: "500", letterSpacing: "0.2px" }],
      },
      colors: {
        canvas: withAlpha("--color-canvas"),
        surface: withAlpha("--color-surface"),
        "surface-elevated": withAlpha("--color-surface-elevated"),
        "surface-card": withAlpha("--color-surface-card"),
        "button-fg": withAlpha("--color-button-fg"),
        ink: withAlpha("--color-ink"),
        body: withAlpha("--color-body"),
        charcoal: withAlpha("--color-charcoal"),
        mute: withAlpha("--color-mute"),
        ash: withAlpha("--color-ash"),
        stone: withAlpha("--color-stone"),
        "on-dark": withAlpha("--color-on-dark"),
        "on-dark-mute": withAlpha("--color-on-dark-mute", "--color-on-dark-mute-alpha"),
        primary: withAlpha("--color-primary"),
        "primary-pressed": withAlpha("--color-primary-pressed"),
        "on-primary": withAlpha("--color-on-primary"),
        hairline: withAlpha("--color-hairline"),
        "hairline-soft": withAlpha("--color-hairline-soft", "--color-hairline-soft-alpha"),
        "hairline-strong": withAlpha("--color-hairline-strong", "--color-hairline-strong-alpha"),
        "accent-blue": withAlpha("--color-accent-blue"),
        "accent-blue-soft": withAlpha("--color-accent-blue-soft", "--color-accent-blue-soft-alpha"),
        "accent-red": withAlpha("--color-accent-red"),
        "accent-red-soft": withAlpha("--color-accent-red-soft", "--color-accent-red-soft-alpha"),
        "accent-green": withAlpha("--color-accent-green"),
        "accent-green-soft": withAlpha("--color-accent-green-soft", "--color-accent-green-soft-alpha"),
        "accent-yellow": withAlpha("--color-accent-yellow"),
        "accent-yellow-soft": withAlpha(
          "--color-accent-yellow-soft",
          "--color-accent-yellow-soft-alpha",
        ),
        "hero-stripe-start": withAlpha("--color-hero-stripe-start"),
        "hero-stripe-end": withAlpha("--color-hero-stripe-end"),
        "key-bg-start": withAlpha("--color-key-bg-start"),
        "key-bg-end": withAlpha("--color-key-bg-end"),
      },
      borderRadius: {
        xs: "4px",
        sm: "6px",
        md: "8px",
        lg: "10px",
        xl: "16px",
      },
      maxWidth: {
        content: "100%",
        palette: "1080px",
      },
      spacing: {
        section: "24px",
      },
    },
  },
  plugins: [],
};

export default config;
