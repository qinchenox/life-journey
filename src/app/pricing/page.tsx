"use client";

import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { useResumeStore } from "@/store/resume-store";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { t, tv } from "@/i18n";

function PayModal({ plan, onClose }: { plan: string; onClose: () => void }) {
  const [qrCode, setQrCode] = useState("");
  const [payUrl, setPayUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Create order on mount
  useState(() => {
    (async () => {
      try {
        const res = await fetch("/api/payment/create-checkout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ plan }),
        });
        const json = await res.json();
        if (json.success) {
          setQrCode(json.qrcode);
          setPayUrl(json.paymentUrl);
        } else {
          setError(json.error || t("states.paymentFailed"));
        }
      } catch { setError(t("states.networkError")); }
      setLoading(false);
    })();
  });

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0" style={{ background: "rgba(15,23,42,0.5)", backdropFilter: "blur(8px)" }} />
      <div className="relative w-full max-w-sm rounded-2xl p-8 shadow-2xl text-center" style={{ background: "#fff", animation: "modalIn 0.3s ease-out" }}
        onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full text-neutral-400 hover:bg-neutral-100">✕</button>

        <h3 className="text-xl font-bold mb-2" style={{ color: "#1e293b" }}>{t("pricing.payModal.title")}</h3>
        <p className="text-sm mb-6" style={{ color: "#94a3b8" }}>
          {plan === "pro-yearly"
            ? `${t("pricing.yearly.name")} ${t("pricing.yearly.price")}`
            : `${t("pricing.monthly.name")} ${t("pricing.monthly.price")}`}
        </p>

        {loading ? (
          <div className="flex items-center justify-center gap-2 py-12 text-sm" style={{ color: "#94a3b8" }}>
            <span className="w-5 h-5 border-2 border-accent border-t-transparent rounded-full animate-spin" />
            {t("pricing.payModal.generating")}
          </div>
        ) : error ? (
          <div className="py-8 text-sm" style={{ color: "#dc2626" }}>{error}</div>
        ) : (
          <div className="space-y-4">
            {qrCode && <img src={qrCode} alt={t("pricing.payModal.qrCodeAlt")} className="mx-auto rounded-lg" style={{ width: 200, height: 200 }} />}
            {payUrl && (
              <a href={payUrl} target="_blank" rel="noopener noreferrer"
                className="block w-full py-2.5 rounded-lg text-sm font-medium text-white transition-all hover:opacity-90"
                style={{ background: "linear-gradient(135deg, #0f766e, #14b8a6)" }}>
                {t("pricing.payModal.openInBrowser")}
              </a>
            )}
            <p className="text-xs" style={{ color: "#94a3b8" }}>{t("pricing.payModal.autoActivate")}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function PricingPage() {
  const user = useResumeStore((s) => s.user);
  const router = useRouter();
  const [payPlan, setPayPlan] = useState<string | null>(null);
  const [error, setError] = useState("");

  const handleUpgrade = (plan: string) => {
    if (!user) { router.push("/login"); return; }
    setError("");
    setPayPlan(plan);
  };

  const tiers = [
    {
      id: "free",
      name: t("pricing.free.name"),
      price: t("pricing.free.price"),
      period: t("pricing.free.period"),
      description: t("pricing.free.description"),
      features: tv("pricing.free.features") as string[],
      highlight: false,
      plan: "",
    },
    {
      id: "pro-monthly",
      name: t("pricing.monthly.name"),
      price: t("pricing.monthly.price"),
      period: t("pricing.monthly.period"),
      description: t("pricing.monthly.description"),
      features: tv("pricing.monthly.features") as string[],
      plan: "pro-monthly",
      highlight: true,
    },
    {
      id: "pro-yearly",
      name: t("pricing.yearly.name"),
      price: t("pricing.yearly.price"),
      period: t("pricing.yearly.period"),
      description: t("pricing.yearly.description"),
      features: tv("pricing.yearly.features") as string[],
      plan: "pro-yearly",
      highlight: false,
    },
  ];

  return (
    <>
      <Header />
      <main className="min-h-screen" style={{ background: "linear-gradient(180deg, #faf9f6 0%, #f0fdfa 100%)" }}>
        <div className="mx-auto max-w-5xl px-6 py-16 sm:py-24">
          <div className="text-center mb-14">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4" style={{ color: "#1e293b" }}>{t("pricing.title")}</h1>
            <p className="text-lg max-w-md mx-auto" style={{ color: "#64748b" }}>{t("pricing.subtitle")}</p>
          </div>

          {error && (
            <div className="mb-8 p-3 rounded-xl text-sm text-center" style={{ background: "rgba(239,68,68,0.08)", color: "#dc2626" }}>{error}</div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {tiers.map((tier) => (
              <div key={tier.id} className="relative rounded-2xl p-8 flex flex-col transition-all duration-300 hover:-translate-y-1"
                style={{ background: tier.highlight ? "#fff" : "rgba(255,255,255,0.7)", border: tier.highlight ? "2px solid #0d9488" : "1px solid rgba(13,148,136,0.15)", boxShadow: tier.highlight ? "0 8px 40px rgba(13,148,136,0.12)" : "0 2px 16px rgba(0,0,0,0.04)" }}>
                {tier.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs font-semibold text-white" style={{ background: "linear-gradient(135deg, #0f766e, #14b8a6)" }}>{t("pricing.recommended")}</div>
                )}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-1" style={{ color: "#1e293b" }}>{tier.name}</h3>
                  <p className="text-sm" style={{ color: "#94a3b8" }}>{tier.description}</p>
                </div>
                <div className="mb-6">
                  <span className="text-4xl font-bold" style={{ color: "#1e293b" }}>{tier.price}</span>
                  <span className="text-sm ml-1" style={{ color: "#94a3b8" }}>{tier.period}</span>
                </div>
                <ul className="flex-1 space-y-3 mb-8">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm" style={{ color: "#475569" }}>
                      <svg className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: "#0d9488" }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M20 6 9 17l-5-5"/></svg>
                      {f}
                    </li>
                  ))}
                </ul>
                {tier.plan ? (
                  <button onClick={() => handleUpgrade(tier.plan)} className="w-full py-3 rounded-xl text-sm font-semibold transition-all hover:-translate-y-0.5 active:scale-[0.98]"
                    style={{ background: tier.highlight ? "linear-gradient(135deg, #0f766e, #14b8a6)" : "rgba(13,148,136,0.1)", color: tier.highlight ? "#fff" : "#0f766e" }}>
                    {t("pricing.upgrade")}
                  </button>
                ) : (
                  <Link href={user ? "/" : "/login"} className="w-full py-3 rounded-xl text-sm font-semibold text-center transition-all hover:-translate-y-0.5 block"
                    style={{ background: "rgba(13,148,136,0.08)", color: "#0f766e" }}>{user ? t("pricing.free.start") : t("pricing.free.cta")}</Link>
                )}
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/" className="text-sm hover:underline" style={{ color: "#94a3b8" }}>{t("pricing.backToHome")}</Link>
          </div>
        </div>

        {payPlan && <PayModal plan={payPlan} onClose={() => setPayPlan(null)} />}
      </main>
    </>
  );
}
