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

export type FullExplainerJob = {
  title: string;
  org: string;
  type: string;
  date: string;
  place: string;
  founder: boolean;
};

export type FullExplainerProject = {
  id: string;
  name: string;
  description: string;
  href: string;
  imageSrc?: string;
  imageAlt: string;
  badge?: "new" | "deprecated";
};

export type FullExplainerGithub = {
  username: string;
  profileUrl: string;
  total: number | null;
  activeDays: number | null;
  busiestDay: number | null;
};

export type FullExplainerStory = {
  name: string;
  tagline: string;
  age: string;
  location: string;
  pronouns: string;
  headline: string;
  openToWork: string;
  volunteerNote: string;
  headshotSrc: string;
  skylineSrc: string;
  roles: { text: string; href?: string }[];
  aboutLines: { text: string; highlight: string }[];
  tiberIntro: string;
  pillars: { key: string; label: string; desc: string }[];
  founderJobs: FullExplainerJob[];
  otherJobs: FullExplainerJob[];
  education: { school: string; detail: string; date: string }[];
  skills: string;
  skillsNote: string;
  linkedinUrl: string;
  projects: FullExplainerProject[];
  github: FullExplainerGithub;
  linkedInPosts: { id: string; title: string }[];
  linkedInCount: number;
  life: {
    done: number;
    remaining: number;
    total: number;
    samples: { id: string; label: string; done: boolean }[];
  };
  quizCount: number;
  posts: { slug: string; title: string; date: string }[];
  closing: string;
  contactLinks: { href: string; label: string; hint: string }[];
  travel: {
    countries: number;
    cities: number;
    lived: number;
    explored: number;
    layover: number;
    pins: { name: string; country: string; kind: "lived" | "explored" | "layover" }[];
  };
  infrastructure: {
    count: number;
    samples: { id: string; name: string; location: string }[];
  };
  doors: ExplainerDoor[];
};

export const fullExplainerCameras: Record<string, CameraKeyframe[]> = {
  identity: [
    { p: 0, x: 0, y: 3, scale: 1.04, rotate: 0.3 },
    { p: 0.45, x: -2, y: 8, scale: 1.12, rotate: -0.55 },
    { p: 1, x: 1, y: -2, scale: 1.06, rotate: 0.2 },
  ],
  tiber: [
    { p: 0, x: 0, y: 0, scale: 1, rotate: 0 },
    { p: 0.22, x: -6, y: 3, scale: 1.08, rotate: -0.9 },
    { p: 0.55, x: 5, y: -2, scale: 1.14, rotate: 0.7 },
    { p: 1, x: 0, y: 0, scale: 1.04, rotate: 0 },
  ],
  path: [
    { p: 0, x: 0, y: 4, scale: 1.02, rotate: 0.35 },
    { p: 0.4, x: 3, y: -6, scale: 1.1, rotate: -0.5 },
    { p: 1, x: -2, y: -12, scale: 1.06, rotate: 0.25 },
  ],
  builds: [
    { p: 0, x: 2, y: 2, scale: 1.03, rotate: 0.3 },
    { p: 0.5, x: -4, y: 0, scale: 1.08, rotate: -0.45 },
    { p: 1, x: 0, y: -2, scale: 1.04, rotate: 0.15 },
  ],
  proof: [
    { p: 0, x: 0, y: 2, scale: 1.02, rotate: -0.3 },
    { p: 0.5, x: 3, y: -3, scale: 1.1, rotate: 0.5 },
    { p: 1, x: -1, y: 0, scale: 1.04, rotate: 0 },
  ],
  life: [
    { p: 0, x: -2, y: 3, scale: 1.03, rotate: 0.4 },
    { p: 0.55, x: 3, y: -4, scale: 1.1, rotate: -0.5 },
    { p: 1, x: 0, y: 0, scale: 1.04, rotate: 0.1 },
  ],
  contact: [
    { p: 0, x: 0, y: 0, scale: 1.06, rotate: -0.35 },
    { p: 1, x: 0, y: 0, scale: 1, rotate: 0 },
  ],
  maps: [
    { p: 0, x: 0, y: 4, scale: 1.05, rotate: 0.4 },
    { p: 0.5, x: -5, y: -2, scale: 1.12, rotate: -0.6 },
    { p: 1, x: 2, y: 0, scale: 1.04, rotate: 0.15 },
  ],
  end: [
    { p: 0, x: 0, y: 0, scale: 1.08, rotate: -0.4 },
    { p: 1, x: 0, y: 0, scale: 1, rotate: 0 },
  ],
};
