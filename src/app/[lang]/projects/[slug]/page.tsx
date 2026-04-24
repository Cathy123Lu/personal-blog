import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getAllProjects, getProject } from "@/lib/projects";
import zhDict from "@/i18n/zh.json";
import enDict from "@/i18n/en.json";

const dicts = { zh: zhDict, en: enDict };
type Lang = keyof typeof dicts;

export async function generateStaticParams() {
  const langs = ["zh", "en"];
  const params: { lang: string; slug: string }[] = [];
  for (const lang of langs) {
    getAllProjects(lang).forEach((p) => params.push({ lang, slug: p.slug }));
  }
  return params;
}

export default async function ProjectPage({ params }: PageProps<"/[lang]/projects/[slug]">) {
  const { lang, slug } = await params;
  const t = dicts[(lang as Lang) ?? "zh"];
  const project = getProject(slug, lang);
  if (!project) notFound();

  return (
    <div style={{ maxWidth: 760, margin: "0 auto", padding: "4rem 1.5rem" }}>
      {/* Header */}
      <div style={{ marginBottom: "2.5rem" }}>
        <span style={{ color: "var(--blue)", fontSize: "0.85rem", fontWeight: 500 }}>{project.role}</span>
        <h1
          style={{
            fontSize: "clamp(1.6rem, 4vw, 2.2rem)",
            fontWeight: 700,
            color: "#f1f5f9",
            lineHeight: 1.3,
            margin: "0.5rem 0 1rem",
          }}
        >
          {project.name}
        </h1>
        <p style={{ color: "var(--text-muted)", fontSize: "1rem", lineHeight: 1.7, marginBottom: "1.5rem" }}>
          {project.summary}
        </p>

        {/* Metrics */}
        {project.metrics.length > 0 && (
          <div
            style={{
              background: "var(--bg-card)",
              border: "1px solid var(--border)",
              borderRadius: 10,
              padding: "1.25rem 1.5rem",
              marginBottom: "1.5rem",
            }}
          >
            <p style={{ color: "var(--text-muted)", fontSize: "0.78rem", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.75rem" }}>
              Key Results
            </p>
            <div className="flex flex-wrap gap-2">
              {project.metrics.map((m) => (
                <span
                  key={m}
                  style={{
                    background: "rgba(59,130,246,0.08)",
                    border: "1px solid rgba(59,130,246,0.25)",
                    color: "#93c5fd",
                    borderRadius: 6,
                    padding: "4px 12px",
                    fontSize: "0.82rem",
                  }}
                >
                  {m}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Tech stack */}
        <div style={{ marginBottom: "0.5rem" }}>
          <p style={{ color: "var(--text-muted)", fontSize: "0.78rem", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.6rem" }}>
            {t.projects.tech_stack}
          </p>
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                style={{
                  background: "var(--bg-hover)",
                  border: "1px solid var(--border)",
                  color: "var(--text-muted)",
                  borderRadius: 5,
                  padding: "3px 10px",
                  fontSize: "0.8rem",
                }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* External links */}
        {project.links.length > 0 && (
          <div className="flex gap-3 mt-4">
            {project.links.map((l) => (
              <a
                key={l.url}
                href={l.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: "var(--blue)",
                  border: "1px solid var(--border)",
                  borderRadius: 6,
                  padding: "4px 14px",
                  fontSize: "0.85rem",
                  textDecoration: "none",
                  transition: "border-color 0.15s",
                }}
                className="hover:border-blue-500"
              >
                {l.label} ↗
              </a>
            ))}
          </div>
        )}
      </div>

      {/* Divider */}
      <hr style={{ border: "none", borderTop: "1px solid var(--border)", marginBottom: "2.5rem" }} />

      {/* Content */}
      <div className="prose">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{project.content}</ReactMarkdown>
      </div>

      {/* Back */}
      <div style={{ marginTop: "4rem", paddingTop: "2rem", borderTop: "1px solid var(--border)" }}>
        <a href={`/${lang}/projects`} style={{ color: "var(--blue)", fontSize: "0.9rem" }}>
          ← {t.nav.projects}
        </a>
      </div>
    </div>
  );
}
