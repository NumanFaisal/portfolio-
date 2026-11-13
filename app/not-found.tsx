import Link from "next/link";
import { Home, ArrowLeft } from "lucide-react";
import { Footer } from "@/components/layout/Footer";

export default function NotFound() {
  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-6">
        <div className="text-8xl mb-6" aria-hidden="true">🤔</div>
        <h1 className="font-display text-6xl font-bold tracking-tight mb-4">404</h1>
        <p className="text-xl text-[var(--color-muted)] mb-2">
          This page doesn&apos;t exist.
        </p>
        <p className="text-sm text-[var(--color-muted)] mb-10 max-w-md">
          I checked three times. Even asked the AI. Still nothing. 
          Might be in production... or might just be gone.
        </p>
        <div className="flex gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold accent-gradient text-white hover:opacity-90 transition-opacity"
          >
            <Home className="w-4 h-4" aria-hidden="true" />
            Go home
          </Link>
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold border border-[var(--color-border)] text-[var(--color-text)] hover:border-[var(--color-accent)]/40 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            See my work
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
}
