---
id: architecture
title: Architecture
sidebar_label: Architecture
---

# Architecture

ConCRG is composed of four layers: the in-browser connector, two backend services, and a persistent graph database.

---

## System Overview

```
┌───────────────────────────────────────────────────────────────────────────┐
│  Host Application (Any React SPA)                                         │
│                                                                           │
│  ┌─────────────┐  ┌────────────────────────────────────────────────────┐  │
│  │  <App />    │  │  CRG Connector (TypeScript)                        │  │
│  │  (Host UI)  │  │                                                    │  │
│  └─────────────┘  │  ┌──────────┐  ┌──────────┐  ┌────────────────┐  │  │
│                   │  │ Context  │  │  Event   │  │  In-Browser    │  │  │
│  Wrapped by:      │  │ Detector │  │Intercept.│  │  Probe         │  │  │
│  <CRGProvider>    │  └──────────┘  └──────────┘  └────────────────┘  │  │
│                   │                                                    │  │
│                   │  ┌──────────┐  ┌──────────┐                       │  │
│                   │  │ Session  │  │ Message  │                       │  │
│                   │  │ Manager  │  │   Bus    │                       │  │
│                   │  └──────────┘  └──────────┘                       │  │
│                   │                                                    │  │
│                   │  ┌──────────────────────────────────────────────┐ │  │
│                   │  │  Sidecar UI (Shadow DOM)                     │ │  │
│                   │  │  Preact: Training Panel | Assist Toolbar     │ │  │
│                   │  └──────────────────────────────────────────────┘ │  │
│                   └────────────────────────────────────────────────────┘  │
└───────────────────────────────────────────────────────────────────────────┘
          │ HTTP (Train mode)                    │ HTTP (Assist mode)
          ▼                                      ▼
┌─────────────────────────┐       ┌──────────────────────────────────────┐
│  Train Service          │       │  Graph Service                       │
│  (Hono, TypeScript)     │       │  (FastAPI, Python)                   │
│  port :3001             │       │  port :3002                          │
│                         │       │                                      │
│  • Session management   │       │  • Neo4j sync engine                 │
│  • DOM snapshot analysis│       │  • Graph RAG orchestrator            │
│  • Code analysis        │       │  • Cypher query engine               │
│  • Docs crawling        │       │  • Access checker (role-based)       │
│  • Chat extraction      │       │                                      │
│  • LLM orchestrator     │       │                 │ Bolt protocol      │
│  • Knowledge store      │──────▶│                 ▼                   │
│    (JSON + in-memory)   │ sync  │  ┌──────────────────────────────┐   │
└─────────────────────────┘       │  │  Neo4j (:7687)               │   │
                                  │  │  Knowledge Graph (CRG)       │   │
                                  │  └──────────────────────────────┘   │
                                  └──────────────────────────────────────┘
```

---

## Package Structure

```
crg-platform/
└── packages/
    ├── connector-core/      # Framework-agnostic core (zero runtime deps)
    │   ├── message-bus.ts   # Internal pub/sub (EventEmitter pattern)
    │   ├── context-detector.ts
    │   ├── event-interceptor.ts
    │   ├── session.ts
    │   ├── sidecar-mount.ts
    │   └── probe/
    │       ├── index.ts     # ProbeOrchestrator
    │       ├── dom-walker.ts
    │       ├── element-extractor.ts
    │       ├── exploration-planner.ts
    │       └── screenshot.ts
    │
    ├── connector-react/     # React adapter (~2.7KB)
    │   └── CRGProvider.tsx
    │
    ├── connector-react-v2/  # Enhanced toolbar UI
    │   ├── CRGToolbar.tsx
    │   └── cards/
    │       ├── ResponseCard.tsx
    │       ├── FindCard.tsx
    │       ├── LearnCard.tsx
    │       └── PracticeCard.tsx
    │
    ├── sidecar-ui/          # Preact training sidecar (~13KB)
    │   ├── App.tsx          # Train mode
    │   ├── AssistApp.tsx    # Assist mode
    │   └── components/
    │
    └── train-service/       # Hono backend (port 3001)
        ├── routes/
        │   ├── session.ts
        │   ├── probe.ts
        │   ├── knowledge.ts
        │   └── chat.ts
        ├── llm/
        │   ├── orchestrator.ts  # Claude API wrapper
        │   └── prompts.ts
        └── store/
            └── knowledge-store.ts
```

---

## Tech Stack

| Layer | Technology | Purpose |
|---|---|---|
| Core Library | TypeScript 5.x | Framework-agnostic connector |
| React Integration | React 18+ | `CRGProvider` wrapper |
| Training Sidecar | Preact 10.x | Lightweight sidecar UI (~13KB) |
| Assist Toolbar | React + react-markdown | Enhanced FLPR toolbar |
| Train Service | Hono + Node.js | Knowledge extraction backend |
| LLM Client | Anthropic SDK | Claude API calls |
| HTML Processing | jsdom + @mozilla/readability | Docs crawling |
| HTML→Markdown | turndown | Docs content conversion |
| Graph Service | FastAPI + Python | Neo4j sync and Graph RAG |
| Knowledge Graph | Neo4j 5.x | Persistent graph storage |
| Bundler | tsup | All packages |

---

## Data Flow: Training

```
User starts training
        │
        ▼
Sidecar UI emits: training:start
        │
        ▼
ProbeOrchestrator starts
  ├── DOMWalker serializes current page
  ├── Screenshot captured (html2canvas)
  └── Snapshot sent to Train Service
        │
        ▼
Train Service: POST /api/probe/analyze-enhanced
  ├── Claude analyzes DOM + screenshot
  └── Returns: Page understanding, elements, workflows, triples
        │
        ▼
KnowledgeStore.addTriples()
  ├── Deduplication
  ├── Confidence resolution
  └── JSON persistence
        │
        ▼
(Optional) AutoSyncManager.syncToGraph()
  └── Graph Service writes to Neo4j
```

## Data Flow: Assist

```
User types question
        │
        ▼
Intent classification (FIND / LEARN / PRACTICE / REMEMBER)
        │
        ▼
POST /api/assist/chat
  ├── Graph Service: retrieve relevant triples (Graph RAG)
  ├── Role-based filtering (userRole)
  └── Claude generates grounded response
        │
        ▼
Mode-specific UI renders:
  FIND     → FindCard + ghost layer navigation
  LEARN    → LearnCard (inline → conversation)
  PRACTICE → WalkthroughOverlay + GhostLayer
  REMEMBER → Timeline card + context
```

---

## Key Design Decisions

**Why TypeScript + Python (mixed stack)?**
TypeScript for browser-side code (connector, sidecar, Train Service). Python for the Graph Service — leverages the ML/graph ecosystem (Neo4j drivers, graph algorithms, LangChain).

**Why Shadow DOM for the sidecar?**
The sidecar UI lives in a Shadow DOM container so its CSS is fully isolated from the host app. ConCRG never breaks the host app's styles.

**Why Hono for the Train Service?**
Hono is ~14KB, native TypeScript, and runs on Node, Deno, Bun, and Cloudflare Workers. It enables edge deployment without rewriting the service.

**Why file-based knowledge store (not just Neo4j)?**
The JSON knowledge store works without infrastructure. Teams can start with zero dependencies and add Neo4j when they need persistent graph querying.
