import type { Metadata } from "next"
import Image from "next/image"
import { Eye, Heart, Rocket, Target } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

export const metadata: Metadata = {
  title: "About - New Atlantis Inc",
  description:
    "Learn about New Atlantis Inc, our vision, values, and mission to help businesses succeed through education, planning, and analysis.",
}

const pillars = [
  {
    icon: <Eye className="h-5 w-5" />,
    label: "Our Vision",
    text: "Improving the wealth and prosperity of individuals and society based on our VALUES and through our MISSION.",
  },
  {
    icon: <Heart className="h-5 w-5" />,
    label: "Our Values",
    text: "Integrity, Intelligence, and Motivation based on a win-win approach.",
  },
  {
    icon: <Rocket className="h-5 w-5" />,
    label: "Our Mission",
    text: "Leadership in assisting individuals and businesses to be successful through education, planning, and analysis.",
  },
  {
    icon: <Target className="h-5 w-5" />,
    label: "Our Business Objectives",
    text: "Provide valuable knowledge, insights and analysis which would improve the success rate for new start-ups and for already established companies.",
  },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
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
              The legacy of Atlantis, reimagined for modern business
            </h1>
          </div>
        </section>

        {/* Name story */}
        <section className="mx-auto max-w-5xl px-6 py-16">
          <div className="max-w-2xl">
            <h2 className="font-serif text-2xl text-foreground mb-4">Our Name</h2>
            <div className="w-12 h-px bg-primary mb-6" />
            <p className="text-lg leading-relaxed text-muted-foreground">
              Atlantis was an ancient civilization with a highly advanced science and an extremely elevated economic level. We draw inspiration from that spirit of progress and prosperity, channeling it into practical strategies for modern businesses.
            </p>
          </div>
        </section>

        {/* Pillars grid */}
        <section className="border-y border-border/60 bg-card/40">
          <div className="mx-auto max-w-5xl px-6 py-16">
            <div className="grid gap-8 md:grid-cols-2">
              {pillars.map((pillar) => (
                <div
                  key={pillar.label}
                  className="bg-background border border-border/60 p-8 transition-all hover:shadow-md hover:border-primary/30"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex items-center justify-center w-10 h-10 bg-primary/10 text-primary rounded-sm shrink-0">
                      {pillar.icon}
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
