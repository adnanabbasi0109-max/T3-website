import Link from "next/link";
import Marquee from "../motion/Marquee";

export default function Footer() {
  return (
    <footer className="dark-section mt-auto">
      {/* ── Large CTA ── */}
      <div className="mx-auto max-w-[1120px] px-6 pt-32 sm:px-10 sm:pt-40 lg:px-16">
        <h2 className="font-display text-[clamp(2.5rem,6vw,5rem)] leading-[1.1] tracking-[-0.02em] text-paper">
          Let&apos;s build something
        </h2>
        <a
          href="mailto:hello@t-3.in"
          className="mt-8 inline-block text-[clamp(1rem,2.5vw,1.75rem)] font-light text-paper/60 transition-colors duration-300 hover:text-gold"
        >
          hello@t-3.in
        </a>
      </div>

      {/* ── Marquee divider ── */}
      <div className="mt-24 border-y border-border-dark py-7 sm:mt-32">
        <Marquee
          text="Strategy \u00b7 Craft \u00b7 Outcome \u00b7 T3 Technologies \u00b7 Defy Convention"
          className="text-[13px] font-medium uppercase tracking-[0.2em] text-paper/20"
          speed={50}
        />
      </div>

      {/* ── Link columns ── */}
      <div className="mx-auto max-w-[1120px] px-6 sm:px-10 lg:px-16">
        <div className="grid gap-14 py-20 sm:grid-cols-2 sm:py-24 lg:grid-cols-[2fr_1fr_1fr]">
          {/* Brand */}
          <div>
            <span className="font-display text-[24px] tracking-[-0.02em] text-paper">
              T<span className="text-gold">3</span>
            </span>
            <p className="mt-6 max-w-[280px] text-[14px] leading-[1.75] text-paper/40">
              Strategy, craft, outcome. Defying conventional wisdom since 2004.
            </p>
            <p className="mt-8 text-[11px] font-medium uppercase tracking-[0.2em] text-paper/25">
              Delhi NCR &middot; Jaipur &middot; Bhopal
            </p>
          </div>

          {/* Work */}
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-paper/30">
              Work
            </p>
            <nav className="mt-5 flex flex-col gap-3">
              <Link
                href="/work"
                className="text-[14px] text-paper/50 transition-all duration-300 hover:translate-x-1 hover:text-paper"
              >
                Workstories
              </Link>
              <Link
                href="/shortlist"
                className="text-[14px] text-paper/50 transition-all duration-300 hover:translate-x-1 hover:text-paper"
              >
                Your Shortlist
              </Link>
            </nav>
          </div>

          {/* Company */}
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-paper/30">
              Company
            </p>
            <nav className="mt-5 flex flex-col gap-3">
              <Link
                href="/services"
                className="text-[14px] text-paper/50 transition-all duration-300 hover:translate-x-1 hover:text-paper"
              >
                Services
              </Link>
              <Link
                href="/about"
                className="text-[14px] text-paper/50 transition-all duration-300 hover:translate-x-1 hover:text-paper"
              >
                About
              </Link>
              <Link
                href="/contact"
                className="text-[14px] text-paper/50 transition-all duration-300 hover:translate-x-1 hover:text-paper"
              >
                Contact
              </Link>
            </nav>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="flex flex-col items-center justify-between gap-3 border-t border-border-dark py-8 sm:flex-row">
          <p className="text-[12px] text-paper/25">
            &copy; {new Date().getFullYear()} T3 Technologies
          </p>
          <span className="font-display text-[14px] tracking-[-0.02em] text-paper/25">
            T<span className="text-gold/40">3</span>
          </span>
        </div>
      </div>
    </footer>
  );
}
