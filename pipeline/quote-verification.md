# Quote verification against meeting audio (targeted whisper spot-check)

The verification gate between "readout drafted" and "readout final." Verifies the
**position-critical quotes only** — the ones that land in the readout — against the
actual meeting audio. Never re-transcribes the whole session; each quote costs one
ffmpeg slice + one whisper run (~seconds each on GPU).

**Division of labour (locked, per Christian 2026-07-16):** Claude runs this entire
step autonomously — quote selection, VOD download, slicing, whisper, comparison,
status updates. The human gate is **only** the final HTML read-through. Never leave
a readout in "not yet audio-verified" state and hand it to Christian as done; run
this step first.

Proven runs: UN80 rounds 1–2 (2026-07-15, 5+6 quotes, 1 ASR garble corrected) and
S/PV.10197 Sudan/ICC (2026-07-16, 9 quotes, 0 corrections).

---

## Steps

### 1. Pick the quotes

Everything quoted verbatim in the readout — Talking Points blockquotes plus any
inline quoted phrases that anchor a fault line. Typically 5–10 windows. Merge
adjacent sentences into one window (e.g. a quote + its follow-on sentence).

### 2. Resolve the VOD + English audio flavor (Kaltura widget session, no auth)

Entry ID from the webtv URL: `webtv.un.org/en/asset/k1w/k1w95ycgte` → drop the
3-char prefix, prepend `1_` → `1_w95ycgte`. Then (Python stdlib, see
`webtv-download.md` for the full multirequest shape):

1. `baseEntry/get` on the live entry → `recordedEntryId` is the VOD
   (e.g. `1_w95ycgte` → VOD `1_c3icpgx0`).
2. `getPlaybackContext` on the VOD with `flavorTags: "all"` → flavor list.
3. **Take the flavor whose `language` is `English`.** This is the channel the
   portal ASR transcribes: floor audio when the speaker speaks English,
   interpreter audio otherwise. Do NOT take "Interlingua" (raw floor, original
   languages) — it won't match the English ASR text for interpreted speakers.

   **Select on `language == English`, never on a remembered `flavorParamsId`.**
   Most entries put English at paramsId 100, but not all: the SG town hall
   (`1_qth9jlfl`, 2026-07-23) carries its language flavors in the 2732xxx range,
   with English at **2732162** and no paramsId-100 flavor at all. Always
   enumerate the flavor list and match on language.

### 3. Download the audio

```
https://cdnapisec.kaltura.com/p/2503451/sp/250345100/playManifest/entryId/{VOD}/flavorId/{FLAVOR}/format/url/protocol/https/a.mp4
```

`curl -sL -o .tmp/audio-verify/{slug}-en.mp4 "{url}"` — audio-only flavor of a
~2 h meeting is ~160 MB. Work in the project's `.tmp/audio-verify/` (regeneratable).

### 4. Find each quote's timestamp window

The portal JSON (`transcripts/<silo>/*.json`) has word-level timestamps:
`transcript.data[] → paragraphs[] → sentences[] → {text, start, end, words[]}`.
Search sentences for a distinctive substring of each quote; take the sentence
`start`/`end`.

### 5. Slice and transcribe

```bash
ffmpeg -v error -ss {start-3} -t {dur+6} -i {audio}.mp4 -ar 16000 -ac 1 -y slice-{name}.wav
{whisper-local}/bin/Release/whisper-cli.exe -m {whisper-local}/models/ggml-large-v3-turbo.bin \
  -mc 0 -tp 0.0 -nf -nt -f slice-{name}.wav
```

whisper-local lives at `projects/whisper-local/` (whisper.cpp CUDA; the
`-mc 0 -tp 0.0 -nf` anti-hallucination flags are mandatory, `-nt` drops timestamps).

### 6. Escalation ladder for misses

First pass pads ±3 s. If whisper output doesn't contain the target sentence:

