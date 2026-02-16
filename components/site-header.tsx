"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Resources", href: "/links" },
]

export function SiteHeader() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="border-b border-border/60 bg-card/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="mx-auto max-w-5xl flex items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2.5 group">
          <Image
            src="/favicon.jpg"
            alt="New Atlantis Inc logo"
            width={32}
            height={32}
            className="rounded-sm transition-transform group-hover:rotate-12"
          />
          <span className="font-serif text-xl tracking-wide text-foreground">
            New Atlantis Inc
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-sm tracking-wider uppercase transition-colors hover:text-primary",
                pathname === item.href
                  ? "text-primary font-semibold"
                  : "text-muted-foreground"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <nav className="md:hidden border-t border-border/60 bg-card" aria-label="Mobile navigation">
          <div className="flex flex-col px-6 py-4 gap-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "text-sm tracking-wider uppercase transition-colors hover:text-primary",
                  pathname === item.href
                    ? "text-primary font-semibold"
                    : "text-muted-foreground"
                )}
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
