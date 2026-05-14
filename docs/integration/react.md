---
id: react
title: React Integration
sidebar_label: React Integration
---

# React Integration

ConCRG integrates with React apps through the `CRGProvider` component. This is the single integration point — everything else (sidecars, training, assist mode) is managed internally.

---

## Basic Setup

```tsx title="src/main.tsx"
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { CRGProvider } from '@crg/connector-react';
import { createTrainSidecar, createAssistSidecar } from '@crg/connector-react-v2';
import App from './App';

const crgConfig = {
  appId: 'my-app',
  serviceUrl: 'http://localhost:3001',
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CRGProvider
      config={crgConfig}
      mountTrainUI={createTrainSidecar}
      mountAssistUI={createAssistSidecar}
    >
      <App />
    </CRGProvider>
  </StrictMode>
);
```

The provider must wrap your entire application so it can observe route changes and DOM mutations across all pages.

---

## CRGProvider Props

| Prop | Type | Required | Description |
|---|---|---|---|
| `config` | `CRGConfig` | Yes | Full configuration object |
| `mountTrainUI` | `SidecarRenderer` | No | Factory for the training sidecar |
| `mountAssistUI` | `SidecarRenderer` | No | Factory for the assist toolbar |

You can omit `mountTrainUI` to disable the training panel in production. You can omit `mountAssistUI` to disable the user-facing assist UI.

---

## Environment-Based Configuration

A common pattern is to enable training mode only in development or staging:

```tsx
const crgConfig = {
  appId: 'my-app',
  serviceUrl: import.meta.env.VITE_CRG_SERVICE_URL ?? 'http://localhost:3001',
  sourceCodePath: import.meta.env.VITE_CRG_SOURCE_PATH,
  docsUrl: import.meta.env.VITE_CRG_DOCS_URL,
  userRole: currentUser.role,
  userId: currentUser.id,
};

const isTrainingEnabled = import.meta.env.VITE_CRG_TRAINING === 'true';

<CRGProvider
  config={crgConfig}
  mountTrainUI={isTrainingEnabled ? createTrainSidecar : undefined}
  mountAssistUI={createAssistSidecar}
>
  <App />
</CRGProvider>
```

---

## Dynamic User Context

Update `userRole` and `userId` when the user logs in or their role changes:

```tsx
function AuthenticatedApp({ user }) {
  const crgConfig = useMemo(() => ({
    appId: 'my-app',
    serviceUrl: 'http://localhost:3001',
    userRole: user.role,
    userId: user.id,
  }), [user.role, user.id]);

  return (
    <CRGProvider config={crgConfig} mountAssistUI={createAssistSidecar}>
      <App />
    </CRGProvider>
  );
}
```

---

## What CRGProvider Does Internally

When mounted, `CRGProvider`:

1. Initializes the **MessageBus** (internal pub/sub)
2. Starts the **ContextDetector** (URL/route change monitoring)
3. Initializes the **EventInterceptor** (network request monitoring)
4. Connects a **SessionManager** to the Train Service
5. Mounts the **Sidecar UI** into a Shadow DOM container (doesn't pollute your CSS)
6. If `backgroundCapture.enabled`, starts the **BackgroundCaptureService**

All services communicate through the MessageBus and are torn down on unmount.

---

## Using with React Router

CRGProvider works with any router. The ContextDetector polls `window.location` for changes, so no special integration is needed.

For best results with React Router's nested layouts:

```tsx
// Place CRGProvider outside the router, not inside route components
function Root() {
  return (
    <CRGProvider config={crgConfig} mountAssistUI={createAssistSidecar}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="deals" element={<Deals />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </CRGProvider>
  );
}
```