- **Wrong text at the timestamp, or fragments** → re-slice at **±15–20 s**.
- **Near-silence / only "Thank you." fillers** → probe a **100 s window**; the
  quote is usually 10–30 s away from the JSON timestamp.

Known cause: **interpretation drift.** JSON timestamps are exact for floor-English
speakers but drift 10–20 s on interpreted segments (observed on France, ~10–20 s;
Russia end-of-statement, needed a wider window). The interpreter lags the floor.

Second known cause: **re-cut recording (large, uniform offset).** The
transcripts.un.org page sometimes carries a banner like *"this transcript was made
from an earlier 1h34m version of the audio that has since been shortened to
1h15m — some parts may not match playback."* When present, the JSON timestamps are
on the **long cut** and the downloadable audio flavor is the **short cut**, so every
quote is off by a **constant multi-minute offset** (AI-at-UN 2026-07-15: −1119 s ≈
the 19-min trim). Symptom: first-pass whisper returns *coherent but wrong* content
(other real sentences from the meeting), not garble — a dead giveaway it's an offset,
not a miss. **Fix:** map audio→content at 2–3 landmark points (`ffmpeg -ss T -t 20`
+ whisper, find that text in the JSON, `offset = json_start − T`), confirm the offset
is stable at **both ends** (trim could theoretically be distributed, not front-loaded),
then slice every quote at `json_start − offset` with a ±12 s window. Verified stable
front-to-back on the AI-at-UN run (17/17 matched after correction).

### 7. Judge match / mismatch — carefully

- **Match** = the quoted words appear in whisper's output (punctuation/casing
  differences don't count).
- **Mismatch** = whisper *clearly contradicts* the ASR on the quoted words →
  correct the readout to the whisper reading and log the correction in the
  source MD (UN80 precedent: ASR "are own" → audio "Member States own").
