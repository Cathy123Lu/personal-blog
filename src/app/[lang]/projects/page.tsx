import Link from "next/link";
import { getAllProjects } from "@/lib/projects";
import zhDict from "@/i18n/zh.json";
import enDict from "@/i18n/en.json";

const dicts = { zh: zhDict, en: enDict };
type Lang = keyof typeof dicts;

export async function generateStaticParams() {
  return [{ lang: "zh" }, { lang: "en" }];
}

export default async function ProjectsPage({ params }: PageProps<"/[lang]/projects">) {
  const { lang } = await params;
  const t = dicts[(lang as Lang) ?? "zh"];
  const projects = getAllProjects(lang);

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "4rem 1.5rem" }}>
      <h1 style={{ fontSize: "2rem", fontWeight: 700, color: "#f1f5f9", marginBottom: "0.5rem" }}>
        {t.projects.title}
      </h1>
      <p style={{ color: "var(--text-muted)", marginBottom: "3rem" }}>{t.projects.subtitle}</p>

      <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        {projects.map((project) => (
          <Link key={project.slug} href={`/${lang}/projects/${project.slug}`} style={{ textDecoration: "none" }}>
            <article
              style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border)",
                borderRadius: 12,
                padding: "1.75rem",
                transition: "border-color 0.15s",
              }}
              className="hover:border-blue-500"
            >
              {/* Header row */}
              <div className="flex items-start justify-between gap-4 flex-wrap mb-3">
                <div>
                  <h2 style={{ fontSize: "1.15rem", fontWeight: 600, color: "#f1f5f9", marginBottom: "0.25rem" }}>
                    {project.name}
                  </h2>
                  <span style={{ color: "var(--blue)", fontSize: "0.82rem" }}>{project.role}</span>
                </div>
                <span style={{ color: "var(--text-muted)", fontSize: "0.8rem", whiteSpace: "nowrap" }}>
                  {project.date}
                </span>
              </div>

              {/* Summary */}
              <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", lineHeight: 1.7, marginBottom: "1.25rem" }}>
                {project.summary}
              </p>

              {/* Metrics */}
              {project.metrics.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.metrics.map((m) => (
                    <span
                      key={m}
                      style={{
                        background: "rgba(59,130,246,0.08)",
                        border: "1px solid rgba(59,130,246,0.25)",
                        color: "#93c5fd",
                        borderRadius: 6,
                        padding: "3px 10px",
                        fontSize: "0.78rem",
                        fontVariantNumeric: "tabular-nums",
                      }}
                    >
                      {m}
                    </span>
                  ))}
                </div>
              )}

              {/* Tech stack */}
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    style={{
                      background: "var(--bg-hover)",
                      border: "1px solid var(--border)",
                      color: "var(--text-muted)",
                      borderRadius: 5,
                      padding: "2px 9px",
                      fontSize: "0.75rem",
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </article>
          </Link>
        ))}
      </div>
    </div>
  );
}
