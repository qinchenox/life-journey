"use client";

import { Header } from "@/components/layout/Header";
import { PortfolioPreview } from "@/components/preview/PortfolioPreview";
import { useResumeStore } from "@/store/resume-store";
import Link from "next/link";

export default function PreviewPage() {
  const hasData = useResumeStore((s) => s.data.basics.name !== "");

  if (!hasData) {
    return (
      <>
        <Header />
        <main className="mx-auto max-w-4xl px-6 py-20 text-center">
          <p className="text-lg text-neutral-500 mb-4">暂无简历数据可预览。</p>
          <Link href="/" className="text-accent hover:underline">
            返回上传简历
          </Link>
        </main>
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="mx-auto max-w-4xl px-6 py-10">
        <PortfolioPreview />
        <div className="mt-8 text-center">
          <Link
            href="/edit"
            className="text-sm text-neutral-400 hover:text-neutral-600 transition-colors"
          >
            ← 返回编辑
          </Link>
        </div>
      </main>
    </>
  );
}
