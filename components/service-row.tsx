interface ServiceRowProps {
  /** 1-based position in the ledger; rendered as a two-digit numeral. */
  index: number
  title: string
  items: string[]
}

/**
 * One entry of the services ledger: a brass serif numeral with a hairline to
 * its right, the title, and the items as short sans fragments. Rows are
 * hairline-separated, never boxed — see DESIGN.md › Layout.
 */
export function ServiceRow({ index, title, items }: ServiceRowProps) {
  return (
    <li className="grid grid-cols-[72px_1fr] gap-5 border-b border-border py-8">
      <span
        className="h-full border-r border-border pr-5 font-serif text-h2 leading-none text-brass lining-nums"
        aria-hidden="true"
      >
        {String(index).padStart(2, "0")}
      </span>
      <div>
        <h3 className="mb-3 font-serif text-h3 text-foreground">{title}</h3>
        <ul className="space-y-1.5">
          {items.map((item) => (
            <li key={item} className="flex items-start gap-2.5 text-ui text-muted-foreground">
              <span className="mt-[9px] h-1 w-1 shrink-0 bg-primary/60" aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </li>
  )
}
