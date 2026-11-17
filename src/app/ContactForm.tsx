"use client";

import {
  useEffect,
  useRef,
  useState,
  useTransition,
  type SubmitEvent,
} from "react";
import { CHOOSE_PLAN_EVENT } from "./ChoosePlanLink";
import {
  MAX_LENGTH,
  validate,
  type Field,
  type Values,
} from "./contactValidation";
import {
  CONTACT,
  ONLINE_PLAN,
  PLANS,
  SINGLE_SESSION,
  planOption,
} from "./data";
import { sendContact } from "./sendContact";
import styles from "./page.module.css";

const SELECTS = [
  {
    name: "goal",
    label: "Jaki jest Twój główny cel?",
    options: [
      "Chcę rozpocząć przygodę z siłownią",
      "Powrót do formy po przerwie",
      "Lepsza sylwetka",
      "Zdrowie i sprawność na lata",
      "Inne",
    ],
  },
  {
    name: "frequency",
    label: "Ile razy w tygodniu chcesz trenować?",
    options: ["2 razy", "3 razy", "4 razy", "Jeszcze nie wiem"],
  },
  {
    name: "package",
    label: "Czy wybrałeś już pakiet?",
    options: [
      ...PLANS.map(planOption),
      planOption(SINGLE_SESSION),
      planOption(ONLINE_PLAN),
      "Jeszcze nie wiem",
    ],
  },
];

// Kolejność pól w formularzu i id inputu, do którego przewijamy przy błędzie
// (brak formy kontaktu → pole e-mail).
const FIELD_ORDER: readonly (readonly [Field, string])[] = [
  ["name", "name"],
  ["email", "email"],
  ["phone", "phone"],
  ["contact", "email"],
];

export default function ContactForm() {
  const [values, setValues] = useState<Values>({
    name: "",
    email: "",
    phone: "",
  });
  // Błąd pokazujemy dopiero po opuszczeniu pola albo próbie wysłania,
  // a potem aktualizujemy go na bieżąco przy każdej zmianie.
  const [touched, setTouched] = useState<Partial<Record<Field, boolean>>>({});
  const [sent, setSent] = useState(false);
  const [plan, setPlan] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [pending, startTransition] = useTransition();
  const formRef = useRef<HTMLFormElement>(null);
  const sentTitleRef = useRef<HTMLHeadingElement>(null);

  // Formularz staje się nieaktywny, więc przenosimy fokus na podziękowanie.
  useEffect(() => {
    if (sent) sentTitleRef.current?.focus();
  }, [sent]);

  // Kliknięcie „Wybieram” w cenniku ustawia pakiet w selekcie.
  useEffect(() => {
    const onChoose = (e: Event) => setPlan((e as CustomEvent<string>).detail);
    window.addEventListener(CHOOSE_PLAN_EVENT, onChoose);
    return () => window.removeEventListener(CHOOSE_PLAN_EVENT, onChoose);
  }, []);

  const errors = validate(values);
  const show = (field: Field) => (touched[field] ? errors[field] : undefined);

  const update = (field: keyof Values) => (value: string) =>
    setValues((v) => ({ ...v, [field]: value }));

  const touch = (...fields: Field[]) =>
    setTouched((t) => ({
      ...t,
      ...Object.fromEntries(fields.map((f) => [f, true])),
    }));

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    touch("name", "email", "phone", "contact");
    // Atrybut aria-invalid pojawi się dopiero po przerenderowaniu, więc
    // pierwsze błędne pole wybieramy na podstawie samych błędów.
    const firstInvalid = FIELD_ORDER.find(([field]) => errors[field]);
    if (firstInvalid) {
      const input = e.currentTarget.querySelector<HTMLElement>(
        `#${firstInvalid[1]}`,
      );
      // Na telefonie sam fokus nie zawsze przewija do pola (i może je
      // zasłonić przyklejony nagłówek), więc przewijamy jawnie na środek.
      input?.scrollIntoView({ behavior: "smooth", block: "center" });
      input?.focus({ preventScroll: true });
      return;
    }
    const formData = new FormData(e.currentTarget);
    setSubmitError("");
    startTransition(async () => {
      // Wyjątek (np. brak internetu) traktujemy jak zwykły błąd wysyłki.
      const result = await sendContact(formData).catch(() => null);
      if (result?.ok) setSent(true);
      else
        setSubmitError(
          result?.error ??
            "Nie udało się wysłać wiadomości. Sprawdź połączenie i spróbuj ponownie.",
        );
    });
  };

  const resetForm = () => {
    formRef.current?.reset();
    setValues({ name: "", email: "", phone: "" });
    setTouched({});
    setPlan("");
    setSent(false);
  };

  const contactError = show("contact");

  // Po wysłaniu formularz jest ukrywany (nie odmontowywany), żeby
  // „Wyślij kolejną wiadomość” mogło go po prostu wyczyścić i pokazać.
  return (
    <div>
      <div className={styles.formSent} role="status" hidden={!sent}>
        <svg
          className={styles.formSentIcon}
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M5 12.5l4.5 4.5L19 7.5" />
        </svg>
        <p className={styles.eyebrow}>Wiadomość wysłana</p>
        <h3 ref={sentTitleRef} tabIndex={-1}>
          Dziękuję za kontakt!
        </h3>
        <p>
          Odezwę się najszybciej, jak to możliwe – zwykle w ciągu 24 godzin.
        </p>
        <button type="button" className={styles.btnOutline} onClick={resetForm}>
          Wyślij kolejną wiadomość
        </button>
      </div>
      <form
        ref={formRef}
        className={cx(styles.form, sent && styles.formHidden)}
        onSubmit={handleSubmit}
        noValidate
        aria-label="Formularz kontaktowy"
        inert={sent}
        aria-busy={pending}
      >
        <TextField
          label="Imię *"
          name="name"
          autoComplete="given-name"
          required
          value={values.name}
          error={show("name")}
          onChange={update("name")}
          onBlur={() => touch("name")}
        />

        <div className={styles.formGroup}>
          <div className={styles.formRow}>
            <TextField
              label="E-mail"
              name="email"
              type="email"
              autoComplete="email"
              value={values.email}
              error={show("email")}
              invalid={!!contactError}
              describedBy="contact-error"
              onChange={update("email")}
              onBlur={() => touch("email")}
            />
            <TextField
              label="Telefon"
              name="phone"
              type="tel"
              autoComplete="tel"
              value={values.phone}
              error={show("phone")}
              invalid={!!contactError}
              describedBy="contact-error"
              onChange={update("phone")}
              onBlur={() => touch("phone", "contact")}
            />
          </div>
          <p
            id="contact-error"
            className={contactError ? styles.fieldError : styles.fieldHint}
            aria-live="polite"
          >
            {contactError ?? "* Podaj co najmniej jedną formę kontaktu."}
          </p>
        </div>

        {SELECTS.map((select) => (
          <label key={select.name} htmlFor={select.name}>
            {select.label}
            <span className={styles.selectWrap}>
              <select
                id={select.name}
                name={select.name}
                {...(select.name === "package"
                  ? { value: plan, onChange: (e) => setPlan(e.target.value) }
                  : { defaultValue: "" })}
              >
                <option value="">Wybierz…</option>
                {select.options.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </span>
          </label>
        ))}

        <label htmlFor="message">
          Dodatkowe informacje (opcjonalnie)
          <textarea
            id="message"
            name="message"
            rows={4}
            maxLength={MAX_LENGTH.message}
            placeholder="Np. dotychczasowe doświadczenie z treningiem, preferowane dni i godziny treningów."
          />
        </label>

        {/* Pułapka na boty – niewidoczna dla ludzi */}
        <div className={styles.honeypot} aria-hidden="true">
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </div>

        <div className={styles.formSubmit}>
          <button type="submit" className={styles.btnPrimary} disabled={pending}>
            {pending ? "Wysyłanie…" : "Wyślij"}
          </button>
          {/* Miejsce na błąd wysyłki jest zarezerwowane, żeby nic nie skakało */}
          <p className={styles.fieldError} aria-live="assertive">
            {submitError}
          </p>
        </div>

        <PrivacyNote />
      </form>
    </div>
  );
}

