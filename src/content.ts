export type Product = {
  name: string;
  /** Live product URL — omit while the product is still being built. */
  url?: string;
  /** Optional short subtitle shown on the collapsed row, italic. */
  tagline?: string;
  /** Optional status pill, e.g. "LIVE", "IN BETA". */
  status?: string;
  /** Italic Cormorant pullquote shown at top of expanded panel. */
  summary?: string;
  /** Body paragraph framing what the product is. */
  description?: string;
  /** Feature bullets (3-5 items). */
  features?: string[];
  /** Tech stack pills, lowercase strings. */
  stack?: string[];
};

export type Experience = {
  start: string;
  end: string;
  title: string;
  company: string;
  current?: boolean;

  location?: "On-site" | "Remote" | "Hybrid";
  /** One-sentence italic Cormorant pullquote shown at the top of the expanded panel. */
  summary?: string;
  /** Accomplishment bullets — what was owned / shipped. */
  details?: string[];
  /** Tech stack used at this role, lowercase strings. */
  stack?: string[];
  /** Optional company URL — if present, company name renders as a link. */
  url?: string;
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
  niche: "Product Builder",
  role: "Founder, Replay Chess",
  niceRole: "Product Builder & Founder of Replay Chess",
  tagline:
    "I build products I wish existed in the world. Founder of Replay Chess — with five years of large-scale systems behind every release.",
  resumeUrl: "/resume.pdf",
  welcome: "Welcome to my world.",
};

export const socials = {
  linkedin: "https://linkedin.com/in/your-handle", // TODO: replace
  github: "https://github.com/your-handle", // TODO: replace
  email: "pandit.rohit0007@gmail.com",
};

export const products: Product[] = [
  {
    name: "Replay Chess",
    tagline: "Replay the moments that made the game.",
    url: "https://playchess.tech",
    status: "LIVE",
    summary:
      "Step into the position the moment before chess history was made.",
    description:
      "Replay Chess turns the most-talked-about positions in chess — from Agadmator's catalogue, classic games, and instructive puzzles — into playable boards you can step through, share with friends, and analyse move-by-move against the engine. It's the fastest path from “how would I have played here?” to actually finding out.",
    features: [
      "6,000+ pause-the-video positions from Agadmator's channel, ready to play out.",
      "One-click shareable links — challenge friends to find the move you found.",
      "Engine analysis comparing your move to the optimal line, every ply.",
      "Browse iconic moments from chess history and pick up where the masters left off.",
    ],
    stack: [],
  },
  {
    name: "The Next One",
    tagline: "In the workshop, taking shape.",
    status: "BUILDING",
    summary: "Every product starts as a question I can't stop asking.",
    description:
      "Something new is on the bench — built in public, shipped in pieces, and used before it's announced. Replay Chess started the same way. Say hello below and hear about it first.",
  },
];

