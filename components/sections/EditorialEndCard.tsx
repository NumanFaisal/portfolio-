import Link from "next/link";
import profileData from "@/data/profile.json";

export function EditorialEndCard() {
  return (
    <section className="section-editorial relative" aria-label="Closing reflection">
      <div className="container max-w-4xl text-center">
        {/* Halftone portrait */}
        <div
          className="w-24 h-28 mx-auto mb-6 bg-contain bg-no-repeat bg-center"
          style={{ backgroundImage: "url('/vox/cutout.webp')" }}
          data-twos="true"
          aria-hidden="true"
        />

        <span className="mono-label text-[var(--color-blue)] block mb-3">
          Reflections · {profileData.name}
        </span>

        <h2 className="text-[clamp(36px,5vw,60px)] leading-[1.05] tracking-tight mb-6">
          One person. A few worlds.
        </h2>

        <p className="text-[18px] text-[var(--color-ink-muted)] max-w-xl mx-auto leading-[1.6] mb-12">
          Engineering reliable systems that translate research and generative models into software
          that survives the real world.
        </p>

        {/* 3 Torn-strip Doors */}
        <div className="grid sm:grid-cols-3 gap-6">
          {/* Door 1: Projects */}
          <Link
            href="#built"
            className="card-paper p-6 relative hover:-translate-y-1 transition-transform group text-left bg-[#FFFFFF]"
          >
            <div className="tape-top" aria-hidden="true" />
            <span className="mono-label text-[10px] text-[var(--color-red)] block mb-2">
              DOOR 01
            </span>
            <span className="font-serif-display text-2xl block mb-1 group-hover:text-[var(--color-red)] transition-colors">
              Projects →
            </span>
            <span className="text-[13px] text-[var(--color-ink-muted)] block">
              Inspect systems and architectures
            </span>
            <div className="torn-strip-bottom" aria-hidden="true" />
          </Link>

          {/* Door 2: Resume */}
          <Link
            href="/resume"
            className="card-paper p-6 relative hover:-translate-y-1 transition-transform group text-left bg-[#FFFFFF]"
          >
            <div className="tape-top" aria-hidden="true" />
            <span className="mono-label text-[10px] text-[var(--color-yellow)] block mb-2">
              DOOR 02
            </span>
            <span className="font-serif-display text-2xl block mb-1 group-hover:text-[var(--color-red)] transition-colors">
              Resume →
            </span>
            <span className="text-[13px] text-[var(--color-ink-muted)] block">
              Experience &amp; downloadable PDF
            </span>
            <div className="torn-strip-bottom" aria-hidden="true" />
          </Link>

          {/* Door 3: Contact */}
          <Link
            href="#contact"
            className="card-paper p-6 relative hover:-translate-y-1 transition-transform group text-left bg-[#FFFFFF]"
          >
            <div className="tape-top" aria-hidden="true" />
            <span className="mono-label text-[10px] text-[var(--color-blue)] block mb-2">
              DOOR 03
            </span>
            <span className="font-serif-display text-2xl block mb-1 group-hover:text-[var(--color-red)] transition-colors">
              Contact →
            </span>
            <span className="text-[13px] text-[var(--color-ink-muted)] block">
              Say hi or book an introductory call
            </span>
            <div className="torn-strip-bottom" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
