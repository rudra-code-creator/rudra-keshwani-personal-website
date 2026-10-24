import {
  aboutParagraphs,
  contact,
  education,
  experience,
  profile,
  tiberPillars,
} from "@/app/content";
import { featuredProjects } from "@/app/projects-data";

export type CameraKeyframe = {
  p: number;
  x: number;
  y: number;
  scale: number;
  rotate: number;
};

export type ExplainerDoor = {
  href: string;
  label: string;
  hint: string;
};

export type ExplainerProject = {
  id: string;
  name: string;
  description: string;
  href: string;
  imageSrc?: string;
  imageAlt: string;
};

export type ExplainerStory = {
  name: string;
  tagline: string;
  age: string;
  location: string;
  pronouns: string;
  headshotSrc: string;
  whoLines: { text: string; highlight?: boolean }[];
  whoAside: string;
  educationLine: string;
  tiberIntro: string;
  pillars: { key: string; label: string; desc: string }[];
  projects: ExplainerProject[];
  closing: string;
  doors: ExplainerDoor[];
};

const FEATURED_BUILD_IDS = [
  "intelligis-marine",
  "world-metro-visualiser",
  "flightradar67",
] as const;

function firstSentence(text: string): string {
  const match = text.match(/^[^.!?]+[.!?]/);
  return (match ? match[0] : text).trim();
}

function projectHref(project: (typeof featuredProjects)[number]): string {
  return project.websiteUrl ?? project.githubUrl ?? "/#projects";
}

export const explainerCameras: Record<string, CameraKeyframe[]> = {
  title: [
    { p: 0, x: 0, y: 2, scale: 1.04, rotate: 0.35 },
    { p: 1, x: 0, y: -5, scale: 1.1, rotate: -0.45 },
  ],
  who: [
    { p: 0, x: 0, y: 0, scale: 1, rotate: 0 },
    { p: 0.3, x: 3, y: 6, scale: 1.1, rotate: -0.7 },
    { p: 0.64, x: -3, y: 16, scale: 1.32, rotate: 1.05 },
    { p: 1, x: 0, y: 8, scale: 1.16, rotate: 0.2 },
  ],
  tiber: [
    { p: 0, x: 0, y: 0, scale: 1, rotate: 0 },
    { p: 0.22, x: -6, y: 3, scale: 1.08, rotate: -0.9 },
    { p: 0.55, x: 5, y: -2, scale: 1.14, rotate: 0.7 },
    { p: 1, x: 0, y: 0, scale: 1.04, rotate: 0 },
  ],
  building: [
    { p: 0, x: 0, y: 4, scale: 1.02, rotate: 0.4 },
    { p: 0.5, x: 4, y: -3, scale: 1.12, rotate: -0.6 },
    { p: 1, x: -2, y: 0, scale: 1.06, rotate: 0.2 },
  ],
  end: [
    { p: 0, x: 0, y: 0, scale: 1.08, rotate: -0.4 },
    { p: 1, x: 0, y: 0, scale: 1, rotate: 0 },
  ],
};

export function getExplainerStory(): ExplainerStory {
  const qut = education.find((item) => item.school.startsWith("QUT"));
  const roles = experience
    .slice(0, 4)
    .map((job) => (job.title.includes(job.org) || job.title.includes("@") ? job.title : `${job.title}, ${job.org}`))
    .join(" · ");

  const projects = FEATURED_BUILD_IDS.map((id) => {
    const project = featuredProjects.find((entry) => entry.id === id);
    if (!project) {
      throw new Error(`Missing featured project: ${id}`);
    }
    return {
      id: project.id,
      name: project.name,
      description: firstSentence(project.description),
      href: projectHref(project),
      imageSrc: project.imageSrc,
      imageAlt: project.imageAlt,
    };
  });

  return {
    name: profile.displayName,
    tagline: profile.tagline,
    age: profile.age,
    location: profile.location,
    pronouns: profile.pronouns,
    headshotSrc: profile.headshotSrc,
    whoLines: [
      { text: aboutParagraphs[0].text },
      { text: aboutParagraphs[1].text },
      { text: aboutParagraphs[2].text, highlight: true },
      { text: aboutParagraphs[5].text },
    ],
    whoAside: roles,
    educationLine: qut ? `${qut.school} — ${qut.detail}` : "",
    tiberIntro:
      "Creator of the TIBER framework (Technology, Innovation, Business, Entrepreneurship, Research).",
    pillars: tiberPillars.map((pillar) => ({
      key: pillar.key,
      label: pillar.label,
      desc: pillar.desc,
    })),
    projects,
    closing: contact.closing,
    doors: [
      { href: "/", label: "Enter the site", hint: "Full scan" },
      { href: "/#about", label: "About", hint: "Who" },
      { href: "/#tiber", label: "TIBER", hint: "The framework" },
      { href: "/#projects", label: "Projects", hint: "Builds" },
      { href: "/#resume", label: "Resume", hint: "Read on the page" },
      { href: "/resume.pdf", label: "Download PDF", hint: "resume.pdf" },
    ],
  };
}
