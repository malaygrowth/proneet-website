# Breathing Patterns — Research Foundation

**What the traditions say, what the evidence supports, and what we should build.**
Version 1.0 · Companion to the Breath Coach prototype

This document exists so that every pattern in the app can be traced to a source: a
classical text, a named teacher, or a study. It also records the practices we have
deliberately decided **not** to ship, and why — that list is as important as the library.

---

## 1. How to read the evidence

Breathwork has an unusual problem: the traditions are 500–2,500 years old and rich, the
modern claims are loud, and the clinical evidence is thin but improving. Three tiers,
used throughout this document:

| Tier | Meaning |
|---|---|
| **Established** | Replicated in controlled human studies with a plausible mechanism |
| **Supported** | Real studies exist, but small, short, or single-site |
| **Traditional** | Long lineage and clinical experience; modern evidence absent or weak |

A practice being merely *Traditional* isn't a reason to exclude it. It's a reason not to
make medical claims about it. Our copy rule follows directly: **describe what the user
will feel, never what it cures.**

---

## 2. The five lineages worth knowing

### 2.1 Classical yogic pranayama (15th–17th c. texts, far older oral tradition)

The primary sources are the **Haṭha Yoga Pradīpikā** (Svātmārāma, 15th c.), the
**Gheraṇḍa Saṃhitā** (late 17th c.), the **Śiva Saṃhitā**, and — further back and more
philosophical than technical — Patañjali's **Yoga Sūtras**, where prāṇāyāma is the fourth
of eight limbs.

What these texts actually contain, as distinct from what modern yoga says they contain:

- **Sequence matters and the texts are emphatic about it.** Both the Pradīpikā (2:5) and
  the Gheraṇḍa Saṃhitā (5:32) state that the practitioner is ready for *kumbhaka*
  (retention) only *after* the nāḍīs are purified — that is, after a long period of
  nāḍī śodhana. Retention is explicitly an advanced practice, not a beginner's tool.
- **The ratios are real but extreme.** The famous **1:4:2** (inhale : retain : exhale) is
  classified as *viṣama vṛtti* — "uneven breath," an advanced form. The Gheraṇḍa Saṃhitā
  suggests 12 counts in, 48 held, 24 out — under a teacher's supervision. By contrast
  *sama vṛtti*, even breathing, is the beginner's form. **Our box breathing is sama
  vṛtti.** Our 4-7-8 is a mild, modernised viṣama vṛtti.
- **The eight classical kumbhakas** — Sūrya Bhedana, Ujjāyī, Sītkārī, Śītalī, Bhastrikā,
  Bhrāmarī, Mūrcchā, Plāvinī — are the actual named canon. Most modern app "techniques"
  are simplifications of five of these.

**Honest note on 4-7-8:** it is popularly attributed to pranayama and popularised by
Dr Andrew Weil, but it is a modern formulation, not a technique named in the classical
texts. Our footnote copy should say "modern, rooted in yogic ratio breathing," not
"ancient."

### 2.2 Buddhist ānāpānasati — the tradition that does *not* control the breath

The **Ānāpānasati Sutta** lays out sixteen steps in four tetrads (body, feelings, mind,
mental qualities). The crucial distinction, and the one almost every breathing app
misses: **ānāpānasati is mindfulness of breathing, not breath control.** You change
nothing. You watch.

This is a genuine product opportunity, not just a footnote — see §5.4. Every app on the
market paces you. Nobody offers the 2,500-year-old practice of *leaving the breath
alone*, and for some users on some days that is exactly the right medicine.

### 2.3 Buteyko / Oxygen Advantage — the CO₂ tolerance school

Konstantin Buteyko (1950s, USSR) argued that chronic over-breathing, not under-breathing,
is the common dysfunction. **Patrick McKeown** is the most rigorous modern carrier of this
lineage (*The Oxygen Advantage*, Buteyko Clinic International).

Core claims, and they're the most testable in all of breathwork:

- **BOLT** (Body Oxygen Level Test) — normal breath in and out, pinch the nose, time to
  the *first definite desire to breathe*, not the maximum. It's a proxy for CO₂
  sensitivity. McKeown's program targets 40 seconds. **This is already in our app.**
- **"Breathe light to breathe right"** — deliberately reduced-volume breathing that
  creates a tolerable air hunger, training CO₂ tolerance and raising BOLT over weeks.
