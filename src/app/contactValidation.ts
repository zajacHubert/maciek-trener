// Walidacja wspólna dla formularza (przeglądarka) i akcji wysyłającej (serwer).

export type Values = { name: string; email: string; phone: string };
export type Field = keyof Values | "contact";

/** Maksymalna długość pól – w formularzu (maxLength) i na serwerze. */
export const MAX_LENGTH = {
  name: 60,
  email: 254,
  phone: 30,
  message: 3000,
} as const;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^\+?[\d\s()-]+$/;

export function validate({ name, email, phone }: Values) {
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
