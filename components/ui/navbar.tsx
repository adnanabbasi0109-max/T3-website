"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useShortlist } from "./shortlist-provider";

const links = [
  { href: "/work", label: "Work" },
  { href: "/domains", label: "Domains" },
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
    const onScroll = () => setScrolled(window.scrollY > 24);
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
      <nav
        aria-label="Main navigation"
        className={`fixed left-0 right-0 top-0 z-50 transition-all duration-700 ease-[cubic-bezier(0.165,0.84,0.44,1)] ${
          scrolled
            ? "bg-paper/85 shadow-nav backdrop-blur-2xl"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-[72px] max-w-[1200px] items-center justify-between px-6 sm:px-10 lg:px-16">
          <Link
            href="/"
            className="relative z-50 text-[22px] font-bold tracking-[-0.05em] transition-opacity duration-500 hover:opacity-60"
            aria-label="T3 Technologies Home"
          >
            T<span className="text-gradient">3</span>
          </Link>

          <div className="hidden items-center gap-11 md:flex">
            {links.map((l) => {
              const active =
                pathname === l.href || pathname.startsWith(l.href + "/");
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  className={`link-underline relative text-[13px] font-medium tracking-[0.01em] transition-colors duration-500 ${
                    active ? "text-ink" : "text-muted hover:text-ink"
                  }`}
                >
                  {l.label}
                  {active && (
                    <motion.span
                      layoutId="nav-dot"
                      className="absolute -bottom-1.5 left-1/2 h-[3px] w-[3px] -translate-x-1/2 rounded-full bg-accent"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}

            {count > 0 && (
              <Link
                href="/shortlist"
                aria-label={`Shortlist (${count} items)`}
                className="relative ml-1 flex h-8 w-8 items-center justify-center rounded-full border border-border transition-all duration-500 hover:border-border-strong"
              >
                <svg className="h-[13px] w-[13px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
                </svg>
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 500, damping: 20 }}
                  className="absolute -right-1.5 -top-1.5 flex h-[16px] min-w-[16px] items-center justify-center rounded-full bg-accent px-1 text-[8px] font-bold text-white"
                >
                  {count}
                </motion.span>
              </Link>
            )}
          </div>

          <div className="flex items-center gap-3 md:hidden">
            {count > 0 && (
              <Link
                href="/shortlist"
                aria-label={`Shortlist (${count} items)`}
                className="relative z-50 flex h-9 w-9 items-center justify-center"
              >
                <svg className="h-[14px] w-[14px]" fill="none" viewBox="0 0 24 24" stroke={mobileOpen ? "var(--color-paper)" : "currentColor"} strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
                </svg>
                <span className="absolute -right-0.5 top-0 flex h-[15px] min-w-[15px] items-center justify-center rounded-full bg-accent px-1 text-[8px] font-bold text-white">
                  {count}
                </span>
              </Link>
            )}

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="relative z-50 flex h-10 w-10 items-center justify-center"
              aria-label="Toggle navigation"
              aria-expanded={mobileOpen}
            >
              <div className="flex flex-col gap-[6px]">
                <span
                  className={`block h-[1.5px] w-5 origin-center transition-all duration-500 ${
                    mobileOpen ? "translate-y-[7.5px] rotate-45 bg-paper" : "bg-ink"
                  }`}
                />
                <span
                  className={`block h-[1.5px] w-5 transition-all duration-500 ${
                    mobileOpen ? "scale-x-0 bg-paper" : "bg-ink"
                  }`}
                />
                <span
                  className={`block h-[1.5px] w-5 origin-center transition-all duration-500 ${
                    mobileOpen ? "-translate-y-[7.5px] -rotate-45 bg-paper" : "bg-ink"
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease }}
            className="fixed inset-0 z-40 flex flex-col justify-end bg-ink px-8 pb-14 pt-28 md:hidden"
          >
            <nav aria-label="Mobile navigation" className="flex flex-col gap-2">
              {links.map((l, i) => (
                <motion.div
                  key={l.href}
                  initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ delay: 0.08 + i * 0.06, duration: 0.7, ease }}
                >
                  <Link
                    href={l.href}
                    className={`block py-3 font-display text-[2.75rem] leading-[1.1] tracking-[-0.03em] transition-colors duration-500 sm:text-[3.5rem] ${
                      pathname === l.href || pathname.startsWith(l.href + "/")
                        ? "text-accent"
                        : "text-paper/50 hover:text-paper"
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
              transition={{ delay: 0.4, duration: 0.5, ease }}
              className="mt-auto pt-16"
            >
              <div className="divider-fade mb-6 opacity-20" />
              <div className="flex items-center justify-between">
                <a
                  href="mailto:hello@t-3.in"
                  className="text-[13px] font-medium text-paper/35 transition-colors duration-500 hover:text-paper"
                >
                  hello@t-3.in
                </a>
                <span className="text-[12px] text-paper/20">
                  Delhi NCR · Jaipur · Bhopal
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
