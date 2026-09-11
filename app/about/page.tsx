import type { Metadata } from "next"
import Image from "next/image"
import { Eye, Heart, Rocket, Target } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { COPY, PILLARS, pageMetadata, type PillarKey } from "@/lib/seo"
import { JsonLd, breadcrumbSchema, webPageSchema } from "@/lib/structured-data"

export const metadata: Metadata = pageMetadata("about")

/** Keyed by PillarKey, not by label — see the note on serviceIcons in app/page.tsx. */
const pillarIcons: Record<PillarKey, React.ReactNode> = {
  vision: <Eye className="h-5 w-5" />,
  values: <Heart className="h-5 w-5" />,
  mission: <Rocket className="h-5 w-5" />,
  objectives: <Target className="h-5 w-5" />,
}

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <JsonLd
        data={[webPageSchema("about", "AboutPage"), breadcrumbSchema("about")]}
      />
      <SiteHeader />

      <main className="flex-1">
        {/* Hero banner */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src="/images/about-atlantis.jpg"
              alt="Classical Greek temple overlooking the ocean, watercolor illustration"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/50 to-background" />
          </div>

          <div className="relative mx-auto max-w-5xl px-6 py-24 md:py-32">
            <p className="text-sm uppercase tracking-widest text-primary mb-4">
              About Us
            </p>
            <h1 className="font-serif text-4xl md:text-5xl leading-tight text-foreground text-balance max-w-2xl">
              {COPY.aboutHeadline}
            </h1>
          </div>
        </section>

        {/* Name story */}
        <section className="mx-auto max-w-5xl px-6 py-16">
          <div className="max-w-2xl">
            <h2 className="font-serif text-2xl text-foreground mb-4">Our Name</h2>
            <div className="w-12 h-px bg-primary mb-6" />
            <p className="text-lg leading-relaxed text-muted-foreground">
              {COPY.nameStory}
            </p>
          </div>
        </section>

        {/* Pillars grid */}
        <section className="border-y border-border/60 bg-card/40">
          <div className="mx-auto max-w-5xl px-6 py-16">
            <div className="grid gap-8 md:grid-cols-2">
              {PILLARS.map((pillar) => (
                <div
                  key={pillar.label}
                  className="bg-background border border-border/60 p-8 transition-all hover:shadow-md hover:border-primary/30"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex items-center justify-center w-10 h-10 bg-primary/10 text-primary rounded-sm shrink-0">
                      {pillarIcons[pillar.key]}
                    </div>
                    <h3 className="font-serif text-lg text-foreground">{pillar.label}</h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">{pillar.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
