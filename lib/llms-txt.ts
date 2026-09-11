import {
  SITE,
  COPY,
  ROUTES,
  ROUTE_LIST,
  SERVICES,
  PILLARS,
  absoluteUrl,
} from "@/lib/seo"

/**
 * llms.txt — the AI-crawler equivalent of a sitemap.
 *
 * Built from lib/seo.ts rather than hand-written so the AI-facing summary can
 * never drift from the metadata, service copy, and pillar copy the site renders.
 */
export function llmsTxt(): string {
  return [
    `# ${SITE.name}`,
    "",
    `> ${SITE.description}`,
    "",
    `${SITE.legalName} is a business consultancy serving clients across the United States. Our tagline is "${SITE.tagline}".`,
    "",
    "## Pages",
    "",
    ...ROUTE_LIST.map(
      (route) =>
        `- [${route.title}](${absoluteUrl(route.path)}): ${route.summary}`,
    ),
    "",
    "## Services",
    "",
    ...SERVICES.flatMap((service) => [
      `### ${service.title}`,
      "",
      ...service.items.map((item) => `- ${item}`),
      "",
    ]),
    "## About",
    "",
    ...PILLARS.map((pillar) => `- **${pillar.label}**: ${pillar.text}`),
    "",
    "## Contact",
    "",
    `Enquiries are handled through the contact form at ${absoluteUrl(ROUTES.contact.path)}.`,
    "",
    "## More",
    "",
    `- [Full site content](${SITE.url}/llms-full.txt)`,
    `- [Sitemap](${SITE.url}/sitemap.xml)`,
    "",
  ].join("\n")
}

/** The long-form variant: the readable content of every page in one file. */
export function llmsFullTxt(): string {
  return [
    `# ${SITE.name} — full site content`,
    "",
    `> ${SITE.description}`,
    "",
    `Source: ${SITE.url}/`,
    `Canonical page list: ${SITE.url}/sitemap.xml`,
    "",
    "---",
    "",
    `## ${ROUTES.home.title}`,
    `URL: ${absoluteUrl(ROUTES.home.path)}`,
    "",
    COPY.heroHeadline,
    "",
    COPY.heroLead,
    "",
    "We offer expertise in the following areas:",
    "",
    ...SERVICES.flatMap((service) => [
      `### ${service.title}`,
      "",
      ...service.items.map((item) => `- ${item}`),
      "",
    ]),
    "---",
    "",
    `## ${ROUTES.about.title}`,
    `URL: ${absoluteUrl(ROUTES.about.path)}`,
    "",
    `${COPY.aboutHeadline}.`,
    "",
    "### Our Name",
    "",
    COPY.nameStory,
    "",
    ...PILLARS.flatMap((pillar) => [`### ${pillar.label}`, "", pillar.text, ""]),
    "---",
    "",
    `## ${ROUTES.contact.title}`,
    `URL: ${absoluteUrl(ROUTES.contact.path)}`,
    "",
    `Start a conversation with us. ${COPY.contactLead}`,
    "",
    "Enquiries are submitted through the contact form on that page. We serve businesses nationwide.",
    "",
    `"${COPY.pullQuote}" — ${SITE.name}`,
    "",
    "---",
    "",
    `## ${ROUTES.links.title}`,
    `URL: ${absoluteUrl(ROUTES.links.path)}`,
    "",
    `${COPY.linksLead} Covers business planning, Cook County services, Illinois state resources, and Puerto Rico filings.`,
    "",
  ].join("\n")
}
