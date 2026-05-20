# 人生旅途 · Life Journey

> AI 驱动的个人品牌网站生成器 — 上传简历，智能润色，一键生成现代个人主页。

[![Version](https://img.shields.io/badge/version-v2.2-teal)](https://github.com/qinchenox/life-journey)
[![License](https://img.shields.io/badge/license-MIT-green)](./LICENSE)

---

## 功能

### 核心流程
- **视频品牌首页** — 森林路径视频背景，视差交互，打字机轮播，暗色渐变叠加层
- **中英双语** — 全站 i18n 国际化，Header 一键切换，cookie 持久化语言偏好
- **上传即解析** — 拖拽 PDF/DOCX，5 种 AI Agent 风格提取并润色结构化信息
- **补充资料** — 编辑页侧栏上传项目文档/证书，AI 智能合并至简历
- **自由编辑** — 校对修正 AI 结果，增删调整全部模块
- **一键发布** — 生成自包含 HTML，部署后生成二维码，扫码即可分享

### AI 智能体系统
5 个专属 Agent：**技术极客** · **创意大师** · **商务精英** · **学术严谨** · **通用全能**

每个 Agent 拥有独立优化原则与输出偏好，中英文 Prompt 跟随语言切换。

### 项目成果生成
AI 自动生成 4 类专业报告（中英双语）：
- **项目案例** — STAR 格式（背景-任务-行动-成果），含量化数据
- **行业简报** — 行业/赛道分析，市场概况与技术趋势
- **工作白皮书** — 专业文档（摘要-方法论-关键发现-发展建议）
- **求职材料** — 求职信、演讲稿、LinkedIn 摘要

### 安全加固（V2.1）
- PayJS 支付回调签名校验，防伪造升级
- API 路由 JWT 认证，防越权读取
- JWT_SECRET 启动时默认值检查告警
- 空 catch 块替换为 console.error

### SEO + 加载体验
- Open Graph / Twitter Card 元标签（动态多语言）
- sitemap.xml / robots.txt 自动生成
- loading / error / not-found 状态页
- API Cache-Control 头

### 移动端适配
- 编辑页补充资料侧栏：移动端滑入面板
- Hero 视差效果 touchmove 支持
- 预览 Tab 栏滚动渐隐指示 + 触控优化

### 设计特性
- 柔和淡青色配色，暖白基调
- 时间线式工作经历，项目卡片网格
- 暗色模式自适应、打印样式
- 入场动画、滚动渐显、玻璃拟态
- 减少动画偏好自动降级

### 登录与存储
- 邮箱注册登录，SQLite 持久化
- 简历历史自动保存，切换设备可恢复

---

## 技术栈

| 类别 | 技术 |
|------|------|
| 框架 | Next.js 15 · React 19 |
| 语言 | TypeScript |
| 样式 | Tailwind CSS 4 |
| 状态 | Zustand |
| 数据库 | SQLite (better-sqlite3) |
| 认证 | JWT (jose) + bcryptjs |
| AI | Anthropic SDK / OpenAI 兼容 |
| 国际化 | 自建 i18n 引擎（cookie + middleware） |
| 支付 | PayJS 微信支付 |

---

## 快速开始

```bash
npm install
cp .env.local.example .env.local  # 填入配置
npm run dev                        # http://localhost:3000
```

环境变量：

| 变量 | 说明 | 默认值 |
|------|------|--------|
| `ANTHROPIC_API_KEY` | AI API Key | — |
| `LLM_BASE_URL` | LLM API 地址 | — |
| `LLM_MODEL` | 模型名称 | `qwen-plus` |
| `JWT_SECRET` | JWT 签名密钥 | 随机生成（生产必改） |
| `NEXT_PUBLIC_LOCALE` | 默认语言 | `zh` |
| `NEXT_PUBLIC_BASE_URL` | 部署域名 | `http://localhost:3000` |

---

## 使用流程

1. 首页选择 AI 风格 → 点击「开始创建」
2. 拖拽 PDF/DOCX → AI 解析润色 → 自动进入编辑页
3. 右侧边栏上传补充材料，AI 实时合并
4. 预览页切换 Tab 查看效果，生成专业报告
5. 下载 HTML 或一键发布，扫码分享

---

## 项目结构

```
src/
├── app/                       # Next.js App Router
│   ├── page.tsx               # 视频品牌首页 + 上传弹窗
│   ├── edit/page.tsx          # 编辑页 + 补充资料侧栏
│   ├── preview/page.tsx       # 预览页 + Tab 报告
│   ├── login/page.tsx         # 登录注册
│   ├── pricing/page.tsx       # 定价页
│   └── api/                   # API 路由（12 个）
├── i18n/                      # 国际化模块
│   ├── index.ts               # 客户端引擎（t/tv/useLocale）
│   ├── server.ts              # 服务端引擎（serverT）
│   ├── prompts.ts             # AI Prompt 多语言
│   ├── zh.ts                  # 中文词典
│   └── en.ts                  # 英文词典
├── components/
│   ├── upload/                # 文件上传
│   ├── edit/                  # 编辑表单 + sections
│   ├── preview/               # 预览器 + 报告编辑器
│   └── layout/                # Header（含语言切换）
├── templates/portfolio/       # 生成页模板
├── lib/
│   ├── agents/                # 5 个 AI Agent（中英双 Prompt）
│   ├── db/                    # SQLite 数据库
│   ├── auth.ts                # JWT + bcrypt
│   ├── claude-parser.ts       # AI 解析
│   ├── html-generator.ts      # HTML 生成（多语言标签）
│   └── themes.ts              # 主题系统
├── store/                     # Zustand 状态管理
└── middleware.ts               # 认证 + 语言检测
```

---

## 更新日志

| 版本 | 日期 | 内容 |
|------|------|------|
| **V2.2** | 2026-05 | 中英双语国际化、视频背景、多语言 AI Prompt、语言切换 |
| V2.1 | 2026-05 | 安全加固（PayJS 签名 + JWT 认证）、SEO、移动端适配 |
| V2.0 | — | 订阅制盈利、Vercel 部署、主题音乐 |
| V1.0 | — | 核心功能：上传解析、5 Agent、HTML 生成、SQLite 存储 |

## 部署

推荐 Vercel 一键部署：

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/qinchenox/life-journey)

设置上述环境变量后即可上线。也支持 Docker 或任意 Node.js 服务器。

## License

MIT
