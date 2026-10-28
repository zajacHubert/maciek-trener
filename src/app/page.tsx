import type { CSSProperties } from "react";
import Image from "next/image";
import styles from "./page.module.css";

const NAV = [
  { href: "#start", label: "Start" },
  { href: "#o-mnie", label: "O mnie" },
  { href: "#oferta", label: "Oferta" },
  { href: "#cennik", label: "Cennik" },
  { href: "#studio", label: "Studio" },
  { href: "#kontakt", label: "Kontakt" },
];

const STATS = [
  { value: "20+", label: "lat treningu siłowego" },
  { value: "10+", label: "lat doświadczenia jako trener" },
  { value: "10000+", label: "godzin treningów personalnych" },
  { value: "100%", label: "pasji, zaangażowania i indywidualnego podejścia" },
];

const PLANS = [
  {
    name: "Trening próbny",
    price: "0 zł",
    period: "pierwsze spotkanie",
    features: ["Konsultacja i wywiad", "Analiza postawy", "Ustalenie celów"],
  },
  {
    name: "Pakiet 8 treningów",
    price: "800 zł",
    period: "miesięcznie",
    features: [
      "2 treningi w tygodniu",
      "Indywidualny plan",
      "Kontakt z trenerem",
    ],
    featured: true,
  },
  {
    name: "Prowadzenie online",
    price: "300 zł",
    period: "miesięcznie",
    features: ["Plan treningowy", "Cotygodniowe raporty", "Korekta techniki"],
  },
];

