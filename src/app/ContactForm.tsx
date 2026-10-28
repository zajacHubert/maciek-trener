"use client";

import { useEffect, useState, type FormEvent } from "react";
import { CHOOSE_PLAN_EVENT } from "./ChoosePlanLink";
import { PLANS, planOption } from "./data";
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
    options: [...PLANS.map(planOption), "Jeszcze nie wiem"],
  },
];

type Values = { name: string; email: string; phone: string };
type Field = keyof Values | "contact";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^\+?[\d\s()-]+$/;

function validate({ name, email, phone }: Values) {
  const errors: Partial<Record<Field, string>> = {};
  const digits = phone.replace(/\D/g, "");

  if (!name.trim()) errors.name = "Podaj swoje imię.";
  else if (name.trim().length < 2) errors.name = "Imię jest za krótkie.";

  if (!email.trim() && !phone.trim()) {
    errors.contact = "Podaj e-mail lub numer telefonu.";
  }
  if (email.trim() && !EMAIL_RE.test(email.trim())) {
    errors.email = "Niepoprawny adres e-mail.";
  }
  if (
    phone.trim() &&
    (!PHONE_RE.test(phone.trim()) || digits.length < 9 || digits.length > 15)
  ) {
    errors.phone = "Niepoprawny numer telefonu.";
  }
  return errors;
}

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
    // TODO: podpiąć wysyłkę (np. Formspree / endpoint z mailem).
    setSent(true);
  };

  if (sent) {
    return (
      <div className={styles.formSent} role="status">
        <h3>Dziękuję za wiadomość!</h3>
        <p>Odezwę się najszybciej, jak to możliwe.</p>
      </div>
    );
  }

  const contactError = show("contact");

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
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

      <button type="submit" className={styles.btnPrimary}>
        Wyślij
      </button>
    </form>
  );
}

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
