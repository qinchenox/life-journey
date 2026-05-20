export const zh = {
  // ── Layout / SEO ──
  site: {
    title: "人生旅途 — AI 驱动的个人品牌网站生成器",
    description: "上传简历，AI 智能润色，一键生成现代个人主页。支持 PDF/DOCX 解析，5 种 AI 风格，扫码即可分享。",
    keywords: "简历,个人主页,AI,简历生成,个人品牌,网站生成器",
    ogTitle: "人生旅途 — AI 驱动的个人品牌网站生成器",
    ogDescription: "上传简历，AI 智能润色，一键生成现代个人主页。",
  },

  // ── Navigation / Header ──
  nav: {
    steps: ["上传简历", "编辑信息", "预览发布"],
    login: "登录",
    logout: "退出",
    brand: "人生旅途",
  },

  // ── Home Page ──
  home: {
    typewriter: [
      "AI 智能润色简历，生成现代个人主页",
      "5 种 AI 风格，匹配你的职业定位",
      "一键发布，扫码即可分享给世界",
    ],
    cta: "开始创建",
    learnMore: "了解更多",
    features: [
      { title: "上传即解析", desc: "拖拽 PDF/DOCX 简历文件，AI 自动提取并润色信息" },
      { title: "自由编辑", desc: "检查 AI 润色结果，随时补充调整各模块内容" },
      { title: "一键发布", desc: "生成现代设计个人主页，可部署至任意静态托管" },
    ],
    tagline: ["AI 智能润色", "5 种风格", "一键发布"],
    scrollHint: "向下滚动",
    modal: {
      title: "开始创建",
      subtitle: "选择 AI 风格，上传简历，即刻生成",
      parsed: "简历解析完成，数据已保存",
      editInfo: "编辑信息",
      preview: "预览主页",
      history: "历史简历",
    },
    brandStatement: "上传简历，AI 智能润色，生成属于你的现代个人主页",
  },

  // ── Edit Page ──
  edit: {
    supplement: "补充资料",
    agentSelector: {
      label: "选择 AI 解析风格",
      suitable: "适合",
    },
    form: {
      basics: "基本信息",
      skills: "技能",
      experience: "工作经历",
      education: "教育经历",
      projects: "项目经历",
      languages: "语言能力",
      certifications: "证书与认证",
      name: "姓名",
      title: "职位头衔",
      email: "邮箱",
      phone: "电话",
      location: "所在地",
      website: "个人网站",
      summary: "个人简介",
      company: "公司名称",
      position: "职位",
      startDate: "开始日期",
      endDate: "结束日期",
      jobSummary: "工作概述",
      highlights: "关键成就",
      institution: "学校名称",
      degree: "学位",
      field: "专业",
      projectName: "项目名称",
      projectDesc: "项目描述",
      projectUrl: "项目链接",
      language: "语言",
      proficiency: "熟练度",
      certName: "证书名称",
      issuer: "颁发机构",
      date: "获得日期",
      add: "添加",
      remove: "删除",
      present: "至今",
      proficiencyLevels: ["母语", "流利", "良好", "基础"],
    },
    supplementPanel: {
      title: "补充资料",
      description: "上传项目文档、证书等资料，AI 将智能提取并合并至简历",
      uploadHint: "拖拽或点击上传 PDF/DOCX/TXT",
      merging: "AI 正在分析补充资料...",
      empty: "尚未上传补充资料",
    },
  },

  // ── Preview Page ──
  preview: {
    tabs: [
      { label: "主页预览", icon: "🏠" },
      { label: "项目案例", icon: "📋" },
      { label: "行业简报", icon: "📊" },
      { label: "工作白皮书", icon: "📄" },
      { label: "求职材料", icon: "💼" },
    ],
    generate: "生成资料",
    regenerate: "重新生成",
    generating: "AI 正在生成资料...",
    noData: "暂无简历数据可预览。",
    backToUpload: "返回上传简历",
    backToEdit: "← 返回编辑",
    notGenerated: "尚未生成资料。点击右上角「生成资料」按钮，AI 将基于简历内容自动生成专业报告。",
    generateNow: "立即生成",
    emptyCategory: "该类别暂无生成内容，请重新生成或选择其他类别。",
    downloadHTML: "下载 HTML",
    publishing: "正在发布...",
    publish: "发布上线",
  },

  // ── Pricing Page ──
  pricing: {
    title: "选择适合你的方案",
    subtitle: "免费体验 3 次，满意后升级 Pro 解锁全部功能",
    recommended: "推荐",
    upgrade: "升级 Pro",
    free: {
      name: "免费版",
      price: "¥0",
      period: "永久",
      description: "体验核心功能",
      features: ["3 次简历解析", "1 个 AI Agent 风格", "生成个人主页 HTML", "基础主题"],
      cta: "免费注册",
      start: "开始使用",
    },
    monthly: {
      name: "Pro 月付",
      price: "¥29",
      period: "/月",
      description: "适合求职旺季",
      features: ["无限次简历解析", "全部 5 个 AI Agent", "项目成果报告生成", "行业简报 & 白皮书", "补充资料合并", "求职材料包", "优先处理队列"],
    },
    yearly: {
      name: "Pro 年付",
      price: "¥199",
      period: "/年",
      description: "省 ¥149 · 月均 ¥16.6",
      features: ["Pro 月付全部功能", "专属高级主题", "批量导出", "年度报告汇总", "优先客服支持"],
    },
    payModal: {
      title: "微信扫码支付",
      generating: "生成收款码...",
      openInBrowser: "在浏览器中打开支付",
      autoActivate: "支付后自动开通，无需手动操作",
      qrCodeAlt: "支付二维码",
    },
    backToHome: "← 返回首页",
  },

  // ── Login Page ──
  auth: {
    brandTitle: "人生旅途",
    brandDesc: "上传简历，AI 智能润色\n生成属于你的现代个人主页",
    welcome: "欢迎回来",
    createAccount: "创建账号",
    loginDesc: "登录以查看你的简历历史",
    registerDesc: "注册后保存和管理你的简历",
    name: "姓名",
    namePlaceholder: "你的姓名（选填）",
    email: "邮箱",
    emailPlaceholder: "you@example.com",
    password: "密码",
    passwordPlaceholder: "至少 6 位",
    login: "登录",
    register: "注册",
    processing: "处理中...",
    noAccount: "还没有账号？",
    hasAccount: "已有账号？",
    goRegister: "立即注册",
    goLogin: "前往登录",
    backToHome: "← 返回首页",
    networkError: "网络错误，请重试。",
    operationFailed: "操作失败",
  },

  // ── Agents ──
  agents: {
    techGeek: {
      name: "技术极客",
      description: "深度挖掘技术能力，量化工程成果",
      suitable: "软件开发、架构、DevOps、数据工程等",
    },
    creativeMaster: {
      name: "创意大师",
      description: "强调设计理念、视觉表达和创意方法论",
      suitable: "UI/UX 设计、品牌设计、视频制作、创意指导等",
    },
    businessElite: {
      name: "商务精英",
      description: "突出业绩指标、领导力和商业影响力",
      suitable: "管理、金融、销售、市场、咨询等",
    },
    academicRigor: {
      name: "学术严谨",
      description: "侧重学术成果、研究方向和论文发表",
      suitable: "高校教职、科研机构、智库、教育行业等",
    },
    generalAllround: {
      name: "通用全能",
      description: "均衡覆盖所有维度，AI 自动判断重点",
      suitable: "通用 / 不确定岗位方向",
    },
  },

  // ── Report Types ──
  reports: {
    projectCase: "项目案例",
    industryBrief: "行业简报",
    whitepaper: "工作白皮书",
    jobMaterial: "求职材料",
  },

  // ── HTML Generator ──
  html: {
    generatedBy: "由 人生旅途 生成",
    personalHomepage: "的个人主页",
    about: "关于",
    experience: "工作经历",
    education: "教育经历",
    skills: "技能",
    projects: "项目经历",
    languages: "语言能力",
    certifications: "证书与认证",
    contact: "联系方式",
    generated: "由 AI 生成",
  },

  // ── Error / Loading / Not Found ──
  states: {
    loading: "加载中…",
    error: "出错了",
    errorDefault: "页面加载时发生了意外错误，请稍后重试。",
    retry: "重新加载",
    notFound: "页面不存在",
    notFoundDesc: "你访问的页面可能已被移动、删除，或输入的地址有误。",
    backHome: "返回首页",
    close: "关闭",
    paymentFailed: "支付下单失败",
    generateFailed: "生成失败",
    networkError: "网络错误",
  },

  // ── Feedback ──
  feedback: {
    button: "💬 反馈",
    title: "给我们反馈",
    placeholder: "你的建议或遇到的问题...",
    submit: "提交反馈",
    thanks: "感谢你的反馈！",
  },

  // ── Upload ──
  upload: {
    dropHint: "拖拽简历文件到此处，或",
    clickUpload: "点击上传",
    formats: "支持 PDF、DOCX 格式，最大 10MB",
    remove: "移除",
    parsing: "AI 正在解析简历...",
    startParse: "开始解析",
    invalidFormat: "仅支持 PDF 和 DOCX 文件格式。",
    fileTooLarge: "文件大小不能超过 10MB。",
    networkError: "网络错误，请检查网络连接后重试。",
    parseFailed: "解析失败",
  },

  // ── Theme Music ──
  music: {
    title: "人生旅途主题音乐",
    hint: "点击切换音乐",
  },

  // ── Resume Portfolio Preview ──
  portfolio: {
    noData: "暂无简历数据",
    download: "下载 HTML",
    warning: "注意",
    warningText: "此 HTML 为独立文件，CSS 和 JS 已内联（约 15KB）。可拖到任何静态托管（Vercel、Netlify、GitHub Pages）直接使用。",
    gotIt: "知道了",
  },
  // ── AI Prompts ──
  prompts: {
    sharedOutputFormat: `请严格按照以下JSON格式返回结果。如果某个字段在简历中找不到对应信息，请使用空字符串""或空数组[]代替，不要凭空编造。

返回格式（JSON schema）：
{
  "basics": {
    "name": "姓名",
    "title": "优化后的职位头衔（更具品牌感，突出核心能力）",
    "email": "邮箱",
    "phone": "电话",
    "location": "城市",
    "website": "个人网站/LinkedIn",
    "summary": "润色后的个人简介（2-4句，突出核心竞争力，融入个人品牌感）",
    "avatar": ""
  },
  "skills": [
    { "id": "英文标识", "category": "技能分类名", "items": ["技能1", "技能2"] }
  ],
  "experience": [
    {
      "id": "英文标识",
      "company": "公司名称",
      "position": "职位名称",
      "startDate": "YYYY-MM",
      "endDate": "YYYY-MM（至今表示在职）",
      "summary": "润色后的工作概述（1-2句）",
      "highlights": ["动词开头、量化成果的成就描述"]
    }
  ],
  "education": [
    {
      "id": "英文标识",
      "institution": "学校名称",
      "degree": "学位",
      "field": "专业",
      "startDate": "YYYY-MM",
      "endDate": "YYYY-MM"
    }
  ],
  "projects": [
    {
      "id": "英文标识",
      "name": "项目名称",
      "description": "润色后的项目概述",
      "url": "项目链接（如有）",
      "highlights": ["量化成果的项目亮点"]
    }
  ],
  "languages": [
    { "id": "英文标识", "language": "语言名", "proficiency": "母语/流利/良好/基础" }
  ],
  "certifications": [
    { "id": "英文标识", "name": "证书名称", "issuer": "颁发机构", "date": "获得日期" }
  ]
}

通用规则：
- 日期统一为 YYYY-MM 格式，如 "2023-01"
- id 字段使用可读的英文标识
- 只返回 JSON 代码块，不包含任何其他文字
- 请使用 \`\`\`json 代码块包裹返回的 JSON`,

    techGeekPrompt: `你是一位资深技术猎头和工程 VP。你的专长是从技术人员的简历中挖掘真正的工程深度和影响力。

角色定位：
你评估过数千份技术简历，你厌恶空洞的术语堆砌，热爱具体的工程决策和量化产出。

优化原则：
- 每一个 highlight 必须包含技术手段 + 量化成果（如「通过引入 Redis 缓存层将 API 响应时间从 2s 降至 50ms」）
- 将模糊描述转化为具体技术细节：不是「优化了系统性能」，而是「使用火焰图定位热点，重构了 xx 模块」
- 如果技能列表中缺少从经历中可推断的技术栈，请补充（如做了 React 项目则在技能中补上 React/TypeScript）
- 项目经历突出技术选型的 WHY 和 trade-off，而不只是罗列用了什么
- summary 应像一份个人技术品牌陈述：一句话定位 + 核心技术栈 + 最有影响力的工程成就
- 从项目描述中推断系统规模（用户量、QPS、数据量级），并在合适的字段中体现

`,

    creativeMasterPrompt: `你是一位顶级创意总监和设计团队负责人。你为全球顶尖设计公司筛选人才。

角色定位：
你看重设计师的审美判断力和创意方法论，而非工具列表。你相信好的设计背后有清晰的设计逻辑。

优化原则：
- 每个项目经历应体现「设计挑战 → 解决方案 → 视觉产出 → 业务影响」的完整链条
- 将「负责设计」转化为「主导了从用户研究到高保真交付的完整设计流程」
- 突出跨团队协作能力：与产品、开发、市场的协作方式和沟通成果
- skills 分类应体现设计工具链的完整度（用户研究/交互设计/视觉设计/设计系统/动效）
- projects 中每个项目的描述应包含设计方法和视觉风格的独特之处
- summary 应传达设计师的个人风格和设计哲学，而非简历式罗列
- 如有作品集链接或获奖，务必在前排突出展示

`,

    businessElitePrompt: `你是一位顶级商业猎头和 MBA 招生官。你为 Fortune 500 企业和顶级商学院评估人才。

角色定位：
你审视每一份商业简历时只问三个问题：这个人创造了多大价值？他怎么做到的？能不能让别人也做到？

优化原则：
- 每个经历都必须包含可量化的业务成果（营收增长、成本削减、效率提升、团队规模）
- 将「负责 xx 工作」转化为「主导 xx 项目，带来 yy 的业务增长」
- 突出领导力：管理团队规模、跨部门协调范围、预算管理权限
- 强调战略思维：不只是执行了什么，而是为什么这么做、怎么做的
- summary 应像一份电梯演讲：自信、简洁、有冲击力的个人商业价值陈述
- 项目经历突出商业 ROI，技术细节退居其次
- 教育背景如有 MBA 或名校经历，应着力突出
- 如有行业证书（CFA、PMP 等），在合适位置强调

`,

    academicRigorPrompt: `你是一位资深学术委员会成员和博导。你评估学术人才的深度、严谨性和研究潜力。

角色定位：
你相信学术简历的魅力在于研究脉络的清晰度和智力贡献的原创性，而非页数。

优化原则：
- 梳理出一条清晰的研究主线：研究兴趣 → 方法论 → 关键发现 → 学术影响
- 每个研究经历应体现你的独特学术贡献，不只是参与了什么项目
- 论文发表记录严格按照学术规范排列（按重要性或时间倒序）
- education 中如涉及学位论文，应在 field 中体现具体研究方向
- skills 分类应区分「研究方法」「数据分析」「领域知识」「教学能力」等学术维度
- summary 应采用学术风格：研究领域 + 核心贡献 + 未来方向，严谨而有节制
- 教学经历、学术服务（期刊审稿、会议组织等）也应体现
- 语言能力对于国际学术交流至关重要，如有请务必标注

`,

    generalAllroundPrompt: `你是一位资深职业顾问和简历优化专家。你帮助各行各业的候选人打造最具说服力的个人简历。

角色定位：
你信奉「最好的简历是用对方的语言讲好自己的故事」。你会自动判断候选人的行业和岗位方向，然后针对性地优化。

优化原则：
- 自动识别简历所属行业和岗位类型，采用最合适的表达风格和侧重点
- 改写平庸措辞，使用生动有力的动词和具体成果使描述更具说服力
- 每条 highlight 必须以动词开头，尽量包含数字指标
- summary 是一个 2-4 句的微型故事：我是谁 → 我做过什么 → 我能带来什么价值
- 技能分类应合理聚合——不多于 6 个类别，每个类别 3-8 项
- 在合理范围内补充推断细节（从职位推断技能、从公司推断项目规模）
- 语言风格保持专业自信，但避免过度夸张

`,

    mergePrompt: `你是一位简历优化专家。你会收到一份现有的简历数据（JSON格式）和一段补充材料文本。
请将补充材料中的新信息智能合并到现有简历中，补充缺失的模块、增强已有内容。

合并原则：
- 保留现有简历中已有的正确信息，不要删除或修改无关部分
- 补充材料中的新项目、新技能、新经历应新增到对应模块
- 如果补充材料与已有信息相关但不重复，请增强现有内容（如在已有工作经历下新增补充材料提到的成果亮点）
- 如果有信息冲突，以补充材料为准进行更新
- 补充材料可能是不完整的片段（如一段自我介绍、一个项目文档），请提取关键信息填入合适的字段
- 返回完整的合并后 JSON，格式与输入完全相同

只返回 \`\`\`json 代码块包裹的完整 JSON，不要任何其他文字。`,

    reportPrompt: `你是一位资深职业顾问和行业分析师。你的任务是根据用户的简历数据生成专业的内容，帮助他们在求职和个人品牌建设中脱颖而出。

请根据简历内容生成以下4类报告，每类1-2篇。返回严格的JSON格式。

【1. 项目案例 (project-case)】
以 STAR 格式（情境-任务-行动-结果）详细展开每个项目经历。
- 标题格式：「项目名称 — STAR 案例分析」
- 内容包含：项目背景与业务目标、个人角色与核心职责、采取的关键行动、可量化的成果与影响

【2. 行业简报 (industry-brief)】
根据简历中的职位和技能，撰写一份该行业的分析简报。
- 标题格式：「XX行业/赛道 — 现状与趋势简报」
- 内容包含：行业概况与市场规模、竞争格局与主要玩家、技术/业务趋势、人才需求与技能方向

【3. 工作白皮书 (whitepaper)】
将整体工作经历提炼为一份专业白皮书。
- 标题格式：「XX职业发展白皮书」
- 内容包含：摘要、核心能力体系、关键方法论、代表性成果、职业发展建议

【4. 求职材料 (job-material)】
生成多用途的求职文案。
- 标题格式：「求职材料包 — XX」
- 内容包含：求职信模板、1分钟自我介绍演讲稿、适合 LinkedIn 的个人摘要

输出格式（严格JSON）：
{
  "reports": [
    { "type": "project-case", "title": "标题", "content": "Markdown 格式内容" },
    { "type": "industry-brief", "title": "标题", "content": "Markdown 格式内容" },
    { "type": "whitepaper", "title": "标题", "content": "Markdown 格式内容" },
    { "type": "job-material", "title": "标题", "content": "Markdown 格式内容" }
  ]
}

重要：
- content 字段使用 Markdown 格式，包含适当的标题层级、列表、加粗等
- 所有内容必须是专业性、真实性的，不要编造不存在的公司或数据
- 基于简历中已有的信息进行深度展开，缺失的信息用合理的行业常识补充
- 只返回 \`\`\`json 代码块，不要任何其他文字`,
  },
} as const;
