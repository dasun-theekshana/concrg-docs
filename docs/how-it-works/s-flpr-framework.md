---
id: s-flpr-framework
title: The S-FLPR Framework
sidebar_label: S-FLPR Framework
---

# The S-FLPR Framework

S-FLPR is ConCRG's model for how users experience assistance inside software. It maps the natural journey of learning any feature — and defines when and how ConCRG should respond.

---

## The Five Modes

```
S ─── Sense (proactive detection)
│
├── F ─── Find     "Where is it?"
│
├── L ─── Learn    "What does it do?"
│
├── P ─── Practice "How do I use it?"
│
└── R ─── Remember "I've done this before"
```

### SENSE
ConCRG monitors behavioral signals to detect confusion before the user asks for help. When a frustration pattern is detected, it proactively offers the right mode.

**Detection signals:**
- Dwell time (5+ seconds on a page without action)
- Rage clicks (3+ rapid clicks on the same element)
- Dead clicks (clicking non-interactive elements)
- Oscillation (repeated back-and-forth navigation)

### FIND
The entry point for most users when they're stuck. FIND answers "where is it?" and takes them there.

**What it does:**
- Interprets the user's intent from natural language
- Searches the knowledge graph for the relevant page or feature
- Navigates the user directly (ghost layer highlights the path)
- Offers escalation to LEARN and PRACTICE

**Example:** *"Where do I create an invoice?"* → navigates to `/billing/invoices/new`

### LEARN
Once users have found a feature, they want to understand it. LEARN explains how features work — at three levels of depth.

| Level | Example Question | Response |
|---|---|---|
| **Quick** | "What is a pipeline stage?" | Single paragraph inline |
| **Conceptual** | "How does renewals work?" | Expanded card with context |
| **Deep** | "What's the relationship between deals and invoices?" | Multi-turn conversation |

### PRACTICE
The highest-rated mode in user testing. PRACTICE lets users try workflows safely — no consequences, no fear.

**Two flavours:**
- **Guided walkthrough** — CRG leads, user follows step by step
- **Supervised exploration** — User leads, CRG watches and helps if stuck

**Example:** *"Walk me through creating a deal"* → CRG highlights each element, explains each step, user clicks through.

### REMEMBER
For returning users who have done something before but need a refresher. REMEMBER connects the current moment to past activity.

**Example:** *"How did I export contacts last time?"* → shows the steps from the user's last successful export.

---

## The Natural Journey

Users don't think in modes — they think in tasks. The FLPR progression maps to how anyone learns a new tool:

```
First encounter with a feature:
  FIND → LEARN → PRACTICE

Returning after time away:
  FIND (or SENSE) → REMEMBER → PRACTICE (quick refresh)

Power user:
  FIND → done (they know the rest)
```

ConCRG tracks where each user is in this journey **per feature** and adapts accordingly. The same question — *"tell me about invoicing"* — gets a different answer depending on whether the user has never visited Invoicing, has found it but never used it, or used it last month.

---

## Adaptive Response

The command bar is the **universal entry point**. The response UI is the variable. ConCRG classifies intent and journey stage to produce the right response automatically — the user never selects a mode.

| User Input + Context | ConCRG Response |
|---|---|
| "Where is billing?" (first time) | FIND: location card + "Go there" button |
| "Where is billing?" (visited before) | REMEMBER: "You were last here on March 15" + "Go there" |
| "How does billing work?" (found, not learned) | LEARN: explanation card |
| "Walk me through creating an invoice" | PRACTICE: guided walkthrough |

[Read more about Adaptive Response →](/concepts/adaptive-response)

---

## Design Principles

The S-FLPR framework is grounded in five design principles learned from user research:

1. **Timing > Content** — Right help at the right moment beats the most thorough documentation
2. **Show, Don't Tell** — Demonstrations beat written instructions
3. **Safe to Explore** — Remove fear of consequences; users engage more deeply
4. **Whisper, Don't Shout** — Subtle, non-intrusive presence keeps the host app primary
5. **Speak Their Language** — Frame help around tasks and goals, not feature names
