import Container from "../../components/layout/Container";
import Section from "../../components/layout/Section";

export default function WorkLoading() {
  return (
    <>
      <Section spacing="lg">
        <Container>
          <div className="mb-6 h-3 w-16 animate-pulse rounded-full bg-paper-dim" />
          <div className="h-12 w-48 animate-pulse rounded-[0.5rem] bg-paper-dim sm:h-16 sm:w-64" />
          <div className="mt-7 h-4 w-72 animate-pulse rounded-[0.375rem] bg-paper-dim sm:w-96" />
        </Container>
      </Section>

      <Container>
        <div className="pb-10">
          <div className="divider-fade mb-10" />
          <div className="flex items-center gap-3">
            <div className="h-10 w-48 animate-pulse rounded-full bg-paper-dim" />
            <div className="h-10 w-24 animate-pulse rounded-full bg-paper-dim" />
            <div className="h-10 w-24 animate-pulse rounded-full bg-paper-dim" />
          </div>
        </div>

        <div className="mt-2 space-y-0">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="border-b border-border py-11">
              <div className="h-6 w-64 animate-pulse rounded-[0.375rem] bg-paper-dim sm:w-80" />
              <div className="mt-3 h-3 w-40 animate-pulse rounded-[0.25rem] bg-paper-dim" />
            </div>
          ))}
        </div>
      </Container>
    </>
  );
}
