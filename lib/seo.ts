import type { Metadata } from "next"

/**
 * Single source of truth for everything search engines and LLMs read.
 *
 * The sitemap, robots.txt, llms.txt, canonical URLs and JSON-LD are all derived
 * from the constants below, so a page can never appear in one and be missing
 * from another.
 */

export const SITE = {
  /**
   * Canonical origin. The apex is the primary host on Vercel; www is attached
   * as a 308 redirect to it. Every canonical, sitemap, OG and llms.txt URL
   * derives from this value.
   */
  url: "https://newatlantis.us",
  name: "New Atlantis Inc",
  legalName: "New Atlantis, Inc.",
  tagline: "Your Route Map to Your Business Success",
  description:
    "New Atlantis Inc provides expert business consulting, planning, and analysis to help startups and established companies succeed.",
  locale: "en_US",
} as const

/**
 * Prose rendered on the pages AND reused by llms-full.txt, so the two cannot
 * drift apart.
 */
export const COPY = {
  heroHeadline:
    "Welcome to New Atlantis - Your Route Map to Your Business Success!",
  heroLead:
    "Any business venture goes through bumpy roads. We help with a smoother ride since many unpleasant surprises can be prevented through planning, research, and implementation of best practices.",
  aboutHeadline: "The legacy of Atlantis, reimagined for modern business",
  nameStory:
    "Atlantis was an ancient civilization with a highly advanced science and an extremely elevated economic level. We draw inspiration from that spirit of progress and prosperity, channeling it into practical strategies for modern businesses.",
  contactLead:
    "Whether you are starting a new venture or looking to strengthen an existing one, we are here to help.",
  linksLead:
    "A curated collection of government services, business filings, and regulatory resources to support your ventures.",
  pullQuote:
    "Any business venture goes through bumpy roads. We help with a smoother ride.",
} as const

export type RouteKey = "home" | "about" | "contact" | "links"

export interface RouteInfo {
  /** Path relative to the site root, always leading-slash, never trailing. */
  path: string
  /** Short page title. Rendered as "<title> | <site name>" unless `absoluteTitle` is set. */
  title: string
  /**
   * Verbatim <title>, bypassing the "| site name" suffix. The home page uses
   * this so its tab title matches the hero headline's brand-and-tagline wording
   * instead of reading "New Atlantis Inc … | New Atlantis Inc".
   */
  absoluteTitle?: string
  /** Meta description. Aim for 140-160 characters. */
  description: string
  /** One-line summary used by llms.txt. */
  summary: string
  changeFrequency: "yearly" | "monthly" | "weekly"
  priority: number
}

export const ROUTES: Record<RouteKey, RouteInfo> = {
  home: {
    path: "/",
    title: "Business Consulting, Planning & Strategy",
    absoluteTitle: `${SITE.name} - ${SITE.tagline}`,
    description:
      "New Atlantis Inc helps startups and established companies succeed through business plan evaluation, sustainability strategy, risk mitigation, and marketing strategy.",
    summary:
      "Overview of New Atlantis Inc and the four areas of business consulting expertise we offer.",
    changeFrequency: "monthly",
    priority: 1,
  },
  about: {
    path: "/about",
    title: "About Us",
    description:
      "Learn about New Atlantis Inc — our vision, values, mission, and business objectives, and the story behind our name.",
    summary:
      "Our vision, values, mission and business objectives, plus the story behind the New Atlantis name.",
    changeFrequency: "yearly",
    priority: 0.8,
  },
  contact: {
    path: "/contact",
    title: "Contact Us",
    description:
      "Start a conversation with New Atlantis Inc. Send us a message about your new venture or your established business and we will get back to you.",
    summary:
      "Contact form for enquiries about business planning, strategy, and risk consulting.",
    changeFrequency: "yearly",
    priority: 0.7,
  },
  links: {
    path: "/links",
    title: "Business Resources",
    description:
      "A curated collection of business planning, Cook County, Illinois state, and Puerto Rico government resources for business filings and tax information.",
    summary:
      "Curated links to government services, business filings, and tax resources.",
    changeFrequency: "monthly",
    priority: 0.6,
  },
}

export const ROUTE_LIST: RouteInfo[] = Object.values(ROUTES)

