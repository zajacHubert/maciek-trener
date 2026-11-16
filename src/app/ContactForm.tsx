"use client";

import {
  useEffect,
  useRef,
  useState,
  useTransition,
  type FormEvent,
} from "react";
import { CHOOSE_PLAN_EVENT } from "./ChoosePlanLink";
import { validate, type Field, type Values } from "./contactValidation";
import { PLANS, SINGLE_SESSION, planOption } from "./data";
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
      "Jeszcze nie wiem",
    ],
  },
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

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    touch("name", "email", "phone", "contact");
    if (Object.keys(errors).length > 0) {
      const first = e.currentTarget.querySelector<HTMLElement>(
        "[aria-invalid='true']",
      );
      first?.focus();
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
        inert={sent}
        aria-busy={pending}
      >
        <TextField
          label="Imię *"
          name="name"
          autoComplete="given-name"
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
              describedBy={contactError ? "contact-error" : undefined}
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
              describedBy={contactError ? "contact-error" : undefined}
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
          <label key={select.name}>
            {select.label}
            <span className={styles.selectWrap}>
              <select
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

        <label>
          Coś jeszcze? (opcjonalnie)
          <textarea name="message" rows={4} />
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
    <label>
      {label}
      <input
        type={type}
        name={name}
        autoComplete={autoComplete}
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
