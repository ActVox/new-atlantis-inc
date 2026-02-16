import Image from "next/image"
import Link from "next/link"
import { FileText, TrendingUp, ShieldCheck, Target } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ServiceCard } from "@/components/service-card"

const services = [
  {
    icon: <FileText className="h-5 w-5" />,
    title: "Business Plan Evaluation",
    items: [
      "Assisting in creating a sound Business Plan",
      "Evaluating your Mission, Executive Summary, Business & Financial Objectives, as well as other key components of your Business Plan",
    ],
  },
  {
    icon: <TrendingUp className="h-5 w-5" />,
    title: "Vitality & Sustainability Strategies",
    items: [
      "Identifying your Main Competencies and Value Proposition",
      "Analyzing effects of market and economic changes",
      "Creating the strategies that set apart your business from your competitors",
    ],
  },
  {
    icon: <ShieldCheck className="h-5 w-5" />,
    title: "Risk Evaluation & Mitigation",
    items: [
      "Impact to financial projections from market changes",
      "Regulatory and legal compliance",
    ],
  },
  {
    icon: <Target className="h-5 w-5" />,
    title: "Business & Marketing Strategies",
    items: [
      "Identifying appropriate marketing strategies and their implementation",
      "Advancing your Competitive Advantage",
    ],
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src="/images/hero-map.jpg"
              alt="Vintage nautical map with compass rose"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/50 to-background" />
          </div>

          <div className="relative mx-auto max-w-5xl px-6 py-24 md:py-36">
            <p className="text-sm uppercase tracking-widest text-primary mb-4">
              Your Route Map to Business Success
            </p>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-tight text-foreground text-balance max-w-2xl">
              Navigate the path to your business success
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground max-w-xl">
              Any business venture goes through bumpy roads. We help with a smoother ride since many unpleasant surprises can be prevented through planning, research, and implementation of best practices.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground text-sm font-medium tracking-wider uppercase transition-colors hover:bg-primary/90"
              >
                Get in Touch
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center px-6 py-3 border border-border text-foreground text-sm font-medium tracking-wider uppercase transition-colors hover:bg-card"
              >
                Learn More
              </Link>
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="mx-auto max-w-5xl px-6 py-20">
          <div className="text-center mb-12">
            <p className="text-sm uppercase tracking-widest text-primary mb-2">
              Our Expertise
            </p>
            <h2 className="font-serif text-3xl md:text-4xl text-foreground text-balance">
              We offer expertise in the following areas
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {services.map((service) => (
              <ServiceCard key={service.title} {...service} />
            ))}
          </div>
        </section>

        {/* CTA band */}
        <section className="border-y border-border/60 bg-card/50">
          <div className="mx-auto max-w-5xl px-6 py-16 text-center">
            <h2 className="font-serif text-2xl md:text-3xl text-foreground text-balance mb-4">
              Ready to chart your course?
            </h2>
            <p className="text-muted-foreground leading-relaxed max-w-lg mx-auto mb-8">
              Let us help you develop the strategies that set your business apart from the competition.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground text-sm font-medium tracking-wider uppercase transition-colors hover:bg-primary/90"
            >
              Start a Conversation
            </Link>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
