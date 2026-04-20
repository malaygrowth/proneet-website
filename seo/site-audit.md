# Site Audit — proneetphysics.com

**Tool:** SEMRush Site Audit
**Crawl date:** 2026-04-20
**Pages crawled:** 10 / 100 limit
**User agent:** Mobile, JS rendering disabled

---

## Headline scores

| Metric | Value | Benchmark |
|---|---:|---|
| Site Health | **96%** | top-10% websites = 92% — **above benchmark ✅** |
| AI Search Health | **89%** | |
| Crawlability | 97% | |
| HTTPS | 100% | ✅ |
| Site Performance | 100% | ✅ |
| Internal Linking | 100% | ✅ |
| Markup (schema) | 100% | ✅ |
| International SEO | not implemented | — (not needed for IN-only site) |

## Crawled page mix

| Bucket | Count |
|---|---:|
| Healthy | 1 |
| Broken | 2 |
| Have issues | 6 |
| Redirects | 1 |
| Blocked | 0 |

## AI crawler accessibility

All major AI crawlers confirmed unblocked:
- ChatGPT-User ✓
- OAI-SearchBot ✓
- Googlebot ✓
- Google-Extended ✓

---

## Issues — complete list

### ❌ Error (1)

#### 1 page returned a 4XX status code
- **`https://proneetphysics.com/robots.txt` → 404**
- Fix: create `app/robots.ts` so Next.js serves a valid robots.txt.

### ⚠️ Warning (6)

#### 6 pages have low text-to-HTML ratio

| Page | Ratio |
|---|---:|
| /faculty | 0.07 |
| / (homepage) | 0.08 |
| /contact | 0.04 |
| /programs | 0.08 |
| /about | 0.08 |
| /results | 0.04 |

Typical healthy ratio is 0.15+. All six content pages are below. This is largely a side-effect of React + Tailwind — heavy class-attribute markup per unit of visible text. On its own this is a minor signal (not a ranking penalty). The real mitigation is already in the 90-day plan: publish pillar-length content (2,500+ words per piece), which pushes the ratio up naturally.

### 📋 Notices (2)

#### Llms.txt not found (AI Search category)
- File `/llms.txt` missing. This is a new-standard hint file for LLM crawlers (added to SEMRush's audit in 2025).
- Fix: create `public/llms.txt` with site summary + links to key pages.

#### Robots.txt not found
- Duplicate of the 4XX error above — same fix.

---

## What's NOT a problem

- **Core Web Vitals 0%** on the overview gauge was misread at first glance — this is actually the "score not yet measured" state (SEMRush hasn't received enough real-user data yet), not a 0/100 performance score. Site Performance = 100%.
- **International SEO "not implemented"** is correct behavior — we target India-English only; multi-locale hreflang is unnecessary.
- **Redirects (1 page)** is expected — likely the `http → https` or trailing-slash canonical redirect.

---

## Immediate fix list (priority order)

1. **Create `app/robots.ts`** — eliminates both the Error and one Notice in a single file.
2. **Create `public/llms.txt`** — AI-crawler hint file. Fixes the second Notice.
3. **Confirm `app/sitemap.ts`** exists and produces a valid `/sitemap.xml`. Build log earlier showed `/sitemap.xml` prerender, so this is already good — but robots.txt should reference it.
4. **Publish pillar content** per `content-calendar.md` — raises text/HTML ratio organically; irrelevant to flip in week one.

Everything above is under 60 minutes of work.

---

## What to re-audit after fixes

- Re-run the SEMRush crawl after robots.txt + llms.txt ship. Expected outcome:
  - Site Health: 96 → 98+
  - Errors: 1 → 0
  - Notices: 2 → 0
  - AI Search Health: 89 → 95+
- Re-run again after Pillar 1 is live — text/HTML ratio should drop off as a warning for /faculty, /about, /programs.
