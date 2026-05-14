---
id: overview
title: How ConCRG Works
sidebar_label: Overview
---

# How ConCRG Works

ConCRG has two distinct phases: **Training** (learning your app) and **Assist** (helping your users).

---

## The Two Phases

### Phase 1: Training

During training, ConCRG systematically builds a knowledge graph of your application. It uses up to four parallel sources:

```
┌─────────────────────────────────────────────────────────────┐
│                      Training Sources                        │
├──────────────┬──────────────┬──────────────┬────────────────┤
│    Probe     │     Code     │     Docs     │      Chat      │
│ (DOM walker) │ (TS source)  │ (web crawl)  │ (conversation) │
└──────┬───────┴──────┬───────┴──────┬───────┴───────┬────────┘
       │              │              │               │
       └──────────────┴──────────────┴───────────────┘
                              │
                    ┌─────────▼─────────┐
                    │   Train Service   │
                    │  (Claude API)     │
                    └─────────┬─────────┘
                              │ RDF Triples
                    ┌─────────▼─────────┐
                    │  Knowledge Store  │
                    │  (JSON + Neo4j)   │
                    └───────────────────┘
```

Each source produces structured **RDF triples** — `subject → predicate → object` facts about the app — that are merged into a single knowledge base.

### Phase 2: Assist

In assist mode, ConCRG answers user questions grounded in the knowledge graph:

```
User question
     │
     ▼
 Intent classification
 (FIND / LEARN / PRACTICE / REMEMBER)
     │
     ▼
 Graph RAG query
 (retrieve relevant triples + context)
     │
     ▼
 Claude generates response
 grounded in knowledge
     │
     ▼
 Mode-specific UI
 (navigation, card, walkthrough, timeline)
```

---

## The Knowledge Graph

The core data structure is the **ApplicationSitemap** — a rich model of the entire app built from training:

```
ApplicationSitemap
├── pages: Record<route, Page>
│   ├── route: "/deals"
│   ├── elements: [Button, Input, Table...]
│   ├── category: "CRM / Sales"
│   ├── parent/child routes
│   ├── requiredRoles: ["admin", "sales"]
│   └── discoverySource: "probe"
│
├── workflows: Workflow[]
│   ├── name: "Create a Deal"
│   ├── steps: [navigate, fill, submit...]
│   └── estimatedTime: "2 minutes"
│
├── roles: Role[]
│   └── [admin, sales_rep, viewer...]
│
└── triples: Triple[]
    ├── { subject: "Invoice", predicate: "requires", object: "Contact" }
    ├── { subject: "/invoices", predicate: "navigates_to", object: "/invoices/new" }
    └── { subject: "Delete button", predicate: "requires_role", object: "admin" }
```

---

## Key Architectural Principles

### 1. The Concierge Principle
ConCRG is a guest in your application. It never competes with your UI — it uses shadow DOM to contain its own interface, appears only when needed, and is always dismissable. [Read more →](/concepts/concierge-principle)

### 2. Autonomous Learning
No content authoring required. ConCRG learns your app from its source — the running DOM, your TypeScript code, and your documentation. Knowledge stays current because the source stays current.

### 3. Grounded Responses
All AI responses are grounded in the knowledge graph, not in the LLM's training data. This prevents hallucinations about your specific product.

### 4. Adaptive by Design
The same question gets a different answer depending on who is asking, what page they're on, and what they've done before. [Read more →](/concepts/adaptive-response)

---

## Next Steps

- [S-FLPR Framework →](/how-it-works/s-flpr-framework) — The five modes in depth
- [Knowledge Graph →](/how-it-works/knowledge-graph) — How triples and the sitemap work
- [Training Sources →](/how-it-works/training-sources) — Probe, Code, Docs, Chat
