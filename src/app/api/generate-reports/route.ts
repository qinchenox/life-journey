import { NextRequest, NextResponse } from "next/server";
import { nanoid } from "nanoid";
import { ResumeData, GeneratedReport, ReportType } from "@/lib/types";
import { getAgent } from "@/lib/agents";

const BASE_URL = process.env.LLM_BASE_URL || "https://dashscope.aliyuncs.com/compatible-mode/v1";
const API_KEY = process.env.ANTHROPIC_API_KEY || "";
const MODEL = process.env.LLM_MODEL || "qwen-plus";

const REPORT_PROMPT = `你是一位资深职业顾问和行业分析师。你的任务是根据用户的简历数据生成专业的内容，帮助他们在求职和个人品牌建设中脱颖而出。

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
- 只返回 \`\`\`json 代码块，不要任何其他文字`;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { resumeData, agentId } = body as { resumeData: ResumeData; agentId?: string };

    if (!resumeData) {
      return NextResponse.json({ success: false, error: "缺少简历数据" }, { status: 400 });
    }

    const agent = getAgent(agentId || "general-allround");

    const response = await fetch(`${BASE_URL}/chat/completions`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${API_KEY}` },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: 8192,
        temperature: 0.4,
        messages: [
          { role: "system", content: REPORT_PROMPT },
          {
            role: "user",
            content: `请根据以下简历数据生成专业报告：\n\n${JSON.stringify(resumeData, null, 2)}\n\n行业背景参考：${agent.description}，适合岗位：${agent.suitable}`,
          },
        ],
      }),
    });

    if (!response.ok) {
      return NextResponse.json({ success: false, error: "AI 服务暂时不可用" }, { status: 502 });
    }

    const json = await response.json() as { choices: Array<{ message: { content: string } }> };
    const text = json.choices?.[0]?.message?.content || "";
    const jsonMatch = text.match(/```(?:json)?\n?([\s\S]*?)\n?```/) || text.match(/(\{[\s\S]*\})/);

    if (!jsonMatch) {
      return NextResponse.json({ success: false, error: "AI 返回格式异常" }, { status: 502 });
    }

    const parsed = JSON.parse(jsonMatch[1] || jsonMatch[0]);
    const reports: GeneratedReport[] = (parsed.reports || []).map((r: { type: string; title: string; content: string }) => ({
      id: nanoid(10),
      type: r.type as ReportType,
      title: r.title,
      content: r.content,
      generatedAt: new Date().toISOString(),
    }));

    return NextResponse.json({ success: true, reports });
  } catch (error) {
    console.error("Generate reports error:", error);
    return NextResponse.json({ success: false, error: "服务器内部错误" }, { status: 500 });
  }
}
