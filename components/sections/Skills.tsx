"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Chip } from "@/components/ui/Chip";

const skillGroups = [
  {
    label: "Frontend",
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "React Native", "Expo"],
  },
  {
    label: "Backend",
    skills: ["Node.js", "Express", "FastAPI", "Python", "REST APIs", "WebSockets", "GraphQL"],
  },
  {
    label: "AI & ML",
    skills: ["OpenAI API", "LangChain", "Whisper", "GPT-4o", "RAG pipelines", "Prompt engineering", "Vector databases"],
  },
  {
    label: "Data & Storage",
    skills: ["PostgreSQL", "MongoDB", "Redis", "Pinecone", "Prisma", "Drizzle ORM"],
  },
  {
    label: "Infrastructure",
    skills: ["Docker", "AWS EC2", "AWS RDS", "Vercel", "Cloudinary", "GitHub Actions", "CI/CD"],
  },
  {
    label: "Tools & Practices",
    skills: ["Git", "Zod", "Testing", "Code review", "Technical writing", "Agile"],
  },
];

export function Skills() {
  return (
    <section id="skills" className="section" aria-label="Skills and technologies">
      <div className="container">
        <SectionHeading
          eyebrow="Skills"
          title="What I work with."
          description="A practical toolkit built from real production experience — not tutorial projects."
          className="mb-16"
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillGroups.map((group, i) => (
            <motion.div
              key={group.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: i * 0.08,
                duration: 0.5,
                ease: [0.19, 1, 0.22, 1],
              }}
              className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-xl)] p-6"
            >
              <h3 className="font-display text-sm font-bold uppercase tracking-widest text-[var(--color-accent)] mb-4">
                {group.label}
              </h3>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <Chip key={skill}>{skill}</Chip>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
