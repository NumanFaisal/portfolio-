"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Briefcase, Calendar } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Chip } from "@/components/ui/Chip";
import { formatDate } from "@/lib/utils";
import type { Experience } from "@/data/schemas/experience";

function TimelineItem({
  experience,
  index,
}: {
  experience: Experience;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -32 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        delay: index * 0.1,
        duration: 0.6,
        ease: [0.19, 1, 0.22, 1],
      }}
      className="relative pl-8 md:pl-16"
    >
      {/* Dot */}
      <div
        className="absolute left-0 md:left-4 top-1.5 w-3 h-3 rounded-full border-2 border-[var(--color-accent)] bg-[var(--color-bg)]"
        aria-hidden="true"
      />

      {/* Card */}
      <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-xl)] p-6 hover:border-[var(--color-accent)]/30 transition-colors">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Briefcase className="w-4 h-4 text-[var(--color-accent)]" aria-hidden="true" />
              <h3 className="font-display text-lg font-bold">{experience.role}</h3>
            </div>
            <div className="text-[var(--color-muted)] font-medium">{experience.company}</div>
          </div>

          <div className="flex items-center gap-1.5 text-sm text-[var(--color-muted)] flex-shrink-0">
            <Calendar className="w-3.5 h-3.5" aria-hidden="true" />
            <span>
              {formatDate(experience.start)} —{" "}
              {experience.current ? (
                <span className="text-green-400 font-medium">Present</span>
              ) : experience.end ? (
                formatDate(experience.end)
              ) : (
                "Present"
              )}
            </span>
          </div>
        </div>

        {/* Bullets */}
        <ul className="space-y-2 mb-4" role="list">
          {experience.bullets.map((bullet, i) => (
            <li key={i} className="flex gap-3 text-sm text-[var(--color-muted)] leading-relaxed">
              <span className="text-[var(--color-accent)] flex-shrink-0 mt-0.5" aria-hidden="true">
                →
              </span>
              {bullet}
            </li>
          ))}
        </ul>

        {/* What I learned */}
        <blockquote className="border-l-2 border-[var(--color-accent)]/40 pl-4 mb-4 text-sm italic text-[var(--color-muted)]">
          <span className="text-[var(--color-muted)]/60 not-italic text-xs uppercase tracking-wider block mb-1">
            What I learned
          </span>
          &ldquo;{experience.learned}&rdquo;
        </blockquote>

        {/* Tech chips */}
        <div className="flex flex-wrap gap-1.5">
          {experience.tech.map((tech) => (
            <Chip key={tech}>{tech}</Chip>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

interface ExperienceProps {
  experiences: Experience[];
}

export function ExperienceSection({ experiences }: ExperienceProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.8", "end 0.2"],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="experience" className="section" aria-label="Work experience">
      <div className="container">
        <SectionHeading
          eyebrow="Experience"
          title="Where I've built things."
          description="From intern to leading production AI — each role pushed me to think bigger and ship faster."
          className="mb-16"
        />

        <div ref={containerRef} className="relative">
          {/* Timeline line */}
          <div
            className="absolute left-1.5 md:left-5 top-0 bottom-0 w-px bg-[var(--color-border)]"
            aria-hidden="true"
          />
          {/* Animated fill */}
          <motion.div
            style={{ height: lineHeight }}
            className="absolute left-1.5 md:left-5 top-0 w-px bg-[var(--color-accent)] origin-top"
            aria-hidden="true"
          />

          <div className="flex flex-col gap-10">
            {experiences.map((exp, i) => (
              <TimelineItem key={exp.id} experience={exp} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
