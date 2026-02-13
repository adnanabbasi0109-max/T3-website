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
    const onScroll = () => setScrolled(window.scrollY > 20);
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
      className={`fixed top-0 z-50 w-full transition-all duration-500 ${
        scrolled
          ? "bg-surface/90 backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-[1200px] items-center justify-between px-6 lg:px-10">
        <Link
          href="/"
          className="relative z-50 text-[18px] font-bold tracking-tight"
          aria-label="T3 Technologies Home"
        >
          T<span className="text-gold">3</span>
        </Link>

        {/* Desktop */}
        <div className="hidden items-center gap-10 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`text-[13px] tracking-wide transition-colors duration-200 ${
                pathname.startsWith(l.href)
                  ? "text-surface-dark"
                  : "text-muted hover:text-surface-dark"
              }`}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/shortlist"
            className="ml-2 rounded-full border border-surface-dark/15 px-5 py-2 text-[12px] font-medium text-surface-dark transition-all hover:border-surface-dark hover:bg-surface-dark hover:text-white"
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
            <span className={`block h-[1px] w-5 bg-current transition-all duration-300 ${mobileOpen ? "translate-y-[6px] rotate-45" : ""}`} />
            <span className={`block h-[1px] w-5 bg-current transition-all duration-300 ${mobileOpen ? "opacity-0" : ""}`} />
            <span className={`block h-[1px] w-5 bg-current transition-all duration-300 ${mobileOpen ? "-translate-y-[6px] -rotate-45" : ""}`} />
          </div>
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 flex flex-col justify-center bg-surface px-10 md:hidden"
          >
            <nav className="flex flex-col gap-8">
              {links.map((l, i) => (
                <motion.div
                  key={l.href}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 + i * 0.04, duration: 0.4 }}
                >
                  <Link
                    href={l.href}
                    className={`text-[2rem] font-bold tracking-tight ${
                      pathname.startsWith(l.href) ? "text-gold" : ""
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
              transition={{ delay: 0.3 }}
              className="mt-16"
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
