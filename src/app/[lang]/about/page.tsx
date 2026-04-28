import zhDict from "@/i18n/zh.json";
import enDict from "@/i18n/en.json";

const dicts = { zh: zhDict, en: enDict };
type Lang = keyof typeof dicts;

export async function generateStaticParams() {
  return [{ lang: "zh" }, { lang: "en" }];
}

const skillsData = [
  {
    categoryKey: "frontend",
    skills: [
      { name: "React", level: 5 },
      { name: "Vue", level: 4 },
      { name: "Next.js", level: 4 },
      { name: "TypeScript", level: 5 },
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
      { name: "JavaScript", level: 5 },
      { name: "CSS / Sass", level: 4 },
      { name: "Node.js", level: 4 },
      { name: "Python", level: 3 },
    ],
  },
  {
    categoryKey: "ai",
    skills: [
      { name: "Claude API", level: 4 },
      { name: "OpenAI API", level: 3 },
      { name: "Prompt Engineering", level: 4 },
      { name: "LangChain", level: 2 },
    ],
  },
  {
    categoryKey: "backend",
    skills: [
      { name: "REST API", level: 5 },
      { name: "Express", level: 3 },
      { name: "GraphQL", level: 3 },
      { name: "Prisma", level: 2 },
    ],
  },
  {
    categoryKey: "devops",
    skills: [
      { name: "Git", level: 5 },
      { name: "CI/CD", level: 4 },
      { name: "Docker", level: 3 },
      { name: "Vercel", level: 4 },
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

  const bioLines = t.about.bio.split("\n\n");

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "4rem 1.5rem" }}>
      {/* Header */}
      <h1 style={{ fontSize: "2rem", fontWeight: 700, color: "#f1f5f9", marginBottom: "1.5rem" }}>
        {t.about.title}
      </h1>
      <div style={{ maxWidth: 620, marginBottom: "4rem" }}>
        <p style={{ color: "var(--blue)", fontSize: "1.05rem", fontWeight: 500, marginBottom: "0.75rem", fontStyle: "italic" }}>
          {bioLines[0]}
        </p>
        {bioLines[1] && (
          <p style={{ color: "var(--text-muted)", fontSize: "1rem", lineHeight: 1.8 }}>
            {bioLines[1]}
          </p>
        )}
      </div>

      {/* Skills Matrix */}
      <section style={{ marginBottom: "4.5rem" }}>
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
      <section>
        <h2 style={{ fontSize: "1.25rem", fontWeight: 600, color: "#f1f5f9", marginBottom: "1.5rem" }}>
          {t.about.contact_title}
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
          {[
            { label: "GitHub", value: "github.com/Cathy123Lu", href: "https://github.com/Cathy123Lu" },
            { label: "Email", value: "sunshineBWG56@163.com", href: "mailto:sunshineBWG56@163.com" },
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
