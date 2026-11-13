"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink, Github, ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Chip } from "@/components/ui/Chip";
import { StatusBadge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";
import type { Project } from "@/data/schemas/project";

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        delay: index * 0.1,
        duration: 0.6,
        ease: [0.19, 1, 0.22, 1],
      }}
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className={cn(
        "group relative flex flex-col rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface)] overflow-hidden cursor-pointer",
        "hover:border-[var(--color-accent)]/30 transition-all duration-300",
        "before:absolute before:inset-0 before:rounded-[var(--radius-xl)] before:opacity-0 before:transition-opacity before:duration-300 group-hover:before:opacity-100",
        // Glow at cursor position
        "before:[background:radial-gradient(300px_circle_at_var(--mouse-x,50%)_var(--mouse-y,50%),rgba(124,92,255,0.08),transparent)]"
      )}
    >
      {/* Image / preview area */}
      <div className="relative w-full h-48 bg-[var(--color-surface-2)] overflow-hidden flex-shrink-0">
        {project.screenshot ? (
          <Image
            src={project.screenshot}
            alt={`${project.title} preview`}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div
              className="w-16 h-16 rounded-2xl accent-gradient opacity-30"
              aria-hidden="true"
            />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-surface)] via-transparent to-transparent" />

        {/* Status badge */}
        <div className="absolute top-4 left-4">
          <StatusBadge status={project.status} />
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-6 gap-4">
        <div>
          <h3 className="font-display text-xl font-bold tracking-tight mb-2">
            {project.title}
          </h3>
          <p className="text-sm text-[var(--color-muted)] leading-relaxed line-clamp-2">
            {project.outcome}
          </p>
        </div>

        {/* Tech chips */}
        <div className="flex flex-wrap gap-1.5">
          {project.tech.slice(0, 5).map((t) => (
            <Chip key={t}>{t}</Chip>
          ))}
          {project.tech.length > 5 && (
            <Chip>+{project.tech.length - 5}</Chip>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-[var(--color-border)]">
          <div className="flex items-center gap-3">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--color-muted)] hover:text-[var(--color-text)] transition-colors"
                aria-label={`${project.title} GitHub repository`}
                onClick={(e) => e.stopPropagation()}
              >
                <Github className="w-4 h-4" />
              </a>
            )}
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--color-muted)] hover:text-[var(--color-text)] transition-colors"
                aria-label={`${project.title} live demo`}
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>

          <Link
            href={`/projects/${project.slug}`}
            className="inline-flex items-center gap-1 text-xs font-medium text-[var(--color-accent)] hover:gap-2 transition-all"
            aria-label={`Read case study for ${project.title}`}
          >
            Case study
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

interface ProjectsProps {
  projects: Project[];
}

export function Projects({ projects }: ProjectsProps) {
  const featured = projects.filter((p) => p.featured).slice(0, 6);

  return (
    <section id="projects" className="section" aria-label="Projects">
      <div className="container">
        <SectionHeading
          eyebrow="Selected work"
          title="Projects that ship."
          description="Real products, real problems, real users. Each one built with a bias toward simplicity and a focus on what actually matters."
          className="mb-16"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
