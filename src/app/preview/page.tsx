"use client";

import { useState, useCallback } from "react";
import { Header } from "@/components/layout/Header";
import { PortfolioPreview } from "@/components/preview/PortfolioPreview";
import { ReportEditor, TYPE_LABELS } from "@/components/preview/ReportEditor";
import { useResumeStore } from "@/store/resume-store";
import { GeneratedReport, ReportType } from "@/lib/types";
import Link from "next/link";

type Tab = "preview" | ReportType;

const TABS: { id: Tab; label: string; icon: string }[] = [
  { id: "preview", label: "主页预览", icon: "🏠" },
  { id: "project-case", label: "项目案例", icon: "📋" },
  { id: "industry-brief", label: "行业简报", icon: "📊" },
  { id: "whitepaper", label: "工作白皮书", icon: "📄" },
  { id: "job-material", label: "求职材料", icon: "💼" },
];

export default function PreviewPage() {
  const hasData = useResumeStore((s) => s.data.basics.name !== "");
  const data = useResumeStore((s) => s.data);
  const agentId = useResumeStore((s) => s.agentId);

  const [activeTab, setActiveTab] = useState<Tab>("preview");
  const [reports, setReports] = useState<GeneratedReport[]>([]);
  const [generating, setGenerating] = useState(false);
  const [genError, setGenError] = useState<string | null>(null);

  const generateReports = useCallback(async () => {
    setGenerating(true);
    setGenError(null);
    try {
      const res = await fetch("/api/generate-reports", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resumeData: data, agentId }),
      });
      const json = await res.json();
      if (!json.success) { setGenError(json.error || "生成失败"); setGenerating(false); return; }
      setReports(json.reports || []);
      // Auto-switch to first report tab
      setActiveTab("project-case");
    } catch { setGenError("网络错误"); }
    setGenerating(false);
  }, [data, agentId]);

  const updateReport = useCallback((id: string, content: string) => {
    setReports((prev) => prev.map((r) => (r.id === id ? { ...r, content } : r)));
  }, []);

  if (!hasData) {
    return (
      <>
        <Header />
        <main className="mx-auto max-w-4xl px-6 py-20 text-center">
          <p className="text-lg text-neutral-500 mb-4">暂无简历数据可预览。</p>
          <Link href="/" className="text-accent hover:underline">返回上传简历</Link>
        </main>
      </>
    );
  }

  const activeReports = reports.filter((r) => r.type === activeTab);

  return (
    <>
      <Header />
      <main className="mx-auto max-w-5xl px-6 py-8">
        {/* Tab bar */}
        <div className="relative mb-8">
          <div className="flex items-center gap-1 overflow-x-auto pb-1 scrollbar-hide scroll-pl-1 pr-8"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none", WebkitOverflowScrolling: "touch" }}>
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap transition-all flex-shrink-0 ${
                  activeTab === tab.id
                    ? "bg-accent text-white shadow-sm"
                    : "text-neutral-500 hover:text-neutral-700 hover:bg-neutral-100"
                }`}
              >
                <span className="text-base">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
          {/* Scroll fade indicator */}
          <div className="pointer-events-none absolute right-0 top-0 bottom-1 w-12 bg-gradient-to-l from-[#faf9f6] to-transparent lg:hidden" />
        </div>

        {/* Generate button row */}
        <div className="flex items-center justify-end gap-3 mb-8">
          {generating && (
            <span className="flex items-center gap-2 text-sm text-neutral-500">
              <span className="w-4 h-4 border-2 border-accent border-t-transparent rounded-full animate-spin" />
              AI 正在生成资料...
            </span>
          )}
          {genError && <span className="text-sm text-red-500">{genError}</span>}
          <button
            onClick={generateReports}
            disabled={generating}
            className="px-4 py-2.5 rounded-lg text-sm font-medium text-white disabled:opacity-50 transition-all hover:-translate-y-0.5 hover:shadow-md"
            style={{ background: "linear-gradient(135deg, #0f766e, #14b8a6)" }}
          >
            {reports.length > 0 ? "重新生成" : "生成资料"}
          </button>
        </div>

        {/* Tab content */}
        {activeTab === "preview" ? (
          <PortfolioPreview />
        ) : reports.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-4xl mb-4">📝</div>
            <p className="text-neutral-500 mb-4">尚未生成资料。点击右上角「生成资料」按钮，AI 将基于简历内容自动生成专业报告。</p>
            <button
              onClick={generateReports}
              disabled={generating}
              className="px-6 py-2.5 rounded-lg text-white font-medium transition-all hover:-translate-y-0.5"
              style={{ background: "linear-gradient(135deg, #0f766e, #14b8a6)" }}
            >
              {generating ? "生成中..." : "立即生成"}
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {activeReports.length === 0 ? (
              <div className="text-center py-16 text-neutral-400 text-sm">
                该类别暂无生成内容，请重新生成或选择其他类别。
              </div>
            ) : (
              activeReports.map((report) => (
                <ReportEditor key={report.id} report={report} onUpdate={updateReport} />
              ))
            )}
          </div>
        )}

        {/* Back link */}
        <div className="mt-10 text-center pb-8">
          <Link href="/edit" className="text-sm text-neutral-400 hover:text-neutral-600 transition-colors">
            ← 返回编辑
          </Link>
        </div>
      </main>
    </>
  );
}
