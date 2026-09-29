/**
 * Button recipes shared by the marketing pages. Square, Public Sans,
 * uppercase — see DESIGN.md › Layout › Buttons. The contact form uses the
 * shadcn <Button> instead; its radius resolves to 0 via tailwind.config.ts.
 */
const base =
  "inline-flex items-center border px-6 py-3.5 text-eyebrow font-semibold uppercase transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-primary"

export const buttonPrimary = `${base} border-primary bg-primary text-primary-foreground hover:border-primary-hover hover:bg-primary-hover`

export const buttonSecondary = `${base} border-border text-foreground hover:border-foreground hover:bg-card`
