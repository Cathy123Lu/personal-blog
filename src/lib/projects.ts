import fs from "fs";
import path from "path";
import matter from "gray-matter";

const PROJECTS_DIR = path.join(process.cwd(), "src/content/projects");

export interface ProjectMeta {
  slug: string;
  lang: string;
  name: string;
  date: string;
  role: string;
  summary: string;
  techStack: string[];
  metrics: string[];   // e.g. ["LCP 4s→1.2s", "Lighthouse 52→94"]
  links: { label: string; url: string }[];
}

export interface Project extends ProjectMeta {
  content: string;
}

export function getAllProjects(lang: string): ProjectMeta[] {
  if (!fs.existsSync(PROJECTS_DIR)) return [];

  return fs
    .readdirSync(PROJECTS_DIR)
    .filter((f) => f.endsWith(`.${lang}.md`))
    .map((filename) => {
      const slug = filename.replace(`.${lang}.md`, "");
      const raw = fs.readFileSync(path.join(PROJECTS_DIR, filename), "utf-8");
      const { data } = matter(raw);
      return {
        slug,
        lang,
        name: data.name ?? slug,
        date: data.date ?? "",
        role: data.role ?? "",
        summary: data.summary ?? "",
        techStack: data.techStack ?? [],
        metrics: data.metrics ?? [],
        links: data.links ?? [],
      };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getProject(slug: string, lang: string): Project | null {
  const filepath = path.join(PROJECTS_DIR, `${slug}.${lang}.md`);
  if (!fs.existsSync(filepath)) return null;
  const raw = fs.readFileSync(filepath, "utf-8");
  const { data, content } = matter(raw);
  return {
    slug,
    lang,
    name: data.name ?? slug,
    date: data.date ?? "",
    role: data.role ?? "",
    summary: data.summary ?? "",
    techStack: data.techStack ?? [],
    metrics: data.metrics ?? [],
    links: data.links ?? [],
    content,
  };
}
