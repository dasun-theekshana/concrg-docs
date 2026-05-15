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
2. ConCRG classifies the intent as a navigational query
3. It searches the knowledge graph for the matching page or feature
4. It presents a response card with the location and a "Go there" button
5. Clicking "Go there" uses the ghost layer to highlight the path and navigate

---

## Example Interactions

| User Input | ConCRG Response |
|---|---|
| "Where do I create an invoice?" | Navigates to `/billing/invoices/new`, highlights the "New Invoice" button |
| "Where are my active deals?" | Navigates to `/pipeline`, filters to "Active" status |
| "How do I invite a team member?" | Navigates to `/settings/team`, highlights "Invite" button |
| "Where's the export option for contacts?" | Navigates to `/contacts`, highlights the "Export" menu item |

---

## FIND as a Gateway

Every FIND response includes escalation paths to the next stage of the user's journey. Finding something is just the beginning:

```
"Invoices is in Billing › Invoices."

[Go there]   [How does it work? →]   [Show me how to create one →]
               LEARN escalation         PRACTICE escalation
```

This connects the modes without the user needing to think about modes — they just follow the natural path.

---

## Ghost Layer Navigation

When a user clicks "Go there," ConCRG uses its **ghost layer** to guide navigation:

- Highlights the relevant menu item or button with a subtle overlay
- Animates the navigation path step by step
- Stays out of the way once the user arrives

The ghost layer uses the host app's own elements — it doesn't add new UI or cover content.

---

## FIND vs. REMEMBER

If the user has visited a page before, ConCRG blends FIND with REMEMBER:

- **First visit:** "Invoices is in Billing › Invoices." + Go there
- **Returning visit:** "You were last in Billing on March 15." + Go there + what they did

This makes FIND smarter over time without the user noticing any change.

---

## Configuration

FIND works out of the box with no extra configuration. Accuracy improves with more training sources — Probe maps the navigation, Code adds route details, Docs provides feature context.
