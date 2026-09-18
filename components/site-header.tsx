"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { Menu, X } from "lucide-react"
import { CompassMark } from "@/components/compass-mark"
import { cn } from "@/lib/utils"

const navItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Resources", href: "/links" },
]

/** Eyebrow-style nav link; the active item is ink with a brass tick beneath. */
function navLinkClass(active: boolean) {
  return cn(
    "border-b-2 pb-1.5 pt-2 text-eyebrow uppercase transition-colors hover:text-primary",
    active ? "border-brass text-foreground" : "border-transparent text-muted-foreground"
  )
}

export function SiteHeader() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur-sm">
      <div className="mx-auto flex h-[72px] max-w-6xl items-center justify-between px-6">
        <Link href="/" className="group flex items-center gap-3">
          <CompassMark className="h-8 w-8 text-primary transition-transform duration-200 motion-safe:group-hover:rotate-[15deg]" />
          <span className="font-serif text-[22px] tracking-[0.01em] text-foreground">
            New Atlantis Inc
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-10 md:flex" aria-label="Main navigation">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className={navLinkClass(pathname === item.href)}>
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Mobile toggle */}
        <button
          className="text-foreground md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <nav className="border-t border-border bg-background md:hidden" aria-label="Mobile navigation">
          <div className="flex flex-col gap-4 px-6 py-5">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={cn("self-start", navLinkClass(pathname === item.href))}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  )
}
