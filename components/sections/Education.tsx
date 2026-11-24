"use client";

import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Education() {
  return (
    <section id="education" className="section" aria-label="Education">
      <div className="container">
        <SectionHeading
          eyebrow="Education"
          title="Where I studied."
          className="mb-12"
        />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
          className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-xl)] p-8 max-w-2xl"
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-[var(--radius-lg)] accent-gradient flex items-center justify-center flex-shrink-0">
              <GraduationCap className="w-6 h-6 text-white" aria-hidden="true" />
            </div>
            <div>
              <h3 className="font-display text-xl font-bold tracking-tight">
                B.Tech in Computer Science Engineering
              </h3>
              <p className="text-[var(--color-muted)] mt-1">
                R.V.S. College of Engineering and Technology
              </p>
              <p className="text-sm text-[var(--color-muted)] mt-2">2023 — 2027</p>
              <p className="text-sm text-[var(--color-muted)] mt-4 leading-relaxed max-w-lg">
                Building in parallel with studying — most of what I know comes from shipping real products,
                but college gave me the fundamentals and the network that connects dots I couldn&apos;t have found alone.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
