"use client";

import Link from "next/link";
import { t } from "@/i18n";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#faf9f6] px-6">
      <div className="text-center max-w-sm">
        <div className="text-5xl font-bold text-teal-600 mb-3">404</div>
        <h2 className="text-lg font-semibold text-[#1e293b] mb-2">{t("states.notFound")}</h2>
        <p className="text-sm text-[#94a3b8] mb-6">
          {t("states.notFoundDesc")}
        </p>
        <Link
          href="/"
          className="inline-flex px-6 py-2.5 rounded-full text-sm font-medium text-white transition-all active:scale-95"
          style={{
            background: "linear-gradient(135deg, #0f766e, #14b8a6)",
            boxShadow: "0 4px 16px rgba(13,148,136,0.2)",
          }}
        >
          {t("states.backHome")}
        </Link>
      </div>
    </div>
  );
}
