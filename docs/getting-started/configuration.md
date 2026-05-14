---
id: configuration
title: Configuration Reference
sidebar_label: Configuration
---

# Configuration

The `CRGConfig` object is passed to `CRGProvider` and controls all ConCRG behavior.

## Full Configuration

```typescript
interface CRGConfig {
  // Required
  appId: string;

  // Service URLs
  serviceUrl?: string;
  graphServiceUrl?: string;

  // Training inputs
  sourceCodePath?: string;
  docsUrl?: string;

  // User context
  userRole?: string;
  userId?: string;

  // Background capture
  backgroundCapture?: BackgroundCaptureConfig;

  // Feature flags
  useAgents?: boolean;
  useAgentsV2?: boolean;
  crawlerMode?: 'legacy' | 'stategraph';
  crawler?: CrawlerConfig;
}
```

---

## Core Options

### `appId` (required)

A unique identifier for your application. This namespaces all knowledge data — use a stable slug.

```typescript
appId: 'my-crm-app'
```

### `serviceUrl`

The URL of the running Train Service.

```typescript
serviceUrl: 'http://localhost:3001'  // default
```

In production, point this at your deployed Train Service instance.

### `graphServiceUrl`

URL of the optional Graph Service (Neo4j-backed).

```typescript
graphServiceUrl: 'http://localhost:3002'  // default
```

---

## Training Inputs

### `sourceCodePath`

Absolute path to your application's TypeScript source directory. Used by the **Code** training source.

```typescript
sourceCodePath: '/Users/me/projects/my-app/src'
```

### `docsUrl`

The base URL of your product documentation site. Used by the **Docs** training source.

```typescript
docsUrl: 'https://docs.myproduct.com'
```

---

## User Context

### `userRole`

The current user's role. ConCRG uses this to filter visible pages and accessible features during assist mode responses.

```typescript
userRole: 'admin'         // sees all pages
userRole: 'viewer'        // restricted to read-only flows
userRole: 'sales_rep'     // CRM-specific workflow access
```

### `userId`

A stable identifier for the current user. Used for per-user journey tracking (REMEMBER mode).

```typescript
userId: 'user_abc123'
```

---

## Background Capture

Continuously monitors the running app for route changes and DOM mutations, keeping the knowledge graph current without a full re-probe.

```typescript
backgroundCapture: {
  enabled: true,
  debounceMs: 500,
  mutationThreshold: 10,
  includeScreenshots: true,
  syncStrategy: 'immediate',    // or 'periodic'
  minRecaptureIntervalMs: 5000,
  enableContentHashing: true,   // skip unchanged pages
}
```

| Option | Default | Description |
|---|---|---|
| `enabled` | `false` | Turn on passive monitoring |
| `debounceMs` | `500` | Wait time after last mutation before capturing |
| `mutationThreshold` | `10` | Minimum DOM mutations to trigger capture |
| `includeScreenshots` | `true` | Capture screenshots with DOM snapshots |
| `syncStrategy` | `'immediate'` | `'immediate'` or `'periodic'` (batches syncs) |
| `minRecaptureIntervalMs` | `5000` | Minimum time between captures of the same route |
| `enableContentHashing` | `false` | Skip unchanged pages using content hash |

---

## Crawler Options

### `crawlerMode`

Controls the Probe's route exploration strategy.

```typescript
crawlerMode: 'stategraph'  // default for new apps
crawlerMode: 'legacy'      // breadth-first queue walker
```

`stategraph` mode is more thorough — it models the app as a state machine and discovers transitions, not just routes.

### `crawler`

Fine-tune the stategraph crawler:

```typescript
crawler: {
  maxNodes: 50,                   // max unique routes to explore
  maxActionsPerNode: 10,          // max interactions per page
  maxInstancesPerRoutePattern: 3, // e.g., max 3 /deals/:id pages
}
```

---

## Feature Flags

| Flag | Default | Description |
|---|---|---|
| `useAgents` | `false` | Enable hybrid AST + LLM code analysis |
| `useAgentsV2` | `false` | V2 agent pipeline (more accurate, slower) |

---

## Example: Full Config

```typescript
const crgConfig: CRGConfig = {
  appId: 'acme-crm',
  serviceUrl: 'http://localhost:3001',
  graphServiceUrl: 'http://localhost:3002',
  sourceCodePath: '/workspace/acme-crm/src',
  docsUrl: 'https://help.acme.com',
  userRole: 'admin',
  userId: 'user_dasun',
  backgroundCapture: {
    enabled: true,
    debounceMs: 500,
    mutationThreshold: 5,
    includeScreenshots: false,
    syncStrategy: 'periodic',
    minRecaptureIntervalMs: 10000,
    enableContentHashing: true,
  },
  crawlerMode: 'stategraph',
  crawler: {
    maxNodes: 80,
    maxActionsPerNode: 15,
  },
  useAgentsV2: true,
};
```
