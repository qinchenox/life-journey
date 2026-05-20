"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { t } from "@/i18n";

export default function LoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          mode === "login"
            ? { action: "login", email, password }
            : { action: "register", email, password, name }
        ),
      });
      const json = await res.json();
      if (!res.ok) { setError(json.error || t("auth.operationFailed")); setLoading(false); return; }
      router.push("/");
      router.refresh();
    } catch { setError(t("auth.networkError")); setLoading(false); }
  };

  return (
    <div className="min-h-screen flex" style={{ background: "#faf9f6" }}>
      {/* Left brand panel */}
      <div className="hidden lg:flex w-[42%] relative overflow-hidden items-center justify-center" style={{ background: "linear-gradient(170deg, #0f766e 0%, #14b8a6 40%, #5eead4 100%)" }}>
        {/* Decorative shapes */}
        <div className="absolute w-[600px] h-[600px] rounded-full opacity-10" style={{ background: "radial-gradient(circle, #fff, transparent 65%)", top: "-15%", right: "-20%", filter: "blur(60px)", animation: "floatSlow 20s ease-in-out infinite" }}/>
        <div className="absolute w-[400px] h-[400px] rounded-full opacity-8" style={{ background: "radial-gradient(circle, #fff, transparent 65%)", bottom: "-10%", left: "-15%", filter: "blur(50px)", animation: "floatSlow 18s ease-in-out infinite reverse" }}/>
        {/* Grid texture */}
        <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)", backgroundSize: "50px 50px" }}/>

        <div className="relative z-10 text-center px-12">
          {/* Logo */}
          <div className="mb-8 flex justify-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl" style={{ background: "rgba(255,255,255,0.18)", boxShadow: "0 0 60px rgba(255,255,255,0.15)", backdropFilter: "blur(12px)" }}>
              <svg width="40" height="40" viewBox="0 0 48 48" fill="none">
                <circle cx="24" cy="24" r="22" stroke="rgba(255,255,255,0.7)" strokeWidth="2.5" fill="none"/>
                <path d="M13 20a4 4 0 1 1 8 0v2a2 2 0 0 1 4 0v6c0 5.523-4.477 10-10 10s-10-4.477-10-10v-6a2 2 0 1 1 4 0v-2a4 4 0 0 1 4 0v2" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="25" cy="19" r="3" fill="white"/>
              </svg>
            </div>
          </div>
          <h1 className="text-4xl font-bold text-white mb-4 tracking-tight">{t("auth.brandTitle")}</h1>
          <p className="text-white/70 text-base leading-relaxed max-w-xs mx-auto">
            {t("auth.brandDesc").split("\n")[0]}<br/>{t("auth.brandDesc").split("\n")[1]}
          </p>
        </div>
      </div>

      {/* Right form panel */}
      <div className="flex-1 flex items-center justify-center px-6 sm:px-12">
        <div className="w-full max-w-sm">
          {/* Mobile logo */}
          <div className="lg:hidden text-center mb-10">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl mb-4" style={{ background: "linear-gradient(135deg, #0f766e, #14b8a6)", boxShadow: "0 4px 20px rgba(13,148,136,0.25)" }}>
              <svg width="28" height="28" viewBox="0 0 48 48" fill="none"><circle cx="24" cy="24" r="22" stroke="white" strokeWidth="2.5" fill="none"/><path d="M13 20a4 4 0 1 1 8 0v2a2 2 0 0 1 4 0v6c0 5.523-4.477 10-10 10s-10-4.477-10-10v-6a2 2 0 1 1 4 0v-2a4 4 0 0 1 4 0v2" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/><circle cx="25" cy="19" r="3" fill="white"/></svg>
            </div>
            <h2 className="text-2xl font-bold" style={{ color: "#1e293b" }}>{t("auth.brandTitle")}</h2>
          </div>

          <h2 className="text-2xl font-bold mb-2 hidden lg:block" style={{ color: "#1e293b" }}>
            {mode === "login" ? t("auth.welcome") : t("auth.createAccount")}
          </h2>
          <p className="text-sm mb-8 hidden lg:block" style={{ color: "#94a3b8" }}>
            {mode === "login" ? t("auth.loginDesc") : t("auth.registerDesc")}
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === "register" && (
              <div>
                <label className="block text-sm font-medium mb-1.5" style={{ color: "#475569" }}>{t("auth.name")}</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl text-sm transition-all focus:outline-none focus:ring-2 focus:ring-offset-1"
                  style={{ border: "1px solid #e2e8f0", color: "#1e293b", background: "#fff" }}
                  placeholder={t("auth.namePlaceholder")}
                />
              </div>
            )}
            <div>
              <label className="block text-sm font-medium mb-1.5" style={{ color: "#475569" }}>{t("auth.email")}</label>
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl text-sm transition-all focus:outline-none focus:ring-2 focus:ring-offset-1"
                style={{ border: "1px solid #e2e8f0", color: "#1e293b", background: "#fff", "--tw-ring-color": "#0d9488" } as React.CSSProperties}
                placeholder={t("auth.emailPlaceholder")}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5" style={{ color: "#475569" }}>{t("auth.password")}</label>
              <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} minLength={6}
                className="w-full px-4 py-3 rounded-xl text-sm transition-all focus:outline-none focus:ring-2 focus:ring-offset-1"
                style={{ border: "1px solid #e2e8f0", color: "#1e293b", background: "#fff" }}
                placeholder={t("auth.passwordPlaceholder")}
              />
            </div>

            {error && (
              <div className="p-3 rounded-xl text-sm" style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)", color: "#dc2626" }}>{error}</div>
            )}

            <button type="submit" disabled={loading}
              className="w-full py-3 rounded-xl text-white font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg active:scale-[0.98] disabled:opacity-60"
              style={{ background: "linear-gradient(135deg, #0f766e 0%, #14b8a6 100%)", boxShadow: "0 4px 16px rgba(13,148,136,0.2)" }}>
              {loading ? t("auth.processing") : mode === "login" ? t("auth.login") : t("auth.register")}
            </button>
          </form>

          <p className="text-center text-sm mt-6" style={{ color: "#94a3b8" }}>
            {mode === "login" ? t("auth.noAccount") : t("auth.hasAccount")}
            <button onClick={() => { setMode(mode === "login" ? "register" : "login"); setError(""); }} className="font-semibold ml-1 hover:underline" style={{ color: "#0d9488" }}>
              {mode === "login" ? t("auth.goRegister") : t("auth.goLogin")}
            </button>
          </p>

          {/* Back to home */}
          <div className="text-center mt-6">
            <Link href="/" className="text-sm hover:underline" style={{ color: "#94a3b8" }}>{t("auth.backToHome")}</Link>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes floatSlow {
          0%,100%{transform:translate(0,0) scale(1)}
          25%{transform:translate(3%,-2%) scale(1.05)}
          50%{transform:translate(-2%,-4%) scale(.95)}
          75%{transform:translate(-3%,2%) scale(1.02)}
        }
      `}</style>
    </div>
  );
}
