import Container from "../components/layout/Container";

export default function Loading() {
  return (
    <Container className="py-24 sm:py-36">
      <div className="flex items-center justify-center">
        <div className="h-5 w-5 animate-spin rounded-full border-[1.5px] border-border border-t-ink" />
      </div>
    </Container>
  );
}
