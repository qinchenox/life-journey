import { ResumeData } from "./types";
import { THEMES, DEFAULT_THEME_ID, ThemeConfig } from "./themes";
import { serverT } from "@/i18n/server";

const locale = (process.env.NEXT_PUBLIC_LOCALE || "zh") as "zh" | "en";
const h = (key: string) => serverT(key, locale);

function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function getTheme(data: ResumeData): ThemeConfig {
  return THEMES[data.themeId] || THEMES[DEFAULT_THEME_ID];
}

function themeCSS(t: ThemeConfig): string {
  return `
:root {
  --accent: ${t.colors.accent};
  --accent-hover: ${t.colors.accentHover};
  --accent-light: ${t.colors.accentLight};
  --bg-primary: ${t.colors.bgPrimary};
  --bg-secondary: ${t.colors.bgSecondary};
  --text-primary: ${t.colors.textPrimary};
  --text-secondary: ${t.colors.textSecondary};
  --text-muted: ${t.colors.textMuted};
  --border: ${t.colors.border};
  --tag-bg: ${t.colors.tagBg};
  --tag-text: ${t.colors.tagText};
  --radius: ${t.radius === "pill" ? "9999px" : t.radius === "rounded" ? "0.5rem" : "0.125rem"};
  --gradient: ${t.gradient};
  --glass-bg: ${t.glass ? "rgba(255,255,255,0.6)" : "transparent"};
  --glass-border: ${t.glass ? "rgba(255,255,255,0.2)" : "var(--border)"};
  --glass-blur: ${t.glass ? "12px" : "0px"};
}`;
}