/**
 * Service copy, shared by the home page cards, JSON-LD, and llms.txt.
 *
 * `key` is a stable identifier, deliberately separate from `title`: the home
 * page maps icons by key, so editing the display copy cannot silently orphan an
 * icon.
 */
export type ServiceKey =
  | "business-plan"
  | "vitality"
  | "risk"
  | "marketing"

export interface Service {
  key: ServiceKey
  title: string
  items: string[]
}

export const SERVICES: Service[] = [
  {
    key: "business-plan",
    title: "Business Plan Evaluation",
    items: [
      "Assisting in creating a sound Business Plan",
      "Evaluating your Mission, Executive Summary, Business & Financial Objectives, as well as other key components of your Business Plan",
    ],
  },
  {
    key: "vitality",
    title: "Vitality & Sustainability Strategies",
    items: [
      "Identifying your Main Competencies and Value Proposition",
      "Analyzing effects of market and economic changes",
      "Creating the strategies that set apart your business from your competitors",
    ],
  },
  {
    key: "risk",
    title: "Risk Evaluation & Mitigation",
    items: [
      "Impact to financial projections from market changes",
      "Regulatory and legal compliance",
    ],
  },
  {
    key: "marketing",
    title: "Business & Marketing Strategies",
    items: [
      "Identifying appropriate marketing strategies and their implementation",
      "Advancing your Competitive Advantage",
    ],
  },
]

/**
 * The vision/values/mission copy rendered on /about, reused by llms.txt.
 * Keyed for the same reason SERVICES is — see ServiceKey.
 */
export type PillarKey = "vision" | "values" | "mission" | "objectives"

export interface Pillar {
  key: PillarKey
  label: string
  text: string
}

export const PILLARS: Pillar[] = [
  {
    key: "vision",
    label: "Our Vision",
    text: "Improving the wealth and prosperity of individuals and society based on our VALUES and through our MISSION.",
  },
  {
    key: "values",
    label: "Our Values",
    text: "Integrity, Intelligence, and Motivation based on a win-win approach.",
  },
  {
    key: "mission",
    label: "Our Mission",
    text: "Leadership in assisting individuals and businesses to be successful through education, planning, and analysis.",
  },
  {
    key: "objectives",
    label: "Our Business Objectives",
    text: "Provide valuable knowledge, insights and analysis which would improve the success rate for new start-ups and for already established companies.",
  },
]

/** Absolute URL for a site-relative path. */
export function absoluteUrl(path: string): string {
  return path === "/" ? `${SITE.url}/` : `${SITE.url}${path}`
}

/** The site-wide title, used as the layout default and by the OG image. */
export function siteTitle(): string {
  return `${SITE.name} - ${SITE.tagline}`
}

/** The full <title> for a page, site name included. */
export function pageTitle(key: RouteKey): string {
  const route = ROUTES[key]
  return route.absoluteTitle ?? `${route.title} | ${SITE.name}`
}

/** Indexable, with generous snippet and image allowances for rich results. */
const INDEXABLE: Metadata["robots"] = {
  index: true,
  follow: true,
  googleBot: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1,
  },
}

/**
 * Build a page's Metadata: canonical URL, Open Graph, Twitter card and robots
 * directives, all consistent with the rest of the site.
 *
 * Three things are set explicitly rather than inherited from the layout, two of
 * them because Next's merging does not do what you would expect:
 *
 * - `title` is `absolute`. The root layout's `title.template` only applies to
 *   CHILD segments, so `app/page.tsx` — the root segment's own page — would
 *   otherwise render without the site name.
 * - `openGraph.images`. Declaring an `openGraph` object in a page replaces the
 *   parent's entirely, which drops the image contributed by the root
 *   `opengraph-image.tsx` file convention.
 * - `robots` does inherit correctly, but is emitted per page so that the
 *   directives a crawler sees are visible at the page, not action-at-a-distance.
 */
export function pageMetadata(key: RouteKey): Metadata {
  const route = ROUTES[key]
  const url = absoluteUrl(route.path)
  const title = pageTitle(key)
  const images = [`${SITE.url}/opengraph-image`]

  return {
    title: { absolute: title },
    description: route.description,
    alternates: { canonical: url },
    robots: INDEXABLE,
    openGraph: {
      type: "website",
      url,
      siteName: SITE.name,
      title,
      description: route.description,
      locale: SITE.locale,
      images,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: route.description,
      images,
    },
  }
}
