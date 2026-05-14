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

Knowledge is stored locally by the Train Service with no external dependencies required. For production deployments, knowledge optionally syncs to a Neo4j graph database, enabling persistent storage, faster queries, and change tracking over time. Sync is triggered from the training panel and can be full (rebuild) or incremental (delta only).

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
