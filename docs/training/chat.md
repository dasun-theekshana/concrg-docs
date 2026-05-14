---
id: chat
title: Chat Training
sidebar_label: Chat
---

# Chat Training

The Chat source lets you teach ConCRG directly through conversation. It's the escape hatch for knowledge that no automated source can capture — tacit business rules, edge cases, domain terminology, and the "why" behind product decisions.

---

## When to Use Chat Training

Use Chat when you know something that isn't in the UI, the code, or the docs:

- **Business rules:** "Settlement only applies to bond trades, not equity"
- **Edge cases:** "If a deal has more than 5 line items, the approval threshold doubles"
- **Historical context:** "The 'Legacy' category only exists for pre-2022 customers"
- **Terminology:** "We call them 'clients', not 'customers' — that distinction matters to our users"
- **Permissions subtleties:** "Admins can delete contacts, but only within 30 days of creation"

---

## How It Works

You have a natural conversation with ConCRG. It listens, asks clarifying questions, and converts your explanations into RDF triples.

```
You: The "archived" status means the deal is closed but the
     contact relationship is still active. It's different from
     "lost" which closes both.

ConCRG: Got it. Let me make sure I have this right:
         - "Archived" = deal closed, contact relationship preserved
         - "Lost" = deal closed, contact relationship also closed
         Is that correct?

You: Yes. And archived deals still count in the contact's
     lifetime value calculation.

ConCRG: Noted. Adding that to the knowledge graph:
         "Archived deals" → "included_in" → "Contact LTV calculation"
```

---

## Starting a Chat Training Session

From the training panel:

1. Select **Chat** as a training source
2. Click **Start Training**
3. Type in the chat input about your product

Programmatically:

```typescript
messageBus.emit('chat:message', {
  content: 'The settlement workflow has two approval stages for amounts over $1M',
  sessionId: 'training-session-abc',
});
```

---

## Tips for Effective Chat Training

- **Be specific** — "The export button is in the top-right of the Contacts table" is more useful than "you can export contacts"
- **Describe exceptions** — Chat is most valuable for edge cases that automated sources miss
- **Correct misunderstandings** — If ConCRG misinterprets something, correct it in the next message
- **Use your real terminology** — Teach ConCRG the words your users use, not generic software terms
- **Train role by role** — Describe what each user role can and can't do separately

---

## What Gets Stored

Each exchange produces one or more triples:

| Your Statement | Triple |
|---|---|
| "Bond settlement has stricter validation than equity" | `bond_settlement → stricter_than → equity_settlement` |
| "Users can't delete contacts within 30 days" | `delete_contact → time_restriction → 30_days_minimum` |
| "Archived deals still count in LTV" | `archived_deal → included_in → contact_ltv_calculation` |

These triples are tagged with `source: "chat"` and `confidence: 0.9` (high — direct human input).
