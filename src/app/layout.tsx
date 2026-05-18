import type { Metadata, Viewport } from "next";
import "./globals.css";
import { FeedbackButton } from "@/components/FeedbackButton";
import { ThemeMusic } from "@/components/ThemeMusic";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#faf9f6" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" },
  ],
};

export const metadata: Metadata = {
  title: {
    default: "人生旅途 — AI 驱动的个人品牌网站生成器",
    template: "%s | 人生旅途",
  },
  description: "上传简历，AI 智能润色，一键生成现代个人主页。支持 PDF/DOCX 解析，5 种 AI 风格，扫码即可分享。",
  keywords: ["简历", "个人主页", "AI", "简历生成", "个人品牌", "网站生成器"],
  authors: [{ name: "人生旅途" }],
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "zh_CN",
    siteName: "人生旅途",
    title: "人生旅途 — AI 驱动的个人品牌网站生成器",
    description: "上传简历，AI 智能润色，一键生成现代个人主页。",
  },
  twitter: {
    card: "summary_large_image",
    title: "人生旅途 — AI 驱动的个人品牌网站生成器",
    description: "上传简历，AI 智能润色，一键生成现代个人主页。",
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"),
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
        <ThemeMusic />
        <FeedbackButton />
      </body>
    </html>
  );
}
