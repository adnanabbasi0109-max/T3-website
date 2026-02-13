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

const ease: [number, number, number, number] = [0.165, 0.84, 0.44, 1];

export default function Navbar() {
  const pathname = usePathname() ?? "";
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { count } = useShortlist();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
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
    <>
      {/* ── HUD-style nav bar ── */}
      <nav
        aria-label="Main navigation"
        className={`fixed left-0 right-0 top-0 z-50 transition-all duration-700 ${
          scrolled
            ? "bg-paper/80 backdrop-blur-2xl"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-[72px] max-w-[1120px] items-center justify-between px-6 sm:px-10 lg:px-16">
          {/* Logo */}
          <Link
            href="/"
            className="relative z-50 text-[20px] font-bold tracking-[-0.04em]"
            aria-label="T3 Technologies Home"
          >
            T<span className="text-accent">3</span>
          </Link>

          {/* Desktop links */}
          <div className="hidden items-center gap-10 md:flex">
            {links.map((l) => {
              const active =
                pathname === l.href || pathname.startsWith(l.href + "/");
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  className={`relative text-[13px] font-medium tracking-[0.01em] transition-all duration-500 ${
                    active
                      ? "text-ink"
                      : "text-muted hover:text-ink"
                  }`}
                >
                  {l.label}
                </Link>
              );
            })}

            {/* Shortlist — icon only */}
            <Link
              href="/shortlist"
              aria-label={`Shortlist${count > 0 ? ` (${count} items)` : ""}`}
              className="relative ml-1 flex h-9 w-9 items-center justify-center rounded-full border border-border transition-all duration-500 hover:border-border-strong"
            >
              <svg className="h-[14px] w-[14px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
              </svg>
              {count > 0 && (
                <span className="absolute -right-1 -top-1 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-accent px-1 text-[9px] font-bold text-white">
                  {count}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile: shortlist + hamburger */}
          <div className="flex items-center gap-3 md:hidden">
            <Link
              href="/shortlist"
              aria-label={`Shortlist${count > 0 ? ` (${count} items)` : ""}`}
              className="relative z-50 flex h-9 w-9 items-center justify-center"
            >
              <svg className="h-[14px] w-[14px]" fill="none" viewBox="0 0 24 24" stroke={mobileOpen ? "var(--color-paper)" : "currentColor"} strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
              </svg>
              {count > 0 && (
                <span className="absolute -right-0.5 top-0 flex h-[16px] min-w-[16px] items-center justify-center rounded-full bg-accent px-1 text-[8px] font-bold text-white">
                  {count}
                </span>
              )}
            </Link>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="relative z-50 flex h-10 w-10 items-center justify-center"
              aria-label="Toggle navigation"
              aria-expanded={mobileOpen}
            >
              <div className="flex flex-col gap-[6px]">
                <span
                  className={`block h-[1.5px] w-5 origin-center transition-all duration-500 ${
                    mobileOpen
                      ? "translate-y-[7.5px] rotate-45 bg-paper"
                      : "bg-ink"
                  }`}
                />
                <span
                  className={`block h-[1.5px] w-5 transition-all duration-500 ${
                    mobileOpen ? "scale-x-0 bg-paper" : "bg-ink"
                  }`}
                />
                <span
                  className={`block h-[1.5px] w-5 origin-center transition-all duration-500 ${
                    mobileOpen
                      ? "-translate-y-[7.5px] -rotate-45 bg-paper"
                      : "bg-ink"
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* ── Full-screen mobile menu ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease }}
            className="fixed inset-0 z-40 flex flex-col justify-end bg-ink px-8 pb-12 pt-28 md:hidden"
          >
            <nav aria-label="Mobile navigation" className="flex flex-col gap-2">
              {links.map((l, i) => (
                <motion.div
                  key={l.href}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 + i * 0.06, duration: 0.7, ease }}
                >
                  <Link
                    href={l.href}
                    className={`block py-3 font-display text-[2.75rem] leading-[1.1] tracking-[-0.025em] transition-colors duration-500 sm:text-[3.5rem] ${
                      pathname === l.href || pathname.startsWith(l.href + "/")
                        ? "text-accent"
                        : "text-paper/70 hover:text-paper"
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
              transition={{ delay: 0.45, duration: 0.4, ease }}
              className="mt-auto flex items-center gap-5 pt-12"
            >
              <a
                href="mailto:hello@t-3.in"
                className="text-[13px] font-medium text-paper/40 transition-colors duration-500 hover:text-paper"
              >
                hello@t-3.in
              </a>
              <span className="text-paper/15">·</span>
              <span className="text-[13px] text-paper/25">
                Delhi NCR · Jaipur · Bhopal
              </span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
