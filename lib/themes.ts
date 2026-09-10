/** Auto-generated theme registry from Omarchy.org website themes. */

export type ThemeScheme = "light" | "dark";

export type SiteTheme = {
  id: string;
  name: string;
  scheme: ThemeScheme;
  /** Swatch colors for preview thumbnails (hex). */
  preview: {
    bg: string;
    surface: string;
    text: string;
    brand: string;
    border: string;
  };
};

export const SITE_THEMES: SiteTheme[] = [
  {
    id: "nord",
    name: "Nord",
    scheme: "dark",
    preview: {
      bg: "#2e3440",
      surface: "#343b49",
      text: "#d8dee9",
      brand: "#81a1c1",
      border: "#3b4252",
    },
  },
  {
    id: "catppuccin",
    name: "Catppuccin",
    scheme: "dark",
    preview: {
      bg: "#1e1e2e",
      surface: "#282839",
      text: "#cdd6f4",
      brand: "#89b4fa",
      border: "#313244",
    },
  },
  {
    id: "catppuccin-latte",
    name: "Catppuccin Latte",
    scheme: "light",
    preview: {
      bg: "#eff1f5",
      surface: "#f8f9fb",
      text: "#4c4f69",
      brand: "#1e66f5",
      border: "#d7d8dc",
    },
  },
  {
    id: "ethereal",
    name: "Ethereal",
    scheme: "dark",
    preview: {
      bg: "#060b1e",
      surface: "#0c122c",
      text: "#ffcead",
      brand: "#7d82d9",
      border: "#131a3a",
    },
  },
  {
    id: "everforest",
    name: "Everforest",
    scheme: "dark",
    preview: {
      bg: "#2d353b",
      surface: "#303a40",
      text: "#d3c6aa",
      brand: "#7fbbb3",
      border: "#343f44",
    },
  },
  {
    id: "flexoki-light",
    name: "Flexoki Light",
    scheme: "light",
    preview: {
      bg: "#fffcf0",
      surface: "#f9f6ea",
      text: "#100f0f",
      brand: "#205ea6",
      border: "#e5e2d8",
    },
  },
  {
    id: "gruvbox",
    name: "Gruvbox",
    scheme: "dark",
    preview: {
      bg: "#282828",
      surface: "#32302f",
      text: "#d4be98",
      brand: "#7daea3",
      border: "#3c3836",
    },
  },
  {
    id: "hackerman",
    name: "Hackerman",
    scheme: "dark",
    preview: {
      bg: "#0b0c16",
      surface: "#10121f",
      text: "#ddf7ff",
      brand: "#82fb9c",
      border: "#151828",
    },
  },
  {
    id: "kanagawa",
    name: "Kanagawa",
    scheme: "dark",
    preview: {
      bg: "#1f1f28",
      surface: "#202838",
      text: "#dcd7ba",
      brand: "#dcd7ba",
      border: "#223249",
    },
  },
  {
    id: "last-horizon",
    name: "Last Horizon",
    scheme: "dark",
    preview: {
      bg: "#0c0b0c",
      surface: "#0c0b0c",
      text: "#fafcfb",
      brand: "#b59790",
      border: "#0c0b0c",
    },
  },
  {
    id: "lumon",
    name: "Lumon",
    scheme: "dark",
    preview: {
      bg: "#16242d",
      surface: "#182836",
      text: "#f2fcff",
      brand: "#8bc9eb",
      border: "#1b2d40",
    },
  },
  {
    id: "lupine",
    name: "Lupine",
    scheme: "light",
    preview: {
      bg: "#fafafa",
      surface: "#fff",
      text: "#000",
      brand: "#3264eb",
      border: "#dedede",
    },
  },
  {
    id: "matte-black",
    name: "Matte Black",
    scheme: "dark",
    preview: {
      bg: "#121212",
      surface: "#181818",
      text: "#eaeaea",
      brand: "#e68e0d",
      border: "#1e1e1e",
    },
  },
  {
    id: "miasma",
    name: "Miasma",
    scheme: "dark",
    preview: {
      bg: "#222",
      surface: "#272727",
      text: "#c2c2b0",
      brand: "#78824b",
      border: "#2c2c2c",
    },
  },
  {
    id: "osaka-jade",
    name: "Osaka Jade",
    scheme: "dark",
    preview: {
      bg: "#111c18",
      surface: "#1a2a22",
      text: "#f7e8b2",
      brand: "#509475",
      border: "#23372b",
    },
  },
  {
    id: "retro-82",
    name: "Retro 82",
    scheme: "dark",
    preview: {
      bg: "#05182e",
      surface: "#081e37",
      text: "#f6dcac",
      brand: "#faa968",
      border: "#0a2540",
    },
  },
  {
    id: "ristretto",
    name: "Ristretto",
    scheme: "dark",
    preview: {
      bg: "#2c2525",
      surface: "#342a28",
      text: "#e6d9db",
      brand: "#f38d70",
      border: "#3d2f2a",
    },
  },
  {
    id: "rose-pine",
    name: "Rosé Pine",
    scheme: "light",
    preview: {
      bg: "#faf4ed",
      surface: "#fffaf3",
      text: "#575279",
      brand: "#56949f",
      border: "#e1dbd5",
    },
  },
  {
    id: "solitude",
    name: "Solitude",
    scheme: "dark",
    preview: {
      bg: "#101315",
      surface: "#101315",
      text: "#cacccc",
      brand: "#798186",
      border: "#101315",
    },
  },
  {
    id: "tokyo-night",
    name: "Tokyo Night",
    scheme: "dark",
    preview: {
      bg: "#1a1b26",
      surface: "#1f2230",
      text: "#c0caf5",
      brand: "#9ece6a",
      border: "#24283b",
    },
  },
  {
    id: "vantablack",
    name: "Vantablack",
    scheme: "dark",
    preview: {
      bg: "#000",
      surface: "#0d0d0d",
      text: "#fff",
      brand: "#8d8d8d",
      border: "#1a1a1a",
    },
  },
  {
    id: "white",
    name: "White",
    scheme: "light",
    preview: {
      bg: "#fff",
      surface: "#fff",
      text: "#000",
      brand: "#6e6e6e",
      border: "#e8e8e8",
    },
  },
];

export const SITE_THEME_IDS = SITE_THEMES.map((t) => t.id);

export const DEFAULT_THEME_ID = "nord";

const byId = new Map(SITE_THEMES.map((t) => [t.id, t]));

/** Resolve legacy light/dark aliases used by older localStorage values. */
export function normalizeThemeId(theme: string | undefined | null): string {
  if (!theme) return DEFAULT_THEME_ID;
  if (theme === "dark") return "nord";
  if (theme === "light") return "catppuccin-latte";
  return byId.has(theme) ? theme : DEFAULT_THEME_ID;
}

export function getTheme(theme: string | undefined | null): SiteTheme {
  return byId.get(normalizeThemeId(theme)) ?? SITE_THEMES[0]!;
}

export function isLightTheme(theme: string | undefined | null): boolean {
  return getTheme(theme).scheme === "light";
}

/** Cycle through SITE_THEMES (used by command palette). */
export function cycleTheme(current: string | undefined | null, direction: 1 | -1 = 1): string {
  const id = normalizeThemeId(current);
  const index = SITE_THEMES.findIndex((t) => t.id === id);
  const next = (index + direction + SITE_THEMES.length) % SITE_THEMES.length;
  return SITE_THEMES[next]!.id;
}
