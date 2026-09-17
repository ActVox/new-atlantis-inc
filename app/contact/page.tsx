import type { Metadata } from "next"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ContactForm } from "@/components/contact-form"
import { Eyebrow } from "@/components/eyebrow"
import { COPY, pageMetadata } from "@/lib/seo"
import { JsonLd, breadcrumbSchema, webPageSchema } from "@/lib/structured-data"

export const metadata: Metadata = pageMetadata("contact")

export default function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <JsonLd
        data={[webPageSchema("contact", "ContactPage"), breadcrumbSchema("contact")]}
      />
      <SiteHeader />

      <main className="flex-1">
        {/* Page header */}
        <section className="border-b border-border bg-card">
          <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
            <Eyebrow>Contact</Eyebrow>
            <h1 className="mt-6 max-w-[16ch] font-serif text-h1 text-foreground text-balance md:text-display">
              Start a conversation with us
            </h1>
            <p className="mt-6 max-w-[38rem] font-serif text-lead text-muted-foreground">
              {COPY.contactLead}
            </p>
          </div>
        </section>

        {/* Form + sidebar */}
        <section className="mx-auto max-w-6xl px-6 py-16 md:py-24">
          <div className="grid gap-12 md:grid-cols-12">
            {/* The form is an operating surface, so it sits on bone-deep. */}
            <div className="border border-border bg-card p-8 md:col-span-7 md:p-10">
              <h2 className="mb-8 font-serif text-h3 text-foreground">Send us a message</h2>
              <ContactForm />
            </div>

            <aside className="space-y-10 md:col-span-4 md:col-start-9">
              <div>
                <Eyebrow>Location</Eyebrow>
                <p className="mt-4 text-ui text-muted-foreground">
                  Serving businesses nationwide
                </p>
              </div>

              <div className="border-t border-border pt-8">
                <p className="font-serif text-lead italic text-foreground">
                  {`“${COPY.pullQuote}”`}
                </p>
                <p className="mt-4 text-eyebrow uppercase text-muted-foreground">
                  New Atlantis Inc
                </p>
              </div>
            </aside>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
