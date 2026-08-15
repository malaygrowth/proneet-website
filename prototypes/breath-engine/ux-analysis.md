# UX Analysis — The Breathing App Category

**What the leading apps do, what we should take, and what we should refuse.**
Version 1.0 · Companion to the Breath Coach prototype

---

## 1. Why this analysis exists

Our prototype has good content and a weak container. Ten practices, coach memory,
insights and a check-up all live inside **one flat page of seven screens swapped in
place, with no persistent navigation**. Every path is a dead end you must back out of,
and the home screen is an eleven-band scroll that asks a stressed person to read ten
promises before they can take a breath.

The category solved this years ago. This document is the audit.

---

## 2. The competitors, and what each is actually good at

| App | Its real strength | Its weakness |
|---|---|---|
| **Breathwrk** | The closest to us. Ships **Home + Discover** tabs, exercise-first browsing, strong haptics, custom exercise builder. Recently added video classes with instructors. | Its own users report the redesign made navigation harder — a warning about adding surface area faster than structure. |
| **Calm** | Onboarding that **asks your goal first** and personalises the entry point rather than showing the whole catalogue. Strong single "Daily Calm" habit anchor. | Breathing is a minor feature buried under sleep/meditation content. |
| **Headspace** | **Narrative onboarding** — welcome screens set expectations, then walk you into a first 3–5 minute session. Course structure gives progression. | Heavily branded, prescriptive; breathing is a sub-mode. |
| **Othership** | Strong emotional/state-based framing and genuine audio production. Closest to our "how do you want to feel" thesis. | Content-library economics; needs constant new material. |
| **Insight Timer** | Vast library, robust progress/stats, community. Free tier is genuinely generous. | Overwhelming IA — the canonical "too much surface" example. |
| **Apple Breathe / Mindfulness** | Ruthless simplicity: one gesture, one minute, haptic-led, zero decisions. | No depth, no memory, no coaching. |

---

## 3. The patterns — adopt, adapt, or reject

### 3.1 Persistent bottom tab bar → **ADOPT**

Every serious app in the category uses one; 3–5 destinations, thumb-zone placement,
labelled. Tabs answer "where am I and what else is there?" — a question our app currently
refuses to answer. For wellness apps specifically, **fewer tabs reduce noise**, so we take
four, not five.

### 3.2 Goal-based onboarding → **ADOPT**

Calm's "what brings you here?" and Headspace's narrative frame both do the same job:
narrow the catalogue before the user ever sees it. We have an additional reason — a
health-adjacent app needs an explicit safety acknowledgement, and onboarding is the only
honest place for it. Three screens, no account, no email.

### 3.3 A personalised "today" surface → **ADOPT**

Our app already knows the time of day, the user's history, and which practice moves their
number most — and then renders the identical screen every single visit. A single
recommended practice as a hero, chosen by daypart and overridden by their own data, is
the highest-leverage change in this document.

### 3.4 Immersive session player → **ADOPT**

Chrome disappears during practice. We're most of the way there; the tab bar must not
follow the user into a session, and the controls need a hierarchy — right now "End early"
looks exactly like the "Sound" toggle, which is a destructive action dressed as a switch.

### 3.5 Emergency/SOS entry → **ADAPT**

Several apps offer a one-tap panic path. Ours is theoretically ideal for it — The Release
Valve is ninety seconds — but it currently takes four taps and two inputs to reach, which
is exactly wrong for someone mid-overwhelm. One tap from Today, check-in pre-skipped.

### 3.6 Streaks and gamification → **REJECT (mostly)**

The category leans hard on streaks. We keep our gentle thread instead: *"You've shown up
3 of the last 7 days."* Guilt is a poor motivator in a product for anxious people, and a
broken streak is a reason to delete an app. This stays a deliberate difference.

### 3.7 Content-library economics → **REJECT**

Insight Timer and Othership compete on volume of new material — an expensive treadmill.
Our bet is depth per practice (sourcing, coaching, memory), not count. Ten practices
properly coached beats 350 tracks.

### 3.8 Early paywall → **REJECT for now**

Standard is a paywall in onboarding. Prototype stays free; when it matters, gate the
library and memory, never the panic path. Someone in distress must always reach the
Release Valve.

---

## 4. Our specific debts, and the fix for each

| # | Debt | Fix |
|---|---|---|
| 1 | No persistent navigation | Four-tab bar: Today / Practices / Progress / You |
| 2 | Home is 10 equal-weight bands | Today shows **one** recommendation; the library moves to Practices |
| 3 | No onboarding, no safety consent | Three-screen first run with explicit acknowledgement |
| 4 | Identical screen every visit | Daypart + history-driven hero |
| 5 | Panic case is 4 taps deep | One-tap entry, check-in skipped |
| 6 | "End early" looks like a toggle | Icon toggles vs. distinct text button |
| 7 | Nowhere for settings, export, delete | The **You** tab |
| 8 | Mandatory check-in | Skip affordance; reflection adapts when there's no score |
| 9 | Two inputs before a session | Body map collapses behind a closed disclosure |

---

## 5. Target information architecture

```
┌ Today ───────── Practices ───── Progress ───── You ┐   ← persistent, hidden in session

Today        greeting · ONE recommended practice · "Too much right now?" ·
             thread · check-up nudge when due
Practices    Right now (8) · Practice (2) · Breathe me · recents
Progress     shifts chart · patterns · per-practice · check-up + history
You          sound/haptics defaults · export · delete · safety · sources · version
```

Session, intro, reflection, arrival and the check-up remain full-screen flows launched
*from* a tab, returning to it — the tab bar is the spine, not a fifth destination.

---

## 6. What we're keeping that nobody else has

Worth stating plainly, because a restructure is exactly when distinctive things get
sanded off:

- **The felt-shift number.** Pre/post scoring is our proof mechanic. No competitor does it.
- **Sourcing.** "Where this comes from," naming the text or the researcher, on every practice.
- **The Watcher.** An unpaced practice in a category of pacers.
- **The gentle thread** instead of streaks.
- **The refusal.** No hyperventilation protocols — increasingly a feature, not a gap.
