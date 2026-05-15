import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "个人简史 — 简历驱动的个人主页生成器",
  description: "上传简历，AI 自动解析，生成极简风格个人介绍网站。支持在线部署与离线下载。",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body className="min-h-screen bg-[#fafafa] text-[#0a0a0a] antialiased">
        {children}
      </body>
    </html>
  );
}
