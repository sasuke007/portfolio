export type ProjectSpan = "feature" | "tall" | "third";

export type Project = {
  name: string;
  stack: string[];
  description: string;
  href: string;
  span: ProjectSpan;
  status?: string; // optional pill label instead of stack tags
  oneWord?: string; // for vertical "card 2" style
};

export type Experience = {
  start: string;
  end: string;
  title: string;
  company: string;
  location: "On-site" | "Remote" | "Hybrid";
  current?: boolean;
};

export type Achievement = {
  title: string;
  year: string;
  organizer: string;
  tag: string;
  note: string;
};

export type JournalPhoto = {
  src: string;
  alt: string;
  rotation: number;
  parallax: number; // px translated when scrolled fully through the section
  position: { top?: string; left?: string; right?: string; bottom?: string };
  width: string;
  z: number;
};

export const identity = {
  firstName: "ROHIT",
  lastName: "PANDIT",
  monogram: "RP",
  niche: "Full Stack Engineer",
  role: "AI Product Builder",
  niceRole: "Full Stack Engineer & AI Product Builder",
  tagline:
    "Crafting elegant systems at the intersection of code, design, and intelligence.",
  resumeUrl: "/resume.pdf",
  welcome: "Welcome to my world.",
};

export const socials = {
  linkedin: "https://linkedin.com/in/your-handle", // TODO: replace
  github: "https://github.com/your-handle", // TODO: replace
  email: "pandit.rohit0007@gmail.com",
};

export const tech = [
  "React",
  "Next.js",
  "TypeScript",
  "Node.js",
  "Python",
  "Postgres",
  "Prisma",
  "Tailwind",
  "AWS",
  "Docker",
  "Redis",
  "GraphQL",
  "Figma",
  "Lexical",
];

export const projects: Project[] = [
  {
    name: "Aurora Analytics",
    stack: ["Next.js", "tRPC", "Postgres", "Prisma"],
    description:
      "A real-time business intelligence dashboard with collaborative dashboards, anomaly detection, and natural-language querying over warehouse data.",
    href: "#",
    span: "feature" as const,
  },
  {
    name: "Lucent",
    stack: ["React Native", "Expo", "Supabase"],
    description: "Mindful daily journaling.",
    href: "#",
    span: "tall" as const,
    oneWord: "Stillness",
  },
  {
    name: "Cartograph",
    stack: ["React", "Mapbox", "WebGL"],
    description: "Interactive cartography for urban-design studios.",
    href: "#",
    span: "third" as const,
  },
  {
    name: "Echo CLI",
    stack: ["Rust", "Tokio", "WASM"],
    description: "A blazing-fast terminal companion for shell power-users.",
    href: "#",
    span: "third" as const,
  },
  {
    name: "Atelier",
    stack: ["TypeScript", "OpenAI", "Vector DB"],
    description: "AI workshop for creative writing — drafts, prompts, edits.",
    href: "#",
    span: "third" as const,
    status: "In Progress",
  },
];

export const experience: Experience[] = [
  {
    start: "2024",
    end: "Present",
    title: "Senior Product Engineer",
    company: "Anaesthetic Labs",
    location: "Remote" as const,
    current: true,
  },
  {
    start: "2022",
    end: "2024",
    title: "Full Stack Engineer",
    company: "Northwind Studio",
    location: "Hybrid" as const,
  },
  {
    start: "2020",
    end: "2022",
    title: "Software Engineer",
    company: "Foglight Systems",
    location: "On-site" as const,
  },
  {
    start: "2018",
    end: "2020",
    title: "Junior Developer",
    company: "Beacon & Co.",
    location: "On-site" as const,
  },
];

export const achievements: Achievement[] = [
  {
    title: "ETH Mumbai Winner",
    year: "2024",
    organizer: "ETHGlobal",
    tag: "Winner across 2 tracks",
    note: "Built a verifiable AI inference layer leveraging zero-knowledge proofs.",
  },
  {
    title: "Top 1% Open Source",
    year: "2023",
    organizer: "GitHub",
    tag: "Maintainer",
    note: "Recognized for sustained contributions to developer tooling libraries.",
  },
  {
    title: "Product Hunt #1",
    year: "2023",
    organizer: "Product Hunt",
    tag: "Product of the Day",
    note: "Launched a tiny dev productivity tool that hit #1 within hours.",
  },
];

export const journalPhotos: JournalPhoto[] = [
  {
    src: "/good_lighting.jpeg",
    alt: "A quiet morning in good light",
    rotation: -4,
    parallax: -80,
    position: { top: "6%", left: "4%" },
    width: "clamp(180px, 22vw, 300px)",
    z: 1,
  },
  {
    src: "/nature_lover.jpeg",
    alt: "Among the trees",
    rotation: 3,
    parallax: -120,
    position: { top: "44%", right: "6%" },
    width: "clamp(200px, 24vw, 340px)",
    z: 3,
  },
  {
    src: "/stylish_pic.jpeg",
    alt: "City at golden hour",
    rotation: -2,
    parallax: -50,
    position: { bottom: "8%", left: "20%" },
    width: "clamp(160px, 20vw, 260px)",
    z: 2,
  },
];

export const tools = [
  { name: "Typescript", muted: false },
  { name: "React", muted: true },
  { name: "Next.js", muted: false },
  { name: "Tailwind", muted: true },
  { name: "Postgres", muted: false },
  { name: "Figma", muted: true },
  { name: "Node", muted: false },
  { name: "Python", muted: true },
  { name: "AWS", muted: false },
  { name: "Docker", muted: true },
  { name: "Redis", muted: false },
  { name: "GraphQL", muted: true },
];

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#work" },
  { label: "Journey", href: "#journey" },
];
