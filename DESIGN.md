# Design System — New Atlantis Inc

Read this before any visual or UI decision. It is the source of truth for fonts, colour,
spacing, layout, motion and imagery. Do not deviate without explicit approval.

## Product Context

- **What this is:** Marketing site for New Atlantis, Inc., a small US business consultancy —
  business plan evaluation, vitality & sustainability strategy, risk evaluation & mitigation,
  business & marketing strategy.
- **Who it's for:** Founders of startups and owners of established small businesses;
  Illinois / Puerto Rico roots, serving nationwide. The site's job is credibility → a contact
  inquiry.
- **Space/industry:** Boutique advisory. Peers set the tone: Rothschild & Co, Oliver Wyman,
  Brunswick Group (heritage + rigor); McKinsey / Bain (rigor). All of them are navy or
  ink-blue. Teal is unclaimed in this category.
- **Project type:** Marketing site, 4 pages (Home, About, Contact, Resources). No app surface.
- **The one thing to remember:** *Old-world craft, modern rigor.* Every decision below serves
  it. A system that tries to be memorable for everything is memorable for nothing.

## Aesthetic Direction

- **Direction:** Editorial / Refined — "the chart-room." Typographic, instrument-precise, warm.
- **Decoration level:** Minimal. Exactly one object — the compass mark. Hairline rules only.
  No textures, no parchment JPGs, no AI-generated imagery, no icon tiles.
- **Mood:** A steady navigator's desk: bone paper, one deep-teal instrument, a brass rule.
  Serious, unhurried, precise.
- **Reference sites:** oliverwyman.com (bone ground, very large serif), rothschildandco.com
  (mark between hairlines, tracked nav), brunswickgroup.com (two-colour discipline).
- **Why no photograph:** the firm publishes no address and no team, so a photo hero forces
  stock or AI imagery — which contradicts "craft." The compass rose is the asset. Lead with it.
- **Approved direction:** mockup variant B (`~/.gstack/projects/ActVox-new-atlantis-inc/designs/
  design-system-20260917/`) — the compass presented as an *instrument* (bezel ring, degree
  ticks, N/E/S/W), a 2×2 numbered ledger with brass serif numerals, and a left/right CTA band.

## The Mark

- `public/logo.svg` is the vector master: an 8-point faceted rose with a ring, single fill
  `#0d5955`. It is never recoloured, never given a background on the page, never rounded.
- In code it is rendered inline via `components/compass-mark.tsx` (paths verbatim, ids
  prefixed with `useId()`, `currentColor` fill) so it can be sized, coloured with
  `text-primary`, and animated.
- **Hero instrument** (`components/compass-instrument.tsx`): the rose sits inside a static
  bezel — a 1.25px ring at 28% ink, 72 ticks every 5° (longer at 45°, longest at the
  cardinals), and N / E / S / W in Public Sans 600 tracked. The rose rotates; the bezel does
  not. Tick/ring strokes are ink, never brass.
- Header and footer show the bare rose at 32 / 26px beside the wordmark in Newsreader.
- Favicon tile ground `#EFE0C3` (`public/icon.svg`) is intentionally warmer than the page so
  the tile reads on dark tab strips. Leave it.

## Typography

Rule: **serif reads, sans operates.** Prose → Newsreader. Interface → Public Sans.

- **Display / headings / prose:** Newsreader (Google, variable; `opsz` 6–72, `wght` 200–800,
  italic). Times/Caslon lineage engineered for screens in 2020 — old-world bones, modern
  engineering. Weight 400 for everything; italic for a single emphasised word at most.
  Replaces Playfair Display (over-used; its Didone contrast reads "boutique hotel").
- **Body (prose):** Newsreader 400, 18px / 1.6, measure 60–70ch. Paragraphs of two or more
  sentences are prose.
- **UI / labels:** Public Sans (Google, variable, `wght` 100–900). The U.S. Web Design System
  face — civic clarity, compliance. Nav, buttons, forms, eyebrows, captions, short list
  fragments. Eyebrows: 12px uppercase +0.14em ink-muted. Replaces Source Sans 3.
