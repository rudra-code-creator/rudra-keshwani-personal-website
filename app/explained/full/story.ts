import {
  aboutParagraphs,
  contact,
  education,
  experience,
  profile,
  tiberPillars,
  topSkills,
  volunteerNote,
} from "@/app/content";
import { featuredProjects } from "@/app/projects-data";
import { getFeaturedLinkedInPosts } from "@/app/featured-linkedin-posts-data";
import {
  lifeChecklist,
  lifeChecklistDoneCount,
  lifeChecklistRemainingCount,
  lifeChecklistTotalCount,
} from "@/app/life-checklist-data";
import { popQuizQuestionCount } from "@/app/pop-quiz-data";
import {
  visitedCities,
  visitedCountries,
  visitedCityCount,
  visitedCountryCount,
} from "@/app/travel-data";
import { infrastructureProjects } from "@/app/infrastructure-data";
import { formatPostDate, getAllPosts } from "@/lib/blog";
import {
  GITHUB_USERNAME,
  type GithubContributionCalendar,
} from "@/lib/github-contributions";
import type { FullExplainerGithub, FullExplainerJob, FullExplainerStory } from "./types";

const HERO_ROLES: FullExplainerStory["roles"] = [
  { text: "The TIBER guy" },
  { text: "lives in Brisbane" },
  { text: "Entrepreneur" },
  { text: "Student technologist" },
  { text: "Member at the Precinct", href: "https://precinctqld.com.au/" },
  { text: "Future Y Combinator founder" },
];

const LIFE_SAMPLE_IDS = [
  "high-school",
  "diploma",
  "tiber",
  "website",
  "college",
  "write-book",
] as const;

const TRAVEL_PIN_NAMES = [
  "Brisbane",
  "Hong Kong",
  "Singapore",
  "Jakarta",
  "Mumbai",
  "Oslo",
  "Doha",
  "Auckland",
  "Ho Chi Minh City",
] as const;

const FEATURED_INFRA_IDS = [
  "kra-canal",
  "long-thanh",
  "nusantara",
  "whoosh",
  "medog-dam",
] as const;

function firstSentence(text: string): string {
  const match = text.match(/^[^.!?]+[.!?]/);
  return (match ? match[0] : text).trim();
}

function projectHref(project: (typeof featuredProjects)[number]): string {
  return project.websiteUrl ?? project.githubUrl ?? "/#projects";
}

function toJob(job: (typeof experience)[number], founder: boolean): FullExplainerJob {
  return {
    title: job.title,
    org: job.org,
    type: job.type,
    date: job.date,
    place: job.place,
    founder,
  };
}

function summarizeGithub(calendar: GithubContributionCalendar | null): FullExplainerGithub {
  const profileUrl = `https://github.com/${GITHUB_USERNAME}`;
  if (!calendar) {
    return {
      username: GITHUB_USERNAME,
      profileUrl,
      total: null,
      activeDays: null,
      busiestDay: null,
    };
  }

  let activeDays = 0;
  let busiestDay = 0;
  for (const week of calendar.weeks) {
    for (const day of week.days) {
      if (!day) continue;
      if (day.count > 0) activeDays += 1;
      if (day.count > busiestDay) busiestDay = day.count;
    }
  }

  return {
    username: calendar.username,
    profileUrl: calendar.profileUrl,
    total: calendar.total,
    activeDays,
    busiestDay,
  };
}

function kindForCity(city: { name: string; country: string }): "lived" | "explored" | "layover" {
  if (city.name === "Hong Kong") return "explored";
  const match = visitedCountries.find(
    (country) => country.name === city.country || country.name.startsWith(city.country),
  );
  return match?.kind ?? "explored";
}

