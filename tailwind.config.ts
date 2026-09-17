import type { Config } from 'tailwindcss'
import tailwindcssAnimate from "tailwindcss-animate"

/**
 * Design tokens live in app/globals.css; DESIGN.md explains them. Two faces
 * only — Newsreader reads, Public Sans operates — and a radius of zero at
 * every step, so `rounded-*` utilities are safe to leave in shadcn primitives.
 */
const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    '*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          hover: 'hsl(var(--primary-hover))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        brass: 'hsl(var(--brass))',
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
      },
      // --radius is 0; max() keeps the derived steps from going negative.
      borderRadius: {
        lg: 'var(--radius)',
        md: 'max(0px, calc(var(--radius) - 2px))',
        sm: 'max(0px, calc(var(--radius) - 4px))',
      },
      fontFamily: {
        sans: ['var(--font-public-sans)'],
        serif: ['var(--font-newsreader)'],
      },
      // The DESIGN.md type scale. Serif steps carry their own tracking.
      fontSize: {
        display: ['4.5rem', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        h1: ['3.5rem', { lineHeight: '1.1', letterSpacing: '-0.015em' }],
        h2: ['2.5rem', { lineHeight: '1.15' }],
        h3: ['1.75rem', { lineHeight: '1.25' }],
        lead: ['1.375rem', { lineHeight: '1.5' }],
        body: ['1.125rem', { lineHeight: '1.6' }],
        ui: ['0.9375rem', { lineHeight: '1.5' }],
        small: ['0.8125rem', { lineHeight: '1.5' }],
        eyebrow: ['0.75rem', { lineHeight: '1', letterSpacing: '0.14em' }],
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0',
          },
          to: {
            height: 'var(--radix-accordion-content-height)',
          },
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)',
          },
          to: {
            height: '0',
          },
        },
        // The hero rose settling inside its bezel. Once, on first paint.
        'find-north': {
          from: { transform: 'rotate(-10deg)' },
          to: { transform: 'rotate(0deg)' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'find-north': 'find-north 900ms cubic-bezier(0.2, 0, 0, 1) both',
      },
    },
  },
  plugins: [tailwindcssAnimate],
}
export default config
