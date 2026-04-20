# ProNEET Infographic Design System

**Status:** binding. Every visual inside a blog post, location page, or
pillar article must conform. Violations fail the content review.

---

## Guiding principles

1. **Design > decoration.** An infographic exists only when it tells the
   reader something the paragraph cannot tell them faster.
2. **SVG/CSS-first.** 95% of visuals must be code-rendered. They are
   free, instantly editable, crisp at any zoom, and carry no AI-image
   artefact risk.
3. **AI-photo is the exception.** Only for scenes where a real photo is
   narratively load-bearing and `public/photos/` has no usable frame.
   Every AI-photo call is an explicit author decision, never the default.
4. **Consistency over cleverness.** The reader should recognise a ProNEET
   visual inside two seconds. Do not invent a new card style per post.
5. **Glassmorphism is the surface.** Every card is a frosted glass panel
   on a soft gradient ground. No solid flat cards. No drop-shadow boxes.

---

## Palette (locked)

Use only these tokens. Defined globally in `tailwind.config.ts` as
`brand`, `brand-light`, `accent-orange`, `hero-bg`, `hero-deep`, etc.

| Token | Hex | Use |
|---|---|---|
| Navy | `#0F172A` | dark backgrounds only |
| Brand blue | `#2563EB` | primary accent, headings, brand highlights |
| Brand-light | `#60A5FA` | secondary accent, gradients |
| Accent orange | `#F97316` | eyebrow labels, contrast emphasis |
| Slate-900 | `#0F172A` | primary body text |
| Slate-600 | `#475569` | secondary text |
| Slate-400 | `#94A3B8` | muted labels, metadata |
| Slate-200 | `#E2E8F0` | borders, dividers |
| White | `#FFFFFF` | glass surface base |
| Bone | `#F7F5F0` | warm background washes |

**Never** introduce another colour. No reds, greens, purples. No data-viz
rainbow schemes. Multi-value charts alternate between blue and orange
only.

## Typography (locked)

- Display / numbers: `font-mono` (JetBrains) or `font-extrabold` Inter
- Headings: `font-bold text-slate-900` Inter
- Body: `text-slate-600` or `text-slate-700` Inter, 14-17px
- Labels / eyebrows: `font-mono text-xs uppercase tracking-widest text-accent-orange`

No other font families. No italics except for pull-quotes. No hand-drawn
fonts, ever.

## The glassmorphism recipe

Every infographic panel is built on this stack:

```
bg-white/60
backdrop-blur-xl
border border-white/60
ring-1 ring-slate-200/60
shadow-[0_8px_32px_rgba(15,23,42,0.06)]
rounded-2xl
```

Sitting on a soft gradient ground:

```
bg-gradient-to-br from-brand/[0.03] via-white to-accent-orange/[0.03]
```

Numbers are always in `font-mono`, coloured `text-brand` at the largest
size tier. Secondary numbers sit below in `text-slate-400`.

## Component inventory (lock to these 6)

New post visuals must reuse one of these six. If a new shape is needed,
propose it as an addition to the system, do not invent it inline.

1. **`<InfographicStats>`** — 2–4 stat cards in a row. One big number per
   card, label below, optional source footnote.
2. **`<InfographicCompare>`** — Two side-by-side glass panels for
   contrast (X vs Y). Each panel has a title, an icon slot, a big stat,
   and 3 supporting bullets.
3. **`<InfographicSteps>`** — Numbered steps arranged vertically or in a
   2×n grid. Each step is a glass card with a mono-numbered badge.
4. **`<InfographicTable>`** — Data table styled as glass. First column
   label-weight, numeric columns right-aligned mono, highlighted row for
   "our tier" if applicable.
5. **`<InfographicQuote>`** — Pull-quote card. Large serif text, author
   attribution in mono, optional small portrait from `public/photos/`.
6. **`<InfographicBars>`** — Horizontal bar chart for 2–5 values.
   Blue/orange alternating, mono numbers aligned at right edge.

## Photo discipline (strict)

Before using or generating any photo:

1. **Does the narrative require a real photograph?** If a diagram, table,
   or styled component would tell the reader the same thing faster, use
   that instead. 80% of the time a chart beats a photo.
2. **Is it already in `public/photos/`?** If yes, use it. We have real
   classroom, student, and faculty shots. Prefer them.
3. **If AI-generated is the only option:** the prompt must specify exact
   subject, exact framing, exact emotion. No generic "coaching class in
   Jaipur" prompts. See `/scripts/enhance/image-gen.ts` for the prompt
   contract (which we will tighten now).

**Default to "no image" over "wrong image".** A section with no visual
is better than one with a generic stock-feeling shot.

## Banned

- Rainbow data-viz palettes
- Drop-shadow without backdrop-blur (looks like 2015 Material Design)
- Pie charts (always ambiguous, always bad)
- 3D extrusions
- Cartoon illustrations, mascots, emoji as visual elements
- Stock-photo handshakes, office scenes, generic "teacher at whiteboard"
- Any AI-generated photo depicting students whose faces are visible
- Photos of real competing coaching brand signage
- Text rendered by AI inside an image (always garbled)

## Review gate

Before a new blog post ships, the author must answer:

- Does every visual use a component from the 6-component inventory?
- Are all glass panels using the locked recipe?
- Are all numbers mono? All headings `font-bold`?
- Is any colour outside the locked palette?
- If there is any photograph: was it necessary, was it from
  `public/photos/` or (rare) was the AI prompt specific to scene?

Any "no" fails the review.
