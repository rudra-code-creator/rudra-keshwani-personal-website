/** Pop quiz about Rudra — edit answers here as life updates. */

export type PopQuizQuestion = {
  id: string;
  emoji: string;
  question: string;
  options: readonly string[];
  correctIndex: number;
  /** Shown after answering — the fun bit */
  funFact: string;
  correctReaction: string;
  wrongReaction: string;
};

export const popQuizQuestions: PopQuizQuestion[] = [
  {
    id: "city",
    emoji: "🌴",
    question: "Where is Rudra based?",
    options: ["Melbourne, VIC", "Brisbane, QLD", "Sydney, NSW", "Perth, WA"],
    correctIndex: 1,
    funFact: "Brisbane — sun, river city, and apparently a lot of early-stage building.",
    correctReaction: "You know the map. Respect.",
    wrongReaction: "Wrong coast energy. He's a Brisbane guy.",
  },
  {
    id: "tiber",
    emoji: "🔥",
    question: "What does TIBER stand for?",
    options: [
      "Technology, Innovation, Business, Entrepreneurship, Research",
      "Tech, Ideas, Build, Execute, Repeat",
      "Trust, Impact, Boldness, Equity, Results",
      "Teams, Infrastructure, Backend, Engineering, Reliability",
    ],
    correctIndex: 0,
    funFact: "The TIBER framework is his whole brand — you'll see it everywhere on this site.",
    correctReaction: "Certified TIBER scholar. The guy would hire you.",
    wrongReaction: "Nice acronym, wrong universe. Study the About section.",
  },
  {
    id: "cofounder",
    emoji: "🚀",
    question: "Which company is Rudra technical cofounder of?",
    options: ["paste.ai", "unpaste.ai", "copy.ai", "ctrl+v.io"],
    correctIndex: 1,
    funFact: "unpaste.ai — AI-driven automation, OpenClaw, n8n, Claude, the works.",
    correctReaction: "You actually read the headline. Legend.",
    wrongReaction: "So close to a real-sounding startup name. It's unpaste.ai.",
  },
  {
    id: "qut",
    emoji: "🎓",
    question: "What is Rudra studying at QUT?",
    options: [
      "Computer Science only",
      "Law and Commerce",
      "Double degree: Business (Entrepreneurship) + IT (AI)",
      "Medicine",
    ],
    correctIndex: 2,
    funFact: "IX22 — Business brain and AI brain, same person.",
    correctReaction: "Dual degree unlocked in your memory.",
    wrongReaction: "He's doing the founder × engineer combo degree, not solo CS.",
  },
  {
    id: "tiber-r",
    emoji: "🧪",
    question: "What does the R in TIBER stand for?",
    options: ["Robotics", "Revenue", "Research", "Recursion"],
    correctIndex: 2,
    funFact: "Research — question → build → measure → refine. Not a robot (yet).",
    correctReaction: "You didn't fall for Robotics. Smart.",
    wrongReaction: "The R is Research. The robots come later.",
  },
  {
    id: "high-school",
    emoji: "🏫",
    question: "Where did Rudra graduate high school?",
    options: [
      "Brisbane State High School",
      "Mansfield State High School",
      "Kelvin Grove State College",
      "Somewhere in Melbourne",
    ],
    correctIndex: 1,
    funFact: "Mansfield State High School — QCE, Jan 2020 – Nov 2025.",
    correctReaction: "Alumni knowledge or elite stalking. Either way, correct.",
    wrongReaction: "Mansfield, not generic Brisbane High. Write it down.",
  },
  {
    id: "tagline",
    emoji: "😎",
    question: "What's Rudra's self-appointed LinkedIn tagline?",
    options: ["(The AI guy)", "(The TIBER guy)", "(The DevOps dude)", "(The 10x engineer)"],
    correctIndex: 1,
    funFact: "He/Him · (The TIBER guy) · Did u stop scrolling?",
    correctReaction: "You stopped scrolling. He appreciates you.",
    wrongReaction: "It's TIBER guy. The framework is the personality.",
  },
  {
    id: "chatstat",
    emoji: "🤖",
    question: "Where is Rudra building agentic AI systems as an intern?",
    options: ["OpenAI", "Anthropic", "Chatstat", "DeepMind"],
    correctIndex: 2,
    funFact: "Chatstat — online safety, intelligent automation, agentic workflows.",
    correctReaction: "You know the day job (well, internship).",
    wrongReaction: "Not the big labs — it's Chatstat in Brisbane, hybrid.",
  },
  {
    id: "fake",
    emoji: "🦄",
    question: "According to his headline, which did Rudra NOT create?",
    options: ["The TIBER framework", "uni-corn", "The Time Machine API", "unpaste.ai (cofounder)"],
    correctIndex: 2,
    funFact: "uni-corn and TIBER are real on the profile. Time Machine API is… aspirational.",
    correctReaction: "You spotted the imposter milestone. Chef's kiss.",
    wrongReaction: "Time Machine API is the fiction here. The rest is on LinkedIn.",
  },
  {
    id: "age",
    emoji: "🎂",
    question: "How old is Rudra (as listed on this site)?",
    options: ["16", "17", "18", "21"],
    correctIndex: 2,
    funFact: "18 — building companies while other people are still picking a major.",
    correctReaction: "Age check passed. No cap.",
    wrongReaction: "He's 18. Young founder hours.",
  },
  {
    id: "food",
    emoji: "🥖",
    question: "What is Rudra's favourite food?",
    options: ["Banh Mi", "Pho", "Pad Thai", "Sushi"],
    correctIndex: 0,
    funFact: "Banh Mi — crispy baguette, punchy fillings, elite tier street food.",
    correctReaction: "You know what fuels the founder. Banh Mi correct.",
    wrongReaction: "Close on Southeast Asian vibes, but it's Banh Mi.",
  },
  {
    id: "music",
    emoji: "🎧",
    question: "What is Rudra's favourite genre of music?",
    options: [
      "Classical & jazz only",
      "Country and acoustic",
      "EDM — especially Epidemic Sound & NCS (NoCopyrightSounds)",
      "Lo-fi beats to study to (and nothing else)",
    ],
    correctIndex: 2,
    funFact: "EDM head — Epidemic Sound and NCS are the go-to labels.",
    correctReaction: "You'd recognize his playlist instantly. EDM + those labels.",
    wrongReaction: "He's on EDM — Epidemic Sound and NCS especially. Turn it up.",
  },
  {
    id: "tech",
    emoji: "🛠️",
    question: "Which stack includes some of Rudra's favourite technologies?",
    options: [
      "Linux, Docker, Kubernetes, Node.js, Python, Metasploit",
      "Windows-only, Excel macros, and Canva",
      "Swift, Kotlin, Xcode, and Flutter only",
      "WordPress, Wix, and Squarespace",
    ],
    correctIndex: 0,
    funFact: "Linux, Docker, Kubernetes, Node.js, Python, Metasploit — build, ship, and probe.",
    correctReaction: "Full stack + infra + security curiosity. You get it.",
    wrongReaction: "Think containers, clusters, and a little Metasploit on the side.",
  },
  {
    id: "hello",
    emoji: "📬",
    question: "What's the best way to reach Rudra, per this website?",
    options: [
      "Fax only",
      "Carrier pigeon to Mansfield",
      "DM is open — email / LinkedIn / socials",
      "You can't, he's too busy",
    ],
    correctIndex: 2,
    funFact: "DM is open, feel free to reach out. He means it.",
    correctReaction: "You read Contact. Now use it.",
    wrongReaction: "No fax machine required. Just DM him.",
  },
];

