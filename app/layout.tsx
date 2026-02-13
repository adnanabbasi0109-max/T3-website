import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "T3 — Strategy, Craft, Outcome",
  description: "Proof-led case studies in branding, PR, and creative strategy.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-neutral-900 antialiased">
        {children}
      </body>
    </html>
  );
}
