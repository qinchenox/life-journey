"use client";

import { useState, useCallback } from "react";
import { Header } from "@/components/layout/Header";
import { PortfolioPreview } from "@/components/preview/PortfolioPreview";
import { ReportEditor, TYPE_LABELS } from "@/components/preview/ReportEditor";
import { useResumeStore } from "@/store/resume-store";
import { GeneratedReport, ReportType } from "@/lib/types";
import Link from "next/link";
import { t, tv } from "@/i18n";

type Tab = "preview" | ReportType;

const TAB_IDS: Tab[] = ["preview", "project-case", "industry-brief", "whitepaper", "job-material"];
const TABS: { id: Tab; label: string; icon: string }[] = (tv("preview.tabs") as { label: string; icon: string }[]).map(
  (item, i) => ({ id: TAB_IDS[i], ...item })
);

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
      if (!json.success) { setGenError(json.error || t("states.generateFailed")); setGenerating(false); return; }
      setReports(json.reports || []);
      // Auto-switch to first report tab
      setActiveTab("project-case");
    } catch { setGenError(t("states.networkError")); }
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
          <p className="text-lg text-neutral-500 mb-4">{t("preview.noData")}</p>
          <Link href="/" className="text-accent hover:underline">{t("preview.backToUpload")}</Link>
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
              {t("preview.generating")}
            </span>
          )}
          {genError && <span className="text-sm text-red-500">{genError}</span>}
          <button
            onClick={generateReports}
            disabled={generating}
            className="px-4 py-2.5 rounded-lg text-sm font-medium text-white disabled:opacity-50 transition-all hover:-translate-y-0.5 hover:shadow-md"
            style={{ background: "linear-gradient(135deg, #0f766e, #14b8a6)" }}
          >
            {reports.length > 0 ? t("preview.regenerate") : t("preview.generate")}
          </button>
        </div>

        {/* Tab content */}
        {activeTab === "preview" ? (
          <PortfolioPreview />
        ) : reports.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-4xl mb-4">📝</div>
            <p className="text-neutral-500 mb-4">{t("preview.notGenerated")}</p>
            <button
              onClick={generateReports}
              disabled={generating}
              className="px-6 py-2.5 rounded-lg text-white font-medium transition-all hover:-translate-y-0.5"
              style={{ background: "linear-gradient(135deg, #0f766e, #14b8a6)" }}
            >
              {generating ? t("preview.generating") : t("preview.generateNow")}
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {activeReports.length === 0 ? (
              <div className="text-center py-16 text-neutral-400 text-sm">
                {t("preview.emptyCategory")}
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
            {t("preview.backToEdit")}
          </Link>
        </div>
      </main>
    </>
  );
}
