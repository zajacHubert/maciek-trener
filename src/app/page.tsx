import Image from "next/image";
import styles from "./page.module.css";
import ChoosePlanLink from "./ChoosePlanLink";
import ContactForm from "./ContactForm";
import CountUp from "./CountUp";
import HeroVideo from "./HeroVideo";
import NavAutoClose from "./NavAutoClose";
import StructuredData from "./StructuredData";
import {
  ADDRESS,
  CONTACT,
  FEATURED_LABEL,
  INSTAGRAM_URL,
  PHONE_URL,
  WHATSAPP_URL,
  NAV,
  ONLINE_PLAN,
  PARTNER_CARDS,
  PLANS,
  SINGLE_SESSION,
  STATS,
  STEPS,
  TRANSFORMATIONS,
  planOption,
} from "./data";
import Transformations from "./Transformations";
import {
  CurrentYear,
  TrainerAge,
  TrainingYears,
  yearsSince,
} from "./CurrentYear";

const MAP_URL = `https://maps.google.com/maps?q=${encodeURIComponent(
  `Zdrofit, ${ADDRESS.street.replace("ul. ", "")}, ${ADDRESS.city}`,
)}&z=15&output=embed`;

const cx = (...classes: (string | false | undefined)[]) =>
  classes.filter(Boolean).join(" ");

// Najdroższy pakiet – wyróżniony pomarańczową ramką i przyciskiem
const priceValue = (price: string) => Number(price.replace(/\D/g, ""));
const PREMIUM_PLAN = PLANS.reduce((max, plan) =>
  priceValue(plan.price) > priceValue(max.price) ? plan : max,
);

