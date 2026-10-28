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
  { value: "10+", label: "lat doświadczenia" },
  { value: "500+", label: "podopiecznych" },
  { value: "3000+", label: "przeprowadzonych treningów" },
  { value: "100%", label: "zaangażowania" },
];

const OFFER = [
  {
    title: "Początkujący",
    text: "Nauka techniki, budowa nawyków i bezpieczne wejście w regularny trening. Plan dopasowany do Twojego poziomu.",
    photo: "/photos/poczatkujacy.jpg",
  },
  {
    title: "Zaawansowani",
    text: "Periodyzacja, praca nad siłą i wydolnością, przygotowanie do startów. Dla tych, którzy chcą wejść poziom wyżej.",
    photo: "/photos/zaawansowani.jpg",
  },
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
            <div className={styles.heroButtons}>
              <a href="#kontakt" className={styles.btnPrimary}>
                Umów trening
              </a>
              <a href="#cennik" className={styles.btnOutline}>
                Karnety
              </a>
            </div>
          </div>

          <div className={styles.heroTiles}>
            {OFFER.map((item) => (
              <a key={item.title} href="#oferta" className={styles.heroTile}>
                {item.title}
              </a>
            ))}
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
                Nazywam się Maciej Lubowski i od lat pomagam ludziom budować
                siłę, kondycję i pewność siebie. Każdy trening to dla mnie
                konkretny plan, a nie przypadkowy zestaw ćwiczeń.
              </p>
              <p>
                Pracuję zarówno z osobami, które dopiero zaczynają przygodę ze
                sportem, jak i z zawodnikami przygotowującymi się do startów.
                Stawiam na technikę, systematyczność i mierzalne postępy –
                tak, żebyś widział efekty, a nie tylko czuł zmęczenie.
              </p>
            </div>
          </div>
        </section>

        <section className={styles.stats}>
          <div className={styles.container}>
            <h2 className={styles.statsTitle}>Osiągnięcia</h2>
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

        <section className={`${styles.cta} ${styles.parallax}`}>
          <h2 className={styles.ctaTitle}>Zacznij trenować już dziś</h2>
          <a href="#kontakt" className={styles.btnPrimary}>
            Zarezerwuj trening
          </a>
        </section>

        <section id="oferta" className={styles.section}>
          <div className={styles.container}>
            <p className={styles.eyebrow}>Oferta</p>
            <h2 className={styles.sectionTitle}>Treningi</h2>
            <div className={styles.offerGrid}>
              {OFFER.map((item) => (
                <article
                  key={item.title}
                  className={styles.offerCard}
                  style={{ "--photo": `url(${item.photo})` } as CSSProperties}
                >
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                  <a href="#kontakt" className={styles.link}>
                    Zapisz się →
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="cennik" className={`${styles.section} ${styles.sectionAlt}`}>
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
                    className={plan.featured ? styles.btnPrimary : styles.btnOutline}
                  >
                    Wybieram
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="studio" className={`${styles.studio} ${styles.parallax}`}>
          <div className={`${styles.container} ${styles.studioInner}`}>
            <div>
              <h2 className={styles.sectionTitle}>Studio</h2>
              <p className={styles.lead}>
                Kameralna sala treningowa z pełnym wyposażeniem – bez tłumów,
                kolejek do sprzętu i rozpraszaczy.
              </p>
            </div>
            <div className={styles.studioInfo}>
              <div>
                <h4>Adres</h4>
                <p>ul. Przykładowa 1</p>
                <p>00-000 Warszawa</p>
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
