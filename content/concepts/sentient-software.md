---
id: sentient-software
title: Making Software Sentient
sidebar_label: Sentient Software
---

# Making Software Sentient

> *The product understands itself and speaks for itself. No docs, no tooltips, no manual content.*

This is ConCRG's north star — the vision that shapes every feature decision.

---

## The Insight

Today, there are two kinds of product knowledge:

**Implicit knowledge** — what the software can do, how it's structured, what each workflow requires, who can access what. This lives in the code, in the database schema, in the product team's heads. It's accurate but inaccessible.

**Explicit knowledge** — what someone wrote down about the software. Help articles, tooltips, onboarding tours, documentation sites. This is accessible but goes stale the moment the next release ships.

The gap between these two is where users fail. They can't access the implicit knowledge, and the explicit knowledge doesn't match what they're seeing.

---

## The Vision

ConCRG closes the gap by making the implicit knowledge accessible. Not by translating it into static docs — by making the software speak for itself, in context, to each user who needs it.

**Software that is sentient:**
- Knows what it can do
- Knows who can access what
- Knows how everything connects
- Can explain any of this to any user, in context, on demand

No documentation someone wrote and forgot. No tooltips someone authored two releases ago. Knowledge derived from the software's own structure, kept current automatically.

---

## The Measure

Every feature decision should move toward this vision. A useful question:

> *Does this require a human to create or maintain content?*

- **Yes** → It's a compromise. It works, but it's not sentient software — it's better-organized manual content.
- **No** → It's aligned. The software is speaking for itself.

Probing the DOM → aligned. Writing tooltips → compromise. Crawling existing docs → compromise (but a practical bridge). Training via chat → compromise (but valuable for tacit knowledge).

The goal is to progressively reduce reliance on human content creation until the software can explain itself completely from its own structure.

---

## Why It Matters

The problems ConCRG solves today:
- 80% of features go unused because users don't know they exist
- $25–35 per support ticket for questions the software should be able to answer
- Help docs are out of date before the sprint is done

The promise of sentient software:
- Every feature gets used by the users who need it
- "How do I...?" questions are answered by the product, not a support agent
- Releases don't create confusion — the product adapts its own explanation

---

## Progress Toward Sentient Software

| Capability | Status |
|---|---|
| Autonomous DOM mapping (Probe) | ✅ Shipped |
| Code-derived knowledge extraction | ✅ Shipped |
| Natural language Q&A (FIND, LEARN) | ✅ Shipped |
| Guided walkthroughs (PRACTICE) | ✅ Shipped |
| Persistent graph (Neo4j) | ✅ Shipped |
| Background capture (continuous learning) | ✅ Shipped |
| Proactive SENSE triggers | 🔄 In progress |
| Product changelog awareness | 🔮 Future |
| Cross-release knowledge diffing | 🔮 Future |
| Zero-human-content deployment | 🎯 North star |
