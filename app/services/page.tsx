import Link from "next/link";
import { SERVICES } from "../../lib/utils";
import Reveal from "../../components/motion/Reveal";
import Container from "../../components/layout/Container";

export const metadata = {
  title: "Services",
  description:
    "Brand Building, Business Innovations, PR, Social Media, Art & Design, AI & Tech.",
};

/* Bento grid layout config for each service card */
const GRID_CONFIG = [
  { span: "sm:col-span-2 sm:row-span-2", bg: "dark-section", textColor: "text-paper" },
  { span: "", bg: "bg-paper-warm", textColor: "text-ink" },
  { span: "", bg: "bg-paper", textColor: "text-ink" },
  { span: "sm:col-span-2", bg: "bg-ink/[0.03]", textColor: "text-ink" },
  { span: "", bg: "bg-gradient-to-br from-gold/10 to-gold/5", textColor: "text-ink" },
  { span: "", bg: "dark-section", textColor: "text-paper" },
];

const ICONS: Record<string, React.ReactNode> = {
  layers: (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L12 12.75 6.429 9.75m11.142 0l4.179 2.25-4.179 2.25m0 0L12 17.25l-5.571-3" />
    </svg>
  ),
  lightbulb: (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
    </svg>
  ),
  megaphone: (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 110-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18c.253.962.584 1.892.985 2.783.247.55.06 1.21-.463 1.511l-.657.38c-.551.318-1.26.117-1.527-.461a20.845 20.845 0 01-1.44-4.282m3.102.069a18.03 18.03 0 01-.59-4.59c0-1.586.205-3.124.59-4.59m0 9.18a23.848 23.848 0 018.835 2.535M10.34 6.66a23.847 23.847 0 008.835-2.535m0 0A23.74 23.74 0 0018.795 3m.38 1.125a23.91 23.91 0 011.014 5.395m-1.014 8.855c-.118.38-.245.754-.38 1.125m.38-1.125a23.91 23.91 0 001.014-5.395m0-3.46c.495.413.811 1.035.811 1.73 0 .695-.316 1.317-.811 1.73m0-3.46a24.347 24.347 0 010 3.46" />
    </svg>
  ),
  share2: (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 0m-3.935 0a2.25 2.25 0 00-3.935 0m7.87-12.628a2.25 2.25 0 10-3.935 0m3.935 0a2.25 2.25 0 00-3.935 0" />
    </svg>
  ),
  palette: (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.098 19.902a3.75 3.75 0 005.304 0l6.401-6.402M6.75 21A3.75 3.75 0 013 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 003.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072M10.5 8.197l2.88-2.88c.438-.439 1.15-.439 1.59 0l3.712 3.713c.44.44.44 1.152 0 1.59l-2.879 2.88M6.75 17.25h.008v.008H6.75v-.008z" />
    </svg>
  ),
  cpu: (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 002.25-2.25V6.75a2.25 2.25 0 00-2.25-2.25H6.75A2.25 2.25 0 004.5 6.75v10.5a2.25 2.25 0 002.25 2.25zm.75-12h9v9h-9v-9z" />
    </svg>
  ),
};

export default function ServicesPage() {
  return (
    <main>
      {/* ── Hero — massive title, no gold label ── */}
      <section className="pb-12 pt-20 sm:pt-28 lg:pt-36">
        <Container>
          <Reveal>
            <h1 className="font-display text-[clamp(3rem,10vw,8rem)] leading-[0.92] tracking-[-0.02em]">
              Services
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-lg text-[15px] leading-[1.75] text-muted">
              Six disciplines. One doctrine: defy conventional wisdom,
              deconstruct complex systems to create simple, powerful solutions.
            </p>
          </Reveal>
        </Container>
      </section>

      {/* ── Bento Grid ── */}
      <section className="pb-24 sm:pb-32">
        <Container>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((svc, i) => {
              const config = GRID_CONFIG[i] || GRID_CONFIG[0];
              const isDark = config.bg.includes("dark-section") || config.bg.includes("bg-ink");
              const icon = ICONS[svc.icon] || null;

              return (
                <Reveal key={svc.title} delay={i * 0.06} stiffness="snappy">
                  <div
                    className={`group rounded-xl p-8 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_16px_48px_rgba(0,0,0,0.08)] lg:p-10 ${config.span} ${config.bg}`}
                  >
                    {/* Icon */}
                    {icon && (
                      <div className={`mb-6 ${isDark ? "text-gold-light" : "text-gold"}`}>
                        {icon}
                      </div>
                    )}

                    <h2
                      className={`font-display text-[clamp(1.25rem,2vw,1.75rem)] tracking-[-0.02em] ${config.textColor}`}
                    >
                      {svc.title}
                    </h2>
                    <p
                      className={`mt-2 text-[13px] font-medium uppercase tracking-[0.1em] ${
                        isDark ? "text-gold-light/60" : "text-gold"
                      }`}
                    >
                      {svc.tagline}
                    </p>
                    <p
                      className={`mt-4 text-[14px] leading-[1.75] ${
                        isDark ? "text-paper/50" : "text-muted"
                      }`}
                    >
                      {svc.desc}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </section>

      {/* ── CTA ── */}
      <section className="dark-section relative overflow-hidden py-24 sm:py-32">
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="select-none font-display text-[20vw] leading-none text-paper/[0.03]">
            T3
          </span>
        </div>
        <Container className="relative">
          <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
            <Reveal>
              <h2 className="font-display text-[clamp(1.5rem,3.5vw,2.75rem)] tracking-[-0.02em] text-paper">
                Not sure what you need?
              </h2>
              <p className="mt-4 text-[15px] leading-[1.75] text-paper/50">
                Tell us your challenge. We&apos;ll map the right services.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <Link
                href="/contact"
                className="inline-flex h-[52px] items-center gap-2 bg-paper px-10 text-[13px] font-medium text-ink transition-all duration-300 hover:bg-paper/90"
              >
                Start a Conversation&nbsp;&rarr;
              </Link>
            </Reveal>
          </div>
        </Container>
      </section>
    </main>
  );
}