function commonCSS(t: ThemeConfig): string {
  const fontStack =
    t.fontPairing === "mono"
      ? `'JetBrains Mono','SF Mono','Cascadia Code',Consolas,monospace`
      : t.fontPairing === "serif"
        ? `'Noto Serif SC','Source Han Serif SC',Georgia,'Times New Roman',serif`
        : `Inter,-apple-system,BlinkMacSystemFont,'Segoe UI','PingFang SC','Hiragino Sans GB','Microsoft YaHei',sans-serif`;

  // Dark mode overrides
  const darkOverrides =
    t.mode === "dark"
      ? ``
      : `
@media (prefers-color-scheme: dark) {
  :root {
    --bg-primary: #0f172a;
    --bg-secondary: #1e293b;
    --text-primary: #f1f5f9;
    --text-secondary: #94a3b8;
    --text-muted: #64748b;
    --border: #334155;
    --glass-bg: rgba(15,23,42,0.7);
    --glass-border: rgba(255,255,255,0.08);
  }
}`;

  return `
/* Reset & Base */
*,::after,::before{box-sizing:border-box;border:0 solid;margin:0;padding:0}
html{scroll-behavior:smooth;-webkit-text-size-adjust:100%}
body{font-family:${fontStack};background:var(--bg-primary);color:var(--text-primary);line-height:1.6;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;transition:background-color 0.3s,color 0.3s}
${t.gradient !== "none" ? `body::before{content:'';position:fixed;inset:0;background:${t.gradient};z-index:-1}` : ""}
h1,h2,h3,h4,p,ul{margin:0;padding:0}
a{color:inherit;text-decoration:none;transition:color 0.2s}
a:hover{color:var(--accent)}
ul{list-style:none}

/* Layout */
.container{max-width:860px;margin:0 auto;padding:clamp(2rem,6vw,5rem) 1.5rem}
.split-layout{max-width:1100px;margin:0 auto;padding:clamp(2rem,6vw,5rem) 1.5rem;display:grid;grid-template-columns:280px 1fr;gap:clamp(2rem,5vw,4rem);align-items:start}
@media(max-width:768px){.split-layout{grid-template-columns:1fr;gap:2rem}}

/* Sidebar */
.sidebar{position:sticky;top:2rem}
@media(max-width:768px){.sidebar{position:static}}

/* Typography */
.name{font-size:clamp(2rem,5vw,3rem);font-weight:700;letter-spacing:-0.03em;line-height:1.15;margin-bottom:0.25rem}
.title{font-size:clamp(1.1rem,2.5vw,1.35rem);color:var(--text-secondary);margin-bottom:1rem;font-weight:400}
.heading{font-size:clamp(1.3rem,3vw,1.6rem);font-weight:600;letter-spacing:-0.01em;margin-bottom:1.5rem;padding-bottom:0.6rem;border-bottom:2px solid var(--border);display:flex;align-items:center;gap:0.5rem}
.heading-dot{width:6px;height:6px;border-radius:50%;background:var(--accent);flex-shrink:0}

/* Contact */
.contact-row{display:flex;flex-wrap:wrap;gap:0.3rem 1.2rem;font-size:0.9rem;color:var(--text-muted);margin-bottom:2rem}
.contact-row a{color:var(--text-muted)}.contact-row a:hover{color:var(--accent)}
.contact-icon{display:inline-block;width:1em;margin-right:0.3em;opacity:0.6}

/* Tags */
.tag{display:inline-flex;align-items:center;padding:0.3em 0.8em;border-radius:var(--radius);background:var(--tag-bg);color:var(--tag-text);font-size:0.85rem;border:1px solid transparent;transition:all 0.2s}
.tag:hover{transform:translateY(-1px);border-color:var(--accent);box-shadow:0 2px 8px var(--accent-light)}

/* Section */
.section{margin-bottom:3rem}
.section:last-child{margin-bottom:0}

/* About */
.about-text{font-size:clamp(0.95rem,2vw,1.05rem);line-height:1.75;color:var(--text-secondary);white-space:pre-line}

/* Skills Grid */
.skills-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:1.25rem}
.skill-cat-title{font-size:0.8rem;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;color:var(--text-muted);margin-bottom:0.6rem}
.skill-tags{display:flex;flex-wrap:wrap;gap:0.4rem}

/* Timeline — Experience & Education */
.timeline{position:relative;padding-left:2rem}
.timeline::before{content:'';position:absolute;left:0;top:0.3rem;bottom:0.3rem;width:1.5px;background:var(--border);border-radius:1px}
.timeline-item{position:relative;margin-bottom:2.2rem}
.timeline-item:last-child{margin-bottom:0}
.timeline-item::before{content:'';position:absolute;left:-2rem;top:0.5rem;width:8px;height:8px;border-radius:50%;background:var(--accent);border:2px solid var(--bg-primary);box-shadow:0 0 0 2px var(--accent);z-index:1}
.tl-header{display:flex;justify-content:space-between;align-items:baseline;flex-wrap:wrap;gap:0.3rem 1rem;margin-bottom:0.2rem}
.tl-position{font-size:1.05rem;font-weight:600;color:var(--text-primary)}
.tl-org{font-weight:400;color:var(--text-muted)}
.tl-date{font-size:0.85rem;color:var(--text-muted);white-space:nowrap}
.tl-summary{font-size:0.9rem;color:var(--text-secondary);margin-bottom:0.5rem;line-height:1.6}
.tl-highlights{font-size:0.9rem;color:var(--text-secondary);line-height:1.6}
.tl-highlights li{position:relative;padding-left:1.2em;margin-bottom:0.3em}
.tl-highlights li::before{content:'▸';position:absolute;left:0;color:var(--accent);font-size:0.7em;top:0.3em}

/* Projects */
.projects-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(320px,1fr));gap:1.25rem}
.project-card{padding:1.5rem;border-radius:0.75rem;background:var(--bg-secondary);border:1px solid var(--border);transition:all 0.25s}
.project-card:hover{transform:translateY(-2px);box-shadow:0 8px 25px rgba(0,0,0,0.06);border-color:var(--accent)}
.project-name{font-size:1.05rem;font-weight:600;color:var(--text-primary);margin-bottom:0.4rem;display:flex;align-items:center;gap:0.4rem}
.project-link{font-size:0.8rem;color:var(--text-muted);opacity:0.7;transition:opacity 0.2s}
.project-link:hover{opacity:1}
.project-desc{font-size:0.88rem;color:var(--text-secondary);line-height:1.6;margin-bottom:0.6rem}
.project-desc + .tl-highlights{margin-top:0.4rem}

/* Footer */
.footer{margin-top:4rem;padding-top:1.5rem;border-top:1px solid var(--border);text-align:center;font-size:0.8rem;color:var(--text-muted)}

/* Animations */
@keyframes fadeInUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}
@keyframes fadeIn{from{opacity:0}to{opacity:1}}
.anim-in{opacity:0;animation:fadeInUp 0.6s cubic-bezier(0.22,1,0.36,1) forwards}
.anim-in:nth-child(1){animation-delay:0.1s}
.anim-in:nth-child(2){animation-delay:0.2s}
.anim-in:nth-child(3){animation-delay:0.3s}
.anim-in:nth-child(4){animation-delay:0.4s}
.anim-in:nth-child(5){animation-delay:0.5s}
.anim-in:nth-child(6){animation-delay:0.6s}
.anim-in:nth-child(7){animation-delay:0.7s}
.anim-in:nth-child(8){animation-delay:0.8s}
.anim-visible{opacity:1;animation:fadeInUp 0.6s cubic-bezier(0.22,1,0.36,1) forwards}

@media(prefers-reduced-motion:reduce){
  .anim-in{opacity:1;animation:none}
}

/* Print */
@media print{
  body{font-size:11pt;color:#000;background:#fff}
  .timeline::before{background:#ccc}
  .project-card{box-shadow:none;border:1px solid #ddd;break-inside:avoid}
  .container,.split-layout{max-width:100%;padding:0}
  .sidebar{position:static}
  .footer{margin-top:2rem}
  .anim-in{opacity:1;animation:none}
}

/* Glass morphism */
${t.glass ? `
.glass{background:var(--glass-bg);backdrop-filter:blur(var(--glass-blur));-webkit-backdrop-filter:blur(var(--glass-blur));border:1px solid var(--glass-border);border-radius:0.75rem}
` : ""}
${darkOverrides}
`;
}

