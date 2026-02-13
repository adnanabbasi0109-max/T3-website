"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useShortlist } from "./shortlist-provider";

const links = [
  { href: "/work", label: "Work" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function Navbar() {
  const pathname = usePathname() ?? "";
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { count } = useShortlist();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMobileOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <nav
      aria-label="Main navigation"
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-paper/90 shadow-[0_1px_0_var(--color-border)] backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-[1080px] items-center justify-between px-6 sm:h-[72px] sm:px-8 lg:px-12">
        {/* Logo */}
        <Link
          href="/"
          className="relative z-50 font-display text-[22px] tracking-[-0.02em]"
          aria-label="T3 Technologies Home"
        >
          T<span className="text-gold">3</span>
        </Link>

        {/* Desktop links */}
        <div className="hidden items-center gap-8 md:flex">
          {links.map((l) => {
            const active =
              pathname === l.href || pathname.startsWith(l.href + "/");
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`text-[13px] font-medium tracking-[0.01em] transition-colors duration-300 ${
                  active ? "text-ink" : "text-muted hover:text-ink"
                }`}
              >
                {l.label}
              </Link>
            );
          })}

          {/* Shortlist — minimal */}
          <Link
            href="/shortlist"
            aria-label={`Shortlist${count > 0 ? ` (${count} items)` : ""}`}
            className="ml-2 flex items-center gap-1.5 text-[13px] font-medium text-muted transition-colors duration-300 hover:text-ink"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
            </svg>
            {count > 0 && (
              <span className="flex h-[16px] min-w-[16px] items-center justify-center rounded-full bg-ink px-1 text-[9px] font-bold text-paper">
                {count}
              </span>
            )}
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
              className={`block h-[1.5px] w-[18px] transition-all duration-400 ${
                mobileOpen
                  ? "translate-y-[6.5px] rotate-45 bg-paper"
                  : "bg-ink"
              }`}
            />
            <span
              className={`block h-[1.5px] w-[18px] transition-all duration-400 ${
                mobileOpen ? "opacity-0 bg-paper" : "bg-ink"
              }`}
            />
            <span
              className={`block h-[1.5px] w-[18px] transition-all duration-400 ${
                mobileOpen
                  ? "-translate-y-[6.5px] -rotate-45 bg-paper"
                  : "bg-ink"
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
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-40 flex flex-col justify-end bg-ink px-6 pb-16 pt-24 md:hidden"
          >
            <nav aria-label="Mobile navigation" className="flex flex-col gap-1">
              {links.map((l, i) => (
                <motion.div
                  key={l.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 + i * 0.05, duration: 0.5, ease }}
                >
                  <Link
                    href={l.href}
                    className={`block py-2 font-display text-[2.5rem] leading-[1.15] tracking-[-0.02em] transition-colors ${
                      pathname.startsWith(l.href)
                        ? "text-gold"
                        : "text-paper/80 hover:text-paper"
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
              transition={{ delay: 0.35, duration: 0.3 }}
              className="mt-12 flex items-center gap-4"
            >
              <Link
                href="/shortlist"
                className="text-[13px] font-medium text-paper/50 transition-colors hover:text-paper"
              >
                Shortlist{count > 0 && ` (${count})`}
              </Link>
              <span className="text-paper/20">·</span>
              <a
                href="mailto:hello@t-3.in"
                className="text-[13px] font-medium text-paper/50 transition-colors hover:text-paper"
              >
                hello@t-3.in
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
