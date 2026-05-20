"use client";

import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { ResumeForm } from "@/components/edit/ResumeForm";
import { SupplementPanel } from "@/components/edit/SupplementPanel";
import { AgentSelector } from "@/components/AgentSelector";
import { useResumeStore } from "@/store/resume-store";
import { t } from "@/i18n";

export default function EditPage() {
  const agentId = useResumeStore((s) => s.agentId);
  const setAgentId = useResumeStore((s) => s.setAgentId);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <Header />
      <main className="mx-auto max-w-7xl px-6 py-12">
        <div className="flex gap-8">
          {/* Main content */}
          <div className="flex-1 min-w-0">
            <div className="mb-8 flex items-center gap-4">
              <AgentSelector value={agentId} onChange={setAgentId} />
              {/* Mobile sidebar toggle */}
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden ml-auto flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-teal-700 bg-teal-50 border border-teal-200 hover:bg-teal-100 transition-colors"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M12 20h9M16.5 3.5a2.12 2.12 0 113 3L7 19l-4 1 1-4L16.5 3.5z"/>
                </svg>
                {t("edit.supplement")}
              </button>
            </div>
            <ResumeForm />
          </div>

          {/* Desktop sidebar */}
          <aside className="hidden lg:block w-[340px] flex-shrink-0 space-y-6">
            <div className="sticky top-6 space-y-6">
              <SupplementPanel />
            </div>
          </aside>
        </div>

        {/* Mobile sidebar overlay */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-[100] lg:hidden" onClick={(e) => { if (e.target === e.currentTarget) setSidebarOpen(false); }}>
            <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />
            <div className="absolute right-0 top-0 bottom-0 w-[340px] max-w-[90vw] bg-white shadow-2xl overflow-y-auto animate-slide-in">
              <div className="sticky top-0 bg-white border-b border-neutral-100 px-4 py-3 flex items-center justify-between z-10">
                <span className="text-sm font-semibold text-neutral-700">{t("edit.supplement")}</span>
                <button onClick={() => setSidebarOpen(false)} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-neutral-100 transition-colors">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
                </button>
              </div>
              <div className="p-4">
                <SupplementPanel />
              </div>
            </div>
          </div>
        )}
      </main>
    </>
  );
}
