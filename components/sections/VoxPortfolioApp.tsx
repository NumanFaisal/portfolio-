"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import profileData from "@/data/profile.json";
import experienceData from "@/data/experience.json";
import projectsData from "@/data/projects.json";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";
import { toast } from "@/components/ui/Toaster";

interface Keyframe {
  p: number;
  x: number;
  y: number;
  scale: number;
  rotate: number;
}

function smoothstep(min: number, max: number, value: number) {
  const x = Math.max(0, Math.min(1, (value - min) / (max - min)));
  return x * x * (3 - 2 * x);
}

function interpolateKeyframes(keyframes: Keyframe[], p: number, isMobile: boolean) {
  if (!keyframes || keyframes.length === 0) return { x: 0, y: 0, scale: 1, rotate: 0 };
  if (p <= keyframes[0].p) {
    const k = keyframes[0];
    return {
      x: isMobile ? k.x * 0.35 : k.x,
      y: isMobile ? k.y * 0.35 : k.y,
      scale: isMobile ? 1 + (k.scale - 1) * 0.35 : k.scale,
      rotate: isMobile ? k.rotate * 0.35 : k.rotate,
    };
  }
  const last = keyframes[keyframes.length - 1];
  if (p >= last.p) {
    return {
      x: isMobile ? last.x * 0.35 : last.x,
      y: isMobile ? last.y * 0.35 : last.y,
      scale: isMobile ? 1 + (last.scale - 1) * 0.35 : last.scale,
      rotate: isMobile ? last.rotate * 0.35 : last.rotate,
    };
  }

  for (let i = 0; i < keyframes.length - 1; i++) {
    const k1 = keyframes[i];
    const k2 = keyframes[i + 1];
    if (p >= k1.p && p <= k2.p) {
      const t = smoothstep(k1.p, k2.p, p);
      let x = k1.x + (k2.x - k1.x) * t;
      let y = k1.y + (k2.y - k1.y) * t;
      let scale = k1.scale + (k2.scale - k1.scale) * t;
      let rotate = k1.rotate + (k2.rotate - k1.rotate) * t;
      if (isMobile) {
        x *= 0.35;
        y *= 0.35;
        scale = 1 + (scale - 1) * 0.35;
        rotate *= 0.35;
      }
      return { x, y, scale, rotate };
    }
  }
  return { x: 0, y: 0, scale: 1, rotate: 0 };
}

