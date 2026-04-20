# Gap Analysis — proneetphysics.com

**Date:** 2026-04-20
**Method:** Codebase inventory + live-site header inspection + competitor cross-check + keyword-universe mapping.

---

## Critical gaps (fix within 14 days)

### 1. No analytics — we're flying blind 🚨
- No GA4, no Plausible, no Mixpanel, nothing. Zero visibility into traffic, conversions, behavior.
- Every content investment is currently unmeasurable.
- **Fix:** install GA4 + Vercel Analytics. GA4 for search-traffic attribution; Vercel Analytics for Core Web Vitals real-user data (which SEMRush flagged as "not yet measured").
- **Effort:** 30 min.

### 2. No OG image → ugly social shares
- `og:image` meta tag missing site-wide. Every WhatsApp / Slack / Twitter / LinkedIn share renders as a plain text card with no visual.
- For a local coaching that relies on parent-to-parent referrals over WhatsApp, this matters a lot.
- **Fix:** add `public/og-default.png` (1200×630) + per-page OG image variants. Wire via `metadata.openGraph.images`.
- **Effort:** 1 hour (image design) + 15 min wiring.

### 3. No GBP embed on /contact
- `/contact` has text address but no Google Maps embed. Parents can't click to get directions. Local SEO also prefers embedded Maps on the contact page (relevance signal).
- **Fix:** add an `<iframe>` or `next/script` Maps embed using the GBP place ID. Also add a "Get Directions" deep link to Google Maps.
- **Effort:** 20 min once GBP address fix lands.

### 4. No Course schema per programme
- We have EducationalOrganization + LocalBusiness. Good. **Missing:** `Course` schema for each programme (NEET Classroom, JEE Classroom, Dropper Batch, 1-on-1 Online).
- Google renders Course rich results in SERPs (course title, duration, provider, price range).
- **Fix:** add Course JSON-LD blocks to `/programs` and each individual programme card if we split them out.
- **Effort:** 45 min.

### 5. No apple-touch-icon
- When a user adds the site to iOS home screen, the icon will be a default Safari favicon, not a branded mark.
- **Fix:** add `public/apple-touch-icon.png` (180×180). Next.js 16 auto-wires it.
- **Effort:** 10 min once a logo asset exists.

---

## High-impact gaps (fix within 30 days)

### 6. BreadcrumbList schema missing on every page
- Flagged in `technical-seo-checklist.md` as Priority 1 but not yet shipped.
- Google renders breadcrumbs in SERPs (better CTR) and uses them to understand site hierarchy.
- **Fix:** add BreadcrumbList JSON-LD to each non-home route.
- **Effort:** 30 min.

### 7. Person schema for Neeraj + Vivek not published
- They're named inside the Organization schema but don't have their own Person entities with `sameAs` links to LinkedIn / YouTube / authored pages.
- Strong E-E-A-T signal for Google Quality Raters.
- **Fix:** add Person JSON-LD on `/faculty` (one per teacher), include jobTitle, worksFor, alumniOf (their college), sameAs (LinkedIn), and image.
- **Effort:** 30 min.

### 8. No alumni individual pages
- `/results` has 6 alumni cards but no dedicated URL per story. Each alumni story could be:
  - `/alumni/kumkum-gupta` — 800-word case study with their journey
  - Captures long-tail "dr kumkum gupta kota" branded queries
  - Builds topical-authority cluster signal
- **Fix:** generate 6 alumni story pages as part of Phase 3 content work.
- **Effort:** ~2 hours per story × 6.

### 9. No location pages
- `content-calendar.md` schedules 4 location pages (Mansarovar, Malviya Nagar, Gopalpura Bypass, Vaisali Nagar) starting week 2. Not yet built.
- Each location page targets neighbourhood-specific "coaching near me" queries with effectively zero competition.
- **Fix:** create `/locations/[slug]` dynamic route with structured template. Mansarovar first.
- **Effort:** 3 hours for template + 45 min per location page.

### 10. No `/fees` page
- `neet coaching fees in jaipur` (30/mo) and `allen coaching jaipur neet fees` (10/mo) are commercial-intent keywords. No dedicated page answering fees questions.
- **Fix:** create `/fees` with fee bands per programme (NEET, JEE, Dropper, 1-on-1), what's included, EMI options, scholarship policy.
- **Effort:** 2 hours.

### 11. No blog / content hub path
- `content-calendar.md` ships 20+ long-form pieces over 13 weeks. Where do they live? Currently no `/blog` or `/guides` or `/articles` folder in app/.
- **Fix:** create `app/blog/[slug]/page.tsx` (MDX-based) with proper blog archive at `/blog`.
- **Effort:** 3-4 hours for routing + MDX setup + archive page.

### 12. No /privacy-policy or /terms pages
- Required for Indian consumer law compliance (Consumer Protection Act 2019 for online service listings), and for GA4 / Meta Pixel disclosure when those land.
- **Fix:** add minimal legal pages with privacy policy + terms + refund policy.
- **Effort:** 1 hour.

---

## Medium-impact gaps (fix within 60 days)

### 13. Contact form missing Schema.org ContactPoint
- `/contact` has email, phone, address but no structured `ContactPoint` entities inside the Organization schema with contactType (admissions, general).
- **Fix:** extend Organization JSON-LD with `contactPoint: [{ telephone, contactType, areaServed, availableLanguage }]`.
- **Effort:** 15 min.

### 14. No review schema (individual Review entities)
- We declare `aggregateRating` (5.0 × 20). Better: mirror actual Google reviews as `Review` entities inside LocalBusiness schema. Surfaces the quotes in rich results.
- **Fix:** pull 3-5 verified Google reviews, add them as Review entities. Update monthly.
- **Effort:** 30 min.

