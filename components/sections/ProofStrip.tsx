"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import type { Profile } from "@/data/schemas/profile";

function CountUp({ value, suffix }: { value: number; suffix: string }) {
  const [current, setCurrent] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1500;
    const startTime = performance.now();

    function update(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      start = Math.round(eased * value);
      setCurrent(start);
      if (progress < 1) requestAnimationFrame(update);
    }

    requestAnimationFrame(update);
  }, [inView, value]);

  return (
    <span ref={ref}>
      {current}
      {suffix}
    </span>
  );
}

const techLogos = [
  { name: "Next.js", color: "#ffffff" },
  { name: "React", color: "#61DAFB" },
  { name: "TypeScript", color: "#3178C6" },
  { name: "Python", color: "#3776AB" },
  { name: "OpenAI", color: "#74AA9C" },
  { name: "Node.js", color: "#339933" },
  { name: "PostgreSQL", color: "#336791" },
  { name: "Docker", color: "#2496ED" },
];

interface ProofStripProps {
  profile: Profile;
}

export function ProofStrip({ profile }: ProofStripProps) {
  return (
    <section
      className="py-16 border-y border-[var(--color-border)] overflow-hidden"
      aria-label="Stats and technologies"
    >
      <div className="container">
        {/* Live in production tag */}
        <div className="flex justify-center mb-12">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium glass border border-green-500/20 text-green-400">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" aria-hidden="true" />
            Live in production
          </span>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {profile.stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
              className="text-center"
            >
              <div className="font-display text-4xl sm:text-5xl font-bold gradient-text">
                <CountUp value={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-sm text-[var(--color-muted)] mt-2 leading-tight">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tech logos — infinite scroll */}
        <div className="relative">
          <div className="flex gap-10 items-center animate-marquee whitespace-nowrap">
            {[...techLogos, ...techLogos].map((tech, i) => (
              <span
                key={i}
                className="text-sm font-medium text-[var(--color-muted)] flex-shrink-0 px-1"
              >
                {tech.name}
              </span>
            ))}
          </div>
          {/* Fade masks */}
          <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[var(--color-bg)] to-transparent pointer-events-none" aria-hidden="true" />
          <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[var(--color-bg)] to-transparent pointer-events-none" aria-hidden="true" />
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
      `}</style>
    </section>
  );
}
