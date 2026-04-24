import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getAllPosts, getPost } from "@/lib/posts";
import zhDict from "@/i18n/zh.json";
import enDict from "@/i18n/en.json";

const dicts = { zh: zhDict, en: enDict };
type Lang = keyof typeof dicts;

export async function generateStaticParams() {
  const langs = ["zh", "en"];
  const params: { lang: string; slug: string }[] = [];
  for (const lang of langs) {
    getAllPosts(lang).forEach((p) => params.push({ lang, slug: p.slug }));
  }
  return params;
}

export default async function PostPage({ params }: PageProps<"/[lang]/posts/[slug]">) {
  const { lang, slug } = await params;
  const t = dicts[(lang as Lang) ?? "zh"];
  const post = getPost(slug, lang);
  if (!post) notFound();

  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "4rem 1.5rem" }}>
      {/* Header */}
      <div style={{ marginBottom: "3rem" }}>
        <div className="flex gap-2 flex-wrap mb-4">
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
        <h1 style={{ fontSize: "clamp(1.6rem, 4vw, 2.2rem)", fontWeight: 700, color: "#f1f5f9", lineHeight: 1.3, marginBottom: "1rem" }}>
          {post.title}
        </h1>
        <div className="flex gap-4" style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>
          <span>{post.date}</span>
          <span>{post.readingTime} {t.posts.reading_time}</span>
        </div>
      </div>

      {/* Content */}
      <div className="prose">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content}</ReactMarkdown>
      </div>

      {/* Back */}
      <div style={{ marginTop: "4rem", paddingTop: "2rem", borderTop: "1px solid var(--border)" }}>
        <a href={`/${lang}/posts`} style={{ color: "var(--blue)", fontSize: "0.9rem" }}>
          ← {t.nav.posts}
        </a>
      </div>
    </div>
  );
}
