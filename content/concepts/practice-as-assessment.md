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

PRACTICE currently means "guide me through a workflow." The same infrastructure can flip to **assessment mode**: guide removed, scoring added.

```
PRACTICE (learning)  →  PRACTICE (testing)  →  PRACTICE (certification)
"Show me how"            "Can you do it?"        "Prove you can do it"
```

ConCRG already knows every step of every workflow. It already guides users through them. Removing the guidance and scoring the outcome is a small UX change but a massive value expansion.

---

## Who It's For

**Product teams:**
"35 out of 50 users completed the settlement workflow correctly. 15 struggled at step 3."

Instead of A/B tests and session recordings, teams get direct workflow proficiency data.

**Compliance officers:**
Proof that employees have been trained on critical workflows. A complete audit trail — who practiced, when, how many attempts, accuracy score.

**For brokerage workflows, for example:**
- Traders practice bond settlement guided
- Then attempt it unguided
- Dashboard shows proficiency per trader per workflow
- Compliance officer has defensible records

---

## The Progression

| Phase | User Experience | CRG's Role |
|---|---|---|
| **Guided practice** | "Walk me through this" | Leads every step with highlights and explanations |
| **Supervised exploration** | "Let me try" | Watches silently, intervenes only if stuck |
| **Unguided assessment** | "Show me you can do it" | Watches and scores, no guidance offered |
| **Certification** | "Prove competency" | Records outcome, timestamp, accuracy to audit log |

---

## Design Implications

For this to work, the PRACTICE infrastructure must:

1. **Track sessions** — session ID, timestamps, steps completed, accuracy, time per step
2. **Support guided and unguided modes** — same UX, different tooltip visibility
3. **Store proficiency data** — `User X, Workflow Y, attempts, accuracy, last_completed`
4. **Expose a dashboard** — "Team Proficiency" view (future Portal feature)

These requirements should inform current PRACTICE implementation decisions, even before the assessment feature ships.

---

## Status

**Documented. Not building now.** Architecture keeps this open.

When to revisit: After PRACTICE guided walkthroughs are stable and in production use, with real usage data showing which workflows are practiced most frequently.
