# Breath Coach — Voice & Sound Production Guide

**Version 1.0 · Companion to Prototype 02 ("Breath Coach")**
This document defines every audio asset the coach experience needs: the voice, the breath sounds, the cue tones, and the technical specs for recording, delivery, and mixing. The full line-by-line script lives in the separate **Recording Script** document — that one goes into the booth; this one stays with you.

---

## 1. The voice — casting and character

We are casting a **coach**, not a narrator and not a "meditation voice." The reference feeling: a trusted friend who is *already relaxed*, talking to you from the chair next to yours. Calm is contagious — the voice does the relaxing, the words just steer it.

**Cast for:**
- A naturally **low-to-mid register** speaker (any gender). We want the *lower third of their natural range* — never pushed artificially deep. Target fundamental frequency: roughly **85–110 Hz** for a lower voice, **150–185 Hz** for a higher voice. What matters is that it sounds effortless at that pitch.
- **Warmth over polish.** A trace of texture/graininess is an asset. Over-produced "voiceover smoothness" reads as an ad.
- Someone who can **speak slowly without sounding sedated** — the hardest part of the job. Audition line: have them read *"Let the chair take your full weight"* at 100 words per minute. If it sounds patient, cast them. If it sounds bored or syrupy, keep looking.

**Universal performance rules (all experiences):**
- Pace: **95–115 words per minute** (normal conversation is ~150). Every line ends with a **falling intonation** — no uptalk, ever. An uptick invites a response; we want the opposite.
- Pauses are content. Where the script marks `…` or a line break, leave real silence (0.5–1.0s). Never rush to fill it.
- Volume: soft but **supported** — a quiet voice with breath under it, not a whisper (exception: The Drift, below). Think "not wanting to wake someone in the next room."
- Endings may relax into a slight natural fry on the final word — that's fine and human. Avoid fry mid-sentence.
- Light mouth noise is acceptable; we'll clean the worst in post. Have water (room temperature) on hand; a green apple cuts mouth clicks.
- Smile state matters and is audible. Per-experience smile direction is in the script doc.

**Per-experience energy references** (full direction is in the script doc):

| Experience | The voice is… | Tempo | Texture |
|---|---|---|---|
| The Unwind | a friend at the end of a good dinner, lamps low | ~105 wpm | warm, settled |
| The Drift | someone reading a bedtime story, half-asleep themselves | ~85–95 wpm | breathy, near-intimate |
| Steady Ground | a trusted cornerman before the walk-out | ~110 wpm | firm, even, zero drama |
| The Release Valve | a paramedic's calm — present, certain, unhurried | ~110 wpm | grounded, close |
| First Light | quiet early-morning optimism, slight smile | ~105 wpm | light, clear |

---

## 2. How the audio plays in a session (so the recordings fit)

A session is a loop of breath cycles. Understanding the timeline tells you why every line has a **maximum duration**:

```
[Lead-in ~5s]  [cycle 1]  [cycle 2]  [cycle 3] … [last cycle]  [Return line]  → reflection screen
    voice       voice cues + coach line each cycle                  voice
```

- **Lead-in:** one spoken line while the orb is still. (~5s of room.)
- **Cycles:** each breath cycle can carry **one coach line**, started at the top of the cycle. The line must finish comfortably inside the cycle — budget = cycle length minus ~2s.
- **Phase cues** ("Breathe in", "Let it go"): spoken by the coach for the **first two cycles only**, then the tones/breath sounds take over and the voice returns only for coach lines. This is deliberate — a voice that counts every breath becomes a metronome again.
- **Return line:** one universal line as the session releases the user ("Take one normal breath…").

**Cycle lengths and line budgets:**

| Experience | Pattern | Cycle length | Coach-line budget | ≈ max words @105 wpm |
|---|---|---|---|---|
| The Unwind | in 4 / out 6 | 10s | **8s** | ~13 |
| The Drift | in 4 / hold 7 / out 8 | 19s | **17s** | ~28 (deliver far slower) |
| Steady Ground | 4 / 4 / 4 / 4 | 16s | **14s** | ~24 |
| The Release Valve | in 2 / sip 1 / out 6 | 9s | **7s** | ~12 |
| First Light | in 5.5 / out 5.5 | 11s | **9s** | ~15 |