export default function Home() {
  return (
    <>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <a href="#start" className={styles.brand}>
            <Image
              src="/logos/logo_z_kolem.png"
              alt="Maciej Lubowski – logo"
              width={56}
              height={56}
              className={styles.brandLogo}
              priority
            />
            <span className={styles.brandName}>Maciej Lubowski</span>
          </a>

          <input
            type="checkbox"
            id="nav-toggle"
            className={styles.navToggle}
            aria-label="Otwórz menu"
          />
          <label htmlFor="nav-toggle" className={styles.burger}>
            <span />
            <span />
            <span />
          </label>

          <nav className={styles.nav}>
            {NAV.map((item) => (
              <a key={item.href} href={item.href}>
                {item.label}
              </a>
            ))}
            <a href="#kontakt" className={styles.navCta}>
              Umów trening
            </a>
          </nav>
        </div>
      </header>

      <main>
        <section id="start" className={`${styles.hero} ${styles.parallax}`}>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>Maciej Lubowski</h1>
            <p className={styles.heroSubtitle}>Trener personalny</p>
            <a href="#studio" className={styles.heroLocation}>
              <svg
                viewBox="0 0 24 24"
                width="22"
                height="22"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5Z" />
              </svg>
              Warszawa · Ursynów
            </a>
            <div className={styles.heroButtons}>
              <a href="#cennik" className={styles.btnOutline}>
                Cennik
              </a>
              <a href="#kontakt" className={styles.btnPrimary}>
                Umów trening
              </a>
            </div>
          </div>
        </section>

        <section className={styles.stats}>
          <div className={styles.container}>
            <div className={styles.statsGrid}>
              {STATS.map((stat) => (
                <div key={stat.label} className={styles.stat}>
                  <span className={styles.statValue}>{stat.value}</span>
                  <span className={styles.statLabel}>{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="o-mnie" className={styles.section}>
          <div className={`${styles.container} ${styles.about}`}>
            <div className={styles.aboutPhoto}>
              <Image
                src="/logos/logo_bez_tla.png"
                alt="Maciej Lubowski"
                width={420}
                height={420}
              />
            </div>
            <div>
              <p className={styles.eyebrow}>O mnie</p>
              <h2 className={styles.sectionTitle}>Poznaj trenera</h2>
              <p className={styles.lead}>
                Nazywam się Maciej Lubowski. Mam 38 lat. Od ponad dekady pracuję
                jako trener personalny, a moja przygoda z siłownią trwa
                nieprzerwanie od ponad 20 lat.
              </p>
              <p>
                Kursy i szkolenia dały mi podstawy, ale to tysiące godzin
                spędzone z ludźmi na sali treningowej nauczyły mnie najwięcej.
                Nie wierzę w gotowe szablony i drogi na skróty. Twój plan musi
                być skrojony pod Twoje życie, Twoje cele i Twój czas.
              </p>
              <br />
              <p>
                „Zacznij tam, gdzie jesteś. Użyj tego, co masz. Rób to, co
                możesz.”
              </p>
            </div>
          </div>
        </section>

        <section id="oferta" className={styles.section}>
          <div className={styles.container}>
            <p className={styles.eyebrow}>Co Ci oferuję</p>
            <h2 className={styles.sectionTitle}>
              Nie sprzedaję treningów. Biorę odpowiedzialność za Twoją
              przemianę.
            </h2>
            <p>
              Moi klienci to zazwyczaj osoby w wieku 25–55 lat – zajęci karierą
              zawodową, pracujący na odpowiedzialnych stanowiskach, często
              rodzice, którzy zapomnieli o sobie.
            </p>
            <br />
            <p>
              Takie osoby potrzebują trenera, który rozumie ich problemy,
              przygotuje odpowiedni plan działania i będzie realnym wsparciem
              podczas procesu budowania sylwetki, poprawy zdrowia i jakości
              życia.
            </p>
          </div>
        </section>

        <section
          id="cennik"
          className={`${styles.section} ${styles.sectionAlt}`}
        >
          <div className={styles.container}>
            <p className={styles.eyebrow}>Plany i ceny</p>
            <h2 className={styles.sectionTitle}>Cennik</h2>
            <div className={styles.plans}>
              {PLANS.map((plan) => (
                <div
                  key={plan.name}
                  className={`${styles.plan} ${plan.featured ? styles.planFeatured : ""}`}
                >
                  <h3>{plan.name}</h3>
                  <p className={styles.planPrice}>{plan.price}</p>
                  <p className={styles.planPeriod}>{plan.period}</p>
                  <ul>
                    {plan.features.map((feature) => (
                      <li key={feature}>{feature}</li>
                    ))}
                  </ul>
                  <a
                    href="#kontakt"
                    className={
                      plan.featured ? styles.btnPrimary : styles.btnOutline
                    }
                  >
                    Wybieram
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className={`${styles.cta} ${styles.parallax}`}>
          <h2 className={styles.ctaTitle}>
            Gotowy na zmianę? <br />
            Poprowadzę Cię krok po kroku
          </h2>
          <a href="#kontakt" className={styles.btnPrimary}>
            Zarezerwuj trening
          </a>
        </section>

        <section id="studio" className={`${styles.studio} ${styles.parallax}`}>
          <div className={`${styles.container} ${styles.studioInner}`}>
            <div>
              <h2 className={styles.sectionTitle}>Lokalizacja</h2>
              <p className={styles.lead}>
                Treningi prowadzę na warszawskim Ursynowie, w kameralnej siłowni
                z pełnym wyposażeniem – bez tłumów, kolejek do sprzętu i
                rozpraszaczy.
              </p>
            </div>
            <div className={styles.studioInfo}>
              <div>
                <h4>Adres</h4>
                <p>ul. Przykładowa 1</p>
                <p>Warszawa – Ursynów</p>
              </div>
              <div>
                <h4>Godziny</h4>
                <p>Poniedziałek – Piątek</p>
                <p>6:30 – 21:00</p>
              </div>
            </div>
          </div>
        </section>

        <section id="kontakt" className={styles.section}>
          <div className={`${styles.container} ${styles.contact}`}>
            <div>
              <h2 className={styles.sectionTitle}>Kontakt</h2>
              <p className={styles.eyebrow}>
                Napisz lub zadzwoń, jeśli masz pytania
              </p>
              <p className={styles.contactLine}>
                <a href="mailto:kontakt@example.com">kontakt@example.com</a>
              </p>
              <p className={styles.contactLine}>
                <a href="tel:+48123456789">+48 123 456 789</a>
              </p>
            </div>

            <form className={styles.form}>
              <div className={styles.formRow}>
                <label>
                  Imię *
                  <input type="text" name="firstName" required />
                </label>
                <label>
                  Nazwisko *
                  <input type="text" name="lastName" required />
                </label>
              </div>
              <label>
                E-mail *
                <input type="email" name="email" required />
              </label>
              <label>
                Temat
                <input type="text" name="subject" />
              </label>
              <label>
                Wiadomość
                <textarea name="message" rows={5} />
              </label>
              <button type="submit" className={styles.btnPrimary}>
                Wyślij
              </button>
            </form>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        © 2026 Maciej Lubowski · Trener personalny
      </footer>
    </>
  );
}
