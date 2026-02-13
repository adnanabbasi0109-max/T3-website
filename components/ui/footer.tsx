import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-border">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-10">
        <div className="grid gap-16 py-24 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-2">
            <span className="text-[18px] font-bold tracking-tight">
              T<span className="text-gold">3</span>
            </span>
            <p className="mt-5 max-w-xs text-[14px] leading-[1.7] text-muted">
              Strategy, craft, outcome. Defying conventional wisdom since 2004.
            </p>
            <p className="mt-8 text-[11px] uppercase tracking-[0.2em] text-neutral-400">
              Delhi NCR &middot; Jaipur &middot; Bhopal
            </p>
          </div>

          {/* Links */}
          <div>
            <p className="mb-5 text-[11px] font-medium uppercase tracking-[0.2em] text-neutral-400">
              Work
            </p>
            <nav className="flex flex-col gap-3">
              <Link href="/work" className="text-[14px] text-muted transition hover:text-surface-dark">Workstories</Link>
              <Link href="/shortlist" className="text-[14px] text-muted transition hover:text-surface-dark">Your Shortlist</Link>
            </nav>
          </div>

          <div>
            <p className="mb-5 text-[11px] font-medium uppercase tracking-[0.2em] text-neutral-400">
              Company
            </p>
            <nav className="flex flex-col gap-3">
              <Link href="/services" className="text-[14px] text-muted transition hover:text-surface-dark">Services</Link>
              <Link href="/about" className="text-[14px] text-muted transition hover:text-surface-dark">About</Link>
              <Link href="/contact" className="text-[14px] text-muted transition hover:text-surface-dark">Contact</Link>
            </nav>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-border py-8 sm:flex-row">
          <p className="text-[12px] text-neutral-400">
            &copy; {new Date().getFullYear()} T3 Technologies
          </p>
          <p className="text-[12px] text-neutral-400">
            Built with conviction.
          </p>
        </div>
      </div>
    </footer>
  );
}