export default function Home() {
  return (
    <>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <a href="#start" className={styles.brand}>
            <Image
              src="/images/logo-maciej-lubowski.png"
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
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.navInstagram}
              aria-label={`Instagram @${CONTACT.instagram}`}
            >
              <InstagramIcon />
              <span className={styles.navInstagramLabel}>Instagram</span>
            </a>
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

      <StructuredData />
      <main>
        <section id="start" className={styles.hero}>
          {/* Pierwsza klatka filmu – lekki obrazek widoczny od razu, zanim
              film się załaduje (osobny kadr na telefon i komputer) */}
          <picture>
            <source
              srcSet="/videos/hero2-mobile-poster.webp"
              media="(max-width: 960px)"
            />
            <img
              src="/videos/hero2-desktop-poster.webp"
              alt=""
              className={styles.heroPoster}
              fetchPriority="high"
              decoding="async"
            />
          </picture>
          <HeroVideo className={styles.heroVideo} />
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
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.heroInstagram}
              aria-label={`Instagram @${CONTACT.instagram}`}
            >
              <InstagramIcon />
            </a>
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
                  <StatValue value={stat.value} sinceYear={stat.sinceYear} />
                  <span className={styles.statLabel}>{stat.label}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section
          id="o-mnie"
          className={cx(styles.section, styles.aboutSection, styles.concrete)}
        >
          <div className={styles.aboutPhoto}>
            <Image
              src="/images/trener-na-silowni.jpeg"
              alt="Maciej Lubowski – trener personalny na siłowni w Warszawie"
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
                nieprzerwanie od <TrainingYears /> lat.
              </p>
              <p>
                Kursy i szkolenia dały mi podstawy, ale to tysiące godzin
                spędzone z ludźmi na sali treningowej nauczyły mnie najwięcej.
                Nie wierzę w gotowe szablony i drogi na skróty. Twój plan musi
                być skrojony pod Twoje życie, Twoje cele i Twój czas.
              </p>
              <blockquote className={styles.quote}>
                <span>„Zacznij tam, gdzie jesteś.</span>{" "}
                <span>Użyj tego, co masz.</span>{" "}
                <span>Rób to, co możesz.”</span>
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

        <section
          className={cx(styles.section, styles.stepsSection, styles.parallax)}
          aria-labelledby="steps-title"
        >
          <div className={styles.container}>
            <h2 id="steps-title" className={styles.stepsTitle}>
              Jak wygląda współpraca
            </h2>
            <ol className={styles.steps}>
              {STEPS.map((step, i) => (
                <li key={step.title} className={styles.step}>
                  <span className={styles.stepNumber} aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3>{step.title}</h3>
                  {step.note && <p className={styles.stepNote}>{step.note}</p>}
                  <p>{step.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section
          id="przemiany"
          className={cx(styles.section, styles.transformationsSection)}
        >
          <div className={styles.container}>
            <p className={styles.eyebrow}>Efekty współpracy</p>
            <h2 className={styles.sectionTitle}>Przemiany podopiecznych</h2>
            <Transformations items={TRANSFORMATIONS} />
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
                  className={cx(
                    styles.plan,
                    plan.featured && styles.planFeatured,
                    plan === PREMIUM_PLAN && styles.planPremium,
                  )}
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
                      plan.featured || plan === PREMIUM_PLAN
                        ? styles.btnPrimary
                        : styles.btnOutline
                    }
                  >
                    Wybieram
                  </ChoosePlanLink>
                </article>
              ))}
            </div>

            <div className={styles.single}>
              <div>
                <h3>{SINGLE_SESSION.name}</h3>
                <p>{SINGLE_SESSION.features.join(" · ")}</p>
              </div>
              <p className={styles.singlePrice}>{SINGLE_SESSION.price}</p>
              <ChoosePlanLink
                option={planOption(SINGLE_SESSION)}
                className={styles.btnOutline}
              >
                Wybieram
              </ChoosePlanLink>
            </div>

            <article className={styles.online}>
              <div className={styles.onlineInfo}>
                <span className={styles.onlineBadge}>Online</span>
                <h3>{ONLINE_PLAN.name}</h3>
                <p>{ONLINE_PLAN.description}</p>
                <ul>
                  {ONLINE_PLAN.features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
              </div>
              <div className={styles.onlineBuy}>
                <p className={styles.onlinePrice}>{ONLINE_PLAN.price}</p>
                <ChoosePlanLink
                  option={planOption(ONLINE_PLAN)}
                  className={styles.btnPrimary}
                >
                  Wybieram
                </ChoosePlanLink>
              </div>
            </article>
          </div>
        </section>

        {/* Ten sam układ co „Poznaj trenera”: na komputerze tekst z lewej,
            zdjęcie z prawej wygaszane w tło; na telefonie tekst na zdjęciu */}
        <section
          className={cx(
            styles.section,
            styles.aboutSection,
            styles.ctaSection,
            styles.concrete,
          )}
        >
          <div className={cx(styles.aboutPhoto, styles.ctaPhoto)}>
            <Image
              src="/images/trener-pozdrawia.jpg"
              alt="Maciej Lubowski – trener personalny, Warszawa Ursynów"
              fill
              sizes="(max-width: 960px) 100vw, 60vw"
            />
          </div>
          <div className={cx(styles.container, styles.about)}>
            <div className={cx(styles.aboutText, styles.ctaText)}>
              <h2 className={styles.ctaTitle}>
                <span>Gotowy na zmianę?</span>
                <span>Poprowadzę Cię krok po kroku</span>
              </h2>
              <a href="#kontakt" className={styles.btnPrimary}>
                Zarezerwuj trening
              </a>
            </div>
          </div>
        </section>

        <section id="studio" className={cx(styles.studio, styles.parallax)}>
          <div className={cx(styles.container, styles.studioInner)}>
            <div>
              <h2 className={styles.sectionTitle}>Lokalizacja</h2>
              <p className={styles.lead}>
                Treningi prowadzę na warszawskim Ursynowie, w jednym z klubów
                sieci Zdrofit. Obiekt oferuje saunę, sale fitness oraz oddzielną
                strefę cardio, a sama siłownia wyposażona jest w sprzęt
                najwyższej klasy marki Hammer Strength.
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
                <p>Poniedziałek – Piątek: 6:00 – 23:00</p>
                <p>Sobota – Niedziela: 7:00 – 22:00</p>
              </div>
              <div className={styles.studioCards}>
                <h3>Honorowane karty</h3>
                <ul>
                  {PARTNER_CARDS.map((card) => (
                    <li key={card.name}>
                      <Image
                        src={card.src}
                        alt={card.name}
                        title={card.name}
                        width={284}
                        height={180}
                      />
                    </li>
                  ))}
                </ul>
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

        <section
          id="kontakt"
          className={cx(styles.section, styles.contactSection, styles.concrete)}
        >
          <MirrorPhotoBg
            src="/images/trener-hantle-lustro.jpg"
            className={styles.contactMirror}
          />
          <div className={cx(styles.container, styles.contact)}>
            <div className={styles.contactInfo}>
              <h2 className={styles.sectionTitle}>Kontakt</h2>
              <p className={styles.eyebrow}>
                Napisz lub zadzwoń, jeśli masz pytania
              </p>
              <ul className={styles.contactLinks}>
                <li>
                  <a href={`mailto:${CONTACT.email}`}>
                    <MailIcon />
                    {CONTACT.email}
                  </a>
                </li>
                <li>
                  <a href={PHONE_URL}>
                    <PhoneIcon />
                    {CONTACT.phone}
                  </a>
                </li>
                <li>
                  <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                    <WhatsAppIcon />
                    WhatsApp
                  </a>
                </li>
                <li>
                  <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">
                    <InstagramIcon />@{CONTACT.instagram}
                  </a>
                </li>
              </ul>
            </div>

            <div className={styles.contactForm}>
              <ContactForm />
            </div>

            {/* Komputer: lewy dolny róg sekcji, pod danymi kontaktowymi.
                Telefon: na samym dole, pod formularzem. */}
            <Image
              src="/images/logo-maciej-lubowski.png"
              alt=""
              width={224}
              height={224}
              sizes="(max-width: 960px) 112px, 176px"
              className={styles.contactLogo}
            />
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        © <CurrentYear /> Maciej Lubowski · Trener personalny Warszawa
        Ursynów
      </footer>
    </>
  );
}

