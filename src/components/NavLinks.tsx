"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavLink {
  href: string;
  label: string;
}

export default function NavLinks({ links }: { links: NavLink[] }) {
  const pathname = usePathname();

  return (
    <>
      {links.map((l) => {
        const isActive = pathname === l.href || (l.href !== "/" && pathname.startsWith(l.href + "/"));
        return (
          <Link
            key={l.href}
            href={l.href}
            style={{
              color: isActive ? "#fff" : "var(--text-muted)",
              fontSize: "0.9rem",
              transition: "color 0.15s",
              fontWeight: isActive ? 500 : 400,
            }}
            className="hover:text-white"
          >
            {l.label}
          </Link>
        );
      })}
    </>
  );
}
