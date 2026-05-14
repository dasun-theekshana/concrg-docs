---
id: remember
title: REMEMBER Mode
sidebar_label: REMEMBER
---

# REMEMBER Mode

**"I've done this before."**

REMEMBER helps returning users reconnect with features they've already learned. Rather than starting the FIND → LEARN → PRACTICE journey again, ConCRG recalls their past interactions and brings them back up to speed quickly.

---

## How It Works

ConCRG tracks a user's journey through the app per feature:

```
Feature Journey States:
  discovered → learned → practiced → mastered
```

When a user asks about something they've already encountered, ConCRG responds with memory context:

- **"You were last in Billing on March 15"** — temporal anchor
- **"You've used the invoice workflow 3 times"** — familiarity signal
- **"Last time you exported contacts using the CSV option"** — specific recall

This surfaces the right information faster than re-reading an explanation they've already internalized.

---

## Example Interactions

| User Input + Context | ConCRG Response |
|---|---|
| "Where is billing?" (visited before) | "You were last in Billing on March 15. Go there?" |
| "How do I export contacts?" (done before) | "You last exported contacts as CSV on April 2. Here are the steps again." |
| "How does invoicing work?" (already practiced) | "You've created 3 invoices. Here's a quick refresher on the key steps." |

---

## REMEMBER is Not a Separate Mode (Technically)

REMEMBER isn't a distinct UI — it's a modifier that enriches FIND and LEARN responses when journey history exists. The user never selects "REMEMBER mode." They just ask naturally, and ConCRG blends recall into its response.

---

## Design Considerations

User testing found that "REMEMBER" created confusion with task reminders. This mode is being redesigned — potential directions:

- **"My History"** — emphasis on timeline and past activity
- **"Shortcuts"** — emphasis on speed for experienced users

The underlying behaviour (journey tracking + contextual recall) stays the same regardless of naming.

---

## Privacy

User journey data is stored locally on your infrastructure and is never sent to third parties. It can be deleted on request.
