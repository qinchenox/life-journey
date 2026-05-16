"use client";

import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { FileDropZone } from "@/components/upload/FileDropZone";
import { AgentSelector } from "@/components/AgentSelector";
import { useResumeStore } from "@/store/resume-store";
import { useEffect, useRef, useState, useCallback } from "react";

function LogoMark() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect width="48" height="48" rx="14" fill="url(#logo-g)" />
      <path d="M14 18a4 4 0 1 1 8 0v2a2 2 0 0 1 4 0v6c0 5.523-4.477 10-10 10s-10-4.477-10-10v-6a2 2 0 1 1 4 0v-2a4 4 0 0 1 4 0v2" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      <defs><linearGradient id="logo-g" x1="0" y1="0" x2="48" y2="48"><stop offset="0%" stopColor="#6366f1"/><stop offset="50%" stopColor="#8b5cf6"/><stop offset="100%" stopColor="#a855f7"/></linearGradient></defs>
    </svg>
  );
}

function TypewriterText({ texts, speed }: { texts: string[]; speed: number }) {
  const [idx, setIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = texts[idx];
    const timer = setTimeout(() => {
      if (!deleting) {
        if (charIdx < current.length) {
          setCharIdx((c) => c + 1);
        } else {
          setTimeout(() => setDeleting(true), 2000);
        }
      } else {
        if (charIdx > 0) {
          setCharIdx((c) => c - 1);
        } else {
          setDeleting(false);
          setIdx((i) => (i + 1) % texts.length);
        }
      }
    }, deleting ? speed / 2 : speed);
    return () => clearTimeout(timer);
  }, [charIdx, deleting, idx, texts, speed]);

  return <span>{texts[idx].slice(0, charIdx)}<span className="animate-pulse">|</span></span>;
}

function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 });

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMouse({ x: (e.clientX - rect.left) / rect.width, y: (e.clientY - rect.top) / rect.height });
  }, []);

  // Particles
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    const particles: { x: number; y: number; r: number; vx: number; vy: number; a: number }[] = [];
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * w, y: Math.random() * h,
        r: Math.random() * 1.5 + 0.3,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        a: Math.random() * 0.6 + 0.15,
      });
    }

    let animationId: number;
    const animate = () => {
      ctx.clearRect(0, 0, w, h);
      for (const p of particles) {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${p.a})`; ctx.fill();
      }
      // Connect nearby particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath(); ctx.moveTo(particles[i].x, particles[i].y); ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(255,255,255,${0.04 * (1 - dist / 120)})`; ctx.lineWidth = 0.5; ctx.stroke();
          }
        }
      }
      animationId = requestAnimationFrame(animate);
    };

    const handleResize = () => { w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; };
    window.addEventListener("resize", handleResize);
    animate();
    return () => { cancelAnimationFrame(animationId); window.removeEventListener("resize", handleResize); };
  }, []);

  const parallaxStyle = (factor: number) => ({
    transform: `translate(${(mouse.x - 0.5) * factor}px, ${(mouse.y - 0.5) * factor}px)`,
    transition: "transform 0.8s cubic-bezier(0.23, 1, 0.32, 1)",
  });

  return (
    <div ref={heroRef} onMouseMove={handleMouseMove} className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-[#0a0a14]">
        <div className="absolute inset-0" style={{
          background: "radial-gradient(ellipse 60% 50% at 30% 20%, rgba(99,102,241,0.25) 0%, transparent 55%), " +
            "radial-gradient(ellipse 50% 60% at 70% 60%, rgba(139,92,246,0.2) 0%, transparent 55%), " +
            "radial-gradient(ellipse 40% 40% at 50% 80%, rgba(6,214,160,0.1) 0%, transparent 50%)",
          animation: "gradientShift 15s ease-in-out infinite",
        }}/>
        <div className="absolute inset-0 opacity-[0.025]" style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}/>
      </div>

      {/* Particles canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" aria-hidden="true"/>

      {/* Parallax shapes */}
      <div className="absolute w-[550px] h-[550px] rounded-full opacity-[0.05] pointer-events-none" style={{
        background: "radial-gradient(circle, #818cf8, transparent 70%)",
        top: "5%", left: "-12%", filter: "blur(80px)",
        animation: "floatSlow 18s ease-in-out infinite",
        ...parallaxStyle(-30),
      }}/>
      <div className="absolute w-[420px] h-[420px] rounded-full opacity-[0.05] pointer-events-none" style={{
        background: "radial-gradient(circle, #c084fc, transparent 70%)",
        bottom: "10%", right: "-10%", filter: "blur(80px)",
        animation: "floatSlow 22s ease-in-out infinite reverse",
        ...parallaxStyle(25),
      }}/>
      <div className="absolute w-[300px] h-[300px] rounded-full opacity-[0.03] pointer-events-none" style={{
        background: "radial-gradient(circle, #22d3ee, transparent 70%)",
        top: "50%", left: "60%", filter: "blur(60px)",
        animation: "floatSlow 16s ease-in-out infinite",
        ...parallaxStyle(-20),
      }}/>

      {/* Content */}
      <div className="relative z-10 text-center px-6" style={parallaxStyle(-8)}>
        {/* Logo */}
        <div className="mb-8 flex justify-center">
          <div className="relative group cursor-default">
            {/* Glow ring */}
            <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" style={{
              background: "linear-gradient(135deg, rgba(99,102,241,0.4), rgba(168,85,247,0.4))",
              filter: "blur(24px)", transform: "scale(1.4)",
            }}/>
            <div className="relative inline-flex items-center justify-center w-20 h-20 rounded-2xl" style={{
              background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a855f7 100%)",
              boxShadow: "0 0 80px rgba(99,102,241,0.3), 0 8px 32px rgba(0,0,0,0.3)",
              animation: "logoFloat 6s ease-in-out infinite",
            }}>
              <LogoMark />
            </div>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-[#f8fafc] font-bold tracking-tight leading-none mb-5 select-none" style={{ fontSize: "clamp(2.8rem, 8vw, 5.2rem)", letterSpacing: "-0.04em" }}>
          人生
          <span className="bg-clip-text" style={{ background: "linear-gradient(135deg, #818cf8 0%, #c084fc 50%, #22d3ee 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            旅途
          </span>
        </h1>

        {/* Typewriter subtitle */}
        <p className="max-w-lg mx-auto mb-10 select-none" style={{ fontSize: "clamp(1rem, 2.5vw, 1.2rem)", color: "rgba(255,255,255,0.55)", lineHeight: "1.8", minHeight: "2.5em" }}>
          <TypewriterText texts={[
            "AI 智能润色简历，生成现代个人主页",
            "5 种 AI 风格，匹配你的职业定位",
            "一键发布，扫码即可分享给世界",
          ]} speed={80} />
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          {/* Primary button — glow effect */}
          <button
            onClick={() => document.getElementById("upload-section")?.scrollIntoView({ behavior: "smooth" })}
            className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full text-sm font-semibold transition-all duration-500 overflow-hidden"
            style={{ color: "#fff" }}
          >
            {/* Animated background */}
            <div className="absolute inset-0 rounded-full" style={{
              background: "linear-gradient(135deg, #6366f1, #8b5cf6, #a855f7, #6366f1)",
              backgroundSize: "300% 100%",
              animation: "shimmer 4s ease-in-out infinite",
            }}/>
            {/* Glow */}
            <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{
              boxShadow: "0 0 40px rgba(99,102,241,0.5), 0 0 80px rgba(139,92,246,0.3)",
            }}/>
            {/* Hover scale */}
            <span className="relative z-10 flex items-center gap-2 group-hover:scale-105 transition-transform duration-300">
              开始创建
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="group-hover:translate-y-0.5 transition-transform duration-300">
                <path d="m6 9 6 6 6-6"/>
              </svg>
            </span>
          </button>

          {/* Secondary — glass */}
          <button
            onClick={() => document.getElementById("upload-section")?.scrollIntoView({ behavior: "smooth" })}
            className="inline-flex items-center gap-2 px-6 py-4 rounded-full text-sm font-medium transition-all duration-500 hover:-translate-y-0.5"
            style={{
              background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)",
              color: "rgba(255,255,255,0.7)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
            }}
          >
            了解更多
          </button>
        </div>

        {/* Trust badges */}
        <div className="mt-10 flex items-center justify-center gap-6 text-xs select-none" style={{ color: "rgba(255,255,255,0.3)" }}>
          <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400/60"/> AI 智能润色</span>
          <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-violet-400/60"/> 5 种风格</span>
          <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-cyan-400/60"/> 一键发布</span>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2" style={{ animation: "fadeBounce 2s ease-in-out infinite" }}>
        <span className="text-xs" style={{ color: "rgba(255,255,255,0.25)" }}>向下滚动</span>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" strokeLinecap="round">
          <path d="M17 10 12 15 7 10"/>
        </svg>
      </div>
    </div>
  );
}

