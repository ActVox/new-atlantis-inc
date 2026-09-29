import Link from "next/link"
import { CompassMark } from "@/components/compass-mark"

const footerLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Resources", href: "/links" },
]

export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div className="flex items-center gap-3">
            <CompassMark className="h-[26px] w-[26px] text-primary" />
            <span className="font-serif text-lg tracking-[0.01em] text-foreground">
              New Atlantis Inc
            </span>
          </div>

          <nav className="flex flex-wrap gap-8" aria-label="Footer navigation">
            {footerLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-eyebrow uppercase text-muted-foreground transition-colors hover:text-primary"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-8 border-t border-border pt-6">
          <p className="text-small text-muted-foreground">
            {'Copyright © 2026 by New Atlantis, Inc. All rights reserved.'}
          </p>
        </div>
      </div>
    </footer>
  )
}
