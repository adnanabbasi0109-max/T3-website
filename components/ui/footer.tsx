import Link from "next/link";

const footerLinks = {
  work: [
    { href: "/work", label: "Workstories" },
    { href: "/shortlist", label: "Your Shortlist" },
  ],
  company: [
    { href: "/services", label: "Services" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ],
};

export default function Footer() {
  return (
    <footer className="border-t border-border bg-surface-dark text-neutral-400 dark:border-border-dark">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        {/* Top section */}
        <div className="grid gap-12 py-20 sm:grid-cols-2 lg:grid-cols-12">
          {/* Brand — spans wider */}
          <div className="lg:col-span-5">
            <span className="text-2xl font-bold tracking-tight text-white">
              T<span className="text-gold">3</span>
            </span>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-neutral-500">
              Defying conventional wisdom since 2004. Strategy, craft, outcome
              — documented from brief to result.
            </p>
            <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.2em] text-neutral-600">
              Delhi NCR &middot; Jaipur &middot; Bhopal
            </p>
          </div>

          {/* Work links */}
          <div className="lg:col-span-2 lg:col-start-8">
            <p className="mb-5 font-mono text-[10px] font-semibold uppercase tracking-[0.25em] text-neutral-600">
              Work
            </p>
            <nav className="flex flex-col gap-3">
              {footerLinks.work.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="text-sm text-neutral-500 transition-colors hover:text-white"
                >
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Company links */}
          <div className="lg:col-span-2">
            <p className="mb-5 font-mono text-[10px] font-semibold uppercase tracking-[0.25em] text-neutral-600">
              Company
            </p>
            <nav className="flex flex-col gap-3">
              {footerLinks.company.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="text-sm text-neutral-500 transition-colors hover:text-white"
                >
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-neutral-800/60 py-8 sm:flex-row">
          <p className="text-[11px] text-neutral-600">
            &copy; {new Date().getFullYear()} T3 Technologies. All rights
            reserved.
          </p>
          <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-neutral-700">
            Built with conviction, not convention.
          </p>
        </div>
      </div>
    </footer>
  );
}
