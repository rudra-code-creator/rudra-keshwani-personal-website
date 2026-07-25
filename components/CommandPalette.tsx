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
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { contact } from "@/app/content";
import { siteNavItems } from "@/lib/nav";

export type CommandBlogPost = {
  slug: string;
  title: string;
  description?: string;
};

type CommandItem = {
  id: string;
  label: string;
  sub?: string;
  group: "Navigate" | "Blog" | "Links" | "Actions";
  keywords?: string;
  run: () => void;
};

type CommandPaletteContextValue = {
  openPalette: () => void;
};

const CommandPaletteContext = createContext<CommandPaletteContextValue | null>(null);

export function useCommandPalette(): CommandPaletteContextValue {
  const ctx = useContext(CommandPaletteContext);
  if (!ctx) {
    throw new Error("useCommandPalette must be used within CommandPaletteProvider");
  }
  return ctx;
}

function matchesQuery(item: CommandItem, query: string): boolean {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  const haystack = `${item.label} ${item.sub ?? ""} ${item.keywords ?? ""} ${item.group}`.toLowerCase();
  return q.split(/\s+/).every((token) => haystack.includes(token));
}

function CommandPaletteDialog({
  open,
  onClose,
  blogPosts,
  showSpaceTip,
}: {
  open: boolean;
  onClose: () => void;
  blogPosts: CommandBlogPost[];
  showSpaceTip: boolean;
}) {
  const router = useRouter();
  const { resolvedTheme, setTheme } = useTheme();
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const titleId = useId();
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);

  const go = useCallback(
    (href: string) => {
      onClose();
      if (href.startsWith("mailto:")) {
        window.location.href = href;
        return;
      }
      if (href.startsWith("http://") || href.startsWith("https://")) {
        window.open(href, "_blank", "noopener,noreferrer");
        return;
      }
      router.push(href);
    },
    [onClose, router],
  );

  const items = useMemo<CommandItem[]>(() => {
    const navigate: CommandItem[] = siteNavItems.map((item) => ({
      id: `nav-${item.href}`,
      label: item.label,
      sub: item.href,
      group: "Navigate",
      keywords: "section page go",
      run: () => go(item.href),
    }));

    const blog: CommandItem[] = blogPosts.map((post) => ({
      id: `blog-${post.slug}`,
      label: post.title,
      sub: post.description || "Blog post",
      group: "Blog",
      keywords: "article writing post",
      run: () => go(`/blog/${post.slug}`),
    }));

    const links: CommandItem[] = [
      {
        id: "link-email",
        label: "Email Rudra",
        sub: contact.email,
        group: "Links",
        keywords: "contact mail",
        run: () => go(`mailto:${contact.email}`),
      },
      {
        id: "link-linkedin",
        label: "LinkedIn",
        sub: "Open profile",
        group: "Links",
        run: () => go(contact.linkedin),
      },
      {
        id: "link-github",
        label: "GitHub",
        sub: "rudra-code-creator",
        group: "Links",
        run: () => go(contact.github),
      },
      {
        id: "link-x",
        label: "X / Twitter",
        sub: "@rudrakesh123",
        group: "Links",
        run: () => go(contact.twitter),
      },
      {
        id: "link-instagram",
        label: "Instagram",
        sub: "ruu.kes.3",
        group: "Links",
        run: () => go(contact.instagram),
      },
      {
        id: "link-resume",
        label: "Resume PDF",
        sub: "View or download",
        group: "Links",
        keywords: "cv pdf",
        run: () => go("/resume.pdf"),
      },
    ];

    const actions: CommandItem[] = [
      {
        id: "action-theme",
        label: resolvedTheme === "dark" ? "Switch to light mode" : "Switch to dark mode",
        sub: "Appearance",
        group: "Actions",
        keywords: "theme dark light toggle",
        run: () => {
          setTheme(resolvedTheme === "dark" ? "light" : "dark");
          onClose();
        },
      },
    ];

    return [...navigate, ...blog, ...links, ...actions];
  }, [blogPosts, go, onClose, resolvedTheme, setTheme]);

  const filtered = useMemo(
    () => items.filter((item) => matchesQuery(item, query)),
    [items, query],
  );

  useEffect(() => {
    if (!open) return;
    setQuery("");
    setActiveIndex(0);
    const frame = window.requestAnimationFrame(() => inputRef.current?.focus());
    return () => window.cancelAnimationFrame(frame);
  }, [open]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const active = listRef.current?.querySelector<HTMLElement>("[data-active='true']");
    active?.scrollIntoView({ block: "nearest" });
  }, [activeIndex, open, filtered]);

  const onKeyDown = (event: ReactKeyboardEvent) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((index) => (filtered.length === 0 ? 0 : (index + 1) % filtered.length));
      return;
    }
    if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((index) =>
        filtered.length === 0 ? 0 : (index - 1 + filtered.length) % filtered.length,
      );
      return;
    }
    if (event.key === "Enter") {
      event.preventDefault();
      filtered[activeIndex]?.run();
      return;
    }
    if (event.key === "Escape") {
      event.preventDefault();
      onClose();
    }
  };

  if (!open) return null;

  const groups = filtered.reduce<
    { group: CommandItem["group"]; items: { item: CommandItem; index: number }[] }[]
  >((acc, item, index) => {
    const last = acc[acc.length - 1];
    if (last && last.group === item.group) {
      last.items.push({ item, index });
    } else {
      acc.push({ group: item.group, items: [{ item, index }] });
    }
    return acc;
  }, []);

  return (
    <div className="fixed inset-0 z-[60] flex items-start justify-center px-4 pt-[12vh] sm:pt-[15vh]">
      <button
        type="button"
        className="absolute inset-0 bg-ink/40"
        aria-label="Close command palette"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative z-10 flex w-full max-w-xl flex-col overflow-hidden rounded-xl border border-hairline bg-surface shadow-none"
        onKeyDown={onKeyDown}
      >
        <div className="flex items-center gap-2 border-b border-hairline px-3 py-2.5">
          <span className="h-2.5 w-2.5 rounded-full bg-accent-red" aria-hidden />
          <span className="h-2.5 w-2.5 rounded-full bg-accent-yellow" aria-hidden />
          <span className="h-2.5 w-2.5 rounded-full bg-accent-green" aria-hidden />
          <p id={titleId} className="ml-2 text-caption-sm text-on-dark-mute">
            rudra — command palette
          </p>
        </div>

        {showSpaceTip ? (
          <div className="border-b border-hairline bg-accent-blue-soft px-4 py-3 text-body-sm text-on-dark">
            Welcome — search anything on the site from here. Press{" "}
            <span className="keycap mx-0.5">Space</span> anytime to open this again.
          </div>
        ) : null}

        <div className="border-b border-hairline bg-surface-elevated p-3">
          <div className="flex h-11 items-center gap-2 rounded-md border border-hairline bg-surface-card px-3">
            <span className="keycap shrink-0" aria-hidden>
              Space
            </span>
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search pages, posts, links…"
              className="h-full w-full bg-transparent text-body-md text-on-dark outline-none placeholder:text-mute"
              aria-autocomplete="list"
              aria-controls="command-palette-results"
              autoComplete="off"
              spellCheck={false}
            />
          </div>
        </div>

        <div
          id="command-palette-results"
          ref={listRef}
          role="listbox"
          className="max-h-[min(50vh,360px)] overflow-y-auto p-2"
        >
          {filtered.length === 0 ? (
            <p className="px-3 py-8 text-center text-body-sm text-mute">No results for “{query}”</p>
          ) : (
            groups.map(({ group, items: groupItems }) => (
              <div key={group}>
                <p className="px-2.5 pb-1 pt-2 text-caption-sm text-mute first:pt-1">{group}</p>
                {groupItems.map(({ item, index }) => {
                  const active = index === activeIndex;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      role="option"
                      aria-selected={active}
                      data-active={active ? "true" : "false"}
                      className={[
                        "flex w-full items-center gap-3 rounded-sm px-2.5 py-2 text-left transition-colors",
                        active
                          ? "bg-surface-card text-on-dark"
                          : "text-on-dark-mute hover:bg-surface-card/60",
                      ].join(" ")}
                      onMouseEnter={() => setActiveIndex(index)}
                      onClick={() => item.run()}
                    >
                      <div className="min-w-0 flex-1">
                        <p className={active ? "text-body-md text-on-dark" : "text-body-md text-body"}>
                          {item.label}
                        </p>
                        {item.sub ? (
                          <p className="truncate text-caption-md text-mute">{item.sub}</p>
                        ) : null}
                      </div>
                      {active ? (
                        <span className="keycap shrink-0" aria-hidden>
                          ↵
                        </span>
                      ) : null}
                    </button>
                  );
                })}
              </div>
            ))
          )}
        </div>

        <div className="flex flex-wrap items-center justify-end gap-2 border-t border-hairline px-3 py-2 text-caption-sm text-on-dark-mute">
          <span className="keycap">↑↓</span>
          <span>navigate</span>
          <span className="keycap">↵</span>
          <span>open</span>
          <span className="keycap">esc</span>
          <span>close</span>
          <span className="keycap">Space</span>
          <span>open again</span>
        </div>
      </div>
    </div>
  );
}

