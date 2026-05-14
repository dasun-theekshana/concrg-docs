---
id: knowledge-graph
title: The Knowledge Graph
sidebar_label: Knowledge Graph
---

# The Knowledge Graph

The CRG (Contextual Resource Graph) is the core IP of ConCRG. It's a structured representation of everything ConCRG knows about your application — pages, elements, workflows, roles, and the relationships between them.

---

## Data Model

### RDF Triples

All knowledge is stored as **RDF triples**: `subject → predicate → object`.

```
"Invoice page"   → "navigates_to"    → "/invoices/new"
"Delete button"  → "requires_role"   → "admin"
"Deal"           → "belongs_to"      → "Pipeline"
"Settlement"     → "has_workflow"    → "Bond Settlement Workflow"
"Create Invoice" → "requires"        → "Contact"
```

Each triple carries metadata:
- `source` — which training source produced it (probe, code, docs, chat)
- `confidence` — 0.0 to 1.0 score
- `route` — which page it was extracted from
- `timestamp` — when it was created
- `category` — semantic category

**Deduplication:** Exact matches on (subject, predicate, object) are collapsed. On conflict, the triple with the highest confidence and most recent timestamp wins.

### ApplicationSitemap

Triples are assembled into a structured `ApplicationSitemap`:

```typescript
interface ApplicationSitemap {
  appId: string;
  version: number;
  generatedAt: string;
  lastUpdated: string;

  pages: Record<string, Page>;
  sections: Section[];
  roles: Role[];
  roleHierarchy: RoleInheritance[];
  workflows: Workflow[];
  triples: Triple[];
}
```

Each **Page** captures:
```typescript
interface Page {
  route: string;
  title: string;
  category: string;
  elements: UIElement[];
  parent?: string;
  children: string[];
  breadcrumbs: string[];
  requiredRoles: string[];
  visibilityConditions: string[];
  discoveredVia: 'probe' | 'code' | 'docs' | 'chat';
}
```

---

## Persistence

Knowledge is stored at two levels:

### 1. Local JSON Store
The Train Service maintains `data/{appId}/knowledge.json` — an in-memory array flushed to disk. Fast reads, no dependencies.

### 2. Neo4j Graph (optional)
For production deployments, triples sync to Neo4j via the Graph Service. This enables:
- **Cypher queries** — traverse relationships efficiently
- **Graph RAG** — retrieve context paths, not just flat chunks
- **Path-finding** — answer "How do I get from A to B?" queries
- **Persistent history** — track knowledge changes over time

### Sync

```typescript
// Triggered from sidecar UI or programmatically
await autoSyncManager.syncToGraph();
```

Sync can be full (rebuild from scratch) or incremental (delta since last sync).

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

During training, the sidecar UI shows a live count of triples:

```
Knowledge Base
─────────────────────────
Pages discovered:     24
Workflows mapped:      8
Triples extracted:   412
  ├── Probe:         198
  ├── Code:          147
  ├── Docs:           52
  └── Chat:           15
```

You can inspect, filter, and delete triples from the Knowledge tab of the training panel.
