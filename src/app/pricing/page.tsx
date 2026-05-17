"use client";

import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { useResumeStore } from "@/store/resume-store";
import { useRouter } from "next/navigation";
import Link from "next/link";

const tiers = [
  {
    id: "free",
    name: "免费版",
    price: "¥0",
    period: "永久",
    description: "体验核心功能",
    features: [
      "3 次简历解析",
      "1 个 AI Agent 风格",
      "生成个人主页 HTML",
      "基础主题",
    ],
    highlight: false,
  },
  {
    id: "pro-monthly",
    name: "Pro 月付",
    price: "¥29",
    period: "/月",
    description: "适合求职旺季",
    features: [
      "无限次简历解析",
      "全部 5 个 AI Agent",
      "项目成果报告生成",
      "行业简报 & 白皮书",
      "补充资料合并",
      "求职材料包",
      "优先处理队列",
    ],
    priceId: process.env.NEXT_PUBLIC_STRIPE_MONTHLY_PRICE_ID,
    highlight: true,
  },
  {
    id: "pro-yearly",
    name: "Pro 年付",
    price: "¥199",
    period: "/年",
    description: "省 ¥149 · 月均 ¥16.6",
    features: [
      "Pro 月付全部功能",
      "专属高级主题",
      "批量导出",
      "年度报告汇总",
      "优先客服支持",
    ],
    priceId: process.env.NEXT_PUBLIC_STRIPE_YEARLY_PRICE_ID,
    highlight: false,
  },
];

export default function PricingPage() {
  const user = useResumeStore((s) => s.user);
  const router = useRouter();
  const [loading, setLoading] = useState<string | null>(null);
  const [error, setError] = useState("");

  const handleUpgrade = async (priceId: string) => {
    if (!user) { router.push("/login"); return; }
    setLoading(priceId);
    setError("");
    try {
      const res = await fetch("/api/payment/create-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ priceId }),
      });
      const json = await res.json();
      if (json.url) {
        window.location.href = json.url;
      } else {
        setError(json.error || "支付服务暂不可用");
      }
    } catch { setError("网络错误"); }
    setLoading(null);
  };

  return (
    <>
      <Header />
      <main className="min-h-screen" style={{ background: "linear-gradient(180deg, #faf9f6 0%, #f0fdfa 100%)" }}>
        <div className="mx-auto max-w-5xl px-6 py-16 sm:py-24">
          <div className="text-center mb-14">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4" style={{ color: "#1e293b" }}>
              选择适合你的方案
            </h1>
            <p className="text-lg max-w-md mx-auto" style={{ color: "#64748b" }}>
              免费体验 3 次，满意后升级 Pro 解锁全部功能
            </p>
          </div>

          {error && (
            <div className="mb-8 p-3 rounded-xl text-sm text-center" style={{ background: "rgba(239,68,68,0.08)", color: "#dc2626" }}>
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {tiers.map((tier) => (
              <div
                key={tier.id}
                className="relative rounded-2xl p-8 flex flex-col transition-all duration-300 hover:-translate-y-1"
                style={{
                  background: tier.highlight ? "#fff" : "rgba(255,255,255,0.7)",
                  border: tier.highlight ? "2px solid #0d9488" : "1px solid rgba(13,148,136,0.15)",
                  boxShadow: tier.highlight ? "0 8px 40px rgba(13,148,136,0.12)" : "0 2px 16px rgba(0,0,0,0.04)",
                }}
              >
                {tier.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs font-semibold text-white"
                    style={{ background: "linear-gradient(135deg, #0f766e, #14b8a6)" }}>
                    推荐
                  </div>
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
                      <svg className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: "#0d9488" }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                        <path d="M20 6 9 17l-5-5"/>
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>

                {tier.priceId ? (
                  <button
                    onClick={() => handleUpgrade(tier.priceId!)}
                    disabled={loading === tier.priceId}
                    className="w-full py-3 rounded-xl text-sm font-semibold transition-all hover:-translate-y-0.5 active:scale-[0.98] disabled:opacity-60"
                    style={{
                      background: tier.highlight
                        ? "linear-gradient(135deg, #0f766e, #14b8a6)"
                        : "rgba(13,148,136,0.1)",
                      color: tier.highlight ? "#fff" : "#0f766e",
                    }}
                  >
                    {loading === tier.priceId ? "跳转中..." : "升级 Pro"}
                  </button>
                ) : (
                  <Link
                    href={user ? "/" : "/login"}
                    className="w-full py-3 rounded-xl text-sm font-semibold text-center transition-all hover:-translate-y-0.5 block"
                    style={{ background: "rgba(13,148,136,0.08)", color: "#0f766e" }}
                  >
                    {user ? "开始使用" : "免费注册"}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Back */}
          <div className="text-center mt-12">
            <Link href="/" className="text-sm hover:underline" style={{ color: "#94a3b8" }}>← 返回首页</Link>
          </div>
        </div>
      </main>
    </>
  );
}
