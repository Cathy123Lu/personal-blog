---
title: "前端性能优化：LCP 从 4s 降到 1.2s 的实战复盘"
date: "2026-03-15"
summary: "通过资源预加载、图片优化、关键 CSS 内联等手段，将核心页面 LCP 从 4s 降至 1.2s 的完整过程。"
tags: ["性能优化", "Core Web Vitals", "LCP"]
---

## 背景

业务核心落地页 LCP 长期在 4s 左右，直接影响转化率。通过 Chrome DevTools 和 Lighthouse 定位后，发现三个主要瓶颈：

1. 首屏大图未做预加载
2. 关键 CSS 被 JS bundle 阻塞
3. 字体文件未做子集化

## 优化过程

### 1. 图片预加载 + 格式优化

```html
<link rel="preload" as="image" href="/hero.webp" fetchpriority="high" />
```

同时将 PNG 转为 WebP，体积减少 62%。

### 2. 关键 CSS 内联

将首屏所需的约 4KB CSS 直接内联到 `<head>`，消除渲染阻塞。

```js
// next.config.ts
experimental: { optimizeCss: true }
```

### 3. 字体子集化

使用 `pyftsubset` 将中文字体从 3.2MB 裁剪到 180KB，只保留页面实际用到的字符集。

## 结果

| 指标 | 优化前 | 优化后 |
|------|--------|--------|
| LCP  | 4.1s   | 1.2s   |
| FID  | 180ms  | 45ms   |
| CLS  | 0.18   | 0.02   |

Lighthouse Performance 分数从 52 提升到 94。

## 复盘

性能优化的关键是**先测量再优化**，不要凭感觉猜瓶颈。每次改动后都要用 WebPageTest 做多地域测试，避免本地缓存干扰结论。
