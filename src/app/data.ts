// Treści strony w jednym miejscu – zmiany cen, pakietów czy kontaktu tylko tutaj.

export const NAV = [
  { href: "#start", label: "Start" },
  { href: "#o-mnie", label: "O mnie" },
  { href: "#oferta", label: "Oferta" },
  { href: "#przemiany", label: "Przemiany" },
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
    price: "1449 zł",
    features: [
      "8 treningów",
      "Analiza mobilności i zakresu ruchu",
      "Indywidualny plan treningowy",
      "Wskazówki żywieniowe",
    ],
  },
  {
    name: "Pakiet Fundament",
    price: "2599 zł",
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
    price: "4899 zł",
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

export type Photo = {
  src: string;
  /** Kadr zdjęcia w karcie (CSS object-position), domyślnie środek. */
  position?: string;
};

export type Transformation = {
  name: string;
  age: string;
  duration: string;
  /** Waga [przed, po] w kg. */
  weight: [number, number];
  description: string;
  before: Photo;
  after: Photo;
};

const PHOTOS = "/images/przemiany";

export const TRANSFORMATIONS: Transformation[] = [
  {
    name: "Piotr",
    age: "42 lata",
    duration: "16 miesięcy",
    weight: [130, 89],
    description:
      "Bardzo długi okres redukcji, podczas którego nastawienie było na rekompozycję sylwetki, czyli zbudowanie trochę masy mięśniowej.",
    before: { src: `${PHOTOS}/piotr-przed.jpg`, position: "45% 50%" },
    after: { src: `${PHOTOS}/piotr-po.jpg`, position: "50% 25%" },
  },
  {
    name: "Ania",
    age: "43 lata",
    duration: "15 miesięcy",
    weight: [60, 52],
    description:
      "Redukcja tkanki tłuszczowej, wysmuklenie sylwetki i zbudowanie pośladków.",
    before: { src: `${PHOTOS}/ania-przed.jpg`, position: "50% 20%" },
    after: { src: `${PHOTOS}/ania-po.jpg`, position: "45% 20%" },
  },
  {
    name: "Krzysztof",
    age: "42 lata",
    duration: "8 miesięcy",
    weight: [82, 73],
    description: "Redukcja z formą na lato.",
    before: { src: `${PHOTOS}/krzysztof-przed.jpg`, position: "35% 25%" },
    after: { src: `${PHOTOS}/krzysztof-po.jpg`, position: "50% 30%" },
  },
  {
    name: "Piotr",
    age: "41 lat",
    duration: "6 lat",
    weight: [82, 103],
    description:
      "Długoletnia współpraca trwająca do dziś. Nastawienie na sukcesywne budowanie i poprawianie sylwetki, przeplatane okresami masy i redukcji.",
    before: { src: `${PHOTOS}/piotr-m-przed.jpg`, position: "50% 25%" },
    after: { src: `${PHOTOS}/piotr-m-po.jpg`, position: "50% 25%" },
  },
  {
    name: "Tomasz",
    age: "42 lata",
    duration: "18 miesięcy",
    weight: [92, 83],
    description:
      "Rekompozycja sylwetki zakończona redukcją, czego efektem była forma „na lato”.",
    before: { src: `${PHOTOS}/tomasz-przed.jpg`, position: "50% 20%" },
    after: { src: `${PHOTOS}/tomasz-po.jpg`, position: "50% 20%" },
  },
];

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