- **Nasal breathing as the default**, awake and asleep.

This lineage matters to us commercially as well as clinically: it's the only one offering
a **measurable number that improves with practice**, and our BOLT check-up currently
measures something we don't yet train. §5.5 closes that loop.

### 2.4 Resonance / HRV biofeedback — the most quantified lineage

**Paul Lehrer** and **Leah Lagos** are the reference names. The finding is robust:
breathing at roughly **5.5–6 breaths per minute** synchronises heart rate with
respiration and produces a large increase in heart-rate variability amplitude. This is
"resonance frequency."

Two refinements worth building toward:

- Individual resonance frequency **varies between about 4.5 and 7.0 breaths/min**. Our
  fixed 5.5 pace (First Light) is the population average, not any given person's optimum.
  A "find your resonance" flow — pacing the user at 4.5, 5, 5.5, 6, 6.5 and asking which
  felt most effortless — is a credible, differentiated feature.
- **Equal inhale-to-exhale** at 5.5/min is what the strongest study used, and it
  outperformed variants including ujjāyī on baroreflex sensitivity. Our First Light is
  built correctly.

### 2.5 High-ventilation methods — Wim Hof, Tummo, holotropic

Wim Hof's method derives from Tibetan **g-tummo** and pairs cyclic hyperventilation with
breath retention and cold. The endotoxin study is real and interesting: trained
practitioners measurably blunted their inflammatory response to injected endotoxin.

**We are not shipping any of this.** See §6.

---

## 3. The people worth learning from

Listed for what each is *actually* authoritative on, with the caveat attached.

| Person | Authoritative on | Caveat |
|---|---|---|
| **Patrick McKeown** | Functional breathing, CO₂ tolerance, BOLT, nasal breathing. The most methodologically careful figure in the field. | Buteyko's original disease claims outrun the evidence; McKeown is more conservative than the tradition he carries. |
| **Paul Lehrer / Leah Lagos** | HRV biofeedback, resonance frequency. The most quantified work in breathwork. | Clinical protocols assume equipment and coaching we don't have. |
| **Balban, Spiegel et al. (Stanford)** | Cyclic sighing. The single best-designed breathwork RCT to date. | One month, 114 people, remote and self-reported. |
| **James Nestor** | Popularising nasal breathing and slow breathing; excellent synthesist and reporter. | A journalist, not a researcher; self-experiments are vivid but n=1, and mouth-taping advice has outrun its evidence. |
| **Andrew Huberman** | Bringing the physiological sigh to a mass audience; co-authored the Stanford work. | Podcast framing often outpaces study strength. |
| **Dan Brulé** | 50+ years of applied practice, breath therapy for trauma and performance. | Experiential tradition; little of it is trialled. |
| **Richie Bostock, Stig Severinsen** | Accessible modern instruction; Severinsen brings genuine freediving expertise. | Commercial method-brands; treat protocols as opinion. |
| **Eddie Stern** | Bridging classical yoga scholarship with physiology; unusually rigorous about lineage. | Less prescriptive — more useful for framing than protocols. |
| **Wim Hof** | Popularising cold + breath; one landmark immune study. | Method has a body count in water; see §6. |
| **Sandy (Breathe With Sandy)** | Music-paced breathing as a delivery format — your original reference, and still the best example of pacing-as-sound. | Format inspiration, not a clinical source. |

---

## 4. Mechanisms — the four levers everything pulls

Useful because it explains *why* our five patterns work and predicts which additions will:

1. **Extended exhale → vagal brake.** Exhalation lengthens the cardiac inter-beat
   interval and increases parasympathetic tone. This is why every calming pattern we have
   has an exhale longer than its inhale. *Established.*
2. **Resonance (~5.5–6 br/min) → baroreflex amplification.** Heart rate and breath phase
   lock, HRV amplitude rises sharply. *Established.*
3. **CO₂ tolerance → reduced air hunger and calmer default breathing.** Light breathing
   and comfortable breath holds train the chemoreceptor response. *Supported.*
