import type { Metadata, Viewport } from "next";
import { headers } from "next/headers";
import "./globals.css";
import { FeedbackButton } from "@/components/FeedbackButton";
import { ThemeMusic } from "@/components/ThemeMusic";
import { serverT } from "@/i18n/server";
import type { Locale } from "@/i18n/server";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#faf9f6" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" },
  ],
};

export async function generateMetadata(): Promise<Metadata> {
  const heads = await headers();
  const locale: Locale = heads.get("x-locale") === "en" ? "en" : "zh";

  return {
    title: {
      default: serverT("site.title", locale),
      template: `%s | ${serverT("site.title", locale)}`,
    },
    description: serverT("site.description", locale),
    keywords: serverT("site.keywords", locale).split(","),
    authors: [{ name: serverT("nav.brand", locale) }],
    robots: { index: true, follow: true },
    openGraph: {
      type: "website",
      locale: locale === "zh" ? "zh_CN" : "en_US",
      siteName: serverT("nav.brand", locale),
      title: serverT("site.ogTitle", locale),
      description: serverT("site.ogDescription", locale),
    },
    twitter: {
      card: "summary_large_image",
      title: serverT("site.ogTitle", locale),
      description: serverT("site.ogDescription", locale),
    },
    metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"),
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const heads = await headers();
  const locale: Locale = heads.get("x-locale") === "en" ? "en" : "zh";

  return (
    <html lang={locale === "en" ? "en" : "zh-CN"}>
      <body className="min-h-screen bg-[#fafafa] text-[#0a0a0a] antialiased">
        {children}
        <ThemeMusic />
        <FeedbackButton />
      </body>
    </html>
  );
}