export function getFullExplainerStory(
  calendar: GithubContributionCalendar | null,
): FullExplainerStory {
  const founderJobs = experience
    .filter((job) => job.org === "intelliGIS" || job.org === "unpaste.ai")
    .map((job) => toJob(job, true));
  const otherJobs = experience
    .filter((job) => job.org !== "intelliGIS" && job.org !== "unpaste.ai")
    .map((job) => toJob(job, false));

  const projects = featuredProjects.map((project) => ({
    id: project.id,
    name: project.name,
    description: firstSentence(project.description),
    href: projectHref(project),
    imageSrc: project.imageSrc,
    imageAlt: project.imageAlt,
    badge: project.badge,
  }));

  const lifeSamples = LIFE_SAMPLE_IDS.map((id) => {
    const item = lifeChecklist.find((entry) => entry.id === id);
    if (!item) {
      throw new Error(`Missing life checklist item: ${id}`);
    }
    return { id: item.id, label: item.label, done: item.done };
  });

  const pins = TRAVEL_PIN_NAMES.map((name) => {
    const city = visitedCities.find((entry) => entry.name === name);
    if (!city) {
      throw new Error(`Missing travel city pin: ${name}`);
    }
    return {
      name: city.name,
      country: city.country,
      kind: kindForCity(city),
    };
  });

  const infraSamples = FEATURED_INFRA_IDS.map((id) => {
    const project = infrastructureProjects.find((entry) => entry.id === id);
    if (!project) {
      throw new Error(`Missing infrastructure project: ${id}`);
    }
    return { id: project.id, name: project.name, location: project.location };
  });

  const linkedInPosts = getFeaturedLinkedInPosts().map((post) => ({
    id: post.id,
    title: post.title ?? post.id,
  }));

  const lived = visitedCountries.filter((country) => country.kind === "lived").length;
  const explored = visitedCountries.filter((country) => country.kind === "explored").length;
  const layover = visitedCountries.filter((country) => country.kind === "layover").length;

  return {
    name: profile.displayName,
    tagline: profile.tagline,
    age: profile.age,
    location: profile.location,
    pronouns: profile.pronouns,
    headline: profile.headline,
    openToWork: profile.openToWork,
    volunteerNote,
    headshotSrc: profile.headshotSrc,
    skylineSrc: profile.heroBackdropSrc,
    roles: HERO_ROLES,
    aboutLines: [
      { text: aboutParagraphs[0].text, highlight: "student technologist" },
      { text: aboutParagraphs[2].text, highlight: "TIBER framework" },
      { text: aboutParagraphs[5].text, highlight: "systems thinking" },
    ],
    tiberIntro:
      "Creator of the TIBER framework (Technology, Innovation, Business, Entrepreneurship, Research).",
    pillars: tiberPillars.map((pillar) => ({
      key: pillar.key,
      label: pillar.label,
      desc: pillar.desc,
    })),
    founderJobs,
    otherJobs,
    education: education.map((item) => ({
      school: item.school,
      detail: firstSentence(item.detail),
      date: item.date,
    })),
    skills: topSkills,
    skillsNote: "Full skills list (44+) on LinkedIn.",
    linkedinUrl: contact.linkedin,
    projects,
    github: summarizeGithub(calendar),
    linkedInPosts,
    linkedInCount: linkedInPosts.length,
    life: {
      done: lifeChecklistDoneCount,
      remaining: lifeChecklistRemainingCount,
      total: lifeChecklistTotalCount,
      samples: lifeSamples,
    },
    quizCount: popQuizQuestionCount,
    posts: getAllPosts().slice(0, 3).map((post) => ({
      slug: post.slug,
      title: post.title,
      date: formatPostDate(post.date),
    })),
    closing: contact.closing,
    contactLinks: [
      { href: `mailto:${contact.email}`, label: "Email", hint: contact.email },
      { href: contact.linkedin, label: "LinkedIn", hint: "Profile" },
      { href: contact.github, label: "GitHub", hint: `@${GITHUB_USERNAME}` },
      { href: contact.twitter, label: "X", hint: "@rudrakesh123" },
      { href: contact.instagram, label: "Instagram", hint: "@ruu.kes.3" },
      { href: contact.egoist, label: "Egoist Machines", hint: "ego.ist" },
      { href: contact.cursor, label: "Cursor", hint: `@${GITHUB_USERNAME}` },
    ],
    travel: {
      countries: visitedCountryCount,
      cities: visitedCityCount,
      lived,
      explored,
      layover,
      pins,
    },
    infrastructure: {
      count: infrastructureProjects.length,
      samples: infraSamples,
    },
    doors: [
      { href: "/", label: "Enter the site", hint: "Full scan" },
      { href: "/#about", label: "About", hint: "Who" },
      { href: "/#tiber", label: "TIBER", hint: "The framework" },
      { href: "/#experience", label: "Experience", hint: "Roles" },
      { href: "/#education", label: "Education", hint: "Path" },
      { href: "/#skills", label: "Skills", hint: "Stack" },
      { href: "/#projects", label: "Projects", hint: "Builds" },
      { href: "/#github", label: "GitHub", hint: `@${GITHUB_USERNAME}` },
      { href: "/#resume", label: "Resume", hint: "Read on the page" },
      { href: "/resume.pdf", label: "Download PDF", hint: "resume.pdf" },
      { href: "/#featured-posts", label: "LinkedIn posts", hint: "Featured" },
      { href: "/life-checklist", label: "Life checklist", hint: "Full list" },
      { href: "/pop-quiz", label: "Pop quiz", hint: `${popQuizQuestionCount} questions` },
      { href: "/blog", label: "Blog", hint: "All posts" },
      { href: "/#connect", label: "Contact", hint: "DM is open" },
      { href: "/#travel", label: "Travel map", hint: "Places" },
      { href: "/#infrastructure", label: "Infrastructure", hint: "Megaprojects" },
    ],
  };
}
