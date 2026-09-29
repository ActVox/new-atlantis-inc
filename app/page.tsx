import type { Metadata } from "next"
import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ServiceRow } from "@/components/service-row"
import { CompassInstrument } from "@/components/compass-instrument"
import { Eyebrow } from "@/components/eyebrow"
import { COPY, SERVICES, pageMetadata } from "@/lib/seo"
import { buttonPrimary, buttonSecondary } from "@/lib/buttons"
import { JsonLd, professionalServiceSchema } from "@/lib/structured-data"

export const metadata: Metadata = pageMetadata("home")

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <JsonLd data={professionalServiceSchema()} />
      <SiteHeader />

      <main className="flex-1">
        {/*
         * Hero: typographic, no photograph. The firm publishes no office or
         * team, so the mark is the only honest image — see DESIGN.md.
         */}
        <section className="mx-auto grid max-w-6xl items-center gap-10 px-6 py-16 md:grid-cols-12 md:py-24 lg:py-28">
          <div className="md:col-span-7">
            <Eyebrow>Business planning · Strategy · Risk</Eyebrow>
            <h1 className="mt-6 font-serif text-[2.75rem] leading-[1.1] tracking-[-0.015em] text-foreground text-balance md:text-h1 lg:text-[4rem]">
              {COPY.heroHeadline}
            </h1>
            <p className="mt-6 max-w-[38rem] font-serif text-lead text-muted-foreground">
              {COPY.heroLead}
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/contact" className={buttonPrimary}>
                Get in Touch
              </Link>
              <Link href="/about" className={buttonSecondary}>
                Learn More
              </Link>
            </div>
          </div>
          <div className="order-first w-[220px] md:order-none md:col-span-5 md:w-full md:max-w-[460px] md:justify-self-end">
            <CompassInstrument />
          </div>
        </section>

        {/* Services ledger */}
        <section className="mx-auto max-w-6xl px-6 pb-16 pt-4 md:pb-24">
          <Eyebrow>Our expertise</Eyebrow>
          <h2 className="mt-5 max-w-[18ch] font-serif text-h2 text-foreground text-balance">
            We offer expertise in the following areas
          </h2>

          <ol className="mt-10 grid border-t border-border md:grid-cols-2 md:gap-x-12">
            {SERVICES.map((service, i) => (
              <ServiceRow
                key={service.key}
                index={i + 1}
                title={service.title}
                items={service.items}
              />
            ))}
          </ol>
        </section>

        {/* CTA band */}
        <section className="border-y border-border bg-card">
          <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-8 px-6 py-16">
            <div>
              <Eyebrow>Next step</Eyebrow>
              <h2 className="mt-4 font-serif text-h2 text-foreground text-balance">
                Ready to chart your course?
              </h2>
              <p className="mt-3 max-w-[34rem] font-serif text-body text-muted-foreground">
                Let us help you develop the strategies that set your business apart from the competition.
              </p>
            </div>
            <Link href="/contact" className={buttonPrimary}>
              Start a Conversation
            </Link>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
