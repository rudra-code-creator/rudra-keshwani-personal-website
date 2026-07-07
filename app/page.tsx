import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { ProfileIdentity } from "@/components/ProfileIdentity";
import { FeaturedLinkedInPostsCarousel } from "@/components/FeaturedLinkedInPostsCarousel";
import {
  BriefcaseIcon,
  ChecklistIcon,
  CompassIcon,
  DocumentIcon,
  GraduationIcon,
  LinkedInIcon,
  MailIcon,
  PenIcon,
  QuizIcon,
  RocketIcon,
  SparklesIcon,
  UserIcon,
  UsersIcon,
} from "@/components/SectionIcons";
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
import { getFeaturedLinkedInPosts } from "./featured-linkedin-posts-data";
import { popQuizQuestionCount } from "./pop-quiz-data";
import { formatPostDate, getAllPosts } from "@/lib/blog";

const navItems = [
  { label: "Profile", href: "#profile" },
  { label: "About", href: "#about" },
  { label: "TIBER", href: "#tiber" },
  { label: "Experience", href: "#experience" },
  { label: "Education", href: "#education" },
  { label: "Skills", href: "#skills" },
  { label: "Resume", href: "#resume" },
  { label: "Posts", href: "#featured-posts" },
  { label: "Life", href: "#life-checklist" },
  { label: "Quiz", href: "#pop-quiz" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "#connect" },
] as const;

function SectionTitle({
  id,
  icon,
  children,
}: {
  id?: string;
  icon?: ReactNode;
  children: ReactNode;
}) {
  return (
    <h2 id={id} className="flex items-center gap-2.5 text-heading-lg text-ink">
      {icon ? (
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-hairline bg-surface-card text-accent-blue">
          {icon}
        </span>
      ) : null}
      <span>{children}</span>
    </h2>
  );
}

function SubHeading({ icon, children }: { icon: ReactNode; children: ReactNode }) {
  return (
    <h3 className="flex items-center gap-2 text-heading-sm text-on-dark">
      <span className="text-accent-blue">{icon}</span>
      <span>{children}</span>
    </h3>
  );
}

