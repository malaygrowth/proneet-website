# Breath Coach — Generating the Voice with ElevenLabs

**Version 1.0 · Companion to the Recording Script and the Voice & Sound Production Guide**

This replaces the human-booth workflow with an ElevenLabs one. Everything the coach
says is generated from a manifest, so the whole voice set is reproducible: change a
line, re-run one command, get a new file with the same name.

Three files work together:

| File | What it is |
|---|---|
| `elevenlabs-voice-guide.md` | This document — decisions, settings, workflow, QA |
| `voice-manifest.json` | All 65 lines, already marked up for ElevenLabs, with per-line time budgets |
| `scripts/generate-voice.mjs` | Runnable generator — reads the manifest, writes named audio files, checks durations |

---

## 1. The two decisions that matter most

### 1.1 Use **Eleven Multilingual v2**, not v3 — for this product

v3 is the more expressive model and it's tempting for a coaching voice. It's the wrong
tool here, for three concrete reasons that all come from the same place: **our lines
have to land inside a breath.**

| What we need | Multilingual v2 | Eleven v3 |
|---|---|---|
| Exact pauses (our script is built on `…`) | ✅ `<break time="0.8s" />`, reliable up to 3s | ❌ no SSML breaks; only vague `[pause]` tags |
| Slow the delivery to ~95 wpm | ✅ `speed` setting (0.7–1.2) | ❌ no speed parameter |
| Same tone across 9 lines of one experience | ✅ request stitching (`previous_text` / `previous_request_ids`) + `seed` | ❌ stitching not supported |
| Emotional range from tags | fair (settings only) | ✅ excellent (`[whispers]`, `[sighs]`…) |

We're buying *timing control and consistency* and paying with *expressive range*. For a
coach whose whole job is pacing, that's the right trade. The manifest is written for v2.

**Worth one experiment:** The Drift (the near-whisper, edge-of-sleep set) is the one
place v3's `[whispers]`/`[exhales]` tags might beat v2. Generate it both ways and pick
by ear — but keep v2 for the other four so the coach doesn't change personality between
experiences.

### 1.2 Do **not** generate breath sounds or cue tones with ElevenLabs

The production guide asks for eight breath sounds at exact durations (a 5.5-second
relaxed nasal inhale, an 8-second sighing exhale, and so on). TTS and SFX generation
cannot hit an exact duration, and a synthetic breath is the single most uncanny thing a
breathing app can play — users are listening to breathing with full attention.

- **Breath sounds:** record for real. This is the one asset that needs no talent — it's
  eight breaths, phone in a quiet room, a silent stopwatch in your eyeline. Spec is in
  §3.2 of the production guide.
- **Cue tones (G4/B4/D5):** a sampled instrument or synth, not ElevenLabs. Spec in §3.3.

Everything else — all 65 spoken lines — comes from ElevenLabs.

---

## 2. Choosing the voice

### Option A — Pick from the voice library (fastest, recommended to start)

Filter for: **middle-aged**, **calm / narration** use case, and audition in the lower
half of the register. Ignore anything tagged "energetic," "commercial," or "upbeat."

**The audition test** — the same one from the human casting spec. Generate this exact
line, at the Unwind settings in §3, on every candidate:

```
Let the chair take your full weight.
```

Then generate the hardest line in the set:

```
The day is over. <break time="0.7s" /> Tell your body — it's the last to hear.
```

