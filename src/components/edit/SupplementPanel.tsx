"use client";

import { useState, useRef, useCallback } from "react";
import { useResumeStore } from "@/store/resume-store";

interface SupplementFile {
  id: string;
  name: string;
  size: string;
  uploadedAt: string;
}

export function SupplementPanel() {
  const data = useResumeStore((s) => s.data);
  const setData = useResumeStore((s) => s.setData);
  const agentId = useResumeStore((s) => s.agentId);
  const [collapsed, setCollapsed] = useState(true);
  const [files, setFiles] = useState<SupplementFile[]>([]);
  const [merging, setMerging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [dragover, setDragover] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback(async (f: File) => {
    const allowed = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    if (!allowed.includes(f.type) && !f.name.match(/\.(pdf|docx)$/i)) {
      setError("仅支持 PDF 和 DOCX 格式。");
      return;
    }
    if (f.size > 10 * 1024 * 1024) {
      setError("文件大小不能超过 10MB。");
      return;
    }

    setError(null);
    setResult(null);
    setMerging(true);

    const formData = new FormData();
    formData.append("file", f);
    formData.append("currentData", JSON.stringify(data));
    formData.append("agentId", agentId);

    try {
      const res = await fetch("/api/supplement", {
        method: "POST",
        body: formData,
      });
      const json = await res.json();
      if (!res.ok || !json.success) {
        setError(json.error || "合并失败");
        setMerging(false);
        return;
      }
      setData(json.data);
      setFiles((prev) => [
        {
          id: Date.now().toString(),
          name: f.name,
          size: (f.size / 1024).toFixed(1) + " KB",
          uploadedAt: new Date().toLocaleTimeString(),
        },
        ...prev,
      ]);
      setResult("已成功合并，简历数据已更新。");
    } catch {
      setError("网络错误，合并失败。");
    }
    setMerging(false);
  }, [data, agentId, setData]);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragover(false);
      const dropped = e.dataTransfer.files[0];
      if (dropped) handleFile(dropped);
    },
    [handleFile]
  );

  const removeFile = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  };

  return (
    <div className="border border-neutral-200 rounded-xl bg-white overflow-hidden">
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="w-full flex items-center justify-between px-4 py-3 bg-neutral-50 hover:bg-neutral-100 transition-colors"
      >
        <span className="text-sm font-medium text-neutral-700">补充资料</span>
        <span className={`text-xs text-neutral-400 transition-transform ${collapsed ? "" : "rotate-180"}`}>
          ▼
        </span>
      </button>

      {!collapsed && (
        <div className="p-4 space-y-3">
          <p className="text-xs text-neutral-400">
            上传项目文档、证书、自述等，AI 将自动合并到当前简历中。
          </p>

          <div
            onDragOver={(e) => { e.preventDefault(); setDragover(true); }}
            onDragLeave={() => setDragover(false)}
            onDrop={handleDrop}
            onClick={() => inputRef.current?.click()}
            className={`border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-all ${
              dragover ? "border-accent bg-accent/5" : "border-neutral-200 hover:border-neutral-300"
            }`}
          >
            <input
              ref={inputRef}
              type="file"
              accept=".pdf,.docx"
              onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); }}
              className="hidden"
            />
            <div className="text-lg mb-1">📎</div>
            <p className="text-xs text-neutral-500">
              拖拽文件或<span className="text-accent">点击上传</span>
            </p>
            <p className="text-xs text-neutral-400 mt-0.5">PDF / DOCX，最大 10MB</p>
          </div>

          {merging && (
            <div className="flex items-center gap-2 text-sm text-neutral-500">
              <div className="w-4 h-4 border-2 border-accent border-t-transparent rounded-full animate-spin" />
              AI 正在分析补充材料...
            </div>
          )}

          {error && (
            <div className="p-2 bg-red-50 border border-red-200 rounded text-xs text-red-600">{error}</div>
          )}

          {result && (
            <div className="p-2 bg-green-50 border border-green-200 rounded text-xs text-green-700">{result}</div>
          )}

          {files.length > 0 && (
            <div className="space-y-1.5">
              <p className="text-xs font-medium text-neutral-500">已上传</p>
              {files.map((f) => (
                <div key={f.id} className="flex items-center justify-between text-xs text-neutral-600 bg-neutral-50 rounded px-2 py-1.5">
                  <span className="truncate flex-1">{f.name}</span>
                  <span className="text-neutral-400 mx-2">{f.size}</span>
                  <span className="text-neutral-400 mr-2">{f.uploadedAt}</span>
                  <button onClick={() => removeFile(f.id)} className="text-red-400 hover:text-red-600">✕</button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
