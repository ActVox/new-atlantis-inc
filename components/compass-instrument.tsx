import { CompassMark } from "@/components/compass-mark"
import { cn } from "@/lib/utils"

const CENTER = 300
const TICK_OUTER = 268
const RING_RADIUS = 272
/** logo.svg's cardinal tip is 196 of its 256 half-width; size the nested mark
 *  so the tip lands at r=232, just inside the ticks. */
const ROSE_SIZE = 512 * (232 / 196)
const ROSE_OFFSET = CENTER - ROSE_SIZE / 2

/** 72 ticks every 5°, longer at the eight points, longest at the cardinals. */
const ticks = Array.from({ length: 72 }, (_, i) => {
  const deg = i * 5
  const len = deg % 90 === 0 ? 22 : deg % 45 === 0 ? 16 : 8
  const t = ((deg - 90) * Math.PI) / 180
  const cos = Math.cos(t)
  const sin = Math.sin(t)
  return {
    deg,
    major: deg % 45 === 0,
    x1: CENTER + (TICK_OUTER - len) * cos,
    y1: CENTER + (TICK_OUTER - len) * sin,
    x2: CENTER + TICK_OUTER * cos,
    y2: CENTER + TICK_OUTER * sin,
  }
})

/**
 * The hero object: the brand rose presented as an instrument. The bezel
 * (ring, ticks, cardinal letters) is static and drawn in ink; only the rose
 * rotates, once, on first paint — "finding north". The rose keeps its own
 * colour via `text-primary` on the inner group.
 */
export function CompassInstrument({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 600 600"
      className={cn("h-auto w-full", className)}
      role="img"
      aria-label="Compass rose"
    >
      <g
        className="text-foreground"
        stroke="currentColor"
        strokeOpacity={0.35}
        strokeWidth={1.25}
      >
        {ticks.map((tick) => (
          <line
            key={tick.deg}
            x1={tick.x1.toFixed(2)}
            y1={tick.y1.toFixed(2)}
            x2={tick.x2.toFixed(2)}
            y2={tick.y2.toFixed(2)}
            strokeWidth={tick.major ? 1.75 : undefined}
            strokeOpacity={tick.major ? 0.5 : undefined}
          />
        ))}
        <circle
          cx={CENTER}
          cy={CENTER}
          r={RING_RADIUS}
          fill="none"
          strokeOpacity={0.28}
        />
      </g>
      <g
        className="fill-muted-foreground font-sans text-[17px] font-semibold tracking-[0.12em]"
        textAnchor="middle"
      >
        <text x={CENTER} y={20}>N</text>
        <text x={586} y={306}>E</text>
        <text x={CENTER} y={592}>S</text>
        <text x={14} y={306}>W</text>
      </g>
      {/* transform-box keeps the CSS rotation centred on the viewBox, not the
          rose's own bounding box. */}
      <g className="origin-center text-primary [transform-box:view-box] motion-safe:animate-find-north">
        <CompassMark
          x={ROSE_OFFSET.toFixed(2)}
          y={ROSE_OFFSET.toFixed(2)}
          width={ROSE_SIZE.toFixed(2)}
          height={ROSE_SIZE.toFixed(2)}
        />
      </g>
    </svg>
  )
}
