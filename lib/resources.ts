/**
 * Outbound links for the /links (Resources) page.
 *
 * Kept out of the page file so tests/resources.test.ts can guard against the
 * two problems this list has had before: placeholder `#` hrefs, and several
 * labels silently pointing at one URL. Every URL below was checked live on
 * 2026-09-17; the notes record the ones that had rotted.
 */

export interface ResourceLink {
  label: string
  href: string
}

export interface ResourceGroup {
  category: string
  links: ResourceLink[]
}

export const RESOURCE_GROUPS: ResourceGroup[] = [
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
        // The Recorder of Deeds merged into the Clerk's office in December 2020;
        // cookcountyrecorder.com now returns 404.
        label: "Cook County Recorder of Deeds Search",
        href: "https://www.cookcountyclerkil.gov/recordings/search-recordings",
      },
      {
        label: "Cook County Clerk of Court",
        href: "https://www.cookcountyclerkofcourt.org/",
      },
      {
        label: "Cook County Property Tax Info",
        href: "https://www.cookcountytreasurer.com/yourpropertytaxoverviewsearch.aspx",
      },
      {
        // "Sold" taxes are Cook County's term for delinquent taxes sold at the
        // annual tax sale; this is the Treasurer's dedicated search for them.
        label: "Cook County Delinquent Property Tax Search",
        href: "https://www.cookcountytreasurer.com/soldpropertytaxsearch.aspx",
      },
      {
        label: "Cook County Tax Auction Site",
        href: "https://www.cookcountytreasurer.com/taxsalegeneralinformation.aspx",
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
        // cookcountyclerk.com only 301s here; link the destination directly.
        label: "Cook County Clerk's Office",
        href: "https://www.cookcountyclerkil.gov/",
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
        // www2.illinois.gov/business had decayed into a redirect to the
        // state homepage.
        label: "State of Illinois Business Portal",
        href: "https://www.illinois.gov/business.html",
      },
      {
        label: "Illinois Condominium Property Act",
        href: "https://www.ilga.gov/",
      },
      {
        // idfpr.com is a legacy domain that only redirects; both IDFPR links
        // previously pointed at its homepage.
        label: "Illinois Condominium & Common Interest Community Ombudsperson",
        href: "https://idfpr.illinois.gov/ccico.html",
      },
      {
        label: "Illinois Department of Financial and Professional Regulation",
        href: "https://idfpr.illinois.gov/",
      },
    ],
  },
  {
    category: "Puerto Rico & Other",
    links: [
      {
        // estado.gobierno.pr no longer resolves; the Department of State moved
        // to estado.pr.gov and the corporations registry to rcp.estado.pr.gov.
        label: "Puerto Rico Annual Report Service & Filing Instructions",
        href: "https://www.estado.pr.gov/",
      },
      {
        label: "Puerto Rico Corporation Search",
        href: "https://rcp.estado.pr.gov/",
      },
    ],
  },
]
