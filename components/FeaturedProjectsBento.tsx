"use client";

import Image from "next/image";
import { useState } from "react";
import {
  featuredProjects,
  featuredProjectsPeekCount,
  featuredProjectsPreviewCount,
  type FeaturedProject,
} from "@/app/projects-data";

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
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
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
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:gap-5">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
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
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:gap-5">
            {previewProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>

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
