export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Admin pages render inside the root layout but we suppress
  // the global pt-16 padding via negative margin on the admin nav.
  return <>{children}</>;
}
