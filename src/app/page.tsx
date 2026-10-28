import Image from "next/image";
import styles from "./page.module.css";
import ChoosePlanLink from "./ChoosePlanLink";
import ContactForm from "./ContactForm";
import CountUp from "./CountUp";
import NavAutoClose from "./NavAutoClose";
import {
  ADDRESS,
  CONTACT,
  FEATURED_LABEL,
  NAV,
  PLANS,
  STATS,
  planOption,
} from "./data";
import { CurrentYear, TrainerAge } from "./CurrentYear";

const MAP_URL = `https://maps.google.com/maps?q=${encodeURIComponent(
  `Zdrofit, ${ADDRESS.street.replace("ul. ", "")}, ${ADDRESS.city}`,
)}&z=15&output=embed`;

const cx = (...classes: (string | false | undefined)[]) =>
  classes.filter(Boolean).join(" ");

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

          <nav id="site-nav" className={styles.nav}>
            {NAV.map((item) => (
              <a key={item.href} href={item.href}>
                {item.label}
              </a>
            ))}
            <a href="#kontakt" className={styles.navCta}>
              Umów trening
            </a>
          </nav>
          <NavAutoClose navId="site-nav" />
        </div>
      </header>

      <main>
        <section id="start" className={styles.hero}>
          <video
            className={styles.heroVideo}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            aria-hidden="true"
          >
            <source
              src="/videos/hero2.mp4"
              type="video/mp4"
              media="(max-width: 960px)"
            />
            <source src="/videos/hero.mp4" type="video/mp4" />
          </video>
          <div className={styles.heroOverlay} />

          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>
              Maciej Lubowski
              <span className={styles.heroSubtitle}>Trener personalny</span>
            </h1>
            <p className={styles.heroTagline}>
              Zbudujmy formę, z której będziesz dumny
            </p>
            <a href="#mapa" className={styles.heroLocation}>
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

        <section className={styles.stats} aria-labelledby="stats-title">
          <div className={styles.container}>
            <h2 id="stats-title" className={styles.srOnly}>
              Doświadczenie w liczbach
            </h2>
            <ul className={styles.statsGrid}>
              {STATS.map((stat) => (
                <li key={stat.label} className={styles.stat}>
                  <CountUp value={stat.value} className={styles.statValue} />
                  <span className={styles.statLabel}>{stat.label}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="o-mnie" className={cx(styles.section, styles.aboutSection)}>
          <div className={styles.aboutPhoto}>
            <Image
              src="/trener.jpeg"
              alt="Maciej Lubowski"
              fill
              sizes="(max-width: 960px) 100vw, 60vw"
            />
          </div>
          <div className={cx(styles.container, styles.about)}>
            <div className={styles.aboutText}>
              <p className={styles.eyebrow}>O mnie</p>
              <h2 className={styles.sectionTitle}>Poznaj trenera</h2>
              <p className={styles.lead}>
                Nazywam się Maciej Lubowski. Mam <TrainerAge /> lat. Od ponad dekady pracuję
                jako trener personalny, a moja przygoda z siłownią trwa
                nieprzerwanie od ponad 20 lat.
              </p>
              <p>
                Kursy i szkolenia dały mi podstawy, ale to tysiące godzin
                spędzone z ludźmi na sali treningowej nauczyły mnie najwięcej.
                Nie wierzę w gotowe szablony i drogi na skróty. Twój plan musi
                być skrojony pod Twoje życie, Twoje cele i Twój czas.
              </p>
              <blockquote className={styles.quote}>
                „Zacznij tam, gdzie jesteś. Użyj tego, co masz. Rób to, co
                możesz.”
              </blockquote>
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
            <p>
              Takie osoby potrzebują trenera, który rozumie ich problemy,
              przygotuje odpowiedni plan działania i będzie realnym wsparciem
              podczas procesu budowania sylwetki, poprawy zdrowia i jakości
              życia.
            </p>
          </div>
        </section>

        <section id="cennik" className={cx(styles.section, styles.sectionAlt)}>
          <div className={styles.container}>
            <p className={styles.eyebrow}>Plany i ceny</p>
            <h2 className={styles.sectionTitle}>Cennik</h2>
            <div className={styles.plans}>
              {PLANS.map((plan) => (
                <article
                  key={plan.name}
                  className={cx(styles.plan, plan.featured && styles.planFeatured)}
                >
                  {plan.featured && (
                    <span className={styles.planBadge}>{FEATURED_LABEL}</span>
                  )}
                  <h3>{plan.name}</h3>
                  <p className={styles.planPrice}>{plan.price}</p>
                  <ul>
                    {plan.features.map((feature) => (
                      <li key={feature}>{feature}</li>
                    ))}
                  </ul>
                  <ChoosePlanLink
                    option={planOption(plan)}
                    className={
                      plan.featured ? styles.btnPrimary : styles.btnOutline
                    }
                  >
                    Wybieram
                  </ChoosePlanLink>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={cx(styles.cta, styles.parallax)}>
          <h2 className={styles.ctaTitle}>
            <span>Gotowy na zmianę?</span>
            <span>Poprowadzę Cię krok po kroku</span>
          </h2>
          <a href="#kontakt" className={styles.btnPrimary}>
            Zarezerwuj trening
          </a>
        </section>

        <section id="studio" className={cx(styles.studio, styles.parallax)}>
          <div className={cx(styles.container, styles.studioInner)}>
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
                <h3>Adres</h3>
                <address>
                  <p>{ADDRESS.place}</p>
                  <p>{ADDRESS.street}</p>
                  <p>{ADDRESS.city}</p>
                </address>
              </div>
              <div>
                <h3>Godziny</h3>
                <p>Poniedziałek – Piątek</p>
                <p>6:30 – 21:00</p>
              </div>
            </div>
          </div>

          <div id="mapa" className={cx(styles.container, styles.map)}>
            <iframe
              title={`Mapa – ${ADDRESS.place}, ${ADDRESS.street}, ${ADDRESS.city}`}
              src={MAP_URL}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </section>

        <section id="kontakt" className={styles.section}>
          <div className={cx(styles.container, styles.contact)}>
            <div>
              <h2 className={styles.sectionTitle}>Kontakt</h2>
              <p className={styles.eyebrow}>
                Napisz lub zadzwoń, jeśli masz pytania
              </p>
              <p className={styles.contactLine}>
                <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
              </p>
              <p className={styles.contactLine}>
                <a href={`tel:${CONTACT.phone.replace(/\s/g, "")}`}>
                  {CONTACT.phone}
                </a>
              </p>
            </div>

            <ContactForm />
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        © <CurrentYear /> Maciej Lubowski · Trener personalny
      </footer>
    </>
  );
}
