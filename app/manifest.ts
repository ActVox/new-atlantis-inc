import type { MetadataRoute } from "next"
import { SITE } from "@/lib/seo"

/**
 * Web app manifest, served at /manifest.webmanifest and auto-linked by Next.
 *
 * Colours are the site's own palette from app/globals.css:
 * background = hsl(39 32% 95%) parchment, theme = hsl(186 40% 25%) teal.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE.name,
    short_name: "New Atlantis",
    description: SITE.description,
    start_url: "/",
    display: "browser",
    background_color: "#f5f1ea",
    theme_color: "#26545a",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  }
}
