import Link from "next/link";
import NavLinks from "@/components/NavLinks";
import LangSwitcher from "@/components/LangSwitcher";
import zhDict from "@/i18n/zh.json";
import enDict from "@/i18n/en.json";

const dicts = { zh: zhDict, en: enDict };
type Lang = keyof typeof dicts;

export async function generateStaticParams() {
  return [{ lang: "zh" }, { lang: "en" }];
}

export default async function LangLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  const t = dicts[(lang as Lang) ?? "zh"];

  const navLinks = [
    { href: `/${lang}`, label: t.nav.home },
    { href: `/${lang}/posts`, label: t.nav.posts },
    { href: `/${lang}/projects`, label: t.nav.projects },
    { href: `/${lang}/about`, label: t.nav.about },
  ];

  return (
    <html lang={lang}>
      <body className="min-h-screen flex flex-col">
        <header
          style={{
            borderBottom: "1px solid var(--border)",
            background: "rgba(15,17,23,0.85)",
            backdropFilter: "blur(12px)",
            position: "sticky",
            top: 0,
            zIndex: 50,
          }}
        >
          <nav
            style={{ maxWidth: 900, margin: "0 auto", padding: "0 1.5rem" }}
            className="flex items-center justify-between h-14"
          >
            <Link
              href={`/${lang}`}
              style={{ color: "var(--blue)", fontWeight: 700, fontSize: "1.1rem", letterSpacing: "-0.02em" }}
            >
              Cathy
            </Link>
            <div className="flex items-center gap-6">
              <NavLinks links={navLinks} />
              <LangSwitcher lang={lang} />
            </div>
          </nav>
        </header>

        <main className="flex-1">{children}</main>

        <footer
          style={{ borderTop: "1px solid var(--border)", color: "var(--text-muted)", fontSize: "0.85rem" }}
          className="py-8 text-center"
        >
          © {new Date().getFullYear()} Cathy &nbsp;·&nbsp; {t.footer.rights}
        </footer>
      </body>
    </html>
  );
}