/* ---------- Ikonki kontaktu (rozmiar = rozmiar tekstu, kolor = currentColor) ---------- */

function LineIcon({ children }: { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

function MailIcon() {
  return (
    <LineIcon>
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </LineIcon>
  );
}

function PhoneIcon() {
  return (
    <LineIcon>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </LineIcon>
  );
}

/* Tło sekcji ze zdjęciem: na komputerze ostre zdjęcie na środku, a po
   bokach jego rozmyte lustrzane odbicia, łagodnie znikające w tle; na
   telefonie samo zdjęcie na całą szerokość. To samo zdjęcie (ten sam plik,
   pobierany raz) w środku i w odbiciach. */
function MirrorPhotoBg({ src, className }: { src: string; className?: string }) {
  const photo = (
    <Image src={src} alt="" fill sizes="(max-width: 960px) 200vw, 60vw" />
  );
  return (
    <div className={cx(styles.mirrorBg, className)} aria-hidden="true">
      {/* Rozmyty pas: odbicie | kopia zdjęcia | odbicie */}
      <div className={styles.mirrorBlurRow}>
        <div className={cx(styles.mirrorSide, styles.mirrorLeft)}>{photo}</div>
        <div className={styles.mirrorCenter}>{photo}</div>
        <div className={cx(styles.mirrorSide, styles.mirrorRight)}>{photo}</div>
      </div>
      {/* Ostre zdjęcie na wierzchu */}
      <div className={styles.mirrorPhoto}>{photo}</div>
    </div>
  );
}

async function StatValue({
  value,
  sinceYear,
}: {
  value: string;
  sinceYear?: number;
}) {
  const shown = sinceYear ? `${await yearsSince(sinceYear)}${value}` : value;
  return <CountUp value={shown} className={styles.statValue} />;
}

function InstagramIcon() {
  return (
    <LineIcon>
      <rect x="2" y="2" width="20" height="20" rx="5.5" />
      <circle cx="12" cy="12" r="4.5" />
      <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
    </LineIcon>
  );
}

function WhatsAppIcon() {
  return (
    // Wypełniona ikonka zajmuje cały kwadrat 24×24, a obrysowane mają ~1px
    // marginesu – powiększony viewBox wyrównuje je wizualnie.
    <svg
      viewBox="-1 -1 26 26"
      width="1em"
      height="1em"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
    </svg>
  );
}
