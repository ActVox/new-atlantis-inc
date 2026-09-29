import type { Metadata } from "next"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Eyebrow } from "@/components/eyebrow"
import { COPY, PILLARS, pageMetadata } from "@/lib/seo"
import { JsonLd, breadcrumbSchema, webPageSchema } from "@/lib/structured-data"

export const metadata: Metadata = pageMetadata("about")

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <JsonLd
        data={[webPageSchema("about", "AboutPage"), breadcrumbSchema("about")]}
      />
      <SiteHeader />

      <main className="flex-1">
        {/* Page header — typographic band, no photograph (DESIGN.md › Imagery) */}
        <section className="border-b border-border bg-card">
          <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
            <Eyebrow>About us</Eyebrow>
            <h1 className="mt-6 max-w-[16ch] font-serif text-h1 text-foreground text-balance md:text-display">
              {COPY.aboutHeadline}
            </h1>
          </div>
        </section>

        {/* Name story */}
        <section className="mx-auto max-w-6xl px-6 py-16 md:py-24">
          <div className="grid gap-8 md:grid-cols-12">
            <h2 className="font-serif text-h3 text-foreground md:col-span-4">Our Name</h2>
            <p className="max-w-[66ch] font-serif text-body text-muted-foreground md:col-span-8">
              {COPY.nameStory}
            </p>
          </div>
        </section>

        {/* Pillars — hairline-topped columns, never boxes */}
        <section className="border-t border-border">
          <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
            <Eyebrow>What guides us</Eyebrow>
            <dl className="mt-10 grid gap-x-12 md:grid-cols-2">
              {PILLARS.map((pillar) => (
                <div key={pillar.key} className="border-t border-border py-8">
                  <dt className="font-serif text-h3 text-foreground">{pillar.label}</dt>
                  <dd className="mt-3 max-w-[52ch] font-serif text-body text-muted-foreground">
                    {pillar.text}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
