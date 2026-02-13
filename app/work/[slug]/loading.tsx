import Container from "../../../components/layout/Container";

export default function CaseStudyLoading() {
  return (
    <>
      {/* Header skeleton */}
      <section className="pb-8 pt-8 sm:pb-12 sm:pt-12">
        <Container>
          <div className="mb-6 h-4 w-28 animate-pulse rounded bg-paper-dim" />
          <div className="h-3 w-16 animate-pulse rounded bg-paper-dim" />
          <div className="mt-3 h-10 w-3/4 animate-pulse rounded bg-paper-dim sm:h-14" />
        </Container>
      </section>

      {/* Hero image skeleton */}
      <section className="px-6 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-[1280px]">
          <div className="aspect-[2/1] w-full animate-pulse rounded-sm bg-paper-dim sm:aspect-[2.5/1]" />
        </div>
      </section>

      {/* Meta skeleton */}
      <section className="py-12 sm:py-16">
        <Container>
          <div className="flex gap-10 border-b border-border pb-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i}>
                <div className="h-2.5 w-12 animate-pulse rounded bg-paper-dim" />
                <div className="mt-2 h-4 w-20 animate-pulse rounded bg-paper-dim" />
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Content skeleton */}
      <section className="py-12">
        <Container size="narrow">
          <div className="space-y-16">
            {Array.from({ length: 2 }).map((_, i) => (
              <div key={i}>
                <div className="h-7 w-48 animate-pulse rounded bg-paper-dim" />
                <div className="mt-5 space-y-3">
                  <div className="h-4 w-full animate-pulse rounded bg-paper-dim" />
                  <div className="h-4 w-full animate-pulse rounded bg-paper-dim" />
                  <div className="h-4 w-3/4 animate-pulse rounded bg-paper-dim" />
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
