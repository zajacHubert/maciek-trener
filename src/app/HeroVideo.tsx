"use client";

import { useEffect, useRef, useState } from "react";

const MOBILE = "(max-width: 960px)";

// Przeglądarka bierze pierwszy plik, który pasuje do ekranu (media)
// i który umie odtworzyć (type): HEVC (Safari, iPhone, część Androidów),
// AV1 (Chrome, Firefox), a na końcu H.264 – działa wszędzie.
// HEVC jest pierwszy: to najmniejszy plik, a nowsze iPhone'y zgłaszają
// też obsługę AV1, która w Safari bywa zawodna (film nie rusza albo
// nie zapętla się).
const SOURCES = [
  { name: "hero2-mobile-hevc", codec: "hvc1.1.6.L120.90", media: MOBILE },
  { name: "hero2-mobile-av1", codec: "av01.0.08M.08", media: MOBILE },
  { name: "hero2-mobile", media: MOBILE },
  { name: "hero2-desktop-hevc", codec: "hvc1.1.6.L120.90" },
  { name: "hero2-desktop-av1", codec: "av01.0.08M.08" },
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

  // Źródła dodane po fakcie – trzeba kazać przeglądarce je wczytać.
  // iOS Safari potrafi zatrzymać film i już go nie wznowić: po powrocie
  // do karty / aplikacji, po przewinięciu, w trybie oszczędzania energii
  // (blokuje autoodtwarzanie do pierwszego dotknięcia) albo na końcu
  // pętli. W tych sytuacjach ponawiamy odtwarzanie.
  useEffect(() => {
    const video = ref.current;
    if (!load || !video) return;

    // React nie wypisuje atrybutu `muted` w HTML, a iOS bez wyciszenia
    // nie pozwoli na autoodtwarzanie – ustawiamy je jawnie.
    video.muted = true;
    video.defaultMuted = true;

    let visible = true;
    const play = () => {
      if (document.hidden || !visible || !video.paused) return;
      video.play().catch(() => {
        // Autoodtwarzanie zablokowane – zostaje pierwsza klatka
        // (spróbujemy ponownie przy dotknięciu ekranu)
      });
    };
    // Zapasowa pętla, gdyby `loop` nie zadziałał
    const restart = () => {
      video.currentTime = 0;
      play();
    };

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      play();
    });
    observer.observe(video);

    video.addEventListener("ended", restart);
    document.addEventListener("visibilitychange", play);
    window.addEventListener("pageshow", play);
    document.addEventListener("touchend", play, { passive: true });
    document.addEventListener("click", play);

    video.load();
    play();

    return () => {
      observer.disconnect();
      video.removeEventListener("ended", restart);
      document.removeEventListener("visibilitychange", play);
      window.removeEventListener("pageshow", play);
      document.removeEventListener("touchend", play);
      document.removeEventListener("click", play);
    };
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
