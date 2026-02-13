import type { Metadata } from "next";
import Navbar from "../components/ui/navbar";
import Footer from "../components/ui/footer";
import { ShortlistProvider } from "../components/ui/shortlist-provider";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "T3 Technologies — Strategy, Craft, Outcome",
    template: "%s — T3 Technologies",
  },
  description:
    "Proof-led creative strategy for brands that refuse to blend in. 20+ years, 300+ projects, 75+ clients.",
  keywords: [
    "branding agency",
    "creative strategy",
    "PR",
    "media strategy",
    "case studies",
    "T3 Technologies",
  ],
  openGraph: {
    title: "T3 Technologies — Strategy, Craft, Outcome",
    description:
      "Proof-led creative strategy for brands that refuse to blend in.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-neutral-900 antialiased dark:bg-neutral-950 dark:text-neutral-100">
        <ShortlistProvider>
          <Navbar />
          <div className="pt-16">{children}</div>
          <Footer />
        </ShortlistProvider>
      </body>
    </html>
  );
}
