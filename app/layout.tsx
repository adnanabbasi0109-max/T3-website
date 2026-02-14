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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="flex min-h-screen flex-col bg-paper text-ink antialiased selection:bg-accent selection:text-white">
        <ShortlistProvider>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded focus:bg-ink focus:px-4 focus:py-2 focus:text-[13px] focus:font-medium focus:text-paper"
          >
            Skip to content
          </a>
          <Navbar />
          <main id="main-content" className="flex-1 pt-[72px]">{children}</main>
          <Footer />
        </ShortlistProvider>
      </body>
    </html>
  );
}
