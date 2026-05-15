---
id: adaptive-response
title: Adaptive Response
sidebar_label: Adaptive Response
---

# Adaptive Response

ConCRG picks the right response mode based on what the user is asking, where they are in their journey with that feature, and what they're currently doing. The user never selects a mode.

---

## The Three Inputs

![Adaptive Response Flow](/img/adaptive-response-flow.svg)

Every question is evaluated on three dimensions:

1. **Intent** — What is the user trying to accomplish? (find something, understand it, try it, recall it)
2. **Journey stage** — Have they encountered this feature before? Used it? Mastered it?
3. **Current context** — What page are they on? What have they been doing this session?

---

## How It Adapts

The same question gets a different response depending on who's asking and where they are:

| User Input + Context | ConCRG Response |
|---|---|
| "Tell me about invoicing" (first time) | FIND: location card + Go there + LEARN escalation |
| "Tell me about invoicing" (used before) | Shorter LEARN refresher, skips the basics |
| "Where is billing?" (first time) | FIND: navigation card |
| "Where is billing?" (visited before) | REMEMBER: "You were last here on March 15" + Go there |
| "Walk me through creating an invoice" | PRACTICE: guided walkthrough |

---

## Journey Tracking

ConCRG tracks each user's familiarity with each feature over time:

![Journey Stages](/img/journey-stages.svg)

Journey stage is tracked per user per feature and updated automatically based on behavior — no manual tagging or configuration required.

---

## Context Awareness

ConCRG also considers the current page. The same question means different things in different places:

- *"How do I delete this?"* on a contact record → explains contact deletion
- *"How do I delete this?"* on a deal record → explains deal deletion
- *"How do I delete this?"* in settings → "What would you like to delete?"

The current page is always part of the context, and ConCRG uses it to scope its response accurately.
