import { describe, it, expect } from "vitest"
import { llmsTxt, llmsFullTxt } from "@/lib/llms-txt"
import { SITE, ROUTE_LIST, SERVICES, absoluteUrl } from "@/lib/seo"

describe("llms.txt", () => {
  const content = llmsTxt()

  it("opens with the site name as an H1 and a blockquote summary", () => {
    const lines = content.split("\n")
    expect(lines[0]).toBe(`# ${SITE.name}`)
    expect(content).toContain(`> ${SITE.description}`)
  })

  it("links every page in the sitemap", () => {
    for (const route of ROUTE_LIST) {
      expect(content).toContain(absoluteUrl(route.path))
    }
  })

  it("names every service", () => {
    for (const service of SERVICES) {
      expect(content).toContain(service.title)
    }
  })

  it("does not leak the contact email", () => {
    expect(content).not.toContain("@newatlantis.us")
  })
})

describe("llms-full.txt", () => {
  const content = llmsFullTxt()

  it("carries the exact hero headline", () => {
    expect(content).toContain(
      "Welcome to New Atlantis - Your Route Map to Your Business Success!",
    )
  })

  it("includes every page section", () => {
    for (const route of ROUTE_LIST) {
      expect(content).toContain(`URL: ${absoluteUrl(route.path)}`)
    }
  })

  it("is substantially longer than the short form", () => {
    expect(content.length).toBeGreaterThan(llmsTxt().length)
  })

  it("does not leak the contact email", () => {
    expect(content).not.toContain("@newatlantis.us")
  })
})
