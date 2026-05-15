---
id: probe
title: Probe Training
sidebar_label: Probe
---

# Probe Training

The Probe is ConCRG's autonomous DOM explorer. It navigates your running application, maps every page and element it encounters, and builds the foundation of the knowledge graph.

---

## How the Probe Works

```
1. Start at root route
         │
         ▼
2. Serialize DOM tree
   (labels, roles, nav links, interactive elements)
         │
         ▼
3. Capture screenshot (html2canvas)
         │
         ▼
4. Send snapshot + screenshot to Claude
         │
         ▼
5. Extract: page understanding, elements,
   workflows, RDF triples
         │
         ▼
6. Enqueue discovered navigation links
         │
         ▼
7. Repeat for each route in queue
```

The Probe runs **inside your app's browser context** — not in a separate Playwright session. This means:
- It sees the actual rendered UI with real authentication
- It captures authenticated pages without credentials workarounds
- It observes the real data state of your app
- It detects dynamic UI that only appears in specific states

---

## Crawler Modes

### Legacy Mode (Breadth-First Queue)

The original crawler. Discovers routes by following navigation links in breadth-first order. Good for simple SPAs with clear navigation hierarchies.

```typescript
crawlerMode: 'legacy'
```

### Stategraph Mode (Recommended)

Models the app as a state machine. Instead of just following links, it discovers **state transitions** — modals, conditional panels, tab switches, and multi-step forms.

```typescript
crawlerMode: 'stategraph',
crawler: {
  maxNodes: 50,                    // max unique route states
  maxActionsPerNode: 10,           // interactions per page
  maxInstancesPerRoutePattern: 3,  // e.g., max 3 /deals/:id pages
}
```

Stategraph mode is more thorough and recommended for complex SPAs.

---

## Running a Probe

### From the Training Panel

1. Open the CRG training panel (floating sidecar, bottom-right)
2. Select **Probe** as a training source
3. Click **Start Training**
4. Watch the progress in real time:
   - Pages discovered counter
   - Current route being analyzed
   - Triples extracted so far

---

## Tips for Best Results

- **Run the Probe while logged in as an admin** — so it can access all pages
- **Navigate to any pages that require special states first** (e.g., open a deal record before probing)
- **Use stategraph mode** for apps with lots of modals, panels, and conditional UI
- **Run Background Capture** continuously to keep knowledge current as your app changes

---

## Background Capture

Background Capture is a passive variant of the Probe. It monitors the app continuously for route changes and DOM mutations, re-probing changed pages automatically.

```typescript
backgroundCapture: {
  enabled: true,
  debounceMs: 500,
  syncStrategy: 'periodic',
  enableContentHashing: true,  // skip unchanged pages
}
```

Enable it for production deployments to keep the knowledge graph fresh after every release.