const SESSION_INTRO_KEY = "rudra-command-palette-session-intro";

function isTypingTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;
  if (target.isContentEditable) return true;
  const tag = target.tagName;
  return tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT";
}

function shouldOpenWithSpace(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return true;
  if (isTypingTarget(target)) return false;
  // Space activates focused buttons/links — don't steal those
  return !target.closest(
    "button, a, input, textarea, select, [contenteditable='true'], [role='button'], [role='menuitem'], [role='option'], [role='checkbox'], [role='switch']",
  );
}

export function CommandPaletteProvider({
  children,
  blogPosts,
}: {
  children: React.ReactNode;
  blogPosts: CommandBlogPost[];
}) {
  const [open, setOpen] = useState(false);
  const [showSpaceTip, setShowSpaceTip] = useState(false);

  const openPalette = useCallback(() => setOpen(true), []);
  const closePalette = useCallback(() => {
    setOpen(false);
    setShowSpaceTip(false);
  }, []);

  useEffect(() => {
    try {
      if (sessionStorage.getItem(SESSION_INTRO_KEY)) return;
      sessionStorage.setItem(SESSION_INTRO_KEY, "1");
      setShowSpaceTip(true);
      setOpen(true);
    } catch {
      setShowSpaceTip(true);
      setOpen(true);
    }
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== " " && event.code !== "Space") return;
      if (event.metaKey || event.ctrlKey || event.altKey) return;
      if (open) return;
      if (!shouldOpenWithSpace(event.target)) return;

      event.preventDefault();
      setOpen(true);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const value = useMemo(() => ({ openPalette }), [openPalette]);

  return (
    <CommandPaletteContext.Provider value={value}>
      {children}
      <CommandPaletteDialog
        open={open}
        onClose={closePalette}
        blogPosts={blogPosts}
        showSpaceTip={showSpaceTip}
      />
    </CommandPaletteContext.Provider>
  );
}

export function CommandPaletteTrigger({
  className,
  compact = false,
}: {
  className?: string;
  compact?: boolean;
}) {
  const { openPalette } = useCommandPalette();

  if (compact) {
    return (
      <button
        type="button"
        onClick={openPalette}
        className={
          className ??
          "focus-ring inline-flex h-9 items-center gap-1 rounded-md border border-hairline bg-surface-elevated px-2 text-mute hover:text-body"
        }
        aria-label="Open command palette (Space)"
        title="Press Space to search"
      >
        <span className="keycap">Space</span>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={openPalette}
      className={
        className ??
        "focus-ring flex h-9 w-full items-center gap-2 rounded-md border border-hairline bg-surface-elevated px-3 text-left text-body-sm text-mute hover:border-hairline-strong hover:text-body"
      }
      aria-label="Open command palette (Space)"
      title="Press Space to search"
    >
      <span className="flex-1 truncate">Search…</span>
      <span className="keycap">Space</span>
    </button>
  );
}
