# New Atlantis Inc — site

## Design System

Always read DESIGN.md before making any visual or UI decisions.
All font choices, colors, spacing, and aesthetic direction are defined there.
Do not deviate without explicit user approval.
In QA mode, flag any code that doesn't match DESIGN.md.

Key rules that are easy to break:

- `#0D5955` is the only teal. It comes from `public/logo.svg`; CSS, manifest and OG use it.
- Serif (Newsreader) reads, sans (Public Sans) operates. No other fonts.
- Brass `#A8823F` is ≤5% of any surface — rules, ledger numerals, the active-nav tick. Never
  text, never a button.
- Border radius is 0 everywhere. No dark mode. No AI-generated or stock imagery.

## Commands

`pnpm dev` · `pnpm lint` · `pnpm typecheck` · `pnpm test` · `pnpm build`
