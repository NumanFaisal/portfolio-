"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Moon, Sun, Menu, X } from "lucide-react";
import { useTheme } from "@/components/providers/ThemeProvider";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "Story", href: "/story" },
  { label: "Work", href: "/#projects" },
  { label: "Experience", href: "/#experience" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" },
];

export function Nav() {
  const { theme, toggle } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [lastY, setLastY] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 20);
      setHidden(y > lastY && y > 100);
      setLastY(y);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastY]);

  return (
    <>
      <motion.header
        animate={{ y: hidden ? "-100%" : "0%" }}
        transition={{ duration: 0.3, ease: [0.19, 1, 0.22, 1] }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "glass border-b border-[var(--color-border)]"
            : "bg-transparent"
        )}
      >
        <nav
          className="container flex items-center justify-between h-16"
          aria-label="Main navigation"
        >
          {/* Logo */}
          <Link
            href="/"
            className="font-display font-bold text-lg tracking-tight hover:text-[var(--color-accent)] transition-colors"
          >
            NF
          </Link>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-8" role="list">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-sm text-[var(--color-muted)] hover:text-[var(--color-text)] transition-colors relative group"
                >
                  {link.label}
                  <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-[var(--color-accent)] group-hover:w-full transition-all duration-300" />
                </a>
              </li>
            ))}
          </ul>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <button
              onClick={toggle}
              aria-label={
                theme === "dark"
                  ? "Switch to light mode"
                  : "Switch to dark mode"
              }
              className="p-2 rounded-[var(--radius-md)] text-[var(--color-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface)] transition-all"
            >
              {theme === "dark" ? (
                <Sun className="w-4 h-4" />
              ) : (
                <Moon className="w-4 h-4" />
              )}
            </button>

            <a
              href="#contact"
              className="hidden md:flex items-center gap-2 px-4 py-2 rounded-[var(--radius-full)] text-sm font-medium accent-gradient text-white hover:opacity-90 transition-opacity"
            >
              Let&apos;s talk
            </a>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileOpen((o) => !o)}
              className="md:hidden p-2 rounded-[var(--radius-md)] text-[var(--color-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface)] transition-all"
              aria-label="Toggle mobile menu"
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 md:hidden"
            style={{ background: "var(--color-bg)" }}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
          >
            <div className="flex flex-col items-center justify-center h-full gap-10">
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: i * 0.08,
                    duration: 0.4,
                    ease: [0.19, 1, 0.22, 1],
                  }}
                  className="font-display text-4xl font-bold tracking-tight hover:text-[var(--color-accent)] transition-colors"
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.a
                href="#contact"
                onClick={() => setMobileOpen(false)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: NAV_LINKS.length * 0.08,
                  duration: 0.4,
                  ease: [0.19, 1, 0.22, 1],
                }}
                className="px-8 py-4 rounded-[var(--radius-full)] text-xl font-semibold accent-gradient text-white"
              >
                Let&apos;s talk
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
