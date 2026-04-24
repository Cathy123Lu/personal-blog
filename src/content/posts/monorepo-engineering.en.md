---
title: "Monorepo Engineering: Building Frontend Infrastructure from Scratch"
date: "2026-01-20"
summary: "Using pnpm workspace + Turborepo to unify lint, test, and build pipelines across 6 projects, cutting CI time from 18 minutes to 4."
tags: ["Engineering", "Monorepo", "CI/CD", "Turborepo"]
---

## Why Monorepo

The team had 6 separate frontend projects, each maintaining its own ESLint config, Prettier rules, and TypeScript version. This caused:

- The same bug fixed 6 separate times across repos
- New engineers needing to learn 6 different tooling setups
- No CI cache reuse — full builds taking 18 minutes every time

## Tech Choices

- **Package manager**: pnpm workspace (60% less disk usage than npm)
- **Task orchestration**: Turborepo (incremental builds + remote cache)
- **Shared packages**: `@company/ui`, `@company/utils`, `@company/eslint-config`

## Key Config

```json
// turbo.json
{
  "pipeline": {
    "build": { "dependsOn": ["^build"], "outputs": ["dist/**"] },
    "lint": { "outputs": [] },
    "test": { "outputs": ["coverage/**"] }
  }
}
```

## Results

| Metric | Before | After |
|--------|--------|-------|
| CI duration | 18 min | 4 min |
| Shared component copies | 6 | 1 |
| New engineer setup time | 2 days | 2 hours |

## Gotchas

1. pnpm's `shamefully-hoist` is required for some legacy deps — without it, modules won't resolve at runtime.
2. Turborepo remote cache needs a Vercel account or self-hosted cache server. Local cache is fine for dev.