export const experience: Experience[] = [
  {
    start: "2025",
    end: "2026",
    title: "Senior Software Engineer",
    company: "Dream11",
    current: true,
    summary:
      "Real-time data, observability, and the firehose of IPL traffic.",
    details: [
      "Built Dream11's Winners Page using Apache Spark and Flink for real-time data aggregation across millions of users, handling concurrent contest settlements during peak IPL traffic.",
      "Contributed upstream OpenTelemetry Java instrumentation for Vert.x 3.9, MySQL, Redis, and AWS SDK — patches merged into the official OTel repo, enabling automatic trace propagation.",
      "Deployed and tuned a SigNoz + ClickHouse observability stack handling ~1 GB/sec ingestion; extended the internal fork with delta temporality, histogram quantiles, and custom aggregations.",
    ],
    stack: [
      "java",
      "vert.x",
      "opentelemetry",
      "clickhouse",
      "kafka",
      "kubernetes",
    ],
  },
  {
    start: "2022",
    end: "2024",
    title: "Senior Software Engineer",
    company: "Navi Technologies",
    summary: "Built the rewards platform powering 75% of India's UPI volume.",
    details: [
      "Re-architected the rewards engine into a config-driven platform supporting milestone, randomizer, fixed, and referral strategies, enabling zero-dev launches across UPI, BBPS, and investment products.",
      "Certified the system at 6,000 RPS — covering 75% of India's UPI volume — by resolving thread contention and DB latency bottlenecks via JVM profiling and query optimization.",
      "Cut reward-eligibility latency from 800 ms to under 120 ms by optimizing critical DB queries and introducing Redis caching with appropriate TTLs and invalidation strategies.",
    ],
    stack: ["java", "spring boot", "spring webflux", "redis", "postgres", "kafka"],
  },
  {
    start: "2020",
    end: "2022",
    title: "Software Engineer",
    company: "Paysafe Group",
    summary:
      "Real-time payments pipelines and an 8× faster merchant analytics API.",
    details: [
      "Built a distributed real-time transaction data pipeline consuming events from multiple sources and fanning out to analytics, full-text search, and the merchant-facing portal.",
      "Reduced merchant analytics API response time from 4 s to 0.5 s (8× improvement) by integrating Apache Druid, enabling sub-second OLAP queries on high-cardinality data.",
      "Designed Kafka consumer groups, partitioning strategies, and dead-letter queues for at-least-once delivery with idempotent consumers — critical for a payments system where data loss is unacceptable.",
    ],
    stack: [
      "java",
      "spring boot",
      "apache druid",
      "elasticsearch",
      "kafka",
      "aws s3",
    ],
  },
  {
    start: "2019",
    end: "2019",
    title: "Software Development Intern",
    company: "Appointy",
    summary:
      "Meta-programmed a GraphQL QA tool that replaced a manual, error-prone process.",
    details: [
      "Built an internal tool using meta-programming to automate GraphQL query generation, execution, and response validation — replacing a manual, error-prone QA process for schema changes.",
      "Designed the tool to introspect the GraphQL schema at runtime and auto-generate test queries for new types and resolvers, broadening coverage without hand-written tests.",
      "Implemented response validation comparing actual API responses against expected shapes derived from the schema, catching contract regressions before they reached production.",
    ],
    stack: ["go", "graphql", "meta programming", "api testing"],
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

/**
 * Images that flow from the cursor in the Journal section's image-trail.
 * Add more by dropping a file in /public and appending its path here — the
 * trail pools one tile per entry and cycles through them. More images = a
 * richer trail (less repetition on a fast sweep).
 */
export const journalTrailImages: string[] = [
  "/good_lighting.jpeg",
  "/nature_lover.jpeg",
  "/stylish_pic.jpeg",
];

/**
 * Tools of the trade. `logo` is the key into `toolLogoPaths`
 * (src/lib/tool-logos.ts) — the single-color glyph rendered on the IconCloud
 * sphere. Any unknown key falls back to the generic "pipeline" glyph.
 */
export type Tool = { name: string; logo: string };

export const tools: Tool[] = [
  { name: "TypeScript", logo: "typescript" },
  { name: "Next.js", logo: "nextdotjs" },
  { name: "React", logo: "react" },
  { name: "Tailwind", logo: "tailwindcss" },
  { name: "PostgreSQL", logo: "postgresql" },
  { name: "Redis", logo: "redis" },
  { name: "Claude", logo: "claude" },
  { name: "Vercel", logo: "vercel" },
  { name: "Stripe", logo: "stripe" },
  { name: "GSAP", logo: "greensock" },
  { name: "Java", logo: "java" },
  { name: "Node.js", logo: "nodedotjs" },
  { name: "Python", logo: "python" },
  { name: "JavaScript", logo: "javascript" },
  { name: "Framer Motion", logo: "framer" },
  { name: "Three.js", logo: "threedotjs" },
  { name: "Figma", logo: "figma" },
  { name: "Radix UI", logo: "radixui" },
  { name: "Upstash", logo: "upstash" },
  { name: "Prisma", logo: "prisma" },
  { name: "OpenAI", logo: "openai" },
  { name: "Docker", logo: "docker" },
  { name: "GitHub", logo: "github" },
  { name: "AWS", logo: "amazonwebservices" },
];

export const navLinks = [
  { label: "Products", href: "#products" },
  { label: "Backstory", href: "#about" },
];
