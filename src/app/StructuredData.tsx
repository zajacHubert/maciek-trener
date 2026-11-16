import {
  ADDRESS,
  CONTACT,
  INSTAGRAM_URL,
  PLANS,
  SINGLE_SESSION,
  SITE,
} from "./data";

// Dane strukturalne (JSON-LD) dla Google: kim jest trener, gdzie prowadzi
// treningi, jak się skontaktować i ile kosztują pakiety. Pomaga w wynikach
// lokalnych („trener personalny Warszawa”) i w Mapach Google.

const price = (value: string) => Number(value.replace(/\D/g, ""));
const [postalCode, ...cityParts] = ADDRESS.city.split(" ");
const offers = [SINGLE_SESSION, ...PLANS];
const prices = offers.map((plan) => price(plan.price));

const data = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${SITE.url}/#website`,
      url: `${SITE.url}/`,
      name: SITE.name,
      description: SITE.description,
      inLanguage: "pl-PL",
      publisher: { "@id": `${SITE.url}/#business` },
    },
    {
      "@type": "Person",
      "@id": `${SITE.url}/#person`,
      name: "Maciej Lubowski",
      jobTitle: "Trener personalny",
      url: `${SITE.url}/`,
      image: `${SITE.url}/images/trener-na-silowni.jpeg`,
      telephone: CONTACT.phone,
      email: CONTACT.email,
      sameAs: [INSTAGRAM_URL],
      homeLocation: { "@type": "City", name: "Warszawa" },
      worksFor: { "@id": `${SITE.url}/#business` },
      knowsAbout: [
        "trening personalny",
        "trening siłowy",
        "redukcja tkanki tłuszczowej",
        "budowa masy mięśniowej",
        "rekompozycja sylwetki",
        "mobilność",
        "plan żywieniowy",
      ],
    },
    {
      "@type": "LocalBusiness",
      "@id": `${SITE.url}/#business`,
      name: SITE.name,
      description: SITE.description,
      url: `${SITE.url}/`,
      image: [
        `${SITE.url}/images/trener-na-silowni.jpeg`,
        `${SITE.url}/images/trener-pozdrawia.jpg`,
      ],
      logo: `${SITE.url}/images/logo-maciej-lubowski.png`,
      telephone: CONTACT.phone,
      email: CONTACT.email,
      priceRange: `${Math.min(...prices)}–${Math.max(...prices)} zł`,
      currenciesAccepted: "PLN",
      address: {
        "@type": "PostalAddress",
        streetAddress: ADDRESS.street,
        postalCode,
        addressLocality: cityParts.join(" "),
        addressRegion: "mazowieckie",
        addressCountry: "PL",
      },
      areaServed: [
        { "@type": "City", name: "Warszawa" },
        { "@type": "AdministrativeArea", name: "Ursynów" },
      ],
      founder: { "@id": `${SITE.url}/#person` },
      sameAs: [INSTAGRAM_URL],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Treningi personalne",
        itemListElement: offers.map((plan) => ({
          "@type": "Offer",
          name: plan.name,
          description: plan.features.join(", "),
          price: price(plan.price),
          priceCurrency: "PLN",
          itemOffered: {
            "@type": "Service",
            name: plan.name,
            serviceType: "Trening personalny",
          },
        })),
      },
    },
  ],
};

export default function StructuredData() {
  return (
    <script
      type="application/ld+json"
      // Dane pochodzą z data.ts – „<” zamieniamy, żeby nie zamknąć tagu
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
