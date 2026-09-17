import { describe, it, expect } from "vitest"
import { RESOURCE_GROUPS } from "@/lib/resources"

const allLinks = RESOURCE_GROUPS.flatMap((group) => group.links)

/**
 * Two regressions this list has actually had: a placeholder "#" href that
 * shipped as a dead link, and four labels quietly sharing one URL. Both are
 * cheap to guard statically; whether each URL is still alive is a periodic
 * manual check, not a unit test.
 */
describe("resource links", () => {
  it("has at least one link in every group", () => {
    for (const group of RESOURCE_GROUPS) {
      expect(group.links.length, group.category).toBeGreaterThan(0)
    }
  })

  it("uses only absolute https URLs — no placeholders", () => {
    for (const link of allLinks) {
      expect(link.href, link.label).toMatch(/^https:\/\/[^\s"']+$/)
      expect(link.href, link.label).not.toBe("#")
    }
  })

  it("never points two labels at the same URL", () => {
    const seen = new Map<string, string>()
    for (const link of allLinks) {
      const prior = seen.get(link.href)
      expect(prior, `"${link.label}" duplicates "${prior}"`).toBeUndefined()
      seen.set(link.href, link.label)
    }
  })

  it("has no duplicate labels", () => {
    const labels = allLinks.map((l) => l.label)
    expect(new Set(labels).size).toBe(labels.length)
  })

  it("does not link to domains known to have gone dark", () => {
    const dead = [
      "cookcountyrecorder.com",
      "cookcountyclerk.com",
      "estado.gobierno.pr",
      "idfpr.com",
    ]
    for (const link of allLinks) {
      for (const host of dead) {
        expect(link.href, link.label).not.toContain(host)
      }
    }
  })
})
