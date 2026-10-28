import { cacheLife } from "next/cache";
import { BIRTH_YEAR } from "./data";

// Wartości zależne od daty. Strona jest prerenderowana, więc wynik trzymamy
// w cache maksymalnie dzień – po Nowym Roku sam się zaktualizuje.
async function currentYear() {
  "use cache";
  cacheLife("days");
  return new Date().getFullYear();
}

export async function CurrentYear() {
  return <>{await currentYear()}</>;
}

export async function TrainerAge() {
  return <>{(await currentYear()) - BIRTH_YEAR}</>;
}
