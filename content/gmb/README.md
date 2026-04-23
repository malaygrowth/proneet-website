# ProNEET GMB Post System

A lightweight, content-writer-driven system for producing weekly Google Business Profile posts.

**Strategy document:** `../../docs/gmb-strategy.md` (read first)
**Voice binding:** `CONTENT_WRITER_HANDBOOK.md` at the project root (binding)

## Folder map

```
proneet/content/gmb/
├── README.md                      ← you are here
├── prompts/
│   ├── content-writer-persona.md  ← prompt to hand to the writer (human or AI)
│   └── research-pack.md           ← always-load context (brand facts, rules)
├── templates/
│   ├── post-teaching-explainer.md ← pillar 1 template
│   ├── post-classroom.md          ← pillar 2 template
│   ├── post-student-voice.md      ← pillar 3 template
│   ├── post-offer.md              ← pillar 4 template
│   └── post-event.md              ← pillar 5 template
└── posts/
    └── YYYY-MM/                   ← drafted posts, one markdown file per post
        └── NNN-<slug>.md
```

## The workflow (45 minutes a month)

**Step 1 — Plan the month (5 min).**
On the last Sunday of the month, look at:
- Current admission window
- Upcoming syllabus topics in the batch
- Any results announcements due
- Planned events or open houses

Sketch out ~10 post slots on a calendar with one pillar tagged per slot (see cadence table in `docs/gmb-strategy.md`).

**Step 2 — Brief the content writer (5 min).**
Send the writer (or the AI agent) three things:
1. `prompts/content-writer-persona.md` — the voice
2. `prompts/research-pack.md` — the facts
3. A short brief per post: pillar, photo available, key fact (if any), desired CTA

**Step 3 — Generate drafts (20 min).**
Writer produces N markdown files in `posts/YYYY-MM/`, one per post. Each follows the matching template. Frontmatter contains all the structured data (post type, CTA button, UTM URL, image filename).

**Step 4 — QA pass (10 min).**
Apply the four checks from `docs/gmb-strategy.md`:
1. Voice drift check (read aloud)
2. Handbook ban check (em dashes, banned words, banned openers)
3. Claim check (every number sourced, every quote consented, every date absolute)
4. CTA match check (button matches pillar, URL is UTM-tagged)

Any failed check → back to writer.

**Step 5 — Schedule in GBP (5 min).**
Open Google Business Profile, paste captions, upload images, select post type, set CTA and URL, schedule publish date.

## Post file format

Every post is a markdown file in `posts/YYYY-MM/NNN-<slug>.md` with the structure shown in the templates. Frontmatter captures everything GBP needs at publish time; the body is the caption.

## Scheduling notes

- Publish Monday-Wednesday morning (best impression rates per research, see strategy doc).
- Never publish two teaching explainers back-to-back; alternate pillars.
- Event posts: set the event date ≥7 days ahead so the post stays visible long enough.
- Offer posts: always set start and end dates; never leave a stale offer live.

## Monthly review

Add a row to `posts/review.md` (create on first month) with:
- Posts published
- Total impressions
- Calls from GBP (phone button)
- Direction requests
- Messages received
- Top-performing post and why
- Worst-performing post and why

Adjust the pillar mix for next month based on what worked.
