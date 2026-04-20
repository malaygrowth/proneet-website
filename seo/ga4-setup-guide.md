# GA4 Setup Guide (10-minute walkthrough)

**Property:** Pro NEET Physics · GA4
**Measurement ID:** `G-D42ZXKH9RZ`
**Status:** tracking code is live on the site. The events listed below will start flowing automatically as soon as this deployment finishes. This guide is for configuring GA4 itself so the events are useful.

---

## Step 1 — Register the 5 custom dimensions (5 min)

GA4 Admin → **Data display** → **Custom definitions** → **Create custom dimensions**.

For each of these, create an event-scoped dimension:

| Dimension name | Scope | Event parameter |
|---|---|---|
| Page Category | Event | `page_category` |
| CTA Location | Event | `cta_location` |
| Form ID | Event | `form_id` |
| Page Slug | Event | `page_slug` |
| Scroll Percentage | Event | `scroll_pct` |

*Description field for each: free text, something like "Which content tier the user was on when the event fired" for Page Category.*

After saving, it takes **24-48 hours** for data to populate in reports. Realtime reports show the raw events immediately.

---

## Step 2 — Mark Key Events (conversions) (2 min)

GA4 Admin → **Events** → find the event name in the list → toggle "Mark as key event".

Mark these as key events:

| Event name | Why |
|---|---|
| `phone_call_click` | Primary goal — highest-intent conversion |
| `whatsapp_click` | Primary goal — parents use WhatsApp over forms |
| `form_submit` | Hard conversion |
| `book_demo_click` | Secondary goal |
| `blog_pillar_engagement` | Top-of-funnel quality signal |

The events won't appear in this list until they've fired at least once on production. So either:
- Wait a day after deploy, then do this step, OR
- Click through your own site first (tap phone, WhatsApp, form) to trigger them, then mark them

---

## Step 3 — Build the 4 audiences (3 min)

GA4 Admin → **Audiences** → **New audience** → **Create a custom audience**.

### Audience 1: High-intent parents
- Condition: `Events` → `phone_call_click` OR `whatsapp_click` OR `form_submit` at least once
- Membership: 30 days

### Audience 2: Pillar readers
- Condition: `Events` → `blog_pillar_engagement` at least once
- Membership: 30 days

### Audience 3: Location-intent
- Condition: `Page path contains` → `/locations/`
- Membership: 30 days

### Audience 4: Allen comparators
- Condition: `Page path` → `/blog/proneet-vs-allen-jaipur`
- Membership: 90 days

---

## Step 4 — Link Google Search Console (2 min)

GA4 Admin → **Product links** → **Search Console links** → **Link**.

Pick `sc-domain:proneetphysics.com` (already verified).

After linking: GSC queries + landing pages appear inside GA4 under **Reports → Acquisition → Search Console**. This is the only place where you see "which search query brought this specific paying lead" in one view.

---

## Step 5 — Exclude your own traffic (2 min)

GA4 Admin → **Data Streams** → click the web stream → **Configure tag settings** → **Show all** → **Define internal traffic**.

Create a rule:
- Rule name: `Internal`
- Traffic type value: `internal`
- IP address → **IP equals** → *(your home/office IP — Google "what is my ip")*

Then GA4 Admin → **Data Filters** → if "Internal Traffic" filter exists, toggle it from "Testing" to **Active**. Otherwise create it as **Exclude** filter with parameter `traffic_type = internal`.

---

## Step 6 — The 5 custom reports to save in Explore (optional, 5 min)

GA4 **Explore** → Create new exploration. Save each as a template.

### Report 1: Daily pulse
- Dimensions: Date, Session source/medium
- Metrics: Sessions, Engaged sessions, phone_call_click events, form_submit events

### Report 2: Content efficacy
- Dimensions: Page path, Page Category
- Metrics: Views, Average engagement time, Scroll Percentage (max), blog_pillar_engagement

### Report 3: Location intent
- Filter: Page path contains `/locations/`
- Dimensions: Page path, Session source
- Metrics: Views, phone_call_click

### Report 4: Funnel (path exploration)
- Starting point: `page_view` on `/blog/*` OR `/`
- Step 2: `page_view` on `/programs`
- Step 3: any key event

### Report 5: Keyword quality (after GSC linked)
- Dimensions: Google organic search query, Landing page
- Metrics: Clicks, Engagement rate, key event count

---

## What to check in Realtime within 5 minutes of deploy

1. Open proneetphysics.com in a regular Chrome tab (not analytics admin)
2. Click the Call button in the navbar
3. Within 60 seconds, GA4 **Reports → Realtime** should show `phone_call_click` in "Event count by event name"

If it appears, events are flowing. If not, check:
- `NEXT_PUBLIC_GA_ID` env var on Vercel is `G-D42ZXKH9RZ`
- Browser console: `window.gtag` should be a function
- No ad-blocker intercepting `google-analytics.com`

---

## Why this layered setup matters

Default GA4 gives you pageviews and sessions. That tells you *how much* traffic.

With the custom dimensions + key events above, you can answer:

- Which blog pillar produces the most phone calls per 1000 views?
- Do students who expand our "batch size" FAQ convert differently than those who don't?
- Does the /locations/mansarovar page convert better than /locations/malviya-nagar — adjusted for traffic source?
- Which keyword (via GSC link) brought the highest-converting parent last week?
- What scroll depth correlates with a phone call — 25%, 60%, 100%?

None of those are answerable with GA4's defaults. All of them are answerable after this setup lands.