### 15. No Event schema for upcoming batches / demo classes
- `Event` schema could mark "Free demo class this Saturday" or "NEET 2028 batch starts May 5, 2026". Surfaces in Google's Events rich result.
- **Fix:** add Event JSON-LD when demo classes / batch-start dates are confirmed.
- **Effort:** 20 min per event.

### 16. No comparison pages (Allen / Aakash / Vibrant)
- Competitor-branded queries (`allen coaching fees jaipur`, `akash neet coaching jaipur`, `vibrant academy jaipur`) exist in the keyword universe. Our honest-voice handbook is perfect for these.
- **Fix:** per content calendar Phase 2, ship `/vs/allen-jaipur`, `/vs/aakash-jaipur` etc.
- **Effort:** 4 hours per comparison page.

### 17. No careers page
- A `/careers` page with "we're hiring a Senior Biology Teacher" signals to Google that the business is active + real. Also helps with topical authority (Biology coming later → we're planning for it).
- **Fix:** placeholder page now, actual openings when they exist.
- **Effort:** 1 hour.

### 18. No CSP / security headers beyond HSTS
- Only HSTS is set. Missing: Content-Security-Policy, X-Frame-Options, Referrer-Policy, Permissions-Policy.
- Not a ranking factor but a trust signal (Google's Quality Rater Guidelines reference "trustworthy URLs").
- **Fix:** add via `next.config.js` `headers()` function.
- **Effort:** 30 min.

### 19. No image sitemap
- Google can find images via the regular sitemap, but an explicit image sitemap (or image annotations in the main sitemap) increases image-search visibility. We have classroom photos, faculty portraits, alumni photos — Google Image search for "neeraj gupta physics" could surface them.
- **Fix:** extend `app/sitemap.ts` to emit `<image:image>` entries per URL.
- **Effort:** 45 min.

---

## Content universe gaps

Mapping the keyword research against what we've actually published:

| Keyword cluster | Volume (mo) | Have content? | Gap |
|---|---:|:-:|---|
| neet coaching jaipur (head) | 1,000 | no | Pillar 1 needed |
| best neet coaching in jaipur | 320 | no | Satellite article |
| jee coaching in jaipur | 320 | no | Pillar 2 needed |
| best jee coaching in jaipur | 260 | no | Satellite |
| iit jee coaching classes in jaipur | 170 | no | Satellite (lowest KD) |
| how to prepare for neet from class 11 without coaching | 210 | no | Pillar 3 |
| can i crack neet without coaching | 140 | no | Satellite → P3 |
| neet coaching fees in jaipur | 30 | no | Dedicated `/fees` page |
| neet coaching in hindi medium jaipur | latent | partial | Hindi-medium landing page |
| which city is best for neet coaching | 50 | no | Pillar 4 (Kota vs Sikar vs Jaipur) |
| aakash neet coaching jaipur | 0 recorded | no | Comparison page |
| allen coaching fees for neet jaipur | 0 recorded | no | Comparison page |
| vibrant acadamy jaipur neet coaching | 0 recorded | no | Comparison page |
| neighbourhood hyperlocal (Mansarovar, Vaisali Nagar, Raja Park, Jhotwara) | latent | no | Location pages per /content-calendar.md |

All content gaps are addressed by `content-calendar.md`. This section is just a reminder: we have a coherent keyword universe and a plan to cover it, but as of 2026-04-20 **zero pillar or satellite articles have been published yet**.

---

## Competitor quick-scan (what they have that we don't)

Probed Parmar, Convex, Foundation, Tomer. Only convexclasses.in and tomerclasses.com responded (parmar and foundation timed out).

Common patterns on competing Jaipur coaching sites:
- Gallery page with classroom + event photos
- Testimonials page distinct from results (written by students, not just alumni)
- Teacher-wise subject pages (one page per subject per teacher)
- Franchise / careers listings
- Events page (seminars, parent orientation)
- Blog / news section
- Admission enquiry form in sticky widget
- WhatsApp floating button (we already have this)
- Phone floating button (we already have this)
- Rank holders gallery / selection cards (each selection as a visible card with photo + rank + year)

**Our edge we shouldn't lose:** cleaner design, no AI slop, no unverifiable superlatives, faster load. Don't add clutter for the sake of parity — only close the gaps that have clear SEO or conversion ROI.

---

## Prioritisation — what to ship this week

Highest ROI, lowest effort, first. In order:

1. **Install GA4** (30 min) — lets us measure everything else.
2. **Add OG image** + Twitter card image (~1 hour) — improves every social share and demo-class invite WhatsApp.
3. **Add BreadcrumbList JSON-LD** (30 min) — SERP breadcrumbs render immediately.
4. **Add Person schema on /faculty** (30 min) — E-E-A-T signal.
5. **Add Course schema on /programs** (45 min) — Course rich results.
6. **Add Google Maps embed to /contact** (20 min after GBP address fix).
7. **Re-run SEMRush Site Audit** (free, just trigger it) — confirm the above fixes all land.

Total: ~3.5 hours of work → full technical-SEO hygiene caught up, ready to focus on content production.

**Deferred to Phase 2 (weeks 3-6 per content calendar):**
- Blog routing + MDX setup
- Pillar 1 + 2 content
- Location pages template
- /fees page
- Alumni individual pages

**Deferred to Phase 3:**
- /vs/ comparison pages
- Image sitemap
- Review entity schema

**Deferred indefinitely unless specific need:**
- Careers page
- Events page (reactive to when events exist)
- Gallery page (redundant with the Scenes section on homepage)
