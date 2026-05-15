---
id: overview
title: How ConCRG Works
sidebar_label: Overview
---

# How ConCRG Works

ConCRG has two distinct phases: **Training** (learning your app) and **Assist** (helping your users).

---

## Phase 1: Training

During training, ConCRG builds a knowledge graph of your application using up to four parallel sources — each contributing a different angle of knowledge.

![Training Flow](/img/training-flow.svg)

Each source produces structured facts about your app that are merged into a single knowledge base. The more sources you run, the richer the graph.

---

## Phase 2: Assist

In assist mode, ConCRG answers user questions grounded in the knowledge graph it built during training.

![Assist Flow](/img/assist-flow.svg)

Every response is grounded in your specific app's knowledge — not generic LLM training data. This prevents hallucinations about your product.

---

## The Knowledge Graph

The knowledge graph is a rich, structured model of your entire application. It captures:

- **Pages** — every route, its UI elements, required roles, and navigation relationships
- **Workflows** — multi-step sequences users can follow to complete tasks
- **Roles** — who can see and do what across the app
- **Relationships** — how features, pages, and data models connect to each other

All of this is built automatically during training and kept current as your app evolves.

---

## Key Principles

### The Concierge Principle
ConCRG is a guest in your application. It never competes with your UI — it appears only when needed, contains its interface in an isolated layer, and is always dismissable. [Read more →](/concepts/concierge-principle)

### Autonomous Learning
No content authoring required. ConCRG learns your app from its source — the running interface, your frontend code, and your documentation. Knowledge stays current because the source stays current.

### Grounded Responses
All AI responses are grounded in the knowledge graph, not in the LLM's training data. This prevents hallucinations about your specific product.

### Adaptive by Design
The same question gets a different answer depending on who is asking, what page they're on, and what they've done before. [Read more →](/concepts/adaptive-response)

---

## Next Steps

- [S-FLPR Framework →](/how-it-works/s-flpr-framework) — The five modes in depth
- [Knowledge Graph →](/how-it-works/knowledge-graph) — How knowledge is structured and queried
- [Training Sources →](/how-it-works/training-sources) — Probe, Code, Docs, Chat
