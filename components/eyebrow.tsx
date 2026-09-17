import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

/**
 * Section label: Public Sans, uppercase, tracked, followed by a 24px brass
 * rule. One of the three places brass is allowed (DESIGN.md › Color).
 */
export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p className={cn("flex items-center gap-4 text-eyebrow uppercase text-muted-foreground", className)}>
      {children}
      <span className="h-px w-6 bg-brass" aria-hidden="true" />
    </p>
  )
}
