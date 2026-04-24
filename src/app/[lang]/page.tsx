import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import { getAllProjects } from "@/lib/projects";
import zhDict from "@/i18n/zh.json";
import enDict from "@/i18n/en.json";

const dicts = { zh: zhDict, en: enDict };
type Lang = keyof typeof dicts;

export default async function HomePage({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  const t = dicts[(lang as Lang) ?? "zh"];
  const featuredPosts = getAllPosts(lang).slice(0, 2);
  const featuredProjects = getAllProjects(lang).slice(0, 2);

  const techStack = [
    "React", "Vue", "TypeScript", "Next.js", "Webpack", "Vite",
    "Node.js", "GraphQL", "Tailwind CSS", "Jest", "Playwright", "CI/CD",
  ];

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 1.5rem" }}>
      {/* Hero */}
      <section className="py-24">
        <p style={{ color: "var(--text-muted)", fontSize: "1rem", marginBottom: "0.5rem" }}>
          {t.home.greeting}
        </p>
        <h1
          style={{
            fontSize: "clamp(2.2rem, 5vw, 3.5rem)",
            fontWeight: 700,
            letterSpacing: "-0.03em",
            color: "#f1f5f9",
            lineHeight: 1.15,
            marginBottom: "0.5rem",
          }}
        >
          {t.home.name}
        </h1>
        <h2
          style={{
            fontSize: "clamp(1.1rem, 2.5vw, 1.5rem)",
            fontWeight: 400,
            color: "var(--blue)",
            marginBottom: "1.5rem",
          }}
        >
          {t.home.title}
        </h2>
        <p
          style={{
            color: "var(--text-muted)",
            fontSize: "1.05rem",
            lineHeight: 1.8,
            maxWidth: 560,
            marginBottom: "2.5rem",
          }}
        >
          {t.home.bio}
        </p>
        <div className="flex gap-4 flex-wrap">
          <Link
            href={`/${lang}/posts`}
            style={{
              background: "var(--blue)",
              color: "#fff",
              padding: "0.6rem 1.5rem",
              borderRadius: 8,
              fontWeight: 500,
              fontSize: "0.95rem",
              transition: "background 0.15s",
            }}
            className="hover:opacity-90"
          >
            {t.home.cta_posts}
          </Link>
          <Link
            href={`/${lang}/projects`}
            style={{
              border: "1px solid var(--border)",
              color: "var(--text)",
              padding: "0.6rem 1.5rem",
              borderRadius: 8,
              fontWeight: 500,
              fontSize: "0.95rem",
              transition: "border-color 0.15s",
            }}
            className="hover:border-blue-500"
          >
            {t.home.cta_projects}
          </Link>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="pb-20">
        <div className="flex flex-wrap gap-2">
          {techStack.map((tech) => (
            <span
              key={tech}
              style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border)",
                color: "var(--text-muted)",
                borderRadius: 6,
                padding: "4px 12px",
                fontSize: "0.82rem",
              }}
            >
              {tech}
            </span>
          ))}
        </div>
      </section>

      {/* Featured Posts */}
      <section className="pb-20">
        <div className="flex items-center justify-between mb-8">
          <h3 style={{ fontSize: "1.2rem", fontWeight: 600, color: "#f1f5f9" }}>
            {t.home.featured_posts}
          </h3>
          <Link href={`/${lang}/posts`} style={{ color: "var(--blue)", fontSize: "0.9rem" }}>
            {t.home.view_all} →
          </Link>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {featuredPosts.map((post) => (
            <Link key={post.slug} href={`/${lang}/posts/${post.slug}`} style={{ textDecoration: "none" }}>
              <article
                style={{
                  background: "var(--bg-card)",
                  border: "1px solid var(--border)",
                  borderRadius: 10,
                  padding: "1.25rem 1.5rem",
                  transition: "border-color 0.15s",
                }}
                className="hover:border-blue-500"
              >
                <h4 style={{ color: "#f1f5f9", fontWeight: 500, marginBottom: "0.4rem" }}>{post.title}</h4>
                <p style={{ color: "var(--text-muted)", fontSize: "0.875rem", lineHeight: 1.6 }}>{post.summary}</p>
                <div className="flex gap-3 mt-3 flex-wrap">
                  <span style={{ color: "var(--text-muted)", fontSize: "0.78rem" }}>{post.date}</span>
                  {post.tags.slice(0, 2).map((tag) => (
                    <span key={tag} style={{ background: "var(--blue-dim)", color: "var(--blue-hover)", borderRadius: 4, padding: "1px 7px", fontSize: "0.75rem" }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Projects */}
      <section className="pb-24">
        <div className="flex items-center justify-between mb-8">
          <h3 style={{ fontSize: "1.2rem", fontWeight: 600, color: "#f1f5f9" }}>
            {t.home.featured_projects}
          </h3>
          <Link href={`/${lang}/projects`} style={{ color: "var(--blue)", fontSize: "0.9rem" }}>
            {t.home.view_all} →
          </Link>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {featuredProjects.map((project) => (
            <Link key={project.slug} href={`/${lang}/projects/${project.slug}`} style={{ textDecoration: "none" }}>
              <article
                style={{
                  background: "var(--bg-card)",
                  border: "1px solid var(--border)",
                  borderRadius: 10,
                  padding: "1.25rem 1.5rem",
                  transition: "border-color 0.15s",
                }}
                className="hover:border-blue-500"
              >
                <div className="flex items-center gap-3 mb-2">
                  <h4 style={{ color: "#f1f5f9", fontWeight: 500 }}>{project.name}</h4>
                  <span style={{ color: "var(--blue)", fontSize: "0.78rem" }}>{project.role}</span>
                </div>
                <p style={{ color: "var(--text-muted)", fontSize: "0.875rem", lineHeight: 1.6, marginBottom: "0.75rem" }}>
                  {project.summary}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.metrics.slice(0, 2).map((m) => (
                    <span key={m} style={{ background: "rgba(59,130,246,0.08)", border: "1px solid rgba(59,130,246,0.25)", color: "#93c5fd", borderRadius: 5, padding: "2px 8px", fontSize: "0.75rem" }}>
                      {m}
                    </span>
                  ))}
                </div>
              </article>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
