---
id: docs-crawl
title: Docs Crawl Training
sidebar_label: Docs Crawl
---

# Docs Crawl Training

The Docs source crawls your existing product documentation and extracts the business-level knowledge it contains. This bridges the gap between what your app can do (observable via Probe and Code) and the concepts and context behind it (captured in your docs).

---

## How It Works

```
1. Start at docsUrl
         │
         ▼
2. Discover all linked pages (same domain)
         │
         ▼
3. Extract article content
   (@mozilla/readability)
         │
         ▼
4. Convert HTML → Markdown (turndown)
         │
         ▼
5. Send each page to Claude (batched)
   for knowledge extraction
         │
         ▼
6. Produce triples: concepts, workflows,
   feature descriptions, terminology
         │
         ▼
7. Stream progress in real time (NDJSON)
```

---

## Setup

```typescript
const config = {
  docsUrl: 'https://docs.yourproduct.com',
};
```

In the training panel, enable **Docs** as a source and click Start Training.

---

## What It Learns from Docs

| Knowledge Type | Example |
|---|---|
| Feature concepts | "Settlements are reconciled at end of day, not in real time" |
| Terminology | "A 'stage' in our pipeline represents a qualification step" |
| Workflow descriptions | Step-by-step process for completing a deal |
| Prerequisites | "You must have a Contact before creating an Invoice" |
| Constraints | "Bulk export requires the 'data_export' permission" |

---

## Tips

- **Use your public docs site** — readability extraction works best on public documentation (not behind auth)
- **Run after Probe** — Docs fills in the "why" after Probe discovers the "what"
- **Re-crawl after doc updates** — Trigger a re-crawl whenever you publish significant documentation changes
- **Don't include API reference docs** — Low signal-to-noise; LEARN mode users don't need endpoint schemas
