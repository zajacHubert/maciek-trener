"use client";

import { useEffect, useRef, useState } from "react";

const MOBILE = "(max-width: 960px)";

// Przeglądarka bierze pierwszy plik, który pasuje do ekranu (media)
// i który umie odtworzyć (type): AV1 (Chrome, Firefox, Android),
// HEVC (Safari, iPhone), a na końcu H.264 – działa wszędzie.
const SOURCES = [
  { name: "hero2-mobile-av1", codec: "av01.0.08M.08", media: MOBILE },
  { name: "hero2-mobile-hevc", codec: "hvc1.1.6.L120.90", media: MOBILE },
  { name: "hero2-mobile", media: MOBILE },
  { name: "hero2-desktop-av1", codec: "av01.0.08M.08" },
  { name: "hero2-desktop-hevc", codec: "hvc1.1.6.L120.90" },
  { name: "hero2-desktop" },
] as const satisfies readonly { name: string; codec?: string; media?: string }[];

type NetworkInfo = { saveData?: boolean; effectiveType?: string };

// Bez filmu (zostaje pierwsza klatka): tryb oszczędzania danych, bardzo
// wolne łącze albo wyłączone animacje w systemie
function shouldSkipVideo() {
  const connection = (navigator as Navigator & { connection?: NetworkInfo })
    .connection;
  return (
    connection?.saveData === true ||
    connection?.effectiveType === "slow-2g" ||
    connection?.effectiveType === "2g" ||
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

// Film w tle hero. Pobiera się dopiero po załadowaniu strony, żeby nie
// zabierać łącza tekstom, czcionkom i zdjęciom.
// - Telefon: film widoczny od razu z pierwszą klatką jako `poster` –
//   przeglądarka liczy szybkość wyświetlenia strony (LCP) od tej klatki,
//   a nie od chwili, gdy film ruszy.
// - Komputer: film niewidoczny, dopóki nie ruszy (pod nim jest klatka
//   w kadrze komputerowym), potem pojawia się płynnie – patrz CSS.
export default function HeroVideo({ className }: { className: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [load, setLoad] = useState(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (shouldSkipVideo()) return;
    const start = () => setLoad(true);
    if (document.readyState === "complete") {
      start();
      return;
    }
    window.addEventListener("load", start, { once: true });
    return () => window.removeEventListener("load", start);
  }, []);

  // Źródła dodane po fakcie – trzeba kazać przeglądarce je wczytać
  useEffect(() => {
    const video = ref.current;
    if (!load || !video) return;
    video.load();
    video.play().catch(() => {
      // Autoodtwarzanie zablokowane – zostaje pierwsza klatka
    });
  }, [load]);

  return (
    <video
      ref={ref}
      className={className}
      data-playing={playing || undefined}
      poster="/videos/hero2-mobile-poster.webp"
      onPlaying={() => setPlaying(true)}
      muted
      loop
      playsInline
      preload="none"
      aria-hidden="true"
    >
      {load &&
        SOURCES.map((source) => (
          <source
            key={source.name}
            src={`/videos/${source.name}.mp4`}
            type={
              "codec" in source
                ? `video/mp4; codecs="${source.codec}"`
                : "video/mp4"
            }
            media={"media" in source ? source.media : undefined}
          />
        ))}
    </video>
  );
}
