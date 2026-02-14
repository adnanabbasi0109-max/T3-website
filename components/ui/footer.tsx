import Link from "next/link";

const footerLinks = {
  pages: [
    { href: "/work", label: "Work" },
    { href: "/about", label: "About" },
    { href: "/services", label: "Services" },
    { href: "/contact", label: "Contact" },
  ],
  connect: [
    { href: "mailto:hello@t-3.in", label: "hello@t-3.in", external: true },
    { href: "/shortlist", label: "Shortlist" },
  ],
};

export default function Footer() {
  return (
    <footer className="mt-auto">
      <div className="divider-fade" />
      <div className="mx-auto max-w-[1200px] px-6 sm:px-10 lg:px-16">
        <div className="grid gap-14 py-24 sm:grid-cols-3 sm:py-32">
          <div className="flex flex-col">
            <Link href="/" className="text-[24px] font-bold tracking-[-0.05em] transition-opacity duration-500 hover:opacity-60">
              T<span className="text-gradient">3</span>
            </Link>
            <p className="mt-5 max-w-[220px] text-[13px] leading-[1.85] text-muted">
              Proof-led creative strategy since 2004.
            </p>
            <p className="mt-auto pt-12 text-[11px] text-muted-light">
              Delhi NCR · Jaipur · Bhopal
            </p>
          </div>

          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-muted-light">
              Pages
            </p>
            <nav aria-label="Footer navigation" className="mt-6 flex flex-col gap-3.5">
              {footerLinks.pages.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="link-underline w-fit text-[14px] text-ink/35 transition-colors duration-500 hover:text-ink"
                >
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-muted-light">
              Connect
            </p>
            <nav aria-label="Connect links" className="mt-6 flex flex-col gap-3.5">
              {footerLinks.connect.map((l) =>
                l.external ? (
                  <a
                    key={l.href}
                    href={l.href}
                    className="link-underline w-fit text-[14px] text-ink/35 transition-colors duration-500 hover:text-ink"
                  >
                    {l.label}
                  </a>
                ) : (
                  <Link
                    key={l.href}
                    href={l.href}
                    className="link-underline w-fit text-[14px] text-ink/35 transition-colors duration-500 hover:text-ink"
                  >
                    {l.label}
                  </Link>
                )
              )}
            </nav>
          </div>
        </div>

        <div className="divider-fade" />
        <div className="flex flex-col items-start justify-between gap-3 py-7 sm:flex-row sm:items-center">
          <p className="text-[11px] text-muted-light">
            &copy; {new Date().getFullYear()} T3 Technologies. All rights reserved.
          </p>
          <p className="text-[11px] text-muted-light/40">
            Built with craft in India
          </p>
        </div>
      </div>
    </footer>
  );
}
