---
id: probe
title: Probe Training
sidebar_label: Probe
---

# Probe Training

The Probe is ConCRG's autonomous interface explorer. It navigates your running application, maps every page and element it encounters, and builds the foundation of the knowledge graph.

---

## How the Probe Works

![Probe Flow](/img/probe-flow.svg)

The Probe runs inside your app's browser context — not in a separate environment. This means it sees the actual rendered interface with real authentication and real data, exactly as your users do.

---

## Running a Probe

1. Open the CRG training panel (floating in the bottom-right corner)
2. Select **Probe** as a training source
3. Click **Start Training**
4. Watch the progress in real time — pages discovered, current page being analyzed, facts added

---

## Tips for Best Results

- **Run the Probe while logged in as an admin** — so it can reach all pages
- **Navigate to any pages that require special states first** — open a record before starting, for example
- **Use the thorough exploration mode** for apps with modals, side panels, and conditional UI
- **Enable Background Capture** to keep knowledge current after every release

---

## Background Capture

Background Capture is a passive variant of the Probe. It monitors the app continuously and re-analyzes pages when they change — keeping the knowledge graph fresh without manual training runs.

Enable it for production deployments to ensure the graph stays accurate after every update.
