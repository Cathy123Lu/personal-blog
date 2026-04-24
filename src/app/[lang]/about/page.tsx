import zhDict from "@/i18n/zh.json";
import enDict from "@/i18n/en.json";

const dicts = { zh: zhDict, en: enDict };
type Lang = keyof typeof dicts;

export async function generateStaticParams() {
  return [{ lang: "zh" }, { lang: "en" }];
}

const experienceData = {
  zh: [
    {
      period: "2022.03 — 至今",
      company: "字节跳动",
      role: "高级前端工程师",
      bullets: [
        "主导抖音 Web 端核心功能开发，负责亿级 DAU 场景下的性能优化专项",
        "建立前端监控与告警体系，LCP 指标降低 40%，FID 降低 55%",
        "推动 Monorepo 工程化改造，统一构建链路，团队协作效率提升 30%",
        "参与制定前端技术规范，推进 TypeScript 全量迁移",
      ],
    },
    {
      period: "2019.07 — 2022.02",
      company: "美团",
      role: "前端工程师",
      bullets: [
        "负责外卖 H5 核心交易链路开发，支撑大促活动高并发场景",
        "主导内部组件库建设，覆盖 20+ 业务团队，组件复用率提升 60%",
        "推进 Webpack 到 Vite 的构建工具迁移，冷启动速度提升 8 倍",
        "参与 BFF 层设计，优化前后端协作模式",
      ],
    },
    {
      period: "2017.07 — 2019.06",
      company: "网易",
      role: "前端工程师",
      bullets: [
        "参与新闻客户端 Web 端核心功能开发与维护",
        "负责营销活动页面开发，独立完成 10+ 大型活动落地页",
        "引入 Vue 技术栈，推动团队从 jQuery 向现代框架迁移",
      ],
    },
  ],
  en: [
    {
      period: "2022.03 — Present",
      company: "ByteDance",
      role: "Senior Frontend Engineer",
      bullets: [
        "Led core feature development for TikTok Web, driving performance optimization at 100M+ DAU scale",
        "Built frontend monitoring and alerting system, reducing LCP by 40% and FID by 55%",
        "Drove Monorepo migration to unify build pipelines, improving team collaboration efficiency by 30%",
        "Established frontend coding standards and led full TypeScript migration",
      ],
    },
    {
      period: "2019.07 — 2022.02",
      company: "Meituan",
      role: "Frontend Engineer",
      bullets: [
        "Developed core transaction flows for the food delivery H5 app, supporting high-concurrency promotions",
        "Led internal component library covering 20+ business teams, boosting reuse rate by 60%",
        "Migrated build tooling from Webpack to Vite, achieving 8× faster cold starts",
        "Participated in BFF layer design to improve frontend-backend collaboration",
      ],
    },
    {
      period: "2017.07 — 2019.06",
      company: "NetEase",
      role: "Frontend Engineer",
      bullets: [
        "Developed and maintained core features for the NetEase News web client",
        "Independently delivered 10+ large-scale marketing campaign landing pages",
        "Introduced Vue.js and led team migration from jQuery to modern frameworks",
      ],
    },
  ],
};

const skillsData = [
  {
    categoryKey: "frontend",
    skills: [
      { name: "React", level: 5 },
      { name: "Vue", level: 4 },
      { name: "Next.js", level: 4 },
      { name: "Nuxt", level: 3 },
    ],
  },
  {
    categoryKey: "tooling",
    skills: [
      { name: "Webpack", level: 5 },
      { name: "Vite", level: 4 },
      { name: "Rollup", level: 4 },
      { name: "Turbopack", level: 3 },
    ],
  },
  {
    categoryKey: "language",
    skills: [
      { name: "TypeScript", level: 5 },
      { name: "JavaScript", level: 5 },
      { name: "CSS / Sass", level: 4 },
      { name: "Node.js", level: 4 },
    ],
  },
  {
    categoryKey: "testing",
    skills: [
      { name: "Jest", level: 4 },
      { name: "Playwright", level: 4 },
      { name: "Vitest", level: 3 },
      { name: "Storybook", level: 3 },
    ],
  },
  {
    categoryKey: "backend",
    skills: [
      { name: "GraphQL", level: 3 },
      { name: "REST API", level: 5 },
      { name: "Express", level: 3 },
      { name: "Prisma", level: 2 },
    ],
  },
  {
    categoryKey: "devops",
    skills: [
      { name: "Git", level: 5 },
      { name: "CI/CD", level: 4 },
      { name: "Docker", level: 3 },
      { name: "Linux", level: 3 },
    ],
  },
];

function SkillBar({ level }: { level: number }) {
  return (
    <div style={{ display: "flex", gap: 3, alignItems: "center" }}>
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          style={{
            width: 20,
            height: 4,
            borderRadius: 2,
            background: i < level ? "var(--blue)" : "var(--border)",
            opacity: i < level ? 1 - i * 0.08 : 1,
          }}
        />
      ))}
    </div>
  );
}

