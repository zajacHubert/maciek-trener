"use client";

import Image from "next/image";
import { useRef, useState, type CSSProperties } from "react";
import type { Transformation } from "./data";
import styles from "./page.module.css";

const cx = (...classes: (string | false)[]) =>
  classes.filter(Boolean).join(" ");

// Komputer: wąskie, czarno-białe paski stoją obok siebie jak jedno zdjęcie.
// Najechany pasek się rozszerza, nabiera koloru i pokazuje porównanie
// przed/po z opisem.
// Telefon (≤960px): slider z przewijaniem palcem, strzałkami i kropkami –
// każdy slajd od razu pokazuje porównanie i opis.
export default function Transformations({
  items,
}: {
  items: Transformation[];
}) {
  const [active, setActive] = useState<number | null>(null);
  const [slide, setSlide] = useState(0);
  const listRef = useRef<HTMLUListElement>(null);

  const slideWidth = () => {
    const first = listRef.current?.firstElementChild as HTMLElement | null;
    const gap = parseFloat(getComputedStyle(listRef.current!).columnGap) || 0;
    return (first?.offsetWidth ?? 0) + gap;
  };

  const goTo = (index: number) => {
    const target = Math.max(0, Math.min(items.length - 1, index));
    listRef.current?.scrollTo({ left: target * slideWidth(), behavior: "smooth" });
  };

  const onScroll = () => {
    const width = slideWidth();
    if (width) setSlide(Math.round(listRef.current!.scrollLeft / width));
  };

  return (
    <div className={styles.transformations}>
      <ul
        ref={listRef}
        className={styles.transformationsList}
        style={{ "--count": items.length } as CSSProperties}
        onMouseLeave={() => setActive(null)}
        onScroll={onScroll}
      >
        {items.map((item, i) => {
          const [from, to] = item.weight;
          const diff = to - from;
          return (
            <li
              key={item.after.src}
              className={cx(
                styles.transformation,
                active === i && styles.transformationActive,
                slide === i && styles.slideCurrent,
              )}
              tabIndex={0}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              onBlur={() => setActive(null)}
            >
              <div className={styles.transformationMedia}>
                <div className={styles.transformationBefore}>
                  <span className={styles.transformationPhoto}>
                    <Image
                      src={item.before.src}
                      alt={`${item.name} przed współpracą`}
                      fill
                      sizes="(max-width: 960px) 45vw, 340px"
                      style={{ objectPosition: item.before.position }}
                    />
                  </span>
                </div>
                <div className={styles.transformationAfter}>
                  <span className={styles.transformationPhoto}>
                    <Image
                      src={item.after.src}
                      alt={`${item.name} po ${item.duration} współpracy`}
                      fill
                      sizes="(max-width: 960px) 45vw, 340px"
                      style={{ objectPosition: item.after.position }}
                    />
                  </span>
                </div>
              </div>

              <p className={styles.transformationName} aria-hidden="true">
                {item.name}
                <span>{diff > 0 ? "+" : "−"}{Math.abs(diff)} kg</span>
              </p>

              <div className={styles.transformationInfo}>
                <h3 className={styles.transformationTitle}>
                  {item.name} <span>/ {item.age}</span>
                </h3>
                <dl className={styles.transformationStats}>
                  <div>
                    <dt>Współpraca</dt>
                    <dd>{item.duration}</dd>
                  </div>
                  <div>
                    <dt>Waga</dt>
                    <dd>
                      {from} → {to} kg{" "}
                      <em>
                        ({diff > 0 ? "+" : "−"}
                        {Math.abs(diff)} kg)
                      </em>
                    </dd>
                  </div>
                </dl>
                <p className={styles.transformationText}>{item.description}</p>
              </div>
            </li>
          );
        })}
      </ul>

      <div className={styles.sliderNav}>
        <button
          type="button"
          className={styles.sliderArrow}
          aria-label="Poprzednia metamorfoza"
          disabled={slide === 0}
          onClick={() => goTo(slide - 1)}
        >
          ←
        </button>
        <div className={styles.sliderDots}>
          {items.map((item, i) => (
            <button
              key={item.after.src}
              type="button"
              aria-label={`Metamorfoza ${i + 1} z ${items.length}`}
              aria-current={slide === i}
              onClick={() => goTo(i)}
            />
          ))}
        </div>
        <button
          type="button"
          className={styles.sliderArrow}
          aria-label="Następna metamorfoza"
          disabled={slide === items.length - 1}
          onClick={() => goTo(slide + 1)}
        >
          →
        </button>
      </div>
    </div>
  );
}
