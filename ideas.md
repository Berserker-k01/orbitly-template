# Orbitly — Design Brainstorm

## Context
SaaS landing page template. Placeholder brand: Orbitly (project management / workflow automation SaaS).
Part of Open Antimatter by Antimatter AI. Must look like a premium, agency-built product site.

---

<response>
<text>

## Approach A: "Obsidian Editorial" — Dark Brutalist Precision

**Design Movement:** Dark Brutalism meets Swiss Editorial Grid

**Core Principles:**
1. Stark contrast — near-black (#080808) background with electric violet (#7B5CF5) as the single accent
2. Typographic hierarchy as the primary visual element — size differentials of 10:1 between display and body
3. Structural asymmetry — content blocks break the grid intentionally, with oversized numbers and labels as anchors
4. Negative space as a design decision, not a gap-filler

**Color Philosophy:**
- Background: `#080808` — deeper than pure black, avoids harshness
- Accent: `#7B5CF5` — electric violet, high-energy but not neon
- Surface: `#111111` cards with `1px` `#222` borders
- Text: `#F0F0F0` primary, `#666` muted
- Emotional intent: authority, precision, confidence

**Layout Paradigm:**
- Full-bleed sections with hard left-aligned text columns
- Oversized section numbers (01, 02, 03) in muted text as structural scaffolding
- Feature section uses a 2-col asymmetric split (60/40) not a centered grid
- Pricing uses a horizontal comparison row, not stacked cards

**Signature Elements:**
1. A single horizontal rule `1px solid #222` separating every major section
2. Large display numerals (6xl+) used decoratively behind content
3. Monospace font for labels and tags (JetBrains Mono)

**Interaction Philosophy:**
- Hover states: border color shifts from `#222` to `#7B5CF5`
- Buttons: no rounded corners — sharp `2px` border, fill on hover
- Cursor: custom crosshair cursor

**Animation:**
- Entrance: text lines slide up from `translateY(40px)` with stagger 80ms
- No parallax — motion is purposeful, not decorative
- Scroll-triggered counter animations for stats

**Typography System:**
- Display: Syne (ultra-wide tracking, geometric)
- Body: DM Sans (neutral, readable)
- Labels: JetBrains Mono (technical credibility)

</text>
<probability>0.07</probability>
</response>

---

<response>
<text>

## Approach B: "Orbital Dark" — Spatial Premium SaaS

**Design Movement:** Space-age Minimalism meets High-End SaaS (Linear, Vercel, Resend aesthetic)

**Core Principles:**
1. Deep space atmosphere — layered dark backgrounds with subtle radial glows
2. Glassmorphic surfaces — frosted cards that float above the dark canvas
3. Motion as brand — every section entrance is choreographed, not random
4. Precision typography — tight tracking on large headings, generous line-height on body

**Color Philosophy:**
- Background: `#030305` — near-black with a cool blue undertone
- Primary glow: `#6366F1` (indigo) — used for ambient lighting and CTAs
- Secondary: `#8B5CF6` (violet) — gradient partner
- Surface: `rgba(255,255,255,0.04)` glassmorphic cards
- Text: `#FAFAFA` primary, `rgba(255,255,255,0.5)` muted
- Emotional intent: premium, trustworthy, technically sophisticated

**Layout Paradigm:**
- Centered hero with a contained "app frame" mockup (rounded border, inner glow)
- Bento grid for features — asymmetric cell sizes (2-col, 1-col, 3-col mix)
- Horizontal scrolling logo marquee for social proof
- Sticky "how it works" with left-anchored step numbers

**Signature Elements:**
1. A glowing orb/gradient blob behind the hero — `radial-gradient` with `blur(120px)`
2. App mockup in a device frame with a subtle inner border glow
3. Gradient text on key headline words

**Interaction Philosophy:**
- Cards lift on hover with `box-shadow` expanding
- CTA button has a shimmer sweep animation on hover
- Smooth scroll with Lenis

**Animation:**
- Hero: staggered word-by-word reveal (Framer Motion `variants`)
- Features: cards fade-up as they enter viewport
- Stats: count-up animation on scroll

**Typography System:**
- Display: Outfit (geometric, modern, slightly rounded)
- Body: Inter (clean, readable — used intentionally here for SaaS credibility)
- Mono: Fira Code for code snippets

</text>
<probability>0.09</probability>
</response>

---

<response>
<text>

## Approach C: "Chromatic Signal" — Neon-Accented Dark with Grain

**Design Movement:** Y2K Revival meets Modern Dark SaaS

**Core Principles:**
1. Grain texture overlay on all surfaces — adds tactility and prevents "flat screen" feel
2. Two-tone gradient accent system — electric green `#22D3EE` + warm amber `#F59E0B` as dual signals
3. Oversized, condensed display typography — tall, narrow letterforms that command vertical space
4. Brutalist card borders — thick `2px` borders with color fills on hover

**Color Philosophy:**
- Background: `#0A0A0A` with `4%` noise grain overlay
- Primary: `#22D3EE` (cyan) — electric, technical
- Secondary: `#F59E0B` (amber) — warmth, contrast
- Surface: `#141414` with `2px solid #1F1F1F` borders
- Emotional intent: energetic, distinctive, memorable

**Layout Paradigm:**
- Off-center hero — headline occupies left 55%, right side has a floating UI mockup
- Feature section uses a masonry-style card grid, not a uniform grid
- Testimonials in a horizontal drag-scroll carousel
- Pricing: single highlighted card with flanking ghost cards

**Signature Elements:**
1. Grain/noise texture CSS overlay on all backgrounds
2. Gradient border cards using `border-image` or `::before` pseudo-element
3. Animated gradient text on the hero headline

**Interaction Philosophy:**
- Drag-to-scroll testimonials carousel
- Magnetic button effect on primary CTA
- Gradient border intensifies on card hover

**Animation:**
- Hero headline: character-by-character scramble reveal
- Background: slow-moving gradient mesh animation
- Cards: 3D tilt effect on mouse move

**Typography System:**
- Display: Barlow Condensed (tall, narrow, impactful)
- Body: Nunito Sans (friendly, approachable)
- Accent: Space Mono (technical labels)

</text>
<probability>0.06</probability>
</response>

---

## Selected Approach: **B — "Orbital Dark"**

Chosen because it aligns most closely with the premium SaaS aesthetic (Linear, Vercel, Resend), 
uses ReactBits Pro components naturally (bento grid, glassmorphic cards, marquee), 
and will photograph well for the Open Antimatter showcase site.
The indigo/violet palette also harmonizes with the Antimatter AI brand system without copying it.