export default function Home() {
  const latestPosts = getAllPosts().slice(0, 3);
  const featuredPosts = getFeaturedLinkedInPosts();
  const founderExperience = experience.filter((job) => job.org === "intelliGIS" || job.org === "unpaste.ai");
  const otherExperience = experience.filter((job) => job.org !== "intelliGIS" && job.org !== "unpaste.ai");

  return (
    <div className="min-h-dvh bg-canvas">
      <header className="sticky top-0 z-40 border-b border-hairline bg-canvas/95 backdrop-blur-sm">
        <div className="mx-auto flex h-14 max-w-content items-center justify-between gap-4 px-gutter">
          <Link href="#profile" className="focus-ring rounded-md text-heading-sm text-on-dark">
            Rudra
          </Link>
          <nav
            className="flex max-w-[min(100%,520px)] flex-1 flex-wrap items-center justify-center gap-x-4 gap-y-1 text-caption-sm md:max-w-none md:gap-x-6 md:text-body-sm-strong"
            aria-label="Primary"
          >
            {navItems.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
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
        {/* Hero cover + profile / about split */}
        <section id="profile" className="relative overflow-hidden bg-canvas">
          <div className="relative h-52 w-full sm:h-64 md:h-72 lg:h-80 xl:h-96">
            <Image
              src={profile.heroCoverSrc}
              alt="Panoramic aerial view of a planned city along a winding river"
              fill
              className="object-cover object-center"
              priority
              sizes="100vw"
            />
          </div>

          <div className="relative z-10 mx-auto grid max-w-content gap-12 px-gutter pb-4 pt-1.5 lg:grid-cols-2 lg:gap-16 lg:pb-section lg:pt-2">
            <div className="min-w-0">
              <ProfileIdentity
                headshotSrc={profile.headshotSrc}
                displayName={profile.displayName}
                tagline={profile.tagline}
                metaLine={`${profile.pronouns} · ${profile.age} · ${profile.location} · ${profile.connections} connections`}
                scrollHook={profile.scrollHook}
              />

              <div className="mt-6 rounded-lg border border-hairline bg-surface p-6">
                <p className="text-body-md text-body">{profile.headline}</p>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <a href={`mailto:${contact.email}`} className="focus-ring btn-primary">
                  Email
                </a>
                <a
                  href={contact.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="focus-ring install-btn"
                >
                  LinkedIn
                </a>
                <a
                  href={contact.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="focus-ring install-btn"
                >
                  GitHub
                </a>
                <a
                  href={contact.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="focus-ring install-btn"
                >
                  X
                </a>
                <a
                  href={contact.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="focus-ring install-btn"
                >
                  Instagram
                </a>
              </div>

              <div className="mt-10 rounded-lg border border-hairline bg-surface-elevated p-5">
                <p className="text-body-sm-strong text-on-dark">Work arrangement</p>
                <p className="mt-1 text-body-sm text-on-dark-mute">{profile.openToWork}</p>
              </div>

              <p className="mt-8 text-caption-md text-mute">{volunteerNote}</p>
            </div>

            <div
              id="about"
              aria-labelledby="about-heading"
              className="min-w-0 rounded-lg border border-hairline bg-surface p-6 lg:p-8"
            >
              <SectionTitle id="about-heading" icon={<UserIcon width={18} height={18} />}>
                About
              </SectionTitle>
              <div className="mt-8 space-y-6 text-body-md text-body">
                {aboutParagraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="tiber" aria-labelledby="tiber-heading" className="bg-canvas section-y">
          <div className="mx-auto max-w-content px-gutter rounded-lg border border-hairline bg-surface-elevated p-6 lg:p-8">
            <SectionTitle id="tiber-heading" icon={<CompassIcon width={18} height={18} />}>
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

        <section id="experience" aria-labelledby="exp-heading" className="bg-canvas section-y">
          <div className="mx-auto max-w-content px-gutter">
            <SectionTitle id="exp-heading" icon={<BriefcaseIcon width={18} height={18} />}>
              Experience
            </SectionTitle>
            <div className="mt-8">
              <SubHeading icon={<RocketIcon width={16} height={16} />}>Founder roles</SubHeading>
            </div>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              {founderExperience.map((job) => (
                <article
                  key={`${job.org}-${job.title}`}
                  className="flex gap-4 rounded-md border border-hairline bg-surface p-4"
                >
                  <div
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-surface-card text-caption-sm text-mute"
                    aria-hidden
                  >
                    {job.logoSrc ? (
                      <Image
                        src={job.logoSrc}
                        alt={`${job.org} logo`}
                        width={36}
                        height={36}
                        className="h-9 w-9 rounded-sm object-contain"
                      />
                    ) : (
                      "◆"
                    )}
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

            <div className="mt-10">
              <SubHeading icon={<UsersIcon width={16} height={16} />}>Other roles</SubHeading>
            </div>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              {otherExperience.map((job) => (
                <article
                  key={`${job.org}-${job.title}`}
                  className="flex gap-4 rounded-md border border-hairline bg-surface p-4"
                >
                  <div
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-surface-card text-caption-sm text-mute"
                    aria-hidden
                  >
                    {job.logoSrc ? (
                      <Image
                        src={job.logoSrc}
                        alt={`${job.org} logo`}
                        width={36}
                        height={36}
                        className="h-9 w-9 rounded-sm object-contain"
                      />
                    ) : (
                      "◆"
                    )}
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

        <section id="education" aria-labelledby="edu-heading" className="bg-canvas section-y">
          <div className="mx-auto max-w-content px-gutter rounded-lg border border-hairline bg-surface p-6 lg:p-8">
            <SectionTitle id="edu-heading" icon={<GraduationIcon width={18} height={18} />}>
              Education & certifications
            </SectionTitle>
            <ul className="mt-8 space-y-6">
              {education.map((ed) => (
                <li key={ed.school + ed.date} className="border-t border-hairline pt-6 first:border-t-0 first:pt-0">
                  <div className="flex gap-4">
                    <div
                      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-surface-card text-caption-sm text-mute"
                      aria-hidden
                    >
                      {ed.logoSrc ? (
                        <Image
                          src={ed.logoSrc}
                          alt={`${ed.school} logo`}
                          width={36}
                          height={36}
                          className="h-9 w-9 rounded-sm object-contain"
                        />
                      ) : (
                        "◆"
                      )}
                    </div>
                    <div className="min-w-0">
                      <p className="text-heading-sm text-on-dark">{ed.school}</p>
                      <p className="mt-2 text-body-md text-body">{ed.detail}</p>
                      <p className="mt-1 text-caption-md text-mute">{ed.date}</p>
                      {ed.extra ? <p className="mt-2 text-caption-sm text-stone">{ed.extra}</p> : null}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="skills" aria-labelledby="skills-heading" className="bg-canvas section-y">
          <div className="mx-auto max-w-content px-gutter">
            <SectionTitle id="skills-heading" icon={<SparklesIcon width={18} height={18} />}>
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

        <section id="resume" aria-labelledby="resume-heading" className="bg-canvas section-y">
          <div className="mx-auto max-w-content px-gutter rounded-lg border border-hairline bg-surface p-6 lg:p-8">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <SectionTitle id="resume-heading" icon={<DocumentIcon width={18} height={18} />}>
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
          id="featured-posts"
          aria-labelledby="featured-posts-heading"
          className="bg-canvas section-y"
        >
          <div className="w-full px-gutter">
            <div className="rounded-lg border border-hairline bg-surface-elevated py-6 lg:py-8">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <SectionTitle id="featured-posts-heading" icon={<LinkedInIcon width={18} height={18} />}>
                  Featured LinkedIn posts
                </SectionTitle>
                <a
                  href={contact.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="focus-ring btn-tertiary"
                >
                  View profile
                </a>
              </div>
              <p className="mt-4 max-w-2xl text-body-md text-body">
                A few posts I&apos;m proud of — building, TIBER, and the founder path.
              </p>

              {featuredPosts.length > 0 ? (
                <FeaturedLinkedInPostsCarousel posts={featuredPosts} />
              ) : (
                <p className="mt-8 rounded-md border border-dashed border-hairline bg-surface px-4 py-8 text-center text-body-sm text-mute">
                  Featured posts will appear here once embed links are added.
                </p>
              )}
            </div>
          </div>
        </section>

        <section
          id="life-checklist"
          aria-labelledby="life-heading"
          className="bg-canvas section-y"
        >
          <div className="mx-auto max-w-content px-gutter rounded-lg border border-hairline bg-surface p-6 lg:p-8">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <SectionTitle id="life-heading" icon={<ChecklistIcon width={18} height={18} />}>
                Life Checklist
              </SectionTitle>
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

        <section
          id="pop-quiz"
          aria-labelledby="quiz-heading"
          className="bg-canvas section-y"
        >
          <div className="mx-auto max-w-content px-gutter rounded-lg border border-hairline bg-surface-elevated p-6 lg:p-8">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <SectionTitle id="quiz-heading" icon={<QuizIcon width={18} height={18} />}>
                Pop Quiz
              </SectionTitle>
              <Link href="/pop-quiz" className="focus-ring btn-primary">
                Take the quiz →
              </Link>
            </div>
            <p className="mt-4 max-w-2xl text-body-md text-body">
              Think you know the TIBER guy? {popQuizQuestionCount} questions, streak bonuses, light
              roasts for wrong answers, and a tier ranking at the end — from &ldquo;Who even are
              you?&rdquo; to &ldquo;Honorary cofounder.&rdquo;
            </p>
            <p className="mt-6 text-caption-md text-mute">
              No timer. No account. Just vibes.
            </p>
          </div>
        </section>

        <section
          id="blog"
          aria-labelledby="blog-heading"
          className="bg-canvas section-y"
        >
          <div className="mx-auto max-w-content px-gutter rounded-lg border border-hairline bg-surface p-6 lg:p-8">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <SectionTitle id="blog-heading" icon={<PenIcon width={18} height={18} />}>
                Blog
              </SectionTitle>
              <Link href="/blog" className="focus-ring btn-primary">
                All posts →
              </Link>
            </div>
            <p className="mt-4 max-w-2xl text-body-md text-body">
              Blog posts about my journey and learnings. These are some of my recent posts:
            </p>
            {latestPosts.length > 0 ? (
              <ul className="mt-8 space-y-3">
                {latestPosts.map((post) => (
                  <li key={post.slug}>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="focus-ring group flex flex-wrap items-baseline justify-between gap-2 rounded-md border border-hairline bg-surface-elevated px-4 py-3 transition hover:border-hairline-strong"
                    >
                      <span className="text-body-md text-on-dark group-hover:text-ink">
                        {post.title}
                      </span>
                      <time dateTime={post.date} className="text-caption-md text-mute">
                        {formatPostDate(post.date)}
                      </time>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-6 text-caption-md text-mute">No posts yet — check back soon.</p>
            )}
          </div>
        </section>

        <section id="connect" aria-labelledby="connect-heading" className="bg-canvas section-y">
          <div className="mx-auto max-w-content px-gutter rounded-lg border border-hairline-strong bg-surface-elevated p-8 lg:p-10">
            <SectionTitle id="connect-heading" icon={<MailIcon width={18} height={18} />}>
              Contact
            </SectionTitle>
            <p className="mt-6 text-body-lg text-body">{contact.closing}</p>
            <div className="mt-10 flex flex-wrap gap-3">
              <a href={`mailto:${contact.email}`} className="focus-ring btn-primary">
                Email
              </a>
              <a
                href={contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="focus-ring install-btn"
              >
                LinkedIn
              </a>
              <a
                href={contact.github}
                target="_blank"
                rel="noopener noreferrer"
                className="focus-ring install-btn"
              >
                GitHub
              </a>
              <a
                href={contact.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="focus-ring install-btn"
              >
                X
              </a>
              <a
                href={contact.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="focus-ring install-btn"
              >
                Instagram
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
        <div className="mx-auto max-w-content px-gutter py-4">
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
                  <a href={contact.instagram} className="link-footer" target="_blank" rel="noopener noreferrer">
                    Instagram
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
