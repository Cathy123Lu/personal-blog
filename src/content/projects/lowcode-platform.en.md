---
name: "Low-Code Visual Page Builder"
date: "2025-08"
role: "Frontend Lead"
summary: "Designed and built a drag-and-drop low-code platform for operations teams, supporting layout composition, component config, data binding, and one-click publishing. Replaced 80% of manual page development after launch."
techStack: ["React", "TypeScript", "Zustand", "React DnD", "Vite", "Node.js", "MongoDB"]
metrics:
  - "Page delivery time: 3 days → 2 hours"
  - "Ops self-publishing rate: 80%"
  - "Component reuse rate: 92%"
  - "200+ monthly active platform users"
links: []
---

## Background & Challenges

The ops team needed 10–15 campaign pages per week, all hand-coded by frontend engineers. A 3-day delivery cycle was throttling business velocity.

Key challenges:
1. Keeping component state and canvas state in sync
2. Complex drag interactions: sorting, nesting, cross-container moves
3. Dynamic expression evaluation for data bindings
4. Version management and rollback in the publish pipeline

## Architecture

### Core Data Model

```ts
interface Schema {
  id: string;
  type: string;           // component type
  props: Record<string, unknown>;
  children?: Schema[];
  dataBindings?: Record<string, string>; // expression bindings
}
```

Canvas state is managed with Zustand. Edit history uses the Command Pattern for undo/redo, capped at 50 steps.

### Drag Engine

Built on React DnD, handling three distinct drag scenarios:
- Panel → canvas (insert)
- Canvas reorder (move)
- Cross-container nesting (restructure)

Each scenario has its own drop handler to prevent state corruption.

### Expression Evaluation

Data bindings support simple expressions like `{{user.name}}` or `{{price * 0.9}}`, evaluated at runtime via sandboxed `new Function` with a 50ms timeout guard.

## Key Decision

**Why Zustand over Redux?**  
Canvas operations are high-frequency (multiple state updates per drag). Redux's action/reducer pattern added unnecessary boilerplate here. Zustand's immer middleware makes nested state updates cleaner, and the bundle is 8× smaller.

## Results

| Metric | Before | After |
|--------|--------|-------|
| Page delivery time | 3 days | 2 hours |
| Ops self-publishing rate | 0% | 80% |
| Frontend effort saved | — | ~2 eng/month |
