"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

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

  // Close mobile on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <nav
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "border-b border-neutral-200/60 bg-white/90 shadow-sm backdrop-blur-xl dark:border-neutral-800 dark:bg-neutral-950/90"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link
          href="/"
          className="text-xl font-bold tracking-tight"
          aria-label="T3 Technologies Home"
        >
          T<span className="text-gold">3</span>
        </Link>

        {/* Desktop */}
        <div className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`text-sm transition-colors ${
                pathname.startsWith(l.href)
                  ? "font-medium text-gold"
                  : "text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
              }`}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/shortlist"
            className="rounded-full bg-neutral-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200"
          >
            Shortlist
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex h-10 w-10 items-center justify-center rounded-lg md:hidden"
          aria-label="Toggle navigation"
          aria-expanded={mobileOpen}
        >
          <div className="space-y-1.5">
            <span
              className={`block h-0.5 w-5 bg-neutral-900 transition-transform dark:bg-white ${mobileOpen ? "translate-y-2 rotate-45" : ""}`}
            />
            <span
              className={`block h-0.5 w-5 bg-neutral-900 transition-opacity dark:bg-white ${mobileOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`block h-0.5 w-5 bg-neutral-900 transition-transform dark:bg-white ${mobileOpen ? "-translate-y-2 -rotate-45" : ""}`}
            />
          </div>
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-neutral-100 bg-white px-6 pb-6 pt-4 md:hidden dark:border-neutral-800 dark:bg-neutral-950">
          <div className="flex flex-col gap-4">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`text-base ${
                  pathname.startsWith(l.href)
                    ? "font-medium text-gold"
                    : "text-neutral-600 dark:text-neutral-400"
                }`}
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/shortlist"
              className="mt-2 rounded-full bg-neutral-900 px-4 py-2.5 text-center text-sm font-medium text-white dark:bg-white dark:text-black"
            >
              Shortlist
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
