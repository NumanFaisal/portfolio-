import experienceData from "@/data/experience.json";
import { formatDate } from "@/lib/utils";

export function ChapterPath() {
  // Chronological order: Seeup Tech (2024) -> Orbinger India (2025) -> Creative Homme (2026)
  const chronologicalExp = [...experienceData].reverse();

  const tapePositions = ["-1deg", "1.5deg", "-0.5deg"];

  return (
    <section id="path" className="section-editorial relative" aria-label="Chapter 03: Path">
      <div className="container">
        {/* Chapter Header */}
        <div className="flex items-baseline gap-4 mb-12 border-b border-[var(--color-border)] pb-6">
          <span className="font-serif-display text-4xl sm:text-5xl text-[var(--color-yellow)]">
            03
          </span>
          <h2 className="text-3xl sm:text-4xl">Path</h2>
          <span className="mono-label ml-auto text-[var(--color-ink-muted)]">
            Chronological Experience
          </span>
        </div>

        {/* 3 Side-by-Side Taped Panels */}
        <div className="grid lg:grid-cols-3 gap-8">
          {chronologicalExp.map((exp, idx) => {
            const rot = tapePositions[idx % tapePositions.length];

            return (
              <article
                key={exp.id}
                className="card-paper p-6 relative bg-[#FFFFFF] flex flex-col justify-between"
                style={{ transform: `rotate(${rot})` }}
              >
                {/* Tape & Pin at top */}
                <div className="tape-pin" aria-hidden="true" />

                <div>
                  <div className="flex items-center justify-between mb-4 mt-2">
                    <span className="mono-label bg-[var(--color-ink)] text-white px-2 py-0.5 rounded-[2px] text-[10px]">
                      {exp.start.slice(0, 4)}
                    </span>
                    <span className="mono-label text-[11px] text-[var(--color-ink-muted)]">
                      {formatDate(exp.start)} — {exp.current ? "Present" : exp.end ? formatDate(exp.end) : "Present"}
                    </span>
                  </div>

                  <h3 className="font-serif-display text-2xl tracking-tight mb-1">
                    {exp.company}
                  </h3>
                  <div className="mono-label text-[12px] text-[var(--color-red)] mb-4">
                    {exp.role}
                  </div>

                  {/* One-sentence outcome / core impact */}
                  <p className="text-[14px] text-[var(--color-ink)] leading-[1.6] mb-4">
                    {exp.bullets[0]}
                  </p>

                  {/* "What I learned" human quote */}
                  <blockquote className="border-l-2 border-[var(--color-yellow)] pl-3 my-4 text-[13px] italic text-[var(--color-ink-muted)]">
                    &ldquo;{exp.learned}&rdquo;
                  </blockquote>
                </div>

                {/* Tech Chips */}
                <div className="flex flex-wrap gap-1.5 pt-4 border-t border-[var(--color-border)] mt-4">
                  {exp.tech.map((t) => (
                    <span
                      key={t}
                      className="mono-label text-[10px] bg-[#EFECE6] px-2 py-0.5 rounded-[2px]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
