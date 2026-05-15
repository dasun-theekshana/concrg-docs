---
id: quick-start
title: Quick Start
sidebar_label: Quick Start
---

# Quick Start

Get ConCRG running in your React app in under 10 minutes.

## Prerequisites

- Node.js 18+
- A React 18+ application
- An Anthropic API key ([get one here](https://console.anthropic.com))

---

## Step 1: Install the packages

```bash
npm install @crg/connector-react @crg/connector-react-v2
```

Or with pnpm:

```bash
pnpm add @crg/connector-react @crg/connector-react-v2
```

---

## Step 2: Start the Train Service

The Train Service is the local backend that handles knowledge extraction and AI inference.

```bash
npx @crg/train-service
```

By default it runs on **port 3001**. Set your Anthropic API key first:

```bash
ANTHROPIC_API_KEY=sk-ant-... npx @crg/train-service
```

---

## Step 3: Wrap your app with CRGProvider

```tsx title="src/main.tsx"
import { CRGProvider } from '@crg/connector-react';
import { createTrainSidecar, createAssistSidecar } from '@crg/connector-react-v2';

const crgConfig = {
  appId: 'my-app',
  serviceUrl: 'http://localhost:3001',
};

function Root() {
  return (
    <CRGProvider
      config={crgConfig}
      mountTrainUI={createTrainSidecar}
      mountAssistUI={createAssistSidecar}
    >
      <App />
    </CRGProvider>
  );
}
```

---

## Step 4: Train ConCRG on your app

Once your app is running with the provider:

1. A floating **CRG panel** appears in the bottom-right corner
2. Click **"Open Training Panel"**
3. Select your training sources:
   - ✅ **Probe** — let CRG explore your app automatically
   - ✅ **Code** — point it to your source directory
   - ✅ **Docs** — provide your documentation URL
4. Click **"Start Training"**
5. Watch the knowledge graph build in real time

Training typically takes 2–10 minutes depending on app size and selected sources.

---

## Step 5: Try it out

Once training completes, switch to **Assist Mode** in the panel:

1. Open the CRG toolbar (bottom-right of your app)
2. Type a question: *"Where can I create a new deal?"*
3. ConCRG navigates you there and offers to explain or walk you through it

---

## What's next?

- [Training Sources →](/training/probe) — Understand how each training mode works
- [Modes →](/modes/find) — Deep dive into FIND, LEARN, PRACTICE, and REMEMBER
