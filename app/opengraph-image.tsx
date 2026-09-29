import { readFile } from "node:fs/promises"
import { join } from "node:path"
import { ImageResponse } from "next/og"
import { SITE, siteTitle } from "@/lib/seo"

export const alt = siteTitle()
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

/**
 * DESIGN.md applied to the link preview: bone ground, ink headline in
 * Newsreader, tracked Public Sans eyebrow, one brass rule, the compass at
 * right. Satori cannot use next/font and ignores variable axes, so the two
 * faces are committed static instances under assets/fonts/. The route is
 * static, so the files are read once at build. Stays on the Node runtime —
 * node:fs is unavailable on the edge.
 */
const BONE = "#f6f3ee"
const INK = "#14201f"
const INK_MUTED = "#5c6663"
const BRASS = "#a8823f"

async function asset(path: string) {
  return readFile(join(process.cwd(), path))
}

export default async function OpengraphImage() {
  const [newsreader, publicSans, logo] = await Promise.all([
    asset("assets/fonts/Newsreader-36pt-Medium.ttf"),
    asset("assets/fonts/PublicSans-SemiBold.ttf"),
    asset("public/logo.svg"),
  ])
  // resvg renders the SVG's <mask>/<use> faithfully; satori's JSX SVG path does not.
  const logoSrc = `data:image/svg+xml;base64,${logo.toString("base64")}`

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "72px 88px",
          background: BONE,
          color: INK,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", maxWidth: 720 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 20,
              fontFamily: "Public Sans",
              fontSize: 22,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: INK_MUTED,
            }}
          >
            {SITE.name}
            <div style={{ width: 40, height: 2, background: BRASS }} />
          </div>

          <div
            style={{
              marginTop: 32,
              fontFamily: "Newsreader",
              fontSize: 76,
              lineHeight: 1.08,
              letterSpacing: "-0.015em",
              color: INK,
            }}
          >
            {SITE.tagline}
          </div>

          <div
            style={{
              marginTop: 36,
              fontFamily: "Public Sans",
              fontSize: 24,
              lineHeight: 1.4,
              color: INK_MUTED,
            }}
          >
            Business planning, strategy, and risk consulting.
          </div>
        </div>

        <img src={logoSrc} width={300} height={300} alt="" />
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Newsreader", data: newsreader, weight: 500, style: "normal" },
        { name: "Public Sans", data: publicSans, weight: 600, style: "normal" },
      ],
    },
  )
}
