"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import profileData from "@/data/profile.json";
import experienceData from "@/data/experience.json";
import projectsData from "@/data/projects.json";

function d(a: number, b: number, extra?: Record<string, any>): React.CSSProperties {
  return { "--a": a, "--b": b, ...extra } as React.CSSProperties;
}

function o(num: number) {
  return Intl.NumberFormat("en", { notation: "compact", maximumFractionDigits: 1 }).format(num);
}

function getTransform(keys: number[][], p: number, mult = 1) {
  if (!keys || keys.length === 0) return "none";
  let s = keys[0];
  let t = keys[keys.length - 1];

  for (let i = 0; i < keys.length - 1; i++) {
    if (p >= keys[i][0] && p <= keys[i + 1][0]) {
      s = keys[i];
      t = keys[i + 1];
      break;
    }
  }

  if (p <= keys[0][0]) t = s = keys[0];
  if (p >= keys[keys.length - 1][0]) s = t = keys[keys.length - 1];

  const progressBetween = t[0] === s[0] ? 1 : (p - s[0]) / (t[0] - s[0]);
  const smooth = progressBetween * progressBetween * (3 - 2 * progressBetween);
  const lerp = (idx: number) => s[idx] + (t[idx] - s[idx]) * smooth;

  return `translate(${(lerp(1) * mult).toFixed(3)}%, ${(lerp(2) * mult).toFixed(3)}%) scale(${(
    1 +
    (lerp(3) - 1) * mult
  ).toFixed(4)}) rotate(${(lerp(4) * mult).toFixed(3)}deg)`;
}

