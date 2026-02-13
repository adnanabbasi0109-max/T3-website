import Container from "../components/layout/Container";

export default function Loading() {
  return (
    <Container className="py-36 sm:py-48">
      <div className="flex items-center justify-center">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-border border-t-accent" />
      </div>
    </Container>
  );
}
