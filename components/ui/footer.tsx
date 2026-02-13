import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-neutral-100 bg-neutral-950 py-20 text-neutral-400 dark:border-neutral-800">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <span className="text-xl font-bold text-white">
              T<span className="text-gold">3</span>
            </span>
            <p className="mt-3 text-sm leading-relaxed">
              Defying conventional wisdom since 2004. Strategy, craft, outcome.
            </p>
            <p className="mt-4 text-xs text-neutral-600">
              Delhi NCR &middot; Jaipur &middot; Bhopal
            </p>
          </div>

          {/* Work */}
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-neutral-500">
              Work
            </p>
            <div className="flex flex-col gap-2 text-sm">
              <Link href="/work" className="transition hover:text-white">
                Workstories
              </Link>
              <Link href="/shortlist" className="transition hover:text-white">
                Your Shortlist
              </Link>
            </div>
          </div>

          {/* Company */}
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-neutral-500">
              Company
            </p>
            <div className="flex flex-col gap-2 text-sm">
              <Link href="/about" className="transition hover:text-white">
                About
              </Link>
              <Link href="/services" className="transition hover:text-white">
                Services
              </Link>
              <Link href="/contact" className="transition hover:text-white">
                Contact
              </Link>
            </div>
          </div>

          {/* Philosophy */}
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-neutral-500">
              Philosophy
            </p>
            <p className="text-sm leading-relaxed">
              Humane Technology &mdash; balancing tradition with innovation to
              create solutions that serve people first.
            </p>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-neutral-800 pt-8 text-xs text-neutral-600 sm:flex-row">
          <p>&copy; {new Date().getFullYear()} T3 Technologies. All rights reserved.</p>
          <p>
            Built with conviction, not convention.
          </p>
        </div>
      </div>
    </footer>
  );
}
