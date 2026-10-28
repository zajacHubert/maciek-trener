import type { Metadata } from "next";
import { Open_Sans, Oswald } from "next/font/google";
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
  title: "Maciej Lubowski | Trener personalny Warszawa Ursynów",
  description:
    "Treningi personalne na Ursynowie w Warszawie z Maciejem Lubowskim – dla początkujących i zaawansowanych.",
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
