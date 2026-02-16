import Image from "next/image"
import Link from "next/link"

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60 bg-card/50">
      <div className="mx-auto max-w-5xl px-6 py-10">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-2.5">
            <Image
              src="/favicon.jpg"
              alt="New Atlantis Inc logo"
              width={28}
              height={28}
              className="rounded-sm"
            />
            <span className="font-serif text-lg tracking-wide text-foreground">
              New Atlantis Inc
            </span>
          </div>

          <nav className="flex flex-wrap gap-6" aria-label="Footer navigation">
            <Link href="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Home
            </Link>
            <Link href="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              About
            </Link>
            <Link href="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Contact
            </Link>
            <Link href="/links" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Resources
            </Link>
          </nav>
        </div>

        <div className="mt-8 pt-6 border-t border-border/40">
          <p className="text-xs text-muted-foreground text-center">
            {'Copyright \u00A9 2026 by New Atlantis, Inc. All rights reserved.'}
          </p>
        </div>
      </div>
    </footer>
  )
}
