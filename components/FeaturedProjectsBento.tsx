"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import {
  featuredProjects,
  featuredProjectsPeekCount,
  featuredProjectsPreviewCount,
  type FeaturedProject,
  type ProjectImage,
} from "@/app/projects-data";

const CAROUSEL_MS = 5500;

function CodeBlock({ commands }: { commands: string[] }) {
  return (
    <pre className="mt-2 overflow-x-auto rounded-md border border-hairline bg-canvas px-3 py-2 font-mono text-caption-md text-body">
      <code>{commands.join("\n")}</code>
    </pre>
  );
}

function ProjectSetup({ project }: { project: NonNullable<FeaturedProject["setup"]> }) {
  return (
    <details className="group mt-4 rounded-md border border-hairline bg-surface-elevated">
      <summary className="cursor-pointer list-none px-3 py-2.5 text-body-sm-strong text-on-dark marker:content-none [&::-webkit-details-marker]:hidden">
        <span className="inline-flex w-full items-center justify-between gap-2">
          <span>{project.title ?? "Quick setup"}</span>
          <span className="text-caption-md text-mute group-open:hidden" aria-hidden>
            expand ↓
          </span>
          <span className="hidden text-caption-md text-mute group-open:inline" aria-hidden>
            close ↑
          </span>
        </span>
      </summary>
      <div className="space-y-4 border-t border-hairline px-3 py-3">
        {project.steps.map((step, index) => (
          <div key={step.title}>
            <p className="text-body-sm-strong text-on-dark">
              {index + 1}) {step.title}
            </p>
            {step.commands ? <CodeBlock commands={step.commands} /> : null}
            {step.variants?.map((variant) => (
              <div key={variant.label} className="mt-2">
                <p className="text-caption-md text-mute">{variant.label}</p>
                <CodeBlock commands={variant.commands} />
              </div>
            ))}
            {step.note ? <p className="mt-2 text-caption-md text-mute">{step.note}</p> : null}
          </div>
        ))}
        {project.footerNote ? (
          <p className="text-caption-md text-mute">{project.footerNote}</p>
        ) : null}
      </div>
    </details>
  );
}

function badgeLabel(badge: NonNullable<FeaturedProject["badge"]>): string {
  switch (badge) {
    case "new":
      return "New";
    case "deprecated":
      return "Old · deprecated";
    default: {
      const _exhaustive: never = badge;
      return _exhaustive;
    }
  }
}

function ProjectBadge({ badge }: { badge: NonNullable<FeaturedProject["badge"]> }) {
  const isNew = badge === "new";
  return (
    <span
      className={[
        "inline-flex shrink-0 items-center rounded-sm px-2 py-0.5 text-caption-sm font-medium uppercase tracking-wide",
        isNew ? "bg-accent-green-soft text-accent-green" : "bg-accent-yellow-soft text-accent-yellow",
      ].join(" ")}
    >
      {badgeLabel(badge)}
    </span>
  );
}

