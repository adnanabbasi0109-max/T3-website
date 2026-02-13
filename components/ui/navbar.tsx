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
      className={`sticky top-0 z-50 w-full transition-all duration-700 ${
        scrolled
          ? "bg-paper/80 shadow-[0_1px_0_var(--color-border)] backdrop-blur-2xl"
          : "bg-transparent"
      }`}
      style={{ mixBlendMode: !scrolled && !mobileOpen ? "difference" : "normal" }}
    >
      <div className="mx-auto flex h-[80px] max-w-[1120px] items-center justify-between px-6 sm:px-10 lg:px-16">
        {/* Logo */}
        <Link
          href="/"
          className="relative z-50 font-display text-[28px] tracking-[-0.02em]"
          aria-label="T3 Technologies Home"
        >
          T<span className="bg-gradient-to-br from-gold to-gold-dark bg-clip-text text-transparent">3</span>
        </Link>

        {/* Desktop links */}
        <div className="hidden items-center gap-9 md:flex">
          {links.map((l) => {
            const active =
              pathname === l.href || pathname.startsWith(l.href + "/");
            return (
              <Link
                key={l.href}
                href={l.href}
                className="group relative text-[13px] font-medium tracking-[0.01em] transition-colors duration-300"
              >
                {l.label}
                {/* Animated underline on hover */}
                <span
                  className={`absolute -bottom-1 left-0 h-[1.5px] bg-current transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] origin-left ${
                    active
                      ? "w-full scale-x-100"
                      : "w-full scale-x-0 group-hover:scale-x-100"
                  }`}
                />
                {/* Active gold dot */}
                {active && (
                  <span className="absolute -bottom-3 left-1/2 h-[4px] w-[4px] -translate-x-1/2 rounded-full bg-gold" />
                )}
              </Link>
            );
          })}
          <Link
            href="/shortlist"
            className="ml-4 flex items-center gap-2 rounded-full border border-current/15 px-5 py-[7px] text-[12px] font-medium tracking-[0.02em] transition-all duration-300 hover:bg-ink hover:text-paper"
          >
            Shortlist
            {count > 0 && (
              <span className="flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-gold px-1 text-[10px] font-bold text-white">
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
                  : "bg-current"
              }`}
            />
            <span
              className={`block h-[1.5px] w-[18px] transition-all duration-400 ${
                mobileOpen ? "opacity-0 bg-paper" : "bg-current"
              }`}
            />
            <span
              className={`block h-[1.5px] w-[18px] transition-all duration-400 ${
                mobileOpen
                  ? "-translate-y-[6.5px] -rotate-45 bg-paper"
                  : "bg-current"
              }`}
            />
          </div>
        </button>
      </div>

      {/* Mobile overlay — dark full-screen */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="dark-section fixed inset-0 z-40 flex flex-col justify-center px-8 md:hidden"
          >
            <nav className="flex flex-col gap-5">
              {links.map((l, i) => (
                <motion.div
                  key={l.href}
                  initial={{ opacity: 0, y: 30, clipPath: "inset(100% 0 0 0)" }}
                  animate={{ opacity: 1, y: 0, clipPath: "inset(0 0 0 0)" }}
                  transition={{
                    delay: 0.08 + i * 0.06,
                    duration: 0.6,
                    ease,
                  }}
                >
                  <Link
                    href={l.href}
                    className={`block font-display text-[3.5rem] leading-[1.1] tracking-[-0.02em] transition-colors ${
                      pathname.startsWith(l.href) ? "text-gold" : "text-paper"
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
              transition={{ delay: 0.4, duration: 0.4 }}
              className="mt-14"
            >
              <Link
                href="/shortlist"
                className="inline-flex items-center gap-2 rounded-full border border-paper/20 px-6 py-3 text-[13px] font-medium text-paper"
              >
                Shortlist
                {count > 0 && (
                  <span className="flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-gold px-1 text-[10px] font-bold text-white">
                    {count}
                  </span>
                )}
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
