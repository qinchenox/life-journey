import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "人生旅途 — AI 驱动的个人品牌网站生成器",
  description: "上传简历，AI 智能润色，生成现代风格个人主页。一键发布，扫码即可分享。",
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