function ProjectCarousel({
  images,
  sizes,
  featured,
}: {
  images: readonly ProjectImage[];
  sizes: string;
  featured?: boolean;
}) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = images.length;
  const current = images[Math.min(active, count - 1)];

  const goTo = useCallback(
    (next: number) => {
      if (count === 0) return;
      setActive(((next % count) + count) % count);
    },
    [count],
  );

  useEffect(() => {
    if (count <= 1 || paused) return;
    const timer = window.setInterval(() => {
      setActive((i) => (i + 1) % count);
    }, CAROUSEL_MS);
    return () => window.clearInterval(timer);
  }, [count, paused]);

  if (!current) {
    return (
      <div className="flex h-full min-h-[10rem] items-center justify-center px-4 text-center text-caption-md text-mute">
        Preview coming soon
      </div>
    );
  }

  return (
    <div
      className={`group/gallery relative bg-canvas ${featured ? "" : "aspect-[16/10]"}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node)) setPaused(false);
      }}
    >
      {featured ? (
        <Image
          key={current.src}
          src={current.src}
          alt={current.alt}
          width={1920}
          height={1080}
          className="mx-auto block h-auto w-auto max-w-full object-contain"
          sizes={sizes}
          priority
        />
      ) : (
        <Image
          key={current.src}
          src={current.src}
          alt={current.alt}
          fill
          className="object-cover object-top"
          sizes={sizes}
        />
      )}
      {count > 1 ? (
        <>
          {([-1, 1] as const).map((delta) => (
            <button
              key={delta}
              type="button"
              aria-label={delta < 0 ? "Previous screenshot" : "Next screenshot"}
              onClick={() => goTo(active + delta)}
              className={[
                "absolute top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-hairline-strong bg-surface-elevated/90 text-on-dark opacity-80 transition hover:opacity-100",
                delta < 0 ? "left-3" : "right-3",
              ].join(" ")}
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
                <path d={delta < 0 ? "M7.5 2.5 4 6l3.5 3.5" : "M4.5 2.5 8 6l-3.5 3.5"} />
              </svg>
            </button>
          ))}
          <div className="absolute bottom-2.5 left-1/2 flex -translate-x-1/2 gap-1.5 rounded-full bg-surface-elevated/85 px-2 py-1">
            {images.map((image, i) => (
              <button
                key={image.src}
                type="button"
                aria-label={`Show screenshot ${i + 1} of ${count}`}
                aria-current={i === active ? "true" : undefined}
                onClick={() => goTo(i)}
                className={`h-1.5 rounded-full transition-all ${i === active ? "w-4 bg-primary" : "w-1.5 bg-mute/60"}`}
              />
            ))}
          </div>
        </>
      ) : null}
    </div>
  );
}

function ProjectCard({ project }: { project: FeaturedProject }) {
  const primaryIsWebsite = Boolean(project.websiteUrl);
  const featured = Boolean(project.featured);
  const images: ProjectImage[] =
    project.images && project.images.length > 0
      ? project.images
      : project.imageSrc
        ? [{ src: project.imageSrc, alt: project.imageAlt }]
        : [];
  const websiteLabel = project.badge === "deprecated" ? "Legacy site" : "Website";

  return (
    <article
      className={[
        "flex h-full flex-col overflow-hidden rounded-lg border border-hairline bg-surface",
        featured ? "sm:col-span-2" : "",
      ].join(" ")}
    >
      <div className="relative border-b border-hairline bg-surface-card">
        {images.length > 0 ? (
          <ProjectCarousel
            images={images}
            featured={featured}
            sizes={featured ? "(max-width: 1024px) 100vw, 70vw" : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"}
          />
        ) : (
          <div className="flex h-full min-h-[10rem] items-center justify-center px-4 text-center text-caption-md text-mute">
            Preview coming soon
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5 lg:p-6">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="text-heading-sm text-on-dark">{project.name}</h3>
          {project.badge ? <ProjectBadge badge={project.badge} /> : null}
        </div>
        <p className="mt-2 text-body-sm text-body">{project.description}</p>
        {project.setup ? <ProjectSetup project={project.setup} /> : null}
        <div className="mt-auto flex flex-wrap gap-2 pt-5">
          {project.websiteUrl ? (
            <a
              href={project.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="focus-ring btn-primary"
            >
              {websiteLabel}
            </a>
          ) : null}
          {project.githubUrl ? (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={primaryIsWebsite ? "focus-ring install-btn" : "focus-ring btn-primary"}
            >
              GitHub
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
}

function ProjectGrid({ projects }: { projects: FeaturedProject[] }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:gap-5">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
}

export function FeaturedProjectsBento() {
  const projects = featuredProjects;
  const [expanded, setExpanded] = useState(false);
  const needsToggle = projects.length > featuredProjectsPreviewCount;
  const previewProjects = projects.slice(0, featuredProjectsPreviewCount);
  const peekProjects = projects.slice(
    featuredProjectsPreviewCount,
    featuredProjectsPreviewCount + featuredProjectsPeekCount,
  );
  const remaining = projects.length - featuredProjectsPreviewCount;

  if (projects.length === 0) return null;

  return (
    <div className="mt-8">
      {expanded || !needsToggle ? (
        <>
          <ProjectGrid projects={projects} />
          {needsToggle ? (
            <div className="mt-6 flex justify-center">
              <button
                type="button"
                className="focus-ring btn-primary"
                aria-expanded={true}
                onClick={() => setExpanded(false)}
              >
                Show fewer items
              </button>
            </div>
          ) : null}
        </>
      ) : (
        <>
          <ProjectGrid projects={previewProjects} />

          {peekProjects.length > 0 ? (
            <div className="relative mt-4">
              <div
                className="pointer-events-none grid max-h-[7.5rem] grid-cols-1 gap-4 overflow-hidden opacity-70 sm:max-h-[8.5rem] sm:grid-cols-2 lg:gap-5"
                aria-hidden
              >
                {peekProjects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-surface-elevated via-surface-elevated/75 to-transparent"
                aria-hidden
              />
              <div className="absolute inset-x-0 bottom-3 z-10 flex justify-center sm:bottom-5">
                <button
                  type="button"
                  className="focus-ring btn-primary shadow-[0_8px_24px_rgb(var(--color-canvas)/0.55)]"
                  aria-expanded={false}
                  onClick={() => setExpanded(true)}
                >
                  Show more items · {remaining} more
                </button>
              </div>
            </div>
          ) : null}
        </>
      )}
    </div>
  );
}
