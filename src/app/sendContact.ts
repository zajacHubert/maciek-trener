"use server";

import { Resend } from "resend";
import { validate } from "./contactValidation";

export type SendResult = { ok: true } | { ok: false; error: string };

const FIELDS = [
  ["goal", "Cel"],
  ["frequency", "Treningi w tygodniu"],
  ["package", "Pakiet"],
  ["message", "Wiadomość"],
] as const;

const GENERIC_ERROR =
  "Nie udało się wysłać wiadomości. Spróbuj ponownie za chwilę.";

export async function sendContact(formData: FormData): Promise<SendResult> {
  const get = (key: string) => String(formData.get(key) ?? "").trim();

  // Ukryte pole – wypełniają je tylko boty. Udajemy sukces, nic nie wysyłamy.
  if (get("website")) return { ok: true };

  const values = {
    name: get("name"),
    email: get("email"),
    phone: get("phone"),
  };
  if (Object.keys(validate(values)).length > 0) {
    return { ok: false, error: "Sprawdź poprawność danych w formularzu." };
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_EMAIL_TO;
  if (!apiKey || !to) {
    console.error(
      "Brak RESEND_API_KEY lub CONTACT_EMAIL_TO w zmiennych środowiskowych.",
    );
    return { ok: false, error: GENERIC_ERROR };
  }

  const lines = [
    `Imię: ${values.name}`,
    `E-mail: ${values.email || "—"}`,
    `Telefon: ${values.phone || "—"}`,
    ...FIELDS.map(([key, label]) => `${label}: ${get(key) || "—"}`),
  ];

  const { error } = await new Resend(apiKey).emails.send({
    from:
      process.env.CONTACT_EMAIL_FROM ??
      "Formularz kontaktowy <onboarding@resend.dev>",
    to,
    replyTo: values.email || undefined,
    subject: `Nowe zgłoszenie ze strony – ${values.name}`,
    text: lines.join("\n"),
  });

  if (error) {
    console.error("Resend:", error);
    return { ok: false, error: GENERIC_ERROR };
  }
  return { ok: true };
}
