"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { featuredProjects, type FeaturedProject } from "@/app/projects-data";

const AUTO_PLAY_MS = 5000;
const TABLET_MIN_WIDTH = 768;

function useVisibleCount() {
  const [visibleCount, setVisibleCount] = useState(1);

  useEffect(() => {
    const mediaQuery = window.matchMedia(`(min-width: ${TABLET_MIN_WIDTH}px)`);
    const update = () => setVisibleCount(mediaQuery.matches ? 2 : 1);
    update();
    mediaQuery.addEventListener("change", update);
    return () => mediaQuery.removeEventListener("change", update);
  }, []);

  return visibleCount;
}

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

function ProjectCard({ project }: { project: FeaturedProject }) {
  const primaryIsWebsite = Boolean(project.websiteUrl);

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-lg border border-hairline bg-surface">
      <div className="relative aspect-[16/10] border-b border-hairline bg-surface-card">
        {project.imageSrc ? (
          <Image
            src={project.imageSrc}
            alt={project.imageAlt}
            fill
            className="object-cover object-top"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        ) : (
          <div className="flex h-full min-h-[10rem] items-center justify-center px-4 text-center text-caption-md text-mute">
            Preview coming soon
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5 lg:p-6">
        <h3 className="text-heading-sm text-on-dark">{project.name}</h3>
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
              Website
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

export function FeaturedProjectsBento() {
  const projects = featuredProjects;
  const count = projects.length;
  const visibleCount = useVisibleCount();
  const maxIndex = Math.max(0, count - visibleCount);
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [slideWidth, setSlideWidth] = useState(0);
  const viewportRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIndex((current) => Math.min(current, maxIndex));
  }, [maxIndex]);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const syncSlideWidth = () => {
      setSlideWidth(viewport.offsetWidth / visibleCount);
    };

    syncSlideWidth();

    const observer = new ResizeObserver(syncSlideWidth);
    observer.observe(viewport);

    return () => observer.disconnect();
  }, [visibleCount]);

  const goTo = useCallback(
    (nextIndex: number) => {
      if (maxIndex === 0) {
        setIndex(0);
        return;
      }

      const normalized = ((nextIndex % (maxIndex + 1)) + (maxIndex + 1)) % (maxIndex + 1);
      setIndex(normalized);
    },
    [maxIndex],
  );

  const goNext = useCallback(() => goTo(index + 1), [goTo, index]);
  const goPrev = useCallback(() => goTo(index - 1), [goTo, index]);

  useEffect(() => {
    if (maxIndex === 0 || isPaused) return;

    const timer = window.setInterval(() => {
      setIndex((current) => (current >= maxIndex ? 0 : current + 1));
    }, AUTO_PLAY_MS);

    return () => window.clearInterval(timer);
  }, [isPaused, maxIndex]);

  if (count === 0) return null;

  return (
    <div
      className="mt-8"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node)) {
          setIsPaused(false);
        }
      }}
    >
      <div ref={viewportRef} className="overflow-hidden" aria-live="polite">
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{
            transform: slideWidth > 0 ? `translateX(-${index * slideWidth}px)` : undefined,
          }}
        >
          {projects.map((project, projectIndex) => (
            <div
              key={project.id}
              className="shrink-0 px-1.5 sm:px-2"
              style={{ width: slideWidth > 0 ? slideWidth : `${100 / visibleCount}%` }}
              aria-hidden={projectIndex < index || projectIndex >= index + visibleCount}
            >
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      </div>

      {maxIndex > 0 ? (
        <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={goPrev}
            className="focus-ring btn-secondary"
            aria-label="Previous projects"
          >
            ←
          </button>

          <div className="flex flex-wrap justify-center gap-2">
            {Array.from({ length: maxIndex + 1 }, (_, slideIndex) => {
              const isActive = slideIndex === index;

              return (
                <button
                  key={slideIndex}
                  type="button"
                  onClick={() => goTo(slideIndex)}
                  aria-label={`Go to projects slide ${slideIndex + 1}`}
                  aria-current={isActive ? "true" : undefined}
                  className={[
                    "focus-ring h-2.5 w-2.5 rounded-full transition",
                    isActive ? "bg-on-dark" : "bg-stone hover:bg-mute",
                  ].join(" ")}
                />
              );
            })}
          </div>

          <button
            type="button"
            onClick={goNext}
            className="focus-ring btn-secondary"
            aria-label="Next projects"
          >
            →
          </button>
        </div>
      ) : null}
    </div>
  );
}
