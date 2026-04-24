---
title: "Monorepo 工程化实践：从零搭建前端基础设施"
date: "2026-01-20"
summary: "基于 pnpm workspace + Turborepo 搭建 Monorepo，统一 lint、测试、构建流水线，将 CI 时间从 18 分钟压缩到 4 分钟。"
tags: ["工程化", "Monorepo", "CI/CD", "Turborepo"]
---

## 为什么要做 Monorepo

团队有 6 个前端项目，各自维护 ESLint 配置、Prettier 规则、TypeScript 版本，导致：

- 同一个 bug 在不同项目里修了 6 次
- 新人上手需要理解 6 套不同的工程配置
- CI 无法复用缓存，每次全量构建耗时 18 分钟

## 技术选型

- **包管理**：pnpm workspace（磁盘占用比 npm 少 60%）
- **任务编排**：Turborepo（增量构建 + 远程缓存）
- **共享包**：`@company/ui`、`@company/utils`、`@company/eslint-config`

## 关键配置

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

## 结果

| 指标 | 改造前 | 改造后 |
|------|--------|--------|
| CI 时长 | 18 min | 4 min |
| 共享组件重复代码 | 6 份 | 1 份 |
| 新人配置上手时间 | 2 天 | 2 小时 |

## 踩坑记录

1. pnpm 的 `shamefully-hoist` 在某些旧依赖下必须开启，否则运行时找不到模块。
2. Turborepo 远程缓存需要 Vercel 账号或自建 cache server，本地开发用本地缓存即可。
