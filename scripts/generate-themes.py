"""Generate app/themes.css and lib/themes.ts from Omarchy website theme tokens."""
from __future__ import annotations

import json
import re
from pathlib import Path

ROOT = Path(r"C:\Users\rudra\personal-website")
themes = json.loads((ROOT / "scripts" / "omarchy-themes.json").read_text(encoding="utf-8"))

LIGHT_IDS = {"catppuccin-latte", "flexoki-light", "lupine", "rose-pine", "white"}

LABELS = {
    "catppuccin": "Catppuccin",
    "catppuccin-latte": "Catppuccin Latte",
    "ethereal": "Ethereal",
    "everforest": "Everforest",
    "flexoki-light": "Flexoki Light",
    "gruvbox": "Gruvbox",
    "hackerman": "Hackerman",
    "kanagawa": "Kanagawa",
    "last-horizon": "Last Horizon",
    "lumon": "Lumon",
    "lupine": "Lupine",
    "matte-black": "Matte Black",
    "miasma": "Miasma",
    "nord": "Nord",
    "osaka-jade": "Osaka Jade",
    "retro-82": "Retro 82",
    "ristretto": "Ristretto",
    "rose-pine": "Rosé Pine",
    "solitude": "Solitude",
    "tokyo-night": "Tokyo Night",
    "vantablack": "Vantablack",
    "white": "White",
}

# Sensible aurora-ish accents that work across themes (only used for status chips)
ACCENT_DEFAULTS = {
    "red": (191, 97, 106),
    "green": (163, 190, 140),
    "yellow": (235, 203, 139),
}


NAMED = {
    "silver": "#c0c0c0",
    "white": "#ffffff",
    "black": "#000000",
    "gray": "#808080",
    "grey": "#808080",
}


def hex_to_rgb(h: str) -> tuple[int, int, int]:
    h = h.strip()
    if h.lower() in NAMED:
        h = NAMED[h.lower()]
    h = h.lstrip("#")
    if len(h) == 3:
        h = "".join(c * 2 for c in h)
    if len(h) == 8:
        h = h[:6]
    if len(h) != 6 or any(c not in "0123456789abcdefABCDEF" for c in h):
        raise ValueError(f"bad hex {h!r}")
    return int(h[0:2], 16), int(h[2:4], 16), int(h[4:6], 16)


def rgb(s: str) -> str:
    r, g, b = hex_to_rgb(s)
    return f"{r} {g} {b}"


def soft_alpha(brand_soft: str) -> str:
    # Omarchy uses #89b4fa1f style — last byte is alpha
    m = re.fullmatch(r"#?[0-9a-fA-F]{8}", brand_soft.strip())
    if m:
        a = int(brand_soft.strip().lstrip("#")[6:8], 16) / 255
        return f"{a:.3f}".rstrip("0").rstrip(".")
    return "0.12"


