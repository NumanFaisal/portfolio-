"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Profile } from "@/data/schemas/profile";

function Ticker({ text }: { text: string }) {
  return (
    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--color-accent-dim)] border border-[var(--color-accent)]/20 text-sm text-[var(--color-accent)]">
      <span className="w-2 h-2 rounded-full bg-[var(--color-accent)] animate-pulse" aria-hidden="true" />
      <span className="font-medium">Currently building: </span>
      <span>{text}</span>
    </div>
  );
}

interface AboutProps {
  profile: Profile;
}

export function About({ profile }: AboutProps) {
  return (
    <section id="about" className="section" aria-label="About Numan Faisal">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
            className="relative"
          >
            <div className="relative w-full max-w-sm mx-auto aspect-[4/5] rounded-[var(--radius-xl)] overflow-hidden bg-[var(--color-surface)] border border-[var(--color-border)]">
              {profile.photo !== "/images/numan.jpg" ? (
                <Image
                  src={profile.photo}
                  alt="Numan Faisal"
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-24 h-24 rounded-full accent-gradient mx-auto mb-4 flex items-center justify-center text-white text-3xl font-bold font-display">
                      NF
                    </div>
                    <p className="text-xs text-[var(--color-muted)]">Photo coming soon</p>
                  </div>
                </div>
              )}
            </div>
            {/* Decorative glow */}
            <div
              className="absolute -inset-4 rounded-[var(--radius-xl)] bg-[var(--color-accent)] opacity-5 blur-3xl -z-10"
              aria-hidden="true"
            />
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
            className="flex flex-col gap-6"
          >
            <SectionHeading
              eyebrow="About me"
              title="Builder at heart."
            />

            <div className="space-y-4 text-[var(--color-muted)] leading-relaxed">
              {profile.bio.split(". ").reduce<string[][]>((acc, sentence, i) => {
                const paraIndex = Math.floor(i / 2);
                if (!acc[paraIndex]) acc[paraIndex] = [];
                acc[paraIndex].push(sentence);
                return acc;
              }, []).map((sentences, i) => (
                <p key={i}>{sentences.join(". ")}{sentences.length > 0 && !sentences[sentences.length - 1].endsWith(".") ? "." : ""}</p>
              ))}
            </div>

            <div className="pt-2">
              <Ticker text={profile.currently_building} />
            </div>

            <div className="flex gap-4">
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-[var(--color-muted)] hover:text-[var(--color-text)] transition-colors underline underline-offset-4"
              >
                GitHub
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-[var(--color-muted)] hover:text-[var(--color-text)] transition-colors underline underline-offset-4"
              >
                LinkedIn
              </a>
              <a
                href={profile.resume_pdf}
                className="text-sm font-medium text-[var(--color-accent)] hover:text-[var(--color-accent-glow)] transition-colors underline underline-offset-4"
              >
                Download resume
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