const cx = (...classes: (string | false)[]) =>
  classes.filter(Boolean).join(" ");

function TextField({
  label,
  name,
  type = "text",
  autoComplete,
  required,
  value,
  error,
  invalid,
  describedBy,
  onChange,
  onBlur,
}: {
  label: string;
  name: string;
  type?: string;
  autoComplete?: string;
  required?: boolean;
  value: string;
  error?: string;
  invalid?: boolean;
  describedBy?: string;
  onChange: (value: string) => void;
  onBlur: () => void;
}) {
  const errorId = `${name}-error`;
  const ids = [error && errorId, describedBy].filter(Boolean).join(" ");

  return (
    <label htmlFor={name}>
      {label}
      <input
        id={name}
        type={type}
        name={name}
        autoComplete={autoComplete}
        required={required}
        maxLength={MAX_LENGTH[name as keyof Values]}
        value={value}
        aria-invalid={!!error || !!invalid}
        aria-describedby={ids || undefined}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
      />
      {/* Miejsce na błąd jest zawsze zarezerwowane, żeby formularz nie skakał */}
      <span id={errorId} className={styles.fieldError} aria-live="polite">
        {error}
      </span>
    </label>
  );
}

// Informacja RODO (art. 13) – podana w chwili zbierania danych, więc nie
// potrzeba osobnej strony z polityką prywatności.
function PrivacyNote() {
  return (
    <div className={styles.privacy}>
      <p>
        Wysyłając formularz, przekazujesz mi swoje dane wyłącznie w celu
        odpowiedzi na wiadomość.
      </p>
      <details>
        <summary>Więcej o przetwarzaniu danych</summary>
        <ul>
          <li>
            <strong>Administrator:</strong> Maciej Lubowski, e-mail:{" "}
            <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>.
          </li>
          <li>
            <strong>Cel i podstawa:</strong> odpowiedź na wiadomość
            i ewentualne ustalenie współpracy (art. 6 ust. 1 lit. b i f RODO).
            Podanie danych jest dobrowolne, ale bez nich nie mogę odpowiedzieć.
          </li>
          <li>
            <strong>Odbiorcy:</strong> firmy, które technicznie obsługują
            stronę i wysyłkę wiadomości – Vercel (hosting) i Resend (poczta).
            Dane mogą być przekazywane do USA na podstawie EU-US Data Privacy
            Framework.
          </li>
          <li>
            <strong>Okres przechowywania:</strong> do zakończenia rozmowy,
            a jeśli zaczniemy współpracę – przez czas jej trwania.
          </li>
          <li>
            <strong>Twoje prawa:</strong> dostęp do danych, ich poprawienie,
            usunięcie, ograniczenie przetwarzania, przeniesienie i sprzeciw.
            Możesz też złożyć skargę do Prezesa Urzędu Ochrony Danych
            Osobowych.
          </li>
          <li>
            Strona nie używa narzędzi analitycznych ani własnych plików
            cookies. Osadzona mapa Google może zapisywać pliki cookies Google.
          </li>
        </ul>
      </details>
    </div>
  );
}
