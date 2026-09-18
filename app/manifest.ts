import type { MetadataRoute } from "next"
import { SITE } from "@/lib/seo"

/**
 * Web app manifest, served at /manifest.webmanifest and auto-linked by Next.
 *
 * Colours are the DESIGN.md palette: background = bone (#f6f3ee, the page
 * ground in app/globals.css) and theme = the logo's own teal (#0d5955).
 * tests/design.test.ts pins both so the manifest cannot drift again.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE.name,
    short_name: "New Atlantis",
    description: SITE.description,
    start_url: "/",
    display: "browser",
    background_color: "#f6f3ee",
    theme_color: "#0d5955",
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
