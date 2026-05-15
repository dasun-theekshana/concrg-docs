---
id: find
title: FIND Mode
sidebar_label: FIND
---

# FIND Mode

**"Where is it?"**

FIND is the entry point for most user assistance needs. When a user is stuck and can't locate a feature, FIND navigates them directly there — no searching through menus, no reading help docs.

---

## How It Works

1. User opens the ConCRG command bar and types a question
2. ConCRG identifies it as a navigation request
3. It searches the knowledge graph for the matching page or feature
4. It presents a response card with the location and a "Go there" button
5. Clicking "Go there" visually guides them along the path and navigates

---

## Example Interactions

| User Input | ConCRG Response |
|---|---|
| "Where do I create an invoice?" | Navigates to the new invoice page, highlights the create button |
| "Where are my active deals?" | Navigates to the pipeline, filtered to Active |
| "How do I invite a team member?" | Navigates to team settings, highlights the Invite button |
| "Where's the export option for contacts?" | Navigates to contacts, highlights the Export menu |

---

## FIND as a Gateway

Every FIND response includes escalation paths to the next stage of the user's journey:

![Mode Escalation](/img/mode-escalation.svg)

This connects the modes naturally — users follow the path without needing to know modes exist.

---

## FIND vs. REMEMBER

If the user has visited a page before, ConCRG blends FIND with REMEMBER:

- **First visit:** "Invoices is in Billing › Invoices." + Go there
- **Returning visit:** "You were last in Billing on March 15." + Go there + what they did last time

FIND becomes smarter over time without the user noticing any change.

---

## Configuration

FIND works out of the box with no extra configuration. Accuracy improves with more training sources — Probe maps the navigation, Code adds structural detail, Docs provides feature context.
