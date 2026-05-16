"use client";

import { Header } from "@/components/layout/Header";
import { ResumeForm } from "@/components/edit/ResumeForm";
import { SupplementPanel } from "@/components/edit/SupplementPanel";
import { AgentSelector } from "@/components/AgentSelector";
import { useResumeStore } from "@/store/resume-store";

export default function EditPage() {
  const agentId = useResumeStore((s) => s.agentId);
  const setAgentId = useResumeStore((s) => s.setAgentId);

  return (
    <>
      <Header />
      <main className="mx-auto max-w-7xl px-6 py-12">
        <div className="flex gap-8">
          {/* Main content */}
          <div className="flex-1 min-w-0">
            <div className="mb-8">
              <AgentSelector value={agentId} onChange={setAgentId} />
            </div>
            <ResumeForm />
          </div>

          {/* Sidebar */}
          <aside className="hidden lg:block w-[340px] flex-shrink-0 space-y-6">
            <div className="sticky top-6 space-y-6">
              <SupplementPanel />
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}
