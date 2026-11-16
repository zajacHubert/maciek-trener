import { cacheLife } from "next/cache";
import { BIRTH_DATE, TRAINING_SINCE } from "./data";

// Wartości zależne od daty. Strona jest prerenderowana, więc dzisiejszą datę
// trzymamy w cache maksymalnie dzień – liczby same się zaktualizują
// (po Nowym Roku, a wiek – po urodzinach).
async function today() {
  "use cache";
  cacheLife("days");
  const now = new Date();
  return {
    year: now.getFullYear(),
    month: now.getMonth() + 1,
    day: now.getDate(),
  };
}

export async function CurrentYear() {
  return <>{(await today()).year}</>;
}

/** Liczba lat od podanego roku, według bieżącego (cache'owanego) roku. */
export async function yearsSince(year: number) {
  return (await today()).year - year;
}

export async function TrainerAge() {
  const { year, month, day } = await today();
  const hadBirthday =
    month > BIRTH_DATE.month ||
    (month === BIRTH_DATE.month && day >= BIRTH_DATE.day);
  return <>{year - BIRTH_DATE.year - (hadBirthday ? 0 : 1)}</>;
}

export async function TrainingYears() {
  return <>{await yearsSince(TRAINING_SINCE)}</>;
}
