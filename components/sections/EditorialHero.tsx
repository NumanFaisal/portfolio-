import profileData from "@/data/profile.json";

export function EditorialHero() {
  return (
    <section className="section-editorial relative" aria-label="Introduction">
      <div className="container">
        {/* Eyebrow */}
        <div className="flex items-center justify-between mb-8">
          <span className="mono-label">Portfolio · 2026</span>
          <span className="mono-label text-[var(--color-red)]">
            ● Open to work
          </span>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 items-start">
          {/* Main Headline & Info */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            <h1 className="text-[clamp(56px,9vw,118px)] leading-[0.95] tracking-[-0.02em]">
              I build{" "}
              <span className="vox-highlighter" style={{ ["--t" as string]: 1 }}>
                AI products
              </span>{" "}
              that ship.
            </h1>

            <p className="text-[19px] sm:text-[22px] leading-[1.5] text-[var(--color-ink)] max-w-2xl font-light">
              Currently powering{" "}
              <strong className="font-semibold text-[var(--color-red)]">Wiimo</strong>, a
              production AI voice ordering agent running live in Gulf restaurant chains — handling
              real-world customer orders under noisy conditions every day.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-4">
              <a href="#shipped" className="btn-paper-red">
                See my work ↓
              </a>
              <a href="#contact" className="btn-paper">
                Say hi
              </a>
              <a
                href="/story"
                className="mono-label text-[var(--color-blue)] hover:text-[var(--color-red)] transition-colors ml-2 inline-flex items-center gap-1.5"
              >
                Watch the explainer ↗
              </a>
            </div>

            <div className="pt-8">
              <span className="mono-label text-[11px] block">
                Scroll to explore chapters ↓
              </span>
            </div>
          </div>

          {/* Halftone Cut-out Portrait with Tape */}
          <div className="lg:col-span-4 flex justify-center lg:justify-end">
            <div
              className="relative card-paper p-4 bg-[#FFFFFF]"
              style={{
                transform: "rotate(-1.8deg)",
                maxWidth: "280px",
                width: "100%",
              }}
            >
              {/* Tape at top */}
              <div className="tape-top" aria-hidden="true" />

              <div
                className="w-full aspect-[4/5] bg-[#F1EEE8] rounded-[4px] border border-[var(--color-border)] flex items-center justify-center relative overflow-hidden"
                style={{
                  backgroundImage: "url('/vox/cutout.webp')",
                  backgroundSize: "contain",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                }}
                data-twos="true"
                aria-label="Halftone cut-out portrait of Numan Faisal"
              />

              <div className="mt-3 text-center">
                <span className="font-serif-display text-lg block">
                  {profileData.name}
                </span>
                <span className="mono-label text-[11px] block text-[var(--color-ink-muted)]">
                  {profileData.title}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
