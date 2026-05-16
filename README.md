# 人生旅途

人生旅途 — AI 驱动的个人品牌网站生成器。上传简历，智能润色，一键生成现代简约的个人主页。

## 功能

- **上传即解析** — 拖拽 PDF 或 DOCX 简历文件，Claude AI 自动提取姓名、经历、技能等结构化信息
- **自由编辑** — 校对修正 AI 解析结果，随时增删调整各模块内容
- **一键发布** — 下载为自包含 HTML 文件，可离线打开或部署至任意静态托管（Vercel / GitHub Pages / Netlify）

## 技术栈

Next.js 15 · React 19 · TypeScript · Tailwind CSS 4 · Zustand · Claude API

## 快速开始

```bash
# 安装依赖
npm install

# 配置 Anthropic API Key
cp .env.local.example .env.local
# 编辑 .env.local，填入你的 ANTHROPIC_API_KEY

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build
npm start
```

## 使用流程

1. 打开首页，拖拽或点击上传 PDF / DOCX 简历文件
2. AI 自动解析并跳转至编辑页，检查修正各模块信息
3. 点击预览查看生成效果
4. 下载 HTML 文件或直接分享链接

## 项目结构

```
src/
├── app/                # Next.js App Router 页面
│   ├── page.tsx        # 首页 — 上传入口
│   ├── edit/page.tsx   # 编辑页
│   ├── preview/page.tsx # 预览页
│   └── api/            # API 路由
│       ├── parse/      # 简历解析
│       └── generate-html/ # HTML 生成
├── components/         # UI 组件
│   ├── upload/         # 文件上传
│   ├── edit/           # 编辑表单
│   ├── preview/        # 预览器
│   └── layout/         # 页面布局
├── templates/portfolio/ # 生成页模板（极简设计）
├── lib/                # 工具库
│   ├── types.ts        # 类型定义
│   ├── constants.ts    # 常量 + Claude Prompt
│   ├── text-extractor.ts # PDF/DOCX 文本提取
│   ├── claude-parser.ts  # Claude API 解析
│   ├── html-generator.ts # HTML 生成
│   └── template-css.ts   # 预编译 CSS
└── store/              # Zustand 状态管理
    └── resume-store.ts
```

## 部署

推荐部署至 Vercel：

1. Push 代码至 GitHub
2. 在 Vercel 导入仓库
3. 设置环境变量 `ANTHROPIC_API_KEY`
4. 自动部署完成

## License

MIT