Every line in the Recording Script already fits its budget (a few on-screen lines were trimmed for the spoken version — the script marks these). **Phase cues have hard caps:** inhale/exhale cues ≤1.5s, hold cues ≤1.2s, the Release Valve's "a little more" sip cue ≤1.0s. If a cue take runs long, retake it — we can't stretch the breath around it.

---

## 3. Asset inventory — everything to record

### 3.1 Voice (see Recording Script for exact lines)

| Group | Count | Notes |
|---|---|---|
| Lead-in lines | 5 | one per experience |
| Coach lines (settle/deepen/close) | 39 | 6–9 per experience |
| Phase cues | 15 | recorded per experience, in that experience's tone |
| Closing (reflection) lines | 5 | optional for v1 — on-screen text already carries them |
| Universal lines | 2 | session-end release + reflection arrival |
| **Total voice lines** | **~66** | 3 takes each ≈ 200 recorded takes; a comfortable half-day session |

### 3.2 Breath sounds — the coach breathes *with* the user

These are the most important non-voice assets: real, audible breathing at exactly the session tempo, mixed under the drone so the user entrains to a human breath, not a timer. Recorded by the same person as the voice (continuity of body), close-mic'd.

| ID | Asset | Duration (±0.3s) | Character |
|---|---|---|---|
| BR-IN-2 | nasal inhale | 2.0s | easy, unforced |
| BR-IN-4 | nasal inhale | 4.0s | slow, relaxed, faintly audible |
| BR-IN-55 | nasal inhale | 5.5s | long, even — no strain at the top |
| BR-SIP-1 | second "sip" inhale (nose) | 1.0s | lighter, stacked on a full breath |
| BR-OUT-4 | nasal exhale | 4.0s | controlled, quiet |
| BR-OUT-55 | nasal exhale | 5.5s | even all the way down |
| BR-OUT-6 | mouth exhale, soft "haa" | 6.0s | barely voiced, releasing |
| BR-OUT-8 | long sighing exhale | 8.0s | slight voiced sigh at onset, fading to air |

Recording notes: durations are hit by feel against a **silent visual timer** (phone stopwatch in eyeline — never an audible click, it bleeds). The breath must sound *relaxed at that length* — if 5.5s in sounds like straining, take a break and go again. No congestion, no whistle; re-record on a different day if the nose isn't cooperating. 3 clean takes each.

### 3.3 Cue tones

The prototype's synthesized cues, to be replaced with one real recorded instrument for warmth. Keep the exact pitches — they form a G-major triad, so any combination sounds consonant:

| Cue | Pitch | Frequency | Played on |
|---|---|---|---|
| Inhale cue | D5 | 587 Hz | start of every inhale |
| Hold cue | B4 | 494 Hz | start of every hold |
| Exhale cue | G4 | 392 Hz | start of every exhale |

Spec: single soft strike, ~20ms attack, **~700ms natural decay**, no reverb tail beyond 1.5s. Good sources: music box tine, kalimba, Rhodes (soft velocity), muted singing bowl, celesta. Record each note 3×; we'll pick the roundest. One instrument for all three notes — the *pitch* differentiates the phases, not the timbre.

### 3.4 Drone / music bed

**Keep the in-app synthesized drone for v1.** It glides ~135→215 Hz with the breath (roughly C♯3→A3), which recorded stems can't do without app-side pitch work. When you're ready for composed beds (the Sandy-style moat), that's a per-experience composition brief we can write separately — don't block voice recording on it.

### 3.5 Ambience beds — optional, v2

Skip for the first recording pass. When wanted: 3-minute seamless loops, stereo, very sparse (evening room + distant crickets for Unwind; night-quiet for Drift; none for Steady Ground; low room tone for Release; first birds for First Light). Mixed at near-threshold level.

---

## 4. Recording — technical spec

**Room:** the quietest, deadest space available. A closet full of clothes beats an empty bedroom. Target: no audible echo when you clap (RT60 < ~0.3s), **noise floor below −60 dBFS** on the recorded file. Kill fridges, fans, HVAC. Phone on airplane mode, out of the room.

