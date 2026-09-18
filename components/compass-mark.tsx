import { useId, type SVGProps } from "react"
import { cn } from "@/lib/utils"

interface CompassMarkProps extends Omit<SVGProps<SVGSVGElement>, "viewBox" | "fill" | "role"> {
  /** Accessible name. Omit when the brand name sits beside the mark as text. */
  title?: string
}

/**
 * The brand mark, inlined from public/logo.svg so it can be sized, coloured
 * with `text-*` and animated. Paths are the vector master's, verbatim; the
 * file itself stays the source for favicons, JSON-LD and tests.
 *
 * Every id is prefixed with useId() because the mark appears more than once
 * per page (header, hero, footer) and <use href> / mask="url(#…)" resolve
 * document-wide. Extra SVG props pass through so the mark can be nested inside
 * another <svg> with x/y/width/height (see CompassInstrument).
 */
export function CompassMark({ className, title, ...rest }: CompassMarkProps) {
  const id = useId()
  const cardinal = `${id}-cardinal`
  const diagonal = `${id}-diagonal`
  const cut = `${id}-cut`
  const mask = `${id}-mask`

  return (
    <svg
      viewBox="0 0 512 512"
      className={cn("shrink-0", className)}
      fill="currentColor"
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      {...rest}
    >
      {title ? <title>{title}</title> : null}
      <defs>
        {/* Each point is two halves with a hairline seam along its axis. */}
        <g id={cardinal}>
          <polygon points="1.75,-196 25,-36 1.75,0" />
          <polygon points="-1.75,-196 -25,-36 -1.75,0" />
        </g>
        <g id={diagonal}>
          <polygon points="1.5,-108 16,-22 1.5,0" />
          <polygon points="-1.5,-108 -16,-22 -1.5,0" />
        </g>
        {/* Slightly larger cardinal silhouette, knocked out of the ring and
            the diagonals so the cardinals read as sitting on top. */}
        <polygon id={cut} points="0,-200 28.5,-37 0,4 -28.5,-37" />
        <mask id={mask}>
          <rect width="512" height="512" fill="#fff" />
          <g transform="translate(256 256)" fill="#000">
            <use href={`#${cut}`} />
            <use href={`#${cut}`} transform="rotate(90)" />
            <use href={`#${cut}`} transform="rotate(180)" />
            <use href={`#${cut}`} transform="rotate(270)" />
          </g>
        </mask>
      </defs>
      <g mask={`url(#${mask})`}>
        <circle
          cx="256"
          cy="256"
          r="120.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="19"
        />
        <g transform="translate(256 256)">
          <use href={`#${diagonal}`} transform="rotate(45)" />
          <use href={`#${diagonal}`} transform="rotate(135)" />
          <use href={`#${diagonal}`} transform="rotate(225)" />
          <use href={`#${diagonal}`} transform="rotate(315)" />
        </g>
      </g>
      <g transform="translate(256 256)">
        <use href={`#${cardinal}`} />
        <use href={`#${cardinal}`} transform="rotate(90)" />
        <use href={`#${cardinal}`} transform="rotate(180)" />
        <use href={`#${cardinal}`} transform="rotate(270)" />
      </g>
    </svg>
  )
}
