import type { ReactNode } from "react";
import { contact, profile, tiberPillars } from "@/app/content";
import { HeroPortraitWithNote } from "@/components/HeroPortraitWithNote";
import { HeroTypingLine } from "@/components/HeroTypingLine";
import { getThoughtBubbleSegments } from "@/lib/thought-bubble";

const orgsLine = "intelliGIS · unpaste.ai · Chatstat · SH1P · QUT TECH";

type ContactLink = {
  href: string;
  label: string;
  external?: boolean;
  icon: ReactNode;
};

function MailGlyph({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.75" />
      <path d="M4 7l8 6 8-6" stroke="currentColor" strokeWidth="1.75" strokeLinejoin="round" />
    </svg>
  );
}

function LinkedInGlyph({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.75" />
      <path d="M7 10v7M11 17v-4a2 2 0 0 1 4 0v4M11 10v7" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
      <circle cx="7" cy="7" r="1" fill="currentColor" />
    </svg>
  );
}

function GitHubGlyph({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.56-1.11-4.56-4.95 0-1.09.39-1.99 1.03-2.69-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02A9.56 9.56 0 0 1 12 6.8c.85 0 1.7.11 2.5.33 1.9-1.29 2.74-1.02 2.74-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.6 1.03 2.69 0 3.85-2.34 4.7-4.57 4.95.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" />
    </svg>
  );
}

function XGlyph({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M13.68 10.55 20.1 3h-1.52l-5.57 6.56L8.5 3H3.2l6.74 9.95L3.2 21h1.52l5.9-6.94L15.5 21h5.3l-7.12-10.45Zm-2.09 2.46-.68-.99L4.86 4.2h2.34l4.39 6.37.68.99 5.75 8.34h-2.34l-4.99-7.89Z" />
    </svg>
  );
}

function InstagramGlyph({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.75" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.75" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
    </svg>
  );
}

function EgoistGlyph({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="4" y="3" width="16" height="18" rx="2" stroke="currentColor" strokeWidth="1.75" />
      <circle cx="12" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.75" />
      <path d="M8 17c.8-1.6 2.2-2.4 4-2.4s3.2.8 4 2.4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
      <path d="M7 5.5h3" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
    </svg>
  );
}

const contactLinks: ContactLink[] = [
  { href: `mailto:${contact.email}`, label: "Email", icon: <MailGlyph className="h-4 w-4" /> },
  {
    href: contact.linkedin,
    label: "LinkedIn",
    external: true,
    icon: <LinkedInGlyph className="h-4 w-4" />,
  },
  {
    href: contact.github,
    label: "GitHub",
    external: true,
    icon: <GitHubGlyph className="h-4 w-4" />,
  },
  {
    href: contact.twitter,
    label: "X",
    external: true,
    icon: <XGlyph className="h-4 w-4" />,
  },
  {
    href: contact.instagram,
    label: "Instagram",
    external: true,
    icon: <InstagramGlyph className="h-4 w-4" />,
  },
  {
    href: contact.egoist,
    label: "Egoist Machines",
    external: true,
    icon: <EgoistGlyph className="h-4 w-4" />,
  },
];

/** Theme-aware hero: circular headshot + note bubble + typewriter + TIBER pills + contact icons. */
export function HeroBanner() {
  const thoughtBubble = getThoughtBubbleSegments();

  return (
    <div className="relative border-b border-hairline bg-canvas">
      {/* Soft theme field */}
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden opacity-70"
        aria-hidden
        style={{
          backgroundImage: `
            radial-gradient(circle at 1px 1px, rgb(var(--color-stipple) / calc(var(--color-stipple-alpha) * 1.4)) 1px, transparent 0),
            radial-gradient(ellipse 55% 70% at 88% 55%, rgb(var(--color-primary) / 0.14), transparent 70%),
            radial-gradient(ellipse 40% 50% at 12% 20%, rgb(var(--color-accent-blue) / 0.08), transparent 65%)
          `,
          backgroundSize: "18px 18px, auto, auto",
        }}
      />

      {/* Accent swooshes — follow brand / accent tokens */}
      <div
        className="pointer-events-none absolute -left-8 top-6 h-24 w-[55%] -rotate-[8deg] overflow-hidden opacity-80 sm:top-8"
        aria-hidden
        style={{
          background: `repeating-linear-gradient(
            90deg,
            transparent 0 14px,
            rgb(var(--color-accent-red) / 0.55) 14px 16px,
            transparent 16px 34px,
            rgb(var(--color-primary) / 0.45) 34px 36px
          )`,
          maskImage: "linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)",
          WebkitMaskImage: "linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)",
        }}
      />

      <div className="relative mx-auto flex max-w-content flex-col lg:min-h-[28rem] lg:flex-row lg:items-stretch">
        <div className="flex min-w-0 flex-1 flex-col justify-center px-gutter py-10 sm:py-12 lg:py-12">
          <p className="text-caption-md uppercase tracking-[0.18em] text-mute">{profile.pronouns}</p>
          <h1 className="mt-2 text-[clamp(3rem,9vw,5.75rem)] font-semibold leading-[0.95] tracking-tight text-ink">
            {profile.displayName}
          </h1>
          <HeroTypingLine />

          <ul className="mt-7 flex flex-wrap gap-2" aria-label="TIBER pillars">
            {tiberPillars.map((pillar) => (
              <li key={pillar.key}>
                <span
                  className="inline-flex items-center gap-2 rounded-full border border-accent-red px-2.5 py-1.5 text-caption-md text-on-dark"
                  title={pillar.desc}
                >
                  <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-accent-red text-[11px] font-semibold text-on-primary">
                    {pillar.key}
                  </span>
                  {pillar.label}
                </span>
              </li>
            ))}
          </ul>

          <nav className="mt-7 flex flex-wrap gap-2" aria-label="Contact links">
            {contactLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                className="focus-ring group inline-flex h-10 items-center gap-2 rounded-sm border border-hairline bg-surface px-3 text-body-sm-strong text-on-dark transition-colors hover:border-primary hover:text-primary"
                title={link.label}
              >
                <span className="text-mute transition-colors group-hover:text-primary">{link.icon}</span>
                <span className="hidden sm:inline">{link.label}</span>
                <span className="sr-only sm:hidden">{link.label}</span>
              </a>
            ))}
          </nav>

          <p className="mt-6 text-caption-sm uppercase tracking-[0.14em] text-mute">{orgsLine}</p>
        </div>

        <HeroPortraitWithNote
          segments={thoughtBubble}
          headshotSrc={profile.headshotSrc}
          alt={`${profile.displayName} headshot`}
        />
      </div>
    </div>
  );
}

