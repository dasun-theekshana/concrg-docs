---
id: vue
title: Vue Integration
sidebar_label: Vue Integration
---

# Vue Integration

ConCRG integrates with Vue apps through the `CRGPlugin`. Install it once on your app instance and it handles route observation, sidecar mounting, and assist mode automatically.

> Compatible with Vue 3+. For Vue 2, use `@crg/connector-vue/legacy`.

---

## Basic Setup

```ts title="src/main.ts"
import { createApp } from 'vue';
import { CRGPlugin } from '@crg/connector-vue';
import { createTrainSidecar, createAssistSidecar } from '@crg/connector-vue/v2';
import App from './App.vue';

const crgConfig = {
  appId: 'my-app',
  serviceUrl: 'http://localhost:3001',
};

createApp(App)
  .use(CRGPlugin, {
    config: crgConfig,
    mountTrainUI: createTrainSidecar,
    mountAssistUI: createAssistSidecar,
  })
  .mount('#app');
```

You can also use the component-based API by wrapping `<App />` with `<CRGProvider>`:

```vue title="src/App.vue"
<script setup lang="ts">
import { CRGProvider } from '@crg/connector-vue';
import { createTrainSidecar, createAssistSidecar } from '@crg/connector-vue/v2';
import MainLayout from './layouts/MainLayout.vue';

const crgConfig = {
  appId: 'my-app',
  serviceUrl: 'http://localhost:3001',
};
</script>

<template>
  <CRGProvider
    :config="crgConfig"
    :mount-train-ui="createTrainSidecar"
    :mount-assist-ui="createAssistSidecar"
  >
    <MainLayout />
  </CRGProvider>
</template>
```

The plugin/provider must be registered at the application root so the connector can observe route changes and DOM mutations across all components.

---

## CRGPlugin Options

| Option | Type | Required | Description |
|---|---|---|---|
| `config` | `CRGConfig` | Yes | Full configuration object |
| `mountTrainUI` | `SidecarRenderer` | No | Factory for the training sidecar |
| `mountAssistUI` | `SidecarRenderer` | No | Factory for the assist toolbar |

You can omit `mountTrainUI` to disable the training panel in production. You can omit `mountAssistUI` to disable the user-facing assist UI.

---

## Environment-Based Configuration

A common pattern is to enable training mode only in development or staging:

```ts title="src/main.ts"
const crgConfig = {
  appId: 'my-app',
  serviceUrl: import.meta.env.VITE_CRG_SERVICE_URL ?? 'http://localhost:3001',
  sourceCodePath: import.meta.env.VITE_CRG_SOURCE_PATH,
  docsUrl: import.meta.env.VITE_CRG_DOCS_URL,
};

const isTrainingEnabled = import.meta.env.VITE_CRG_TRAINING === 'true';

createApp(App)
  .use(CRGPlugin, {
    config: crgConfig,
    mountTrainUI: isTrainingEnabled ? createTrainSidecar : undefined,
    mountAssistUI: createAssistSidecar,
  })
  .mount('#app');
```

---

## Dynamic User Context

Update `userRole` and `userId` reactively using the `useCrg` composable. Wrap the config in a `computed` or `reactive` so the connector picks up changes:

```vue title="src/App.vue"
<script setup lang="ts">
import { computed } from 'vue';
import { CRGProvider } from '@crg/connector-vue';
import { createAssistSidecar } from '@crg/connector-vue/v2';
import { useAuth } from './composables/useAuth';

const { user } = useAuth();

const crgConfig = computed(() => ({
  appId: 'my-app',
  serviceUrl: 'http://localhost:3001',
  userRole: user.value?.role,
  userId: user.value?.id,
}));
</script>

<template>
  <CRGProvider :config="crgConfig" :mount-assist-ui="createAssistSidecar">
    <RouterView />
  </CRGProvider>
</template>
```

Or imperatively from anywhere in your app via the composable:

```ts
import { useCrg } from '@crg/connector-vue';

const crg = useCrg();

function onLogin(user: { id: string; role: string }) {
  crg.updateConfig({ userId: user.id, userRole: user.role });
}
```

---

## Using with Vue Router

`CRGPlugin` works with Vue Router with no special integration needed — the connector listens to router navigation events automatically.

```ts title="src/main.ts"
import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import { CRGPlugin } from '@crg/connector-vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: () => import('./pages/Dashboard.vue') },
    { path: '/deals', component: () => import('./pages/Deals.vue') },
    { path: '/deals/:id', component: () => import('./pages/DealDetail.vue') },
  ],
});

createApp(App)
  .use(router)
  .use(CRGPlugin, { config: crgConfig, mountAssistUI: createAssistSidecar })
  .mount('#app');
```

Register the router before `CRGPlugin` so the connector can hook into navigation events on first load.
