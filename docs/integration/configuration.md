---
id: configuration
title: API Reference
sidebar_label: API Reference
---

# API Reference

## Train Service API

The Train Service runs on port 3001 and handles all knowledge extraction operations.

### Health

```
GET /api/health
```

Returns `{ status: "ok" }` if the service is running.

---

### Sessions

```
POST   /api/session          Create a new session
GET    /api/session/:id      Get session state
DELETE /api/session/:id      End a session
```

**Create session:**
```json
POST /api/session
{
  "appId": "my-app",
  "userId": "user_123",
  "userRole": "admin"
}
```

---

### Probe

```
POST /api/probe/analyze-enhanced
```

Analyzes a DOM snapshot + screenshot using Claude and returns structured knowledge.

**Request:**
```json
{
  "sessionId": "sess_abc",
  "route": "/deals",
  "domSnapshot": "...",
  "screenshot": "data:image/png;base64,...",
  "appId": "my-app"
}
```

**Response:**
```json
{
  "page": {
    "route": "/deals",
    "title": "Pipeline",
    "elements": [...],
    "category": "Sales / CRM"
  },
  "workflows": [...],
  "triples": [...]
}
```

---

### Code Analysis

```
POST /api/code-analysis/analyze   Analyze local source path
POST /api/code-analysis/upload    Upload and analyze a zip file
```

**Analyze local path:**
```json
POST /api/code-analysis/analyze
{
  "sourceCodePath": "/workspace/my-app/src",
  "appId": "my-app",
  "useAgents": true
}
```

---

### Docs Crawling

```
POST /api/docs-analysis/crawl
```

Crawls a documentation site and streams NDJSON progress.

```json
POST /api/docs-analysis/crawl
{
  "url": "https://docs.yourproduct.com",
  "appId": "my-app"
}
```

Response is a streaming NDJSON body.

---

### Chat

```
POST /api/chat         Training chat (PM teaches CRG)
POST /api/assist/chat  Assist chat (user asks CRG)
```

**Training chat:**
```json
POST /api/chat
{
  "sessionId": "sess_abc",
  "appId": "my-app",
  "message": "Settlement only applies to bond trades"
}
```

**Assist chat:**
```json
POST /api/assist/chat
{
  "appId": "my-app",
  "userId": "user_123",
  "userRole": "admin",
  "currentRoute": "/pipeline",
  "message": "Where do I create an invoice?"
}
```

---

### Knowledge Store

```
GET    /api/knowledge/:appId          Get all triples
DELETE /api/knowledge/:appId          Delete all knowledge for an app
DELETE /api/knowledge/:appId/triple   Delete a specific triple
```

---

## MessageBus Events Reference

ConCRG's internal communication uses a pub/sub MessageBus. All events follow this pattern:

```typescript
messageBus.on('event:name', (payload) => { ... });
messageBus.emit('event:name', payload);
```

### Training Events

| Event | Direction | Payload |
|---|---|---|
| `training:start` | UI → Core | `{ sources: ['probe', 'code', 'docs', 'chat'] }` |
| `training:source:started` | Core → UI | `{ source: string }` |
| `training:source:progress` | Core → UI | `{ source, percent, message }` |
| `training:source:complete` | Core → UI | `{ source, triplesAdded }` |
| `training:complete` | Core → UI | `{ totalTriples, duration }` |
| `training:error` | Core → UI | `{ source, error }` |

### Probe Events

| Event | Payload |
|---|---|
| `probe:started` | `{ appId, timestamp }` |
| `probe:progress` | `{ route, pagesComplete, totalPages }` |
| `probe:snapshot` | `{ route, elements, screenshot }` |
| `probe:completed` | `{ pagesDiscovered, triplesExtracted }` |
| `probe:error` | `{ route, error }` |

### Context Events

| Event | Payload |
|---|---|
| `context:changed` | `{ previousRoute, currentRoute, title }` |
| `session:connected` | `{ sessionId }` |
| `session:disconnected` | `{}` |
| `knowledge:updated` | `{ triplesAdded, totalTriples }` |

### Navigation Events

| Event | Payload |
|---|---|
| `takemethere:started` | `{ destination, steps }` |
| `takemethere:step:complete` | `{ step, remaining }` |
| `takemethere:completed` | `{ destination }` |
| `takemethere:error` | `{ step, error }` |

### Graph Sync Events

| Event | Payload |
|---|---|
| `sync:started` | `{ appId }` |
| `sync:completed` | `{ triplesSync'd, duration }` |
| `sync:error` | `{ error }` |