- **Whisper can also be wrong.** On faint interpreter audio it hallucinates
  (observed: ASR "resolved by the Sudanese themselves" → whisper "the policy of
  the Soviet Union"). If whisper's reading is implausible or the audio is faint,
  re-slice; if still ambiguous, flag the quote in the source MD rather than
  "correcting" it from whisper alone. Never propagate a whisper garble into the
  readout.
- The interpreter channel carries faint courtesy fills ("Thank you.") that
  whisper picks up — sparse output means a misaligned window, not a missing quote.

### 7b. Matching gotchas (added 2026-07-28, natural-resources run)

Two false signals cost time on that run. Both are in the comparison step, not the audio.

- **Compounding differences are not mismatches.** Whisper writes "peace building"
  where the portal ASR writes "peacebuilding"; the same happens with other
  compounds. This is transcription style, not different words. **Compare on a
  whitespace-stripped, punctuation-stripped form** before declaring a miss. A
  naive substring test reports a MISS and sends you probing a 100 s window for a
  quote that was sitting at the first-pass timestamp.
- **A coherent-but-wrong 100 s probe result means the window is wrong, not the
  quote.** Already documented for the re-cut case; it also occurs with ordinary
  ±3 s misses. Before escalating further, re-slice a tight window directly at the
  JSON timestamp and read the output — the quote is often there verbatim.
- **A near-identical earlier sentence can sit inside the widened window** (added 2026-07-29,
  Sudan/ICC round 2). Delegations often state a point loosely and then restate it precisely a
  few sentences later. China's ±18 s window returned "the court should respect the judicial
  sovereignty of the states concerned" — coherent, same speaker, same topic, and *not* the
  quoted sentence, which adds "fully" and "and jurisdiction" and arrives ~20 s later. The
  failure mode is subtle because the near-match reads like a mismatch on wording and invites a
  bogus "correction". **Rule: when the window returns a paraphrase of your target rather than
  garble, probe wider before touching the quote** — the exact sentence is usually still ahead.
- **When whisper is unstable on one word, quote around it.** On faint audio
  whisper returned two different readings of the same word on two runs
  ("far"/"small" where the ASR had "power"). Neither contradicts the ASR
  consistently, so per step 7 the ASR reading stands — but the safe move for the
  readout is to **quote only the portion that verified stably** and elide the
  rest, noting the elision in the footer. Do not "correct" an ASR word from a
  whisper reading that changes between runs.

**Entry-ID shortcut.** Don't derive the Kaltura id from the webtv URL by hand —
the transcript JSON already carries it at `video.kaltura_id` (and the asset path
at `video.id`). Read it from there; the URL-derivation regex is a fallback.

### 8. Record the result in all four places

1. **Readout `asr-note`** — "The N position-critical quotes below were checked
   against the meeting audio (…) on {date} and match the recording; other
   quotations still reproduce the ASR text."
2. **Readout Talking Points intro line** — same statement, short form.
3. **Source MD `Audio verification` line** — date, VOD entry, flavor id, per-quote
   list with timestamps, corrections made (or "no corrections needed"), pointer to
   this doc. See `readouts/sudan-icc-briefing-2026-07-source.md` line 6 as template.
4. **Silo `INDEX.md` readout column** — "(N quotes audio-verified {date})".

---

## Verified-run log

| Date | Meeting | VOD / flavor | Quotes | Result |
|---|---|---|---|---|
| 2026-07-15 | UN80 SG launch (12 May 2025) | `1_etbytvxk` / `1_sr8p1tub` | 5 | all matched |
| 2026-07-15 | UN80 WG opening (16 Sep 2025) | `1_64fljgzl` / `1_pvibk8vw` | 6 | 5 matched, 1 ASR garble corrected ("are own" → "Member States own") |
| 2026-07-16 | SC 10197 Sudan/ICC (15 Jul 2026) | `1_c3icpgx0` / `1_1jj8elbu` | 9 | all matched; France quotes needed wider windows (interpretation drift) |
| 2026-07-16 | HLPF AI &amp; Sustainable Development side event (15 Jul 2026) | `1_gr3kz7u8` / `1_w51t2aqe` | 17 | all matched, 0 corrections; recording re-cut 1h34m→1h15m required a uniform −1119 s JSON→audio offset (first panel-format entry — flavor layout identical to SC, paramsId 100 present) |
| 2026-07-27 | SG town hall — candidate debate (23 Jul 2026) | `1_qth9jlfl` / `1_cr68e9m4` | 12 | all matched, **2 ASR garbles corrected**; **no paramsId-100 flavor — English was paramsId 2732162**; no drift and no offset, every quote hit on a ±3 s first-pass slice incl. the interpreted French speaker |
| 2026-07-28 | SC 10200 Natural resources governance (22 Jul 2026) | `1_4t3uh64n` / `1_4rh4nfqf` | 15 | all matched, 0 corrections. 13/15 on ±3 s; 1 at ±18 s; 1 re-sliced. **Two new lessons — see "Matching gotchas" below.** Live entry id came from the transcript JSON's `video.kaltura_id`, not URL derivation |
| 2026-07-29 | SC 10197 Sudan/ICC — **scoring-evidence round 2** (15 Jul 2026) | `1_c3icpgx0` / `1_1jj8elbu` | 20 | all matched, 0 corrections. 16/20 on ±3 s; 2 at ±18 s; 2 needed a 100–110 s probe. France drifted **~55 s** (round 1 saw 10–20 s on the same speaker — drift is not a fixed per-speaker constant, so escalate on the window, never on a remembered offset). **New gotcha: a near-identical earlier sentence can occupy the ±18 s window** (China said "the court should respect the judicial sovereignty of the states concerned" ~20 s before the quoted "…fully respect the judicial sovereignty **and jurisdiction** of the states concerned"); the wide probe is what disambiguates. Preceded by a mechanical pass confirming all 114 evidence fragments appear verbatim in the attributed transcript |
