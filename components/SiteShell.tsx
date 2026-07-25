"use client";

import { useCallback, useEffect, useId, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CommandPaletteTrigger } from "@/components/CommandPalette";
import { ThemeToggle } from "@/components/ThemeToggle";
import { contact, profile } from "@/app/content";
import { isNavItemActive, siteNavItems } from "@/lib/nav";

function MenuIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
    </svg>
  );
}

function CloseIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
    </svg>
  );
}

function SidebarIdentity({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <div className="flex shrink-0 flex-col items-center gap-3 border-b border-hairline px-4 py-5">
      <Link href="/#profile" onClick={onNavigate} className="focus-ring rounded-full">
        <Image
          src={profile.headshotSrc}
          alt={`${profile.displayName} headshot`}
          width={112}
          height={112}
          className="h-28 w-28 rounded-full border border-hairline object-cover"
          priority
        />
      </Link>
      <div className="flex w-full items-center justify-between gap-2">
        <Link
          href="/#profile"
          onClick={onNavigate}
          className="focus-ring min-w-0 rounded-md text-heading-sm text-on-dark"
        >
          Rudra
        </Link>
        <ThemeToggle />
      </div>
    </div>
  );
}

function SidebarNav({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();

  return (
    <nav className="flex flex-1 flex-col gap-0.5 overflow-y-auto px-3 py-4" aria-label="Primary">
      {siteNavItems.map(({ href, label }) => {
        const active = isNavItemActive(pathname, href);
        return (
          <Link
            key={href}
            href={href}
            onClick={onNavigate}
            className={[
              "focus-ring rounded-md px-3 py-2 text-body-sm-strong transition-colors",
              active
                ? "bg-surface-card text-on-dark"
                : "text-on-dark-mute hover:bg-surface-card/60 hover:text-on-dark",
            ].join(" ")}
            aria-current={active ? "page" : undefined}
          >
            {label}
          </Link>
        );
      })}
    </nav>
  );
}

function SidebarActions({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <div className="mt-auto shrink-0 space-y-2 border-t border-hairline p-3">
      <Link
        href={contact.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onNavigate}
        className="focus-ring btn-secondary w-full"
      >
        LinkedIn
      </Link>
      <Link href={`mailto:${contact.email}`} onClick={onNavigate} className="focus-ring btn-primary w-full">
        Email
      </Link>
    </div>
  );
}

export function SiteShell({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const panelId = useId();

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, close]);

  return (
    <div className="min-h-dvh bg-canvas">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-56 flex-col border-r border-hairline bg-canvas lg:flex">
        <SidebarIdentity />
        <div className="shrink-0 border-b border-hairline px-3 py-3">
          <CommandPaletteTrigger />
        </div>
        <SidebarNav />
        <SidebarActions />
      </aside>

      <header className="sticky top-0 z-40 flex h-14 items-center justify-between gap-3 border-b border-hairline bg-canvas/95 px-gutter backdrop-blur-sm lg:hidden">
        <button
          type="button"
          className="focus-ring inline-flex h-9 w-9 items-center justify-center rounded-md text-on-dark hover:bg-surface-card"
          aria-expanded={open}
          aria-controls={panelId}
          aria-label="Open navigation"
          onClick={() => setOpen(true)}
        >
          <MenuIcon className="h-5 w-5" />
        </button>
        <Link href="/#profile" className="focus-ring flex items-center gap-2 rounded-md">
          <Image
            src={profile.headshotSrc}
            alt=""
            width={28}
            height={28}
            className="h-7 w-7 rounded-full border border-hairline object-cover"
          />
          <span className="text-heading-sm text-on-dark">Rudra</span>
        </Link>
        <div className="flex items-center gap-1">
          <CommandPaletteTrigger compact />
          <ThemeToggle />
        </div>
      </header>

      {open ? (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="Site navigation">
          <button
            type="button"
            className="absolute inset-0 bg-ink/40"
            aria-label="Close navigation"
            onClick={close}
          />
          <aside
            id={panelId}
            className="absolute inset-y-0 left-0 flex w-[min(100%,16rem)] flex-col border-r border-hairline bg-canvas"
          >
            <div className="flex h-14 shrink-0 items-center justify-between border-b border-hairline px-4">
              <p className="text-heading-sm text-on-dark">Menu</p>
              <button
                type="button"
                className="focus-ring inline-flex h-9 w-9 items-center justify-center rounded-md text-on-dark hover:bg-surface-card"
                aria-label="Close navigation"
                onClick={close}
              >
                <CloseIcon className="h-5 w-5" />
              </button>
            </div>
            <SidebarIdentity onNavigate={close} />
            <div className="shrink-0 border-b border-hairline px-3 py-3">
              <CommandPaletteTrigger />
            </div>
            <SidebarNav onNavigate={close} />
            <SidebarActions onNavigate={close} />
          </aside>
        </div>
      ) : null}

      <div className="lg:pl-56">{children}</div>
    </div>
  );
}