Reject a voice if it: sounds bored rather than patient; lifts at the end of a sentence
(uptalk is fatal here); gets breathy-fake on the pause; or sounds like an advertisement.
Shortlist 3, run a full Unwind session with each (that's 9 lines — cheap), and choose
the one whose **silence** feels best. Silence is most of this product.

### Option B — Voice Design (a voice nobody else has)

Worth doing before launch, since a library voice can appear in a competitor's app. Prompt:

> A warm, low-register voice in their forties. Speaks slowly and softly, like a close
> friend talking late in the evening in a dim room. Relaxed and unhurried, with a little
> natural texture and breath in the tone. Never bright, never announcer-like. Sentences
> fall at the end. Neutral accent.

Generate several, run them through the audition test above, and save the winner as a
permanent voice. **Then never change it** — the voice is the brand, and switching it
later is more jarring than a redesign.

### Option C — Clone a real person

If you have a breathwork instructor you'd partner with anyway, Instant Voice Cloning
(Starter+) or Professional Voice Cloning (Creator+) gives you their voice with your
scripts and your timing. This is the strongest long-term position — it's credibility you
can't get from a stock voice — but only with a signed agreement covering AI voice use.
Never clone a voice you don't have written permission for; ElevenLabs requires it and
it's the fastest way to a lawsuit and a store takedown.

**Whichever you choose: record the `voice_id` into the manifest and keep it forever.**

---

## 3. Settings per experience

The manifest carries these already. `speed` is where the coaching pace comes from —
these all sit below 1.0 deliberately.

| Experience | stability | similarity | style | speed | Why |
|---|---|---|---|---|---|
| The Unwind | 0.55 | 0.80 | 0.15 | 0.88 | warm, settled, a little variation between lines |
| First Light | 0.55 | 0.80 | 0.20 | 0.92 | slightly brighter and clearer, still unhurried |
| Steady Ground | 0.70 | 0.85 | 0.10 | 0.95 | even and undramatic — steadiness demonstrated |
| The Release Valve | 0.65 | 0.85 | 0.15 | 0.92 | grounded, certain, no urgency |
| The Drift | 0.45 | 0.75 | 0.25 | 0.80 | slowest and most intimate; lower stability lets it soften |
| Phase cues | 0.80 | 0.85 | 0.05 | 0.95 | these repeat every breath — consistency beats expression |
| Universal | 0.55 | 0.80 | 0.15 | 0.88 | neutral-warm, plays after any experience |

Two rules that matter more than the exact numbers:

- **Cues get high stability.** A phase cue plays dozens of times per session. Any
  variation between takes becomes an audible flicker. Boring is correct.
- **`speed` below 0.8 starts to smear.** The Drift is at the floor. If it sounds
  slurred rather than sleepy, raise to 0.85 and add pause length instead.

---

## 4. How the lines are marked up

Our script uses `…` to mean "a real pause." ElevenLabs needs that made explicit. The
manifest has already done this conversion — here's the rule set so you can edit lines
later without breaking them.

| Script notation | Manifest markup | Notes |
|---|---|---|
| `…` mid-sentence | `<break time="0.6s" />` | the standard beat |
| `…` before a final phrase | `<break time="0.8s" />` | landing a line |
| Long reflective pause (The Drift) | `<break time="1.2s" />` | up to 3s is supported |
| `—` em-dash | keep as `—` | gives a natural short catch |

**Hard limits, learned the hard way:** never more than **two** break tags in one line.
Excessive break tags make the model speed up, add noise, or produce artefacts — the
failure is loud and obvious, and it's the most common way a batch goes bad. Our longest
lines (The Drift, 17s budget) still use at most two.

Also: **no trailing break tag.** A break at the very end of a line produces unstable
audio, and it isn't needed — the app already leaves the rest of the breath cycle silent
after a line finishes, so the pause happens for free.

---

## 5. Generating

### 5.1 One-time setup

1. Create the ElevenLabs account and subscribe to a **paid** plan before generating
   anything you intend to ship — commercial rights only exist on paid plans, and audio
   generated on the free tier can't be used commercially and requires attribution. The
   good news: rights you earn on a paid plan are **perpetual**, so audio generated today
   stays licensed even if you cancel later.
2. **Which plan:** Creator (~$22/mo, 100k characters) is the right call. The whole set is
   ~2,600 billable characters per full pass (verified with --dry-run), but you'll do many passes — voice auditions, tone
   retries, script edits — and Creator also unlocks 192kbps MP3 output and professional
   voice cloning. Starter ($5, 30k characters) works if you're disciplined; the free tier
   does not, for licensing reasons alone.
3. Get an API key from the dashboard and export it:
   ```bash
   export ELEVENLABS_API_KEY="sk_..."
   ```
4. Put your chosen `voice_id` into `voice-manifest.json` (the `voice_id` field at the top).

### 5.2 Run the generator

```bash
cd prototypes/breath-engine/voice
node scripts/generate-voice.mjs                # everything
node scripts/generate-voice.mjs --only unwind  # one experience
node scripts/generate-voice.mjs --only cues    # just the phase cues
node scripts/generate-voice.mjs --dry-run      # print what would be generated, spend nothing
```

Output lands in `voice/out/<experience>/<line-id>.mp3`, using the same IDs as the
recording script (`UNW-D2`, `DR-CUE-IN`, …) so the app can reference them directly.

What the script does for you:

- applies the per-experience settings from §3
- passes `previous_text` so each line is conditioned on the one before it — this is what
  keeps tone consistent across an experience instead of drifting line to line
- uses a fixed `seed` so a re-run reproduces the same takes (change the seed to reroll)
- measures each file with `ffprobe` and **fails loudly** when a line runs over its time
  budget from the production guide
- writes `out/report.json` with every duration, so you can see the whole set at a glance

### 5.3 What to do when a line is over budget

The generator will tell you, e.g. `RV-CUE-SIP 1.34s > 1.00s budget`. In order of preference:

1. **Shorten the text.** The manifest already carries shortened variants for the tightest
   lines; trim further ("A little more" → "More").
2. **Raise `speed`** for that one line (`speedOverride` field in the manifest) — but not
   above 1.0 for coach lines; a rushed coach is worse than a missing line.
3. **Shorten the break** (0.8s → 0.5s).
4. **Last resort: lengthen the breath.** Never do this for the protocol experiences
   (The Drift's 4-7-8, the Release Valve's sigh) — those timings are the medicine.

---

## 6. QA before these ship

- [ ] Every line inside its budget (the generator's report is the check).
- [ ] Listen to one full experience end to end, in order. Tone should not drift between
      line 1 and line 9. If it does, regenerate with `previous_text` chaining verified on.
- [ ] Phase cues: play the same cue five times in a row. Any audible variation between
      identical files means stability is too low — raise it and regenerate.
- [ ] Check every line for the classic TTS failures: a swallowed first word, a wrong
      emphasis ("*The* day is over" vs "The day *is* over"), a mispronunciation, an
      artefact on the break.
- [ ] No uptalk anywhere. Endings must fall.
- [ ] Loudness: normalise the set to about **−19 LUFS** so the voice sits consistently
      over the drone (the mix targets in §6 of the production guide still apply).
- [ ] Play it on a phone speaker, not headphones. Half your users are lying in bed with
      the phone face-down on a duvet.

---

## 7. Legal and disclosure

- **Rights:** paid-plan generations carry a perpetual commercial licence, so shipping
  them in the app and using them in marketing is fine. Keep the invoice/plan record —
  that's your proof of when the audio was generated and under which licence.
- **Cloning:** only with written permission from the speaker, covering synthetic voice
  use in a commercial app.
- **Store listings:** Google Play requires disclosure of AI-generated content in some
  contexts and increasingly rewards transparency. Say it plainly in the listing and in
  the app's About screen — something like *"Slowtide's coach is an AI-generated voice,
  written by us."* Users find out anyway; the ones who care mind being misled far more
  than they mind the synthesis.
- **Never imply a real practitioner is speaking** unless one is. That crosses from
  synthesis into misrepresentation, and in a health-adjacent product it's the kind of
  thing that ends an app.

---

## 8. Wiring the audio into the app

Once `out/` is populated, send it over and I'll wire it into the prototype: voice lines
scheduled one per breath cycle, spoken cues on the first two cycles then handing off to
tones, breath sounds under the drone. The app already knows the timing — it needs the
files.

Preload matters: a coach line that arrives late is worse than no coach line. All 65 files
at 192kbps MP3 are only a few megabytes, so they ship inside the app rather than
streaming, and the session preloads its own set before the lead-in finishes.