4. **Nasal nitric oxide → airway and vascular effects.** Nasal breathing produces NO;
   **humming raises nasal NO up to ~15× versus quiet exhalation** (Weitzberg & Lundberg),
   with one model showing 96% of a maxillary sinus's volume exchanged in a single hummed
   exhalation versus under 4% quiet. *Established for the NO effect; the link from NO to
   the felt calm of Bhrāmarī is **not** established — the calm is more likely vibration
   plus a long exhale.*

---

## 5. Recommended additions to the pattern library

Five new experiences, each with a moment, a lineage, and honest evidence. Timings are
specified for direct implementation in the existing engine.

### 5.1 Nāḍī Śodhana — alternate nostril

- **Lineage:** the practice the classical texts treat as *the* foundation, named across
  the Pradīpikā, Gheraṇḍa Saṃhitā, Śiva Saṃhitā and the Upaniṣads.
- **Moment:** "My head is noisy and scattered" — the state of too many open tabs.
- **Pattern (no retention — deliberately the beginner form):** in left 4 · out right 6 ·
  in right 4 · out left 6. Cycle 20s. ~4 minutes.
- **Why it earns a slot:** it's the only pattern that gives the hands something to do,
  which is unexpectedly effective for scattered attention, and it *feels* like a technique
  rather than just timing — the moment the app stops resembling a metronome.
- **Evidence:** *Traditional*, with *Supported* small studies on autonomic effects. Copy
  must not claim brain-hemisphere balancing — that framing is traditional, not physiological.

### 5.2 Bhrāmarī — the humming breath

- **Lineage:** one of the eight classical kumbhakas.
- **Moment:** "The loop in my head won't stop."
- **Pattern:** in through the nose 4 · hum the exhale 8. Cycle 12s. ~3 minutes.
- **Why it earns a slot:** the user *makes a sound*, which is a completely different
  sensory experience from anything else in the app, and it's self-masking — the hum drowns
  the inner monologue. Also the one pattern where our audio engine can genuinely
  participate: hold a low drone on the exhale so the user has a pitch to match.
- **Evidence:** *Established* for the nitric-oxide effect; *Traditional* for calm.
- **Product note:** needs a "somewhere you can make noise" warning on the intro card.

### 5.3 Śītalī / Sītkārī — the cooling breath

- **Lineage:** two of the eight classical kumbhakas. Śītalī inhales through a curled
  tongue; Sītkārī through the teeth, for the ~1 in 3 people who can't curl their tongue.
  **Ship both, auto-offering Sītkārī as the alternative** — a detail most apps miss.
- **Moment:** "I'm hot and short-tempered." Anger and irritability are almost entirely
  unaddressed by the category, which is a gap worth owning.
- **Pattern:** sip in through tongue/teeth 4 · out through the nose 6. Cycle 10s. ~3 min.
- **Evidence:** *Traditional*, plus *Supported* EEG work reporting increased alpha/theta
  and decreased beta. The evaporative cooling on the tongue is real and immediately
  perceptible — which is what makes it persuasive to a first-time user.

### 5.4 Ānāpānasati — the watcher *(the strategically interesting one)*

- **Lineage:** the Ānāpānasati Sutta; 2,500 years, and the direct ancestor of modern
  mindfulness.
- **Moment:** "I don't want to be told what to do with my breath."
- **Pattern:** **none.** The engine does not pace. The aura drifts on its own slow tide,
  and the coach speaks rarely — every 20–30 seconds — pointing attention at what's already
  happening: *"Is this breath longer than the last one? Don't fix it. Just know."*
- **Why it earns a slot:** it's the strongest differentiator in the whole library. Every
  competitor is a pacer. An app confident enough to say *change nothing* reads as a coach
  rather than a machine — and on the days when being managed is itself the stressor, it's
  the only thing that works. It also converts the app from "breathing tool" to
  "relationship with your breath," which is the durable version of this business.
- **Engine change required:** a `paced: false` mode — the one real code addition here.
- **Evidence:** *Established* as mindfulness practice broadly; specific claims unnecessary.

### 5.5 Light breathing — training the number we already measure

- **Lineage:** Buteyko via McKeown, "breathe light to breathe right."
- **Moment:** "I want to actually train, not just calm down."
- **Pattern:** deliberately reduced-volume nasal breathing, in 4 · out 6, with the
  instruction to take in *less air than feels natural* and sustain a **light, tolerable**
  air hunger — never breathlessness. ~4 minutes.
