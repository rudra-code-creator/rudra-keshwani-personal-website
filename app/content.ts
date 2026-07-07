/** Site copy derived from public LinkedIn profile — keep in sync manually. */

export const profile = {
  headshotSrc: "/images/headshot.png",
  heroCoverSrc: "/images/hero-cover.png",
  displayName: "Rudra Keshwani",
  tagline: "(The TIBER guy)",
  pronouns: "He/Him",
  age: "18",
  location: "Brisbane, Queensland, Australia",
  connections: "500+",
  scrollHook: "Did u stop scrolling?",
  headline:
    "|founder of intelliGIS| community lead @ SH1P Australia |intern @ Chatstat| secretary @ QUT TECH| Creator of the TIBER framework (Technology, Innovation, Business, Entrepreneurship, Research). 18yo",
  openToWork: "Brisbane, QLD | On-site · Hybrid",
  verificationNote: "Verification badge shown on LinkedIn profile",
} as const;

export const aboutParagraphs = [
  "I'm a student technologist who builds systems while thinking deeply about why they should exist and how they create value.",
  "My work sits at the intersection of DevOps, cloud, and infrastructure, where I enjoy turning ideas into deployable, scalable systems. I care about reliability and execution, but also about speed and iteration.",
  "I operate within a TIBER framework: Technology, Innovation, Business, Entrepreneurship, and R&D. That means experimenting, learning from first principles, and connecting technical decisions to user needs, markets, and long-term outcomes.",
  "I'm drawn to early-stage environments where engineers think like founders — owning problems end-to-end, questioning assumptions, and building toward something meaningful.",
  "Currently focused on growing through building, experimenting, and shipping across both technical and entrepreneurial domains.",
  "Long-term, I want to build companies grounded in strong systems thinking — technical, economic, and human.",
] as const;

export const tiberPillars = [
  { key: "T", label: "Technology", desc: "Building, shipping, and hardening systems that work in production." },
  { key: "I", label: "Innovation", desc: "Experimenting and learning from first principles, not only from playbooks." },
  { key: "B", label: "Business", desc: "Connecting what you build to users, markets, and sustainable value." },
  { key: "E", label: "Entrepreneurship", desc: "Operating like a founder: ownership, velocity, and iteration." },
  { key: "R", label: "Research", desc: "R&D as a loop: question → build → measure → refine." },
] as const;

export const experience = [
  {
    title: "Agentic AI Systems Engineer",
    org: "Chatstat",
    logoSrc: "/images/logos/chatstat.png",
    type: "Internship",
    date: "Apr 2026 – Present",
    place: "Brisbane, Queensland, Australia · Hybrid",
    summary:
      "Contributing to real-world agentic AI systems for online safety and intelligent automation, focused on autonomous workflows, reliability, and emerging architectures.",
    skills: "Artificial Intelligence (AI), Agentic AI Development, +3 skills",
  },
  {
    title: "Founder",
    org: "intelliGIS",
    logoSrc: "/images/logos/intelligis.png",
    type: "Self-employed",
    date: "Jun 2026 – Present",
    place: "Brisbane, Queensland, Australia · Hybrid",
    summary:
      "Founded intelliGIS to make AI-powered geospatial analysis more accessible and actionable. Leading product strategy, architecture, customer discovery, partnerships, and early go-to-market execution. HKUST x SINO competition entry: https://hkust.startuptree.co/venture/intelligis/",
    skills: "Founder, Geospatial AI, Product Strategy",
  },
  {
    title: "Community Lead @ SH1P Australia",
    org: "SH1P",
    logoSrc: "/images/logos/sh1p.png",
    type: "Internship",
    date: "Mar 2026 – Present",
    place: "Australia · Remote",
    summary:
      "Progressed from UGC content growth to venture research and now community leadership for SH1P Australia.",
    skills: "Community Building, Venture Research, Content Growth",
  },
  {
    title: "Secretary",
    org: "QUT The Emerging Coders Hub (TECH)",
    logoSrc: "/images/logos/qut-tech.png",
    type: "Full-time",
    date: "Mar 2026 – Present",
    place: "Brisbane, Queensland, Australia · Hybrid",
    summary: "Executive support and administration for QUT TECH.",
    skills: "Administration, Executive Support, …",
  },
  {
    title: "Community Representative",
    org: "Triple F",
    logoSrc: "/images/logos/triplef.png",
    type: "Internship",
    date: "May 2026 – Present",
    place: "Brisbane, Queensland, Australia · Remote",
    summary:
      "Representing the community and supporting ecosystem engagement with the Triple F team.",
    skills: "Community Engagement, Representation, Partnerships",
  },
  {
    title: "LinkedIn Growth Team",
    org: "Prettiflow",
    logoSrc: "/images/logos/prettiflow.png",
    type: "Internship",
    date: "May 2026 – Jun 2026",
    place: "APAC · Remote",
    summary:
      "Worked on the LinkedIn Growth team during a remote internship; contributed to audience and growth initiatives before resigning on June 1.",
    skills: "LinkedIn Growth, Audience Development, Remote Collaboration",
  },
  {
    title: "Technical Cofounder",
    org: "unpaste.ai",
    logoSrc: "/images/logos/unpaste.png",
    type: "Self-employed",
    date: "Feb 2026 – Jun 2026",
    place: "Brisbane, Queensland, Australia · Hybrid",
    summary:
      "Technical vision and product development for AI-driven automation — embedding scalable AI into client workflows (architecture through implementation). Stack references include OpenClaw, n8n, Claude, and custom integrations.",
    skills: "Delivery of projects, Entrepreneurship, …",
  },
  {
    title: "Educator",
    org: "Kumon",
    logoSrc: "/images/logos/kumon.png",
    type: "Casual employment",
    date: "Jan 2023 – Dec 2025",
    place: "Australia · On-site",
    summary:
      "Key roles: helping students solve complex mathematical and literature problems, marking students work, recording students progress, technical support and implementation related to the Kumon CONNECT platform",
    skills: "Network Services, …",
  },
] as const;

