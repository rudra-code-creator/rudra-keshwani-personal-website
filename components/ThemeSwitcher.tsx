"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { useTheme } from "next-themes";
import {
  DEFAULT_THEME_ID,
  SITE_THEMES,
  getTheme,
  normalizeThemeId,
  type SiteTheme,
} from "@/lib/themes";

type ThemeSwitcherContextValue = {
  openPicker: () => void;
};

const ThemeSwitcherContext = createContext<ThemeSwitcherContextValue | null>(null);

export function useThemeSwitcher(): ThemeSwitcherContextValue {
  const ctx = useContext(ThemeSwitcherContext);
  if (!ctx) {
    throw new Error("useThemeSwitcher must be used within ThemeSwitcherProvider");
  }
  return ctx;
}

function PaletteIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 3a9 9 0 0 0 0 18h1.5a2.5 2.5 0 0 0 0-5H13a1 1 0 0 1 0-2h2.5A4.5 4.5 0 0 0 20 9.5 8.5 8.5 0 0 0 12 3Z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
      <circle cx="7.5" cy="10" r="1.1" fill="currentColor" />
      <circle cx="10.5" cy="7.25" r="1.1" fill="currentColor" />
      <circle cx="14.25" cy="7.5" r="1.1" fill="currentColor" />
      <circle cx="16.5" cy="10.5" r="1.1" fill="currentColor" />
    </svg>
  );
}

