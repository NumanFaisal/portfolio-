import Link from "next/link";
import projectsData from "@/data/projects.json";
import { GithubIcon } from "@/components/ui/Icons";

export function ChapterBuilt() {
  const projects = projectsData.filter((p) => p.id !== "wiimo");

  const tapeStyles = [
    { rot: "-1.5deg", tape: "/vox/tape-1.webp" },
    { rot: "1.2deg", tape: "/vox/tape-2.webp" },
    { rot: "-0.8deg", tape: "/vox/tape-3.webp" },
    { rot: "1.5deg", tape: "/vox/tape-1.webp" },
  ];

  return (
    <section id="built" className="section-editorial relative" aria-label="Chapter 02: Built">
      <div className="container">
        {/* Chapter Header */}
        <div className="flex items-baseline gap-4 mb-12 border-b border-[var(--color-border)] pb-6">
          <span className="font-serif-display text-4xl sm:text-5xl text-[var(--color-blue)]">
            02
          </span>
          <h2 className="text-3xl sm:text-4xl">Built</h2>
          <span className="mono-label ml-auto text-[var(--color-ink-muted)]">
            Systems &amp; Platforms
          </span>
        </div>

        {/* 4 Project Cards Grid */}
        <div className="grid md:grid-cols-2 gap-10">
          {projects.map((p, idx) => {
            const style = tapeStyles[idx % tapeStyles.length];

            return (
              <article
                key={p.id}
                className="card-paper p-8 relative bg-[#FFFFFF] flex flex-col justify-between"
                style={{ transform: `rotate(${style.rot})` }}
              >
                {/* Tape & Pin at top */}
                <div
                  className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-20 h-7 bg-contain bg-no-repeat pointer-events-none z-10"
                  style={{ backgroundImage: `url('${style.tape}')` }}
                  aria-hidden="true"
                />
                <div className="tape-pin" aria-hidden="true" />

                <div>
                  <div className="flex items-center justify-between mb-4 mt-2">
                    <span className="mono-label text-[var(--color-blue)]">
                      {p.tags ? p.tags.slice(0, 2).join(" · ") : "PROJECT"}
                    </span>
                    <span className="mono-label text-[11px] text-[var(--color-ink-muted)]">
                      {p.status}
                    </span>
                  </div>

                  <h3 className="font-serif-display text-2xl sm:text-3xl mb-3 tracking-tight">
                    {p.title}
                  </h3>

                  <p className="text-[15px] leading-[1.6] text-[var(--color-ink-muted)] mb-6">
                    {p.outcome}
                  </p>
                </div>

                <div>
                  {/* Tech Labels */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {p.tech.slice(0, 4).map((t) => (
                      <span
                        key={t}
                        className="mono-label text-[10px] bg-[#EFECE6] px-2 py-0.5 rounded-[2px]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex items-center justify-between pt-4 border-t border-[var(--color-border)]">
                    <Link
                      href={`/projects/${p.slug}`}
                      className="mono-label text-[11px] text-[var(--color-ink)] hover:text-[var(--color-red)] transition-colors"
                    >
                      Case Study →
                    </Link>

                    {p.github && (
                      <a
                        href={p.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[var(--color-ink)] hover:text-[var(--color-red)] transition-colors p-1"
                        aria-label={`${p.title} GitHub repo`}
                      >
                        <GithubIcon className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
