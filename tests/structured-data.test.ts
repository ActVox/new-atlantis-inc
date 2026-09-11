import { describe, it, expect } from "vitest"
import {
  organizationSchema,
  websiteSchema,
  professionalServiceSchema,
  breadcrumbSchema,
  webPageSchema,
} from "@/lib/structured-data"
import { SERVICES, SITE } from "@/lib/seo"

const builders = {
  organization: organizationSchema(),
  website: websiteSchema(),
  service: professionalServiceSchema(),
  breadcrumb: breadcrumbSchema("about"),
  webpage: webPageSchema("contact", "ContactPage"),
}

describe("structured data", () => {
  it("declares the schema.org context and a type on every builder", () => {
    for (const [name, schema] of Object.entries(builders)) {
      expect(schema["@context"], name).toBe("https://schema.org")
      expect(schema["@type"], name).toBeTruthy()
    }
  })

  it("serializes to valid JSON", () => {
    for (const [name, schema] of Object.entries(builders)) {
      expect(() => JSON.parse(JSON.stringify(schema)), name).not.toThrow()
    }
  })

  it("exposes every service in the offer catalog", () => {
    const catalog = professionalServiceSchema().hasOfferCatalog as {
      itemListElement: { itemOffered: { name: string } }[]
    }

    const names = catalog.itemListElement.map((o) => o.itemOffered.name)
    expect(names).toEqual(SERVICES.map((s) => s.title))
  })

  it("never publishes an email, phone or postal address", () => {
    const serialized = JSON.stringify(Object.values(builders))

    expect(serialized).not.toContain("@newatlantis.us")
    expect(serialized).not.toContain("telephone")
    expect(serialized).not.toContain("postalAddress")
  })

  it("numbers breadcrumb positions from Home", () => {
    const crumbs = breadcrumbSchema("links").itemListElement as {
      position: number
      name: string
    }[]

    expect(crumbs[0].name).toBe("Home")
    expect(crumbs.map((c) => c.position)).toEqual([1, 2])
  })

  it("links page schemas back to the website and organization nodes", () => {
    const page = webPageSchema("about", "AboutPage")
    expect(page.isPartOf).toEqual({ "@id": `${SITE.url}/#website` })
    expect(page.about).toEqual({ "@id": `${SITE.url}/#organization` })
  })
})
