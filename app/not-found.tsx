import Link from "next/link";
import Container from "../components/layout/Container";
import Section from "../components/layout/Section";

export default function NotFound() {
  return (
    <Section spacing="xl">
      <Container className="text-center">
        <p className="font-display text-[clamp(5rem,15vw,12rem)] leading-[1] tracking-[-0.04em] text-border">
          404
        </p>
        <h1 className="mt-6 font-display text-[clamp(1.5rem,3vw,2.5rem)] tracking-[-0.02em]">
          Page not found
        </h1>
        <p className="mx-auto mt-4 max-w-sm text-[15px] leading-[1.75] text-muted">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/"
            className="inline-flex h-11 items-center bg-ink px-8 text-[13px] font-medium text-paper transition-colors duration-300 hover:bg-ink-light"
          >
            Go Home
          </Link>
          <Link
            href="/work"
            className="inline-flex h-11 items-center border border-border px-8 text-[13px] font-medium text-ink transition-colors duration-300 hover:border-ink/30"
          >
            View Work
          </Link>
        </div>
      </Container>
    </Section>
  );
}
