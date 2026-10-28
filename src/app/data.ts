// Treści strony w jednym miejscu – zmiany cen, pakietów czy kontaktu tylko tutaj.

export const NAV = [
  { href: "#start", label: "Start" },
  { href: "#o-mnie", label: "O mnie" },
  { href: "#oferta", label: "Oferta" },
  { href: "#cennik", label: "Cennik" },
  { href: "#studio", label: "Lokalizacja" },
  { href: "#kontakt", label: "Kontakt" },
];

export const STATS = [
  { value: "20+", label: "lat treningu siłowego" },
  { value: "10+", label: "lat doświadczenia jako trener" },
  { value: "10000+", label: "godzin treningów personalnych" },
  { value: "100%", label: "pasji, zaangażowania i indywidualnego podejścia" },
];

export type Plan = {
  name: string;
  price: string;
  features: string[];
  featured?: boolean;
};

export const PLANS: Plan[] = [
  {
    name: "Pakiet Start",
    price: "1499 zł",
    features: [
      "8 treningów",
      "Analiza mobilności i zakresu ruchu",
      "Indywidualny plan treningowy",
      "Wskazówki żywieniowe",
    ],
  },
  {
    name: "Pakiet Fundament",
    price: "2699 zł",
    features: [
      "15 treningów (2–3 razy w tygodniu)",
      "Analiza mobilności i zakresu ruchu",
      "Indywidualny plan treningowy + dieta",
      "Raport postępów co 2 tygodnie",
    ],
    featured: true,
  },
  {
    name: "Pakiet Transformacja",
    price: "4999 zł",
    features: [
      "30 treningów (3–4 razy w tygodniu)",
      "Analiza mobilności i zakresu ruchu",
      "Indywidualny plan treningowy + dieta",
      "Raport postępów raz w tygodniu",
      "Stały kontakt i wsparcie trenerskie",
    ],
  },
];

export const FEATURED_LABEL = "Najczęściej wybierany";

/** Tekst opcji pakietu w formularzu, np. „Pakiet Start – 1499 zł”. */
export const planOption = (plan: Plan) =>
  `${plan.name} – ${plan.price}` +
  (plan.featured ? ` (${FEATURED_LABEL.toLowerCase()})` : "");

/** Rok urodzenia trenera – z niego liczony jest wiek w sekcji „O mnie”. */
export const BIRTH_YEAR = 1988;

export const CONTACT = {
  email: "kontakt@example.com",
  phone: "+48 123 456 789",
};

export const ADDRESS = {
  place: "Zdrofit Koński Jar",
  street: "ul. Koński Jar 6",
  city: "02-785 Warszawa",
};
