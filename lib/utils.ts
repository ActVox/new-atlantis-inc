import { clsx, type ClassValue } from 'clsx'
import { extendTailwindMerge } from 'tailwind-merge'

/**
 * tailwind-merge only knows Tailwind's stock scales. Without this it reads
 * the DESIGN.md type steps (`text-eyebrow`, `text-h2`, …) as colours and
 * drops them whenever a `text-<colour>` class follows in the same cn() call.
 */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      'font-size': [
        { text: ['display', 'h1', 'h2', 'h3', 'lead', 'body', 'ui', 'small', 'eyebrow'] },
      ],
    },
  },
})

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
