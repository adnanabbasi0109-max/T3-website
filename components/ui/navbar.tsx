"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { href: "/work", label: "Work" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname() ?? "";
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <nav
      className={`fixed top-0 z-50 w-full transition-all duration-500 ${
        scrolled
          ? "border-b border-border bg-surface/80 backdrop-blur-xl dark:border-border-dark dark:bg-surface-dark/80"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-6 lg:px-10">
        {/* Logo */}
        <Link
          href="/"
          className="relative z-50 flex items-baseline gap-0.5 text-xl font-bold tracking-tight"
          aria-label="T3 Technologies Home"
        >
          <span>T</span>
          <span className="text-gold">3</span>
          <span className="ml-2 hidden text-[11px] font-normal uppercase tracking-[0.2em] text-muted sm:inline">
            Technologies
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-10 md:flex">
          {links.map((l) => {
            const active = pathname.startsWith(l.href);
            return (
              <Link
                key={l.href}
                href={l.href}
                className="group relative py-1 text-[13px] font-medium uppercase tracking-[0.12em] transition-colors"
              >
                <span
                  className={
                    active
                      ? "text-gold"
                      : "text-muted hover:text-surface-dark dark:hover:text-white"
                  }
                >
                  {l.label}
                </span>
                {active && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute -bottom-0.5 left-0 right-0 h-px bg-gold"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
          <Link
            href="/shortlist"
            className="ml-2 rounded-full border border-surface-dark px-5 py-2 text-[12px] font-semibold uppercase tracking-[0.1em] text-surface-dark transition-all hover:bg-surface-dark hover:text-surface dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-surface-dark"
          >
            Shortlist
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="relative z-50 flex h-10 w-10 items-center justify-center md:hidden"
          aria-label="Toggle navigation"
          aria-expanded={mobileOpen}
        >
          <div className="flex flex-col gap-[5px]">
            <span
              className={`block h-[1.5px] w-5 bg-current transition-all duration-300 ${
                mobileOpen ? "translate-y-[6.5px] rotate-45" : ""
              }`}
            />
            <span
              className={`block h-[1.5px] w-5 bg-current transition-all duration-300 ${
                mobileOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block h-[1.5px] w-5 bg-current transition-all duration-300 ${
                mobileOpen ? "-translate-y-[6.5px] -rotate-45" : ""
              }`}
            />
          </div>
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-surface dark:bg-surface-dark md:hidden"
          >
            <div className="flex h-full flex-col justify-center px-10">
              <nav className="flex flex-col gap-6">
                {links.map((l, i) => (
                  <motion.div
                    key={l.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.05 }}
                  >
                    <Link
                      href={l.href}
                      className={`text-3xl font-bold tracking-tight transition-colors ${
                        pathname.startsWith(l.href)
                          ? "text-gold"
                          : "text-surface-dark dark:text-white"
                      }`}
                    >
                      {l.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="mt-12"
              >
                <Link
                  href="/shortlist"
                  className="inline-block rounded-full border border-surface-dark px-6 py-3 text-sm font-semibold uppercase tracking-[0.1em] text-surface-dark dark:border-white dark:text-white"
                >
                  Shortlist
                </Link>
              </motion.div>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-16 font-mono text-[11px] uppercase tracking-[0.2em] text-muted"
              >
                hello@t-3.in
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
