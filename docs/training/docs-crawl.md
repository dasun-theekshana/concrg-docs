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

Programmatically:

```typescript
messageBus.emit('docs:crawl', {
  url: 'https://docs.yourproduct.com',
});
```

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

## Streaming Progress

Docs crawl streams NDJSON progress so you see pages being processed live:

```
{"type":"started","totalPages":42,"url":"https://docs.yourproduct.com"}
{"type":"page","page":"/getting-started","triplesExtracted":8}
{"type":"page","page":"/contacts/overview","triplesExtracted":12}
{"type":"page","page":"/deals/pipeline","triplesExtracted":15}
...
{"type":"complete","totalPages":42,"totalTriples":347}
```

Events via MessageBus:

```typescript
messageBus.on('docs:crawl:progress', (data) => {
  console.log(`Crawled: ${data.page} → ${data.triplesExtracted} triples`);
});

messageBus.on('docs:crawl:complete', (data) => {
  console.log(`Done: ${data.totalPages} pages, ${data.totalTriples} triples`);
});
```

---

## Docs Crawl Events

| Event | Description |
|---|---|
| `docs:crawl` | Start a crawl |
| `docs:crawl:progress` | Page processed |
| `docs:crawl:complete` | Crawl finished |
| `docs:crawl:error` | Error on a page |

---

## Tips

- **Use your public docs site** — readability extraction works best on public documentation (not behind auth)
- **Run after Probe** — Docs fills in the "why" after Probe discovers the "what"
- **Re-crawl after doc updates** — Trigger a re-crawl whenever you publish significant documentation changes
- **Don't include API reference docs** — Low signal-to-noise; LEARN mode users don't need endpoint schemas
