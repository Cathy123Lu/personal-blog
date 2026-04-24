---
title: "Frontend Performance: Cutting LCP from 4s to 1.2s"
date: "2026-03-15"
summary: "A full walkthrough of reducing LCP from 4s to 1.2s using resource preloading, image optimization, and critical CSS inlining."
tags: ["Performance", "Core Web Vitals", "LCP"]
---

## Background

Our core landing page had an LCP consistently around 4s, directly hurting conversion rates. After profiling with Chrome DevTools and Lighthouse, three bottlenecks stood out:

1. Hero image had no preload hint
2. Critical CSS was blocked by the JS bundle
3. Font files were not subsetted

## Optimizations

### 1. Image Preload + Format Upgrade

```html
<link rel="preload" as="image" href="/hero.webp" fetchpriority="high" />
```

Converting PNG to WebP reduced image size by 62%.

### 2. Critical CSS Inlining

Inlined ~4KB of above-the-fold CSS directly into `<head>`, eliminating render-blocking.

```js
// next.config.ts
experimental: { optimizeCss: true }
```

### 3. Font Subsetting

Used `pyftsubset` to trim the Chinese font from 3.2MB down to 180KB, keeping only characters actually used on the page.

## Results

| Metric | Before | After |
|--------|--------|-------|
| LCP    | 4.1s   | 1.2s  |
| FID    | 180ms  | 45ms  |
| CLS    | 0.18   | 0.02  |

Lighthouse Performance score went from 52 to 94.

## Takeaway

The key to performance work is **measure first, optimize second**. Never guess at bottlenecks. Always validate with WebPageTest across multiple regions to avoid local cache skewing results.
