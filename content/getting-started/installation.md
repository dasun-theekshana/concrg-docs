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

---

## Packages

Install the ConCRG connector for your framework:

```bash npm2yarn
npm install @crg/connector-react @crg/connector-react-v2
```

| Package | Purpose | Required? |
|---|---|---|
| `@crg/connector-react` | React provider (`CRGProvider`) | Yes |
| `@crg/connector-react-v2` | Enhanced toolbar UI with FIND/LEARN/PRACTICE/REMEMBER cards | Recommended |

---

## Train Service

The Train Service is a local backend that handles:
- Interface analysis and knowledge extraction
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

---

## Graph Service (Optional)

The Graph Service provides persistent knowledge graph storage and advanced querying. It is optional but recommended for production deployments.

**Requirements:**
- Python 3.10+

```bash
pip install crg-graph-service
ANTHROPIC_API_KEY=sk-ant-... crg-graph-service
```

---

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `ANTHROPIC_API_KEY` | Yes | Your Anthropic API key |
| `PORT` | No | Train Service port |
| `GRAPH_SERVICE_PORT` | No | Graph Service port |

---

## Next Steps

- [Quick Start →](/getting-started/quick-start) — Get running in 5 minutes