export function VoxPortfolioApp() {
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  const cameraRefs = useRef<(HTMLDivElement | null)[]>([]);
  const pValuesRef = useRef<number[]>([0, 0, 0, 0, 0, 0, 0]);

  // Form state
  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formMsg, setFormMsg] = useState("");
  const [formStatus, setFormStatus] = useState<"idle" | "loading" | "success">("idle");

  const cameraConfigs: Keyframe[][] = [
    // 0: Title card
    [
      { p: 0.0, x: 0, y: 0, scale: 1, rotate: 0 },
      { p: 0.5, x: 2, y: -2, scale: 1.05, rotate: 0.4 },
      { p: 1.0, x: 0, y: 0, scale: 1, rotate: 0 },
    ],
    // 1: Wiimo Shipped
    [
      { p: 0.0, x: 0, y: 0, scale: 1, rotate: 0 },
      { p: 0.25, x: 0, y: 8, scale: 1.15, rotate: -0.5 },
      { p: 0.65, x: -5, y: -10, scale: 1.25, rotate: 0.5 },
      { p: 0.9, x: 0, y: 0, scale: 1.1, rotate: 0 },
      { p: 1.0, x: 0, y: 0, scale: 1, rotate: 0 },
    ],
    // 2: Built Projects
    [
      { p: 0.0, x: 0, y: 0, scale: 1, rotate: 0 },
      { p: 0.35, x: -8, y: 6, scale: 1.08, rotate: -1 },
      { p: 0.75, x: 8, y: -6, scale: 1.08, rotate: 1 },
      { p: 1.0, x: 0, y: 0, scale: 1, rotate: 0 },
    ],
    // 3: The Path (Timeline)
    [
      { p: 0.0, x: 0, y: 0, scale: 1, rotate: 0 },
      { p: 0.5, x: 0, y: 0, scale: 1.02, rotate: 0 },
      { p: 1.0, x: 0, y: 0, scale: 1, rotate: 0 },
    ],
    // 4: Map & Roots (zooms into Jamshedpur / Eastern India on scroll)
    [
      { p: 0.0, x: 0, y: 0, scale: 1, rotate: 0 },
      { p: 0.25, x: 0, y: 0, scale: 1.02, rotate: 0 },
      { p: 0.5, x: -5, y: -2, scale: 1.32, rotate: -0.4 },
      { p: 0.75, x: -5, y: -2, scale: 1.32, rotate: -0.4 },
      { p: 1.0, x: 0, y: 0, scale: 1, rotate: 0 },
    ],
    // 5: Skills & Education
    [
      { p: 0.0, x: 0, y: 0, scale: 1, rotate: 0 },
      { p: 0.5, x: -3, y: 4, scale: 1.06, rotate: 0.5 },
      { p: 1.0, x: 0, y: 0, scale: 1, rotate: 0 },
    ],
    // 6: Contact & End
    [
      { p: 0.0, x: 0, y: 0, scale: 1, rotate: 0 },
      { p: 1.0, x: 0, y: 0, scale: 1, rotate: 0 },
    ],
  ];

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      sectionRefs.current.forEach((sec) => {
        if (sec) sec.style.setProperty("--p", "1");
      });
      return;
    }

    let lastTime = performance.now();
    let animId: number;
    let isMobile = window.innerWidth <= 768;

    const onResize = () => {
      isMobile = window.innerWidth <= 768;
    };
    window.addEventListener("resize", onResize, { passive: true });

    const loop = (currentTime: number) => {
      const dt = Math.min((currentTime - lastTime) / 1000, 0.1);
      lastTime = currentTime;

      const vh = window.innerHeight;
      const scrollY = window.scrollY;

      sectionRefs.current.forEach((sec, idx) => {
        if (!sec) return;
        const rect = sec.getBoundingClientRect();
        const top = rect.top + scrollY;
        const height = sec.offsetHeight;

        if (rect.bottom < -vh || rect.top > vh * 2) {
          return;
        }

        const scrollDistance = Math.max(1, height - vh);
        const currentScroll = Math.max(0, scrollY - top);
        const targetP = Math.min(Math.max(currentScroll / scrollDistance, 0), 1);

        const prevP = pValuesRef.current[idx] || 0;
        const nextP = prevP + (targetP - prevP) * (1 - Math.exp(-dt * 9));

        if (Math.abs(nextP - prevP) > 0.0004 || targetP === 0 || targetP === 1) {
          pValuesRef.current[idx] = nextP;
          sec.style.setProperty("--p", nextP.toFixed(4));

          const cam = cameraRefs.current[idx];
          if (cam && cameraConfigs[idx]) {
            const { x, y, scale, rotate } = interpolateKeyframes(cameraConfigs[idx], nextP, isMobile);
            cam.style.transform = `translate3d(${x}%, ${y}%, 0) scale(${scale}) rotate(${rotate}deg)`;
          }

          // Timeline sideways pan for beat 3
          if (idx === 3 && !prefersReduced) {
            const track = sec.querySelector("[data-timeline-board]") as HTMLElement;
            if (track) {
              const maxPan = isMobile ? 540 : 700;
              const panX = -nextP * maxPan;
              track.style.transform = `translate3d(${panX}px, 0, 0)`;
            }
          }
        }
      });

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName || !formEmail || !formMsg) {
      toast("Please fill out all fields.", "error");
      return;
    }
    setFormStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: formName, email: formEmail, message: formMsg, _honey: "" }),
      });
      if (!res.ok) throw new Error();
      setFormStatus("success");
      setFormName("");
      setFormEmail("");
      setFormMsg("");
      toast("Message sent successfully!", "success");
    } catch {
      setFormStatus("idle");
      toast("Error sending message. Please try email directly.", "error");
    }
  };

  const wiimo = projectsData.find((p) => p.id === "wiimo") ?? projectsData[0];
  const otherProjects = projectsData.filter((p) => p.id !== "wiimo");
  const chronologicalExp = [...experienceData].reverse();

  return (
    <div className="relative">
      {/* SVG Filters for 12fps texture boil */}
      <svg className="defs" aria-hidden="true">
        <filter id="vox-boil">
          <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="2" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="3" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </svg>

      {/* Persistent Nav */}
      <Link href="/" className="homeLink" aria-label="Numan Faisal">
        Numan Faisal
      </Link>

      <nav className="navPill" aria-label="Chapter quick navigation">
        <a href="#shipped">01 Shipped</a>
        <a href="#built">02 Built</a>
        <a href="#path">03 Path</a>
        <a href="#roots">04 Roots</a>
        <a href="#skills">05 Toolkit</a>
        <a href="#contact">06 Contact</a>
      </nav>

      {/* =========================================================================
          BEAT 0: OPENING / TITLE CARD
          ========================================================================= */}
      <section
        ref={(el) => { sectionRefs.current[0] = el; }}
        className="beat"
        style={{ ["--len" as string]: 2.5 }}
        aria-label="Title"
      >
        <div className="stage">
          <div ref={(el) => { cameraRefs.current[0] = el; }} className="camera">
            {/* Torn color strips behind cutout */}
            <div className="absolute right-[4vw] top-[30%] w-[36vw] max-w-[480px] pointer-events-none -z-10">
              <span
                className="torn"
                style={{
                  ["--c" as string]: "var(--color-learn)",
                  ["--r" as string]: "-2deg",
                  ["--d" as string]: "0.2s",
                }}
              />
              <span
                className="torn"
                style={{
                  ["--c" as string]: "var(--color-build)",
                  ["--r" as string]: "1.5deg",
                  ["--d" as string]: "0.35s",
                }}
              />
              <span
                className="torn"
                style={{
                  ["--c" as string]: "var(--color-studio)",
                  ["--r" as string]: "-1deg",
                  ["--d" as string]: "0.5s",
                }}
              />
            </div>

            {/* Left Content Card */}
            <div
              className="k relative z-10 max-w-[700px] w-[86vw] ml-[6vw] justify-self-start grid gap-3"
              style={{ ["--a" as string]: 0.05, ["--b" as string]: 0.35 }}
            >
              <div
                className="chyron"
                style={{ rotate: "-2deg" }}
              >
                PORTFOLIO · <b>2026</b>
              </div>

              <h1 className="font-serif-display text-[clamp(32px,4.2vw,58px)] font-normal leading-[0.96] tracking-[-0.035em]">
                I build{" "}
                <span className="hlOpen">AI products</span>
                <br />
                that ship.
              </h1>

              <p className="max-w-[460px] text-[var(--color-ink-soft)] text-[clamp(14px,1.1vw,16px)] leading-[1.45]">
                Currently powering <strong className="text-[var(--color-studio)]">Wiimo</strong>, a
                production AI voice ordering agent running live across restaurant chains in the Gulf
                market.
              </p>

              {/* Verified Metrics Strip on Hero */}
              <div className="flex items-center gap-5 py-1.5 border-y border-[var(--color-border)] max-w-sm my-0.5">
                {profileData.stats.slice(0, 3).map((st) => (
                  <div key={st.label}>
                    <div className="font-serif text-xl sm:text-2xl font-bold text-[var(--color-studio)] leading-none">
                      {st.value}{st.suffix}
                    </div>
                    <div className="font-mono text-[9px] uppercase text-[var(--color-ink-soft)] mt-0.5">
                      {st.label}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-1">
                <a
                  href="#shipped"
                  className="bg-[var(--color-studio)] text-white px-4 py-2 rounded-[4px] font-semibold text-[13.5px] shadow-[0_6px_14px_-8px_rgba(239,59,45,0.45)] hover:-translate-y-0.5 transition-transform"
                >
                  See my work ↓
                </a>
                <a
                  href="#contact"
                  className="bg-white text-[var(--color-ink)] border border-[rgba(17,17,17,0.14)] px-4 py-2 rounded-[4px] font-semibold text-[13.5px] shadow-[0_4px_12px_-6px_rgba(0,0,0,0.2)] hover:-translate-y-0.5 transition-transform"
                >
                  Say hi
                </a>
                <Link
                  href="/resume"
                  className="font-mono text-[11px] uppercase tracking-wider text-[var(--color-build)] hover:underline ml-1"
                >
                  Resume PDF ↗
                </Link>
              </div>
            </div>

            {/* Halftone Cutout Portrait */}
            <div
              className="k absolute top-1/2 right-[6vw] -translate-y-1/2 w-[min(24vw,250px)] z-10"
              style={{ ["--a" as string]: 0.1, ["--b" as string]: 0.45, ["--r" as string]: "3deg" }}
            >
              <div className="relative">
                <div
                  className="tapeTop"
                  style={{ ["--tw" as string]: "90px", ["--tr" as string]: "-3deg" }}
                  aria-hidden="true"
                />
                <img
                  src="/vox/cutout.webp"
                  alt="Numan Faisal"
                  className="w-full h-auto drop-shadow-[0_16px_20px_rgba(0,0,0,0.2)]"
                />
              </div>
            </div>

            {/* Scroll Cue */}
            <div className="absolute bottom-[3.5vh] left-1/2 -translate-x-1/2 font-mono text-[12px] uppercase tracking-[0.12em] opacity-80 pointer-events-none">
              Scroll to explore ↓
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          BEAT 1: CHAPTER 01 — SHIPPED (WIIMO)
          ========================================================================= */}
      <section
        id="shipped"
        ref={(el) => { sectionRefs.current[1] = el; }}
        className="beat"
        style={{ ["--len" as string]: 3.5 }}
        aria-label="Chapter 1: Shipped"
      >
        <div className="stage">
          {/* Chapter Opening Slide-away Card */}
          <div
            className="chapterCard"
            style={{
              ["--c" as string]: "var(--color-studio)",
              ["--t" as string]: "clamp(0, (var(--p) - 0.06) / (0.16 - 0.06), 1)",
            }}
          >
            <span className="chapterNo">CHAPTER 01</span>
            <h2 className="chapterTitle">Shipped</h2>
            <div className="chapterEdge" />
          </div>

          <div ref={(el) => { cameraRefs.current[1] = el; }} className="camera">
            {/* Taped Document Card */}
            <article className="doc k" style={{ ["--a" as string]: 0.04, ["--b" as string]: 0.22, ["--r" as string]: "-1.2deg" }}>
              <div className="pin" aria-hidden="true" />
              <div className="tapeTop" style={{ ["--tw" as string]: "110px", ["--tr" as string]: "1deg" }} aria-hidden="true" />

              <div className="docHead">
                <span>CASE FILE: {wiimo.title.toUpperCase()}</span>
                <span>STATUS: {wiimo.status.toUpperCase()}</span>
                <span>MARKET: GULF REGION</span>
              </div>

              <div className="docTitle">
                PRODUCTION AI VOICE ORDERING AGENT
              </div>

              {/* Visual Project Screenshot Preview */}
              <div className="relative w-full aspect-[21/9] max-h-[140px] my-2 rounded-[3px] overflow-hidden border border-[var(--color-border)] shadow-sm">
                <img
                  src="/images/projects/wiimo.svg"
                  alt="Wiimo system preview"
                  className="w-full h-full object-cover"
                />
              </div>

              <p className="text-[clamp(16px,1.5vw,22px)] font-serif leading-[1.3] text-[var(--color-ink)] mb-3">
                Handling{" "}
                <span className="hl" style={{ ["--a" as string]: 0.25, ["--b" as string]: 0.55 }}>
                  live customer voice orders
                </span>{" "}
                in Gulf restaurant chains with multi-lingual intent parsing under acoustic noise.
              </p>

              {/* Bold Stat with Marker Circle */}
              {profileData.stats && profileData.stats.length > 0 && (
                <div
                  className="k my-2.5 p-3 bg-[#F5F2EA] border border-[var(--color-border)] rounded-[4px] flex items-center justify-between"
                  style={{ ["--a" as string]: 0.5, ["--b" as string]: 0.8, ["--r" as string]: "0.5deg" }}
                >
                  <div className="relative inline-block pr-8">
                    <span className="font-serif-display text-4xl sm:text-5xl text-[var(--color-studio)] leading-none">
                      {profileData.stats[0].value}
                      {profileData.stats[0].suffix}
                    </span>
                    <span
                      className="circleMarker"
                      style={{ ["--a" as string]: 0.65, ["--b" as string]: 0.95 }}
                      aria-hidden="true"
                    />
                  </div>

                  <div>
                    <div className="font-mono text-[11px] uppercase font-bold tracking-wider">
                      {profileData.stats[0].label}
                    </div>
                    <div className="text-[12px] text-[var(--color-ink-soft)]">
                      Production systems verified in live operations.
                    </div>
                  </div>
                </div>
              )}

              <div className="flex flex-wrap gap-1.5 my-2.5">
                {wiimo.tech.map((t) => (
                  <span
                    key={t}
                    className="font-mono text-[10px] bg-[#EBE5D8] px-2 py-0.5 rounded-[2px] font-semibold text-[var(--color-ink)]"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="docFoot flex items-center justify-between pt-2.5 mt-2 border-t border-[var(--color-border)]">
                <Link
                  href={`/projects/${wiimo.slug}`}
                  className="text-[var(--color-studio)] hover:underline font-bold"
                >
                  Read Architecture Case Study →
                </Link>
                <span>AWS · FASTAPI · WHISPER · WEBSOCKETS</span>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* =========================================================================
          BEAT 2: CHAPTER 02 — BUILT (PROJECTS)
          ========================================================================= */}
      <section
        id="built"
        ref={(el) => { sectionRefs.current[2] = el; }}
        className="beat"
        style={{ ["--len" as string]: 3.5 }}
        aria-label="Chapter 2: Built"
      >
        <div className="stage">
          <div
            className="chapterCard"
            style={{
              ["--c" as string]: "var(--color-build)",
              ["--t" as string]: "clamp(0, (var(--p) - 0.06) / (0.16 - 0.06), 1)",
            }}
          >
            <span className="chapterNo">CHAPTER 02</span>
            <h2 className="chapterTitle">Built</h2>
            <div className="chapterEdge" />
          </div>

          <div ref={(el) => { cameraRefs.current[2] = el; }} className="camera">
            <div className="clippingsGrid">
              {otherProjects.slice(0, 4).map((p, idx) => {
                const tapes = ["/vox/tape-1.webp", "/vox/tape-2.webp", "/vox/tape-3.webp"];
                const tapeImg = tapes[idx % 3];
                const rotations = ["-1.5deg", "1.2deg", "-0.8deg", "1.5deg"];
                const startA = 0.04 + idx * 0.05;
                const endB = startA + 0.16;

                return (
                  <article
                    key={p.id}
                    className="clippingCard k"
                    style={{
                      ["--a" as string]: startA,
                      ["--b" as string]: endB,
                      ["--r" as string]: rotations[idx % rotations.length],
                    }}
                  >
                    <div
                      className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-24 h-7 bg-contain bg-no-repeat pointer-events-none z-10"
                      style={{ backgroundImage: `url('${tapeImg}')` }}
                      aria-hidden="true"
                    />
                    <div className="pin" aria-hidden="true" />

                    <div className="flex items-center justify-between mb-1">
                      <span className="font-mono text-[9px] text-[var(--color-build)] uppercase tracking-wider font-bold">
                        {p.tags ? p.tags.slice(0, 2).join(" · ") : "PROJECT"}
                      </span>
                      <span className="font-mono text-[9px] text-[var(--color-ink-soft)] uppercase">
                        {p.status}
                      </span>
                    </div>

                    {/* Screenshot Preview */}
                    <div className="relative w-full aspect-[16/7] max-h-[75px] my-1 rounded-[2px] overflow-hidden border border-[var(--color-border)]">
                      <img
                        src={`/images/projects/${p.slug}.svg`}
                        alt={`${p.title} preview`}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <h3 className="font-serif-display text-lg font-bold tracking-tight leading-tight">
                      {p.title}
                    </h3>

                    <p className="text-[12px] leading-[1.35] text-[var(--color-ink-soft)] line-clamp-2">
                      {p.outcome}
                    </p>

                    <div className="flex flex-wrap gap-1 pt-0.5">
                      {p.tech.slice(0, 3).map((t) => (
                        <span
                          key={t}
                          className="font-mono text-[9px] bg-[#EFECE6] px-1.5 py-0.5 rounded-[2px]"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-1.5 border-t border-[var(--color-border)] mt-1">
                      <Link
                        href={`/projects/${p.slug}`}
                        className="font-mono text-[10px] text-[var(--color-ink)] hover:text-[var(--color-studio)] font-bold"
                      >
                        Case Study →
                      </Link>

                      {p.github && (
                        <a
                          href={p.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[var(--color-ink)] hover:text-[var(--color-studio)]"
                          aria-label={`${p.title} GitHub repo`}
                        >
                          <GithubIcon className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          BEAT 3: CHAPTER 03 — THE PATH (TIMELINE)
          ========================================================================= */}
      <section
        id="path"
        ref={(el) => { sectionRefs.current[3] = el; }}
        className="beat"
        style={{ ["--len" as string]: 2.8 }}
        aria-label="Chapter 3: Path"
      >
        <div className="stage">
          <div
            className="chapterCard"
            style={{
              ["--c" as string]: "var(--color-learn)",
              ["--on" as string]: "var(--color-ink)",
              ["--t" as string]: "clamp(0, (var(--p) - 0.06) / (0.16 - 0.06), 1)",
            }}
          >
            <span className="chapterNo">CHAPTER 03</span>
            <h2 className="chapterTitle">The Path</h2>
            <div className="chapterEdge" />
          </div>

          <div ref={(el) => { cameraRefs.current[3] = el; }} className="camera">
            <div className="timelineWrapper">
              <div
                data-timeline-board="true"
                className="timelineBoard"
                style={{ ["--panels" as string]: chronologicalExp.length }}
              >
                <div className="timelineLine" />

                {chronologicalExp.map((exp, idx) => {
                  const years = ["2024", "2025", "2026"];
                  const yearLabel = years[idx] || exp.start.slice(0, 4);

                  return (
                    <article key={exp.id} className="timelinePanel">
                      <div className="timelineYear">
                        {yearLabel}
                      </div>

                      <div className="timelineCard relative">
                        <div className="pin" aria-hidden="true" />
                        <div className="tapeTop" style={{ ["--tw" as string]: "100px", ["--tr" as string]: "-2deg" }} aria-hidden="true" />

                        <div className="role">
                          {exp.role}
                        </div>
                        <h3 className="font-serif-display text-2xl font-bold mb-1.5">
                          {exp.company}
                        </h3>

                        {/* Bullets list */}
                        <ul className="space-y-1 mb-2.5 text-[12.5px] text-[var(--color-ink)]">
                          {exp.bullets.slice(0, 2).map((b, bi) => (
                            <li key={bi} className="flex gap-1.5">
                              <span className="text-[var(--color-studio)] font-bold">→</span>
                              <span>{b}</span>
                            </li>
                          ))}
                        </ul>

                        <blockquote className="border-l-2 border-[var(--color-studio)] pl-2.5 text-[12px] italic text-[var(--color-ink-soft)] mb-3">
                          &ldquo;{exp.learned}&rdquo;
                        </blockquote>

                        <div className="flex flex-wrap gap-1">
                          {exp.tech.slice(0, 4).map((t) => (
                            <span
                              key={t}
                              className="font-mono text-[9px] bg-[#EFECE6] px-2 py-0.5 rounded-[2px]"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          BEAT 4: CHAPTER 04 — WHERE I'M FROM (MAP & ROOTS)
          ========================================================================= */}
      <section
        id="roots"
        ref={(el) => { sectionRefs.current[4] = el; }}
        className="beat"
        style={{ ["--len" as string]: 2.6 }}
        aria-label="Chapter 4: Where I'm from"
      >
        <div className="stage">
          <div
            className="chapterCard"
            style={{
              ["--c" as string]: "var(--color-ink)",
              ["--on" as string]: "#FFF",
              ["--t" as string]: "clamp(0, (var(--p) - 0.06) / (0.16 - 0.06), 1)",
            }}
          >
            <span className="chapterNo">CHAPTER 04</span>
            <h2 className="chapterTitle">Roots</h2>
            <div className="chapterEdge" />
          </div>

          <div ref={(el) => { cameraRefs.current[4] = el; }} className="camera">
            <div className="w-[90vw] max-w-[800px] flex flex-col items-center text-center">
              {/* Editorial Header */}
              <div className="mb-2.5">
                <span className="font-mono text-[10px] text-[var(--color-studio)] font-bold uppercase tracking-[0.16em] block">
                  ORIGIN · STEEL CAPITAL // EASTERN INDIA
                </span>
                <h3 className="font-serif-display text-2xl sm:text-3xl font-bold tracking-tight">
                  Rooted in Jamshedpur. Shipping to the World.
                </h3>
              </div>

              {/* Authentic Vintage Halftone India Map */}
              <div className="voxMapFrame">
                <img
                  src="/vox/map.webp"
                  alt="Vintage cartographic map of India"
                  className="voxMapImg"
                />

                {/* Coordinates & Technical Markings on Map */}
                <div className="absolute top-2 left-2.5 font-mono text-[8.5px] text-[rgba(17,17,17,0.45)] uppercase tracking-wider font-bold pointer-events-none">
                  SUB-CONTINENT MAP · ED. 2026
                </div>
                <div className="absolute bottom-2 right-2.5 font-mono text-[8.5px] text-[rgba(17,17,17,0.45)] uppercase tracking-wider font-bold pointer-events-none">
                  BASE: JAMSHEDPUR // LAT 22.80°N LON 86.20°E
                </div>

                {/* Jamshedpur Target & Scroll-Driven Pin Marker */}
                <div
                  className="voxMapPinWrapper"
                  style={{
                    ["--t-pin" as string]: "clamp(0, (var(--p) - 0.12) / (0.35 - 0.12), 1)",
                    ["--t-circle" as string]: "clamp(0, (var(--p) - 0.25) / (0.50 - 0.25), 1)",
                  }}
                >
                  {/* Expanding radar ping */}
                  <div className="voxMapRadar radar-ping" />

                  {/* Marker circle drawing around Jamshedpur */}
                  <div className="voxMapMarkerCircle" />

                  {/* Physical Push Pin falling from the sky on scroll */}
                  <div className="voxMapPin" />

                  {/* Red/Black Stamped Badge */}
                  <div className="voxMapTag">
                    <div className="font-mono text-[8.5px] font-bold text-[var(--color-studio)] tracking-wider">
                      BASE OF OPERATIONS
                    </div>
                    <div className="font-sans text-[11.5px] font-extrabold tracking-wide">
                      JAMSHEDPUR, JHARKHAND
                    </div>
                    <div className="font-mono text-[8px] text-[rgba(255,255,255,0.7)]">
                      EASTERN INDIA · LAT 22.80°N LON 86.20°E
                    </div>
                  </div>
                </div>
              </div>

              {/* Context Summary Cards */}
              <div className="grid sm:grid-cols-2 gap-3 max-w-[680px] w-full mt-3 text-left">
                <div className="bg-white/90 border border-[var(--color-border)] p-2.5 rounded-[3px] shadow-sm">
                  <span className="font-mono text-[9px] text-[var(--color-studio)] font-bold uppercase tracking-wider block">
                    FOUNDATION
                  </span>
                  <p className="text-[12px] text-[var(--color-ink-soft)] leading-snug font-serif mt-0.5">
                    Engineering computer science fundamentals from India’s industrial center into production-grade systems.
                  </p>
                </div>
                <div className="bg-white/90 border border-[var(--color-border)] p-2.5 rounded-[3px] shadow-sm">
                  <span className="font-mono text-[9px] text-[var(--color-build)] font-bold uppercase tracking-wider block">
                    GLOBAL SCALE
                  </span>
                  <p className="text-[12px] text-[var(--color-ink-soft)] leading-snug font-serif mt-0.5">
                    Operating across timezones — powering live AI voice agents in restaurant chains across the Gulf.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          BEAT 5: CHAPTER 05 — SKILLS & EDUCATION
          ========================================================================= */}
      <section
        id="skills"
        ref={(el) => { sectionRefs.current[5] = el; }}
        className="beat"
        style={{ ["--len" as string]: 2.4 }}
        aria-label="Chapter 5: Skills and Education"
      >
        <div className="stage">
          <div
            className="chapterCard"
            style={{
              ["--c" as string]: "var(--color-build)",
              ["--t" as string]: "clamp(0, (var(--p) - 0.06) / (0.16 - 0.06), 1)",
            }}
          >
            <span className="chapterNo">CHAPTER 05</span>
            <h2 className="chapterTitle">Toolkit</h2>
            <div className="chapterEdge" />
          </div>

          <div ref={(el) => { cameraRefs.current[5] = el; }} className="camera">
            <div className="max-w-[780px] w-[90vw] grid md:grid-cols-2 gap-4 sm:gap-6 text-left">
              {/* Skills Panel */}
              <article className="doc k !max-h-[64vh] p-3.5 sm:p-4" style={{ ["--a" as string]: 0.04, ["--b" as string]: 0.22 }}>
                <div className="pin" aria-hidden="true" />
                <div className="docHead">
                  <span>SYSTEM TOOLKIT</span>
                  <span>PRODUCTION READY</span>
                </div>
                <h3 className="font-serif-display text-xl font-bold mb-3">Core Competencies</h3>
                <div className="space-y-2.5 text-[13px]">
                  <div>
                    <span className="font-mono text-[10px] text-[var(--color-studio)] block font-bold">AI / ML INFRASTRUCTURE</span>
                    <span className="text-[var(--color-ink-soft)]">OpenAI Whisper, GPT-4o, LangChain, RAG Pipelines, Vector DBs (Pinecone)</span>
                  </div>
                  <div>
                    <span className="font-mono text-[10px] text-[var(--color-build)] block font-bold">BACKEND &amp; REAL-TIME</span>
                    <span className="text-[var(--color-ink-soft)]">Node.js, Python FastAPI, WebSockets, Redis, PostgreSQL, Prisma, Zod</span>
                  </div>
                  <div>
                    <span className="font-mono text-[10px] text-[var(--color-learn)] block font-bold">FRONTEND &amp; MOBILE</span>
                    <span className="text-[var(--color-ink-soft)]">Next.js App Router, React, TypeScript, React Native, Expo, Tailwind CSS</span>
                  </div>
                </div>
              </article>

              {/* Education Panel */}
              <article className="doc k !max-h-[64vh] p-3.5 sm:p-4" style={{ ["--a" as string]: 0.08, ["--b" as string]: 0.28, ["--r" as string]: "1deg" }}>
                <div className="tapeTop" style={{ ["--tw" as string]: "90px", ["--tr" as string]: "-1deg" }} aria-hidden="true" />
                <div className="docHead">
                  <span>ACADEMIC FOUNDATION</span>
                  <span>2023 — 2027</span>
                </div>
                <h3 className="font-serif-display text-xl font-bold mb-1.5">B.Tech in Computer Science</h3>
                <div className="font-mono text-[11px] text-[var(--color-studio)] mb-2 font-semibold">
                  R.V.S. COLLEGE OF ENGINEERING &amp; TECHNOLOGY
                </div>
                <p className="text-[13px] text-[var(--color-ink-soft)] leading-[1.45]">
                  Combining deep foundational computer science theory (data structures, algorithms, distributed systems)
                  with rigorous real-world production engineering.
                </p>
                <div className="mt-3 pt-2.5 border-t border-[var(--color-border)] flex items-center justify-between font-mono text-[10.5px]">
                  <span>CGPA: Active</span>
                  <span>Jamshedpur, India</span>
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          BEAT 6: SAY HI / DOORS / CONTACT
          ========================================================================= */}
      <section
        id="contact"
        ref={(el) => { sectionRefs.current[6] = el; }}
        className="beat"
        style={{ ["--len" as string]: 2.2 }}
        aria-label="Contact and Doors"
      >
        <div className="stage">
          <div ref={(el) => { cameraRefs.current[6] = el; }} className="camera">
            <div className="max-w-[700px] w-[90vw] grid gap-4 sm:gap-5 text-center">
              <div className="k" style={{ ["--a" as string]: 0.04, ["--b" as string]: 0.22 }}>
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--color-studio)] font-bold block mb-1">
                  THE DOORS
                </span>
                <h2 className="font-serif-display text-[clamp(32px,4.2vw,56px)] font-normal leading-[0.95] tracking-[-0.035em]">
                  One person. A few worlds.
                </h2>
              </div>

              {/* Three Torn Doors */}
              <div className="doorsGrid mx-auto max-w-[620px]">
                <a
                  href="#shipped"
                  className="doorLink k !py-2.5 sm:!py-3"
                  style={{
                    ["--c" as string]: "var(--color-studio)",
                    ["--a" as string]: 0.08,
                    ["--b" as string]: 0.26,
                    ["--r" as string]: "-1.5deg",
                  }}
                >
                  <b>Projects</b>
                  <span>01 Replay work →</span>
                </a>

                <Link
                  href="/resume"
                  className="doorLink k !py-2.5 sm:!py-3"
                  style={{
                    ["--c" as string]: "var(--color-learn)",
                    ["--on" as string]: "var(--color-ink)",
                    ["--a" as string]: 0.12,
                    ["--b" as string]: 0.30,
                    ["--r" as string]: "0.8deg",
                  }}
                >
                  <b>Resume</b>
                  <span>02 Read background →</span>
                </Link>

                <a
                  href={`mailto:${profileData.email}`}
                  className="doorLink k !py-2.5 sm:!py-3"
                  style={{
                    ["--c" as string]: "var(--color-build)",
                    ["--a" as string]: 0.16,
                    ["--b" as string]: 0.34,
                    ["--r" as string]: "1.8deg",
                  }}
                >
                  <b>Say hi</b>
                  <span>03 Send note directly →</span>
                </a>
              </div>

              {/* Direct Form Box */}
              <div
                className="k doc mx-auto p-4 text-left max-w-[480px] !max-h-[50vh]"
                style={{ ["--a" as string]: 0.14, ["--b" as string]: 0.35, ["--r" as string]: "-0.5deg" }}
              >
                <div className="docHead">
                  <span>DISPATCH MESSAGE</span>
                  <span>RESPONSE: &lt; 24H</span>
                </div>

                {formStatus === "success" ? (
                  <div className="py-3 text-center">
                    <span className="font-serif-display text-xl text-[var(--color-studio)] block mb-1">
                      Note Dispatched!
                    </span>
                    <p className="text-[13px] text-[var(--color-ink-soft)]">
                      I&apos;ll be in touch with you shortly.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleContactSubmit} className="flex flex-col gap-2.5">
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        placeholder="Your name"
                        value={formName}
                        onChange={(e) => setFormName(e.target.value)}
                        className="w-full px-2.5 py-1.5 bg-[#FAF9F6] border border-[var(--color-border)] rounded-[3px] text-[13px] font-sans focus:outline-none focus:border-[var(--color-studio)]"
                      />
                      <input
                        type="email"
                        placeholder="Your email"
                        value={formEmail}
                        onChange={(e) => setFormEmail(e.target.value)}
                        className="w-full px-2.5 py-1.5 bg-[#FAF9F6] border border-[var(--color-border)] rounded-[3px] text-[13px] font-sans focus:outline-none focus:border-[var(--color-studio)]"
                      />
                    </div>
                    <textarea
                      rows={2}
                      placeholder="What are you building?"
                      value={formMsg}
                      onChange={(e) => setFormMsg(e.target.value)}
                      className="w-full px-2.5 py-1.5 bg-[#FAF9F6] border border-[var(--color-border)] rounded-[3px] text-[13px] font-sans focus:outline-none focus:border-[var(--color-studio)] resize-none"
                    />
                    <button
                      type="submit"
                      disabled={formStatus === "loading"}
                      className="bg-[var(--color-studio)] text-white py-1.5 px-3.5 rounded-[3px] font-mono text-[11px] uppercase font-bold self-start hover:opacity-90 transition-opacity"
                    >
                      {formStatus === "loading" ? "Dispatching..." : "Send Note →"}
                    </button>
                  </form>
                )}

                {/* Footer links */}
                <div className="flex items-center justify-between pt-2.5 border-t border-[var(--color-border)] mt-2.5">
                  <div className="flex items-center gap-3">
                    <a
                      href={profileData.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[var(--color-ink)] hover:text-[var(--color-studio)]"
                      aria-label="GitHub"
                    >
                      <GithubIcon className="w-4 h-4" />
                    </a>
                    <a
                      href={profileData.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[var(--color-ink)] hover:text-[var(--color-studio)]"
                      aria-label="LinkedIn"
                    >
                      <LinkedinIcon className="w-4 h-4" />
                    </a>
                  </div>
                  <span className="font-mono text-[10.5px] text-[var(--color-ink-soft)]">
                    {profileData.email}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
