import type { NextConfig } from "next";

// Pliki z public/ (filmy, zdjęcia) – przeglądarka trzyma je przez dzień,
// a potem jeszcze tydzień może pokazać zapisaną wersję, sprawdzając w tle,
// czy jest nowsza. Nie „na zawsze”, bo pliki bywają podmieniane pod tą
// samą nazwą (np. film w hero).
const PUBLIC_ASSET_CACHE =
  "public, max-age=86400, stale-while-revalidate=604800";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  images: {
    // AVIF jest zwykle o ~20–30% mniejszy niż WebP
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return ["/videos/:path*", "/images/:path*"].map((source) => ({
      source,
      headers: [{ key: "Cache-Control", value: PUBLIC_ASSET_CACHE }],
    }));
  },
};

export default nextConfig;
