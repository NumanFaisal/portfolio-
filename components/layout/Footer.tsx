import Link from "next/link";
import { Github, Linkedin, Mail, ArrowUp } from "lucide-react";

const year = new Date().getFullYear();

export function Footer() {
  return (
    <footer className="border-t border-[var(--color-border)] py-12" role="contentinfo">
      <div className="container">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          {/* Left */}
          <div>
            <div className="font-display font-bold text-xl tracking-tight mb-2">
              Numan Faisal
            </div>
            <p className="text-sm text-[var(--color-muted)]">
              Full-Stack &amp; AI Engineer — building things that ship.
            </p>
          </div>

          {/* Nav */}
          <nav aria-label="Footer navigation">
            <ul className="flex flex-wrap gap-6 text-sm text-[var(--color-muted)]" role="list">
              <li><a href="#projects" className="hover:text-[var(--color-text)] transition-colors">Work</a></li>
              <li><a href="#experience" className="hover:text-[var(--color-text)] transition-colors">Experience</a></li>
              <li><a href="#about" className="hover:text-[var(--color-text)] transition-colors">About</a></li>
              <li><Link href="/resume" className="hover:text-[var(--color-text)] transition-colors">Resume</Link></li>
              <li><a href="#contact" className="hover:text-[var(--color-text)] transition-colors">Contact</a></li>
            </ul>
          </nav>

          {/* Social + back to top */}
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/NumanFaisal"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="p-2 text-[var(--color-muted)] hover:text-[var(--color-text)] transition-colors"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href="https://www.linkedin.com/in/numanfaisal/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="p-2 text-[var(--color-muted)] hover:text-[var(--color-text)] transition-colors"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href="mailto:numanfaisal980@gmail.com"
              aria-label="Email"
              className="p-2 text-[var(--color-muted)] hover:text-[var(--color-text)] transition-colors"
            >
              <Mail className="w-4 h-4" />
            </a>

            <a
              href="#hero"
              aria-label="Back to top"
              className="p-2 ml-2 text-[var(--color-muted)] hover:text-[var(--color-text)] border border-[var(--color-border)] rounded-[var(--radius-md)] hover:border-[var(--color-accent)]/40 transition-all"
            >
              <ArrowUp className="w-4 h-4" />
            </a>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-[var(--color-border)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs text-[var(--color-muted)]">
          <span>© {year} Numan Faisal. All rights reserved.</span>
          <span>
            Built with Next.js, Tailwind CSS, React Three Fiber &amp; Framer Motion.
            Deployed on Vercel.
          </span>
        </div>
      </div>
    </footer>
  );
}
