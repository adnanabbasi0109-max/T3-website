import Link from "next/link";

const footerLinks = {
  sitemap: [
    { href: "/", label: "Home" },
    { href: "/work", label: "Work" },
    { href: "/services", label: "Services" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ],
  connect: [
    { href: "/shortlist", label: "Shortlist" },
    { href: "mailto:hello@t-3.in", label: "Email Us", external: true },
  ],
  offices: ["Delhi NCR", "Jaipur", "Bhopal"],
};

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-border">
      <div className="mx-auto max-w-[1120px] px-6 sm:px-10 lg:px-16">
        {/* ── Grid ── */}
        <div className="grid gap-12 py-16 sm:grid-cols-2 sm:py-24 lg:grid-cols-4 lg:py-28">
          {/* Sitemap */}
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-muted-light">
              Sitemap
            </p>
            <nav aria-label="Footer sitemap" className="mt-5 flex flex-col gap-3">
              {footerLinks.sitemap.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="text-[14px] text-ink/50 transition-colors duration-500 hover:text-ink"
                >
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Connect */}
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-muted-light">
              Connect
            </p>
            <nav aria-label="Connect links" className="mt-5 flex flex-col gap-3">
              {footerLinks.connect.map((l) =>
                l.external ? (
                  <a
                    key={l.href}
                    href={l.href}
                    className="text-[14px] text-ink/50 transition-colors duration-500 hover:text-ink"
                  >
                    {l.label}
                  </a>
                ) : (
                  <Link
                    key={l.href}
                    href={l.href}
                    className="text-[14px] text-ink/50 transition-colors duration-500 hover:text-ink"
                  >
                    {l.label}
                  </Link>
                )
              )}
            </nav>
          </div>

          {/* Offices */}
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-muted-light">
              Offices
            </p>
            <div className="mt-5 flex flex-col gap-3">
              {footerLinks.offices.map((city) => (
                <p key={city} className="text-[14px] text-ink/50">
                  {city}
                </p>
              ))}
            </div>
          </div>

          {/* Brand */}
          <div className="flex flex-col justify-between">
            <Link href="/" className="text-[28px] font-bold tracking-[-0.04em]">
              T<span className="text-accent">3</span>
            </Link>
            <p className="mt-4 max-w-[220px] text-[13px] leading-[1.8] text-ink/40 lg:mt-auto">
              A Different creative approach since 2004.
            </p>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="flex flex-col items-start justify-between gap-3 border-t border-border py-6 sm:flex-row sm:items-center">
          <p className="text-[11px] text-muted-light">
            &copy; {new Date().getFullYear()} T3 Technologies. All rights reserved.
          </p>
          <p className="text-[11px] text-muted-light">
            Strategy · Craft · Outcome
          </p>
        </div>
      </div>
    </footer>
  );
}
