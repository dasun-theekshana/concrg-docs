---
id: training-sources
title: Training Sources
sidebar_label: Training Sources
---

# Training Sources

ConCRG learns your application through four complementary sources. They run in parallel during training and each contributes a different angle of knowledge.

---

## Overview

| Source | Input | What It Learns | LLM Used? |
|---|---|---|---|
| **Probe** | Live running app | Pages, navigation, UI elements, workflows | Yes — screen analysis |
| **Code** | TypeScript source | Routes, data types, permissions, API contracts | Hybrid — AST + LLM |
| **Docs** | Documentation URL | Concepts, feature descriptions, workflows | Yes — per-page extraction |
| **Chat** | Conversation with PM/developer | Domain rules, business logic, edge cases | Yes — conversational |

You can run all four together or pick a subset. Each source produces RDF triples that are merged into the shared knowledge store.

---

## Probe

The Probe is ConCRG's autonomous DOM explorer. It runs inside the host app's browser context — not in a separate Playwright session — so it sees the actual rendered UI with real authentication and data.

**How it works:**
1. Starts at the app's root route
2. Serializes the DOM tree (labels, roles, nav links, interactive elements)
3. Captures a screenshot
4. Sends the DOM snapshot + screenshot to Claude for analysis
5. Extracts page understanding, elements, workflows, and triples
6. Follows navigation links and repeats for each discovered route

**Crawler modes:**
- `legacy` — Breadth-first queue walker
- `stategraph` — Models the app as a state machine; discovers transitions, modal states, and conditional UI

**Configuration:**
```typescript
crawlerMode: 'stategraph',
crawler: {
  maxNodes: 50,
  maxActionsPerNode: 10,
  maxInstancesPerRoutePattern: 3,
}
```

[Deep dive: Probe training →](/training/probe)

---

## Code

The Code source analyzes your TypeScript source files to extract structural knowledge that's hard to observe from the DOM alone — route definitions, interface shapes, permission guards, and API contracts.

**What it extracts:**
- Route declarations and their corresponding components
- TypeScript interfaces (data models)
- JSX structure and prop relationships
- API endpoint handlers and their contracts
- Permission/role guards on routes and components

**Two modes:**
- **Deterministic** — TypeScript AST parsing (fast, precise)
- **LLM-enhanced** — Claude interprets complex handlers and business logic (`useAgents: true`)

**Setup:**
```typescript
const config = {
  sourceCodePath: '/absolute/path/to/your/src',
  useAgentsV2: true,   // recommended for complex codebases
};
```

Or upload a zip file via the training panel for remote analysis.

[Deep dive: Code analysis →](/training/code-analysis)

---

## Docs

The Docs source crawls your existing documentation website and extracts product knowledge from it. Useful for bridging the gap between what your app can do (Probe + Code) and the business-level concepts behind it (Docs).

**How it works:**
1. Starts at the `docsUrl` you configure
2. Discovers all linked pages within the same domain
3. Extracts article content using `@mozilla/readability`
4. Converts HTML to Markdown
5. Sends each page to Claude for knowledge extraction (batched)
6. Streams progress in real time as pages are processed

**Setup:**
```typescript
const config = {
  docsUrl: 'https://docs.yourproduct.com',
};
```

**Streaming response:** The docs crawl streams NDJSON progress updates so you can see pages being processed in real time.

[Deep dive: Docs crawling →](/training/docs-crawl)

---

## Chat

The Chat source lets you teach ConCRG directly through conversation. This is ideal for domain knowledge that isn't visible in the UI or documented anywhere — business rules, edge cases, terminology, "why does this work this way?" context.

**Example conversation:**
```
You: In our system, a "settlement" only applies to bond trades,
     not equity trades. The UI looks the same but the validation
     rules are completely different.

ConCRG: Got it. I'll record that settlement workflows for bonds
         have different validation from equity. Can you tell me
         what the key differences are?
```

Each exchange is converted into knowledge triples and added to the store.

[Deep dive: Chat training →](/training/chat)

---

## Combining Sources

The four sources are **complementary**, not redundant:

- **Probe** discovers what exists and how to navigate it
- **Code** reveals the underlying data model and permissions
- **Docs** provides the business-level concepts and terminology
- **Chat** adds tacit knowledge that no automated source can capture

The more sources you use, the richer and more accurate the knowledge graph becomes.
