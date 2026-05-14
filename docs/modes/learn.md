---
id: learn
title: LEARN Mode
sidebar_label: LEARN
---

# LEARN Mode

**"What does it do?"**

Once users find a feature, they need to understand it. LEARN explains how features work — at whatever depth the user needs, grounded in knowledge from your actual application.

---

## Three Levels of LEARN

Not every question needs a chat window. ConCRG matches the response format to the complexity of the question:

| Level | Example Question | Response Format |
|---|---|---|
| **Quick explain** | "What is a pipeline stage?" | Single paragraph inline card |
| **Conceptual** | "How does the renewals workflow work?" | Expanded card, possibly with structured steps |
| **Deep understanding** | "What's the relationship between deals, contacts, and invoices?" | Multi-turn conversation |

### Progressive Disclosure

LEARN starts with a self-contained card response. A "Ask a follow-up" input appears at the bottom. If the user engages, the card transitions smoothly into a conversation view. Depth is available — it's never forced.

---

## Example Interactions

| User Input | ConCRG Response |
|---|---|
| "What is a contact?" | Quick explanation of the Contact data model, its key fields |
| "How does deal scoring work?" | Explains the scoring algorithm and what factors affect it |
| "Walk me through how approvals work end-to-end" | Full flow: who initiates, what triggers approval, who approves, outcomes |
| "What's the difference between a lead and a contact?" | Comparison of both, when to use each |

---

## What LEARN Knows

LEARN responses are grounded in the knowledge graph — not in the LLM's training data. This means:

- Explanations use your actual field names, not generic CRM terminology
- Role-based visibility is respected (users only see what they can access)
- Workflows described are the actual workflows in your app, not generic examples
- Terminology matches your product's naming conventions

---

## LEARN in the Journey

LEARN naturally follows FIND. The escalation is built into every FIND response:

```
"Invoices is in Billing › Invoices."

[Go there]   [How does it work? →]   [Show me how to create one →]
                  ↑ LEARN
```

After LEARN, the natural next step is PRACTICE. ConCRG offers it:

```
"The invoice workflow has 4 steps: select contact, add line items,
set payment terms, and send. Would you like to practice it?"

[Yes, walk me through it →]
       ↑ PRACTICE
```

---

## Renamed from TEACH

LEARN was originally called TEACH. It was renamed after user testing found that "TEACH" created confusion about direction — users weren't sure whether they were teaching the system or being taught. "LEARN" is unambiguous.
