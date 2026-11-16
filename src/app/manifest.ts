import type { MetadataRoute } from "next";
import { SITE } from "./data";

// /manifest.webmanifest – nazwa i ikona przy dodaniu strony do ekranu
// głównego telefonu
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE.name,
    short_name: "M. Lubowski",
    description: SITE.description,
    lang: "pl",
    start_url: "/",
    display: "browser",
    background_color: "#1b181d",
    theme_color: "#1b181d",
    icons: [
      { src: "/icon.png", sizes: "192x192", type: "image/png" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}
