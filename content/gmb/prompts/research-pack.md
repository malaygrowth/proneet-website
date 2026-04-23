# ProNEET Research Pack (load before every post draft)

Always load these facts into the writer's context before drafting any GBP post. They are the verifiable numbers and names that every claim in every post must map to. If a post wants to make a claim that is not in this pack, the claim needs a fresh, sourced check.

## The institute

- **Name:** ProNEET (full: ProNEET Physics, also called ProNEET Classes)
- **Location:** 84/255, Madhyam Marg, Ward 27, Mansarovar Sector 8, Jaipur, Rajasthan 302020
- **Short locality:** Mansarovar Sector 8, Jaipur
- **Nearby landmarks:** 5 minutes from Mansarovar Metro, easy access from Gopalpura Bypass, Ajmer Road, Malviya Nagar
- **Phone (primary):** +91 92143 14348
- **Phone (secondary):** +91 81122 97734
- **Email:** team@proneetphysics.com
- **Website:** https://proneetphysics.com
- **Google rating:** 5.0 / 20+ reviews (April 2026)

## What we teach

- **Subjects:** Physics and Chemistry only (no Maths, no Biology)
- **Exams:** NEET-UG, JEE Main + Advanced (Physics and Chemistry scope)
- **Batch sizes:** capped at 30 students. Last intake enrolled 28.
- **Class types:** Class 11 foundation, Class 12 continuation, Dropper batch, and targeted Physics-only or Chemistry-only programmes

## The faculty

- **Neeraj Gupta** — Founder, Physics
  - 20+ years teaching NEET/JEE Physics
  - Previously at Narayana (Kota and Jaipur), Bansal Classes, Excel Physics
  - Teaches every Physics class himself, same face across Class 11 and Class 12
- **Vivek Patidar** — Chemistry
  - Teaches every Chemistry class himself, same face across Class 11 and Class 12
  - Based at the Mansarovar Jaipur classroom

## The verifiable numbers (binding)

These are the only stats that may appear in posts. Any other numerical claim needs fresh research.

- **20+ years** of Neeraj Gupta classroom experience (source: own teaching history; verified)
- **1000+ students** have cleared NEET, AIIMS, IIT, or NIT since 2003 (source: ProNEET classroom records 2003-2026; verified)
- **30-seat batch cap** (binding policy, not marketing)
- **Last intake: 28 students enrolled** (verified, April 2026)
- **5.0 / 20+ Google reviews** (April 2026)

## What we do not claim

Per Content Writer Handbook §11.7 industry rules:
- No AIR-rank claims without year + cohort size
- No "guaranteed selection"
- No "change your life"
- No before/after transformation claims without consent + numbers

## Tone anchors

If you are unsure how a post should sound, think of how Neeraj sir would describe this specific thing to a Jaipur parent sitting across a desk.

Example tone comparisons:

**Too marketing:**
> "Unlock your NEET potential with ProNEET's world-class Physics coaching!"

**Banned.** Everything about this breaks the handbook.

**Just right:**
> "Tuesday, rotational dynamics. Three students asked the same question: why angular momentum is conserved when torque is zero. We redrew the free-body, slowly. Two of them got it; the third wanted it one more time, so we did."

This second version is what a GBP post sounds like.

## Photography inventory (current as of April 2026)

Real photos we can use in posts, stored at `proneet/public/photos/`:
- `classroom-batch.webp` — live NEET batch in session
- `classroom-empty.webp` — empty classroom, clean shot
- `students-batch.webp` — group photo of students
- `students-grove.webp` — outdoor or informal students
- `students-with-neeraj.webp` — Neeraj sir with students
- `neeraj-gupta.png` — portrait of Neeraj sir
- `vivek-patidar.jpeg` — portrait of Vivek sir

**If a post needs a photo not in this list, note it in frontmatter with `photo_needed: true` and a description of the shot required.** Do not invent image filenames.

## UTM URL builder

Every post link follows this pattern:

```
https://proneetphysics.com/<path>?utm_source=gbp&utm_medium=post&utm_campaign=<pillar>&utm_content=<post-slug>
```

Where:
- `<path>` is the target page (e.g., `/contact`, `/blog/how-to-choose-a-physics-teacher`)
- `<pillar>` is one of: `teaching`, `classroom`, `student-voice`, `offer`, `event`
- `<post-slug>` is the filename-style slug of this specific post

Example:
```
https://proneetphysics.com/blog/how-to-choose-a-physics-teacher?utm_source=gbp&utm_medium=post&utm_campaign=teaching&utm_content=physics-teacher-signals
```
