"use client";

import { useState, useCallback, useRef } from "react";
import { t } from "@/i18n";
import { useRouter } from "next/navigation";
import { useResumeStore } from "@/store/resume-store";
import { UploadStatus } from "./UploadStatus";
import { AgentSelector } from "@/components/AgentSelector";
import { ParseResponse } from "@/lib/types";

export function FileDropZone() {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<"idle" | "submitting" | "parsing">("idle");
  const [error, setError] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const storeSetData = useResumeStore((s) => s.setData);
  const storeSetStatus = useResumeStore((s) => s.setStatus);
  const storeError = useResumeStore((s) => s.error);
  const storeSetError = useResumeStore((s) => s.setError);
  const storeSetWarnings = useResumeStore((s) => s.setWarnings);
  const agentId = useResumeStore((s) => s.agentId);
  const setAgentId = useResumeStore((s) => s.setAgentId);
  const saveToServer = useResumeStore((s) => s.saveToServer);

  const handleFile = useCallback((f: File) => {
    const allowed = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    if (!allowed.includes(f.type) && !f.name.match(/\.(pdf|docx)$/i)) {
      setError(t("upload.invalidFormat"));
      return;
    }
    if (f.size > 10 * 1024 * 1024) {
      setError(t("upload.fileTooLarge"));
      return;
    }
    setFile(f);
    setError(null);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile) handleFile(droppedFile);
    },
    [handleFile]
  );

  const handleSubmit = async () => {
    if (!file) return;
    setStatus("submitting");
    storeSetStatus("uploading");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("agentId", agentId);

    try {
      const res = await fetch("/api/parse", {
        method: "POST",
        body: formData,
      });
      const json: ParseResponse = await res.json();

      if (!res.ok || !json.success) {
        storeSetError(json.error || t("upload.parseFailed"));
        setStatus("idle");
        return;
      }

      if (json.data) {
        storeSetData(json.data);
        if (json.warnings && json.warnings.length > 0) {
          storeSetWarnings(json.warnings);
        }
        setStatus("parsing");
        // Auto-save to server if logged in
        saveToServer();
        router.push("/edit");
      }
    } catch {
      storeSetError(t("upload.networkError"));
      setStatus("idle");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) handleFile(selectedFile);
  };

  return (
    <div className="max-w-xl mx-auto">
      <div className="mb-6">
        <AgentSelector value={agentId} onChange={setAgentId} />
      </div>

      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={`border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-all ${
          dragOver
            ? "border-accent bg-accent/5 scale-[1.02]"
            : "border-neutral-300 hover:border-neutral-400 hover:bg-neutral-50"
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          accept=".pdf,.docx"
          onChange={handleChange}
          className="hidden"
        />

        {!file ? (
          <div>
            <div className="text-4xl mb-4">📄</div>
            <p className="text-lg font-medium text-neutral-700 mb-2">
              {t("upload.dropHint")}<span className="text-accent">{t("upload.clickUpload")}</span>
            </p>
            <p className="text-sm text-neutral-400">{t("upload.formats")}</p>
          </div>
        ) : (
          <div>
            <div className="text-2xl mb-2">📎</div>
            <p className="text-lg font-medium text-neutral-700 mb-1">{file.name}</p>
            <p className="text-sm text-neutral-400 mb-3">
              {(file.size / 1024 / 1024).toFixed(1)} MB
            </p>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setFile(null);
                setError(null);
              }}
              className="text-sm text-neutral-400 hover:text-red-500 transition-colors"
            >
              {t("upload.remove")}
            </button>
          </div>
        )}
      </div>

      {error && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
          {error}
        </div>
      )}

      {file && (
        <button
          onClick={handleSubmit}
          disabled={status === "submitting"}
          className="mt-6 w-full py-3 bg-neutral-900 text-white font-medium rounded-lg hover:bg-neutral-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {status === "submitting" ? (
            <span className="flex items-center justify-center gap-2">
              <UploadStatus /> {t("upload.parsing")}
            </span>
          ) : (
            t("upload.startParse")
          )}
        </button>
      )}
    </div>
  );
}
