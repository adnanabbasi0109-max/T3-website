import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-border">
      <div className="mx-auto max-w-[1120px] px-6 sm:px-8 lg:px-12">
        {/* Main grid */}
        <div className="grid gap-14 py-20 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr]">
          {/* Brand */}
          <div>
            <span className="text-[20px] font-bold tracking-[-0.04em]">
              T<span className="text-gold">3</span>
            </span>
            <p className="mt-6 max-w-[280px] text-[14px] leading-[1.75] text-muted">
              Strategy, craft, outcome. Defying conventional wisdom since 2004.
            </p>
            <p className="mt-8 text-[11px] font-medium uppercase tracking-[0.2em] text-muted/60">
              Delhi NCR &middot; Jaipur &middot; Bhopal
            </p>
          </div>

          {/* Work */}
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted/60">
              Work
            </p>
            <nav className="mt-5 flex flex-col gap-3">
              <Link
                href="/work"
                className="text-[14px] text-muted transition-colors duration-300 hover:text-surface-dark"
              >
                Workstories
              </Link>
              <Link
                href="/shortlist"
                className="text-[14px] text-muted transition-colors duration-300 hover:text-surface-dark"
              >
                Your Shortlist
              </Link>
            </nav>
          </div>

          {/* Company */}
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted/60">
              Company
            </p>
            <nav className="mt-5 flex flex-col gap-3">
              <Link
                href="/services"
                className="text-[14px] text-muted transition-colors duration-300 hover:text-surface-dark"
              >
                Services
              </Link>
              <Link
                href="/about"
                className="text-[14px] text-muted transition-colors duration-300 hover:text-surface-dark"
              >
                About
              </Link>
              <Link
                href="/contact"
                className="text-[14px] text-muted transition-colors duration-300 hover:text-surface-dark"
              >
                Contact
              </Link>
            </nav>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-3 border-t border-border py-7 sm:flex-row">
          <p className="text-[12px] text-muted/60">
            &copy; {new Date().getFullYear()} T3 Technologies
          </p>
          <p className="text-[12px] text-muted/60">
            Built with conviction.
          </p>
        </div>
      </div>
    </footer>
  );
}
