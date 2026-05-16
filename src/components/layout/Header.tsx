"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useResumeStore } from "@/store/resume-store";

const steps = [
  { num: 1, label: "上传简历", path: "/" },
  { num: 2, label: "编辑信息", path: "/edit" },
  { num: 3, label: "预览发布", path: "/preview" },
];

interface HeaderProps {
  transparent?: boolean;
}

export function Header({ transparent }: HeaderProps) {
  const status = useResumeStore((s) => s.status);
  const setUser = useResumeStore((s) => s.setUser);
  const user = useResumeStore((s) => s.user);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/auth")
      .then((r) => r.json())
      .then((json) => {
        if (json.user) setUser(json.user);
      })
      .catch(() => {});
  }, [setUser]);

  const handleLogout = async () => {
    await fetch("/api/auth", { method: "DELETE" });
    setUser(null);
    router.push("/");
    router.refresh();
  };

  const currentStep =
    status === "empty" || status === "uploading" || status === "parsing"
      ? 0
      : status === "ready"
        ? 1
        : 2;

  const canAccess = (stepIdx: number) => {
    if (stepIdx === 0) return true;
    if (stepIdx === 1) return status === "ready" || status === "error";
    if (stepIdx === 2) return status === "ready" || status === "error";
    return false;
  };

  const textColor = transparent ? "text-white/80" : "text-neutral-900";
  const mutedColor = transparent ? "text-white/40" : "text-neutral-400";
  const borderColor = transparent ? "border-white/10" : "border-neutral-200";
  const bgColor = transparent ? "bg-transparent" : "bg-white";
  const hoverColor = transparent ? "hover:text-white" : "hover:text-accent";

  return (
    <header className={`${borderColor} ${bgColor} relative z-50 ${transparent ? "" : "border-b"}`}>
      <div className="mx-auto max-w-5xl px-6 py-4 flex items-center justify-between">
        <Link
          href="/"
          className={`text-lg font-bold tracking-tight transition-colors ${textColor} ${hoverColor}`}
        >
          {transparent ? (
            <span className="flex items-center gap-2.5">
              <svg width="22" height="22" viewBox="0 0 48 48" fill="none" aria-hidden="true">
                <rect width="48" height="48" rx="12" fill="url(#logo-sm-g)" />
                <path d="M14 18a4 4 0 1 1 8 0v2a2 2 0 0 1 4 0v6c0 5.523-4.477 10-10 10s-10-4.477-10-10v-6a2 2 0 1 1 4 0v-2a4 4 0 0 1 4 0v2" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                <defs><linearGradient id="logo-sm-g" x1="0" y1="0" x2="48" y2="48"><stop offset="0%" stopColor="#6366f1"/><stop offset="100%" stopColor="#a855f7"/></linearGradient></defs>
              </svg>
              人生旅途
            </span>
          ) : (
            "人生旅途"
          )}
        </Link>
        <nav className="flex items-center gap-2 text-sm">
          {steps.map((step, i) => (
            <div key={step.num} className="flex items-center gap-2">
              {i > 0 && <span className={mutedColor}>→</span>}
              {canAccess(i) ? (
                <Link
                  href={step.path}
                  className={`flex items-center gap-1.5 px-2 py-1 rounded transition-colors ${
                    i === currentStep
                      ? transparent
                        ? "bg-white/10 text-white font-medium"
                        : "bg-neutral-100 text-neutral-900 font-medium"
                      : `${mutedColor} hover:text-${transparent ? "white" : "neutral-600"}`
                  }`}
                >
                  <span
                    className={`inline-flex items-center justify-center w-5 h-5 rounded-full text-xs font-semibold ${
                      i === currentStep
                        ? "bg-accent text-white"
                        : transparent
                          ? "bg-white/10 text-white/60"
                          : "bg-neutral-200 text-neutral-500"
                    }`}
                  >
                    {step.num}
                  </span>
                  <span className="hidden sm:inline">{step.label}</span>
                </Link>
              ) : (
                <span className={`flex items-center gap-1.5 px-2 py-1 cursor-not-allowed ${mutedColor}`}>
                  <span className={`inline-flex items-center justify-center w-5 h-5 rounded-full text-xs font-semibold ${transparent ? "bg-white/5 text-white/30" : "bg-neutral-100 text-neutral-300"}`}>
                    {step.num}
                  </span>
                  <span className="hidden sm:inline">{step.label}</span>
                </span>
              )}
            </div>
          ))}
          <span className={`${mutedColor} mx-1`}>|</span>
          {user ? (
            <div className="flex items-center gap-2">
              <span className={`text-xs ${mutedColor}`}>{user.email}</span>
              <button
                onClick={handleLogout}
                className="text-xs text-neutral-400 hover:text-red-500 transition-colors"
              >
                退出
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className={`text-xs ${mutedColor} hover:text-${transparent ? "white" : "accent"} transition-colors`}
            >
              登录
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
