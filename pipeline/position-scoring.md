# Position scoring for the fault-line plot

**Status:** mandatory for every new readout's fault-line plot since 2026-07-28.
**Run on Opus** — this is judgment-heavy adjudication, not extraction.

**Reference implementation — `readouts/sudan-icc-briefing-2026-07.html`.** Canonical since
2026-08-06 for the whole plot: the two mirrored rubrics, the `P + N` X-axis, the two-section
evidence panel, the glance table, the `brief` chip and the camp colours. Worked sheet with both
rubrics and their anchors: `research/sudan-icc-position-scores-2026-07.md`.

- `readouts/natural-resources-debate-2026-07.html` established the 3×3 intensity-band grid, the
  key-style guide box and the plain-language axis explainers on 2026-07-29, and is still worth
  reading for those. **Its scoring is one generation behind** — single rubric plus flat negative
  markers — so do not copy its data model or its panel.
- `research/sudan-icc-scores-prototype-2026-07.html` is a superseded prototype (kept for history;
  it predates the chip, the colour-in-prose rule and the 2026-07-29 palette). Don't copy from it.

**Outstanding — retroactive migration.** Audited 2026-08-06 against the rendered plot data, not
the scoring sheets; the sheets record deductions that the published pages already absorbed into a
single net. See "Migrating an existing readout" at the end of this file for the order of work.

| Readout | Type | State in the plot data | Action |
|---|---|---|---|
| `natural-resources-debate-2026-07` | **Formal** (SC debate) | **1 floored delegation**: Russia, score 0 / net −16. Not published — lives in `readouts/` only | Full migration when next touched: build the counter-rubric, rescore Russia (and check China / US / Pakistan, whose sheet deductions netted to ≥ 0) from the transcript |
| `un80-briefing-2026-07` WP18 / WP21 / WP22 | **Informal** (GA plenary briefing, 29 Jul) | **Nothing floored, no negatives.** Lowest score 22/100 | **No counter-rubric, and nothing to retire.** Already conforms to the informal rule. Leave alone |
| `sg-townhall-2026-07`, `sg-regional-dialogue-2026-08`, `ai-sustdev-panel-public-2026-07` | Informal | No negatives in plot data | No action |

The UN80 packages are one informal plenary briefing (`transcripts/un80-wp18-funding/INDEX.md`).
Their scoring sheets do carry per-quote deductions, but every delegation still nets positive, so
the published pages need no change — the deductions only ever moved delegations within the
positive range. If those sheets are ever reworked, re-read each flagged fragment against the
"Questions are not counter-markers" rule first: at an informal briefing most of them are design
questions, not stated opposition.

**So the retroactive backlog is one readout, not four**, and it is the unpublished one.

## Why this exists

Reader feedback on the Sudan/ICC readout (July 2026): the cluster map suggested DRC and Liberia
were stronger ICC supporters than Denmark, France and the UK. The cause was structural — dots
were placed inside their categorical camp column by random hash jitter, so within-camp position
was noise that readers interpreted as signal. The fix: score each speaker's position intensity
from the transcript with a citable-evidence rubric, and order dots inside each camp by that
score. The scoring confirmed the reader's read with large margins (FR 94, DK 92 vs LI 43,
DRC 25) and surfaced a real nuance the camp coding had hidden (UK ties Liberia — institutional
warmth vs enforcement demands, different registers at similar intensity).

The lesson to carry forward: **within-camp ordering is part of the analytical claim.** Either
it is evidence-based, or it must not be displayed.

**Second round of the same lesson (August 2026), on the same file.** Reader feedback again, from
an analyst using the click-to-compare panel: comparing Russia with the United States showed seven
rows of "not stated in this meeting" and a couple of flat deductions. The rubric could say what
those delegations failed to say and nothing about what they argued. The cause was structural
again — A–G only score support for the pole, so they measure one side rather than the divide, and
a flat deduction records that an actor objected without recording *what* it objected with.

The fix is the mirrored counter-rubric below, and the generalised lesson is the same one a level
up: **whatever the plot asks the reader to compare has to be evidence-scored on both sides of the
comparison.** A zero that could mean either "silent on this" or "argued the opposite at length"
is not a measurement, it is an absence of one.

Two smaller rules fell out of that round and are worth stating plainly, because both produced
real errors in a published readout:

- **Sentiment is not direction.** "Serious concern", "negative message", "deeply troubling" are
  valence words that attach as readily to *do more* as to *do less*. Score the position, never
  the tone.
- **Direction does not belong on a magnitude axis.** Any axis that means "how much" must not also
  encode "which way", or the actors who argued hardest against the pole land where the reader
  reads "barely spoke".

## The generalization model: invariant method, instantiated content

The method must work for any chaired, sequential-statement hearing — Security Council, GA
plenary, ECOSOC consultation, Beyond GDP, trade, ecology. What stays fixed and what changes:

**Invariant (never changes):**
- The scoring is always anchored on the hearing's defining divide — the divide the readout's
  Executive Summary already names (house format §1). On formal meetings **both poles of that
  divide are scored**, and the plotted axis is *how much an actor put on the record*, either
  way. On informal meetings only the proposal is scored, and the axis is engagement with it.
- Seven indicator **archetypes** (below), mirrored into seven counter-archetypes on formal
  meetings. They are categories of *speech behavior*, not of topic, which is why they transfer.
- All scoring rules, validation steps, artifacts and rendering specs in this guide.

**Instantiated per hearing (derived from the transcript before scoring anyone):**
- Which pole is scored and which direction is "stronger".
- The concrete content of each archetype in *this* debate.
- Anchor quotes per scoring band, pulled from this hearing's own transcript.
- Weight adjustments when an archetype has no expression in this debate.

## The seven archetypes

Each is a generic speech behavior. The middle column is its generic definition; the right
column shows the Sudan/ICC instantiation as the worked example. These score support for the
**scored pole**; the mirrored counter-archetypes that score the opposing pole are in the next
section, and on formal meetings you build both.