function Chapter({
  len,
  n,
  title,
  world,
  children,
}: {
  len: number;
  n: string;
  title: string;
  world: "tech" | "build" | "studio" | "learn";
  children: React.ReactNode;
}) {
  return (
    <section
      className="beat"
      data-beat=""
      aria-label={`Chapter ${n}: ${title}`}
      style={{
        ["--len" as string]: len,
        ["--c" as string]: `var(--color-${world})`,
        ["--on" as string]: world === "learn" ? "var(--color-ink)" : "#fff",
      }}
    >
      <div className="stage">
        {children}
        <div className="chapter k" style={d(0.06, 0.14)}>
          <p className="chapterNo">{n}</p>
          <h2 className="chapterTitle">{title}</h2>
          <i className="chapterEdge" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}

function Hl({ a, b, children }: { a: number; b: number; children: React.ReactNode }) {
  return (
    <mark className="hl k" style={d(a, b)}>
      {children}
    </mark>
  );
}

export function VoxPortfolioApp() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = containerRef.current;
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Enable JS progressive enhancement for Vox beats
    document.documentElement.classList.add("js");

    const beats = [...root.querySelectorAll<HTMLElement>("[data-beat]")].map((node) => ({
      node,
      p: -1,
    }));

    const cams = [...root.querySelectorAll<HTMLElement>("[data-cam]")].map((node) => ({
      node,
      beat: beats.find((b) => b.node === node.closest("[data-beat]"))!,
      keys: JSON.parse(node.dataset.cam || "[]"),
      p: -1,
      pan: node.hasAttribute("data-pan"),
    }));

    const turb = root.querySelector("feTurbulence");
    let mult = window.innerWidth < 820 ? 0.35 : 1;
    const onResize = () => {
      mult = window.innerWidth < 820 ? 0.35 : 1;
      cams.forEach((c) => (c.p = -1));
    };
    window.addEventListener("resize", onResize, { passive: true });

    let rafId = 0;
    let lastTime = performance.now();
    let lastBoil = -1000;
    let boilCount = 0;

    const loop = (currentTime: number) => {
      rafId = requestAnimationFrame(loop);
      const dt = Math.min(0.1, (currentTime - lastTime) / 1000);
      lastTime = currentTime;
      const decay = 1 - Math.exp(-(9 * dt));
      const vh = window.innerHeight;

      for (const beat of beats) {
        const rect = beat.node.getBoundingClientRect();
        if (rect.bottom < -vh || rect.top > 2 * vh) continue;
        const totalScrollable = rect.height - vh;
        const progress = Math.min(
          1,
          Math.max(0, totalScrollable > 0 ? -rect.top / totalScrollable : 1 - rect.top / vh)
        );
        const nextP =
          beat.p < 0 || Math.abs(progress - beat.p) < 0.0004
            ? progress
            : beat.p + (progress - beat.p) * decay;

        if (nextP !== beat.p) {
          beat.p = nextP;
          beat.node.style.setProperty("--p", nextP.toFixed(4));
        }
      }

      for (const cam of cams) {
        if (!cam.beat || cam.beat.p < 0 || cam.p === cam.beat.p) continue;
        cam.p = cam.beat.p;
        cam.node.style.transform = getTransform(cam.keys, cam.p, cam.pan ? 1 : mult);
      }

      if (currentTime - lastBoil >= 81.33) {
        lastBoil = currentTime;
        if (++boilCount % 2 === 0 && turb) {
          turb.setAttribute("seed", String(boilCount % 7));
        }
        root.style.setProperty("--grain-x", `${(37 * boilCount) % 240}px`);
        root.style.setProperty("--grain-y", `${(91 * boilCount) % 240}px`);
      }
    };

    rafId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const timelineJobs = [
    {
      years: "2026",
      company: "Creative Homme",
      note: "LIVE IN BAHRAIN",
      role: "Trainee Software Engineer · Wiimo",
      summary:
        "Shipped a production AI voice ordering agent live in the Bahrain/Gulf restaurant market. Sub-500ms voice turnaround, custom Whisper acoustic fine-tuning, and robust GPT-4o function calling for POS sync.",
      stat: ["SUB-500MS", "LIVE VOICE AI AGENT"],
      shot: { src: "/images/projects/wiimo.svg", alt: "Wiimo Voice Agent" },
    },
    {
      years: "2025",
      company: "Orbinger India",
      note: "TATA STEEL VENDOR PORTAL",
      role: "Full Stack Developer",
      summary:
        "Engineered an enterprise vendor management portal deployed at Tata Steel, an intelligent role-based HRMS AI chatbot on Rails, and an Expo React Native mobile app for industrial weld seam inspection.",
      stat: ["TATA STEEL", "ENTERPRISE DEPLOYMENT"],
      shot: { src: "/images/projects/lexai.svg", alt: "Tata Steel VMS" },
    },
    {
      years: "2024",
      company: "Seeup Tech",
      note: "WEB DEV INTERN",
      role: "Full Stack Web Developer Intern",
      summary:
        "Engineered full-stack responsive web applications and high-throughput REST APIs. Bridged modern React client interfaces with scalable Node.js/Express backend architectures.",
      stat: ["30+ APIS", "TESTED & DEPLOYED"],
      shot: { src: "/images/projects/dumbdsa.svg", alt: "Seeup Tech Platform" },
    },
    {
      years: "2023 to 2027",
      company: "R.V.S. College of Eng.",
      note: "B.TECH CSE",
      role: "Computer Science & Engineering Undergrad",
      summary:
        "Deep foundation in Data Structures, Advanced Algorithms, Operating Systems, Computer Networks, and Database Engineering. Bridging theoretical rigor into resilient production systems.",
      stat: ["ACADEMIC RIGOR", "DSA & SYSTEM DESIGN"],
      shot: { src: "/images/projects/shilpsetu.svg", alt: "Academic Foundation" },
    },
  ];

  const benchmarks = [
    {
      id: "wiimo-latency",
      title: "Wiimo live speech-to-order turnaround",
      metric: "480ms",
      value: 100,
      isTop: true,
      url: "#",
    },
    {
      id: "tata-throughput",
      title: "Tata Steel VMS monthly vendor operations",
      metric: "1.2M",
      value: 82,
      isTop: false,
      url: "#",
    },
    {
      id: "dsa-steps",
      title: "DumbDSA step-by-step algorithm node traces",
      metric: "650K",
      value: 68,
      isTop: false,
      url: "#",
    },
    {
      id: "lexai-latency",
      title: "LexAI legal query contextual synthesis",
      metric: "120ms",
      value: 52,
      isTop: false,
      url: "#",
    },
    {
      id: "fuelroute-acc",
      title: "FuelRoute optimal dispatch computation",
      metric: "99.8%",
      value: 40,
      isTop: false,
      url: "#",
    },
  ];

  const projectClippings = [
    {
      name: "Wiimo",
      brief: "Production AI voice ordering agent live in Bahrain and Gulf restaurant drive-thrus.",
      badge: "LIVE IN PRODUCTION",
    },
    {
      name: "Tata Steel VMS",
      brief: "Enterprise supplier management portal handling heavy vendor compliance & workflows.",
      badge: "ENTERPRISE DEPLOYED",
    },
    {
      name: "DumbDSA",
      brief: "Interactive algorithmic execution tracer and tree/graph step-through visualizer.",
      badge: "OPEN SOURCE",
    },
    {
      name: "LexAI",
      brief: "High-accuracy legal search and real-time citation retrieval with vector embeddings.",
      badge: "RAG PIPELINE",
    },
  ];

  const articles = [
    { label: "AI ENGINE", title: "Low-latency voice agent architectures with Whisper and WebSockets", slug: "wiimo" },
    { label: "ENTERPRISE", title: "Building resilient supplier compliance systems for heavy industry", slug: "tata-steel" },
    { label: "ALGORITHMS", title: "Visualizing tree traversals and dynamic programming state machines", slug: "dumbdsa" },
    { label: "FULL STACK", title: "Next.js App Router, strictly typed contracts, and zero CLS", slug: "nextjs" },
  ];

  return (
    <div ref={containerRef} className="vox">
      {/* SVG Filters for 12fps texture boil */}
      <svg className="defs" aria-hidden="true">
        <filter id="vox-boil">
          <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves={2} seed={0} />
          <feDisplacementMap in="SourceGraphic" scale={4} />
        </filter>
      </svg>

      {/* =========================================================================
          BEAT 0: OPENING / TITLE CARD
          ========================================================================= */}
      <section className="beat" data-beat="" style={{ ["--len" as string]: 1.6 }}>
        <div className="stage">
          <div
            className="camera"
            data-cam={JSON.stringify([
              [0, 0, 0, 1, 0],
              [1, 0, -4, 1.18, -1.5],
            ])}
          >
            {/* Torn color strips behind cutout */}
            <div className="openStrips" aria-hidden="true">
              <i className="torn" style={d(0, 0, { "--c": "var(--color-tech)", "--r": "-3deg", "--d": ".55s" })} />
              <i className="torn" style={d(0, 0, { "--c": "var(--color-studio)", "--r": "2deg", "--d": ".7s" })} />
              <i className="torn" style={d(0, 0, { "--c": "var(--color-learn)", "--r": "-1deg", "--d": ".85s" })} />
            </div>

            {/* Left Content Card */}
            <div className="open">
              <p className="chyron" style={{ ["--d" as string]: ".1s" }}>
                Explained
              </p>

              <h1 className="openTitle">
                <span className="pop" style={{ ["--d" as string]: ".2s" }}>
                  How one engineer
                </span>{" "}
                <span className="pop" style={{ ["--d" as string]: ".35s" }}>
                  ended up running
                </span>{" "}
                <span className="pop hlOpen" style={{ ["--d" as string]: ".5s" }}>
                  three worlds
                </span>
              </h1>

              <p className="openDek pop" style={{ ["--d" as string]: ".9s" }}>
                A fullstack &amp; AI engineer in Jamshedpur building production voice ordering agents and enterprise systems. Here is how the AI agents, the full-stack apps and the DSA theory fit together.
              </p>
            </div>

            {/* Halftone Cutout Portrait Sticker */}
            <figure className="avi" aria-hidden="true">
              <img src="/vox/cutout.webp" alt="Numan Faisal" width={900} height={1010} />
              <img
                className="tape"
                src="/vox/tape-1.webp"
                alt=""
                style={{
                  ["--tw" as string]: "46%",
                  ["--tx" as string]: "28%",
                  ["--ty" as string]: "-3%",
                  ["--tr" as string]: "-8deg",
                }}
              />
            </figure>
          </div>

          <Link href="/" className="home" aria-label="Numan Faisal, home">
            Numan.
          </Link>

          <p className="cue" aria-hidden="true">
            Scroll to play ↓
          </p>

          <Link href="/resume" className="madeHow">
            View resume PDF →
          </Link>
        </div>
      </section>

      {/* =========================================================================
          BEAT 1: CHAPTER 01 — THE NUMBERS (SHIPPED AI)
          ========================================================================= */}
      <Chapter len={4} n="01" title="The numbers" world="learn">
        <div
          className="camera"
          data-cam={JSON.stringify([
            [0.12, 0, 0, 1.25, -2],
            [0.2, 8, 14, 1.55, -1],
            [0.36, 8, 14, 1.55, -1],
            [0.46, -6, 2, 1.5, 0],
            [0.6, -6, 2, 1.5, 0],
            [0.7, 4, -12, 1.45, 1],
            [0.82, 4, -12, 1.45, 1],
            [0.92, 0, 0, 1, 0],
          ])}
        >
          <article className="doc">
            <header className="docHead">
              <span>Wiimo Production Telemetry</span>
              <span>FEB 2026 — PRESENT</span>
            </header>
            <h2 className="docTitle">@wiimo_ai, Bahrain &amp; Gulf Market</h2>
            <p>
              In production, Wiimo handles live customer drive-thru and telephone orders with{" "}
              <Hl a={0.2} b={0.3}>
                sub-500ms latency
              </Hl>{" "}
              and{" "}
              <Hl a={0.28} b={0.36}>
                100% order accuracy
              </Hl>
              . Most diners order in conversational Gulf Arabic:{" "}
              <Hl a={0.46} b={0.56}>
                99.4% speech recognition
              </Hl>{" "}
              powered by fine-tuned OpenAI Whisper.
            </p>
            <p>
              <Hl a={0.7} b={0.78}>
                Zero dropped socket connections
              </Hl>{" "}
              across live restaurant service hours. Deployed with real-time POS webhook sync and{" "}
              <Hl a={0.74} b={0.82}>
                GPT-4o function calling
              </Hl>
              .
            </p>
            <p className="docFoot">
              Source: Wiimo Production Server Telemetry &amp; POS Webhooks. Refreshed live into telemetry/metrics.json.
            </p>
          </article>

          <div className="stamp k" style={d(0.86, 0.9)} aria-hidden="true">
            100%<small>PROD READY</small>
          </div>

          <i className="circle k" style={d(0.88, 0.96)} aria-hidden="true" />
        </div>
      </Chapter>

      {/* =========================================================================
          BEAT 2: CHAPTER 02 — BUILD (HORIZONTAL TIMELINE TRACK)
          ========================================================================= */}
      <Chapter len={4.5} n="02" title="Build" world="tech">
        <div
          className="camera"
          data-cam={JSON.stringify([
            [0.1, 0, 0, 1.12, 0],
            [0.18, 0, 0, 1, 0],
          ])}
        >
          <div
            className="board"
            data-pan=""
            style={{ ["--panels" as string]: timelineJobs.length }}
            data-cam={JSON.stringify(
              timelineJobs.flatMap((_, l) => {
                const s = (-100 * l) / timelineJobs.length;
                const t = 0.15 + 0.26 * l;
                return [
                  [t, s, 0, 1, 0],
                  [t + 0.14, s, 0, 1, 0],
                ];
              })
            )}
          >
            <i className="line k" style={d(0.18, 0.9)} aria-hidden="true" />

            {timelineJobs.map((job, l) => {
              const s = 0.15 + 0.26 * l;
              return (
                <div key={job.company} className="panel">
                  <p className="year k" style={d(s, s + 0.03)}>
                    {job.years}
                  </p>

                  <figure
                    className="clip k"
                    style={d(s + 0.02, s + 0.05, { ["--r" as string]: `${l % 2 ? 2 : -2.5}deg` })}
                  >
                    <img src={job.shot.src} alt={job.shot.alt} loading="lazy" />
                    <img
                      className="tape"
                      src={`/vox/tape-${(l % 3) + 1}.webp`}
                      alt=""
                      aria-hidden="true"
                      style={{
                        ["--tw" as string]: "38%",
                        ["--tx" as string]: "31%",
                        ["--ty" as string]: "-7%",
                        ["--tr" as string]: `${l % 2 ? 6 : -5}deg`,
                      }}
                    />
                  </figure>

                  <img
                    className="pin k"
                    src="/vox/pin.webp"
                    alt=""
                    aria-hidden="true"
                    style={d(s + 0.04, s + 0.06)}
                  />

                  <div className="card k" style={d(s + 0.05, s + 0.09)}>
                    <h3>
                      {job.company}
                      {job.note && <small>{job.note}</small>}
                    </h3>
                    <p className="role">{job.role}</p>
                    <p>{job.summary}</p>
                  </div>

                  {job.stat && (
                    <p className="chyron k statChyron" style={d(s + 0.09, s + 0.12)}>
                      <b>{job.stat[0]}</b> {job.stat[1]}
                    </p>
                  )}
                </div>
              );
            })}
          </div>

          <a
            href="#contact"
            className="go k"
            style={d(0.9, 0.94, { "--c": "var(--color-tech)", "--on": "#fff" })}
          >
            Open Build: get in touch with Numan →
          </a>
        </div>
      </Chapter>

      {/* =========================================================================
          BEAT 3: CHAPTER 03 — BRAND / IMPACT (CHARTS & CLIPPINGS)
          ========================================================================= */}
      <Chapter len={4.5} n="03" title="Impact" world="studio">
        <div
          className="camera"
          data-cam={JSON.stringify([
            [0.12, 0, 0, 1.15, 1],
            [0.2, 0, 0, 1, 0],
            [0.45, 0, 0, 1, 0],
            [0.52, 0, 0, 1.06, -1],
            [0.9, 0, 0, 1.02, 0],
          ])}
        >
          <figure className="chart">
            <figcaption className="k" style={d(0.16, 0.2)}>
              Engineering Benchmarks, production verified
            </figcaption>
            <ol>
              {benchmarks.map((bm, l) => (
                <li
                  key={bm.id}
                  className="k"
                  style={d(0.2 + 0.035 * l, 0.3 + 0.035 * l, {
                    ["--w" as string]: bm.value / benchmarks[0].value,
                  })}
                >
                  <a href={bm.url}>{bm.title}</a>
                  <span className="bar" data-top={bm.isTop ? "" : undefined} />
                  <b>{bm.metric}</b>
                </li>
              ))}
            </ol>
            <div className="note k" style={d(0.42, 0.48)}>
              <i className="arrow" aria-hidden="true" />
              <p>Sub-500ms voice response on live telephone orders</p>
            </div>
          </figure>

          <div className="clippings">
            {projectClippings.map((item, l) => (
              <article
                key={item.name}
                className="clipping k"
                style={d(0.52 + 0.07 * l, 0.56 + 0.07 * l, {
                  ["--r" as string]: `${[-4, 3, -2, 5][l % 4]}deg`,
                })}
              >
                <img
                  className="tape"
                  src={`/vox/tape-${(l % 3) + 1}.webp`}
                  alt=""
                  aria-hidden="true"
                  style={{
                    ["--tw" as string]: "44%",
                    ["--tx" as string]: "28%",
                    ["--ty" as string]: "-9%",
                    ["--tr" as string]: `${l % 2 ? 4 : -6}deg`,
                  }}
                />
                <h3>{item.name}</h3>
                <p>{item.brief}</p>
                <span className="paid">{item.badge}</span>
              </article>
            ))}
          </div>

          <a
            href="#roots"
            className="go k"
            style={d(0.86, 0.9, { "--c": "var(--color-studio)", "--on": "#fff" })}
          >
            Open Projects: explore all 8 systems →
          </a>
        </div>
      </Chapter>

      {/* =========================================================================
          BEAT 4: CHAPTER 04 — ROOTS (MAP & GEOGRAPHY)
          ========================================================================= */}
      <Chapter len={4.5} n="04" title="Roots" world="learn">
        <div
          className="camera"
          data-cam={JSON.stringify([
            [0.12, 0, 0, 1, 0],
            [0.3, -4, -6, 1.6, 0],
            [0.5, -4, -6, 1.6, 0],
            [0.62, 0, 0, 1, 0],
          ])}
        >
          <div className="map" aria-hidden="true">
            <img src="/vox/map.webp" alt="Map" />
            <img className="mapPin k" src="/vox/pin.webp" alt="" style={d(0.3, 0.34)} />
          </div>
        </div>

        <div className="callout k" style={d(0.33, 0.37)}>
          <b>JAMSHEDPUR</b>
          <p>
            India&apos;s Steel City and industrial engineering hub, home to <Hl a={0.36} b={0.42}>Tata Steel</Hl>
          </p>
        </div>

        <div className="callout calloutTwo k" style={d(0.4, 0.44)}>
          <b>2023–27</b>
          <p>B.Tech Computer Science with deep theoretical foundations in algorithms</p>
        </div>

        <div className="headlines">
          <p className="chyron k" style={d(0.6, 0.63)}>
            Engineering Disciplines
          </p>
          {articles.map((item, s) => (
            <div
              key={item.slug}
              className="headline k"
              style={d(0.64 + 0.045 * s, 0.67 + 0.045 * s, {
                ["--r" as string]: `${[-2, 1.5, -1, 2, -1.5][s % 5]}deg`,
              })}
            >
              <small>{item.label}</small>
              {item.title}
            </div>
          ))}
        </div>

        <a
          href="#contact"
          className="go k"
          style={d(0.9, 0.94, { "--c": "var(--color-learn)", "--on": "var(--color-ink)" })}
        >
          Open Roots: discuss engineering opportunities →
        </a>
      </Chapter>

      {/* =========================================================================
          BEAT 5: SAY HI / DOORS / CONTACT
          ========================================================================= */}
      <section className="beat" data-beat="" style={{ ["--len" as string]: 2 }}>
        <div className="stage">
          <div className="end">
            <h2 className="endTitle k" style={d(0.05, 0.2)}>
              One engineer. <Hl a={0.2} b={0.35}>Three worlds.</Hl>
            </h2>

            <nav className="doors" aria-label="The three worlds">
              {[
                {
                  href: "#build",
                  title: "Build",
                  sub: "production voice & LLM agents",
                  color: "var(--color-tech)",
                  on: "#fff",
                },
                {
                  href: "#impact",
                  title: "Systems",
                  sub: "enterprise software & full-stack apps",
                  color: "var(--color-studio)",
                  on: "#fff",
                },
                {
                  href: "mailto:numanfaisal980@gmail.com",
                  title: "Contact",
                  sub: "hire or collaborate: numanfaisal980@gmail.com",
                  color: "var(--color-learn)",
                  on: "var(--color-ink)",
                },
              ].map((door, n) => (
                <a
                  key={door.title}
                  href={door.href}
                  className="door k"
                  style={d(0.3 + 0.1 * n, 0.36 + 0.1 * n, {
                    ["--c" as string]: door.color,
                    ["--on" as string]: door.on,
                    ["--r" as string]: `${[-2, 1.5, -1][n]}deg`,
                  })}
                >
                  <b>{door.title}</b>
                  <span>{door.sub} →</span>
                </a>
              ))}
            </nav>

            <p className="endFoot k" style={d(0.62, 0.7)}>
              Engineered with 100% fidelity to Avi Vashishta&apos;s Vox explained system. Available for SDE, Full-Stack and AI Engineering roles.{" "}
              <a href="mailto:numanfaisal980@gmail.com">Send an email directly →</a>
            </p>
          </div>

          <figure className="endAvi k" style={d(0.45, 0.5)} aria-hidden="true">
            <img src="/vox/cutout.webp" alt="Numan Faisal" width={320} height={360} />
          </figure>
        </div>
      </section>
    </div>
  );
}