function renderBody(data: ResumeData): string {
  const t = getTheme(data);
  const { basics, skills, experience, education, projects, languages, certifications } = data;

  const contactItems = [
    basics.email ? `<a href="mailto:${esc(basics.email)}">${esc(basics.email)}</a>` : null,
    basics.phone ? `<span>${esc(basics.phone)}</span>` : null,
    basics.location ? `<span>${esc(basics.location)}</span>` : null,
    basics.website ? `<a href="${esc(basics.website)}" target="_blank" rel="noopener">${esc(basics.website.replace(/^https?:\/\//, ""))}</a>` : null,
  ].filter(Boolean);

  const contactHTML = contactItems.length > 0
    ? `<div class="contact-row">${contactItems.join("")}</div>`
    : "";

  const s = (title: string, icon: string, content: string) => `
  <section class="section anim-in">
    <h2 class="heading"><span class="heading-dot"></span>${esc(title)}</h2>
    ${content}
  </section>`;

  // Skills
  const skillsHTML = skills.length > 0 ? s(h("html.skills"), "⚡", `
  <div class="skills-grid">
    ${skills.map((cat) => `
    <div>
      <div class="skill-cat-title">${esc(cat.category)}</div>
      <div class="skill-tags">
        ${cat.items.map((item) => `<span class="tag">${esc(item)}</span>`).join("")}
      </div>
    </div>`).join("")}
  </div>`) : "";

  // Experience with timeline
  const experienceHTML = experience.length > 0 ? s(h("html.experience"), "💼", `
  <div class="timeline">
    ${experience.map((exp) => `
    <div class="timeline-item">
      <div class="tl-header">
        <span class="tl-position">${esc(exp.position)} <span class="tl-org">@ ${esc(exp.company)}</span></span>
        <span class="tl-date">${esc(exp.startDate)} — ${esc(exp.endDate)}</span>
      </div>
      ${exp.summary ? `<p class="tl-summary">${esc(exp.summary)}</p>` : ""}
      ${exp.highlights.length > 0 ? `<ul class="tl-highlights">${exp.highlights.map((h) => `<li>${esc(h)}</li>`).join("")}</ul>` : ""}
    </div>`).join("")}
  </div>`) : "";

  // Education with timeline
  const educationHTML = education.length > 0 ? s(h("html.education"), "🎓", `
  <div class="timeline" style="margin-top:0">
    ${education.map((edu) => `
    <div class="timeline-item">
      <div class="tl-header">
        <span class="tl-position">${esc(edu.institution)}</span>
        <span class="tl-date">${esc(edu.startDate)} — ${esc(edu.endDate)}</span>
      </div>
      <p class="tl-summary">${esc(edu.degree)}${edu.field ? ` · ${esc(edu.field)}` : ""}</p>
    </div>`).join("")}
  </div>`) : "";

  // Projects as cards
  const projectsHTML = projects.length > 0 ? s(h("html.projects"), "🚀", `
  <div class="projects-grid">
    ${projects.map((proj) => `
    <div class="project-card">
      <div class="project-name">
        ${esc(proj.name)}
        ${proj.url ? `<a href="${esc(proj.url)}" target="_blank" rel="noopener" class="project-link">↗</a>` : ""}
      </div>
      ${proj.description ? `<p class="project-desc">${esc(proj.description)}</p>` : ""}
      ${proj.highlights.length > 0 ? `<ul class="tl-highlights">${proj.highlights.map((h) => `<li>${esc(h)}</li>`).join("")}</ul>` : ""}
    </div>`).join("")}
  </div>`) : "";

  // Languages
  const languagesHTML = languages && languages.length > 0 ? s(h("html.languages"), "🌐", `
  <div class="skills-grid">
    ${languages.map((lang) => `
    <div>
      <span class="tag">${esc(lang.language)} — ${esc(lang.proficiency)}</span>
    </div>`).join("")}
  </div>`) : "";

  // Certifications
  const certsHTML = certifications && certifications.length > 0 ? s(h("html.certifications"), "📜", `
  <div class="skills-grid">
    ${certifications.map((cert) => `
    <div>
      <div style="font-weight:600;font-size:0.95rem;color:var(--text-primary)">${esc(cert.name)}</div>
      <div style="font-size:0.85rem;color:var(--text-muted)">${esc(cert.issuer)}${cert.date ? ` · ${esc(cert.date)}` : ""}</div>
    </div>`).join("")}
  </div>`) : "";

  // About
  const aboutHTML = basics.summary ? s(h("html.about"), "✨", `<p class="about-text">${esc(basics.summary)}</p>`) : "";

  const isSplit = t.layout === "split";

  // Sidebar for split layout
  const aboutSidebar = basics.summary && isSplit
    ? `<div class="section anim-in" style="animation-delay:0.15s"><h2 class="heading"><span class="heading-dot"></span>${h("html.about")}</h2><p class="about-text" style="font-size:0.9rem">${esc(basics.summary)}</p></div>`
    : "";

  const skillsSidebarHTML = isSplit && skills.length > 0
    ? `<div class="section anim-in" style="animation-delay:0.3s">${skillsHTML.replace('class="section anim-in"', '').replace(/^\s+|\s+$/g, '')}</div>`
    : "";

  const languagesSidebarHTML = isSplit && languages && languages.length > 0
    ? `<div class="section anim-in" style="animation-delay:0.35s">${languagesHTML.replace('class="section anim-in"', '').replace(/^\s+|\s+$/g, '')}</div>`
    : "";

  if (isSplit) {
    return `
    <div class="split-layout">
      <aside class="sidebar">
        <div class="anim-in" style="animation-delay:0.05s">
          <h1 class="name">${esc(basics.name || h("edit.form.name"))}</h1>
          <p class="title">${esc(basics.title)}</p>
          ${contactHTML}
        </div>
        ${aboutSidebar}
        ${skillsSidebarHTML}
        ${languagesSidebarHTML}
        ${isSplit ? certsHTML.replace('class="section anim-in"', 'class="section anim-in" style="animation-delay:0.4s"') : ""}
      </aside>
      <main>
        ${isSplit ? "" : aboutHTML}
        ${experienceHTML}
        ${educationHTML}
        ${isSplit ? "" : skillsHTML}
        ${projectsHTML}
        ${isSplit ? "" : languagesHTML}
        ${isSplit ? "" : certsHTML}
        <footer class="footer anim-in" style="animation-delay:0.8s">${h("html.generatedBy")} · ${esc(t.name)}Theme</footer>
      </main>
    </div>`;
  }

  return `
  <div class="container">
    <header class="anim-in" style="animation-delay:0.05s">
      <h1 class="name">${esc(basics.name || h("edit.form.name"))}</h1>
      <p class="title">${esc(basics.title)}</p>
      ${contactHTML}
    </header>
    ${aboutHTML}
    ${experienceHTML}
    ${educationHTML}
    ${skillsHTML}
    ${projectsHTML}
    ${languagesHTML}
    ${certsHTML}
    <footer class="footer anim-in" style="animation-delay:0.8s">${h("html.generatedBy")} · ${esc(t.name)}Theme</footer>
  </div>`;
}