- **Numerals:** `font-variant-numeric: tabular-nums slashed-zero` on `body`. Ledger numerals
  `01`–`04` are Newsreader 40px lining figures in brass.
- **Code:** none. (JetBrains Mono if ever needed.)
- **Loading:** `next/font/google` in `app/layout.tsx` —
  `Newsreader({ subsets: ['latin'], style: ['normal','italic'], axes: ['opsz'],
  variable: '--font-newsreader' })` (`axes` is required or Google pins opsz at 16; never pass a
  fixed `weight` with `axes`) and `Public_Sans({ subsets: ['latin'], variable:
  '--font-public-sans' })`. The OG image uses committed static TTF instances in `assets/fonts/`
  because satori ignores variable axes.
- **Scale** (Tailwind `fontSize` names in `tailwind.config.ts`):

  | Name | Size / line / tracking | Face | Use |
  |---|---|---|---|
  | `display` | 72 / 1.05 / −0.02em | Newsreader | short page headlines (About, Contact) |
  | `h1` | 56 / 1.1 / −0.015em | Newsreader | page H1s |
  | `h2` | 40 / 1.15 | Newsreader | section headings, ledger numerals |
  | `h3` | 28 / 1.25 | Newsreader | ledger titles, pillar labels |
  | `lead` | 22 / 1.5 | Newsreader | hero lead, pull quotes |
  | `body` | 18 / 1.6 | Newsreader | prose |
  | `ui` | 15 / 1.5 | Public Sans | list fragments, form text, footer nav |
  | `small` | 13 / 1.5 | Public Sans | captions, copyright |
  | `eyebrow` | 12 / 1 / +0.14em uppercase | Public Sans | eyebrows, nav, button labels |

  The home H1 is 12 words, kept verbatim for SEO (commit `3522e7e`); it renders at
  44 / 56 / 64 across breakpoints, not at `display`.

## Color

- **Approach:** Restrained. One brand colour, one capped accent, warm teal-shadowed neutrals.
- **Primary — compass teal `#0D5955`** (`hsl(177 75% 20%)`). Sampled from the mark. Buttons,
  links, active states, success. Hover / pressed `#0A4643` (`177 75% 16%`). 8% tint for rare
  surfaces (`bg-primary/[0.08]`). *This is the single source of truth for "teal": CSS,
  manifest, OG image and icons all use it.*
- **Accent — brass `#A8823F`** (`hsl(38 45% 45%)`). **≤ 5% of any surface.** Allowed: the 24px
  rule after an eyebrow, ledger numerals, the active-nav tick, the OG image rule. **Never body
  text, never a button fill, never a border around a block.** It is the bezel, not the face.
- **Neutrals:** bone `#F6F3EE` (page, `39 32% 95%`) → bone-deep `#EFEAE1` (cards, bands,
  `39 31% 91%`) → hairline `#D6D5D1` (borders, inputs; = ink @ 14% on bone, `50 6% 83%`) →
  ink-muted `#5C6663` (secondary text, `162 5% 38%`) → ink `#14201F` (text, `175 23% 10%`).
- **Semantic:** success = primary; warning = brass; error `#A33A2E` (`6 56% 41%`);
  info = ink-muted on bone-deep.
- **Contrast:** teal / bone 7.5:1 · ink / bone ≈ 15:1 · bone on teal 7.5:1 · brass / bone
  3.2:1 (large decorative numerals only).
- **Dark mode:** none, by decision. A 4-page consultancy site does not need it. Do not add
  `.dark` tokens or `dark:` utilities.

## Spacing

- **Base unit:** 8px. **Density:** comfortable → spacious.
- **Scale:** 4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96 · 128.
- **Rhythm:** sections `py-16 md:py-24`; hero `py-16 md:py-24 lg:py-28`; ledger rows `py-8`;
  CTA band `py-16`; form fields 24 apart; header 72px tall.

## Layout

- **Approach:** Grid-disciplined with one editorial asymmetry — the hero.
- **Grid:** 12 columns from `md`; single column below. Hero: copy `col-span-7`, instrument
  `col-span-5` right-aligned (max 460px). On mobile the instrument sits above the headline at
  ~220px.
