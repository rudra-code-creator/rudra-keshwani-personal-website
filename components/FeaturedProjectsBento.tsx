import Image from "next/image";
import { featuredProjects, type FeaturedProject } from "@/app/projects-data";

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
  return (
    <article className="flex flex-col overflow-hidden rounded-lg border border-hairline bg-surface">
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
        <div className="mt-5 flex flex-wrap gap-2">
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
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={project.websiteUrl ? "focus-ring install-btn" : "focus-ring btn-primary"}
          >
            GitHub
          </a>
        </div>
      </div>
    </article>
  );
}

export function FeaturedProjectsBento() {
  if (featuredProjects.length === 0) return null;

  return (
    <div className="mt-8 grid gap-4 sm:grid-cols-2">
      {featuredProjects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
}
