---
id: practice
title: PRACTICE Mode
sidebar_label: PRACTICE
---

# PRACTICE Mode

**"How do I use it?"**

PRACTICE is the highest-rated mode in user testing. It lets users try workflows step by step — safely, without fear of making mistakes or causing real consequences.

> *"Really helps for training, no consequences."* — User testing participant

---

## Two Flavours

### Guided Walkthrough

ConCRG leads. The user follows.

- Highlights each element in sequence with a visual guide
- Explains what to do and why at each step
- Waits for the user to complete the action before advancing
- Recovers gracefully if the user takes a wrong step

**Example:** "Walk me through creating a deal" → ConCRG highlights the New Deal button, explains the form fields one by one, guides through submission.

### Supervised Exploration

The user leads. ConCRG watches and helps only if needed.

- User navigates the workflow themselves
- ConCRG monitors for confusion and intervenes only when stuck: "Looks like you're on the Contacts page — deal creation is back in Pipeline"
- Closer to real use than scripted walkthroughs

Supervised exploration is the bridge between PRACTICE and independent use.

---

## Example Interactions

| User Input | What Happens |
|---|---|
| "Walk me through creating an invoice" | Guided walkthrough of the invoice creation flow |
| "Show me how to move a deal to Closed Won" | Guided through the pipeline stage change and any required fields |
| "Let me try submitting an expense report" | Supervised exploration — user leads, ConCRG watches |
| "How do I set up a new user?" | Guided through the invite and role assignment flow |

---

## Safety Sandbox

PRACTICE is designed to be consequence-free:

- **Guided walkthroughs** can run against a sandboxed environment with demo data
- **Supervised exploration** uses the live app but ConCRG alerts before destructive actions: "This will permanently delete the contact. Do you want to continue, or go back?"
- No surprises — every step is explained before the user acts

---

## PRACTICE as Assessment (Future)

The same infrastructure that guides users can flip to **assessment mode** — removing the guidance and scoring the outcome.

For enterprise use cases — compliance training, onboarding certification, workflow proficiency — this transforms ConCRG from a help tool into a training and assessment platform.

**Status:** Architecture keeps this open. Not building now. See [Practice as Assessment →](/concepts/practice-as-assessment).
