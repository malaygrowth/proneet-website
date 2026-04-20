# ProNEET SEO Strategic Plan

**Prepared:** 2026-04-20
**Site:** proneetphysics.com (Next.js 16, Vercel)
**Author:** Compiled from SEMRush, GBP audit, Google SERP reconnaissance
**Content voice binding:** `CONTENT_WRITER_HANDBOOK.md`

---

## 1. Situation

We're running SEO against a **brand-new domain footprint** (Authority Score 2, organic keywords ≈ 1, organic traffic n/a) in a **local-commercial niche** (NEET/JEE/Physics coaching in Jaipur) that has roughly **3,500 monthly searches across target keywords** and is dominated by (a) national aggregator content sites (Collegedunia, SelfStudys, PW) and (b) a handful of local Jaipur mid-tier coaching brands.

The inherited 91 referring domains are real equity but scatter across directory listings, most of which carry an outdated / incorrect address. NAP consistency is currently a liability, not an asset.

The GBP is claimed, verified, and already has 5.0 × 20 reviews — a quietly strong local signal, but the profile is under-optimised (0 photos, 0 posts, incomplete attributes, wrong address).

## 2. The competitive landscape

Three tiers. Strategy differs per tier.

### Tier A — National brand giants (compete here on long-tail only)
Allen, Aakash, Resonance, Physics Wallah, Unacademy. They have domain authority 50+, dominate every generic head term, and cannot be out-ranked on volume. Strategy: capture comparison intent ("vs Allen", "vs Aakash", "Allen Jaipur fees") and topical pillars where they have thin local content.

### Tier B — Local Jaipur mid-tier (the real competition)
Parmar Coaching Institute, Convex Classes Jaipur, The Foundation Classes, Tomer Classes, Vibrant Academy, Vardhmaan, Gurukripa Career Institute, PCP, Physics By Ajay Soni. These are who Google surfaces in the "People also search for" panel next to ProNEET's GBP. Most have weak on-page SEO (thin category pages, no FAQ schema, no content depth). **This is where we can win fastest.**

### Tier C — National aggregators (extract backlinks from, don't try to beat)
Collegedunia, Shiksha, Careers360, SelfStudys, JustDial, Sulekha, TheHinduzone. Already listing ProNEET (mostly with wrong address). Strategy: NAP corrections + pushing for better rich content on those listings.

## 3. Target keyword universe (consolidated)

| Cluster | Total monthly volume (India) | Primary target | KD |
|---|---:|---|---:|
| NEET coaching Jaipur | 2,100 | neet coaching in jaipur (1,000) / best neet coaching in jaipur (320) | 21 / 10 |
| JEE coaching Jaipur | 1,400 | best jee coaching in jaipur (260) / iit jee coaching classes in jaipur (170) | 17 / 14 |
| Physics / other cluster | ~130 | mostly unrelated (NET, IIT JAM) — skip as primary |
| "Without coaching" informational | ~1,800 | how to prepare for neet from class 11 without coaching (210) / can i crack neet without coaching (140) | 17 / 10 |
| Comparison intent | ~50+ | aakash vs / allen vs / sikar vs jaipur | varies |

**Total realistic addressable market:** ~5,400 monthly searches (India), easily achievable 500–1,000 monthly organic visitors within 90 days given KD profile of 10–25.

## 4. Strategy

### 4.1 Guiding principles

1. **Lead with the honest-voice handbook.** Our content will read differently from every other Jaipur coaching site. That differentiation is the moat, not keyword density.
2. **Prioritise KD ≤ 20 targets first.** We are a new domain. Every piece should pick off achievable SERPs, build topical authority, then chase the KD 20–35 head terms.
3. **Pillar-cluster topology.** One pillar per major intent bucket, 5–8 satellite articles per pillar, dense internal linking.
4. **Local-first, Jaipur-neighbourhood sub-pages.** Mansarovar, Malviya Nagar, Gopalpura Bypass, Vaisali Nagar, Jagatpura catchment. Each as a location landing page.
5. **GBP is the highest-ROI channel in the first 60 days.** Fix address, 12 photos, 2 posts/week, 10 Q&A, 10 attributes. Local pack ranking compounds faster than organic for a new domain.
6. **Use AI-citation patterns.** Every page: definition-first paragraph, 70% question-format H2s, FAQ with 5+ Q&A, Key Takeaways box, byline, last-updated, FAQPage schema.

### 4.2 Ninety-day phased execution

