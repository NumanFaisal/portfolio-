import Link from "next/link";

export function EditorialNav() {
  return (
    <header className="sticky top-0 z-40 bg-[var(--color-paper)]/90 backdrop-blur-sm border-b border-[var(--color-border)]">
      <div className="container flex items-center justify-between h-14">
        <Link
          href="/"
          className="font-serif-display text-2xl tracking-tight text-[var(--color-ink)] hover:text-[var(--color-red)] transition-colors"
        >
          Numan Faisal
        </Link>

        <nav aria-label="Main navigation">
          <ul className="flex items-center gap-6 text-sm" role="list">
            <li>
              <Link
                href="/story"
                className="mono-label text-[var(--color-blue)] hover:text-[var(--color-red)] transition-colors inline-flex items-center gap-1.5"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-blue)]" aria-hidden="true" />
                Explainer
              </Link>
            </li>
            <li>
              <a
                href="#shipped"
                className="mono-label hover:text-[var(--color-ink)] transition-colors"
              >
                01 Shipped
              </a>
            </li>
            <li>
              <a
                href="#built"
                className="mono-label hover:text-[var(--color-ink)] transition-colors"
              >
                02 Built
              </a>
            </li>
            <li>
              <a
                href="#path"
                className="mono-label hover:text-[var(--color-ink)] transition-colors"
              >
                03 Path
              </a>
            </li>
            <li>
              <a
                href="#contact"
                className="mono-label text-[var(--color-red)] hover:opacity-80 transition-opacity"
              >
                04 Contact
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
