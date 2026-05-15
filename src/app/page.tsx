"use client";

import { Header } from "@/components/layout/Header";
import { FileDropZone } from "@/components/upload/FileDropZone";
import { useResumeStore } from "@/store/resume-store";
import Link from "next/link";

export default function HomePage() {
  const status = useResumeStore((s) => s.status);
  const hasData = status === "ready";

  return (
    <>
      <Header />
      <main className="mx-auto max-w-4xl px-6 py-16 sm:py-24">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight text-neutral-900 mb-4">
            简历变主页，只需<span className="text-accent">一步</span>
          </h1>
          <p className="text-lg text-neutral-500 max-w-md mx-auto">
            上传简历，AI 自动解析，生成极简风格的个人介绍网站。
            支持在线部署与离线下载。
          </p>
        </div>

        {hasData ? (
          <div className="text-center">
            <p className="text-green-600 text-sm mb-4">
              简历解析完成，数据已保存。
            </p>
            <div className="flex gap-4 justify-center">
              <Link
                href="/edit"
                className="px-6 py-3 bg-[#0a0a0a] text-white font-medium rounded-lg hover:bg-neutral-800 transition-colors"
              >
                编辑信息
              </Link>
              <Link
                href="/preview"
                className="px-6 py-3 border border-neutral-300 text-neutral-700 font-medium rounded-lg hover:bg-neutral-50 transition-colors"
              >
                预览主页
              </Link>
            </div>
          </div>
        ) : (
          <FileDropZone />
        )}

        <div className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-8">
          {features.map((f) => (
            <div key={f.title} className="text-center">
              <div className="text-2xl mb-3">{f.icon}</div>
              <h3 className="text-base font-semibold text-neutral-800 mb-1">
                {f.title}
              </h3>
              <p className="text-sm text-neutral-400">{f.desc}</p>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}

const features = [
  { icon: "📤", title: "上传即解析", desc: "拖拽 PDF/DOCX 简历文件，AI 自动提取结构化信息" },
  { icon: "✏️", title: "自由编辑", desc: "检查修正 AI 解析结果，随时补充调整" },
  { icon: "🌐", title: "一键发布", desc: "下载单文件 HTML，可部署至任意静态托管" },
];
