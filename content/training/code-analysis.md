---
id: code-analysis
title: Code Analysis Training
sidebar_label: Code Analysis
---

# Code Analysis Training

The Code training source analyzes your TypeScript source files to extract structural knowledge that's invisible to DOM inspection — route definitions, data models, permission guards, and API contracts.

---

## What It Extracts

| Category | Examples |
|---|---|
| **Routes** | `/deals`, `/deals/:id/edit`, nested route hierarchies |
| **Data models** | `Deal`, `Contact`, `Invoice` — their fields and relationships |
| **JSX structure** | Component composition, prop relationships |
| **Permission guards** | `requiresRole('admin')`, `ProtectedRoute` wrappers |
| **API contracts** | Endpoint handlers, request/response shapes |
| **Workflow logic** | Multi-step form sequences, conditional flows |

---

## Two Analysis Modes

### Deterministic (AST)

TypeScript AST parsing — fast, precise, no LLM cost.

- Extracts route declarations exactly as defined
- Pulls TypeScript interface definitions verbatim
- Identifies `import` relationships between components
- Produces high-confidence triples

### LLM-Enhanced (Agents)

When you enable `useAgents: true`, Claude analyzes complex patterns that AST parsing misses:

- Business logic inside event handlers
- Conditional rendering driven by complex state
- Implicit workflows (multi-step interactions not in a single function)
- Natural language descriptions of what components do

```typescript
const config = {
  useAgents: true,     // AST + Claude for handlers
  useAgentsV2: true,   // V2 pipeline (more accurate)
};
```

V2 is recommended for complex codebases. It's slower but extracts significantly more knowledge.

---

## Running Code Analysis

### Option A: Local Path

Point ConCRG at your source directory:

```typescript
const config = {
  sourceCodePath: '/absolute/path/to/src',
};
```

Then in the training panel, enable **Code** as a source and click Start Training.

### Option B: Zip Upload

If the Train Service is running remotely, upload a zip of your source via the training panel: click "Upload ZIP" in the Code section.

---

## Supported File Types

- `.ts`, `.tsx` — TypeScript and TypeScript JSX
- `.js`, `.jsx` — JavaScript (limited AST analysis)

ConCRG focuses on TypeScript for strongest analysis. JavaScript files get LLM-based extraction only.

---

## Tips

- **Include your routes file** — ensure your route configuration file is in `sourceCodePath`
- **Include type definitions** — `types.ts`, `models.ts`, etc. dramatically improve knowledge quality
- **Enable V2 agents** for codebases with complex permission logic or multi-step form flows