function ThemeThumbnail({ theme, selected }: { theme: SiteTheme; selected: boolean }) {
  const { bg, surface, text, brand, border } = theme.preview;
  return (
    <div
      className={[
        "overflow-hidden rounded-sm border transition-shadow",
        selected ? "border-primary shadow-[0_0_0_1px_rgb(var(--color-primary))]" : "border-hairline",
      ].join(" ")}
      style={{ backgroundColor: bg }}
      aria-hidden
    >
      <div className="flex h-16 gap-1 p-1.5 sm:h-[4.5rem]">
        <div
          className="flex w-5 shrink-0 flex-col gap-1 rounded-[2px] p-1"
          style={{ backgroundColor: surface, border: `1px solid ${border}` }}
        >
          <span className="h-1 w-full rounded-full opacity-80" style={{ backgroundColor: brand }} />
          <span className="h-1 w-full rounded-full opacity-40" style={{ backgroundColor: text }} />
          <span className="h-1 w-3/4 rounded-full opacity-25" style={{ backgroundColor: text }} />
        </div>
        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <div
            className="flex h-3 items-center gap-0.5 rounded-[2px] px-1"
            style={{ backgroundColor: surface, border: `1px solid ${border}` }}
          >
            <span className="h-1 w-1 rounded-full" style={{ backgroundColor: brand }} />
            <span className="h-1 flex-1 rounded-full opacity-30" style={{ backgroundColor: text }} />
          </div>
          <div
            className="flex flex-1 flex-col justify-between rounded-[2px] p-1"
            style={{ backgroundColor: surface, border: `1px solid ${border}` }}
          >
            <div className="space-y-0.5">
              <span className="block h-1 w-4/5 rounded-full opacity-55" style={{ backgroundColor: text }} />
              <span className="block h-1 w-3/5 rounded-full opacity-30" style={{ backgroundColor: text }} />
            </div>
            <span
              className="mt-1 inline-flex h-2.5 w-8 items-center justify-center self-start rounded-[2px]"
              style={{ backgroundColor: brand }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function ThemePickerDialog({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [filter, setFilter] = useState<"all" | "dark" | "light">("all");
  const [activeIndex, setActiveIndex] = useState(0);
  const panelId = useId();
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentId = normalizeThemeId(resolvedTheme ?? theme);
  const current = getTheme(currentId);

  const visibleThemes = useMemo(() => {
    if (filter === "all") return SITE_THEMES;
    return SITE_THEMES.filter((t) => t.scheme === filter);
  }, [filter]);

  useEffect(() => {
    if (!open) return;
    const idx = visibleThemes.findIndex((t) => t.id === currentId);
    setActiveIndex(idx >= 0 ? idx : 0);
  }, [open, visibleThemes, currentId]);

  const pick = useCallback(
    (id: string) => {
      setTheme(id);
      onClose();
    },
    [onClose, setTheme],
  );

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key === "j" || event.key === "ArrowDown" || event.key === "ArrowRight") {
        event.preventDefault();
        setActiveIndex((i) => (i + 1) % visibleThemes.length);
        return;
      }
      if (event.key === "k" || event.key === "ArrowUp" || event.key === "ArrowLeft") {
        event.preventDefault();
        setActiveIndex((i) => (i - 1 + visibleThemes.length) % visibleThemes.length);
        return;
      }
      if (event.key === "Enter") {
        event.preventDefault();
        const next = visibleThemes[activeIndex];
        if (next) pick(next.id);
      }
    };
    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, onClose, visibleThemes, activeIndex, pick]);

  useEffect(() => {
    if (!open) return;
    const node = panelRef.current?.querySelector<HTMLElement>(`[data-theme-option="${activeIndex}"]`);
    node?.scrollIntoView({ block: "nearest" });
  }, [activeIndex, open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60]" role="presentation">
      <button type="button" className="absolute inset-0 bg-ink/50" aria-label="Close theme picker" onClick={onClose} />
      <div
        ref={panelRef}
        id={panelId}
        role="dialog"
        aria-modal="true"
        aria-label="Pick a theme"
        className="absolute left-1/2 top-[min(12vh,6rem)] flex max-h-[min(80vh,40rem)] w-[min(100%-1.5rem,36rem)] -translate-x-1/2 flex-col overflow-hidden rounded-md border border-hairline bg-surface shadow-[0_0_0_1px_rgb(var(--color-hairline-soft))]"
      >
        <div className="shrink-0 border-b border-hairline px-4 py-3">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-heading-sm text-ink">Pick a theme</p>
              <p className="mt-1 text-caption-md text-mute">
                {SITE_THEMES.length} Omarchy themes · press <span className="keycap">j</span> /{" "}
                <span className="keycap">k</span> to flip
              </p>
            </div>
            <button type="button" className="focus-ring btn-secondary h-8 px-2 text-caption-md" onClick={onClose}>
              Esc
            </button>
          </div>
          <div className="mt-3 flex gap-1" role="tablist" aria-label="Theme filter">
            {(
              [
                ["all", "All"],
                ["dark", "Dark"],
                ["light", "Light"],
              ] as const
            ).map(([id, label]) => (
              <button
                key={id}
                type="button"
                role="tab"
                aria-selected={filter === id}
                className={[
                  "focus-ring rounded-full px-2.5 py-1 text-caption-md transition-colors",
                  filter === id ? "bg-surface-elevated text-on-dark" : "text-mute hover:text-on-dark",
                ].join(" ")}
                onClick={() => setFilter(id)}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto p-3">
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {visibleThemes.map((themeOption, index) => {
              const selected = themeOption.id === currentId;
              const active = index === activeIndex;
              return (
                <button
                  key={themeOption.id}
                  type="button"
                  data-theme-option={index}
                  className={[
                    "focus-ring group rounded-sm p-1.5 text-left transition-colors",
                    active ? "bg-surface-elevated" : "hover:bg-surface-elevated/70",
                  ].join(" ")}
                  aria-pressed={selected}
                  onMouseEnter={() => setActiveIndex(index)}
                  onFocus={() => setActiveIndex(index)}
                  onClick={() => pick(themeOption.id)}
                >
                  <ThemeThumbnail theme={themeOption} selected={selected || active} />
                  <span className="mt-1.5 flex items-center justify-between gap-1 px-0.5">
                    <span className="truncate text-caption-md text-on-dark">{themeOption.name}</span>
                    {selected ? <span className="shrink-0 text-caption-sm text-primary">Active</span> : null}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="shrink-0 border-t border-hairline px-4 py-2 text-caption-sm text-mute">
          Current: <span className="text-on-dark">{mounted ? current.name : DEFAULT_THEME_ID}</span>
          {" · "}
          Themes match{" "}
          <a
            href="https://omarchy.org"
            target="_blank"
            rel="noopener noreferrer"
            className="link-inline text-caption-sm"
          >
            omarchy.org
          </a>
        </div>
      </div>
    </div>
  );
}

export function ThemeSwitcherProvider({ children }: { children: ReactNode }) {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const openPicker = useCallback(() => setOpen(true), []);
  const closePicker = useCallback(() => setOpen(false), []);

  useEffect(() => {
    const onOpen = () => setOpen(true);
    window.addEventListener("open-theme-switcher", onOpen);
    return () => window.removeEventListener("open-theme-switcher", onOpen);
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.altKey) return;
      if (event.key !== "t" && event.key !== "T") return;
      const target = event.target as HTMLElement | null;
      if (target) {
        const tag = target.tagName;
        if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT" || target.isContentEditable) return;
      }
      if (document.body.style.overflow === "hidden") return;
      event.preventDefault();
      setOpen(true);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    if (!mounted || !theme) return;
    if (theme === "light" || theme === "dark") {
      setTheme(normalizeThemeId(theme));
    }
  }, [mounted, theme, setTheme]);

  const value = useMemo(() => ({ openPicker }), [openPicker]);

  return (
    <ThemeSwitcherContext.Provider value={value}>
      {children}
      <ThemePickerDialog open={open} onClose={closePicker} />
    </ThemeSwitcherContext.Provider>
  );
}

export function ThemeSwitcher() {
  const { openPicker } = useThemeSwitcher();
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const current = getTheme(resolvedTheme ?? theme);

  return (
    <button
      type="button"
      className="focus-ring inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-sm text-on-dark hover:bg-surface-card"
      aria-label="Change website theme"
      title={mounted ? `Theme: ${current.name}` : "Change website theme"}
      onClick={openPicker}
    >
      <PaletteIcon className="h-4 w-4" />
    </button>
  );
}
