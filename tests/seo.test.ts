import { describe, it, expect } from "vitest"
import sitemap from "@/app/sitemap"
import robots from "@/app/robots"
import {
  SITE,
  ROUTE_LIST,
  ROUTES,
  pageMetadata,
  pageTitle,
  type RouteKey,
} from "@/lib/seo"

const ROUTE_KEYS = Object.keys(ROUTES) as RouteKey[]

describe("sitemap", () => {
  const entries = sitemap()

  it("lists every known route", () => {
    expect(entries).toHaveLength(ROUTE_LIST.length)

    const urls = entries.map((e) => e.url).sort()
    const expected = ROUTE_LIST.map((r) =>
      r.path === "/" ? `${SITE.url}/` : `${SITE.url}${r.path}`,
    ).sort()

    expect(urls).toEqual(expected)
  })

  it("uses absolute canonical-domain URLs only", () => {
    for (const entry of entries) {
      expect(entry.url.startsWith(`${SITE.url}/`) || entry.url === SITE.url).toBe(true)
    }
  })

  /**
   * Regression: the canonical origin briefly pointed at www.newatlantis.us,
   * which was never attached to the Vercel project and failed TLS. The apex
   * is the host that is actually served; www only redirects to it.
   */
  it("uses the apex host as the canonical origin, not www", () => {
    expect(SITE.url).toBe("https://newatlantis.us")
    expect(SITE.url).not.toContain("www.")
    expect(SITE.url.endsWith("/")).toBe(false)
  })

  it("gives the home page the highest priority", () => {
    const home = entries.find((e) => e.url === `${SITE.url}/`)
    expect(home?.priority).toBe(1)
  })

  it("sets lastModified on every entry", () => {
    for (const entry of entries) {
      expect(entry.lastModified).toBeDefined()
    }
  })
})

describe("robots", () => {
  const config = robots()

  it("points at the absolute sitemap URL", () => {
    expect(config.sitemap).toBe(`${SITE.url}/sitemap.xml`)
  })

  it("allows crawling of the site root", () => {
    const rules = Array.isArray(config.rules) ? config.rules : [config.rules]
    const catchAll = rules.find((r) => r?.userAgent === "*")
    expect(catchAll?.allow).toBe("/")
  })

  it("does not emit the non-standard host directive", () => {
    expect(config).not.toHaveProperty("host")
  })
})

describe("pageMetadata", () => {
  it("sets a canonical URL for every route", () => {
    for (const key of ROUTE_KEYS) {
      const meta = pageMetadata(key)
      expect(meta.alternates?.canonical).toContain(SITE.url)
    }
  })

  it("builds Open Graph and Twitter cards for every route", () => {
    for (const key of ROUTE_KEYS) {
      const meta = pageMetadata(key)
      expect(meta.openGraph?.title).toContain(SITE.name)

      // Metadata["twitter"] is a union of card shapes; only `card` is asserted here.
      const twitter = meta.twitter as { card?: string } | null | undefined
      expect(twitter?.card).toBe("summary_large_image")
    }
  })

  /**
   * Regression: the root layout's title.template applies only to CHILD
   * segments, so app/page.tsx rendered "<page title>" with no site name until
   * pageMetadata started emitting an absolute title.
   */
  it("gives every page an absolute title including the site name", () => {
    for (const key of ROUTE_KEYS) {
      const title = pageMetadata(key).title as { absolute?: string }
      expect(title.absolute, key).toContain(SITE.name)
      expect(title.absolute, key).toBe(pageTitle(key))
    }
  })

  /** The plan asked for the home tab title to agree with the hero headline. */
  it("titles the home page with the brand and tagline, not a suffixed page name", () => {
    const title = pageMetadata("home").title as { absolute?: string }
    expect(title.absolute).toBe(`${SITE.name} - ${SITE.tagline}`)
    expect(title.absolute).not.toContain("|")
  })

  it("emits robots directives on every page rather than relying on inheritance", () => {
    for (const key of ROUTE_KEYS) {
      const robots = pageMetadata(key).robots as { index?: boolean; follow?: boolean }
      expect(robots?.index, key).toBe(true)
      expect(robots?.follow, key).toBe(true)
    }
  })

  /**
   * Regression: declaring an openGraph object in a page replaces the parent's,
   * which silently dropped the og:image from the root opengraph-image.tsx on
   * every page except the home page.
   */
  it("attaches a social preview image to every route", () => {
    for (const key of ROUTE_KEYS) {
      const meta = pageMetadata(key)
      const og = meta.openGraph as { images?: string[] }
      const twitter = meta.twitter as { images?: string[] }

      expect(og.images, key).toEqual([`${SITE.url}/opengraph-image`])
      expect(twitter.images, key).toEqual([`${SITE.url}/opengraph-image`])
    }
  })

  it("keeps descriptions within a sensible meta-description length", () => {
    for (const route of ROUTE_LIST) {
      expect(route.description.length).toBeGreaterThan(50)
      expect(route.description.length).toBeLessThanOrEqual(200)
    }
  })
})
