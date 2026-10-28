"use client";

import type { ReactNode } from "react";

export const CHOOSE_PLAN_EVENT = "choose-plan";

// Przewija do formularza i ustawia w nim wybrany pakiet (`option` to tekst
// opcji z selecta, patrz planOption w data.ts).
export default function ChoosePlanLink({
  option,
  className,
  children,
}: {
  option: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <a
      href="#kontakt"
      className={className}
      onClick={() =>
        window.dispatchEvent(new CustomEvent(CHOOSE_PLAN_EVENT, { detail: option }))
      }
    >
      {children}
    </a>
  );
}