| # | Archetype (generic) | Max | Sudan/ICC instantiation |
|---|---|---|---|
| A | **Endorsement of the pole object** — how emphatically the actor embraces the institution / proposal / idea at the scored pole ("unwavering/absolute" > formulaic > thanks-only > silent) | 20 | "unwavering support for the Court as an independent judicial institution" |
| B | **Defense against detractors** — the actor spends capital defending the pole object against attacks, interference or de-funding (distinct from merely endorsing it) | 10 | "regrets interference… by way of sanctions against the court" |
| C | **Maximal ask** — the actor makes the strongest concrete demand present anywhere in this debate. Find the ceiling empirically: what did the most forward-leaning speaker ask for? Binary-ish: full points or 0 | 15 | "extend the jurisdiction of the ICC to the entire territory of Sudan" |
| D | **Specificity of commitment** — names, numbers, named instruments, named individuals vs. generic abstractions; specific + demanded > specific > generic > silent | 15 | names al-Bashir/Hussein/Haroun + "arrest and surrender" |
| E | **Obligation framing** — the ladder is fully generic: *obligation* (14–15) > *calls on all actors* (11–13) > *welcomes/encourages* (6–10) > *takes note* (2–5) > silent/critical (0) | 15 | "cooperation with the Court is an obligation. It's not an option" |
| F | **Material commitment** — money, resources, staffing, concrete instruments offered or demanded for the pole object | 10 | "support the Court's Trust Fund for Victims" |
| G | **Speech-act verb register** — dominant verbs toward the pole object across the whole statement: demand/urge/must (11–15) > call/ensure (6–10) > welcome/encourage (3–5) > take-note (0–2). Cite 2–3 verbs verbatim | 15 | "urges… immediately cease · unacceptable" vs DRC's "takes note ×3" |

Weights default to A20 B10 C15 D15 E15 F10 G15 = 100. If an archetype has no expression in
this hearing (e.g. no material dimension exists in the debate), drop it, redistribute its
weight across the rest, keep the sum at 100, and **document the adjustment in the scoring
sheet**. Minimum five positive indicators — below that the rubric can't differentiate and the
plot should stay categorical.

## The mirrored counter-rubric (FORMAL meetings only — mandatory since 2026-08-06)

> **Applies to formal meetings only.** Security Council meetings, formal debates, negotiations —
> sessions where contested text is being resolved and **divergence is the finding**. Classify the
> meeting first (project `CLAUDE.md` → "Formal vs informal meetings"); the transcript INDEX
> already records it.
>
> **Do not build a counter-rubric for an informal meeting.** Briefings, consultations, town halls
> and informal dialogues exist to float ideas and find common ground, so **convergence is the
> finding**. A For/Against axis imposes a divide the room was not having: at a first presentation
> there is nothing to argue against yet, and scoring reactions as opposition would misread a
> clarifying question or a design concern as a stated position. Informal readouts keep the single
> A–G rubric, where the score means *engagement with the proposal* and the plot is an **Engagement
> Plot**, not a Fault-Line Plot. The existing rule stands unchanged: **a request for
> clarification never earns a negative marker.**
>
> If an informal session does contain genuine stated opposition, that is a signal the session was
> misclassified — recheck the classification rather than reaching for the counter-rubric.

**A–G measure one pole, not the divide.** Every indicator only scores if an actor wants *more*
of the pole object — more mandate, more cooperation, more commitment. That makes A–G a
*defend-rubric*: scoring high necessarily means far-right, and an actor arguing the other way
has nowhere to score. Flat "negative markers" were the old patch and they failed twice over:

1. **A zero became ambiguous.** On the Sudan/ICC file, Bahrain scoring 0 on indicator B meant it
   never raised the Court's independence. Russia scoring 0 on B meant it attacked the Court's
   independence at length. Same number, opposite meanings, and no way to tell them apart.
2. **The counter-case went unrecorded.** Russia delivered the second-longest statement of that
   meeting — 198% of the median — and the flat markers captured it in three fragments. Rescoring
   from the transcript found four further argued positions nobody had scored. In the readout's
   click-to-compare panel, the delegations that argued hardest rendered as seven rows of "not
   stated in this meeting", which is the opposite of what the panel is for.

**So score both poles.** Mirror each archetype at the same weight, giving a second rubric that
also sums to 100. An actor scores on whichever pole it argued; most score on only one.

| # | Counter-archetype (generic) | Max | Sudan/ICC instantiation |
|---|---|---|---|
| A′ | **Counter-endorsement** — rejects the pole object's standing, or asserts the opposing principle as the one that governs | 20 | "a body that long ago ceased to have anything in common with genuine justice" |
| B′ | **Performance / integrity critique** — attacks the pole object's record or conduct, as distinct from rejecting it in principle | 10 | "only one conviction… still at the appeals stage" |
| C′ | **Maximal counter-ask** — the strongest concrete demand on this side present anywhere in the debate. Find the ceiling empirically. Binary-ish | 15 | "consider the withdrawal of the Darfur file… from the ICC" |
| D′ | **Specificity of the counter-case** — named instruments, resolutions, jurisdictional grounds, named alternative fora vs. generic objection | 15 | "Resolution 1593 provided for… the situation as it existed in 2002" |
| E′ | **Non-obligation framing** — the obligation ladder inverted: cooperation framed as optional, conditional on consent, or excluded outright | 15 | "importantly exclusive of the ICC" |
| F′ | **Material counter-commitment** — money, campaigns, defunding, named action taken or demanded against the pole object | 10 | "a full-on diplomatic campaign working beside every ally" |
| G′ | **Counter-pole verb register** — dominant verbs toward the pole object: reject/dismantle/withdraw (11–15) > warn/insist (6–10) > note concerns (3–5) > silent (0–2) | 15 | "pseudo-court · we will not stand idly by · merely an obvious obstacle" |

Three binding rules:

- **A counter-marker must constrain the pole object's reach.** Criticism that it moves too
  *slowly*, or does too *little*, is pressure to do more — it scores on G, never on the counter
  rubric. This is not hypothetical: Sudan carried a −4 marker for "this delay… sends a negative
  message to the victims", a line already credited +13 under G. It was matched on negative
  *sentiment* rather than on position. **Sentiment is not direction.**
- **One fragment scores once.** A withdrawal call is C′ *or* F′, never both. A first draft of the
  Sudan counter-rubric triple-counted one Russian sentence across C′, D′ and F′ and inflated the
  total by 15 points. Where a fragment could serve two indicators, score the one it most directly
  evidences and leave the other null.
- **Same evidentiary standard as A–G.** One verbatim quote per scored indicator, "not stated"
  where absent, never inferred from silence, anchors set before scoring anyone.

**Two rubrics, never three.** A tempting third rubric for the "conditional" or middle camp was
considered and rejected on the Sudan file: China, Pakistan, Bahrain and Somalia argue the *same
direction* as the rejectors — sovereignty first, national courts first — with less force and no
delegitimising language. They land mid-to-low on the counter-rubric, which represents them
correctly as a weaker instance of one direction. A third rubric would invent a distinction the
transcript does not support and force arbitrary boundaries between "conditional" and "against".
The three-way grouping belongs on the **Y axis**, which already does it well.

### Derived quantities

