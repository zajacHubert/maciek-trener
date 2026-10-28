"use client";

import type { ReactNode } from "react";

export const CHOOSE_PLAN_EVENT = "choose-plan";

// Przewija do formularza i ustawia w nim wybrany pakiet.
export default function ChoosePlanLink({
  plan,
  className,
  children,
}: {
  plan: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <a
      href="#kontakt"
      className={className}
      onClick={() =>
        window.dispatchEvent(new CustomEvent(CHOOSE_PLAN_EVENT, { detail: plan }))
      }
    >
      {children}
    </a>
  );
}
