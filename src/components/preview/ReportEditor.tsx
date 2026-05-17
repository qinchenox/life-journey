"use client";

import { useState } from "react";
import { GeneratedReport } from "@/lib/types";

interface ReportEditorProps {
  report: GeneratedReport;
  onUpdate: (id: string, content: string) => void;
}

const TYPE_LABELS: Record<string, string> = {
  "project-case": "项目案例",
  "industry-brief": "行业简报",
  "whitepaper": "工作白皮书",
  "job-material": "求职材料",
};

export function ReportEditor({ report, onUpdate }: ReportEditorProps) {
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(report.content);

  const handleSave = () => {
    onUpdate(report.id, text);
    setEditing(false);
  };

  const handleDownload = () => {
    const blob = new Blob([report.content], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${report.title}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="border border-neutral-200 rounded-xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3 bg-neutral-50 border-b border-neutral-100">
        <div>
          <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-accent/10 text-accent">
            {TYPE_LABELS[report.type] || report.type}
          </span>
          <h3 className="text-base font-semibold text-neutral-800 mt-1">{report.title}</h3>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setEditing(!editing)}
            className="px-3 py-1.5 text-xs rounded-lg border border-neutral-300 text-neutral-600 hover:bg-neutral-100 transition-colors"
          >
            {editing ? "取消" : "编辑"}
          </button>
          <button
            onClick={handleDownload}
            className="px-3 py-1.5 text-xs rounded-lg bg-neutral-800 text-white hover:bg-neutral-700 transition-colors"
          >
            下载 .md
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        {editing ? (
          <div className="space-y-3">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full min-h-[400px] p-4 border border-neutral-200 rounded-lg text-sm font-mono leading-relaxed text-neutral-700 focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent resize-y"
            />
            <button
              onClick={handleSave}
              className="px-4 py-2 text-sm rounded-lg bg-accent text-white hover:opacity-90 transition-opacity"
            >
              保存修改
            </button>
          </div>
        ) : (
          <div
            className="prose prose-sm max-w-none text-neutral-700 leading-relaxed whitespace-pre-line"
            dangerouslySetInnerHTML={{ __html: renderMarkdown(report.content) }}
          />
        )}
      </div>
    </div>
  );
}

/* Simple markdown → HTML for preview */
function renderMarkdown(md: string): string {
  return md
    .replace(/^### (.+)$/gm, '<h3 class="text-lg font-semibold text-neutral-800 mt-6 mb-2">$1</h3>')
    .replace(/^## (.+)$/gm, '<h2 class="text-xl font-bold text-neutral-900 mt-8 mb-3">$1</h2>')
    .replace(/^# (.+)$/gm, '<h1 class="text-2xl font-bold text-neutral-900 mt-8 mb-3">$1</h1>')
    .replace(/\*\*(.+?)\*\*/g, '<strong class="font-semibold text-neutral-800">$1</strong>')
    .replace(/^- (.+)$/gm, '<li class="ml-4 text-neutral-600">• $1</li>')
    .replace(/^(\d+)\. (.+)$/gm, '<li class="ml-4 text-neutral-600">$1. $2</li>')
    .replace(/\n\n/g, '</p><p class="mb-3">')
    .replace(/^(.+)$/gm, (m) => m.startsWith("<") ? m : `<p class="mb-3">${m}</p>`);
}

/* Export for shared tab config */
export { TYPE_LABELS };
