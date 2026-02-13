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
    <footer className="mt-auto">
      <div className="divider-fade" />
      <div className="mx-auto max-w-[1120px] px-6 sm:px-10 lg:px-16">
        {/* ── Grid ── */}
        <div className="grid gap-12 py-16 sm:grid-cols-2 sm:py-24 lg:grid-cols-4 lg:py-28">
          {/* Brand — first column on desktop */}
          <div className="flex flex-col">
            <Link href="/" className="text-[28px] font-bold tracking-[-0.05em] transition-opacity duration-500 hover:opacity-70">
              T<span className="text-gradient">3</span>
            </Link>
            <p className="mt-4 max-w-[220px] text-[13px] leading-[1.8] text-muted">
              A Different creative approach since 2004.
            </p>
            <p className="mt-auto pt-8 text-[11px] text-muted-light lg:pt-12">
              Strategy · Craft · Outcome
            </p>
          </div>

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
                  className="link-underline w-fit text-[14px] text-ink/50 transition-colors duration-500 hover:text-ink"
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
                    className="link-underline w-fit text-[14px] text-ink/50 transition-colors duration-500 hover:text-ink"
                  >
                    {l.label}
                  </a>
                ) : (
                  <Link
                    key={l.href}
                    href={l.href}
                    className="link-underline w-fit text-[14px] text-ink/50 transition-colors duration-500 hover:text-ink"
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
        </div>

        {/* ── Bottom bar ── */}
        <div className="divider-fade" />
        <div className="flex flex-col items-start justify-between gap-3 py-6 sm:flex-row sm:items-center">
          <p className="text-[11px] text-muted-light">
            &copy; {new Date().getFullYear()} T3 Technologies. All rights reserved.
          </p>
          <p className="text-[11px] text-muted-light/50">
            Built with craft in India
          </p>
        </div>
      </div>
    </footer>
  );
}
