---
id: training-sources
title: Training Sources
sidebar_label: Training Sources
---

# Training Sources

ConCRG learns your application through four complementary sources. They run in parallel during training and each contributes a different angle of knowledge.

---

## Overview

![Training Flow](/img/training-flow.svg)

| Source | What It Learns |
|---|---|
| **Probe** | Pages, navigation paths, UI elements, workflows |
| **Code (Frontend Source)** | Routes, data models, permissions, component relationships |
| **Docs** | Concepts, feature descriptions, business-level workflows |
| **Chat** | Domain rules, business logic, edge cases, terminology |

You can run all four together or pick a subset. Each source produces facts that are merged into the shared knowledge graph.

---

## Probe

The Probe is ConCRG's autonomous interface explorer. It navigates through your live application — with real authentication and real data — and builds a map of every page it discovers.

**How it works:**
1. Starts at your app's root and navigates outward
2. Reads the page structure, interactive elements, and navigation links
3. Sends each page view to AI for analysis
4. Extracts page understanding, elements, workflows, and relationships
5. Follows links and repeats for every discovered route

The Probe sees your app exactly as your users do — no separate test environment or mocked data.

[Deep dive: Probe training →](/training/probe)

---

## Code (Frontend Source)

The Code source reads your frontend source files to extract structural knowledge that's hard to observe from the interface alone — route definitions, data models, and permission rules.

**What it extracts:**
- Every route and its corresponding page component
- Data model shapes and relationships
- Permission and role guards on routes and components
- Component structure and relationships

Point it at your frontend source directory and it handles the rest. You can also upload a zip file via the training panel.

[Deep dive: Code analysis →](/training/code-analysis)

---

## Docs

The Docs source crawls your existing documentation and extracts product knowledge from it. Useful for bridging the gap between what your app can do (Probe + Code) and the business-level concepts behind it.

**How it works:**
1. Starts at your documentation URL
2. Discovers all linked pages within the same domain
3. Extracts and converts article content
4. Sends each page to AI for knowledge extraction
5. Streams progress in real time as pages are processed

**Setup:** Provide your docs URL in the training panel or configuration.

[Deep dive: Docs crawling →](/training/docs-crawl)

---

## Chat

The Chat source lets you teach ConCRG directly through conversation. Ideal for domain knowledge that isn't visible in the UI or documented anywhere — business rules, edge cases, terminology, and the "why" behind product decisions.

**Example:**
```
You: In our system, a "settlement" only applies to bond trades,
     not equity trades. The UI looks the same but the validation
     rules are completely different.

ConCRG: Got it. I'll record that settlement workflows for bonds
         have different validation from equity. Can you tell me
         what the key differences are?
```

Each exchange is converted into knowledge facts and added to the graph.

[Deep dive: Chat training →](/training/chat)

---

## Combining Sources

The four sources are **complementary**, not redundant:

- **Probe** discovers what exists and how to navigate it
- **Code (Frontend Source)** reveals the underlying data model and permissions
- **Docs** provides the business-level concepts and terminology
- **Chat** adds tacit knowledge that no automated source can capture

The more sources you use, the richer and more accurate the knowledge graph becomes.
