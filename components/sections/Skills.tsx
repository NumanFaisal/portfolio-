"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Chip } from "@/components/ui/Chip";
import { skillGroups } from "@/src/data/skills";

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

        <div
          className="w-full gap-6"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          }}
        >
          {skillGroups.map((group, i) => (
            <motion.div
              key={group.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: i * 0.06,
                duration: 0.35,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-xl)] p-6 h-full flex flex-col justify-between text-left transition-all duration-200 hover:shadow-md hover:border-[var(--color-ink-soft)]"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-display text-sm font-bold uppercase tracking-widest text-[var(--color-accent)]">
                    {group.label}
                  </h3>
                  {group.badge && (
                    <span className="font-mono text-[9px] uppercase tracking-wider px-2 py-0.5 rounded bg-[var(--color-border)] text-[var(--color-ink-soft)] font-medium">
                      {group.badge}
                    </span>
                  )}
                </div>
                {group.description && (
                  <p className="text-xs text-[var(--color-ink-soft)] mb-4 leading-relaxed">
                    {group.description}
                  </p>
                )}
              </div>

              <div className="flex flex-wrap gap-2 pt-2">
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
