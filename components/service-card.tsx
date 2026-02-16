import type { ReactNode } from "react"

interface ServiceCardProps {
  icon: ReactNode
  title: string
  items: string[]
}

export function ServiceCard({ icon, title, items }: ServiceCardProps) {
  return (
    <div className="group bg-card border border-border/60 p-6 transition-all hover:shadow-md hover:border-primary/30">
      <div className="flex items-center gap-3 mb-4">
        <div className="flex items-center justify-center w-10 h-10 bg-primary/10 text-primary rounded-sm shrink-0">
          {icon}
        </div>
        <h3 className="font-serif text-lg text-foreground">{title}</h3>
      </div>
      <ul className="space-y-2">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-2 text-sm leading-relaxed text-muted-foreground">
            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary/40 shrink-0" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}
