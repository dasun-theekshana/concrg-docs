---
id: installation
title: Installation
sidebar_label: Installation
---

# Installation

## System Requirements

| Requirement | Minimum |
|---|---|
| Node.js | 18.0.0+ |
| React | 18.0.0+ |
| Package manager | npm, pnpm, or yarn |
| Anthropic API key | Required for knowledge extraction |
| Neo4j (optional) | 5.x — for persistent knowledge graph |

---

## Packages

ConCRG is a monorepo with four packages. You only need to install what you use:

| Package | Purpose | Required? |
|---|---|---|
| `@crg/connector-core` | Framework-agnostic core (MessageBus, Probe, Sessions) | Auto-installed |
| `@crg/connector-react` | React provider (`CRGProvider`) | Yes |
| `@crg/connector-react-v2` | Enhanced toolbar UI with FIND/LEARN/PRACTICE/REMEMBER cards | Recommended |
| `@crg/sidecar-ui` | Lightweight training sidecar (Preact) | Auto-installed |

### Install

```bash npm2yarn
npm install @crg/connector-react @crg/connector-react-v2
```

---

## Train Service

The Train Service is a local Node.js backend (Hono) that handles:
- DOM snapshot analysis via LLM
- Code analysis (TypeScript AST + Claude)
- Documentation crawling and extraction
- Conversational knowledge input
- Knowledge store management

### Running the Train Service

**Option A: npx (recommended for getting started)**

```bash
ANTHROPIC_API_KEY=sk-ant-... npx @crg/train-service
```

**Option B: Install globally**

```bash
npm install -g @crg/train-service
ANTHROPIC_API_KEY=sk-ant-... crg-train-service
```

**Option C: Add to your project**

```bash
npm install --save-dev @crg/train-service
```

Add to `package.json`:

```json
{
  "scripts": {
    "crg": "crg-train-service"
  }
}
```

The service runs on **port 3001** by default. Override with `PORT=3002`.

---

## Graph Service (Optional)

The Graph Service provides persistent Neo4j storage and Graph RAG querying. It is optional but recommended for production deployments.

**Requirements:**
- Python 3.10+
- Neo4j 5.x running locally or remotely

```bash
pip install crg-graph-service
ANTHROPIC_API_KEY=sk-ant-... NEO4J_URI=bolt://localhost:7687 crg-graph-service
```

Runs on **port 3002** by default.

---

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `ANTHROPIC_API_KEY` | Yes | Your Anthropic API key |
| `PORT` | No | Train Service port (default: 3001) |
| `GRAPH_SERVICE_PORT` | No | Graph Service port (default: 3002) |
| `NEO4J_URI` | No | Neo4j connection URI |
| `NEO4J_USERNAME` | No | Neo4j username (default: neo4j) |
| `NEO4J_PASSWORD` | No | Neo4j password |

---

## Next Steps

- [Quick Start →](/getting-started/quick-start) — Get running in 5 minutes
- [Configuration →](/getting-started/configuration) — All `CRGConfig` options explained