```
P          = sum(A..G)     how much was argued FOR the pole object
N          = sum(A'..G')   how much was argued AGAINST it
net        = P - N         direction, and how far off neutral
on record  = P + N         total put on the record, either way   <- the X axis
```

**X is `on record`, not `net` and not `|net|`.** Netting makes an actor that argued both ways
cancel toward the middle: China put 41 points of material on the Sudan record and would have
plotted at |−17| = 17, reading as though it had barely spoken. Summing keeps both poles visible.
Direction moves to the Y axis and the camp colour, where it belongs.

**The floor rule is retired.** There is no `score = max(0, net)` any more. Flooring existed only
to keep negative nets displayable, and it destroyed information — Russia (−45) and Bahrain (−3)
both showed 0. With two rubrics nothing is negative and nothing compresses.

**Band cut points do not change**: 0–39 / 40–66 / 67+ on `on record`. A column means the same
thing across every readout in the series.

**On informal meetings there is no second rubric, so `N` is always 0 and `on record` collapses to
`P`.** The arithmetic is identical and the columns still mean "how much was put on the record" —
the formula generalises, only the counter-rubric is gated. Label the axis for what it measures
there: engagement with the proposal, not argument for or against it.

**State the direction wherever a number appears.** Tooltip, aria-label, evidence panel, glance
table. A reader who sees 94 and 75 with no direction reads them as the same argument.

### Questions are not counter-markers (rule added 2026-07-30; still binding)

**A request for clarification never scores on the counter-rubric.** A counter-indicator requires
a *stated position against* the pole object — a boundary condition, a challenge to the premise,
a call to halt or shrink. A delegation asking how something will work has not taken a position
against it.

Detailed, technical questions often signal the opposite: the delegation read the documentation
closely enough to find the operational gaps. Reading that as opposition inverts the finding, and
it penalises exactly the delegations most engaged with the substance.

This rule is why the counter-rubric is gated to formal meetings. An informal briefing is mostly
questions and design concerns by construction, so a rubric that scores opposition would fire on
the room's ordinary behaviour.

- **Test to apply:** can you quote a fragment where the actor states an objection, condition or
  limit? If yes, score it. If the only evidence is an interrogative, the counter-rubric stays 0.
- **Score the support markers in the same statement.** A question-heavy turn usually still
  carries A and E material ("we appreciate", "you can count on our support") — the original
  UN80 pass missed Rwanda's *"you can count on our support going forward"* while penalising its
  question, which is how a supportive delegation landed at the bottom of the scale.
- **Where the engagement itself is the finding**, say so in the readout prose rather than
  encoding it as intensity — the rubric measures advocacy, not attention.

Origin: reader feedback from a policy user present at the 29 July 2026 UN80 briefing, who
identified Rwanda as materially misread. Correction logged in
`research/un80-wp18-position-scores-2026-07.md` (Rwanda 28 → 37).

## Procedure

### Step 0 — Preconditions
- Attributed transcript exists (`transcripts/<silo>/*_attributed.md`).
- Normal Stage-3 analysis is done: consensus, fault lines, and the **defining divide with its
  poles and anchors** are already identified. Scoring decomposes an existing analytical claim;
  it never substitutes for the analysis.

### Step 1 — Declare the axis
Write into the scoring sheet header: **the meeting type (formal / informal)**, the defining
divide, its poles, which pole carries the A–G rubric (usually the crowded camp, where gradation
matters most), and the direction of "stronger".

**Formal meetings:** opponents of the pole are scored on the mirrored counter-rubric A′–G′, not
on deductions. Declare both poles here.

**Informal meetings:** single rubric, no counter-rubric — see the gate above. Declare the
proposal being reacted to, and note that the score means engagement with it.

### Step 2 — Instantiate the rubric (before scoring anyone)
Prompt to execute:

> For each archetype A–G, state what it concretely looks like in THIS debate, and pull 2–3
> verbatim anchor fragments from the transcript spanning the range (one strong, one weak or
> absent). Find the ceiling for C by locating the strongest concrete demand any speaker makes
> toward the pole. Drop archetypes with no expression in this debate (min. 5 remain),
> redistribute weights to sum 100, and record the final rubric table with anchors in the
> scoring sheet. Do all of this before assigning any actor a single point.
>
> THEN, if and only if this is a FORMAL meeting: repeat the whole exercise for the counter-rubric
> A′–G′, instantiated for the opposing pole, at the same weights. Find C′'s ceiling the same way
> — the strongest concrete demand made on that side by anyone. Confirm each counter-indicator
> would constrain the pole object's reach rather than merely criticise its pace.

Anchors from the data, scoring against the anchors — that separation is what makes the
numbers defensible.

### Step 3 — Score actor by actor
Prompt to execute, per actor:

> Read the actor's full statement (all their turns). For each indicator on BOTH rubrics, either
> cite a verbatim fragment that earns the points, or record "not stated". Never infer a position
> from context, bloc membership, or what the actor said in other meetings (project
> no-fabrication rule). Compute P, N, net and on-record. No flooring. While scoring, do NOT look
> at other actors' totals, prior camp codings, or any expected ordering — score against the
> anchors only (anti-anchoring rule).
>
> Check as you go that no fragment has been scored under two indicators, on either rubric.

**Score the counter-rubric from the full statement, never from the old markers.** If you are
migrating a readout that already has flat negative markers, reopen the transcript. On Sudan/ICC
the markers held three fragments for a delegation whose statement supported seven scored
indicators — redistributing them would have left four rows empty and half-fixed the panel. This
is judgment-heavy work: run it on Opus, like the rest of this file.

Special cases (all from the reference implementation):
- **Briefers / principals** (the Deputy Prosecutor, the SG): not scored — they *are* the pole
  object or its author; definitionally maximal. Shown on the plot unscored (dashed border),
  pinned rightmost, labeled "briefer — not scored".
- **Invited parties** (host state, petitioners): scored on the same axis, keep their own
  colour. Note asymmetries in the evidence (Sudan demanded *new* warrants while staying silent
  on surrendering existing ones — the note field exists for exactly this).
- **Silent actors** — spoke, but never addressed the divide at all: not scored and excluded
  from ordering (grey/"silent", per existing house convention). Distinct from `on record 0`,
  which means "addressed the divide and scored nothing on either rubric" — rare, and worth
  re-reading the statement before accepting it.
- **Mixed actors** — score on both rubrics. This is a finding, not a problem: on Sudan/ICC,
  Somalia demanded outstanding arrest warrants (P 24) while insisting Sudanese leadership takes
  precedence (N 12). Never collapse a mixed actor to whichever pole is larger; the panel shows
  both sections and the second one is usually the interesting half.
