import type { NextConfig } from "next";
import { withBotId } from "botid/next/config";

// Pliki z public/ (filmy, zdjęcia) – przeglądarka trzyma je przez dzień,
// a potem jeszcze tydzień może pokazać zapisaną wersję, sprawdzając w tle,
// czy jest nowsza. Nie „na zawsze”, bo pliki bywają podmieniane pod tą
// samą nazwą (np. film w hero).
const PUBLIC_ASSET_CACHE =
  "public, max-age=86400, stale-while-revalidate=604800";

// Nagłówki bezpieczeństwa dla całej strony. HSTS ustawia już sam Vercel.
// Osadzanie w ramce tylko z tej samej domeny (nie „wcale”), bo BotID
// korzysta z własnej ramki.
const SECURITY_HEADERS = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Content-Security-Policy", value: "frame-ancestors 'self'" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
  },
];

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  images: {
    // AVIF jest zwykle o ~20–30% mniejszy niż WebP
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [
      { source: "/:path*", headers: SECURITY_HEADERS },
      ...["/videos/:path*", "/images/:path*"].map((source) => ({
        source,
        headers: [{ key: "Cache-Control", value: PUBLIC_ASSET_CACHE }],
      })),
    ];
  },
};

// BotID (ochrona formularza przed botami) potrzebuje przekierowań do
// serwerów Vercela – dodaje je ta funkcja.
export default withBotId(nextConfig);
