export type ProjectSetupStep = {
  title: string;
  commands?: string[];
  variants?: { label: string; commands: string[] }[];
  note?: string;
};

export type FeaturedProject = {
  id: string;
  name: string;
  description: string;
  imageSrc?: string;
  imageAlt: string;
  websiteUrl?: string;
  githubUrl?: string;
  setup?: {
    title?: string;
    steps: ProjectSetupStep[];
    footerNote?: string;
  };
};

/** Featured builds for the homepage projects carousel. */
export const featuredProjects: FeaturedProject[] = [
  {
    id: "intelligis",
    name: "IntelliGIS",
    description:
      "AI-powered geospatial intelligence — ask plain-English questions of maps, satellite imagery, and planning data without traditional GIS complexity.",
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
];
