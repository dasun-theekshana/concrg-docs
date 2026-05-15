---
id: concierge-principle
title: The Concierge Principle
sidebar_label: Concierge Principle
---

# The Concierge Principle

> *A real hotel concierge doesn't stand in front of the elevator. They're available, attentive, but never in the way.*

ConCRG is a guest in your application. The host app owns 100% of the screen, 100% of the time. This principle resolves every design conflict in ConCRG's development.

---

## What It Means in Practice

**Invisible by default.** ConCRG does not render anything when the user is succeeding. The interface is summoned, not present.

**Appears only when called.** The user opens the toolbar when they want it. Alternatively, SENSE mode may proactively offer help — but only when signals clearly indicate the user is stuck.

**Temporary and dismissable.** Every ConCRG UI element can be dismissed instantly. Nothing persists on screen longer than needed.

**Never competes with host UI.** ConCRG guides using the host app's own elements rather than overlaying new UI on top of them. If a choice makes ConCRG more prominent at the expense of the host app, the choice is wrong.

**Fully isolated.** ConCRG's interface lives in a completely isolated layer — its styles cannot affect the host app, and the host app's styles cannot affect ConCRG.

---

## The Visual Guide

ConCRG's navigation tool follows the Concierge Principle:

- It highlights existing elements with a subtle overlay — it doesn't replace them
- It animates the path the user should take — pointing, not blocking
- It disappears once the user arrives

---

## Design Decision Reference

The Concierge Principle is the first question to ask in any design discussion:

- *Should this feature be more prominent?* → Does it compete with the host app? If yes, make it less prominent.
- *Should ConCRG intervene proactively here?* → Is there a clear signal of genuine need? If not, stay invisible.
- *Should this persist on screen?* → Does the user still need it? If uncertain, make it dismissable.

Any design that requires the user to acknowledge, close, or work around ConCRG to use their app has violated the Concierge Principle.
