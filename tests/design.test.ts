import { describe, it, expect } from "vitest"
import { existsSync, readFileSync } from "node:fs"
import path from "node:path"
import manifest from "@/app/manifest"

const ROOT = path.resolve(__dirname, "..")

/**
 * DESIGN.md guardrails. The site once carried three different teals (logo,
 * CSS, manifest) and a fourth palette in the OG image; these pin the parts
 * that cannot be seen in a code review.
 */
describe("design system", () => {
  const BRAND_TEAL = "#0d5955"
  const BONE = "#f6f3ee"

  it("manifest uses the logo's teal and the page bone, not a drifted copy", () => {
    const m = manifest()
    expect(m.theme_color).toBe(BRAND_TEAL)
    expect(m.background_color).toBe(BONE)
  })

  it("the logo is the single source of the brand teal", () => {
    const svg = readFileSync(path.join(ROOT, "public/logo.svg"), "utf8")
    expect(svg).toContain(BRAND_TEAL)
  })

  it("OG image fonts are committed static TrueType instances (satori ignores variable axes)", () => {
    for (const file of ["Newsreader-36pt-Medium.ttf", "PublicSans-SemiBold.ttf"]) {
      const p = path.join(ROOT, "assets/fonts", file)
      expect(existsSync(p), `${file} missing`).toBe(true)
      expect(readFileSync(p).readUInt32BE(0), `${file} is not sfnt/TrueType`).toBe(0x00010000)
    }
  })

  it("does not ship the retired AI-generated imagery", () => {
    expect(existsSync(path.join(ROOT, "public/images/hero-map.jpg"))).toBe(false)
    expect(existsSync(path.join(ROOT, "public/images/about-atlantis.jpg"))).toBe(false)
  })

  it("keeps radius at zero and the primary token on the logo teal", () => {
    const css = readFileSync(path.join(ROOT, "app/globals.css"), "utf8")
    expect(css).toMatch(/--radius:\s*0;/)
    expect(css).toMatch(/--primary:\s*177 75% 20%;/) // hsl of #0d5955
  })
})
