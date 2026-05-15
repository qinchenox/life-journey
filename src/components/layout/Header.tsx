"use client";

import Link from "next/link";
import { useResumeStore } from "@/store/resume-store";

const steps = [
  { num: 1, label: "上传简历", path: "/" },
  { num: 2, label: "编辑信息", path: "/edit" },
  { num: 3, label: "预览发布", path: "/preview" },
];

export function Header() {
  const status = useResumeStore((s) => s.status);

  const currentStep =
    status === "empty" || status === "uploading" || status === "parsing"
      ? 0
      : status === "ready"
        ? 1
        : 2;

  // Determine if user can access step 2+ based on status
  const canAccess = (stepIdx: number) => {
    if (stepIdx === 0) return true;
    if (stepIdx === 1) return status === "ready" || status === "error";
    if (stepIdx === 2) return status === "ready" || status === "error";
    return false;
  };

  return (
    <header className="border-b border-neutral-200 bg-white">
      <div className="mx-auto max-w-4xl px-6 py-4 flex items-center justify-between">
        <Link
          href="/"
          className="text-lg font-bold tracking-tight text-neutral-900 hover:text-accent transition-colors"
        >
          个人简史
        </Link>
        <nav className="flex items-center gap-2 text-sm">
          {steps.map((step, i) => (
            <div key={step.num} className="flex items-center gap-2">
              {i > 0 && (
                <span className="text-neutral-300 mx-1">→</span>
              )}
              {canAccess(i) ? (
                <Link
                  href={step.path}
                  className={`flex items-center gap-1.5 px-2 py-1 rounded transition-colors ${
                    i === currentStep
                      ? "bg-neutral-100 text-neutral-900 font-medium"
                      : "text-neutral-400 hover:text-neutral-600"
                  }`}
                >
                  <span
                    className={`inline-flex items-center justify-center w-5 h-5 rounded-full text-xs font-semibold ${
                      i === currentStep
                        ? "bg-accent text-white"
                        : "bg-neutral-200 text-neutral-500"
                    }`}
                  >
                    {step.num}
                  </span>
                  <span className="hidden sm:inline">{step.label}</span>
                </Link>
              ) : (
                <span className="flex items-center gap-1.5 px-2 py-1 text-neutral-300 cursor-not-allowed">
                  <span className="inline-flex items-center justify-center w-5 h-5 rounded-full text-xs font-semibold bg-neutral-100 text-neutral-300">
                    {step.num}
                  </span>
                  <span className="hidden sm:inline">{step.label}</span>
                </span>
              )}
            </div>
          ))}
        </nav>
      </div>
    </header>
  );
}
