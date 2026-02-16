import type { Metadata } from "next"
import { ExternalLink } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

export const metadata: Metadata = {
  title: "Resources - New Atlantis Inc",
  description:
    "Useful business resource links curated by New Atlantis Inc, including government services, business filings, and tax information.",
}

interface LinkGroup {
  category: string
  links: { label: string; href: string }[]
}

const linkGroups: LinkGroup[] = [
  {
    category: "Business Planning",
    links: [
      {
        label: "Entrepreneur.com - Business Plan",
        href: "https://www.entrepreneur.com/business-plan",
      },
      {
        label: "IRS - Small Business Resources",
        href: "https://www.irs.gov/businesses/small-businesses-self-employed",
      },
      {
        label: "US Patent and Trademark Office",
        href: "https://www.uspto.gov/",
      },
    ],
  },
  {
    category: "Cook County Services",
    links: [
      {
        label: "Cook County Recorder of Deeds Search",
        href: "https://www.cookcountyrecorder.com/",
      },
      {
        label: "Cook County Clerk of Court",
        href: "https://www.cookcountyclerkofcourt.org/",
      },
      {
        label: "Cook County Property Tax Info",
        href: "https://www.cookcountytreasurer.com/",
      },
      {
        label: "Cook County Delinquent Property Tax Search",
        href: "https://www.cookcountytreasurer.com/",
      },
      {
        label: "Cook County Tax Auction Site",
        href: "https://www.cookcountytreasurer.com/",
      },
      {
        label: "Cook County Treasurer's Office",
        href: "https://www.cookcountytreasurer.com/",
      },
      {
        label: "Cook County Assessor's Office",
        href: "https://www.cookcountyassessor.com/",
      },
      {
        label: "Cook County Clerk's Office",
        href: "https://www.cookcountyclerk.com/",
      },
    ],
  },
  {
    category: "Illinois State Resources",
    links: [
      {
        label: "Illinois Secretary of State Business Services",
        href: "https://www.ilsos.gov/",
      },
      {
        label: "Illinois Corporation/LLC Search",
        href: "https://www.ilsos.gov/corporatellc/",
      },
      {
        label: "Illinois Revenue - Business Links",
        href: "https://tax.illinois.gov/",
      },
      {
        label: "State of Illinois Business Portal",
        href: "https://www2.illinois.gov/business",
      },
      {
        label: "Illinois Condominium Property Act",
        href: "https://www.ilga.gov/",
      },
      {
        label: "Illinois Condominium & Common Interest Community Ombudsperson",
        href: "https://www.idfpr.com/",
      },
      {
        label: "Illinois Department of Financial and Professional Regulation",
        href: "https://www.idfpr.com/",
      },
    ],
  },
  {
    category: "Puerto Rico & Other",
    links: [
      {
        label: "Puerto Rico Annual Report Service & Filing Instructions",
        href: "https://www.estado.gobierno.pr/",
      },
      {
        label: "Puerto Rico Corporation Search",
        href: "https://www.estado.gobierno.pr/",
      },
      {
        label: "World Corporation/LLC Search",
        href: "#",
      },
    ],
  },
]

export default function LinksPage() {
  return (
    <div className="min-h-screen flex flex-col">
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
              A curated collection of government services, business filings, and regulatory resources to support your ventures.
            </p>
          </div>
        </section>

        {/* Links grid */}
        <section className="mx-auto max-w-5xl px-6 py-16">
          <div className="grid gap-8 md:grid-cols-2">
            {linkGroups.map((group) => (
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
