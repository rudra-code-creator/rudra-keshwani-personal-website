export type ProjectSetupStep = {
  title: string;
  commands?: string[];
  variants?: { label: string; commands: string[] }[];
  note?: string;
};

export type ProjectImage = {
  src: string;
  alt: string;
};

export type FeaturedProject = {
  id: string;
  name: string;
  description: string;
  imageSrc?: string;
  imageAlt: string;
  images?: ProjectImage[];
  websiteUrl?: string;
  githubUrl?: string;
  /** Spans both columns of the bento grid — reserved for the flagship. */
  featured?: boolean;
  badge?: "new" | "deprecated";
  setup?: {
    title?: string;
    steps: ProjectSetupStep[];
    footerNote?: string;
  };
};

/** Featured builds for the homepage projects bento grid (display order). */
export const featuredProjects: FeaturedProject[] = [
  {
    id: "intelligis-marine",
    name: "IntelliGIS Marine",
    featured: true,
    badge: "new",
    description:
      "Ask the ocean a question in plain language. An AI-native marine GIS where a language model plans and a deterministic spatial engine computes — storm-surge exposure, offshore wind siting, MPA loitering, port operations and dark-vessel detection on a live South China Sea digital twin.",
    imageSrc: "/images/projects/intelligis-marine/live-ais.webp",
    imageAlt: "IntelliGIS Marine console with live AIS traffic around Hong Kong and Shenzhen",
    images: [
      {
        src: "/images/projects/intelligis-marine/mpa-guangdong.jpg",
        alt: "IntelliGIS Marine console over Guangdong with 3D terrain, Typhoon 2618, and flagged vessels from an MPA loitering analysis",
      },
      {
        src: "/images/projects/intelligis-marine/mpa-south-china-sea.jpg",
        alt: "IntelliGIS Marine regional South China Sea view with AIS trails from Vietnam to the Philippines and a flagged-vessel table",
      },
      {
        src: "/images/projects/intelligis-marine/live-ais.webp",
        alt: "IntelliGIS Marine console with live AIS traffic around Hong Kong, Shenzhen and the Pearl River Delta",
      },
      {
        src: "/images/projects/intelligis-marine/typhoon.webp",
        alt: "Typhoon 2618 forecast cone and wind radii approaching the Guangdong coast in the marine console",
      },
      {
        src: "/images/projects/intelligis-marine/density.webp",
        alt: "H3 hexagon shipping-density overlay across the Pearl River Delta approaches",
      },
      {
        src: "/images/projects/intelligis-marine/region.webp",
        alt: "Regional South China Sea twin with typhoon track, ports and AIS from Vietnam to Guangdong",
      },
      {
        src: "/images/projects/intelligis-marine/pearl-river.webp",
        alt: "Pearl River Delta map view with AIS trails, ports and marine protected areas",
      },
    ],
    websiteUrl: "https://intelligis-marine.netlify.app",
    githubUrl: "https://github.com/rudra-code-creator/intelligis-marine",
  },
  {
    id: "intelligis",
    name: "IntelliGIS",
    badge: "deprecated",
    description:
      "The original planner MVP — ask plain-English questions of maps, satellite imagery, and planning data. Superseded by IntelliGIS Marine; kept here as the earlier prototype.",
    imageSrc: "/images/projects/intelligis.png",
    imageAlt: "IntelliGIS planner with Brisbane map and AI master-plan prompt",
    websiteUrl: "https://intelligis-mvp.netlify.app",
    githubUrl: "https://github.com/rudra-code-creator/intelliGIS-MVP",
  },
  {
    id: "world-metro-visualiser",
    name: "World Metro Visualiser",
    description:
      "Explore and compare metro systems worldwide — lines, stations, and network layouts across major cities in one interactive map.",
    imageSrc: "/images/projects/world-metro-visualiser.png",
    imageAlt: "World Metro Visualiser showing Beijing metro network on a dark map",
    websiteUrl: "https://world-metro-visualiser.netlify.app/",
    githubUrl: "https://github.com/rudra-code-creator/world-metro-visualiser",
  },
  {
    id: "global-startups-bubble-maps",
    name: "Global startups bubble maps",
    description:
      "Find the offices, hubs, and co-location energy. A curated, map-first view of where notable startups sit across Australia, New Zealand, the Pacific, Indonesia, Malaysia, Singapore, India, and the Greater Bay Area.",
    imageSrc: "/images/projects/global-startups-bubble-maps.jpg",
    imageAlt:
      "Startup Map landing page with Brisbane and Sydney bubble-map previews on a dark teal grid",
    websiteUrl: "https://global-startup-bubble-maps.netlify.app",
    githubUrl: "https://github.com/rudra-code-creator/australian-startups-mapped",
  },
  {
    id: "airline-data-explorer",
    name: "Airline Data Explorer",
    description:
      "Interactive aviation analytics — explore airline networks, routes, airports, and global connectivity patterns through intuitive visualizations.",
    imageSrc: "/images/projects/airline-data-explorer.png",
    imageAlt: "Airline Data Explorer showing Air China fleet cards and route network map",
    githubUrl: "https://github.com/rudra-code-creator/airline-data-explorer",
    setup: {
      title: "Quick setup",
      steps: [
        {
          title: "Clone the repository",
          commands: [
            "git clone https://github.com/rudra-code-creator/airline-data-explorer",
            "cd airline-data-explorer",
          ],
        },
        {
          title: "Create a virtual environment",
          variants: [
            {
              label: "Windows",
              commands: ["python -m venv .venv", ".venv\\Scripts\\activate"],
            },
            {
              label: "macOS/Linux",
              commands: ["python3 -m venv .venv", "source .venv/bin/activate"],
            },
          ],
        },
        {
          title: "Install dependencies",
          commands: ["pip install -r requirements.txt"],
        },
        {
          title: "Run the app",
          commands: ["python main.py"],
        },
      ],
      footerNote: "On first run, the app may take longer while it downloads/builds data caches.",
    },
  },
  {
    id: "leap-ahead",
    name: "Leap Ahead",
    description:
      "AI career guidance from the UQIES × January Capital × Lovable Hackathon 2026 — personalized pathways, skill gaps, and opportunities for students and early-career builders.",
    imageSrc: "/images/projects/leap-ahead.png",
    imageAlt: "Leap Ahead student hub dashboard with progress stages and weekly to-dos",
    websiteUrl: "https://leap-uqies-hackathon-sandy.vercel.app/",
    githubUrl: "https://github.com/rudra-code-creator/leap-UQIES-hackathon",
  },
  {
    id: "flightradar67",
    name: "FlightRadar67",
    description:
      "FlightRadar67 is a real-time aviation radar built around a full CesiumJS globe. Live ADS-B traffic loads in viewport chunks, aircraft are colour-coded by altitude, and selecting a flight reveals its flown trail with route context — more like a radar screen than a dashboard.",
    imageSrc: "/images/projects/flightradar67.png",
    imageAlt:
      "FlightRadar67 Cesium globe with live ADS-B traffic, altitude colouring, and selected flight trail",
    websiteUrl: "https://flightradar67.netlify.app",
    githubUrl: "https://github.com/rudra-code-creator/flightradar67",
  },
  {
    id: "arya-clark",
    name: "Arya Clark Luxury Real Estate",
    description:
      "A dark, gold-accented marketing site for luxury real estate agent Arya Clark — hero storytelling, featured estates, property browse, map, and appraisal booking built for high-end buyers and sellers.",
    imageSrc: "/images/projects/arya-clark.png",
    imageAlt:
      "Arya Clark luxury real estate site with twilight mansion hero and gold Book an Appraisal CTA",
    websiteUrl: "https://arya-clark-website.vercel.app",
  },
  {
    id: "personal-website",
    name: "Personal Website",
    description:
      "My Raycast-inspired personal site — TIBER branding, featured projects bento, resume, travel map, life checklist, pop quiz, blog, and guestbook. Built with Next.js, TypeScript, and Tailwind.",
    imageSrc: "/images/projects/personal-website.png",
    imageAlt:
      "Rudra Keshwani personal website in dark mode with sidebar nav, hero headshot, and About / TIBER cards",
    websiteUrl: "https://rudra-keshwani-personal-website.vercel.app",
    githubUrl: "https://github.com/rudra-code-creator/rudra-keshwani-personal-website",
  },
];

/** Fully visible cards before the fade (flagship spans two columns, so 5 fills three complete rows). */
export const featuredProjectsPreviewCount = 5;
export const featuredProjectsPeekCount = 2;
