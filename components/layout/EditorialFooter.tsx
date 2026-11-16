import Link from "next/link";
import profileData from "@/data/profile.json";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";

export function EditorialFooter() {
  const year = 2026;

  return (
    <footer className="border-t border-[var(--color-border)] py-12 bg-[var(--color-paper)]">
      <div className="container flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <span className="font-serif-display text-xl tracking-tight block">
            Numan Faisal
          </span>
          <p className="mono-label text-[11px] mt-1">
            Made with Next.js, TypeScript &amp; Editorial CSS · Based in India
          </p>
        </div>

        <nav aria-label="Footer links">
          <ul className="flex items-center gap-6" role="list">
            <li>
              <a
                href={profileData.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--color-ink)] hover:text-[var(--color-red)] transition-colors p-1"
                aria-label="GitHub profile"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
            </li>
            <li>
              <a
                href={profileData.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--color-ink)] hover:text-[var(--color-red)] transition-colors p-1"
                aria-label="LinkedIn profile"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
            </li>
            <li>
              <Link
                href="/resume"
                className="mono-label hover:text-[var(--color-red)] transition-colors"
              >
                Resume
              </Link>
            </li>
            <li>
              <Link
                href="/story"
                className="mono-label text-[var(--color-blue)] hover:text-[var(--color-red)] transition-colors"
              >
                Story ↗
              </Link>
            </li>
            <li>
              <span className="mono-label text-[11px]">
                © {year}
              </span>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}
