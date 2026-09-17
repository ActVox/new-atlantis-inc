import type { Metadata } from "next"
import { ExternalLink } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { COPY, pageMetadata } from "@/lib/seo"
import { RESOURCE_GROUPS } from "@/lib/resources"
import { JsonLd, breadcrumbSchema, webPageSchema } from "@/lib/structured-data"

export const metadata: Metadata = pageMetadata("links")

export default function LinksPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <JsonLd
        data={[webPageSchema("links", "CollectionPage"), breadcrumbSchema("links")]}
      />
      <SiteHeader />

      <main className="flex-1">
        {/* Page header */}
        <section className="border-b border-border/60 bg-card/40">
          <div className="mx-auto max-w-5xl px-6 py-16 md:py-20">
            <p className="text-sm uppercase tracking-widest text-primary mb-4">
              Resources
            </p>
            <h1 className="font-serif text-4xl md:text-5xl leading-tight text-foreground text-balance max-w-2xl">
              Useful business resources
            </h1>
            <p className="mt-4 text-lg text-muted-foreground leading-relaxed max-w-xl">
              {COPY.linksLead}
            </p>
          </div>
        </section>

        {/* Links grid */}
        <section className="mx-auto max-w-5xl px-6 py-16">
          <div className="grid gap-8 md:grid-cols-2">
            {RESOURCE_GROUPS.map((group) => (
              <div
                key={group.category}
                className="bg-card border border-border/60 p-6"
              >
                <h2 className="font-serif text-lg text-foreground mb-4">
                  {group.category}
                </h2>
                <div className="w-8 h-px bg-primary/40 mb-5" />
                <ul className="space-y-3">
                  {group.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-start gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
                      >
                        <ExternalLink className="h-3.5 w-3.5 mt-1 shrink-0 opacity-40 group-hover:opacity-100 transition-opacity" />
                        <span className="leading-relaxed">{link.label}</span>
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
