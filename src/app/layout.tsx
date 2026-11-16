import type { Metadata, Viewport } from "next";
import { Open_Sans, Oswald } from "next/font/google";
import { SITE } from "./data";
import "./globals.css";

// Czcionki jak w szablonie Wix „The Boxer”: nagłówki DIN Neuzeit Grotesk
// Condensed (płatna – zastąpiona Oswaldem), teksty Open Sans Condensed.
const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin", "latin-ext"],
  axes: ["wdth"],
});

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin", "latin-ext"],
});

export const metadata: Metadata = {
  // Pełne adresy w meta tagach (canonical, podgląd w social mediach)
  metadataBase: new URL(SITE.url),
  title: {
    default: SITE.title,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  keywords: SITE.keywords,
  applicationName: SITE.name,
  authors: [{ name: "Maciej Lubowski", url: SITE.url }],
  creator: "Maciej Lubowski",
  category: "fitness",
  alternates: { canonical: "/" },
  // Podgląd linku na Facebooku, WhatsAppie, Messengerze, LinkedInie itd.
  // (obrazek: opengraph-image.tsx)
  openGraph: {
    type: "website",
    locale: "pl_PL",
    url: "/",
    siteName: SITE.name,
    title: SITE.title,
    description: SITE.description,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.title,
    description: SITE.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  // Kod z Google Search Console (Właściwość → Weryfikacja → Tag HTML)
  ...(process.env.GOOGLE_SITE_VERIFICATION && {
    verification: { google: process.env.GOOGLE_SITE_VERIFICATION },
  }),
};

export const viewport: Viewport = {
  themeColor: "#1b181d",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pl"
      className={`${openSans.variable} ${oswald.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
