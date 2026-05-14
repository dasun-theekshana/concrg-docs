---
id: adaptive-response
title: Adaptive Response
sidebar_label: Adaptive Response
---

# Adaptive Response

ConCRG picks the response mode based on user intent, journey stage, and current context. The user never selects a mode.

---

## The Three Inputs

Every question is classified on three dimensions:

1. **Intent** — What is the user asking? (navigation, explanation, walkthrough, recall)
2. **Journey stage** — Where is the user in their FLPR journey for this feature?
3. **Current context** — What page is the user on? What have they done this session?

---

## How It Works

```
User types: "Tell me about invoicing"

          ↓

Intent classifier → navigational? explanatory? task-oriented?
                            → "explanatory"

          ↓

Journey check → has user discovered Invoicing?
                         → No

          ↓

Response → FIND card: "Invoicing is in Billing › Invoices"
           + "Go there" button
           + "How does it work?" escalation (LEARN)
           + "Walk me through it" escalation (PRACTICE)
```

Now the same question from a user who has used invoicing before:

```
User types: "Tell me about invoicing"

Intent → "explanatory"
Journey → practiced (3 invoice sessions)

Response → LEARN card: "Here's a refresher on how invoicing works..."
           (skips the FIND step, gives a shorter explanation,
            offers PRACTICE refresh instead of first-time walkthrough)
```

---

## Journey Tracking

ConCRG tracks a user's status per feature:

| Status | Meaning |
|---|---|
| `unknown` | User has never interacted with this feature |
| `discovered` | User has navigated to this feature |
| `learned` | User has received a LEARN explanation |
| `practiced` | User has completed at least one PRACTICE session |
| `mastered` | User has used this feature independently (via background capture) |

Journey status is stored per `(userId, feature)` pair and updated automatically based on behavior.

---

## Response Matrix

| Intent | Journey Status | Response |
|---|---|---|
| "Where is X?" | unknown | FIND: location + Go there |
| "Where is X?" | discovered+ | REMEMBER: "You were last here on [date]" + Go there |
| "How does X work?" | unknown/discovered | LEARN: explanation card |
| "How does X work?" | practiced/mastered | Shorter REMEMBER + LEARN refresher |
| "Walk me through X" | any | PRACTICE: guided walkthrough |
| "I did X last week" | practiced/mastered | REMEMBER: timeline + steps |

---

## Context Awareness

ConCRG also considers the current page. The same question means different things on different pages:

- *"How do I delete this?"* on `/contacts/:id` → explains contact deletion
- *"How do I delete this?"* on `/deals/:id` → explains deal deletion
- *"How do I delete this?"* on `/settings` → "What would you like to delete?"

The `currentRoute` is always passed with every assist query, and ConCRG uses the page's knowledge to scope its response.