- **Ties**: keep them (report as "7="); order tied dots alphabetically. A tie between actors
  with different profiles is a finding, not an error — say which registers differ.

### Step 4 — Validate
1. **Pairwise consistency**: within the largest camp, re-read each adjacent pair side by side
   and give a holistic verdict (consistent / flag). Log every pair in the scoring sheet.
2. **Verbatim spot-check**: grep ≥5 evidence quotes against the transcript; exact match,
   expected exactly 1 occurrence each. Record PASS/FAIL per quote.
   - **Quote the transcript, never the source doc.** The natural-resources run failed one
     check on a top-of-scale DRC quote that had been lifted from the source analysis's own
     *paraphrase* of the six principles rather than from the transcript. It read plausibly
     and sat in the highest-scoring actor's archetype A. Score was unaffected once the
     verbatim wording replaced it, but a scoring sheet quoting an intermediate document is
     a fabrication risk with a clean-looking surface. Grep every evidence quote, including
     ones that feel already-verified because you met them during analysis.
   - Normalise whitespace and curly quotes before comparing (see
     `pipeline/quote-verification.md` §7b on compounding differences).
3. **External expectations** (reader feedback, prior coding, your own priors): compare only
   *after* scoring. Where the scored order disagrees, **flag it in the sheet and explain the
   evidence — never tune scores to match the expectation.** (In the reference case the flag —
   UK ties Liberia — became the most interesting finding.)
