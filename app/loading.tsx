import Container from "../components/layout/Container";

export default function Loading() {
  return (
    <Container className="py-44 sm:py-56">
      <div className="flex items-center justify-center">
        <div className="h-5 w-5 animate-spin rounded-full border-2 border-border border-t-accent" />
      </div>
    </Container>
  );
}
