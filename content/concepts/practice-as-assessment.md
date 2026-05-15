---
id: practice-as-assessment
title: Practice as Assessment
sidebar_label: Practice as Assessment
---

# Practice as Assessment

> *PRACTICE mode doubles as proficiency testing and compliance reporting.*

This is a future capability — the architecture keeps it open. It's documented here because it shapes how the PRACTICE infrastructure is designed today.

---

## The Insight

PRACTICE currently means "guide me through a workflow." The same infrastructure can flip to **assessment mode**: guidance removed, outcome scored.

![Practice Progression](/img/practice-progression.svg)

ConCRG already knows every step of every workflow. It already guides users through them. Removing the guidance and scoring the outcome is a small UX change with a significant expansion in value.

---

## Who It's For

**Product teams:**
"35 out of 50 users completed the settlement workflow correctly. 15 struggled at step 3."

Instead of A/B tests and session recordings, teams get direct workflow proficiency data.

**Compliance officers:**
Proof that employees have been trained on critical workflows — who completed what, when, and how accurately.

**For brokerage workflows, for example:**
- Traders practice bond settlement with guidance
- Then attempt it unguided
- Dashboard shows proficiency per trader per workflow
- Compliance officer has defensible records

---

## The Progression

| Phase | User Experience | ConCRG's Role |
|---|---|---|
| **Guided practice** | "Walk me through this" | Leads every step with highlights and explanations |
| **Supervised exploration** | "Let me try" | Watches silently, intervenes only if stuck |
| **Unguided assessment** | "Show me you can do it" | Watches and scores, no guidance offered |
| **Certification** | "Prove competency" | Records outcome and accuracy |

---

## Status

**Documented. Not building now.** Architecture keeps this open.

When to revisit: After PRACTICE guided walkthroughs are stable and in production use, with real usage data showing which workflows are practiced most frequently.
