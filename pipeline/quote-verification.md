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
3. **Take the `language: English` flavor (`flavorParamsId` 100).** This is the
   channel the portal ASR transcribes: floor audio when the speaker speaks
   English, interpreter audio otherwise. Do NOT take "Interlingua" (raw floor,
   original languages) — it won't match the English ASR text for interpreted
   speakers.

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
