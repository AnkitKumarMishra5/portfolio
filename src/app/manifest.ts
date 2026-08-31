import type { MetadataRoute } from "next";
import { person } from "@/lib/data";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${person.name} | ${person.headline}`,
    short_name: person.name,
    description: person.shortBio,
    start_url: "/",
    display: "standalone",
    background_color: "#050810",
    theme_color: "#050810",
    icons: [{ src: "/icon-light.png", sizes: "64x64", type: "image/png" }],
  };
}