export const popQuizQuestionCount = popQuizQuestions.length;

export type PopQuizTier = {
  minScore: number;
  title: string;
  emoji: string;
  blurb: string;
};

export const popQuizTiers: PopQuizTier[] = [
  {
    minScore: 0,
    emoji: "👻",
    title: "Who even are you?",
    blurb: "You wandered onto the wrong portfolio. Scroll the About section and run it back.",
  },
  {
    minScore: 4,
    emoji: "👀",
    title: "LinkedIn lurker",
    blurb: "You skimmed the headline. Respectable. Not cofounder material yet.",
  },
  {
    minScore: 7,
    emoji: "☕",
    title: "Coffee chat worthy",
    blurb: "You'd survive a 15-minute intro call without embarrassing yourself.",
  },
  {
    minScore: 10,
    emoji: "🤝",
    title: "Inner circle",
    blurb: "You know the TIBER lore. Rudra would actually remember your name.",
  },
  {
    minScore: 13,
    emoji: "🦄",
    title: "Honorary cofounder",
    blurb: "Perfect score. Equity is still pending, but the vibe is there.",
  },
];

export function getPopQuizTier(score: number): PopQuizTier {
  return [...popQuizTiers].reverse().find((t) => score >= t.minScore) ?? popQuizTiers[0];
}
