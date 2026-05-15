---
id: architecture
title: Architecture
sidebar_label: Architecture
---

# Architecture

ConCRG embeds into your application as a lightweight connector and communicates with two backend services that handle knowledge extraction and AI querying.

---

## System Overview

![CRG System Architecture](/img/architecture.svg)

---

## Components

### CRG Connector
The connector is a TypeScript library that embeds in your React app via `CRGProvider`. It:
- Observes route changes and DOM mutations
- Captures page snapshots during training
- Renders the training sidecar and assist toolbar in an isolated Shadow DOM (no CSS conflicts)
- Sends data to the Train Service and receives responses from the Graph Service

### Train Service
A lightweight Node.js backend that handles all knowledge extraction during training:
- Analyzes DOM snapshots using Claude (AI)
- Processes TypeScript source code to extract routes, models, and permissions
- Crawls documentation sites and extracts knowledge
- Accepts conversational input from your team
- Persists extracted knowledge as structured facts (RDF triples)

### Graph Service (optional)
A Python backend that provides advanced querying over Neo4j:
- Syncs knowledge from the Train Service into a property graph
- Handles Graph RAG queries for the Assist mode
- Enforces role-based access — users only see what their role can access

---

## Tech Stack

| Layer | Technology |
|---|---|
| Connector | TypeScript (framework-agnostic core) |
| React Integration | React 18+ |
| Sidecar UI | Preact (lightweight, isolated in Shadow DOM) |
| Train Service | Hono + Node.js |
| AI Inference | Anthropic Claude API |
| Graph Service | FastAPI + Python |
| Knowledge Graph | Neo4j (optional) |

---

## Key Design Decisions

**Why Shadow DOM for the sidecar?**
ConCRG's UI lives in a Shadow DOM container so its styles are fully isolated. ConCRG never affects your app's CSS, and your app's CSS never affects ConCRG.

**Why two backend services?**
The Train Service is TypeScript to match the browser-side tooling. The Graph Service is Python to leverage the ML and graph ecosystem (Neo4j drivers, graph algorithms). Each does what its language is best at.

**Why file-based knowledge store?**
The JSON knowledge store works with zero infrastructure — no database required to get started. Teams can add Neo4j when they need persistent graph querying and Graph RAG.
