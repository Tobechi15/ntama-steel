import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Animations } from "@/components/animations";
import { QuoteProvider } from "@/components/quote-provider";
import { SiteHeader } from "@/components/site-header";
import "./globals.css";

const archivo = localFont({
  src: "./fonts/archivo-latin.woff2",
  variable: "--font-archivo",
  weight: "400 900",
  display: "swap",
});

const inter = localFont({
  src: "./fonts/inter-latin.woff2",
  variable: "--font-inter",
  weight: "400 600",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.ntamasteel.com"),
  title: {
    default: "Ntama Steel — Strength in Every Structure",
    template: "%s · Ntama Steel",
  },
  description:
    "Reliable steel supply for contractors, developers and industries. Reinforcement bars, steel beams, roofing sheets and steel pipes, delivered to your programme.",
  keywords: [
    "steel supplier",
    "reinforcement bars",
    "structural steel",
    "roofing sheets",
    "steel pipes",
    "Ntama Steel",
  ],
  openGraph: {
    title: "Ntama Steel — Strength in Every Structure",
    description:
      "Reliable steel supply for projects that matter. Product lines, quote requests and direct contact.",
    type: "website",
    locale: "en",
    images: [{ url: "/images/hero-lift-1100.webp", width: 1100, height: 733 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ntama Steel — Strength in Every Structure",
    description: "Reliable steel supply for projects that matter.",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#121517",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${archivo.variable} ${inter.variable}`}>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-orange focus:px-5 focus:py-3 focus:text-xs focus:font-semibold focus:uppercase focus:tracking-widest focus:text-white"
        >
          Skip to content
        </a>
        <QuoteProvider>
          <SiteHeader />
          {children}
        </QuoteProvider>
        <Animations />
      </body>
    </html>
  );
}
