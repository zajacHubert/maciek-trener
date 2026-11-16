// Treści strony w jednym miejscu – zmiany cen, pakietów czy kontaktu tylko tutaj.

/** Adres strony i teksty SEO (tytuł, opis, słowa kluczowe).
    Po podpięciu własnej domeny wystarczy ustawić NEXT_PUBLIC_SITE_URL
    w zmiennych środowiskowych na Vercelu. */
export const SITE = {
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://maciek-trener.vercel.app")
    .replace(/\/$/, ""),
  name: "Maciej Lubowski – Trener personalny",
  title: "Trener personalny Warszawa Ursynów | Maciej Lubowski",
  description:
    "Maciej Lubowski – trener personalny w Warszawie na Ursynowie. Ponad 10 lat doświadczenia, indywidualny plan treningowy i dieta. Umów bezpłatną konsultację.",
  keywords: [
    "trener personalny Warszawa",
    "trener personalny Ursynów",
    "trening personalny Warszawa",
    "treningi personalne Ursynów",
    "trener personalny Zdrofit",
    "trener personalny Natolin",
    "trener personalny Kabaty",
    "redukcja tkanki tłuszczowej",
    "budowa masy mięśniowej",
    "plan treningowy i dieta",
    "Maciej Lubowski",
  ],
};

export const NAV = [
  { href: "#start", label: "Start" },
  { href: "#o-mnie", label: "O mnie" },
  { href: "#oferta", label: "Oferta" },
  { href: "#przemiany", label: "Przemiany" },
  { href: "#cennik", label: "Cennik" },
  { href: "#studio", label: "Lokalizacja" },
  { href: "#kontakt", label: "Kontakt" },
];

/** Rok, w którym Maciek zaczął pracę jako trener – z niego liczony jest staż. */
export const COACHING_SINCE = 2015;

/** Rok, w którym Maciek zaczął trenować na siłowni („20 lat” w 2026). */
export const TRAINING_SINCE = 2006;

// `sinceYear` = wartość liczona dynamicznie jako „bieżący rok − sinceYear”
// (z dopisanym `value` na końcu, np. „+”).
export const STATS: { value: string; label: string; sinceYear?: number }[] = [
  { value: "+", sinceYear: TRAINING_SINCE, label: "lat treningu siłowego" },
  {
    value: "+",
    sinceYear: COACHING_SINCE,
    label: "lat doświadczenia jako trener",
  },
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
    price: "1399 zł",
    features: [
      "8 treningów",
      "Analiza mobilności i zakresu ruchu",
      "Indywidualny plan treningowy",
      "Wskazówki żywieniowe",
    ],
  },
  {
    name: "Pakiet Fundament",
    price: "2499 zł",
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
    price: "4599 zł",
    features: [
      "30 treningów (3–4 razy w tygodniu)",
      "Analiza mobilności i zakresu ruchu",
      "Indywidualny plan treningowy + dieta",
      "Raport postępów raz w tygodniu",
      "Stały kontakt i wsparcie trenerskie",
    ],
  },
];

/** Współpraca online – osobna karta pod pakietami (bez treningów na siłowni). */
export const ONLINE_PLAN: Plan & { description: string } = {
  name: "Współpraca Online (3 miesiące)",
  price: "999 zł",
  description:
    "Dla osób, które potrzebują prowadzenia i planu, ale trenują samodzielnie.",
  features: [
    "3 miesiące pełnej opieki trenerskiej",
    "Indywidualny plan treningowy + dieta",
    "Raport postępów i analiza wyników raz w tygodniu",
    "Konsultacja video raz w tygodniu",
  ],
};

/** Pojedynczy trening – pokazywany pod pakietami jako skromniejsza opcja. */
export const SINGLE_SESSION: Plan = {
  name: "Trening personalny (1h)",
  price: "180 zł",
  features: ["Pojedyncza sesja treningowa"],
};