export const education = [
  {
    school: "HKUST + Sino Group One Million Dollar Entrepreneurship Competition",
    logoSrc: "/images/logos/hkust.png",
    detail:
      "Competing in the Hong Kong University of Science and Technology (HKUST) + Sino Group 1M entrepreneurship competition with intelliGIS.",
    date: "Jun 2026 – Oct 2026",
    extra: "https://hkust.startuptree.co/venture/intelligis/",
  },
  {
    school: "QUT (Queensland University of Technology)",
    logoSrc: "/images/logos/qut-tech.png",
    detail:
      "Double Bachelor: Business (Entrepreneurship) and Information Technology (AI). Bachelor of Business / Bachelor of Information Technology (IX22).",
    date: "Feb 2026 – Dec 2029",
    extra:
      "Activities: QUT AI/ML society (member); QUT TECH / The Emerging Coders Hub (member).",
  },
  {
    school: "Y Combinator — Startup School",
    logoSrc: "/images/logos/yc.png",
    detail: "Enrolled in Startup School — YC’s free online program for founders (curriculum, advice, and community).",
    date: "Apr 2026 – Present",
    extra: "",
  },
  {
    school: "BOP Industries — Young Entrepreneurs Hub",
    logoSrc: "/images/logos/bop-industries.png",
    detail: "Youth accelerator — workshops, mentoring, and dedicated build time (Brisbane WeWork).",
    date: "Apr 2026 – Sep 2026",
    extra: "",
  },
  {
    school: "Get Set Education",
    logoSrc: "/images/logos/get-set-education.png",
    detail: "BSB50120 Diploma Of Business",
    date: "Issued May 2025 · Credential ID 11907942-7747750",
    extra: "CRM, Accounting, …",
  },
  {
    school: "Mansfield State High School",
    logoSrc: "/images/logos/mansfield-shs.png",
    detail:
      "Queensland Certificate of Education (QCE), Queensland Curriculum & Assessment Authority (QCAA) — Queensland curriculum pathway.",
    date: "Jan 2020 – Nov 2025",
    extra: "Skills: Delivery of projects, Data analysis, +7 skills (full list on LinkedIn).",
  },
] as const;

export const topSkills =
  "Project Management · Communication · Finance · Information Technology · Business";

export const contact = {
  email: "rudrakeshwani2@gmail.com",
  github: "https://github.com/rudra-code-creator",
  twitter: "https://x.com/rudrakesh123",
  linkedin: "https://www.linkedin.com/in/rudra-keshwani-the-tiber-guy-31272b1aa/",
  instagram: "https://www.instagram.com/ruu.kes.3/",
  closing: "DM is open, feel free to reach out.",
} as const;

export const volunteerNote =
  "Open to volunteering across many cause areas — arts, education, environment, health, equity, community, and more. Full list on LinkedIn profile.";

export const NEAL_FUN_LIFE_CHECKLIST_URL = "https://neal.fun/life-checklist/";
