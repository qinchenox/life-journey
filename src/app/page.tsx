"use client";

import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { FileDropZone } from "@/components/upload/FileDropZone";
import { AgentSelector } from "@/components/AgentSelector";
import { useResumeStore } from "@/store/resume-store";
import { useEffect, useRef, useState, useCallback } from "react";
import { t, tv } from "@/i18n";

/* ── Premium Logo Mark ── */
function LogoMark({ size = 48 }: { size?: number }) {
  const s = size; const r = s / 2;
  return (
    <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`} fill="none" aria-hidden="true">
      <circle cx={r} cy={r} r={r - 2} fill="url(#logo-bg)" opacity="0.12" />
      <circle cx={r} cy={r} r={r - 5} stroke="url(#logo-stroke)" strokeWidth="2.5" fill="none" />
      <path d={`M${r*0.35} ${r*0.65} Q${r*0.5} ${r*0.3} ${r*0.5} ${r*0.45} Q${r*0.5} ${r*0.55} ${r*0.65} ${r*0.4}`} stroke="url(#logo-stroke)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      <circle cx={r*0.65} cy={r*0.4} r="3.5" fill="#0d9488"/>
      <defs>
        <linearGradient id="logo-bg" x1="0" y1="0" x2={s} y2={s}><stop offset="0%" stopColor="#0d9488"/><stop offset="100%" stopColor="#5eead4"/></linearGradient>
        <linearGradient id="logo-stroke" x1="0" y1="0" x2={s} y2={s}><stop offset="0%" stopColor="#0f766e"/><stop offset="50%" stopColor="#14b8a6"/><stop offset="100%" stopColor="#5eead4"/></linearGradient>
      </defs>
    </svg>
  );
}

/* ── Typewriter ── */
function TypewriterText({ texts, speed }: { texts: string[]; speed: number }) {
  const [idx, setIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);
  useEffect(() => {
    const current = texts[idx];
    const timer = setTimeout(() => {
      if (!deleting) {
        if (charIdx < current.length) setCharIdx((c) => c + 1);
        else setTimeout(() => setDeleting(true), 2500);
      } else {
        if (charIdx > 0) setCharIdx((c) => c - 1);
        else { setDeleting(false); setIdx((i) => (i + 1) % texts.length); }
      }
    }, deleting ? speed / 2 : speed);
    return () => clearTimeout(timer);
  }, [charIdx, deleting, idx, texts, speed]);
  return <span>{texts[idx].slice(0, charIdx)}<span className="animate-pulse" style={{color:"var(--color-accent, #0d9488)"}}>|</span></span>;
}

/* ── Video Background ── */
function VideoBackground({ paused }: { paused?: boolean }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Pause/resume based on prop
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (paused) v.pause();
    else if (loaded) v.play().catch(() => {});
  }, [paused, loaded]);

  useEffect(() => {
    // Check mobile for data-saving: skip video on small screens
    const mq = window.matchMedia("(max-width: 768px)");
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Respect reduced motion preference
  const [reducedMotion, setReducedMotion] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const showVideo = !isMobile && !reducedMotion && !error;

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Static base — always present */}
      <div className="absolute inset-0" style={{background:"#faf9f6"}} />

      {/* Video — fades in when loaded */}
      {showVideo && (
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          disablePictureInPicture
          onLoadedData={() => setLoaded(true)}
          onError={() => setError(true)}
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            opacity: loaded ? 1 : 0,
            transition: "opacity 2s cubic-bezier(0.23,1,0.32,1)",
            objectPosition: "center 40%",   // frame lower to show more ground/path
          }}
        >
          <source src="/videos/hero-bg.webm" type="video/webm" />
          <source src="/videos/hero-bg.mp4" type="video/mp4" />
        </video>
      )}

      {/* Light brand tint + bottom fade — let video breathe */}
      <div className="absolute inset-0" style={{
        background: showVideo
          ? [
              // Subtle teal wash — barely there, just ties video to brand
              "rgba(13,148,136,0.12)",
              // Vignette: slightly darker edges so centered text pops
              "radial-gradient(ellipse 65% 55% at 50% 45%, transparent 0%, rgba(15,23,42,0.2) 100%)",
              // Bottom fade: transition to page background below hero
              "linear-gradient(0deg, rgba(250,249,246,0.9) 0%, rgba(250,249,246,0.3) 25%, transparent 50%)",
            ].join(", ")
          : "radial-gradient(ellipse 45% 40% at 70% 15%, rgba(13,148,136,0.15) 0%, transparent 55%), radial-gradient(ellipse 50% 45% at 25% 80%, rgba(94,234,212,0.12) 0%, transparent 55%), radial-gradient(ellipse 35% 35% at 50% 50%, rgba(20,184,166,0.06) 0%, transparent 60%)",
      }} />
    </div>
  );
}

/* ── Hero ── */
function HeroSection({ onStart, paused }: { onStart: () => void; paused?: boolean }) {
  const heroRef = useRef<HTMLDivElement>(null);
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 });
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMouse({ x: (e.clientX - rect.left) / rect.width, y: (e.clientY - rect.top) / rect.height });
  }, []);
  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const touch = e.touches[0];
    setMouse({ x: (touch.clientX - rect.left) / rect.width, y: (touch.clientY - rect.top) / rect.height });
  }, []);
  const parallax = (f: number) => ({
    transform: `translate(${(mouse.x-0.5)*f}px, ${(mouse.y-0.5)*f}px)`,
    transition: "transform 1s cubic-bezier(0.23,1,0.32,1)",
  });

  return (
    <div ref={heroRef} onMouseMove={handleMouseMove} onTouchMove={handleTouchMove} className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden select-none">
      <VideoBackground paused={paused} />
      <div className="absolute w-[500px] h-[500px] rounded-full pointer-events-none" style={{background:"radial-gradient(circle, rgba(94,234,212,0.18), transparent 70%)",top:"8%",left:"-10%",filter:"blur(80px)",animation:"floatSlow 20s ease-in-out infinite",...parallax(-25)}}/>
      <div className="absolute w-[380px] h-[380px] rounded-full pointer-events-none" style={{background:"radial-gradient(circle, rgba(13,148,136,0.14), transparent 70%)",bottom:"15%",right:"-6%",filter:"blur(70px)",animation:"floatSlow 22s ease-in-out infinite reverse",...parallax(20)}}/>
      <div className="absolute w-[280px] h-[280px] rounded-full pointer-events-none" style={{background:"radial-gradient(circle, rgba(20,184,166,0.1), transparent 70%)",top:"55%",left:"55%",filter:"blur(60px)",animation:"floatSlow 16s ease-in-out infinite",...parallax(-15)}}/>

      <div className="relative z-10 text-center px-6" style={parallax(-6)}>
        <div className="mb-10 flex justify-center">
          <div className="relative group cursor-default">
            <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" style={{background:"rgba(13,148,136,0.12)",filter:"blur(30px)",transform:"scale(1.6)"}}/>
            <div className="relative inline-flex items-center justify-center w-[90px] h-[90px] rounded-full" style={{background:"radial-gradient(circle at 35% 35%, rgba(255,255,255,0.9), rgba(240,253,250,0.6))",boxShadow:"0 0 0 1px rgba(13,148,136,0.12), 0 8px 32px rgba(13,148,136,0.1), 0 2px 8px rgba(0,0,0,0.04)",animation:"logoFloat 6s ease-in-out infinite"}}>
              <LogoMark size={52}/>
            </div>
          </div>
        </div>

        <h1 className="font-bold tracking-tight leading-none mb-5" style={{fontSize:"clamp(2.8rem, 8vw, 5.2rem)",letterSpacing:"-0.04em",color:"#1e293b",textShadow:"0 1px 2px rgba(255,255,255,0.5)"}}>
          人生<span className="bg-clip-text" style={{background:"linear-gradient(135deg, #0f766e 0%, #14b8a6 40%, #5eead4 100%)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",filter:"drop-shadow(0 1px 2px rgba(255,255,255,0.5))"}}>旅途</span>
        </h1>

        <p className="max-w-lg mx-auto mb-10" style={{fontSize:"clamp(1rem, 2.5vw, 1.2rem)",color:"#475569",lineHeight:"1.8",minHeight:"2.5em",textShadow:"0 1px 1px rgba(255,255,255,0.4)"}}>
          <TypewriterText texts={tv("home.typewriter") as string[]} speed={80}/>
        </p>

        {/* CTA — opens modal */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button onClick={onStart} className="group relative inline-flex items-center gap-2.5 px-9 py-4 rounded-full text-base font-semibold transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-500 active:scale-95"
            style={{background:"linear-gradient(135deg, #0f766e 0%, #14b8a6 50%, #2dd4bf 100%)",color:"#fff",boxShadow:"0 4px 20px rgba(13,148,136,0.25), 0 1px 3px rgba(0,0,0,0.06)",minHeight:"52px"}}
            onMouseEnter={(e)=>{e.currentTarget.style.transform="translateY(-2px)";e.currentTarget.style.boxShadow="0 8px 32px rgba(13,148,136,0.35), 0 2px 6px rgba(0,0,0,0.08)"}}
            onMouseLeave={(e)=>{e.currentTarget.style.transform="translateY(0)";e.currentTarget.style.boxShadow="0 4px 20px rgba(13,148,136,0.25), 0 1px 3px rgba(0,0,0,0.06)"}}
          >
            <span className="relative z-10">{t("home.cta")}</span>
            <svg className="relative z-10 group-hover:translate-x-0.5 transition-transform duration-300" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </button>
          <button onClick={onStart} className="inline-flex items-center gap-2 px-7 py-4 rounded-full text-sm font-medium transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-400 hover:-translate-y-0.5 active:scale-95"
            style={{background:"rgba(255,255,255,0.7)",border:"1px solid rgba(13,148,136,0.2)",color:"#0f766e",backdropFilter:"blur(12px)",WebkitBackdropFilter:"blur(12px)",minHeight:"52px"}}>
            {t("home.learnMore")}
          </button>
        </div>

        <div className="mt-10 flex items-center justify-center gap-6 text-sm" style={{color:"#94a3b8"}}>
          {(tv("home.tagline") as string[]).map((text, i) => (
            <span key={text} className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full" style={{background:["#2dd4bf","#14b8a6","#0f766e"][i]}}/> {text}</span>
          ))}
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2" style={{animation:"fadeBounce 2s ease-in-out infinite"}}>
        <span className="text-xs" style={{color:"#94a3b8"}}>{t("home.scrollHint")}</span>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round"><path d="M17 10 12 15 7 10"/></svg>
      </div>
    </div>
  );
}

/* ── Upload Modal ── */
function UploadModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const status = useResumeStore((s) => s.status);
  const hasData = status === "ready";
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    if (open) window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      {/* Backdrop — no blur over video (GPU killer) */}
      <div className="absolute inset-0" style={{background:"rgba(15,23,42,0.6)"}}/>
      {/* Panel */}
      <div ref={modalRef} className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl p-6 sm:p-10 shadow-2xl" style={{background:"#fff",animation:"modalIn 0.4s cubic-bezier(0.23,1,0.32,1)"}}>
        {/* Close button */}
        <button onClick={onClose} className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full transition-colors hover:bg-neutral-100 focus-visible:outline-2 focus-visible:outline-teal-500" style={{color:"#94a3b8"}} aria-label={t("states.close")}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
        </button>

        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-2" style={{color:"#1e293b"}}>{t("home.modal.title")}</h2>
          <p className="text-sm" style={{color:"#94a3b8"}}>{t("home.modal.subtitle")}</p>
        </div>

        {hasData ? (
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm mb-6" style={{background:"rgba(13,148,136,0.08)",border:"1px solid rgba(13,148,136,0.15)",color:"#0f766e"}}>
              <span className="w-2 h-2 rounded-full animate-pulse" style={{background:"#14b8a6"}}/>
              {t("home.modal.parsed")}
            </div>
            <div className="flex gap-4 justify-center">
              <Link href="/edit" onClick={onClose} className="px-6 py-3 rounded-lg text-white font-medium transition-all hover:-translate-y-0.5 hover:shadow-lg active:scale-95" style={{background:"#1e293b",minHeight:"48px",display:"inline-flex",alignItems:"center"}}>{t("home.modal.editInfo")}</Link>
              <Link href="/preview" onClick={onClose} className="px-6 py-3 rounded-lg font-medium transition-all hover:-translate-y-0.5 active:scale-95" style={{border:"1px solid #cbd5e1",color:"#475569",minHeight:"48px",display:"inline-flex",alignItems:"center"}}>{t("home.modal.preview")}</Link>
            </div>
          </div>
        ) : (
          <FileDropZone />
        )}

        {/* Also show resume list if logged in */}
        <ResumeHistoryList onClose={onClose} />
      </div>
      <style jsx>{`@keyframes modalIn{from{opacity:0;transform:translateY(24px) scale(0.97)}to{opacity:1;transform:translateY(0) scale(1)}}`}</style>
    </div>
  );
}

/* ── Resume History ── */
function ResumeHistoryList({ onClose }: { onClose: () => void }) {
  const user = useResumeStore((s) => s.user);
  const resumeList = useResumeStore((s) => s.resumeList);
  const loadResumeHistory = useResumeStore((s) => s.loadResumeHistory);
  const setData = useResumeStore((s) => s.setData);
  const setAgentId = useResumeStore((s) => s.setAgentId);

  useEffect(() => { if (user) loadResumeHistory(); }, [user, loadResumeHistory]);

  if (!user || resumeList.length === 0) return null;

  return (
    <div className="mt-8 pt-6 border-t" style={{borderColor:"#e2e8f0"}}>
      <p className="text-xs font-medium mb-3" style={{color:"#94a3b8"}}>{t("home.modal.history")}</p>
      <div className="space-y-2 max-h-40 overflow-y-auto">
        {resumeList.map((r) => (
          <button key={r.id} onClick={async () => {
            try {
              const res = await fetch(`/api/resumes/${r.id}`);
              const json = await res.json();
              if (json.resume) { setData(JSON.parse(json.resume.data_json)); setAgentId(json.resume.agent_id); onClose(); }
            } catch {}
          }} className="w-full text-left px-4 py-2.5 rounded-lg text-sm transition-colors hover:bg-neutral-50 flex justify-between items-center"
            style={{color:"#475569"}}>
            <span>{r.name}</span>
            <span className="text-xs" style={{color:"#94a3b8"}}>{new Date(r.updated_at).toLocaleDateString()}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

/* ── Scroll Reveal ── */
function ScrollReveal({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.unobserve(el); } }, { threshold: 0.12 });
    obs.observe(el); return () => obs.disconnect();
  }, []);
  return <div ref={ref} className={`transition-all duration-700 ${visible?"opacity-100 translate-y-0":"opacity-0 translate-y-8"} ${className||""}`}>{children}</div>;
}

const icons = ["📤", "✏️", "🌐"];
const features = (tv("home.features") as { title: string; desc: string }[]).map((f, i) => ({ ...f, icon: icons[i] }));

/* ── Page ── */
export default function HomePage() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <Header transparent />
      <main className="bg-[#faf9f6]">
        <HeroSection onStart={() => setModalOpen(true)} paused={modalOpen} />

        {/* Feature cards */}
        <div className="mx-auto max-w-4xl px-6 pb-24">
          <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6">
            {features.map((f) => (
              <ScrollReveal key={f.title}>
                <div className="group text-center p-8 rounded-2xl border transition-all duration-500 hover:-translate-y-2 hover:shadow-lg cursor-default"
                  style={{background:"rgba(255,255,255,0.7)",borderColor:"rgba(13,148,136,0.1)"}}>
                  <div className="text-3xl mb-5 group-hover:scale-110 transition-transform duration-500">{f.icon}</div>
                  <h3 className="text-base font-semibold mb-2" style={{color:"#1e293b"}}>{f.title}</h3>
                  <p className="text-sm leading-relaxed" style={{color:"#94a3b8"}}>{f.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* Modal */}
        <UploadModal open={modalOpen} onClose={() => setModalOpen(false)} />
      </main>
    </>
  );
}
