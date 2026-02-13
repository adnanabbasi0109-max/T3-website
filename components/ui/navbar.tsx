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

  useEffect(() => setMobileOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <nav
      className={`fixed top-0 z-50 w-full transition-all duration-700 ${
        scrolled
          ? "bg-surface/80 shadow-[0_1px_0_var(--color-border)] backdrop-blur-2xl"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-[72px] max-w-[1120px] items-center justify-between px-6 sm:px-8 lg:px-12">
        {/* Logo */}
        <Link
          href="/"
          className="relative z-50 text-[20px] font-bold tracking-[-0.04em]"
          aria-label="T3 Technologies Home"
        >
          T<span className="text-gold">3</span>
        </Link>

        {/* Desktop links */}
        <div className="hidden items-center gap-10 md:flex">
          {links.map((l) => {
            const active = pathname === l.href || pathname.startsWith(l.href + "/");
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`relative text-[13px] font-medium tracking-[0.01em] transition-colors duration-300 ${
                  active ? "text-surface-dark" : "text-muted hover:text-surface-dark"
                }`}
              >
                {l.label}
                {active && (
                  <span className="absolute -bottom-1 left-0 h-px w-full bg-surface-dark/40" />
                )}
              </Link>
            );
          })}
          <Link
            href="/shortlist"
            className="ml-3 rounded-full border border-surface-dark/12 px-5 py-[7px] text-[12px] font-medium tracking-[0.02em] text-surface-dark transition-all duration-300 hover:border-surface-dark/40 hover:bg-surface-dark hover:text-white"
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
              className={`block h-[1.5px] w-[18px] bg-current transition-all duration-400 ${
                mobileOpen ? "translate-y-[6.5px] rotate-45" : ""
              }`}
            />
            <span
              className={`block h-[1.5px] w-[18px] bg-current transition-all duration-400 ${
                mobileOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block h-[1.5px] w-[18px] bg-current transition-all duration-400 ${
                mobileOpen ? "-translate-y-[6.5px] -rotate-45" : ""
              }`}
            />
          </div>
        </button>
      </div>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 flex flex-col justify-center bg-surface px-8 md:hidden"
          >
            <nav className="flex flex-col gap-6">
              {links.map((l, i) => (
                <motion.div
                  key={l.href}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: 0.06 + i * 0.05,
                    duration: 0.5,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  <Link
                    href={l.href}
                    className={`text-[2.5rem] font-bold tracking-[-0.03em] leading-[1.1] transition-colors ${
                      pathname.startsWith(l.href) ? "text-gold" : "text-surface-dark"
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
              transition={{ delay: 0.35, duration: 0.4 }}
              className="mt-14"
            >
              <Link
                href="/shortlist"
                className="inline-block rounded-full border border-surface-dark/15 px-6 py-3 text-[13px] font-medium"
              >
                Shortlist
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