4. **Record limitations**: length bias (longer statements have more chances to hit indicators on
   *either* rubric — flag, don't correct), the no-false-equivalence caveat where a counter-rubric
   was built, interpretation drift for non-English statements.
5. **Measure statement length and set the brevity marker.** Count **words per actor** from the
   attributed transcript and compute the median across scored actors. Anyone under **70% of that
   median** carries the `brief` marker. Do this as a mechanical pass over all actors *before*
   reading any scores, and record the full table in the scoring sheet.

   **Run the script — never estimate (mandatory 2026-08-14).**

   ```
   python pipeline/word_counts.py transcripts/{track}/{file}.json \
       --exclude "{chair code},{procedural speaker}" --md
   ```

   Paste its markdown table into the scoring sheet verbatim; it emits the per-actor counts, the
   median, the 70% threshold and the `brief` flags already computed. `--exclude` takes
   case-insensitive substrings of the speaker label and keeps chairs and procedural speakers out
   of the median while still listing them — a co-chair with 27 short procedural turns otherwise
   drags the median down and hands `brief` chips to delegations that spoke a normal amount.

   The 2026-08-13 run wrote this table from estimates ("~900", "~550", median "~550", threshold
   385) while claiming "actual word counts". The real numbers were median **451** and threshold
   **316** — so its `brief` list was wrong in both directions, and Panama sat on a coin-flip
   ("brief? NO (550 at threshold)") that the counted figure resolves outright. A `~` anywhere in
   a word-count column is a defect; `pipeline/verify_scoring_sheet.py` fails the sheet for it.
   - **Word count, not duration.** Speaking rates vary enough to invert the ranking: in the
     reference case Liberia spoke 7:56 (third-longest by the clock) at 73 wpm against a ~130 wpm
     room average, delivering only median words. Duration would have called it expansive.
   - **Suppress the marker where there is no length norm** — free-form panels, side events, or
     any format where actors are not expected to speak comparably. The marker only means
     something when a roughly equal turn is the convention, as at a Security Council briefing.
   - Never add or drop the marker per actor after seeing scores. It is computed from the
     transcript, not chosen to explain a result.

### Step 5 — Render

**The X-axis IS how much the actor put on the record, banded into three columns (mandatory since
2026-07-29; redefined from "the score" to `P + N` on 2026-08-06).** X always means the same thing:
**left = argued least, right = argued most**, regardless of which side was argued. Keep the house
3×3 grid — the columns are quantity bands, not a camp typology. Y stays a toggleable categorical
dimension and is where **direction** lives.

**Do not put direction on X.** An intermediate version banded on `|net|` and, before that, on the
signed score. The signed version placed the two delegations that argued hardest *against* the
Sudan/ICC Court in the leftmost "low intensity" column — inverting the reading in exactly the
cases an analyst most needs to see. `|net|` fixed the inversion but still cancelled mixed actors
toward the middle. `P + N` is the version that holds: France (94 for) and the United States
(75 against) share the right-hand column, and the row they sit on says which way they argued.
Column labels are quantity words ("Much on record"), never valence words.

**Keep the grid; it was the labels that were wrong.** A first version of this fix replaced the
columns with a single continuous axis. That over-corrected, and the reason is the point of the
whole product: **these readouts exist to surface clusters** — around positions, opposition,
proposed solutions, problem consensus. A continuous axis shows *ranking*; a grid shows
*clustering*, and clustering is the deliverable. Ranking is only the means that makes the columns
honest. Bands give both. Label each column with its point range (`0–39 points` etc.) and deepen
the cell tint left to right so the ranking reads before anyone parses a label.

**Read every cell as a cluster claim, and look hardest at the unlikely bedfellows.** A cell
holding actors who are political opposites is the highest-value output the plot produces — on the
natural-resources readout Russia and the United States share the bottom-left cell on consumer-side
obligation, arriving there by opposite routes. Name findings like that in the prose; the plot
makes them visible, but the reader should not have to derive them alone.

**Cut points are fixed thirds of the 0–100 scale** (≤39 / 40–66 / 67+), not quantiles.
Quantiles would force a third of the room into "high" however weakly it argued. Record the
resulting split in the scoring sheet; a lopsided split is a finding about the debate, not a
reason to move the cuts. Within a cell, order by `on record` ascending, ties alphabetical,
unscored briefers pinned rightmost — the same quantity as the column, so within-cell order
reinforces the band instead of contradicting it.

**Camp is carried by colour, never by horizontal position.** Camp and quantity are different
questions and they do not reliably agree — see the failure below. Ship the legend lead line
"Colour = camp (which kind of position). Position = how much was argued."

> **Why the columns stopped being camps.** On the natural-resources readout the X-axis was
> originally the four-camp typology (sovereignty-first · bridge · standards-first · market-deals)
> with dots score-ordered *inside* each column. The bridge camp sits visually in the middle but
> scored highest — the DRC at 94 and Colombia at 86 against the European standards camp at 62–65,
> because the producing states demanded a *new* binding framework while the standards camp asked
> for better implementation of the existing one. A reader scanning left-to-right reads the
> horizontal axis as a scale whatever the caption says, so the layout asserted the opposite of
> the finding. Column position was categorical, within-column position was scored, and nothing
> on the page distinguished them. **A within-column ordering is only legible when the column
> order happens to agree with the score — which is luck, not design.** Sudan/ICC got away with
> it because its X-axis (defend → conditional → delegitimise) happened to track its score.
>
> The fix is intensity bands, not the loss of the grid: same 3×3 geometry, columns that rank.

- Placement inside a cell: `x = 8% + 84%·i/(n−1)` (single dot at 50%); `y = 50%` for n ≤ 4,
  alternating 34%/68% for n ≥ 5. **Rank-spaced, not value-spaced** — the rubric is ordinal, and
  spacing by score value collapses mid-scale clusters (on natural resources it put eight pairs
  under 4% apart, with France and the UK exactly coincident). No `Math.random()` anywhere.
- Unscored briefers keep their camp colour, render dashed, and pin rightmost in their cell.
- **No within-cell gradient bar.** Earlier versions drew a weak→strong ramp under each cell.
  Once the columns are intensity bands with deepening tint, the bar restates what the shading
  already says and reads as clutter — removed 2026-07-29 on reader feedback. The column tint is
  the only ordering cue the plot needs.
- A delegation's **column must be identical across every Y-axis setting** — the band comes from
  its score, not from the Y dimension. Assert this.
- Dot labels are short fixed country codes (DK, FR, DRC…), never auto-derived initials
  (auto-initials collided: China/Colombia both "C").
- Tooltip: name + "`N` on record · argued for/against the pole" + one-line stance + click hint.
  No rank in the tooltip. The direction clause is not optional — see "State the direction" above.
- **Brevity marker (`brief` chip)** for actors flagged in Step 4.5 — a solid left-facing
  speaking-head glyph (12–13px) plus the word "brief" in a rounded pill. It sits **beside the
  delegation name, always visible**, everywhere the name appears in the plot's orbit: axis rows,
  "Scores at a glance" table, and evidence-panel heading. Nothing is added to the dot itself, and
  no slot is reserved for non-brief actors.
  - **Always visible, never hover-only** (decided 2026-07-29). A hover-gated marker hides the
    caveat from touch users, from anyone scanning rather than exploring, and from anyone reading
    the glance table without touching the plot. The caveat has to travel with the name.
  - Adding it to the hover tooltip as well is optional and harmless, but it never *replaces* the
    inline chip.
  - No partial fill, no fill-level encoding. A half-filled silhouette is illegible at this size
    and would stack a second quantitative signal on top of the camp colour, which already runs
    close on CVD separation. The word carries the meaning; exact counts live in the panel.
  - Default pill is dark-on-light (`#f2f1ec` ground, `#ddd9d0` border, `#5b6470` ink). If it is
    also shown on the dark tooltip, invert it there (light glyph and text on a translucent white
    ground) so it does not punch a bright hole in the panel.
  - Legend, once, under the plot: "*brief* — this delegation spoke well below the meeting median,
    so fewer indicators had the chance to appear."
  - The chip's claim is about **speaker behaviour**, not our data quality: choosing to say little
    is itself a finding.
  - **Copy the glyph below verbatim. Do not redraw it.** Two hand-drawn attempts on 2026-07-29
    rendered as a bulb rather than a human profile (cranium too round, nose too small, neck too
    narrow) and were pure noise at 14px. The path is tuned for a 20×20 viewBox at 12–13px.

    ```html
    <!-- once per page, near the top of <body> -->
    <svg width="0" height="0" style="position:absolute" aria-hidden="true" focusable="false"><defs>
      <!-- Brevity marker glyph: solid left-facing speaking head. viewBox 0 0 20 20 -->
      <path id="head" d="M9.05 1.6
        C5.35 1.6 2.5 4.35 2.5 7.75
        c0 1.55 0.5 2.85 1.35 3.95
        c0.35 0.45 0.5 0.85 0.5 1.4
        L4.35 18.4
        L7.6 18.4
        L7.6 15.5
        c0 -0.45 0.35 -0.8 0.8 -0.8
        L10.6 14.7
        c0.5 0 0.85 -0.35 0.85 -0.85
        L11.45 12.6
        l1.15 -0.35
        c0.45 -0.15 0.55 -0.6 0.2 -0.9
        L11.5 10.2
        l0 -1.25
        c0 -0.35 0.2 -0.6 0.5 -0.75
        l1.15 -0.5
        C12.55 4.2 11.1 1.6 9.05 1.6 Z"/>
      <g id="wv"><path d="M15.2 6.9 L18.1 5.5 M15.8 9.8 L19.0 9.8 M15.2 12.7 L18.1 14.1"/></g>
    </defs></svg>
    ```

    ```css
    .brief-chip {
      display: inline-flex; align-items: center; gap: .28rem;
      font-size: .68rem; line-height: 1; color: #5b6470;
      background: #f2f1ec; border: 1px solid #ddd9d0; border-radius: 999px;
      padding: .18rem .5rem .18rem .38rem; vertical-align: middle;
      white-space: nowrap; font-weight: 500;
    }
    .brief-chip svg { flex: none; display: block; }
    /* inverted on the dark tooltip so it doesn't punch a bright hole */
    #dot-float-tip .brief-chip {
      background: rgba(255,255,255,.14); border-color: rgba(255,255,255,.28); color: #f0ece6;
    }
    ```

    ```js
    // `currentColor` lets the same markup invert on the dark tooltip via CSS alone
    const BRIEF_CHIP = `<span class="brief-chip"><svg width="12" height="12" viewBox="0 0 20 20" aria-hidden="true"><use href="#head" fill="currentColor"/><use href="#wv" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>brief</span>`;
    const briefFor = d => d.brief ? BRIEF_CHIP : '';
    ```
- Click: **two-slot breakdown comparison** — first click fills the left slot, second the
  right; thereafter the ⇄-armed slot (oldest first) is replaced, and clicking the other
  slot's ⇄ re-arms it. Each slot: on-record total, the P/N split with direction in words, and
  **both rubrics as labelled sections** with points + verbatim quote + mini bar per indicator.
  Full layout rules in Step 5e — that step exists because this panel is the highest-value
  surface on the page.
- **Scores at a glance**: a collapsible section below the plot — rank (ties as "7="),
  colour swatch, name, then **On record · For · Against · Net**, one-line profile. Unscored
  actors as dashed rows.
- Both rubric tables + caveats (ordinal claim, length bias, no-false-equivalence, ASR source)
  go on the readout's **methodology page**, and a one-line pointer sits in the plot's
  how-to-read guide.

### Step 5a — The how-to-read box (mandatory since 2026-07-29)

Every plot ships with a "How to read this plot" box above it. **It is a key, not an essay.**
An earlier version ran three dense prose paragraphs and was rejected as unscannable — a reader
could not tell what they were meant to take from it. Four parts, in this order:

1. **A four-cell grid, one row per channel**, each a short label + one or two sentences:

   | Cell | Says |
   |---|---|
   | `LEFT → RIGHT` | what the score measures, in plain words, ending "Low → medium → high." |
   | `COLOUR` | which grouping the colour encodes, and that it is a *separate* question from intensity |
   | `UP / DOWN` | "Whatever you pick in the dropdown." |
   | `CLICK A DOT` | see the quotes behind the score; click a second to compare |

2. **A tinted callout naming the clusters worth looking for** — the one thing you want the
   reader to leave with. Name the actors, colour them, say what makes the grouping surprising.
   This is where the unlikely-bedfellows finding goes.
3. **One line of fine print**: who is scored and who isn't, briefers unscored and why, rank
   spacing, and the methodology link.
4. Nothing else. No paragraph restating the rubric — that is what the methodology page is for.

Target the whole box at **120 words or fewer**. If it grows past that, content is leaking in
from the methodology page.

### Step 5b — Write the axis explainers for someone who has never read this file

**Assume no domain knowledge.** Reader feedback on the natural-resources plot: *"I don't know
what consuming and refining states means. This line is grammatically correct, but I don't
actually know what it's trying to convey."* That is a content failure, not a wording failure —
if the reader cannot decode a band label, the dimension carries nothing.

Each Y dimension's explainer has three parts:

1. **A question as the heading**, not a noun phrase. "Who has to follow the rules — only the
   countries that dig the minerals up?" beats "Consumer-side obligation."
2. **A lead paragraph that defines the machinery in concrete terms** before using any of it.
   Prefer a verbatim line from the hearing itself: the SG's "extracted in one country,
   transported through another, processed elsewhere and ultimately sold on global markets"
   defines a mineral supply chain in one sentence, on the record, with no fabrication risk.
   Then name the links in everyday terms — the mining country, the refiner, the country buying
   the phones and batteries.
3. **Band rows that answer the heading question directly** — "Duty on buyers too" /
   "Not stated" / "Producers only", each with a one-line gloss. A reader must be able to
   reconcile every band label against the paragraph above it without inferring anything.

The same plain-language test applies to the **dropdown options and the axis title**: they are
the labels a reader meets first. Ship the question, not the jargon.

**Test:** hand the plot to someone who did not attend the meeting. If they cannot say what a
band means in their own words, rewrite it.

### Step 5c — Verify the plot geometrically, then look at it

Markup assertions do not catch layout failures. Run both passes — every bug below shipped a
valid, balanced DOM.

Automated, in a headless browser, over **every Y-axis setting**:

```js
// per cell: no dot may escape its bounds, and no two dots may overlap
r.left < cellRect.left || r.right > cellRect.right   // horizontal clip
r.top  < cellRect.top  || r.bottom > cellRect.bottom // vertical clip
overlapX > 2 && overlapY > 2                          // collision
```

Also assert: a delegation's **column is identical across Y settings**; the dot count matches
the cast; every scored actor has a stance line and a profile; no duplicate country codes.

With two rubrics, also assert:

- **Every dot's column matches its own arithmetic** — recompute `P + N` from the rendered
  aria-label and check it against the band the cell is in.
- **`P + N` equals the on-record figure** in the glance table, per actor, and the plot, tooltip,
  aria-label and table all agree.
- **Direction agrees with the sign of `P − N`** everywhere it is stated.
- **Every counter-rubric quote appears verbatim in the attributed transcript.** Run this as a
  mechanical string sweep, normalising quotes and dashes. On the Sudan/ICC migration this caught
  two fragments where an ellipsis had been used to join text that is contiguous in the source —
  invisible on screen, and non-verbatim.
- **No fragment scored under two indicators**, on either rubric.

Bugs this caught, all of which looked fine in the markup:

- **Dots clipping at cell edges.** Dots are centred on their `left%` by
  `transform: translate(-50%,-50%)`, so a dot at 94% hangs half outside. Fix by insetting
  `.cell-inner`, not by changing the placement formula.
- **Collision logic that only compares against the previous dot.** Two actors sharing an exact
  x (both briefers pinned right) defeat simple lane alternation. Track the last x *per lane*.
- **A row-5 element colliding with the X-axis title**, which also occupies row 5.
- **`min-height` on `.cell` silently overriding shorter grid rows** — the grid declared 148px
  and rendered 200px.
- **`\uXXXX` escapes inside a JS string written by the build script** reaching the browser
  literally: `Council’s` rendered as `COUNCIL - S`. Prefer plain ASCII in strings that get
  uppercased as axis titles; punctuation reads as a stray dash at wide letter-spacing anyway.

Then **take a screenshot and look at it.** The gradient bar, the clipped briefer dots and the
broken apostrophe were all found by eye after the automated pass came back clean.

### Step 5c-bis — Observers: score them, band them separately (settled 2026-08-13)

**Decide this with the table first — the two rules below look alike and are not (added
2026-08-14).** Step 3 says briefers are *not scored*; this step says observers *are* scored and
banded. On the 2026-08-13 Ukraine Arria the builder read both, took the newer one, and put six
briefers on the same axis as the delegations — including the OHCHR ASG whose report **is** the
proposal the axis measures. Its own checkpoint-A plan had them unscored; the retry reversed it
without noticing. One question separates the cases:

> **Does this speaker present, author, or embody the thing the axis measures engagement with?**

| Answer | Ruling | Path |
|---|---|---|
| **Yes** — briefer, principal, the proposal's author, the Office the axis is about | **Not scored.** Definitionally maximal: they cannot "engage with" their own proposal | Step 3 special cases — dashed border, pinned rightmost, labelled "briefer — not scored" |
| **No, but they do not get the floor on member-state terms** — invited observer, trade body, regional org called once for a set-piece | **Scored, banded separately.** | This step — own Y band, dashed separator, observer grey |
| **No, ordinary participant** | **Scored normally.** | Main plot |

The Sudan/ICC Prosecutor is row 1. The INC Tax ICC/ATAF/AU observers are row 2. A first-person
witness giving testimony that the room is convened to hear is row 1, not row 2 — testimony is the
object under discussion, not a position taken on it.

**Observers are scored on the same rubric, and plotted in their own Y band, below a dashed
separator. Never rank an observer against a member state on the X axis.**

Settled on the INC Tax readout, where ICC — a business association — scored 89 and landed beside
Liechtenstein at 96 and above Israel at 80, reading as though a trade body outweighed two states.

The reason is structural, not political. **The X axis measures how much an actor put on the
record, and the two groups do not get the floor on the same terms.** An observer is called once
and delivers a prepared set-piece. A delegation speaks briefly, is answered, and comes back. On
the INC Tax meeting:

| Group | Median words |
|---|---|
| Observers (ICC, ATAF, AU) | 507 |
| Member states | 300 |

So an observer starts with more of the thing the axis counts. ICC scored 9 points above Israel on
a statement **10× longer**. Meanwhile Nigeria — speaking for the African Group's 54 members —
scored **0**, because it argued a different fault line. A reader comparing across the groups
learns who held the floor longest, not who carries weight in the room.

Both wrong answers were rejected:

- **Dropping observers** hides load-bearing argument. ATAF's warning that "unchecked optionality
  have potential to derail this work" is one of the sharper statements of the no-optionality case,
  and ICRIT supplies the entire technical defence of gross-basis taxation.
- **Leaving them mixed in** asserts a comparison the axis cannot support.

Procedure:

1. Score observers on the same rubric, with the same anchors and evidentiary rules.
2. Plot them below a dashed separator, labelled so the split is visible without reading prose.
3. Give them the neutral observer grey in the plot **and in prose**, per Step 5d — an observer
   never carries a camp colour, even when its position is plainly in a camp.
4. Split the "Scores at a glance" table the same way, and say in the note that a score in one
   table is not comparable with a score in the other.
5. State the word-count evidence for the split on the page. It is what makes the rule legible
   rather than arbitrary.

**Distinguish this from the Sudan/ICC case.** There the ICC Prosecutor was left *unscored*
because the axis measured support for her own Office, making her definitionally maximal. That is
a different problem — the actor being the subject of the axis — and it keeps its own answer.
Here the observers are ordinary participants in the debate; only the floor-time asymmetry is at
issue, so they stay scored and get banded.

### Step 5d — Camp palette and colour-in-prose (mandatory since 2026-07-29)

The scannability rule in the project `CLAUDE.md` requires that **any grouping that matters gets a
visual encoding, applied everywhere the group is named** — not only in the plot. For a scored
readout that means a delegation's camp colour follows its name through the executive summary,
consensus, fault lines, outliers, talking-point attributions and reference cards, **matching its
dot exactly**. That is what lets a reader scan for "who was in the delegitimise camp" without
reading a sentence.

Security Council camp palette, CVD-validated 2026-07-29:

| Camp | Hex | Meaning |
|---|---|---|
| defender | `#1f5fb0` | defends the pole object |
| rejector | `#b03333` | delegitimises / would withdraw it |
| sovereign | `#8a6d1c` | conditional, sovereignty-first middle |
| african | `#2a7f8f` | regional grouping, kept visually distinct |
| party | `#197b5a` | invited party / host state |
| icc | `#8a3d8f` | briefer / principal, unscored |

Two colours changed on 2026-07-29 when the palette first had to work as text:
`african` was `#b27406`, too close to the sovereignty gold (ΔE 20.2) once both ran as prose, and
`icc` was `#6a4ba8`, which collapsed against defender blue under simulation (ΔE 5.2 protan — the
genuine worst pair, not the red/gold pair an earlier note named). Worst-case separation across the
palette went from ΔE 5.2 to 11.5 protan, 7.3 to 12.3 deutan.

Rules when instantiating this for a new hearing:

- **Run the CVD check before shipping, not after.** Simulate deuteranopia and protanopia over
  every pair and look at the *worst* pair, which is rarely the one you expect. A candidate that
  looks fine in normal vision can collapse: burnt orange `#c2571a` was rejected at ΔE 3.7 protan.
- **Ship a colour key under the first coloured block** (the executive summary), naming each group
  in words so the encoding is never colour-only.
- **CSS specificity bites here.** A generic rule such as `.fault-line strong { color: var(--ink) }`
  or `blockquote footer { color: var(--muted) }` outranks a bare `.c-defender`. Write the explicit
  overrides (`.fault-line strong.c-defender { … }`) and then **assert the computed colour in a
  headless browser** — markup that looks right can still render grey.
- Reuse these hex values for any Security Council hearing so colour means the same thing across
  the series. A different body may need different camps; keep the count at six or fewer and
  re-run the check.

Copy the working CSS/JS from the reference implementation rather than rewriting it.

### Step 5e — The evidence panel with two rubrics (formal meetings, since 2026-08-06)

**The click-to-compare panel is the highest-value surface on the page.** It is where an analyst
works out how to approach a delegation — what it is for, what it is against, in its own words.
Build it accordingly.

Each slot renders **both rubrics as labelled sections**, dominant pole first:

```
RUSSIAN FEDERATION                    UNITED STATES OF AMERICA
70 on record                          75 on record
for 0 · against 70 · argued against   for 0 · against 75 · argued against

▸ THE CASE AGAINST THE COURT    70    ▸ THE CASE AGAINST THE COURT    75
  A′. Counter-endorsement    18/20      A′. Counter-endorsement    17/20
     "ceased to have anything in           "perverse attempts to encroach
      common with genuine justice"          on the sovereignty of states"
     ████████████████████                  ██████████████████
  B′. Performance critique   10/10      B′. Performance critique    4/10
     "only one conviction… still at        "falsely asserting so-called
      the appeals stage"                    jurisdiction beyond its mandate"
     ████████████████████                  ████████
  … five more rows                      … five more rows

▸ THE CASE FOR THE COURT         0    ▸ THE CASE FOR THE COURT         0
  Not argued in this meeting.           Not argued in this meeting.
```

Rules:

- **Dominant rubric first** — whichever of P, N is larger, so a delegation leads with what it
  actually argued.
- **Collapse the empty side to one line** ("Not argued in this meeting"). Never render seven
  "not stated" rows: that filler *is* the defect this design fixed, and it makes the delegation
  that spoke longest look like the one that said least.
- **Distinguish absence from opposition.** Inside a populated rubric, an unscored indicator reads
  "not stated in this meeting". Where an actor argued the opposite of an indicator, point at the
  other section rather than leaving a bare zero.
- **Bars scale within their own rubric, never across the two.** A shared scale would assert that
  arguing for an institution and arguing for its dismantling are the same kind of claim.
- Section headers carry the pole colour (defender / rejector from the camp palette) so the two
  rubrics are distinguishable at a glance.
- The **glance table** carries four numeric columns — `On record` · `For` · `Against` · `Net` —
  and no floored score. This is where a reader checks the arithmetic behind a dot.

**Say what the rubrics do not claim.** Scoring the counter-pole positively means an actor opposing
the pole object can score as highly as one defending it, and the plot puts them in the same
column. State plainly on the methodology page that this measures *how much was argued*, not that
the two positions are equivalent. The separate bar scales do the visual half of that work.

### Step 6 — Before publication
Every quote used in the evidence panel that hasn't already been audio-verified must pass the
Stage-4 quote-verification pipeline (`pipeline/quote-verification.md`). The scoring sheet
marks already-verified quotes ✓AV; everything else is ASR-verbatim only until checked.

## Artifacts

| Artifact | Path pattern | Contents |
|---|---|---|
| Scoring sheet | `research/{slug}-position-scores-{YYYY-MM}.md` | Meeting type, axis declaration, **both instantiated rubrics with anchors** (formal) or one (informal), score table (P + N + net + on-record + per-indicator), per-actor evidence with verbatim quotes, **a pairwise log per camp including the counter-camp**, spot-check results, limitations |
| Plot data | embedded in the readout HTML | `{ name, code, bloc, <bucket fields>, stance, ev:{A..G:{p,q}}, evn:{A..G:{p,q}}, unscored? }` — no stored `score` or `net`: both are derived from the two rubrics at render time, so the page cannot drift from its own evidence |

## Kickoff prompt (paste into a fresh session)

> Read `projects/UN AI Readouts/CLAUDE.md`, then `pipeline/position-scoring.md`, and run
> position scoring for `<attributed transcript path>`. The Stage-3 analysis is in
> `<readout/source.md path>`.
>
> **First state whether this is a formal or informal meeting** (check the transcript INDEX). If
> formal, you are building **two mirrored rubrics** — A–G for the scored pole and A′–G′ for the
> opposing one, each summing to 100. If informal, build the single engagement rubric and no
> counter-rubric. Instantiate from the transcript before scoring anyone (Step 2), then score
> every speaker on every indicator of every applicable rubric and validate — including the
> verbatim spot-check, quoting the transcript and never the source doc's paraphrase. Check that
> no fragment is scored twice.
>
> Then build the plot: 3×3 grid, X = **how much each actor put on the record** (`P + N`, fixed
> thirds, point ranges under each column head, tint deepening left to right), Y = the toggleable
> categorical dimension **carrying direction**, camp carried by **colour only**. Ships with the
> two-section evidence-panel comparison view, glance section (On record · For · Against · Net),
> `brief` chips, and camp colours carried into the prose. Never floor a score; never put
> direction on X; state the direction wherever a number appears.
>
> Write the how-to-read box as a **key, not an essay** (four-cell grid + cluster callout +
> one line of fine print, ~120 words), and write every axis explainer for a reader with **no
> domain knowledge** — question as the heading, machinery defined in concrete terms, ideally
> from a verbatim line in the hearing itself.
>
> Name the **clusters**, especially any cell holding political opposites — that is the product.
>
> Copy the whole plot — geometry, data model, evidence panel, chip, palette — from
> `readouts/sudan-icc-briefing-2026-07.html`. Never redraw the chip glyph or invent palette
> hexes. Verify geometrically in a headless browser across **every** Y setting, confirm every
> counter-rubric quote appears verbatim in the transcript, **then look at a screenshot**. Use Opus.

## Migrating an existing readout (retroactive, added 2026-08-06)

Worked once, on Sudan/ICC. Roughly a session per readout; the rescore dominates.

1. **Classify the meeting.** Transcript INDEX. Informal → skip to step 7, there is no
   counter-rubric to build.
2. **Instantiate A′–G′** for this hearing's opposing pole (Step 2), with anchors from the
   transcript.
3. **Rescore every actor carrying negatives, from the full statement** — not by redistributing
   the existing markers. This is the step that pays: on Sudan/ICC the markers held three fragments
   for a delegation whose statement supported seven scored indicators.
4. **Audit every retired flat marker against the direction test.** Each one must constrain the
   pole object's reach. Sudan carried a −4 for a line pressing the Court to move *faster*, matched
   on negative sentiment; deleting it changed a published score. Expect at least one such find.
5. **Swap the data model**: `neg:[]` → `evn:{}`, delete stored `score`/`net`, derive P / N / net /
   on-record at render. Give non-counter-scoring actors an all-null `evn`.
6. **Rewrite the render layer**: X to `P + N`, panel to two sections, glance to four numeric
   columns, guide box, axis label, tooltip and aria to state direction.
7. **Retire the floor rule** and any prose describing it.
8. **Re-verify**: every new quote verbatim against the transcript; no clipping or overlap on every
   Y setting; each dot's column matches its arithmetic; plot, tooltip, aria and glance agree.
9. **Log what moved** in the methodology page's Corrections section. Orderings *will* change —
   the US overtook Russia on the Sudan/ICC counter-rubric because indicator scoring rewards a
   named material commitment where deduction-counting did not. Report it, don't tune it away.
10. **Re-read the prose** for claims tied to the retired model: floored scores, "bottom of the
    scale", anything ranking delegations.

Sequence the work: sheet first, then data, then render, then prose. Each step's output is the next
step's input, and doing render before data means rewriting it twice.

## Known limitations (state them, don't hide them)

- **Ordinal, not interval.** An additive rubric supports "stronger/weaker than". Rank-order
  the dots evenly; keep the numbers in the evidence layer.
- **Length bias.** Brevity scores lower even when tone is firm, because fewer indicators get the
  chance to appear. Not corrected — correcting would mean inferring what an actor *would* have
  said. Disclosed instead: affected actors carry the `brief` marker (Step 4.5), and the full
  word-count table goes in the scoring sheet.
- **No false equivalence claim.** Scoring the counter-pole on its own 100-point rubric means an
  actor opposing the pole object can score as highly as one defending it, and the plot puts them
  in the same column. That is a claim about *how much was argued*, never a claim that the two
  positions are equally legitimate. Say so on the methodology page, and keep the evidence-panel
  bars scaled within each rubric rather than across them.
- **Length bias now runs on both poles.** A long statement has more chances to hit counter
  indicators too — Russia spoke at 198% of the Sudan/ICC median. Same disclosure, same `brief`
  marker, no correction.
- ~~**Floor compression.**~~ Retired 2026-08-06 with the floor rule itself. Under two rubrics
  nothing is negative and nothing compresses to 0; `on record` separates actors the floor used to
  collapse (Russia and Bahrain both displayed 0 under the old model, and now read 70 and 20).
- **Palette.** Camp colours must survive a colour-vision check because they now carry meaning in
  running text as well as in the plot — see "Camp palette" in Step 5. Colour is never the sole
  carrier in any case: dots print country codes, camp is also column position, and the key names
  every group in words.
- **Format dependency.** Like the whole pipeline, this assumes chaired sequential statements.
  Free-flowing panels need adjustment before any of this applies.
