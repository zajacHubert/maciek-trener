"use client";

import { useEffect, useRef } from "react";

const DURATION = 1800;

// Liczba „nabija się” od zera, gdy pojawi się na ekranie (np. "10000+").
// W HTML z serwera jest od razu prawdziwa wartość (widzi ją Google, podgląd
// linku i przeglądarka bez JavaScriptu). Dopiero w przeglądarce, jeśli
// liczba jest jeszcze poza ekranem, zerujemy ją i animujemy po przewinięciu.
// Animacja zmienia sam tekst w elemencie – bez przerysowywania komponentu.
export default function CountUp({
  value,
  className,
}: {
  value: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    const match = value.match(/^(\d+)(.*)$/);
    if (!el || !match) return;
    const target = Number(match[1]);
    const suffix = match[2];

    const visible = el.getBoundingClientRect().top < window.innerHeight;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (visible || reduceMotion) return;

    const show = (n: number) => {
      el.textContent = `${n}${suffix}`;
    };
    show(0);

    let frame = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min((now - start) / DURATION, 1);
          show(Math.round((1 - Math.pow(1 - t, 3)) * target));
          if (t < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    observer.observe(el);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      show(target);
    };
  }, [value]);

  return (
    <span ref={ref} className={className}>
      {value}
    </span>
  );
}
