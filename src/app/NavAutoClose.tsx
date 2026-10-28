"use client";

import { useEffect } from "react";

// Menu mobilne działa na checkboxie (#nav-toggle). Zamykamy je po kliknięciu
// linku, kliknięciu poza menu albo wciśnięciu Esc.
export default function NavAutoClose({ navId }: { navId: string }) {
  useEffect(() => {
    const toggle = document.getElementById("nav-toggle") as HTMLInputElement;
    if (!toggle) return;

    const onClick = (e: MouseEvent) => {
      if (!toggle.checked) return;
      const target = e.target as Element;
      if (target === toggle || target.closest('label[for="nav-toggle"]')) return;
      if (target.closest(`#${navId}`) && !target.closest("a")) return;
      toggle.checked = false;
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") toggle.checked = false;
    };

    document.addEventListener("click", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("click", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [navId]);

  return null;
}
