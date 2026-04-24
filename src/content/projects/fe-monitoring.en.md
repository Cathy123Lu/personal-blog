---
name: "Frontend Observability & Alerting Platform"
date: "2024-06"
role: "Core Engineer"
summary: "Built a full-coverage frontend observability platform collecting Core Web Vitals, JS errors, and API failures across all business lines. Integrated with on-call systems, cutting mean time to detect from 40 minutes to 3 minutes."
techStack: ["Vue 3", "TypeScript", "ECharts", "Kafka", "ClickHouse", "Node.js"]
metrics:
  - "Mean time to detect: 40min → 3min"
  - "12 business lines, 20M+ daily events"
  - "False positive rate < 2%"
  - "P99 query latency < 800ms"
links: []
---

## Background

Frontend issues were discovered through user complaints or indirect backend logs, with a mean detection time of 40 minutes — directly hurting user experience and business metrics.

## System Architecture

```
Browser SDK → Kafka → Consumer → ClickHouse
                                      ↓
                              Query API (Node.js)
                                      ↓
                              Dashboard (Vue 3)
                                      ↓
                              Alert Rule Engine → DingTalk/Feishu
```

### Browser SDK Design

Lightweight SDK (4KB gzipped). Collects LCP/CLS/INP via `PerformanceObserver`, JS errors via `window.onerror` + `unhandledrejection`, and API failures via XHR/Fetch interception.

Reporting strategy:
- Prefer `sendBeacon` (no data loss on page unload)
- Local aggregation with batch upload (every 5s or 20 events)
- Remote-configurable sampling rate (auto-reduces during peak traffic)

### Alert Rule Engine

Two rule types:
1. **Threshold alerts**: error rate > 1% for 3 consecutive minutes
2. **Week-over-week alerts**: > 50% spike vs same time last week

Rules stored in MySQL. A Node.js cron job queries ClickHouse aggregates every minute and pushes to DingTalk/Feishu webhooks on match.

## Key Optimizations

**ClickHouse tuning**: Using time as partition key and error type as sort key dropped P99 query time from 4s to 800ms.

**False positive suppression**: Sliding window counting — a single spike doesn't trigger; only 3 consecutive windows over threshold fire an alert. False positive rate dropped from 15% to 2%.

## Results

| Metric | Before | After |
|--------|--------|-------|
| Mean detection time | 40 min | 3 min |
| Business lines covered | 0 | 12 |
| Alert false positive rate | — | < 2% |
