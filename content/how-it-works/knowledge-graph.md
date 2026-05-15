---
id: knowledge-graph
title: The Knowledge Graph
sidebar_label: Knowledge Graph
---

# The Knowledge Graph

The CRG (Contextual Resource Graph) is the core of ConCRG. It's a structured representation of everything ConCRG knows about your application — pages, elements, workflows, roles, and the relationships between them.

---

## RDF Triples

All knowledge is stored as **RDF triples**: `subject → predicate → object`. Every fact about your app is expressed in this form.

![Knowledge Graph Triples](/img/knowledge-graph-visual.svg)

Each triple carries metadata — which training source produced it, a confidence score, and when it was created. When two sources produce conflicting facts about the same thing, the triple with the highest confidence wins.

---

## What the Knowledge Graph Contains

The graph is assembled into a structured map of your entire application:

- **Pages** — every route in your app, with its title, UI elements, required roles, and parent/child relationships
- **Sections** — logical groupings of related pages (e.g. "CRM", "Billing", "Settings")
- **Roles** — who can access what, including role hierarchy and inheritance
- **Workflows** — named multi-step sequences users can follow to complete tasks
- **Relationships** — how all of the above connect to each other

---

## Persistence

Knowledge is stored locally with no external dependencies required to get started. For production deployments, knowledge optionally syncs to a Neo4j graph database — enabling persistent storage, faster queries, and change tracking over time. Sync can be full (rebuild) or incremental (delta only).

---

## Graph RAG vs. Flat RAG

ConCRG uses **Graph RAG** rather than flat vector search. Here's why it matters:

| Question | Flat RAG | Graph RAG |
|---|---|---|
| "What is an invoice?" | Retrieves invoice description chunk | Same |
| "How do I get to invoices?" | May not find navigation path | Traverses `navigates_to` edges |
| "What roles can delete contacts?" | Keyword match on "delete" | Traverses `requires_role` edges on Delete elements |
| "What's the flow from deal to invoice?" | May miss multi-hop connection | Follows relationship chain |

Graph RAG excels at **relational** and **navigational** queries — exactly the kind users ask about complex enterprise software.

---

## Viewing the Knowledge Graph

During training, the sidecar UI shows a live count of facts extracted per source — pages discovered, workflows mapped, and total triples. You can inspect, filter, and delete triples from the Knowledge tab of the training panel.
