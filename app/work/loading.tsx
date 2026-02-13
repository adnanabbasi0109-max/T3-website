import Container from "../../components/layout/Container";
import Section from "../../components/layout/Section";

export default function WorkLoading() {
  return (
    <>
      <Section spacing="md">
        <Container>
          {/* Eyebrow */}
          <div className="mb-3 h-3 w-20 animate-pulse rounded bg-paper-dim" />
          {/* Title */}
          <div className="h-10 w-64 animate-pulse rounded bg-paper-dim sm:h-14 sm:w-80" />
          {/* Subtitle */}
          <div className="mt-4 h-4 w-72 animate-pulse rounded bg-paper-dim sm:w-96" />
        </Container>
      </Section>

      <Section spacing="sm">
        <Container>
          {/* Filter bar skeleton */}
          <div className="flex items-center gap-3 border-b border-border pb-5">
            <div className="h-8 w-40 animate-pulse rounded bg-paper-dim" />
            <div className="h-8 w-24 animate-pulse rounded bg-paper-dim" />
            <div className="h-8 w-24 animate-pulse rounded bg-paper-dim" />
          </div>

          {/* Grid skeleton */}
          <div className="mt-14 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i}>
                <div className="aspect-[3/2] animate-pulse rounded-sm bg-paper-dim" />
                <div className="mt-4 h-3 w-24 animate-pulse rounded bg-paper-dim" />
                <div className="mt-2 h-5 w-40 animate-pulse rounded bg-paper-dim" />
              </div>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
