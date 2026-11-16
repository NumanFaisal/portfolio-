"use client";

import { useEffect, useState } from "react";
import { motion, type Variants } from "framer-motion";
import { ArrowDown, Mail } from "lucide-react";
import { getTimeGreeting } from "@/lib/utils";
import dynamic from "next/dynamic";

const HeroCanvas = dynamic(() => import("@/components/three/HeroCanvas"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-48 h-48 rounded-full bg-[var(--color-surface)] animate-pulse" />
    </div>
  ),
});

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.3 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.19, 1, 0.22, 1] as [number, number, number, number],
    },
  },
};

export function Hero() {
  const [greeting, setGreeting] = useState("");
  const [showCanvas, setShowCanvas] = useState(false);

  useEffect(() => {
    setGreeting(getTimeGreeting());
    // Load 3D canvas after first paint
    const id = requestAnimationFrame(() => setShowCanvas(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden pt-16"
      aria-label="Hero — introduction"
    >
      {/* Background gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(124,92,255,0.12) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="container relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center min-h-[calc(100vh-4rem)]">
          {/* Left — text */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="flex flex-col gap-6 py-20 lg:py-0"
          >
            {/* Greeting + badge row */}
            <motion.div variants={item} className="flex items-center gap-4 flex-wrap">
              {greeting && (
                <span className="text-sm text-[var(--color-muted)] font-medium">
                  {greeting} 👋
                </span>
              )}
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-green-500/10 text-green-400 border border-green-500/20">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" aria-hidden="true" />
                Open to work
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={item}
              className="font-display text-5xl sm:text-6xl xl:text-7xl font-bold tracking-tight leading-[1.05]"
            >
              I build{" "}
              <span className="gradient-text">AI products</span>
              <br />
              that ship.
            </motion.h1>

            {/* Sub */}
            <motion.p
              variants={item}
              className="text-lg sm:text-xl text-[var(--color-muted)] max-w-lg leading-relaxed"
            >
              Currently powering{" "}
              <span className="text-[var(--color-text)] font-medium">production AI voice ordering</span>{" "}
              for Gulf restaurants with Wiimo — real orders, real customers, every day.
            </motion.p>

            {/* CTAs */}
            <motion.div variants={item} className="flex flex-wrap items-center gap-4">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-[var(--radius-full)] font-semibold accent-gradient text-white hover:opacity-90 transition-opacity shadow-[var(--shadow-accent)]"
              >
                View work
                <ArrowDown className="w-4 h-4" />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-[var(--radius-full)] font-semibold border border-[var(--color-border)] text-[var(--color-text)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-all"
              >
                <Mail className="w-4 h-4" />
                Let&apos;s talk
              </a>
              <a
                href="/story"
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-[var(--color-muted)] hover:text-[var(--color-text)] transition-colors border-b border-dashed border-[var(--color-muted)]/40 hover:border-[var(--color-accent)]"
              >
                <span className="w-2 h-2 rounded-full bg-[var(--color-accent)] animate-pulse" aria-hidden="true" />
                Watch the story ↗
              </a>
            </motion.div>

            {/* Scroll hint */}
            <motion.div
              variants={item}
              className="flex items-center gap-2 text-sm text-[var(--color-muted)] mt-4"
            >
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <ArrowDown className="w-4 h-4" />
              </motion.div>
              <span>Scroll to explore</span>
            </motion.div>
          </motion.div>

          {/* Right — 3D canvas */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
            className="hidden lg:flex items-center justify-center h-[560px] relative"
            aria-hidden="true"
          >
            {showCanvas ? (
              <HeroCanvas />
            ) : (
              <div className="w-64 h-64 rounded-full bg-[var(--color-surface)] animate-pulse" />
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
