import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-border">
      <div className="mx-auto max-w-[1080px] px-6 sm:px-8 lg:px-12">
        {/* ── Main grid ── */}
        <div className="grid gap-12 py-16 sm:grid-cols-2 sm:py-20 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
          {/* Brand */}
          <div>
            <Link href="/" className="font-display text-[20px] tracking-[-0.02em]">
              T<span className="text-gold">3</span>
            </Link>
            <p className="mt-4 max-w-[260px] text-[13px] leading-[1.7] text-muted">
              Strategy, craft, outcome. Defying conventional wisdom since 2004.
            </p>
          </div>

          {/* Work */}
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-muted-light">
              Work
            </p>
            <nav className="mt-4 flex flex-col gap-2.5">
              <Link href="/work" className="text-[13px] text-ink/60 transition-colors duration-300 hover:text-ink">
                Workstories
              </Link>
              <Link href="/shortlist" className="text-[13px] text-ink/60 transition-colors duration-300 hover:text-ink">
                Shortlist
              </Link>
            </nav>
          </div>

          {/* Company */}
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-muted-light">
              Company
            </p>
            <nav className="mt-4 flex flex-col gap-2.5">
              <Link href="/services" className="text-[13px] text-ink/60 transition-colors duration-300 hover:text-ink">
                Services
              </Link>
              <Link href="/about" className="text-[13px] text-ink/60 transition-colors duration-300 hover:text-ink">
                About
              </Link>
              <Link href="/contact" className="text-[13px] text-ink/60 transition-colors duration-300 hover:text-ink">
                Contact
              </Link>
            </nav>
          </div>

          {/* Contact */}
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-muted-light">
              Get in Touch
            </p>
            <div className="mt-4 flex flex-col gap-2.5">
              <a
                href="mailto:hello@t-3.in"
                className="text-[13px] text-ink/60 transition-colors duration-300 hover:text-ink"
              >
                hello@t-3.in
              </a>
              <p className="text-[13px] text-ink/40">
                Delhi NCR · Jaipur · Bhopal
              </p>
            </div>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="flex items-center justify-between border-t border-border py-6">
          <p className="text-[11px] text-muted-light">
            &copy; {new Date().getFullYear()} T3 Technologies
          </p>
          <p className="text-[11px] text-muted-light">
            Since 2004
          </p>
        </div>
      </div>
    </footer>
  );
}
