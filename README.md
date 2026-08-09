# FitLog — personal health tracker

A private, single-user mobile app for tracking workouts, food, water, and body
weight. No accounts, no server, no analytics — **all data lives in your phone's
browser storage**. Built as a single-file progressive web app (PWA).

## Features

- **Workout** — exercise library (26 built-in + your own), routines/templates,
  live session logging (weight × reps per set), last-session reference numbers,
  auto rest timer when you tick off a set, workout history, personal records
  with estimated 1RM.
- **Timers** — stopwatch with laps, rest timer with presets (30s–5m) and
  custom durations, HIIT interval timer (work/rest/rounds) — all with beep
  and vibration.
- **Water** — daily goal ring, one-tap add (+150/250/500/1000 ml), reminder
  notifications at your chosen interval (08:00–22:00, while the app is open).
- **Food** — per-meal log (breakfast/lunch/dinner/snacks) with calories and
  macros, quick-add favourites, daily targets, browse past days.
- **Body** — weight log, 30-entry trend chart with goal line, BMI, delta since
  last weigh-in.
- **Settings** — goals, units (kg/lb), default rest time, reminders,
  export/import JSON backup, full reset.

## Install on your phone

### Option A — from the private Claude artifact link (fastest)
1. Open the artifact URL on your phone.
2. **Android (Chrome):** menu ⋮ → *Add to Home screen*.
   **iPhone (Safari):** Share → *Add to Home Screen*.
3. Launch it from the icon like any app. Data persists on the device.

### Option B — host it yourself (full offline PWA)
Any static host works; the repo is self-contained (no build step).

- **GitHub Pages:** repo → Settings → Pages → deploy from branch → `/ (root)`.
  Then open the Pages URL on your phone and add to home screen. This version
  registers a service worker, so it works fully offline.
- **Local:** `npx http-server .` and open on the phone over your Wi-Fi.

## Notes

- Notifications fire while the app is open (foreground). True background push
  would require a server, which this deliberately doesn't have.
- Use **Settings → Export backup** occasionally; clearing browser data clears
  the app's storage too.
- Everything is in `index.html` (assembled from `core.html`); `sw.js` +
  `manifest.webmanifest` + `icon.svg` make it installable and offline-capable.
