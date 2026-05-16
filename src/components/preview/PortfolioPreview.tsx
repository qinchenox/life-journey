"use client";

import { useState, useCallback, useRef } from "react";
import { useResumeStore } from "@/store/resume-store";
import { generatePreviewHTML } from "@/lib/html-generator";

export function PortfolioPreview() {
  const data = useResumeStore((s) => s.data);
  const [copyText, setCopyText] = useState("复制 HTML");
  const [downloading, setDownloading] = useState(false);
  const [deploying, setDeploying] = useState(false);
  const [deployUrl, setDeployUrl] = useState<string | null>(null);
  const [deployError, setDeployError] = useState<string | null>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const previewHTML = generatePreviewHTML(data);

  const openInNewTab = useCallback(() => {
    const blob = new Blob([previewHTML], { type: "text/html;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const win = window.open(url, "_blank");
    if (win) {
      win.addEventListener("beforeunload", () => URL.revokeObjectURL(url));
    } else {
      // Fallback: revoke after timeout if popup blocked
      setTimeout(() => URL.revokeObjectURL(url), 60000);
    }
  }, [previewHTML]);

  const downloadHTML = useCallback(async () => {
    setDownloading(true);
    try {
      const res = await fetch("/api/generate-html", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) { alert("生成失败，请重试。"); setDownloading(false); return; }
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
      // Auto-open after download
      const blob2 = new Blob([html], { type: "text/html;charset=utf-8" });
      const viewUrl = URL.createObjectURL(blob2);
      window.open(viewUrl, "_blank");
    } catch { alert("下载失败，请检查网络连接。"); }
    setDownloading(false);
  }, [data]);

  const copyHTML = useCallback(async () => {
    try {
      const res = await fetch("/api/generate-html", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) { alert("生成失败，请重试。"); return; }
      const html = await res.text();
      await navigator.clipboard.writeText(html);
      setCopyText("已复制！");
      setTimeout(() => setCopyText("复制 HTML"), 2000);
    } catch { alert("复制失败。"); }
  }, [data]);

  const deploy = useCallback(async () => {
    setDeploying(true);
    setDeployError(null);
    setDeployUrl(null);
    try {
      const res = await fetch("/api/deploy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok || !json.success) {
        setDeployError(json.error || "部署失败");
        setDeploying(false);
        return;
      }
      setDeployUrl(json.url);
      // Auto-open deployed URL
      window.open(json.url, "_blank");
    } catch { setDeployError("网络错误，部署失败。"); }
    setDeploying(false);
  }, [data]);

  const qrCodeUrl = deployUrl
    ? `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(deployUrl)}`
    : "";

  return (
    <div>
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <h2 className="text-xl font-bold text-neutral-800">预览与发布</h2>
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={openInNewTab}
            className="px-4 py-2 text-sm font-medium text-white bg-neutral-800 rounded-lg hover:bg-neutral-700 transition-colors"
          >
            🔗 新窗口预览
          </button>
          <button
            onClick={copyHTML}
            className="px-4 py-2 text-sm font-medium text-neutral-600 bg-neutral-100 rounded-lg hover:bg-neutral-200 transition-colors"
          >
            {copyText}
          </button>
          <button
            onClick={downloadHTML}
            disabled={downloading}
            className="px-4 py-2 text-sm font-medium text-white rounded-lg hover:opacity-90 disabled:opacity-50 transition-colors"
            style={{ background: "var(--color-accent, #5b5fe1)" }}
          >
            {downloading ? "生成中..." : "下载 HTML"}
          </button>
          <button
            onClick={deploy}
            disabled={deploying}
            className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 disabled:opacity-50 transition-colors"
          >
            {deploying ? "部署中..." : "发布上线"}
          </button>
        </div>
      </div>

      {deployUrl && (
        <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-sm text-green-700 mb-3">发布成功！任何人都可通过以下链接访问你的个人主页：</p>
          <div className="flex gap-4 items-start flex-wrap">
            <div className="flex-1 min-w-0 space-y-2">
              <div className="flex gap-2 items-center">
                <input
                  readOnly
                  value={deployUrl}
                  className="flex-1 px-3 py-1.5 text-sm border border-green-200 rounded bg-white text-green-800"
                  onClick={(e) => (e.target as HTMLInputElement).select()}
                />
                <button
                  onClick={() => { navigator.clipboard.writeText(deployUrl); }}
                  className="px-3 py-1.5 text-sm bg-green-600 text-white rounded hover:bg-green-700 whitespace-nowrap"
                >
                  复制
                </button>
                <a
                  href={deployUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 text-sm bg-neutral-800 text-white rounded hover:bg-neutral-700 whitespace-nowrap"
                >
                  打开 ↗
                </a>
              </div>
            </div>
            <div className="flex-shrink-0 bg-white p-2 rounded border border-neutral-200">
              <img src={qrCodeUrl} alt="扫码访问" width={100} height={100} />
              <p className="text-xs text-neutral-400 text-center mt-1">扫码浏览</p>
            </div>
          </div>
        </div>
      )}
      {deployError && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">{deployError}</div>
      )}

      <div className="border border-neutral-200 rounded-xl overflow-hidden bg-white shadow-sm">
        <iframe ref={iframeRef} srcDoc={previewHTML} className="w-full h-[80vh] border-0" title="个人主页预览" />
      </div>
    </div>
  );
}
