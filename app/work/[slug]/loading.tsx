import Container from "../../../components/layout/Container";
import Section from "../../../components/layout/Section";

export default function CaseStudyLoading() {
  return (
    <>
      <Section spacing="md">
        <Container>
          <div className="mb-12 h-4 w-20 animate-pulse rounded-[0.375rem] bg-paper-dim" />
          <div className="h-12 w-3/4 animate-pulse rounded-[0.5rem] bg-paper-dim sm:h-16" />
          <div className="mt-7 flex gap-2">
            <div className="h-7 w-24 animate-pulse rounded-full bg-paper-dim" />
            <div className="h-7 w-20 animate-pulse rounded-full bg-paper-dim" />
          </div>
        </Container>
      </Section>

      <section className="px-6 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-[1280px]">
          <div className="aspect-[16/9] w-full animate-pulse rounded-[0.5rem] bg-paper-dim" />
        </div>
      </section>

      <Section spacing="sm">
        <Container>
          <div className="flex gap-16 pb-10">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i}>
                <div className="h-2.5 w-14 animate-pulse rounded-[0.25rem] bg-paper-dim" />
                <div className="mt-2.5 h-4 w-24 animate-pulse rounded-[0.25rem] bg-paper-dim" />
              </div>
            ))}
          </div>
          <div className="divider-fade" />
        </Container>
      </Section>

      <Section spacing="md">
        <Container size="narrow">
          <div className="space-y-28">
            {Array.from({ length: 2 }).map((_, i) => (
              <div key={i}>
                <div className="h-8 w-48 animate-pulse rounded-[0.375rem] bg-paper-dim" />
                <div className="mt-7 space-y-3">
                  <div className="h-4 w-full animate-pulse rounded-[0.25rem] bg-paper-dim" />
                  <div className="h-4 w-full animate-pulse rounded-[0.25rem] bg-paper-dim" />
                  <div className="h-4 w-3/4 animate-pulse rounded-[0.25rem] bg-paper-dim" />
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
