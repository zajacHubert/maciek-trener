import type { MetadataRoute } from "next";
import { SITE } from "./data";

// /sitemap.xml – mapa strony dla wyszukiwarek (strona jest jedna)
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${SITE.url}/`,
      changeFrequency: "monthly",
      priority: 1,
      images: [
        `${SITE.url}/images/trener-na-silowni.jpeg`,
        `${SITE.url}/images/trener-na-lawce.jpg`,
      ],
    },
  ];
}
