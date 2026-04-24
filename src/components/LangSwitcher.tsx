"use client";

import { usePathname, useRouter } from "next/navigation";

export default function LangSwitcher({ lang }: { lang: string }) {
  const pathname = usePathname();
  const router = useRouter();
  const other = lang === "zh" ? "en" : "zh";

  function switchLang() {
    // replace first path segment: /zh/posts/foo → /en/posts/foo
    const next = pathname.replace(/^\/(zh|en)/, `/${other}`);
    router.push(next);
  }

  return (
    <button
      onClick={switchLang}
      style={{
        color: "var(--text-muted)",
        fontSize: "0.8rem",
        border: "1px solid var(--border)",
        borderRadius: 6,
        padding: "2px 10px",
        background: "transparent",
        cursor: "pointer",
        transition: "all 0.15s",
      }}
      className="hover:border-blue-500 hover:text-white"
    >
      {lang === "zh" ? "EN" : "中文"}
    </button>
  );
}
