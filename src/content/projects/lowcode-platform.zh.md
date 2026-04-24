---
name: "低代码平台可视化搭建引擎"
date: "2025-08"
role: "前端负责人"
summary: "从零设计并实现面向运营的低代码搭建平台，支持拖拽布局、组件配置、数据绑定与一键发布，上线后替代 80% 的人工页面开发需求。"
techStack: ["React", "TypeScript", "Zustand", "React DnD", "Vite", "Node.js", "MongoDB"]
metrics:
  - "页面交付周期从 3 天压缩到 2 小时"
  - "运营自助发布率达 80%"
  - "组件库复用率 92%"
  - "平台月活跃用户 200+"
links: []
---

## 背景与挑战

业务运营每周需要上线 10~15 个活动页面，全部依赖前端手工开发，交付周期 3 天，严重制约业务节奏。

核心挑战：
1. 组件状态与画布状态的一致性管理
2. 拖拽排序与嵌套布局的复杂交互
3. 数据绑定的动态表达式求值
4. 发布流程的版本管理与回滚

## 架构设计

### 核心数据模型

```ts
interface Schema {
  id: string;
  type: string;           // 组件类型
  props: Record<string, unknown>;
  children?: Schema[];
  dataBindings?: Record<string, string>; // 表达式绑定
}
```

画布状态用 Zustand 管理，操作历史用 Command Pattern 实现 undo/redo，最多保留 50 步。

### 拖拽引擎

基于 React DnD 实现，区分三种拖拽场景：
- 从组件面板拖入画布（新增）
- 画布内排序（移动）
- 跨容器嵌套（重组）

每种场景对应独立的 drop handler，避免状态混乱。

### 表达式求值

数据绑定支持简单表达式，如 `{{user.name}}` 或 `{{price * 0.9}}`，运行时通过沙箱 `new Function` 求值，并做了超时保护（50ms）。

## 关键决策

**为什么选 Zustand 而非 Redux？**  
画布操作频繁（每次拖拽触发多次状态更新），Redux 的 action/reducer 模式在这里引入了不必要的样板代码。Zustand 的 immer 中间件让嵌套状态更新更直观，且包体积小 8 倍。

## 结果

| 指标 | 上线前 | 上线后 |
|------|--------|--------|
| 页面交付周期 | 3 天 | 2 小时 |
| 运营自助发布率 | 0% | 80% |
| 前端人力节省 | — | 约 2 人/月 |