def luminance(hex_color: str) -> float:
    r, g, b = hex_to_rgb(hex_color)
    return (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255


def theme_block(theme_id: str, t: dict[str, str], aliases: list[str] | None = None) -> str:
    selectors = [f'[data-theme="{theme_id}"]']
    if aliases:
        selectors = aliases + selectors
    sel = ",\n".join(selectors)

    bg = t["--t-bg"]
    surface = t["--t-surface"] or bg
    surface2 = t["--t-surface-2"] or surface
    border = t["--t-border-subtle"] or surface2
    border_strong = t["--t-border-strong"] or border
    text = t["--t-text"]
    text_sec = t["--t-text-secondary"] or text
    muted = t["--t-text-muted"] or text_sec
    brand = t["--t-brand"]
    brand_ink = t["--t-brand-ink"]
    brand_soft = t.get("--t-brand-soft") or ""
    field = t.get("--t-field-bg") or t.get("--t-bg-deep") or bg
    selection = t.get("--t-selection") or surface2
    bg_deep = t.get("--t-bg-deep") or bg

    is_light = theme_id in LIGHT_IDS or luminance(bg) > 0.55
    scheme = "light" if is_light else "dark"
    soft_a = soft_alpha(brand_soft) if brand_soft else ("0.14" if is_light else "0.12")

    # accent blue tracks brand (frost/cyan/etc)
    brand_rgb = rgb(brand)
    red = " ".join(map(str, ACCENT_DEFAULTS["red"]))
    green = " ".join(map(str, ACCENT_DEFAULTS["green"]))
    yellow = " ".join(map(str, ACCENT_DEFAULTS["yellow"]))

    press = rgb(text) if is_light else "255 255 255"
    press_a = "0.06"
    hairline_soft = rgb(text) if is_light else "255 255 255"
    hairline_soft_a = "0.08" if is_light else "0.07"
    hairline_strong_a = "0.35" if is_light else "1"
    on_dark_mute_a = "0.72" if is_light else "0.78"
    stipple = rgb(border_strong if is_light else text)
    stipple_a = "0.16" if is_light else "0.07"
    selection_a = "0.22" if is_light else "1"
    focus_a = "0.45" if is_light else "0.55"

    # pressed brand: nudge toward text or surface2
    pressed = rgb(surface2) if is_light else brand_rgb  # keep simple; CSS can use brand

    return f"""{sel} {{
  color-scheme: {scheme};
  --color-canvas: {rgb(bg)};
  --color-surface: {rgb(surface)};
  --color-surface-elevated: {rgb(surface2)};
  --color-surface-card: {rgb(surface2)};
  --color-button-fg: {rgb(field)};
  --color-ink: {rgb(text)};
  --color-body: {rgb(text_sec)};
  --color-charcoal: {rgb(text)};
  --color-mute: {rgb(muted)};
  --color-ash: {rgb(muted)};
  --color-stone: {rgb(border_strong)};
  --color-on-dark: {rgb(text)};
  --color-on-dark-mute: {rgb(text)};
  --color-on-dark-mute-alpha: {on_dark_mute_a};
  --color-primary: {brand_rgb};
  --color-primary-pressed: {rgb(border_strong) if is_light else brand_rgb};
  --color-on-primary: {rgb(brand_ink)};
  --color-hairline: {rgb(border)};
  --color-hairline-soft: {hairline_soft};
  --color-hairline-soft-alpha: {hairline_soft_a};
  --color-hairline-strong: {rgb(border_strong)};
  --color-hairline-strong-alpha: {hairline_strong_a};
  --color-accent-blue: {brand_rgb};
  --color-accent-blue-soft: {brand_rgb};
  --color-accent-blue-soft-alpha: {soft_a};
  --color-accent-red: {red};
  --color-accent-red-soft: {red};
  --color-accent-red-soft-alpha: 0.15;
  --color-accent-green: {green};
  --color-accent-green-soft: {green};
  --color-accent-green-soft-alpha: 0.15;
  --color-accent-yellow: {yellow};
  --color-accent-yellow-soft: {yellow};
  --color-accent-yellow-soft-alpha: 0.15;
  --color-hero-stripe-start: {brand_rgb};
  --color-hero-stripe-end: {rgb(border_strong)};
  --color-key-bg-start: {rgb(surface2)};
  --color-key-bg-end: {rgb(surface)};
  --color-selection: {rgb(selection)};
  --color-selection-alpha: {selection_a};
  --color-focus-ring: {brand_rgb};
  --color-focus-ring-alpha: {focus_a};
  --color-press: {press};
  --color-press-alpha: {press_a};
  --color-stipple: {stipple};
  --color-stipple-alpha: {stipple_a};
  --color-bg-deep: {rgb(bg_deep)};
}}
"""


# Prefer nord as :root default (matches site default)
order = sorted(themes.keys(), key=lambda x: (0 if x == "nord" else 1, x))

css_parts = [
    "/* Auto-generated from Omarchy.org website themes — do not edit by hand */",
    "/* Source: scripts/omarchy-themes.json via scripts/generate-themes.py */",
    "",
]

# :root + nord + dark alias
css_parts.append(theme_block("nord", themes["nord"], aliases=[":root", '[data-theme="dark"]']))
for tid in order:
    if tid == "nord":
        continue
    aliases = ['[data-theme="light"]'] if tid == "catppuccin-latte" else None
    css_parts.append(theme_block(tid, themes[tid], aliases=aliases))

css_path = ROOT / "app" / "themes.css"
css_path.write_text("\n".join(css_parts), encoding="utf-8")
print("wrote", css_path, "bytes", css_path.stat().st_size)

# TypeScript registry
ts_lines = [
    "/** Auto-generated theme registry from Omarchy.org website themes. */",
    "",
    "export type ThemeScheme = \"light\" | \"dark\";",
    "",
    "export type SiteTheme = {",
    "  id: string;",
    "  name: string;",
    "  scheme: ThemeScheme;",
    "  /** Swatch colors for preview thumbnails (hex). */",
    "  preview: {",
    "    bg: string;",
    "    surface: string;",
    "    text: string;",
    "    brand: string;",
    "    border: string;",
    "  };",
    "};",
    "",
    "export const SITE_THEMES: SiteTheme[] = [",
]

for tid in order:
    t = themes[tid]
    scheme = "light" if tid in LIGHT_IDS else "dark"
    ts_lines.append("  {")
    ts_lines.append(f'    id: "{tid}",')
    ts_lines.append(f'    name: "{LABELS.get(tid, tid)}",')
    ts_lines.append(f'    scheme: "{scheme}",')
    ts_lines.append("    preview: {")
    ts_lines.append(f'      bg: "{t["--t-bg"]}",')
    ts_lines.append(f'      surface: "{t["--t-surface"] or t["--t-bg"]}",')
    ts_lines.append(f'      text: "{t["--t-text"]}",')
    ts_lines.append(f'      brand: "{t["--t-brand"]}",')
    ts_lines.append(f'      border: "{t["--t-border-subtle"] or t["--t-surface-2"] or t["--t-bg"]}",')
    ts_lines.append("    },")
    ts_lines.append("  },")

ts_lines += [
    "];",
    "",
    "export const SITE_THEME_IDS = SITE_THEMES.map((t) => t.id);",
    "",
    "export const DEFAULT_THEME_ID = \"nord\";",
    "",
    "const byId = new Map(SITE_THEMES.map((t) => [t.id, t]));",
    "",
    "/** Resolve legacy light/dark aliases used by older localStorage values. */",
    "export function normalizeThemeId(theme: string | undefined | null): string {",
    "  if (!theme) return DEFAULT_THEME_ID;",
    '  if (theme === "dark") return "nord";',
    '  if (theme === "light") return "catppuccin-latte";',
    "  return byId.has(theme) ? theme : DEFAULT_THEME_ID;",
    "}",
    "",
    "export function getTheme(theme: string | undefined | null): SiteTheme {",
    "  return byId.get(normalizeThemeId(theme)) ?? SITE_THEMES[0]!;",
    "}",
    "",
    "export function isLightTheme(theme: string | undefined | null): boolean {",
    '  return getTheme(theme).scheme === "light";',
    "}",
    "",
]

ts_path = ROOT / "lib" / "themes.ts"
ts_path.write_text("\n".join(ts_lines), encoding="utf-8")
print("wrote", ts_path)
print("themes", len(themes))
