import type { Metadata } from "next";
import { Download, Briefcase, GraduationCap, Code2 } from "lucide-react";
import { Footer } from "@/components/layout/Footer";
import { Chip } from "@/components/ui/Chip";
import { formatDate } from "@/lib/utils";
import profileData from "@/data/profile.json";
import experienceData from "@/data/experience.json";
import { ProfileSchema } from "@/data/schemas/profile";
import { ExperienceArraySchema } from "@/data/schemas/experience";

const profile = ProfileSchema.parse(profileData);
const experiences = ExperienceArraySchema.parse(experienceData);

export const metadata: Metadata = {
  title: "Resume",
  description: `Resume of ${profile.name} — ${profile.title}`,
};

export default function ResumePage() {
  return (
    <>
      <div className="min-h-screen pt-20">
        <div className="container py-16 max-w-3xl">
          {/* Header */}
          <div className="flex items-start justify-between mb-12">
            <div>
              <h1 className="font-display text-4xl font-bold tracking-tight">{profile.name}</h1>
              <p className="text-[var(--color-muted)] mt-2 text-lg">{profile.title}</p>
              <div className="flex items-center gap-4 mt-3 text-sm text-[var(--color-muted)]">
                <a href={`mailto:${profile.email}`} className="hover:text-[var(--color-text)] transition-colors">
                  {profile.email}
                </a>
                <span aria-hidden="true">·</span>
                <a href={profile.github} target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-text)] transition-colors">
                  GitHub
                </a>
                <span aria-hidden="true">·</span>
                <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-text)] transition-colors">
                  LinkedIn
                </a>
              </div>
            </div>
            <a
              href="/resume.pdf"
              download
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-semibold accent-gradient text-white hover:opacity-90 transition-opacity"
            >
              <Download className="w-4 h-4" aria-hidden="true" />
              Download PDF
            </a>
          </div>

          {/* Summary */}
          <section className="mb-12" aria-label="Summary">
            <p className="text-[var(--color-muted)] leading-relaxed text-lg">{profile.bio}</p>
          </section>

          {/* Experience */}
          <section className="mb-12" aria-label="Work experience">
            <h2 className="font-display text-xl font-bold tracking-tight flex items-center gap-2 mb-6 pb-3 border-b border-[var(--color-border)]">
              <Briefcase className="w-5 h-5 text-[var(--color-accent)]" aria-hidden="true" />
              Experience
            </h2>
            <div className="space-y-8">
              {experiences.map((exp) => (
                <div key={exp.id}>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-3">
                    <div>
                      <h3 className="font-semibold">{exp.role}</h3>
                      <div className="text-[var(--color-muted)] text-sm">{exp.company}</div>
                    </div>
                    <div className="text-sm text-[var(--color-muted)]">
                      {formatDate(exp.start)} — {exp.current ? "Present" : exp.end ? formatDate(exp.end) : "Present"}
                    </div>
                  </div>
                  <ul className="space-y-1.5 mb-3" role="list">
                    {exp.bullets.map((b, i) => (
                      <li key={i} className="text-sm text-[var(--color-muted)] flex gap-2">
                        <span className="text-[var(--color-accent)] flex-shrink-0" aria-hidden="true">•</span>
                        {b}
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-1.5">
                    {exp.tech.map((t) => <Chip key={t}>{t}</Chip>)}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Education */}
          <section className="mb-12" aria-label="Education">
            <h2 className="font-display text-xl font-bold tracking-tight flex items-center gap-2 mb-6 pb-3 border-b border-[var(--color-border)]">
              <GraduationCap className="w-5 h-5 text-[var(--color-accent)]" aria-hidden="true" />
              Education
            </h2>
            <div>
              <h3 className="font-semibold">B.Tech in Computer Science Engineering</h3>
              <div className="text-[var(--color-muted)] text-sm">R.V.S. College of Engineering and Technology · 2023 — 2027</div>
            </div>
          </section>

          {/* Skills */}
          <section aria-label="Skills">
            <h2 className="font-display text-xl font-bold tracking-tight flex items-center gap-2 mb-6 pb-3 border-b border-[var(--color-border)]">
              <Code2 className="w-5 h-5 text-[var(--color-accent)]" aria-hidden="true" />
              Skills
            </h2>
            <p className="text-sm text-[var(--color-muted)] leading-relaxed">
              React · Next.js · TypeScript · Node.js · Python · FastAPI · LangChain · OpenAI API · 
              PostgreSQL · MongoDB · Redis · Docker · AWS · Vercel · React Native · Tailwind CSS · 
              Git · Prisma · Zod · Framer Motion
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
}
