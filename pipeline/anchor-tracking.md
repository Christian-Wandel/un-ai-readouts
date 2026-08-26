# Anchor tracking (added 2026-08-25, first case: `un-funding`)

A narrower, sharper tool than the Beyond GDP topics table. That table asks "what recurs across
the sequence" — every topic, tracked broadly. Anchor tracking asks one thing: **does the room
engage this specific figure or claim, the next time it has the chance.** Use it when a single
statement is unusually load-bearing — a number that reframes what a debate is actually about —
and the interesting next-round question is not "what do people say" but "does anyone answer this."

Not every recurring session needs it. Nominate an anchor only when a reader would want to know,
going into the next meeting, "watch for whether anyone responds to X." If that sentence doesn't
write itself, the figure is probably topic-table material, not anchor material.

## Where an anchor lives

**`transcripts/<track>/INDEX.md`**, in a **Tracked anchors** table directly under the Silo profile
block — read by every future build in that track before drafting, the same way the Silo profile
already is. One row per anchor:

| Column | Content |
|---|---|
| Anchor | The claim or figures, close to verbatim, with enough of the reasoning kept that a reader who never saw the original session understands what's being tracked. |
| Planted | Which meeting first put it on the record, with the readout filename. |
| Source | Who said it, their role, and where it lives in that readout (Talking Points quote number is enough — don't duplicate the full quote here, the readout is the source of truth). |
| Tiers seen so far | Running log — empty ("none yet — planted this round") until a later round produces a hit; see tiers below. |

A track can carry more than one anchor at a time. Retire one only when it has clearly stopped
being live — the underlying question got resolved, superseded, or the sequence itself ended.

## Nominating a new anchor (Step 3 of the pipeline, right after drafting)

Ask, for any figure or claim that reframed the item during drafting: **would a reader want to know
if the next meeting responds to this?** If yes, add it to the INDEX table before the run report is
written — this is a judgment call made once, by whoever builds the readout, not a mechanical gate.

## Checking for reactions (every subsequent build in the track)

Before drafting, read the Tracked anchors table. For each open anchor, search the new transcript
for a reaction, at three tiers (loosest first, so a real hit at any tier stops the search):

1. **Direct citation** — the anchor's own numbers, or a paraphrase close enough to be unambiguous
   (e.g. "$321 million" or "just above two months" reappearing).
2. **Concept engagement, no numbers** — the delegation argues the same question the anchor raised
   (how much of core is actually discretionary; the liquidity threshold; the predetermined-formula
   point) without repeating Kuriakou's specific figures.
3. **Loose topical mention** — any statement touching the same general ground (UNDP's core/non-core
   split, budget composition, financial reporting) without clearly engaging the anchor's point.

Record every result, including a clean miss — "nobody engaged it this round" is itself the finding,
and it has to be checked and stated the same way every round for the tracker to mean anything.
Log the tier, the speaker, and the quote (or "no reaction found") in the INDEX row's "Tiers seen so
far" column, dated by meeting.

## Rendering it on the readout

A new, standalone section — not folded into Fault Lines or Talking Points, because scattering
anchor reactions into sections built for a single meeting's own argument buries the thing that
makes this useful: seeing every round's answer to the same question in one place.

Minimum shape for round 2 onward (round 1, where the anchor is only planted, does not need this
section at all — there is nothing yet to show):

- The anchor restated in full, with a link back to where it was planted.
- One row per subsequent meeting: date, tier hit (or "no reaction"), speaker, quote.
- If an anchor has been open for several rounds with no reaction, say so plainly rather than
  omitting the section — an unanswered figure is exactly the kind of finding this track exists to
  surface, not something to quietly drop.

Follow the house rendering rules (`CLAUDE.md` → Rendering rules — scannability): table with the
speaker's name in the first column where there's a cast to track, camp colour carried over if the
readout already colours that delegation elsewhere, plain language, no ranking.

## Relationship to the Beyond GDP topics table

Both track something across a sequence of meetings in the same forum. They differ in scope and
trigger:

| | Topics table (Beyond GDP) | Anchor tracking |
|---|---|---|
| Tracks | Every topic live across the sequence | One nominated figure/claim per anchor |
| Built when | Standard for a longitudinal ("active") silo | Only when a single statement is worth watching for a reply |
| Question answered | What's still at the center? | Did anyone answer this? |
| Grows by | A row per topic, a column per meeting | A row per meeting, per anchor |

A track can use either, both, or neither. `un-funding` currently has anchor tracking only; it does
not yet have enough rounds or topic breadth to justify a full topics table, and may never need one
if its rounds stay this focused.
