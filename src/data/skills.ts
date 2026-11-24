export interface SkillGroup {
  label: string;
  categoryNumber?: string;
  badge?: string;
  color?: string;
  skills: string[];
  description?: string;
}

export const skillGroups: SkillGroup[] = [
  {
    label: "Frontend & Mobile",
    categoryNumber: "01",
    badge: "RESPONSIVE",
    color: "var(--color-learn)",
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "React Native", "Expo"],
    description: "Production web & native mobile apps with pixel-perfect craft and zero layout shift.",
  },
  {
    label: "Backend & Systems",
    categoryNumber: "02",
    badge: "LOW LATENCY",
    color: "var(--color-build)",
    skills: ["Node.js", "Express", "FastAPI", "Python", "REST APIs", "WebSockets", "GraphQL"],
    description: "High-throughput APIs, bidirectional WebSockets, and resilient backend microservices.",
  },
  {
    label: "AI & Speech Infrastructure",
    categoryNumber: "03",
    badge: "DEPLOYED",
    color: "var(--color-studio)",
    skills: ["OpenAI Whisper", "GPT-4o", "Claude API", "LangChain", "RAG Pipelines", "Vector Databases", "Prompt Engineering"],
    description: "Production voice ordering agents, function calling, and context-grounded retrieval.",
  },
  {
    label: "Data & Storage",
    categoryNumber: "04",
    badge: "SCALABLE",
    color: "var(--color-build)",
    skills: ["PostgreSQL", "MongoDB", "Redis", "Pinecone", "Prisma", "Drizzle ORM"],
    description: "Relational modeling, fast in-memory caching, indexing, and vector embeddings.",
  },
  {
    label: "DevOps & Cloud",
    categoryNumber: "05",
    badge: "CI / CD",
    color: "var(--color-studio)",
    skills: ["Docker", "AWS EC2", "AWS RDS", "Vercel", "Cloudinary", "GitHub Actions"],
    description: "Containerized deployment pipelines, cloud provisioning, and automated testing.",
  },
  {
    label: "Engineering Disciplines",
    categoryNumber: "06",
    badge: "RIGOR",
    color: "var(--color-learn)",
    skills: ["Data Structures & Algorithms", "Git", "Zod", "System Design", "Code Review", "Agile"],
    description: "Algorithmic foundations, strictly typed data boundaries, and clean maintainable code.",
  },
];
