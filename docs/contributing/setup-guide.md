---
id: setup-guide
title: Documentation Setup Guide
sidebar_label: Setup Guide
---

# How This Documentation Was Built

This page documents how the ConCRG product documentation site was created — from gathering source material to deploying on GitHub Pages with Docusaurus.

---

## Overview

The documentation was built by:
1. Reading product context from Google Drive (architecture, product concepts, priorities)
2. Exploring the frontend codebase at `crg-platform`
3. Generating all documentation content from those sources
4. Scaffolding a Docusaurus 3.x site
5. Resolving Windows + webpack compatibility issues
6. Deploying to GitHub Pages via GitHub Actions

---

## Source Material

Two sources were used to write the documentation:

### Google Drive (`docs/` folder, shared)
| File | Content Used For |
|---|---|
| `PRODUCT_CONCEPTS.md` | S-FLPR modes, C1–C9 concepts, design principles |
| `ARCHITECTURE.md` | System overview diagram, package structure, tech stack |
| `PRODUCT_PRIORITIES.md` | Mode priority order, user research findings, competitive landscape |
| `DEPLOYMENT_STRATEGY.md` | Hono rationale, deployment options |
| `Concierge: Brand And Marketing Strategy` | Vision statement, problem framing, channel strategy |

### Frontend Codebase (`crg-platform/`)
The codebase was explored to extract:
- Monorepo package structure (`connector-core`, `connector-react`, `sidecar-ui`, `train-service`)
- All MessageBus event names and payloads
- `CRGConfig` interface and all options
- Train Service API routes
- Training source implementations (Probe, Code, Docs, Chat)
- Crawler modes (`legacy` vs `stategraph`)

---

## Documentation Structure

```
docs/
├── intro.md                        # Introduction, problem, S-FLPR overview
├── getting-started/
│   ├── quick-start.md              # 5-minute setup
│   ├── installation.md             # Packages, Train Service, Graph Service
│   └── configuration.md           # Full CRGConfig reference
├── how-it-works/
│   ├── overview.md                 # Training → Assist data flow
│   ├── s-flpr-framework.md         # SENSE/FIND/LEARN/PRACTICE/REMEMBER
│   ├── knowledge-graph.md          # RDF triples, ApplicationSitemap, Graph RAG
│   └── training-sources.md         # Probe, Code, Docs, Chat comparison
├── modes/
│   ├── find.md
│   ├── learn.md
│   ├── practice.md
│   └── remember.md
├── training/
│   ├── probe.md                    # DOM explorer, crawler modes, events
│   ├── code-analysis.md            # AST + LLM, zip upload
│   ├── docs-crawl.md               # Streaming NDJSON crawl
│   └── chat.md                     # Conversational knowledge input
├── integration/
│   ├── react.md                    # CRGProvider setup, React Router
│   ├── configuration.md            # API reference, MessageBus events
│   └── architecture.md             # Full system diagram, tech stack
├── concepts/
│   ├── concierge-principle.md
│   ├── adaptive-response.md
│   ├── sentient-software.md
│   └── practice-as-assessment.md
└── contributing/
    └── setup-guide.md              # This file
```

---

## Tech Stack

- **Framework:** [Docusaurus 3.6.3](https://docusaurus.io)
- **Package manager:** pnpm 10.x (npm fails on Windows due to MAX_PATH limits with webpack's deep `node_modules` tree)
- **Deployment:** GitHub Actions → GitHub Pages
- **Hosting:** `https://altrium-io.github.io/concrg-docs/`

---

## Installation

```bash
# Clone the repo
git clone https://github.com/altrium-io/concrg-docs
cd concrg-docs

# Install dependencies (use pnpm — npm will fail on Windows)
pnpm install

# Start local dev server
pnpm start

# Build for production
pnpm run build
```

---

## Windows-Specific Issues & Fixes

Two compatibility issues arose on Windows with Node v22 and pnpm v10:

### Issue 1: npm MAX_PATH failure

`npm install` fails on Windows because webpack's `node_modules` tree creates file paths exceeding Windows' 260-character MAX_PATH limit.

**Fix:** Use `pnpm` instead of `npm`. pnpm's content-addressable store avoids deeply nested `node_modules`.

### Issue 2: webpackbar@6 + webpack@5.106.2 schema conflict

**Root cause:** `@docusaurus/bundler` depends on `webpackbar@6`, which extends `webpack.ProgressPlugin` but overwrites `this.options` with custom properties (`name`, `color`, `reporters`, `reporter`) after calling `super()`. Webpack then validates `this.options` against the ProgressPlugin JSON schema, which has `additionalProperties: false` — causing a `ValidationError`.

**Fix:** A pnpm patch on `webpack@5.106.2` sets `additionalProperties: true` in `schemas/plugins/ProgressPlugin.json`.

The patch is in `patches/webpack@5.106.2.patch` and is applied automatically by pnpm on install.

```json title="package.json (relevant section)"
{
  "pnpm": {
    "overrides": {
      "webpack-dev-server": "^4.15.2"
    },
    "patchedDependencies": {
      "webpack@5.106.2": "patches/webpack@5.106.2.patch"
    }
  }
}
```

---

## GitHub Pages Deployment

Deployment is fully automated via `.github/workflows/deploy.yml`.

**How it works:**
1. Push to `main` branch
2. GitHub Actions builds the Docusaurus site on Ubuntu / Node 20
3. Static files are uploaded as a Pages artifact
4. GitHub Pages deploys the artifact

**First-time setup:**
1. Go to your repo → **Settings → Pages**
2. Set **Source** to `GitHub Actions`
3. Push to `main` — the workflow handles the rest

**Live URL:** `https://altrium-io.github.io/concrg-docs/`

---

## Editing the Docs

All documentation is in `docs/` as standard Markdown files. Edit locally, commit, and push to `main`. GitHub Actions redeploys automatically within ~2 minutes.

```bash
# Edit a file
code docs/modes/find.md

# Commit and push
git add docs/modes/find.md
git commit -m "Update FIND mode docs"
git push
```
