---
id: docs-crawl
title: Docs Crawl Training
sidebar_label: Docs Crawl
---

# Docs Crawl Training

The Docs source crawls your existing product documentation and extracts the business-level knowledge it contains. This bridges the gap between what your app can do (discovered via Probe and Code) and the concepts and context behind it (captured in your docs).

---

## How It Works

![Docs Crawl Flow](/img/docs-crawl-flow.svg)

Progress streams in real time as pages are processed — you can watch the knowledge graph grow as each article is read.

---

## Setup

In the training panel, enable **Docs** as a source, enter your documentation URL, and click **Start Training**.

---

## What It Learns

| Knowledge Type | Example |
|---|---|
| Feature concepts | "Settlements are reconciled at end of day, not in real time" |
| Terminology | "A 'stage' in our pipeline represents a qualification step" |
| Workflow descriptions | Step-by-step process for completing a deal |
| Prerequisites | "You must have a Contact before creating an Invoice" |
| Constraints | "Bulk export requires the 'data export' permission" |

---

## Tips

- **Use your public docs site** — extraction works best on publicly accessible documentation
- **Run after Probe** — Docs fills in the "why" after Probe discovers the "what"
- **Re-crawl after doc updates** — Trigger a re-crawl whenever you publish significant changes
- **Skip API reference docs** — Low signal for end users; focus on feature and workflow guides