| Phase | Weeks | Goal | Output |
|---|---|---|---|
| Foundation | 1–2 | Fix what's broken | GSC verified, GBP address fixed, JSON-LD reviews/address aligned, sitemap submitted, robots.txt validated, NAP corrections filed on 6 top directories |
| Local dominance | 3–6 | Own Jaipur local pack | GBP 12 photos + 8 posts + 20 Q&A, 3 neighbourhood landing pages, first 2 pillar articles live |
| Content engine | 7–10 | Build topical authority | 4 more pillar articles, 12 satellites, comparison pages (Allen/Aakash) |
| Compound | 11–13 | Scale what works | 8 more satellites, outreach for 10 new contextual backlinks, refresh + expand earliest pages |

### 4.3 On-page SEO architecture

Every new content page ships with:

1. **Unique title tag** (< 60 chars) containing primary query + "Jaipur" or specific modifier
2. **Meta description** (< 155 chars) with primary query + one specific number or differentiator
3. **H1** — one per page, matches title or close variant
4. **Byline + last-updated** (already implemented via `<PageByline>`)
5. **Key Takeaways box** (already implemented via `<KeyTakeaways>`) — 5–6 bullets, 3+ with specific numbers
6. **Definition-first opening paragraph** (3-sentence pattern from handbook §4.7)
7. **Question-format H2s** — target 70% question structure
8. **FAQPage schema** for any page with 5+ Q&As (already implemented via `<PageFaq>`)
9. **Internal links** — 5+ for pillars, 3+ for satellites, anchor text matches target keyword
10. **Schema stack** — Article + FAQPage + BreadcrumbList + LocalBusiness (on local pages)

## 5. Immediate fixes already shipped

- Address corrected across website and JSON-LD (was Gopalpura Bypass, now 84/255 Madhyam Marg, Mansarovar Sector 8)
- Rating/review count aligned to GBP truth (5.0 × 20, was 4.9 × 200)
- Organization + LocalBusiness schema enriched with full street address, postal code, sameAs social links, areaServed, priceRange
- Em-dash sweep, banned-word sweep, bylines, Key Takeaways, FAQ sections shipped across 4 key pages

## 6. Blocked / pending

- **GSC verification** — needs DNS TXT added to proneetphysics.com (token in handoff notes). Blocks: Bing Webmaster, sitemap submission, indexing requests.
- **SEMRush subscription** — expires 2026-04-21. All core research captured before expiry.

## 7. Success metrics (90-day)

| Metric | Baseline (2026-04-20) | 30-day | 60-day | 90-day |
|---|---:|---:|---:|---:|
| Organic keywords indexed | 1 | 20 | 60 | 150+ |
| Organic traffic (monthly est.) | 0 | 50 | 250 | 800–1,200 |
| Authority Score | 2 | 5 | 8 | 12+ |
| GBP rankings in top-3 local pack | unknown | "neet coaching mansarovar" | + "neet coaching jaipur" | + "jee coaching jaipur" |
| GBP reviews | 20 | 25 | 35 | 50 |
| GBP photos | 0 | 12 | 25 | 40 |
| Backlinks (new contextual) | 0 | 5 | 15 | 30 |
| Pages ranking in top-10 | 0 | 3 | 10 | 25 |

## 8. Risks

- **Authority Score 2 means slow ramp.** Organic wins take 60–90 days; don't expect traffic in month one.
- **Wrong address on 6+ directory listings** causing active ranking harm until fixed.
- **Superlative "#1 Classes in Jaipur" in GBP description** is a policy-flag risk — must rewrite.
- **NEET PG (postgrad) queries in our keyword cluster** — ensure targeting doesn't blur Class 11/12 audience with MBBS graduates.
- **Subject scope changes** (Chemistry added, Biology/Maths dropped) — content must reflect current offering exactly or we waste pages.

## 9. What NOT to do

- Don't chase the big "which coaching is best for neet" (1.3K, KD 44) — we can't win that SERP this year.
- Don't try to out-rank Collegedunia or Careers360 for aggregator-style listicles.
- Don't publish generic "NEET preparation tips" — a million sites do it; thin differentiation.
- Don't buy backlinks or use PBNs — brittle, Google has penalised the local coaching niche in Tier-2 cities before.
- Don't run paid ads in month one — organic + GBP first, measure baseline, then decide.

## 10. Companion docs

- `seo/domain-baseline.md` — raw SEMRush starting state
- `seo/keywords-neet-jaipur.md` — NEET cluster (38 kws)
- `seo/keywords-jee-jaipur.md` — JEE cluster (51 kws)
- `seo/keywords-questions.md` — question-intent cluster
- `seo/content-calendar.md` — 90-day production schedule (next)
- `seo/gbp-optimization.md` — GBP action list (next)
- `seo/nap-consistency-directories.md` — NAP correction targets (next)