- **Why it earns a slot:** our BOLT check-up currently measures a number we give the user
  no way to improve. This closes that loop and turns the app into a training programme
  with a visible score — the retention mechanic none of the mood-based experiences provide.
- **Evidence:** *Supported*. Copy rule: "air hunger you could hold a conversation
  through." If they gasp at the end, it was too strong.
- **Safety:** stop rules on screen; not for pregnancy or cardiovascular conditions.

---

## 6. What we are deliberately not shipping

### 6.1 Cyclic hyperventilation, Wim Hof-style breathing, Tummo, holotropic

Reasons, in order of seriousness:

1. **People have died.** Hyperventilation induces hypocapnia, which suppresses the urge
   to breathe; combined with water it causes shallow-water blackout, and Australian
   pathology researchers have named this breathing method in underwater drowning deaths.
   We cannot control whether a user is in a bath. Our safety copy says "never in water,"
   and safety copy is not a control.
2. **Documented adverse effects even on dry land** — tetany (the hands clawing is common
   and frightening), fainting, panic, and rare hallucination case reports.
3. **Screening we can't perform.** Research protocols exclude pregnancy, seizure
   disorders, glaucoma, retinal detachment, cardiovascular disease, aneurysm history and
   severe mental illness. An app store download screens for nothing.
4. **The safety literature points the other way for us anyway:** slow nasal breathing near
   six breaths per minute has the most favourable safety profile for healthy adults, while
   high-ventilation and long-hold methods call for screening, supervision and stop rules.

This is also a **positioning** decision, not only a safety one. "The breathing app that
won't hyperventilate you" is a real market stance as the category's risks become better
known — and it keeps us clear of the Google Play health-claims and safety scrutiny that
the intense-breathwork apps will eventually attract.

### 6.2 Kapālabhāti and Bhastrikā

Classical, legitimate, and forceful. Same screening problem, milder. **Revisit only** if
we ever add a real onboarding health screen.

### 6.3 Long breath retentions and the 1:4:2 ratio

The texts themselves say retention comes after long preparation and under a teacher. We
respect that. Our longest hold is 7 seconds (The Drift), which is comfortably inside
everyday safety, and even that carries a contraindication note.

### 6.4 Mouth taping

Popular via Nestor, and outside the app's scope. An unsupervised sleep intervention with
real risk for undiagnosed sleep apnoea is not something to recommend in-app.

---

## 7. What this means for the product

1. **The library grows from 5 experiences to 10**, spread across five distinct
   mechanisms (long exhale, resonance, CO₂ tolerance, vibration, pure awareness) rather
   than five variations on a timer.
2. **Two new engine capabilities:** an unpaced mode (for The Watcher), and per-phase
   side/route instructions (left/right nostril, tongue/teeth) — both small changes to the
   existing phase model.
3. **The training loop closes:** BOLT measures → Light Breathing trains → BOLT re-measures.
4. **Home needs sectioning** at 10 experiences: *Right now* (state-based) and *Practice*
   (training-based, plus the check-up).
5. **A credibility asset:** an in-app "Where this comes from" note per experience, naming
   the text or the researcher. Nobody in the category does this, it costs nothing, and it
   is exactly the kind of detail that earns trust from the people who tell their friends.
6. **The next feature this research argues for:** *find your resonance frequency* — pace
   the user at 4.5 through 6.5 breaths/min and let them pick the one that felt most
   effortless, then make that their personal First Light pace. It's individualised, it's
   grounded in the best-quantified lineage we have, and it is a genuinely new consumer feature.

---

## Sources

Primary texts: Haṭha Yoga Pradīpikā (Svātmārāma, 15th c.); Gheraṇḍa Saṃhitā (17th c.);
Śiva Saṃhitā; Patañjali, Yoga Sūtras; Ānāpānasati Sutta (MN 118).

Key modern sources: Balban et al., *Brief structured respiration practices enhance mood
and reduce physiological arousal*, Cell Reports Medicine (2023); Lehrer & Lagos on
resonance-frequency HRV biofeedback; Weitzberg & Lundberg on humming and nasal nitric
oxide (2002); McKeown, *The Oxygen Advantage*; Nestor, *Breath*; reviews of
high-ventilation breathwork effects, mechanisms and clinical considerations
(Neuroscience & Biobehavioral Reviews, 2023).
