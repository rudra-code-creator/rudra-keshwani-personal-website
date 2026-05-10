import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-mono)", "IBM Plex Mono", "ui-monospace", "monospace"],
      },
      fontSize: {
        display: ["38px", { lineHeight: "1.5", fontWeight: "700" }],
        "heading-md": ["16px", { lineHeight: "1.5", fontWeight: "700" }],
        body: ["16px", { lineHeight: "1.5", fontWeight: "400" }],
        "body-strong": ["16px", { lineHeight: "1.5", fontWeight: "500" }],
        link: ["16px", { lineHeight: "1.5", fontWeight: "400" }],
        button: ["16px", { lineHeight: "2", fontWeight: "500" }],
        caption: ["14px", { lineHeight: "2", fontWeight: "400" }],
      },
      colors: {
        canvas: "#fdfcfc",
        ink: "#201d1d",
        "ink-deep": "#0f0000",
        charcoal: "#302c2c",
        copy: "#424245",
        mute: "#646262",
        stone: "#6e6e73",
        ash: "#9a9898",
        "surface-soft": "#f8f7f7",
        "surface-card": "#f1eeee",
        "surface-dark": "#201d1d",
        "surface-dark-elevated": "#302c2c",
        "on-primary": "#fdfcfc",
        "on-dark": "#fdfcfc",
        "on-dark-mute": "#9a9898",
        accent: "#007aff",
        "accent-hover": "#0056b3",
        danger: "#ff3b30",
        warning: "#ff9f0a",
        success: "#30d158",
        hairline: "rgba(15, 0, 0, 0.12)",
        "hairline-strong": "#646262",
      },
      maxWidth: {
        content: "960px",
        frame: "1100px",
      },
      spacing: {
        section: "96px",
      },
    },
  },
  plugins: [],
};

export default config;
