import type { Metadata } from "next"
import { ExternalLink } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Eyebrow } from "@/components/eyebrow"
import { COPY, pageMetadata } from "@/lib/seo"
import { RESOURCE_GROUPS } from "@/lib/resources"
import { JsonLd, breadcrumbSchema, webPageSchema } from "@/lib/structured-data"

export const metadata: Metadata = pageMetadata("links")

export default function LinksPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <JsonLd
        data={[webPageSchema("links", "CollectionPage"), breadcrumbSchema("links")]}
      />
      <SiteHeader />

      <main className="flex-1">
        {/* Page header */}
        <section className="border-b border-border bg-card">
          <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
            <Eyebrow>Resources</Eyebrow>
            <h1 className="mt-6 max-w-[16ch] font-serif text-h1 text-foreground text-balance md:text-display">
              Useful business resources
            </h1>
            <p className="mt-6 max-w-[38rem] font-serif text-lead text-muted-foreground">
              {COPY.linksLead}
            </p>
          </div>
        </section>

        {/* Groups — hairline-topped columns */}
        <section className="mx-auto max-w-6xl px-6 py-16 md:py-24">
          <div className="grid gap-x-12 md:grid-cols-2">
            {RESOURCE_GROUPS.map((group) => (
              <div key={group.category} className="border-t border-border py-8">
                <h2 className="font-serif text-h3 text-foreground">{group.category}</h2>
                <ul className="mt-5 space-y-3">
                  {group.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-start gap-2.5 text-ui text-muted-foreground transition-colors hover:text-primary"
                      >
                        <ExternalLink
                          className="mt-[5px] h-3.5 w-3.5 shrink-0 opacity-40 transition-opacity group-hover:opacity-100"
                          aria-hidden="true"
                        />
                        <span>{link.label}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
