"use client";

import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { FileDropZone } from "@/components/upload/FileDropZone";
import { AgentSelector } from "@/components/AgentSelector";
import { useResumeStore } from "@/store/resume-store";
import { useEffect, useRef, useState } from "react";

function LogoMark() {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect width="48" height="48" rx="14" fill="url(#logo-g)" />
      <path
        d="M14 18a4 4 0 1 1 8 0v2a2 2 0 0 1 4 0v6c0 5.523-4.477 10-10 10s-10-4.477-10-10v-6a2 2 0 1 1 4 0v-2a4 4 0 0 1 4 0v2"
        fill="none"
        stroke="white"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <defs>
        <linearGradient id="logo-g" x1="0" y1="0" x2="48" y2="48">
          <stop offset="0%" stopColor="#6366f1" />
          <stop offset="50%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#a855f7" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    const particles: { x: number; y: number; r: number; vx: number; vy: number; a: number }[] = [];

    for (let i = 0; i < 40; i++) {
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.2 + 0.3,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        a: Math.random() * 0.5 + 0.2,
      });
    }

    let animationId: number;
    const animate = () => {
      ctx.clearRect(0, 0, w, h);
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${p.a})`;
        ctx.fill();
      }
      animationId = requestAnimationFrame(animate);
    };

    const handleResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);
    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-[#0a0a14]">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 30% 20%, rgba(99,102,241,0.25) 0%, transparent 55%), " +
              "radial-gradient(ellipse 50% 60% at 70% 60%, rgba(139,92,246,0.2) 0%, transparent 55%), " +
              "radial-gradient(ellipse 40% 40% at 50% 80%, rgba(6,214,160,0.1) 0%, transparent 50%)",
          }}
        />
        {/* Subtle grid texture */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* Floating particles */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
      />

      {/* Glass overlay shapes */}
      <div
        className="absolute w-[500px] h-[500px] rounded-full opacity-[0.04]"
        style={{
          background: "radial-gradient(circle, #818cf8, transparent 70%)",
          top: "10%",
          left: "-10%",
          filter: "blur(60px)",
          animation: "floatSlow 20s ease-in-out infinite",
        }}
      />
      <div
        className="absolute w-[400px] h-[400px] rounded-full opacity-[0.04]"
        style={{
          background: "radial-gradient(circle, #c084fc, transparent 70%)",
          bottom: "15%",
          right: "-8%",
          filter: "blur(60px)",
          animation: "floatSlow 25s ease-in-out infinite reverse",
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-6">
        <div className="mb-8 flex justify-center">
          <div
            className="inline-flex items-center justify-center w-20 h-20 rounded-2xl shadow-2xl"
            style={{
              background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a855f7 100%)",
              boxShadow: "0 0 80px rgba(99,102,241,0.3), 0 8px 32px rgba(0,0,0,0.3)",
              animation: "logoFloat 6s ease-in-out infinite",
            }}
          >
            <LogoMark />
          </div>
        </div>

        <h1
          className="text-[#f8fafc] font-bold tracking-tight leading-none mb-5"
          style={{
            fontSize: "clamp(2.6rem, 8vw, 5rem)",
            letterSpacing: "-0.04em",
          }}
        >
          个人
          <span
            className="bg-clip-text"
            style={{
              background: "linear-gradient(135deg, #818cf8 0%, #c084fc 50%, #22d3ee 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            简史
          </span>
        </h1>

        <p
          className="max-w-lg mx-auto leading-relaxed mb-10"
          style={{
            fontSize: "clamp(1rem, 2.5vw, 1.2rem)",
            color: "rgba(255,255,255,0.55)",
            lineHeight: "1.8",
          }}
        >
          上传简历，AI 智能润色，即刻生成
          <br />
          属于你的现代个人主页
        </p>

        {/* Scroll CTA */}
        <button
          onClick={() => {
            document.getElementById("upload-section")?.scrollIntoView({ behavior: "smooth" });
          }}
          className="inline-flex items-center gap-3 px-8 py-3.5 rounded-full text-sm font-medium transition-all duration-500"
          style={{
            background: "rgba(255,255,255,0.08)",
            border: "1px solid rgba(255,255,255,0.12)",
            color: "rgba(255,255,255,0.85)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(255,255,255,0.14)";
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.25)";
            e.currentTarget.style.transform = "translateY(-2px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(255,255,255,0.08)";
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)";
            e.currentTarget.style.transform = "translateY(0)";
          }}
        >
          开始创建
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </button>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10" style={{ animation: "fadeBounce 2s ease-in-out infinite" }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" strokeLinecap="round">
          <path d="M17 10 12 15 7 10" />
        </svg>
      </div>
    </div>
  );
}

export default function HomePage() {
  const status = useResumeStore((s) => s.status);
  const hasData = status === "ready";
  const agentId = useResumeStore((s) => s.agentId);
  const setAgentId = useResumeStore((s) => s.setAgentId);

  return (
    <>
      <Header transparent />
      <main>
        <HeroSection />

        {/* Upload Section */}
        <div
          id="upload-section"
          className="relative"
          style={{
            background: "linear-gradient(180deg, #0a0a14 0%, #0f172a 30%, #f8fafc 30%)",
          }}
        >
          <div className="mx-auto max-w-4xl px-6 pb-24">
            {/* Glass panel */}
            <div
              className="rounded-3xl p-8 sm:p-12 shadow-2xl"
              style={{
                background: "rgba(255,255,255,0.95)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                border: "1px solid rgba(255,255,255,0.6)",
                boxShadow: "0 4px 6px rgba(0,0,0,0.02), 0 20px 60px rgba(0,0,0,0.08)",
              }}
            >
              <div className="text-center mb-10">
                <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 mb-3 tracking-tight">
                  只需一步，简历变主页
                </h2>
                <p className="text-neutral-500 text-sm sm:text-base max-w-sm mx-auto">
                  选择 AI 风格，拖拽上传，瞬间完成解析
                </p>
              </div>

              <div className="mb-8">
                <AgentSelector value={agentId} onChange={setAgentId} />
              </div>

              {hasData ? (
                <div className="text-center">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 border border-green-200 rounded-full text-green-700 text-sm mb-6">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    简历解析完成，数据已保存
                  </div>
                  <div className="flex gap-4 justify-center">
                    <Link
                      href="/edit"
                      className="px-6 py-3 bg-neutral-900 text-white font-medium rounded-lg hover:bg-neutral-700 transition-all hover:-translate-y-0.5 hover:shadow-lg"
                    >
                      编辑信息
                    </Link>
                    <Link
                      href="/preview"
                      className="px-6 py-3 border border-neutral-300 text-neutral-700 font-medium rounded-lg hover:bg-neutral-50 hover:border-neutral-400 transition-all hover:-translate-y-0.5"
                    >
                      预览主页
                    </Link>
                  </div>
                </div>
              ) : (
                <FileDropZone />
              )}
            </div>

            {/* Feature cards */}
            <div className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-6">
              {features.map((f) => (
                <div
                  key={f.title}
                  className="group text-center p-8 rounded-2xl border border-neutral-100 bg-white/80 backdrop-blur transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:border-neutral-200"
                >
                  <div className="text-3xl mb-5 group-hover:scale-110 transition-transform duration-300">
                    {f.icon}
                  </div>
                  <h3 className="text-base font-semibold text-neutral-800 mb-2">{f.title}</h3>
                  <p className="text-sm text-neutral-400 leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

const features = [
  { icon: "📤", title: "上传即解析", desc: "拖拽 PDF/DOCX 简历文件，AI 自动提取并润色信息" },
  { icon: "✏️", title: "自由编辑", desc: "检查 AI 润色结果，随时补充调整各模块内容" },
  { icon: "🌐", title: "一键发布", desc: "生成现代设计个人主页，可部署至任意静态托管" },
];
