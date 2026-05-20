"use client";

import { t } from "@/i18n";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#faf9f6] px-6">
      <div className="text-center max-w-sm">
        <div className="text-4xl mb-4">😞</div>
        <h2 className="text-lg font-semibold text-[#1e293b] mb-2">{t("states.error")}</h2>
        <p className="text-sm text-[#94a3b8] mb-6">
          {error.message || t("states.errorDefault")}
        </p>
        <button
          onClick={reset}
          className="px-6 py-2.5 rounded-full text-sm font-medium text-white transition-all active:scale-95"
          style={{
            background: "linear-gradient(135deg, #0f766e, #14b8a6)",
            boxShadow: "0 4px 16px rgba(13,148,136,0.2)",
          }}
        >
          {t("states.retry")}
        </button>
      </div>
    </div>
  );
}