export default async function AboutPage({ params }: PageProps<"/[lang]/about">) {
  const { lang } = await params;
  const t = dicts[(lang as Lang) ?? "zh"];
  const experiences = experienceData[(lang as Lang) ?? "zh"];

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "4rem 1.5rem" }}>
      {/* Header */}
      <h1 style={{ fontSize: "2rem", fontWeight: 700, color: "#f1f5f9", marginBottom: "0.75rem" }}>
        {t.about.title}
      </h1>
      <p style={{ color: "var(--text-muted)", fontSize: "1rem", lineHeight: 1.8, maxWidth: 620, marginBottom: "4rem" }}>
        {t.about.bio}
      </p>

      {/* Experience Timeline */}
      <section style={{ marginBottom: "4.5rem" }}>
        <h2 style={{ fontSize: "1.25rem", fontWeight: 600, color: "#f1f5f9", marginBottom: "0.35rem" }}>
          {t.about.experience_title}
        </h2>
        <p style={{ color: "var(--text-muted)", fontSize: "0.875rem", marginBottom: "2.5rem" }}>
          {t.about.experience_subtitle}
        </p>

        <div style={{ position: "relative", paddingLeft: "1.75rem" }}>
          {/* vertical line */}
          <div
            style={{
              position: "absolute",
              left: 6,
              top: 8,
              bottom: 8,
              width: 1,
              background: "var(--border)",
            }}
          />

          <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
            {experiences.map((exp, idx) => (
              <div key={idx} style={{ position: "relative" }}>
                {/* dot */}
                <div
                  style={{
                    position: "absolute",
                    left: -22,
                    top: 6,
                    width: 10,
                    height: 10,
                    borderRadius: "50%",
                    background: idx === 0 ? "var(--blue)" : "var(--bg-card)",
                    border: `2px solid ${idx === 0 ? "var(--blue)" : "var(--border)"}`,
                    zIndex: 1,
                  }}
                />

                <div
                  style={{
                    background: "var(--bg-card)",
                    border: "1px solid var(--border)",
                    borderRadius: 10,
                    padding: "1.25rem 1.5rem",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      alignItems: "baseline",
                      gap: "0.5rem 1rem",
                      marginBottom: "0.75rem",
                    }}
                  >
                    <span style={{ color: "#f1f5f9", fontWeight: 600, fontSize: "1rem" }}>
                      {exp.company}
                    </span>
                    <span style={{ color: "var(--blue)", fontSize: "0.875rem", fontWeight: 500 }}>
                      {exp.role}
                    </span>
                    <span
                      style={{
                        marginLeft: "auto",
                        color: "var(--text-muted)",
                        fontSize: "0.8rem",
                        fontVariantNumeric: "tabular-nums",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {exp.period}
                    </span>
                  </div>

                  <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                    {exp.bullets.map((bullet, bi) => (
                      <li key={bi} style={{ display: "flex", gap: "0.5rem", color: "var(--text-muted)", fontSize: "0.875rem", lineHeight: 1.65 }}>
                        <span style={{ color: "var(--blue)", flexShrink: 0, marginTop: "0.1em" }}>·</span>
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Matrix */}
      <section>
        <h2 style={{ fontSize: "1.25rem", fontWeight: 600, color: "#f1f5f9", marginBottom: "0.35rem" }}>
          {t.about.skills_title}
        </h2>
        <p style={{ color: "var(--text-muted)", fontSize: "0.875rem", marginBottom: "2.5rem" }}>
          {t.about.skills_subtitle}
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
            gap: "1rem",
          }}
        >
          {skillsData.map((cat) => (
            <div
              key={cat.categoryKey}
              style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border)",
                borderRadius: 10,
                padding: "1.25rem 1.5rem",
              }}
            >
              <p
                style={{
                  color: "var(--text-muted)",
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  marginBottom: "1rem",
                }}
              >
                {(t.about.skill_categories as Record<string, string>)[cat.categoryKey]}
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                {cat.skills.map((skill) => (
                  <div key={skill.name} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "0.75rem" }}>
                    <span style={{ color: "var(--text)", fontSize: "0.875rem", minWidth: 0 }}>{skill.name}</span>
                    <SkillBar level={skill.level} />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section style={{ marginTop: "4.5rem" }}>
        <h2 style={{ fontSize: "1.25rem", fontWeight: 600, color: "#f1f5f9", marginBottom: "1.5rem" }}>
          {t.about.contact_title}
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
          {[
            { label: "GitHub", value: "github.com/luxin-fe", href: "https://github.com" },
            { label: "Email", value: "luxin@example.com", href: "mailto:luxin@example.com" },
            { label: lang === "zh" ? "掘金" : "Juejin", value: "juejin.cn/user/luxin", href: "https://juejin.cn" },
          ].map((c) => (
            <a
              key={c.label}
              href={c.href}
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: "inline-flex", alignItems: "center", gap: "1rem", textDecoration: "none", width: "fit-content" }}
            >
              <span style={{ color: "var(--text-muted)", fontSize: "0.85rem", minWidth: 64 }}>{c.label}</span>
              <span style={{ color: "var(--blue)", fontSize: "0.9rem" }} className="hover:text-blue-300">
                {c.value} ↗
              </span>
            </a>
          ))}
        </div>
      </section>

    </div>
  );
}
