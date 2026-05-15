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
The connector is a client-side library that embeds in your application. It:
- Observes navigation and interface changes
- Captures page state during training
- Renders the training panel and assist toolbar in an isolated layer (no CSS conflicts with your app)
- Communicates with the Train Service during training and the Graph Service during assist

### Train Service
A lightweight backend that handles all knowledge extraction during training:
- Analyzes interface snapshots using AI
- Processes frontend source code to extract routes, models, and permissions
- Crawls documentation sites and extracts knowledge
- Accepts conversational input from your team
- Persists extracted knowledge as structured facts

---

## Key Design Decisions

**Why an isolated UI layer?**
ConCRG's UI renders in a fully isolated container so its styles never interfere with your application — and your application's styles never affect ConCRG.

**Why file-based knowledge store by default?**
The default knowledge store works with zero infrastructure — no database required to get started. Teams can connect a persistent graph store when they need advanced querying at scale.
