"use client";

import { useRef, useState, useCallback } from "react";
import { useResumeStore } from "@/store/resume-store";

export function PortfolioPreview() {
  const data = useResumeStore((s) => s.data);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [copyText, setCopyText] = useState("复制 HTML");
  const [downloading, setDownloading] = useState(false);

  const downloadHTML = useCallback(async () => {
    setDownloading(true);
    try {
      const res = await fetch("/api/generate-html", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        alert("生成失败，请重试。");
        setDownloading(false);
        return;
      }
      const html = await res.text();
      const blob = new Blob([html], { type: "text/html;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${data.basics.name || "个人主页"}-个人主页.html`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch {
      alert("下载失败，请检查网络连接。");
    }
    setDownloading(false);
  }, [data]);

  const copyHTML = useCallback(async () => {
    try {
      const res = await fetch("/api/generate-html", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        alert("生成失败，请重试。");
        return;
      }
      const html = await res.text();
      await navigator.clipboard.writeText(html);
      setCopyText("已复制！");
      setTimeout(() => setCopyText("复制 HTML"), 2000);
    } catch {
      alert("复制失败。");
    }
  }, [data]);

  // Build preview HTML client-side
  const previewHTML = buildPreviewHTML(data);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-neutral-800">预览与发布</h2>
        <div className="flex gap-3">
          <button
            onClick={copyHTML}
            className="px-4 py-2 text-sm font-medium text-neutral-600 bg-neutral-100 rounded-lg hover:bg-neutral-200 transition-colors"
          >
            {copyText}
          </button>
          <button
            onClick={downloadHTML}
            disabled={downloading}
            className="px-4 py-2 text-sm font-medium text-white bg-accent rounded-lg hover:bg-accent/90 disabled:opacity-50 transition-colors"
          >
            {downloading ? "生成中..." : "下载 HTML"}
          </button>
        </div>
      </div>

      <div className="border border-neutral-200 rounded-xl overflow-hidden bg-white shadow-sm">
        <iframe
          ref={iframeRef}
          srcDoc={previewHTML}
          className="w-full h-[80vh] border-0"
          title="个人主页预览"
        />
      </div>
    </div>
  );
}

function buildPreviewHTML(data: import("@/lib/types").ResumeData): string {
  const { basics, skills, experience, education, projects } = data;

  const contactItems = [basics.email, basics.phone, basics.location, basics.website]
    .filter(Boolean)
    .map((item) => {
      if (item === basics.email && item) return `<a href="mailto:${esc(item)}" style="color:#a3a3a3;text-decoration:none">${esc(item)}</a>`;
      if (item === basics.website && item) return `<a href="${esc(item)}" target="_blank" style="color:#a3a3a3;text-decoration:none">${esc(item.replace(/^https?:\/\//, ""))}</a>`;
      return `<span style="color:#a3a3a3">${esc(item || "")}</span>`;
    })
    .join("");

  const skillsHTML = skills.map((cat) => `
    <div style="margin-bottom:16px">
      <h3 style="font-size:14px;font-weight:500;color:#737373;margin-bottom:8px">${esc(cat.category)}</h3>
      <div style="display:flex;flex-wrap:wrap;gap:8px">
        ${cat.items.map((item) => `<span style="display:inline-block;border-radius:9999px;padding:4px 12px;background:#f5f5f5;color:#404040;font-size:14px">${esc(item)}</span>`).join("")}
      </div>
    </div>
  `).join("");

  const experienceHTML = experience.map((exp) => `
    <div style="margin-bottom:40px">
      <div style="display:flex;justify-content:space-between;align-items:baseline;flex-wrap:wrap;margin-bottom:4px">
        <h3 style="font-size:18px;font-weight:600;color:#262626">${esc(exp.position)} <span style="color:#a3a3a3;font-weight:400">@ ${esc(exp.company)}</span></h3>
        <span style="font-size:14px;color:#a3a3a3">${esc(exp.startDate)} — ${esc(exp.endDate)}</span>
      </div>
      ${exp.summary ? `<p style="font-size:14px;color:#737373;margin-bottom:8px">${esc(exp.summary)}</p>` : ""}
      ${exp.highlights.length > 0 ? `<ul style="list-style:disc;padding-left:18px;font-size:14px;color:#525252;margin:0">${exp.highlights.map((h) => `<li style="margin-bottom:4px">${esc(h)}</li>`).join("")}</ul>` : ""}
    </div>
  `).join("");

  const educationHTML = education.map((edu) => `
    <div style="display:flex;justify-content:space-between;flex-wrap:wrap;margin-bottom:24px">
      <div>
        <h3 style="font-size:18px;font-weight:600;color:#262626">${esc(edu.institution)}</h3>
        <p style="font-size:14px;color:#737373">${esc(edu.degree)}${edu.field ? ` · ${esc(edu.field)}` : ""}</p>
      </div>
      <span style="font-size:14px;color:#a3a3a3">${esc(edu.startDate)} — ${esc(edu.endDate)}</span>
    </div>
  `).join("");

  const projectsHTML = projects.map((proj) => `
    <div style="margin-bottom:32px">
      <h3 style="font-size:18px;font-weight:600;color:#262626">
        ${esc(proj.name)}
        ${proj.url ? `<a href="${esc(proj.url)}" target="_blank" style="font-size:14px;color:#a3a3a3;text-decoration:none;margin-left:6px">↗</a>` : ""}
      </h3>
      ${proj.description ? `<p style="font-size:14px;color:#737373;margin-top:4px">${esc(proj.description)}</p>` : ""}
      ${proj.highlights.length > 0 ? `<ul style="list-style:disc;padding-left:18px;font-size:14px;color:#525252;margin-top:8px;margin-bottom:0">${proj.highlights.map((h) => `<li style="margin-bottom:4px">${esc(h)}</li>`).join("")}</ul>` : ""}
    </div>
  `).join("");

  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0">
<style>
body{font-family:Inter,-apple-system,BlinkMacSystemFont,'Segoe UI','PingFang SC','Hiragino Sans GB','Microsoft YaHei',sans-serif;margin:0;padding:0;background:#fafafa;color:#0a0a0a;line-height:1.5;-webkit-font-smoothing:antialiased}
main{max-width:720px;margin:0 auto;padding:96px 24px}
h1{font-size:36px;font-weight:700;letter-spacing:-0.025em;color:#171717;margin:0 0 12px}
h2{font-size:24px;font-weight:600;color:#171717;margin:0 0 24px;padding-bottom:8px;border-bottom:1px solid #e5e5e5}
a{color:inherit;text-decoration:none}
</style>
</head>
<body>
<main>
<header style="margin-bottom:64px">
<h1>${esc(basics.name || "姓名")}</h1>
<p style="font-size:20px;color:#737373;margin:0 0 16px">${esc(basics.title)}</p>
<div style="display:flex;flex-wrap:wrap;column-gap:24px;row-gap:4px;font-size:14px">${contactItems}</div>
</header>
${basics.summary ? `<section style="margin-bottom:64px"><h2>关于</h2><p style="font-size:16px;line-height:1.625;color:#525252;white-space:pre-line">${esc(basics.summary)}</p></section>` : ""}
${experience.length > 0 ? `<section style="margin-bottom:64px"><h2>工作经历</h2>${experienceHTML}</section>` : ""}
${education.length > 0 ? `<section style="margin-bottom:64px"><h2>教育</h2>${educationHTML}</section>` : ""}
${skills.length > 0 ? `<section style="margin-bottom:64px"><h2>技能</h2>${skillsHTML}</section>` : ""}
${projects.length > 0 ? `<section style="margin-bottom:64px"><h2>项目</h2>${projectsHTML}</section>` : ""}
<footer style="margin-top:96px;padding-top:32px;border-top:1px solid #e5e5e5;text-align:center;font-size:14px;color:#a3a3a3">Made with 个人简史</footer>
</main>
</body>
</html>`;
}

function esc(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