**Chain:** any decent large-diaphragm condenser or a clean USB mic (e.g. SM7B, AT2020, Shure MV7). Pop filter always. Mic distance **15–20 cm**, slightly off-axis (10–15°) to tame plosives. **Exception — The Drift and all breath sounds: 8–10 cm** for proximity warmth (watch plosives extra carefully there).

**Format:** WAV, **48 kHz / 24-bit, mono**. No compression, no EQ, no noise gate on the way in — raw capture only.

**Levels:** speaking peaks around **−18 to −12 dBFS**, never above −6. Set gain once with the loudest line (Steady Ground cues), then don't touch it within an experience.

**Session protocol:**
1. Record 10 seconds of **room tone** at the start of every session (needed for cleanup).
2. Work one experience at a time, in one sitting — the tone must not drift mid-experience. Re-read the experience's direction block aloud before starting it.
3. **3 takes per line**: (1) as directed, (2) softer/more intimate, (3) alternate phrasing feel — talent's instinct. Slate takes by speaking the line ID once before take 1 only (we'll strip it).
4. Leave **1 second of silence** before and after every take (editing handles).
5. Warm-up: record The Unwind twice; the first pass is always stiff. Keep the second.
6. Order suggestion: Unwind → First Light → Steady Ground → Release Valve → Drift last (the near-whisper is easiest once the voice is tired and settled). Breath sounds at the very end.

---

## 5. Delivery — files and naming

One folder per experience, plus `universal/`, `breath/`, `tones/`:

```
delivery/
  unwind/     unwind_lead_t1.wav … unwind_d4_t3.wav, unwind_cue-in_t1.wav …
  drift/      drift_lead_t1.wav …
  steady/     …
  release/    …
  firstlight/ …
  universal/  uni_return_t1.wav, uni_release_t1.wav
  breath/     br_in_4_t1.wav, br_out_8_t2.wav …
  tones/      tone_d5_t1.wav, tone_b4_t1.wav, tone_g4_t1.wav
  roomtone/   roomtone_sessionA.wav
```

Pattern: `{experience}_{lineID}_t{take}.wav`, all lowercase, IDs exactly as in the Recording Script. Deliver **all takes, unedited** — selection and cleanup happen in post. Include the room tone files.

---

## 6. Post & mix targets (for whoever assembles it — can be me)

- Cleanup: light broadband noise reduction using the room tone (gentle — artifacts are worse than hiss), de-click, de-ess only where sibilance bites, high-pass at 70 Hz.
- Trim each chosen take to content with 150ms head / 300ms tail; **no fade-ins on voice**, 100ms fade-out.
- Loudness (stem targets before in-app mixing): voice **−19 LUFS** short-term, breath sounds **−27 LUFS**, cue tones peaking −18 dBFS, drone sitting at **−32 to −35 LUFS** and ducking a further 2–3 dB under any voice line. True peak ceiling −3 dBFS everywhere.
- Masters stay WAV; app/web builds transcode later (AAC/Opus) — never deliver lossy as source.

---

## 7. QA checklist before we call it done

- [ ] Every line under its budget from §2 at the delivered pace (I'll verify programmatically).
- [ ] Phase cues under their hard caps (1.5s / 1.2s / 1.0s).
- [ ] Breath sounds within ±0.3s of spec and genuinely relaxed at length.
- [ ] No audible room, hum, clicks, or phone buzz on any selected take.
- [ ] Tone consistent within each experience (no mid-experience energy jumps).
- [ ] The Drift is intimate but **intelligible** — whisper-adjacent, not actual whispering.
- [ ] Falling intonation on every line ending.

---

## 8. What happens next

Send me the delivery folder (or a link) and I'll wire the selected takes into the web prototype — voice lines scheduled per cycle, spoken cues for the first two cycles crossfading to tones, breath sounds under the drone — so you can hear the full coached experience in the browser before any mobile code exists. That's also the cheapest way to A/B two voice candidates: same session, two voices, pick the one whose *silence* feels better.
