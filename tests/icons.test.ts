import { describe, it, expect } from "vitest"
import { existsSync, readFileSync, statSync } from "node:fs"
import path from "node:path"
import manifest from "@/app/manifest"
import { organizationSchema } from "@/lib/structured-data"
import { SITE, SITE_ICONS } from "@/lib/seo"

const PUBLIC = path.resolve(__dirname, "..", "public")

/** Every /path referenced in metadata, the manifest or JSON-LD must be a real file. */
function assertPublicFile(url: string) {
  const rel = url.replace(SITE.url, "")
  const file = path.join(PUBLIC, rel)
  expect(existsSync(file), `${rel} missing from public/`).toBe(true)
  expect(statSync(file).size, `${rel} is empty`).toBeGreaterThan(0)
}

function pngDimensions(file: string): [number, number] {
  const b = readFileSync(file)
  return [b.readUInt32BE(16), b.readUInt32BE(20)]
}

describe("icons", () => {
  /**
   * Google, Slack and most link previewers request /favicon.ico by convention
   * and ignore <link> tags. It was a 404 in production once; never again.
   */
  it("ships a real favicon.ico at the conventional path", () => {
    const ico = path.join(PUBLIC, "favicon.ico")
    expect(existsSync(ico)).toBe(true)
    const b = readFileSync(ico)
    expect(b.readUInt16LE(0)).toBe(0) // reserved
    expect(b.readUInt16LE(2)).toBe(1) // type: icon
    expect(b.readUInt16LE(4)).toBeGreaterThanOrEqual(3) // image count
  })

  it("every icon declared in layout metadata exists", () => {
    const icons = SITE_ICONS as {
      icon: { url: string }[]
      shortcut: string
      apple: { url: string }[]
    }
    for (const i of icons.icon) assertPublicFile(i.url)
    assertPublicFile(icons.shortcut)
    for (const i of icons.apple) assertPublicFile(i.url)
  })

  it("every manifest icon exists and has the declared size", () => {
    for (const icon of manifest().icons ?? []) {
      assertPublicFile(icon.src)
      const [w, h] = pngDimensions(path.join(PUBLIC, icon.src))
      expect(`${w}x${h}`, icon.src).toBe(icon.sizes)
    }
  })

  /** Google only shows a site favicon in results if a size is a multiple of 48. */
  it("declares at least one icon whose size is a multiple of 48", () => {
    const icons = SITE_ICONS as { icon: { sizes?: string }[] }
    const sizes = icons.icon.flatMap((i) => (i.sizes ?? "").split(" "))
    const ok = sizes.some((s) => {
      const n = Number(s.split("x")[0])
      return n > 0 && n % 48 === 0
    })
    expect(ok).toBe(true)
  })

  /** Google's Organization logo minimum is 112x112; the placeholder it replaced was not the brand. */
  it("points the Organization logo at a real brand image of adequate size", () => {
    const logo = organizationSchema().logo as { url: string; width: number; height: number }
    assertPublicFile(logo.url)
    expect(logo.url).not.toContain("images/logo.jpg")
    expect(logo.width).toBeGreaterThanOrEqual(112)
    const [w, h] = pngDimensions(path.join(PUBLIC, logo.url.replace(SITE.url, "")))
    expect([w, h]).toEqual([logo.width, logo.height])
  })
})
