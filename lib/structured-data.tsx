import {
  SITE,
  SERVICES,
  absoluteUrl,
  pageTitle,
  ROUTES,
  type RouteKey,
} from "@/lib/seo"

/**
 * Schema.org JSON-LD builders.
 *
 * Deliberately no `email`, `telephone` or `address`: the business publishes no
 * postal address or phone, and the contact address is kept off the page and out
 * of the markup so it cannot be harvested. Enquiries go through /contact.
 */

/** One schema.org node. Loosely typed — schema.org is open-world by design. */
type SchemaNode = Record<string, unknown>

const HOME = absoluteUrl("/")

/** Stable @id anchors, so nodes on different pages reference the same entities. */
const ID = {
  organization: `${SITE.url}/#organization`,
  website: `${SITE.url}/#website`,
  service: `${SITE.url}/#service`,
} as const

const UNITED_STATES = {
  "@type": "Country",
  name: "United States",
} as const

export function organizationSchema(): SchemaNode {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ID.organization,
    name: SITE.name,
    legalName: SITE.legalName,
    url: HOME,
    slogan: SITE.tagline,
    description: SITE.description,
    logo: {
      "@type": "ImageObject",
      url: `${SITE.url}/icon-512.png`,
      width: 512,
      height: 512,
    },
    areaServed: UNITED_STATES,
  }
}

export function websiteSchema(): SchemaNode {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": ID.website,
    url: HOME,
    name: SITE.name,
    description: SITE.description,
    inLanguage: "en-US",
    publisher: { "@id": ID.organization },
  }
}

/** The home page's service offering, derived from the same SERVICES copy the cards render. */
export function professionalServiceSchema(): SchemaNode {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": ID.service,
    name: SITE.name,
    description: SITE.description,
    url: HOME,
    serviceType: "Business consulting",
    provider: { "@id": ID.organization },
    areaServed: UNITED_STATES,
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Business consulting services",
      itemListElement: SERVICES.map((service) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service.title,
          description: service.items.join(". "),
        },
      })),
    },
  }
}

/** Breadcrumb trail. Home is prepended automatically. */
export function breadcrumbSchema(key: Exclude<RouteKey, "home">): SchemaNode {
  const route = ROUTES[key]

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: absoluteUrl("/"),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: route.title,
        item: absoluteUrl(route.path),
      },
    ],
  }
}

/** A typed page-level schema (AboutPage / ContactPage / CollectionPage). */
export function webPageSchema(
  key: Exclude<RouteKey, "home">,
  type: "AboutPage" | "ContactPage" | "CollectionPage",
): SchemaNode {
  const route = ROUTES[key]

  return {
    "@context": "https://schema.org",
    "@type": type,
    "@id": `${absoluteUrl(route.path)}#webpage`,
    url: absoluteUrl(route.path),
    name: pageTitle(key),
    description: route.description,
    inLanguage: "en-US",
    isPartOf: { "@id": ID.website },
    about: { "@id": ID.organization },
  }
}

/**
 * Renders one or more schema objects as a JSON-LD script tag.
 *
 * JSON.stringify output is escaped for `<` so a value containing `</script>`
 * cannot break out of the tag.
 */
export function JsonLd({ data }: { data: SchemaNode | SchemaNode[] }) {
  const json = JSON.stringify(data).replace(/</g, "\\u003c")

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  )
}
