import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import zhDict from "@/i18n/zh.json";
import enDict from "@/i18n/en.json";

const dicts = { zh: zhDict, en: enDict };
type Lang = keyof typeof dicts;

export async function generateStaticParams() {
  return [{ lang: "zh" }, { lang: "en" }];
}

export default async function PostsPage({ params }: PageProps<"/[lang]/posts">) {
  const { lang } = await params;
  const t = dicts[(lang as Lang) ?? "zh"];
  const posts = getAllPosts(lang);

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "4rem 1.5rem" }}>
      <h1 style={{ fontSize: "2rem", fontWeight: 700, color: "#f1f5f9", marginBottom: "0.5rem" }}>
        {t.posts.title}
      </h1>
      <p style={{ color: "var(--text-muted)", marginBottom: "3rem" }}>{t.posts.subtitle}</p>

      {posts.length === 0 ? (
        <p style={{ color: "var(--text-muted)" }}>{t.posts.no_results}</p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/${lang}/posts/${post.slug}`}
              style={{ textDecoration: "none" }}
            >
              <article
                style={{
                  background: "var(--bg-card)",
                  border: "1px solid var(--border)",
                  borderRadius: 10,
                  padding: "1.5rem",
                  transition: "border-color 0.15s",
                  cursor: "pointer",
                }}
                className="hover:border-blue-500"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 style={{ fontSize: "1.1rem", fontWeight: 600, color: "#f1f5f9", marginBottom: "0.5rem" }}>
                      {post.title}
                    </h2>
                    <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", lineHeight: 1.6 }}>
                      {post.summary}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4 mt-4 flex-wrap">
                  <span style={{ color: "var(--text-muted)", fontSize: "0.8rem" }}>{post.date}</span>
                  <span style={{ color: "var(--text-muted)", fontSize: "0.8rem" }}>
                    {post.readingTime} {t.posts.reading_time}
                  </span>
                  <div className="flex gap-2 flex-wrap">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        style={{
                          background: "var(--blue-dim)",
                          color: "var(--blue-hover)",
                          borderRadius: 4,
                          padding: "2px 8px",
                          fontSize: "0.75rem",
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
