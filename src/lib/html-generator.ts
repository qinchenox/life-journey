import "server-only";
import { ResumeData } from "./types";
import { TEMPLATE_CSS } from "./template-css";

function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function renderPortfolioHTML(data: ResumeData): string {
  const { basics, skills, experience, education, projects } = data;

  const contactItems = [
    basics.email,
    basics.phone,
    basics.location,
    basics.website,
  ]
    .filter(Boolean)
    .map((item) => {
      if (item === basics.email && item)
        return `<a href="mailto:${esc(item)}" class="hover:text-accent transition-colors">${esc(item)}</a>`;
      if (item === basics.website && item)
        return `<a href="${esc(item)}" target="_blank" rel="noopener noreferrer" class="hover:text-accent transition-colors">${esc(item.replace(/^https?:\/\//, ""))}</a>`;
      return `<span>${esc(item || "")}</span>`;
    })
    .join("");

  const skillsHTML =
    skills.length > 0
      ? `<section class="mb-16">
  <h2 class="text-2xl font-semibold text-neutral-900 mb-6 pb-2 border-b border-neutral-200">技能</h2>
  <div class="space-y-4">
    ${skills
      .map(
        (cat) => `
    <div>
      <h3 class="text-sm font-medium text-neutral-500 mb-2">${esc(cat.category)}</h3>
      <div class="flex flex-wrap gap-2">
        ${cat.items
          .map(
            (item) =>
              `<span class="inline-block rounded-full px-3 py-1 bg-neutral-100 text-neutral-700 text-sm">${esc(item)}</span>`
          )
          .join("")}
      </div>
    </div>`
      )
      .join("")}
  </div>
</section>`
      : "";

  const experienceHTML =
    experience.length > 0
      ? `<section class="mb-16">
  <h2 class="text-2xl font-semibold text-neutral-900 mb-6 pb-2 border-b border-neutral-200">工作经历</h2>
  <div class="space-y-10">
    ${experience
      .map(
        (exp) => `
    <div>
      <div class="flex justify-between items-baseline flex-wrap gap-x-4 mb-1">
        <h3 class="text-lg font-semibold text-neutral-800">${esc(exp.position)} <span class="text-neutral-400 font-normal">@ ${esc(exp.company)}</span></h3>
        <span class="text-sm text-neutral-400 whitespace-nowrap">${esc(exp.startDate)} — ${esc(exp.endDate)}</span>
      </div>
      ${exp.summary ? `<p class="text-sm text-neutral-500 mb-2">${esc(exp.summary)}</p>` : ""}
      ${exp.highlights.length > 0 ? `<ul class="list-disc list-inside text-sm text-neutral-600 space-y-1">${exp.highlights.map((h) => `<li>${esc(h)}</li>`).join("")}</ul>` : ""}
    </div>`
      )
      .join("")}
  </div>
</section>`
      : "";

  const educationHTML =
    education.length > 0
      ? `<section class="mb-16">
  <h2 class="text-2xl font-semibold text-neutral-900 mb-6 pb-2 border-b border-neutral-200">教育</h2>
  <div class="space-y-6">
    ${education
      .map(
        (edu) => `
    <div class="flex justify-between flex-wrap gap-x-4">
      <div>
        <h3 class="text-lg font-semibold text-neutral-800">${esc(edu.institution)}</h3>
        <p class="text-sm text-neutral-500">${esc(edu.degree)}${edu.field ? ` · ${esc(edu.field)}` : ""}</p>
      </div>
      <span class="text-sm text-neutral-400 whitespace-nowrap">${esc(edu.startDate)} — ${esc(edu.endDate)}</span>
    </div>`
      )
      .join("")}
  </div>
</section>`
      : "";

  const projectsHTML =
    projects.length > 0
      ? `<section class="mb-16">
  <h2 class="text-2xl font-semibold text-neutral-900 mb-6 pb-2 border-b border-neutral-200">项目</h2>
  <div class="space-y-8">
    ${projects
      .map(
        (proj) => `
    <div>
      <h3 class="text-lg font-semibold text-neutral-800">
        ${esc(proj.name)}
        ${proj.url ? `<a href="${esc(proj.url)}" target="_blank" rel="noopener noreferrer" class="ml-2 text-sm font-normal text-neutral-400 hover:text-accent transition-colors">↗</a>` : ""}
      </h3>
      ${proj.description ? `<p class="text-sm text-neutral-500 mt-1">${esc(proj.description)}</p>` : ""}
      ${proj.highlights.length > 0 ? `<ul class="list-disc list-inside text-sm text-neutral-600 mt-2 space-y-1">${proj.highlights.map((h) => `<li>${esc(h)}</li>`).join("")}</ul>` : ""}
    </div>`
      )
      .join("")}
  </div>
</section>`
      : "";

  const aboutHTML = basics.summary
    ? `<section class="mb-16">
  <h2 class="text-2xl font-semibold text-neutral-900 mb-4 pb-2 border-b border-neutral-200">关于</h2>
  <p class="text-base leading-relaxed text-neutral-600 whitespace-pre-line">${esc(basics.summary)}</p>
</section>`
    : "";

  return `<main class="mx-auto max-w-[720px] px-6 py-16 sm:py-24">
<header class="mb-16">
  <h1 class="text-4xl font-bold tracking-tight text-neutral-900 mb-3">${esc(basics.name || "姓名")}</h1>
  <p class="text-xl text-neutral-500 mb-4">${esc(basics.title)}</p>
  ${contactItems ? `<div class="flex flex-wrap gap-x-6 gap-y-1 text-sm text-neutral-400">${contactItems}</div>` : ""}
</header>
${aboutHTML}
${experienceHTML}
${educationHTML}
${skillsHTML}
${projectsHTML}
<footer class="mt-24 pt-8 border-t border-neutral-200 text-center text-sm text-neutral-400">Made with 个人简史</footer>
</main>`;
}

export function generatePortfolioHTML(data: ResumeData): string {
  const bodyHTML = renderPortfolioHTML(data);
  const fullName = esc(data.basics.name || "个人主页");
  const description = esc(
    data.basics.summary || data.basics.title || "个人介绍"
  );
  const title = esc(data.basics.title || "");

  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${fullName} — ${title}</title>
  <meta name="description" content="${description}">
  <meta property="og:title" content="${fullName}">
  <meta property="og:description" content="${description}">
  <meta property="og:type" content="website">
  <style>${TEMPLATE_CSS}</style>
</head>
<body style="font-family:Inter,-apple-system,BlinkMacSystemFont,'Segoe UI','PingFang SC','Hiragino Sans GB','Microsoft YaHei',sans-serif;margin:0;padding:0;background:#fafafa;color:#0a0a0a">
  ${bodyHTML}
</body>
</html>`;
}

export function generatePreviewHTML(data: ResumeData): string {
  const bodyHTML = renderPortfolioHTML(data);

  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>${TEMPLATE_CSS}</style>
</head>
<body style="font-family:Inter,-apple-system,BlinkMacSystemFont,'Segoe UI','PingFang SC','Hiragino Sans GB','Microsoft YaHei',sans-serif;margin:0;padding:0;background:#fafafa;color:#0a0a0a">
  ${bodyHTML}
</body>
</html>`;
}