- **Max content width:** 1152px (`max-w-6xl`), 24px gutters. Prose measure ≤ 70ch.
- **Border radius:** **0** at every level (`--radius: 0`; Tailwind `rounded-*` all resolve to
  0). The only circles on the site are the compass ring and bezel.
- **Surfaces:** bands and the contact form sit on bone-deep. Services, About pillars and
  Resource groups are **hairline-topped columns, never boxed cards**, never with hover shadows.
- **Services ledger:** `<ol>` 2×2 from `md`; each row `grid-cols-[72px_1fr]`, numeral in brass
  with a hairline to its right, title in `h3`, items as a Public Sans list with 4px teal
  square bullets. Top rule on the list, bottom rule on each row.
- **Eyebrow pattern:** Public Sans `eyebrow` ink-muted, followed by a 24px × 1px brass rule.
- **Buttons:** Public Sans 13px 600 uppercase +0.12em, `px-6 py-3.5`, square. Primary = teal
  fill / bone text; secondary = hairline border / ink text, hover bone-deep; ghost = teal
  text, no border. Focus: 2px teal outline, 3px offset.
- **Header:** sticky, bone at 85% + blur, hairline bottom. Nav = eyebrow style; active item is
  ink with a 2px brass bottom tick.

## Motion

- **Approach:** Minimal-functional, plus one signature.
- **Signature — "finds north":** the hero rose rotates `-10deg → 0` over 900ms
  `cubic-bezier(0.2, 0, 0, 1)`, once, on first paint, inside the static bezel (Tailwind
  `motion-safe:animate-find-north`). The header rose rotates 15° on hover, 200ms.
- **Everything else:** 200ms colour / opacity / border transitions. No scroll-triggered
  entrances, no parallax, no hover lifts or shadows.
- **Easing:** enter `cubic-bezier(0.2,0,0,1)`; exit `ease-in`; colour `ease`.
- **Duration:** micro 100ms · short 200ms · signature 900ms.
- **Reduced motion:** a global `prefers-reduced-motion: reduce` rule disables all animation and
  transitions.

## Imagery

- No AI-generated imagery, ever. Retired: `public/images/hero-map.jpg`, `about-atlantis.jpg`
  (both carried fake lettering).
- If a real artifact is wanted later: public-domain 18th-century nautical charts (Library of
  Congress, David Rumsey Map Collection). Genuinely old, not simulated. Use as a full-bleed
  band with an ink overlay, never behind body text.
- Icons: lucide only for functional affordances (menu, close, external link, form state).
  Never as decoration, never in tinted square tiles.

## Anti-patterns (reject in review)

Photo / stock / AI heroes · icon tiles in tinted squares · boxed 2×2 card grids · hover
shadows · any radius > 0 · brass as text or button · a second teal · gradients ·
centered-everything · scroll fade-ins · Playfair, Inter, or `system-ui` anywhere · a `.dark`
block.

## Decisions Log

| Date | Decision | Rationale |
|------|----------|-----------|
| 2026-09-17 | Initial design system | `/design-consultation`: product context + competitive research (Rothschild & Co, Oliver Wyman, Brunswick, L.E.K., Evercore). Memorable thing: "old-world craft, modern rigor." |
| 2026-09-17 | `#0D5955` is the single brand teal | Logo, CSS (`#265459`) and manifest (`#26545a`) had drifted to three teals; the mark is the source. |
| 2026-09-17 | Typographic hero, no photograph | Firm has no public office / team; the photo convention forced AI imagery with fake lettering. |
| 2026-09-17 | Newsreader + Public Sans replace Playfair + Source Sans 3 | Playfair is over-used and reads "boutique hotel"; Newsreader = engineered heritage; Public Sans = civic rigor. |
| 2026-09-17 | Radius 0, brass capped at 5%, no dark mode | Coherence with the faceted mark; guardrails against "luxury hotel" drift and scope creep. |
| 2026-09-17 | Approved mockup direction B: instrument bezel + 2×2 brass-numeral ledger | User choice from a 3-variant board. `design extract` read the mockup as teal `#004737` / brass `#D89E42`; the proposal values stand because the primary is sampled from the logo, and the brighter brass fails the ≤5% / never-text rule. |