export function generatePortfolioHTML(data: ResumeData): string {
  const t = getTheme(data);
  const body = renderBody(data);
  const fullName = esc(data.basics.name || h("edit.form.name"));
  const description = esc(data.basics.summary || data.basics.title || h("edit.form.summary"));
  const titleText = esc(data.basics.title || "");

  return `<!DOCTYPE html>
<html lang="${locale === 'en' ? 'en' : 'zh-CN'}"
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1.0">
  <title>${fullName} — ${titleText}</title>
  <meta name="description" content="${description}">
  <meta property="og:title" content="${fullName}">
  <meta property="og:description" content="${description}">
  <meta property="og:type" content="website">
  <style>
    ${themeCSS(t)}
    ${commonCSS(t)}
  </style>
</head>
<body>
  ${body}
  <script>
    (function(){
      var obs=new IntersectionObserver(function(entries){
        entries.forEach(function(e){
          if(e.isIntersecting){
            e.target.classList.add('anim-visible');
            obs.unobserve(e.target);
          }
        });
      },{threshold:0.1});
      document.querySelectorAll('.anim-in').forEach(function(el){obs.observe(el);});
    })();
  </script>
</body>
</html>`;
}

export function generatePreviewHTML(data: ResumeData): string {
  const t = getTheme(data);
  const body = renderBody(data);

  return `<!DOCTYPE html>
<html lang="${locale === 'en' ? 'en' : 'zh-CN'}"
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1.0">
  <style>
    ${themeCSS(t)}
    ${commonCSS(t)}
  </style>
</head>
<body>
  ${body}
  <script>
    (function(){
      var obs=new IntersectionObserver(function(entries){
        entries.forEach(function(e){
          if(e.isIntersecting){
            e.target.classList.add('anim-visible');
            obs.unobserve(e.target);
          }
        });
      },{threshold:0.1});
      document.querySelectorAll('.anim-in').forEach(function(el){obs.observe(el);});
    })();
  </script>
</body>
</html>`;
}
