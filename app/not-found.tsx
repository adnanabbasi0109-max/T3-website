import Link from "next/link";
import Container from "../components/layout/Container";
import Section from "../components/layout/Section";

export default function NotFound() {
  return (
    <Section spacing="xl">
      <Container className="text-center">
        <p className="text-gradient font-display text-[clamp(6rem,18vw,14rem)] leading-[0.85] tracking-[-0.05em]">
          404
        </p>
        <h1 className="mt-8 font-display text-[clamp(1.75rem,3.5vw,3rem)] tracking-[-0.025em]">
          Page not found
        </h1>
        <p className="mx-auto mt-5 max-w-sm text-[15px] leading-[1.85] text-muted">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/"
            className="btn-slide inline-flex h-[52px] items-center rounded-full bg-ink px-10 text-[14px] font-medium text-paper transition-all duration-600 hover:bg-ink-light hover:shadow-card"
          >
            <span className="btn-text">Go Home</span>
          </Link>
          <Link
            href="/work"
            className="inline-flex h-[52px] items-center rounded-full border border-border px-10 text-[14px] font-medium transition-all duration-600 hover:border-border-strong"
          >
            View Work
          </Link>
        </div>
      </Container>
    </Section>
  );
}
