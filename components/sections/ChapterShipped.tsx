import Link from "next/link";
import projectsData from "@/data/projects.json";
import profileData from "@/data/profile.json";

export function ChapterShipped() {
  const wiimo = projectsData.find((p) => p.id === "wiimo") ?? projectsData[0];
  const stat = profileData.stats && profileData.stats.length > 0 ? profileData.stats[0] : null;

  return (
    <section id="shipped" className="section-editorial relative" aria-label="Chapter 01: Shipped">
      <div className="container">
        {/* Chapter Header */}
        <div className="flex items-baseline gap-4 mb-12 border-b border-[var(--color-border)] pb-6">
          <span className="font-serif-display text-4xl sm:text-5xl text-[var(--color-red)]">
            01
          </span>
          <h2 className="text-3xl sm:text-4xl">Shipped</h2>
          <span className="mono-label ml-auto text-[var(--color-red)]">
            ● Production System
          </span>
        </div>

        {/* Wiimo Featured Paper Card */}
        <article className="card-paper p-8 sm:p-12 max-w-4xl mx-auto relative bg-[#FFFFFF]">
          {/* Tape and Pin */}
          <div className="tape-pin" aria-hidden="true" />

          <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
            <span className="mono-label text-[var(--color-red)]">
              LIVE CASE FILE: {wiimo.title.toUpperCase()}
            </span>
            <span className="mono-label bg-[var(--color-red)] text-white px-2.5 py-1 rounded-[3px]">
              {wiimo.status}
            </span>
          </div>

          <h3 className="font-serif-display text-3xl sm:text-5xl leading-[1.05] tracking-tight mb-6">
            An{" "}
            <span className="vox-highlighter" style={{ ["--t" as string]: 1 }}>
              AI voice ordering agent
            </span>{" "}
            deployed live in Gulf restaurant chains.
          </h3>

          <p className="text-[18px] leading-[1.6] text-[var(--color-ink)] mb-8 max-w-2xl">
            {wiimo.case_study.problem} Engineered to parse customer accents, handle noisy acoustic
            environments, and stream orders directly to restaurant POS systems with sub-second feedback.
          </p>

          {/* Bold Real Stat (Only if it exists in data) */}
          {stat && (
            <div className="my-8 p-6 bg-[#F8F7F4] border border-[var(--color-border)] rounded-[4px] flex flex-wrap items-center gap-6">
              <div className="vox-circle-wrap">
                <span className="font-serif-display text-5xl sm:text-6xl text-[var(--color-red)] leading-none">
                  {stat.value}
                  {stat.suffix}
                </span>
                <span
                  className="vox-circle-marker"
                  style={{ ["--t" as string]: 1 }}
                  data-twos="true"
                  aria-hidden="true"
                />
              </div>

              <div>
                <span className="mono-label text-[13px] text-[var(--color-ink)] block">
                  {stat.label}
                </span>
                <span className="text-[14px] text-[var(--color-ink-muted)] block mt-0.5">
                  Verified real-world metrics, zero simulated placeholder data.
                </span>
              </div>
            </div>
          )}

          {/* Tech Chips */}
          <div className="flex flex-wrap gap-2 mb-8">
            {wiimo.tech.map((t) => (
              <span
                key={t}
                className="mono-label text-[11px] bg-[#EFECE6] px-2.5 py-1 rounded-[3px] text-[var(--color-ink)]"
              >
                {t}
              </span>
            ))}
          </div>

          {/* Action Links */}
          <div className="flex items-center gap-4 pt-4 border-t border-[var(--color-border)]">
            <Link
              href={`/projects/${wiimo.slug}`}
              className="btn-paper text-sm font-semibold"
            >
              Read Full Case Study →
            </Link>
            <Link
              href="/story"
              className="mono-label text-[var(--color-blue)] hover:text-[var(--color-red)] transition-colors"
            >
              Watch the Chapter in Explainer ↗
            </Link>
          </div>
        </article>
      </div>
    </section>
  );
}
