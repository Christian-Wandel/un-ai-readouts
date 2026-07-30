# UN AI Readouts

AI-assisted briefings that turn UN meeting transcripts into short, interactive HTML readouts — the consensus, the fault lines, and who said what, each stance traceable to the record.

**→ Live index: https://christian-wandel.github.io/un-ai-readouts/**

Open the index and pick a readout. Each is a single self-contained HTML page grouped by track (the speaking body or the theme), with its own source note and a linked methodology page.

## What's here

- `index.html` — the waypoint landing page (routes to every readout).
- `readouts/` — the readout pages.
- `methodology/` — one methodology page per readout: how it was made, sources, and limits.
- `pipeline/` — reference notes the methodology pages link to (e.g. the quote-verification method).

## Method, briefly

Readouts are built from the UN [transcripts.un.org](https://transcripts.un.org/en) automatic-speech-recognition (ASR) transcript — a strong draft, **not** an official UN record. Position-critical quotes are checked against the meeting audio (UN Web TV) before publication. Every stance is verbatim from the transcript; positions a delegation did not state are marked, never inferred.

Earlier UN80 readouts are hosted separately (linked from the index).

Built with Claude Code. Not affiliated with the United Nations.
