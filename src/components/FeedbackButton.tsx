"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";

export function FeedbackButton() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim().length < 2) return;
    setLoading(true);
    try {
      await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message, email, page: pathname }),
      });
      setSent(true);
      setTimeout(() => { setOpen(false); setSent(false); setMessage(""); setEmail(""); }, 2000);
    } catch {}
    setLoading(false);
  };

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-[90] w-12 h-12 rounded-full shadow-lg flex items-center justify-center text-white text-lg transition-all hover:scale-110 active:scale-95"
        style={{ background: "linear-gradient(135deg, #0f766e, #14b8a6)", boxShadow: "0 4px 20px rgba(13,148,136,0.3)" }}
        title="反馈建议"
      >
        💬
      </button>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-4" onClick={() => setOpen(false)}>
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
          <div className="relative w-full max-w-md rounded-2xl p-6 shadow-2xl" style={{ background: "#fff", animation: "modalIn 0.3s ease-out" }}
            onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold" style={{ color: "#1e293b" }}>反馈建议</h3>
              <button onClick={() => setOpen(false)} className="w-8 h-8 flex items-center justify-center rounded-full text-neutral-400 hover:bg-neutral-100">✕</button>
            </div>

            {sent ? (
              <div className="text-center py-8">
                <div className="text-3xl mb-2">✅</div>
                <p className="text-sm" style={{ color: "#0f766e" }}>感谢反馈！已收到你的建议。</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <textarea
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="你的建议或遇到的问题…"
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl border border-neutral-200 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent"
                  style={{ color: "#1e293b" }}
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="邮箱（选填，方便回复）"
                  className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent"
                  style={{ color: "#1e293b" }}
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-2.5 rounded-xl text-sm font-medium text-white transition-all hover:opacity-90 disabled:opacity-60"
                  style={{ background: "linear-gradient(135deg, #0f766e, #14b8a6)" }}
                >
                  {loading ? "提交中..." : "提交反馈"}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
