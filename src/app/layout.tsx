import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cathy · 高级前端工程师",
  description: "8 年前端开发经验，专注性能优化与工程化体系建设",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body className="min-h-screen flex flex-col">{children}</body>
    </html>
  );
}
