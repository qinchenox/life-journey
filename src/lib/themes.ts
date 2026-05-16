export interface ThemeColors {
  accent: string;
  accentHover: string;
  accentLight: string;
  bgPrimary: string;
  bgSecondary: string;
  textPrimary: string;
  textSecondary: string;
  textMuted: string;
  border: string;
  tagBg: string;
  tagText: string;
}

export interface ThemeConfig {
  id: string;
  name: string;
  description: string;
  colors: ThemeColors;
  layout: "centered" | "split";
  fontPairing: "sans" | "serif" | "mono";
  radius: "sharp" | "rounded" | "pill";
  mode: "light" | "dark";
  animation: "subtle" | "bold";
  gradient: string;
  glass: boolean;
}

export const INDUSTRY_THEME_MAP: Record<string, string> = {
  "技术": "cyber",
  "开发": "cyber",
  "软件": "cyber",
  "工程师": "cyber",
  "前端": "cyber",
  "后端": "cyber",
  "全栈": "cyber",
  "程序员": "cyber",
  "IT": "cyber",
  "AI": "cyber",
  "人工智能": "cyber",
  "机器学习": "cyber",
  "数据": "cyber",
  "算法": "cyber",
  "设计": "aurora",
  "UI": "aurora",
  "UX": "aurora",
  "创意": "aurora",
  "视觉": "aurora",
  "品牌": "aurora",
  "艺术": "aurora",
  "金融": "slate",
  "银行": "slate",
  "投资": "slate",
  "管理": "slate",
  "咨询": "slate",
  "商务": "slate",
  "教育": "zen",
  "教师": "zen",
  "教授": "zen",
  "学术": "zen",
  "研究": "zen",
  "媒体": "zen",
  "编辑": "zen",
  "文案": "zen",
  "医疗": "slate",
  "健康": "slate",
};

export const THEMES: Record<string, ThemeConfig> = {
  mono: {
    id: "mono",
    name: "极简黑白",
    description: "克制留白，黑白灰无级过渡，适合注重内容表达的岗位",
    colors: {
      accent: "#1a1a1a",
      accentHover: "#000000",
      accentLight: "#f5f5f5",
      bgPrimary: "#ffffff",
      bgSecondary: "#fafafa",
      textPrimary: "#171717",
      textSecondary: "#525252",
      textMuted: "#a3a3a3",
      border: "#e5e5e5",
      tagBg: "#f5f5f5",
      tagText: "#404040",
    },
    layout: "centered",
    fontPairing: "sans",
    radius: "sharp",
    mode: "light",
    animation: "subtle",
    gradient: "none",
    glass: false,
  },

  cyber: {
    id: "cyber",
    name: "赛博霓虹",
    description: "深色背景 + 青紫霓虹点缀，科技感与未来感并存",
    colors: {
      accent: "#06d6a0",
      accentHover: "#05b88a",
      accentLight: "rgba(6,214,160,0.12)",
      bgPrimary: "#0a0e17",
      bgSecondary: "#111827",
      textPrimary: "#f0f4ff",
      textSecondary: "#94a3b8",
      textMuted: "#475569",
      border: "#1e293b",
      tagBg: "rgba(6,214,160,0.1)",
      tagText: "#06d6a0",
    },
    layout: "split",
    fontPairing: "mono",
    radius: "sharp",
    mode: "dark",
    animation: "bold",
    gradient: "radial-gradient(ellipse 80% 50% at 20% 0%, rgba(6,214,160,0.06) 0%, transparent 60%)",
    glass: true,
  },

  zen: {
    id: "zen",
    name: "禅意东方",
    description: "暖纸底色配墨绿点缀，温润内敛，适合教育/文化领域",
    colors: {
      accent: "#2d6a4f",
      accentHover: "#1b4332",
      accentLight: "#d8f3dc",
      bgPrimary: "#fefcf5",
      bgSecondary: "#f7f3e8",
      textPrimary: "#292524",
      textSecondary: "#57534e",
      textMuted: "#a8a29e",
      border: "#e7e0d8",
      tagBg: "#f0e8d8",
      tagText: "#2d6a4f",
    },
    layout: "centered",
    fontPairing: "serif",
    radius: "rounded",
    mode: "light",
    animation: "subtle",
    gradient: "none",
    glass: false,
  },

  aurora: {
    id: "aurora",
    name: "极光渐变",
    description: "现代 SaaS 风格，柔和渐变 + 玻璃拟态，适合设计/创意岗位",
    colors: {
      accent: "#6366f1",
      accentHover: "#4f46e5",
      accentLight: "#eef2ff",
      bgPrimary: "#ffffff",
      bgSecondary: "#f8fafc",
      textPrimary: "#0f172a",
      textSecondary: "#475569",
      textMuted: "#94a3b8",
      border: "#e2e8f0",
      tagBg: "#eef2ff",
      tagText: "#4338ca",
    },
    layout: "split",
    fontPairing: "sans",
    radius: "pill",
    mode: "light",
    animation: "bold",
    gradient: "linear-gradient(135deg, #f0f4ff 0%, #fdf2f8 50%, #f0fdf4 100%)",
    glass: true,
  },

  slate: {
    id: "slate",
    name: "沉稳商务",
    description: "深海蓝灰调，专业可信赖，适合金融/管理/医疗岗位",
    colors: {
      accent: "#1e40af",
      accentHover: "#1e3a8a",
      accentLight: "#dbeafe",
      bgPrimary: "#ffffff",
      bgSecondary: "#f1f5f9",
      textPrimary: "#0f172a",
      textSecondary: "#475569",
      textMuted: "#94a3b8",
      border: "#e2e8f0",
      tagBg: "#f1f5f9",
      tagText: "#1e40af",
    },
    layout: "centered",
    fontPairing: "sans",
    radius: "rounded",
    mode: "light",
    animation: "subtle",
    gradient: "none",
    glass: false,
  },
};

export const DEFAULT_THEME_ID = "mono";

export function detectTheme(title: string, summary: string, skills: string[]): string {
  const searchText = [title, summary, ...skills].join(" ").toLowerCase();
  let bestMatch = "";
  let bestScore = 0;
  for (const [keyword, themeId] of Object.entries(INDUSTRY_THEME_MAP)) {
    if (searchText.includes(keyword.toLowerCase())) {
      const score = keyword.length;
      if (score > bestScore) {
        bestScore = score;
        bestMatch = themeId;
      }
    }
  }
  return bestMatch || DEFAULT_THEME_ID;
}
