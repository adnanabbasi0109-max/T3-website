import Container from "../../components/layout/Container";
import Section from "../../components/layout/Section";

export default function WorkLoading() {
  return (
    <>
      <Section spacing="lg">
        <Container>
          <div className="h-12 w-48 animate-pulse rounded-[0.875rem] bg-paper-dim sm:h-16 sm:w-64" />
          <div className="mt-6 h-4 w-72 animate-pulse rounded-[0.625rem] bg-paper-dim sm:w-96" />
        </Container>
      </Section>

      <Container>
        {/* Filter bar skeleton */}
        <div className="flex items-center gap-3 border-b border-border pb-6">
          <div className="h-10 w-48 animate-pulse rounded-full bg-paper-dim" />
          <div className="h-10 w-24 animate-pulse rounded-full bg-paper-dim" />
          <div className="h-10 w-24 animate-pulse rounded-full bg-paper-dim" />
        </div>

        {/* 2-col grid skeleton */}
        <div className="mt-16 grid gap-10 sm:grid-cols-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i}>
              <div className="aspect-[14/9] animate-pulse rounded-[1.375rem] bg-paper-dim" />
              <div className="mt-5 h-5 w-40 animate-pulse rounded-[0.625rem] bg-paper-dim" />
              <div className="mt-2.5 h-3 w-24 animate-pulse rounded-[0.625rem] bg-paper-dim" />
            </div>
          ))}
        </div>
      </Container>
    </>
  );
}
