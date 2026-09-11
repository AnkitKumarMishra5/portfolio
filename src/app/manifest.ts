import type { MetadataRoute } from "next";
import { person } from "@/lib/data";
import { MARK_BG } from "@/lib/mark";

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: "/",
    name: `${person.name} | ${person.headline}`,
    short_name: person.name,
    description: person.shortBio,
    start_url: "/",
    scope: "/",
    display: "standalone",
    orientation: "portrait",
    lang: "en",
    dir: "ltr",
    categories: ["business", "productivity"],
    background_color: "#050810",
    theme_color: MARK_BG,
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
      {
        src: "/icon-maskable-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