function ScrollReveal({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setVisible(true); observer.unobserve(el); }
    }, { threshold: 0.15 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} ${className || ""}`}>
      {children}
    </div>
  );
}

const features = [
  { icon: "📤", title: "上传即解析", desc: "拖拽 PDF/DOCX 简历文件，AI 自动提取并润色信息" },
  { icon: "✏️", title: "自由编辑", desc: "检查 AI 润色结果，随时补充调整各模块内容" },
  { icon: "🌐", title: "一键发布", desc: "生成现代设计个人主页，可部署至任意静态托管" },
];

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
        <div id="upload-section" className="relative" style={{ background: "linear-gradient(180deg, #0a0a14 0%, #0f172a 28%, #f8fafc 28%)" }}>
          <div className="mx-auto max-w-4xl px-6 pb-24">
            <ScrollReveal>
              <div className="rounded-3xl p-8 sm:p-12" style={{
                background: "rgba(255,255,255,0.96)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
                border: "1px solid rgba(255,255,255,0.6)", boxShadow: "0 4px 6px rgba(0,0,0,0.02), 0 24px 60px rgba(0,0,0,0.08)",
              }}>
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
                      <Link href="/edit" className="px-6 py-3 bg-neutral-900 text-white font-medium rounded-lg hover:bg-neutral-700 transition-all hover:-translate-y-0.5 hover:shadow-lg">
                        编辑信息
                      </Link>
                      <Link href="/preview" className="px-6 py-3 border border-neutral-300 text-neutral-700 font-medium rounded-lg hover:bg-neutral-50 hover:border-neutral-400 transition-all hover:-translate-y-0.5">
                        预览主页
                      </Link>
                    </div>
                  </div>
                ) : (
                  <FileDropZone />
                )}
              </div>
            </ScrollReveal>

            {/* Feature cards with scroll reveal */}
            <div className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-6">
              {features.map((f, i) => (
                <ScrollReveal key={f.title} className={`delay-${i * 100}`}>
                  <div className="group text-center p-8 rounded-2xl border border-neutral-100 bg-white/80 backdrop-blur transition-all duration-500 hover:-translate-y-2 hover:shadow-xl hover:border-neutral-200 cursor-default">
                    <div className="text-3xl mb-5 group-hover:scale-110 transition-transform duration-500">{f.icon}</div>
                    <h3 className="text-base font-semibold text-neutral-800 mb-2">{f.title}</h3>
                    <p className="text-sm text-neutral-400 leading-relaxed">{f.desc}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
