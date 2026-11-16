import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { GithubIcon } from "@/components/ui/Icons";
import { Chip } from "@/components/ui/Chip";
import { StatusBadge } from "@/components/ui/Badge";
import { Footer } from "@/components/layout/Footer";
import projectsData from "@/data/projects.json";
import { ProjectsArraySchema } from "@/data/schemas/project";

const projects = ProjectsArraySchema.parse(projectsData);

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.summary,
    openGraph: {
      title: `${project.title} — Numan Faisal`,
      description: project.summary,
      images: [
        {
          url: `/api/og?title=${encodeURIComponent(project.title)}&subtitle=${encodeURIComponent(project.tagline)}`,
          width: 1200,
          height: 630,
        },
      ],
    },
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  const { case_study: cs } = project;

  return (
    <>
      <div className="min-h-screen pt-20">
        {/* Back link */}
        <div className="container pt-8 pb-4">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-sm text-[var(--color-muted)] hover:text-[var(--color-text)] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            Back to work
          </Link>
        </div>

        {/* Hero */}
        <div className="container py-12">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <StatusBadge status={project.status} />
              {project.tags.map((tag) => (
                <Chip key={tag}>{tag}</Chip>
              ))}
            </div>
            <h1 className="font-display text-5xl sm:text-6xl font-bold tracking-tight mb-4">
              {project.title}
            </h1>
            <p className="text-xl text-[var(--color-muted)] leading-relaxed mb-8 max-w-2xl">
              {project.summary}
            </p>

            {/* Links */}
            <div className="flex gap-4">
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold accent-gradient text-white hover:opacity-90 transition-opacity"
                >
                  <ExternalLink className="w-4 h-4" aria-hidden="true" />
                  Live demo
                </a>
              )}
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold border border-[var(--color-border)] text-[var(--color-text)] hover:border-[var(--color-accent)]/40 transition-colors"
                >
                  <GithubIcon className="w-4 h-4" aria-hidden="true" />
                  View code
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Screenshot */}
        {project.screenshot && (
          <div className="container pb-16">
            <div className="relative w-full aspect-[16/9] rounded-[var(--radius-xl)] overflow-hidden bg-[var(--color-surface)] border border-[var(--color-border)]">
              <Image
                src={project.screenshot}
                alt={`${project.title} screenshot`}
                fill
                className="object-cover"
              />
            </div>
          </div>
        )}

        {/* Case study content */}
        <div className="container pb-24">
          <div className="max-w-3xl mx-auto space-y-16">
            {/* Problem */}
            <section aria-label="Problem">
              <h2 className="font-display text-2xl font-bold tracking-tight mb-4 text-[var(--color-accent)]">
                The Problem
              </h2>
              <p className="text-[var(--color-muted)] leading-relaxed text-lg">{cs.problem}</p>
            </section>

            {/* Approach */}
            <section aria-label="Approach">
              <h2 className="font-display text-2xl font-bold tracking-tight mb-4">
                Approach
              </h2>
              <p className="text-[var(--color-muted)] leading-relaxed text-lg">{cs.approach}</p>
            </section>

            {/* Architecture */}
            <section aria-label="Architecture">
              <h2 className="font-display text-2xl font-bold tracking-tight mb-4">
                Architecture
              </h2>
              <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-xl)] p-6">
                <code className="text-sm text-[var(--color-text)] font-mono leading-loose whitespace-pre-wrap block">
                  {cs.architecture}
                </code>
              </div>
            </section>

            {/* Key decisions */}
            <section aria-label="Key decisions">
              <h2 className="font-display text-2xl font-bold tracking-tight mb-6">
                Key Decisions
              </h2>
              <ul className="space-y-4" role="list">
                {cs.key_decisions.map((decision, i) => (
                  <li
                    key={i}
                    className="flex gap-4 p-5 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-lg)]"
                  >
                    <span className="text-[var(--color-accent)] font-bold font-mono text-sm flex-shrink-0 mt-0.5">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-[var(--color-muted)] leading-relaxed">{decision}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Result */}
            <section aria-label="Result">
              <h2 className="font-display text-2xl font-bold tracking-tight mb-4">
                Result
              </h2>
              <p className="text-[var(--color-muted)] leading-relaxed text-lg">{cs.result}</p>
            </section>

            {/* Stack */}
            <section aria-label="Tech stack">
              <h2 className="font-display text-2xl font-bold tracking-tight mb-4">
                Full Stack
              </h2>
              <p className="text-[var(--color-muted)] leading-relaxed mb-6">{cs.stack_detail}</p>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <Chip key={t} variant="accent">{t}</Chip>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
