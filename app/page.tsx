import type { ReactNode } from "react";
import Link from "next/link";
import { CommandPaletteMockup } from "@/components/CommandPaletteMockup";
import { HeroStripes } from "@/components/HeroStripes";
import {
  aboutParagraphs,
  contact,
  education,
  experience,
  profile,
  tiberPillars,
  topSkills,
  volunteerNote,
} from "./content";
import {
  lifeChecklistDoneCount,
  lifeChecklistRemainingCount,
  lifeChecklistTotalCount,
} from "./life-checklist-data";

const navItems = [
  ["profile", "Profile"],
  ["about", "About"],
  ["tiber", "TIBER"],
  ["experience", "Experience"],
  ["education", "Education"],
  ["skills", "Skills"],
  ["resume", "Resume"],
  ["life-checklist", "Life"],
  ["connect", "Contact"],
] as const;

function SectionTitle({ id, children }: { id?: string; children: ReactNode }) {
  return (
    <h2 id={id} className="text-heading-lg text-ink">
      {children}
    </h2>
  );
}

export default function Home() {
  return (
    <div className="min-h-dvh bg-canvas">
      <header className="sticky top-0 z-40 border-b border-hairline bg-canvas/95 backdrop-blur-sm">
        <div className="mx-auto flex h-14 max-w-content items-center justify-between gap-4 px-6 lg:px-12">
          <Link href="#profile" className="focus-ring rounded-md text-heading-sm text-on-dark">
            Rudra
          </Link>
          <nav
            className="flex max-w-[min(100%,520px)] flex-1 flex-wrap items-center justify-center gap-x-4 gap-y-1 text-caption-sm md:max-w-none md:gap-x-6 md:text-body-sm-strong"
            aria-label="Primary"
          >
            {navItems.map(([id, label]) => (
              <Link
                key={id}
                href={`#${id}`}
                className="focus-ring rounded-md text-on-dark-mute hover:text-on-dark"
              >
                {label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <Link
              href={contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="focus-ring btn-secondary hidden sm:inline-flex"
            >
              LinkedIn
            </Link>
            <Link href={`mailto:${contact.email}`} className="focus-ring btn-primary shrink-0">
              Email
            </Link>
          </div>
        </div>
      </header>

      <main>
        {/* Hero band: stripe + two-column (Raycast home layout) */}
        <section id="profile" className="relative overflow-hidden bg-canvas">
          <HeroStripes />
          <div className="relative z-10 mx-auto grid max-w-content gap-12 px-6 pb-16 pt-10 lg:grid-cols-[1fr_minmax(320px,480px)] lg:gap-16 lg:px-12 lg:pb-section lg:pt-section">
            <div className="min-w-0">
              <div className="flex flex-wrap gap-2">
                <span className="rounded-xs bg-surface-elevated px-1.5 py-0.5 text-caption-sm text-on-dark-mute">
                  LinkedIn verified
                </span>
                <span className="rounded-xs bg-accent-blue-soft px-2 py-0.5 text-caption-sm text-accent-blue">
                  Open to work
                </span>
              </div>

              <h1 className="mt-8 text-[36px] font-semibold leading-[1.1] tracking-tight text-ink sm:text-[44px] md:text-[56px] lg:text-display-xl">
                {profile.displayName}
              </h1>
              <p className="mt-3 text-heading-md text-on-dark">{profile.tagline}</p>
              <p className="mt-3 text-body-sm text-on-dark-mute">
                {profile.pronouns} · {profile.age} · {profile.location} · {profile.connections}{" "}
                connections
              </p>

              <p className="mt-8 text-body-lg text-body">{profile.scrollHook}</p>

              <div className="mt-6 rounded-lg border border-hairline bg-surface p-6">
                <p className="text-body-md text-body">{profile.headline}</p>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="#connect" className="focus-ring btn-primary">
                  Get in touch
                </Link>
                <Link href="#about" className="focus-ring btn-tertiary">
                  About
                </Link>
              </div>

              <div className="mt-10 rounded-lg border border-hairline bg-surface-elevated p-5">
                <p className="text-body-sm-strong text-on-dark">Work arrangement</p>
                <p className="mt-1 text-body-sm text-on-dark-mute">{profile.openToWork}</p>
              </div>

              <p className="mt-8 text-caption-md text-mute">{volunteerNote}</p>
            </div>

            <div className="lg:pt-4">
              <CommandPaletteMockup />
            </div>
          </div>
        </section>

        <section id="about" aria-labelledby="about-heading" className="bg-canvas px-6 py-12 md:py-16 lg:px-12 lg:py-section">
          <div className="mx-auto max-w-content rounded-lg border border-hairline bg-surface p-6 lg:p-8">
            <SectionTitle id="about-heading">
              About
            </SectionTitle>
            <div className="mt-8 space-y-6 text-body-md text-body">
              {aboutParagraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
        </section>

        <section id="tiber" aria-labelledby="tiber-heading" className="bg-canvas px-6 py-12 md:py-16 lg:px-12 lg:py-section">
          <div className="mx-auto max-w-content rounded-lg border border-hairline bg-surface-elevated p-6 lg:p-8">
            <SectionTitle id="tiber-heading">
              TIBER framework
            </SectionTitle>
            <ul className="mt-8 space-y-4">
              {tiberPillars.map((item) => (
                <li
                  key={item.key}
                  className="rounded-md border border-hairline bg-surface px-4 py-4 text-body-md text-body"
                >
                  <span className="font-medium text-on-dark">{item.label}</span>
                  <span className="text-on-dark-mute"> — </span>
                  {item.desc}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="experience" aria-labelledby="exp-heading" className="bg-canvas px-6 py-12 md:py-16 lg:px-12 lg:py-section">
          <div className="mx-auto max-w-content">
            <SectionTitle id="exp-heading">
              Experience
            </SectionTitle>
            <div className="mt-10 grid gap-4 md:grid-cols-2">
              {experience.map((job) => (
                <article
                  key={`${job.org}-${job.title}`}
                  className="flex gap-4 rounded-md border border-hairline bg-surface p-4"
                >
                  <div
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-surface-card text-caption-sm text-mute"
                    aria-hidden
                  >
                    ◆
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-heading-sm text-on-dark">{job.title}</h3>
                    <p className="text-body-sm-strong text-body">{job.org}</p>
                    <p className="mt-1 text-caption-md text-mute">
                      {job.type} · {job.date} · {job.place}
                    </p>
                    <p className="mt-3 text-body-sm text-body">{job.summary}</p>
                    {job.skills ? (
                      <p className="mt-2 text-caption-sm text-stone">{job.skills}</p>
                    ) : null}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="education" aria-labelledby="edu-heading" className="bg-canvas px-6 py-12 md:py-16 lg:px-12 lg:py-section">
          <div className="mx-auto max-w-content rounded-lg border border-hairline bg-surface p-6 lg:p-8">
            <SectionTitle id="edu-heading">
              Education & certifications
            </SectionTitle>
            <ul className="mt-8 space-y-6">
              {education.map((ed) => (
                <li key={ed.school + ed.date} className="border-t border-hairline pt-6 first:border-t-0 first:pt-0">
                  <p className="text-heading-sm text-on-dark">{ed.school}</p>
                  <p className="mt-2 text-body-md text-body">{ed.detail}</p>
                  <p className="mt-1 text-caption-md text-mute">{ed.date}</p>
                  {ed.extra ? <p className="mt-2 text-caption-sm text-stone">{ed.extra}</p> : null}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="skills" aria-labelledby="skills-heading" className="bg-canvas px-6 py-12 md:py-16 lg:px-12 lg:py-section">
          <div className="mx-auto max-w-content">
            <SectionTitle id="skills-heading">
              Top skills
            </SectionTitle>
            <p className="mt-8 max-w-3xl text-body-lg text-body">{topSkills}</p>
            <p className="mt-6 text-body-md text-mute">
              Full skills list (44+) on{" "}
              <a
                href={contact.linkedin}
                className="link-inline font-medium"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
              .
            </p>
          </div>
        </section>

        <section id="resume" aria-labelledby="resume-heading" className="bg-canvas px-6 py-12 md:py-16 lg:px-12 lg:py-section">
          <div className="mx-auto max-w-content rounded-lg border border-hairline bg-surface p-6 lg:p-8">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <SectionTitle id="resume-heading">
                Resume
              </SectionTitle>
              <a href="/resume.pdf" className="focus-ring btn-primary" download>
                Download PDF
              </a>
            </div>
            <p className="mt-3 text-body-sm text-mute">
              Inline preview below. If it does not load in your browser, use the download button.
            </p>
            <div className="mt-6 overflow-hidden rounded-md border border-hairline">
              <iframe
                src="/resume.pdf"
                title="Rudra Keshwani resume"
                className="h-[70vh] w-full bg-canvas"
              />
            </div>
          </div>
        </section>

        <section
          id="life-checklist"
          aria-labelledby="life-heading"
          className="bg-canvas px-6 py-12 md:py-16 lg:px-12 lg:py-section"
        >
          <div className="mx-auto max-w-content rounded-lg border border-hairline bg-surface p-6 lg:p-8">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <SectionTitle id="life-heading">Life Checklist</SectionTitle>
              <Link href="/life-checklist" className="focus-ring btn-primary">
                See full checklist
              </Link>
            </div>
            <p className="mt-4 text-body-md text-body">
              What I&apos;ve checked off so far — school, building, and the early founder path. On
              the full page you can browse my list and complete your own on{" "}
              <a
                href="https://neal.fun/life-checklist/"
                className="link-inline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Neal.fun
              </a>
              .
            </p>
            <p className="mt-6 text-caption-md text-mute">
              {lifeChecklistDoneCount} of {lifeChecklistTotalCount} checked · {lifeChecklistRemainingCount}{" "}
              still to go · full list + Neal.fun embed on the dedicated page.
            </p>
          </div>
        </section>

        <section id="connect" aria-labelledby="connect-heading" className="bg-canvas px-6 pb-section pt-12 md:pb-section md:pt-16 lg:px-12">
          <div className="mx-auto max-w-content rounded-lg border border-hairline-strong bg-surface-elevated p-8 lg:p-10">
            <SectionTitle id="connect-heading">
              Contact
            </SectionTitle>
            <p className="mt-6 text-body-lg text-body">{contact.closing}</p>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <a href={`mailto:${contact.email}`} className="focus-ring btn-primary justify-center">
                Email
              </a>
              <a
                href={contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="focus-ring install-btn justify-center"
              >
                LinkedIn
              </a>
              <a
                href={contact.github}
                target="_blank"
                rel="noopener noreferrer"
                className="focus-ring install-btn justify-center"
              >
                GitHub
              </a>
              <a
                href={contact.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="focus-ring install-btn justify-center"
              >
                X
              </a>
            </div>
            <p className="mt-8 text-caption-md text-mute">{contact.email}</p>
          </div>
        </section>
      </main>

      <footer className="relative border-t border-hairline bg-canvas">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-hero-stripe-start/50 to-transparent"
          aria-hidden
        />
        <div className="mx-auto max-w-content px-6 py-16 lg:px-12">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <p className="text-body-sm-strong text-on-dark">Links</p>
              <ul className="mt-4 space-y-3 text-body-sm text-body">
                <li>
                  <a href={contact.linkedin} className="link-footer" target="_blank" rel="noopener noreferrer">
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a href={contact.github} className="link-footer" target="_blank" rel="noopener noreferrer">
                    GitHub
                  </a>
                </li>
                <li>
                  <a href={contact.twitter} className="link-footer" target="_blank" rel="noopener noreferrer">
                    X (Twitter)
                  </a>
                </li>
                <li>
                  <a href={`mailto:${contact.email}`} className="link-footer">
                    Email
                  </a>
                </li>
              </ul>
            </div>
            <div className="lg:col-span-3">
              <p className="text-body-sm-strong text-on-dark">Colophon</p>
              <p className="mt-4 text-body-sm text-mute">
                personal site of Rudra Keshwani styled after the Raycast design language: continuous dark canvas,
                Inter + ss03, hairline borders, white primary actions, command-palette metaphor.
              </p>
            </div>
          </div>
          <div className="mt-12 flex flex-col gap-4 border-t border-hairline pt-10 text-caption-sm text-mute sm:flex-row sm:items-center sm:justify-between">
            <p>© {new Date().getFullYear()} Rudra Keshwani</p>
            <p>
              Built with Next.js ·{" "}
              <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="link-footer">
                Vercel
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
