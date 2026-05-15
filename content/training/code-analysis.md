---
id: code-analysis
title: Code Analysis Training
sidebar_label: Code Analysis
---

# Code Analysis Training

The Code training source analyzes your frontend source files to extract structural knowledge that's invisible to interface inspection alone — route definitions, data models, and permission rules.

---

## What It Extracts

| Category | Examples |
|---|---|
| **Routes** | Every page path and its hierarchy |
| **Data models** | Entities like Deal, Contact, Invoice — their fields and relationships |
| **Component structure** | How UI components compose and relate to each other |
| **Permission rules** | Which roles can access which routes and features |
| **Workflow logic** | Multi-step sequences and conditional flows |

---

## Running Code Analysis

### Option A: Local source directory

Point ConCRG at your frontend source folder in the training panel. It reads and analyzes the files automatically.

### Option B: Zip upload

If the Train Service is running remotely, upload a zip of your source via the training panel — click **Upload ZIP** in the Code section.

---

## Tips

- **Include your routes file** — ensure your routing configuration is within the source path
- **Include type and model definitions** — these dramatically improve knowledge quality
- **Enable enhanced analysis** for codebases with complex permission logic or multi-step flows
