import { ImageResponse } from "next/og"
import { SITE, siteTitle } from "@/lib/seo"

export const alt = siteTitle()
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg, #1c1917 0%, #292524 100%)",
        }}
      >
        <div
          style={{
            fontSize: 30,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "#c0a062",
          }}
        >
          {SITE.name}
        </div>

        <div
          style={{
            marginTop: 28,
            fontSize: 72,
            lineHeight: 1.15,
            color: "#fafaf9",
            maxWidth: 900,
          }}
        >
          {SITE.tagline}
        </div>

        <div
          style={{
            marginTop: 36,
            width: 120,
            height: 4,
            background: "#c0a062",
          }}
        />

        <div
          style={{
            marginTop: 36,
            fontSize: 28,
            color: "#a8a29e",
            maxWidth: 860,
          }}
        >
          Business planning, strategy, and risk consulting.
        </div>
      </div>
    ),
    size,
  )
}