/** Etapy współpracy – sekcja „Oferta”. */
export const STEPS = [
  {
    title: "Konsultacja",
    note: "30–45 minut · bezpłatnie",
    text: "Rozmowa wstępna. Omawiamy Twój cel, przedstawiasz swoją dotychczasową przygodę ze sportem/siłownią, Twoją historię zdrowotną. Sprawdzamy, czy nadajemy na tych samych falach i czy chcemy zacząć współpracę.",
  },
  {
    title: "Plan działania",
    text: "Analiza Twojej sprawności, mobilności i wzorców ruchowych. Otrzymujesz konkretną strategię skrojoną pod Twój czas, możliwości i życie zawodowe.",
  },
  {
    title: "Wspólne treningi",
    text: "Realizacja planu treningowego. Nauka techniki wykonywania ćwiczeń, poprawa mobilności i zakresu ruchu. Pracujemy nad budowaniem siły i zdrowych nawyków.",
  },
  {
    title: "Kontrola postępów",
    text: "Regularne monitorowanie efektów na przestrzeni tygodni i miesięcy. Na bieżąco optymalizujemy działania, żeby dowieźć postawiony cel.",
  },
];

export const FEATURED_LABEL = "Najczęściej wybierany";

/** Tekst opcji pakietu w formularzu, np. „Pakiet Start – 1399 zł”. */
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
    age: "44 lata",
    duration: "6 lat",
    weight: [82, 103],
    description:
      "Długoletnia współpraca trwająca do dziś. Nastawienie na sukcesywne budowanie i poprawianie sylwetki, przeplatane okresami masy i redukcji.",
    before: { src: `${PHOTOS}/piotr-m-przed.jpg`, position: "50% 25%" },
    after: { src: `${PHOTOS}/piotr-m-po.jpg`, position: "50% 25%" },
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
    age: "31 lat",
    duration: "10 miesięcy",
    weight: [82, 73],
    description: "Redukcja z formą na lato.",
    before: { src: `${PHOTOS}/krzysztof-przed.jpg`, position: "35% 25%" },
    after: { src: `${PHOTOS}/krzysztof-po.jpg`, position: "50% 30%" },
  },
  {
    name: "Piotr",
    age: "42 lata",
    duration: "16 miesięcy",
    weight: [125, 89],
    description:
      "Bardzo długi okres redukcji, nastawiony na rekompozycję sylwetki, czyli spalenie tkanki tłuszczowej i budowanie masy mięśniowej.",
    before: { src: `${PHOTOS}/piotr-przed.jpg`, position: "45% 50%" },
    after: { src: `${PHOTOS}/piotr-po.jpg`, position: "50% 25%" },
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

/** Data urodzenia trenera – z niej liczony jest wiek w sekcji „O mnie” (rośnie w urodziny). */
export const BIRTH_DATE = { year: 1988, month: 5, day: 15 };

export const CONTACT = {
  email: "macieklubo23@poczta.onet.pl",
  phone: "+48 793 175 700",
  instagram: "lu_boski",
};

export const INSTAGRAM_URL = `https://www.instagram.com/${CONTACT.instagram}/`;
export const PHONE_URL = `tel:${CONTACT.phone.replace(/\s/g, "")}`;
/** wa.me wymaga numeru z kierunkowym, bez „+” i spacji. */
export const WHATSAPP_URL = `https://wa.me/${CONTACT.phone.replace(/\D/g, "")}`;

/** Karty sportowe honorowane w klubie (wg strony klubu na zdrofit.pl). */
export const PARTNER_CARDS = [
  { name: "Multisport", src: "/images/karty/multisport.jpg" },
  { name: "Multisport Plus", src: "/images/karty/multisport-plus.jpg" },
  { name: "BeActive", src: "/images/karty/beactive.jpg" },
  { name: "FitProfit", src: "/images/karty/fitprofit.jpg" },
  { name: "FitSport", src: "/images/karty/fitsport.jpg" },
];

export const ADDRESS = {
  place: "Zdrofit Koński Jar",
  street: "ul. Koński Jar 6",
  city: "02-785 Warszawa",
};
