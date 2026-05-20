import { NextRequest, NextResponse } from "next/server";
import { nanoid } from "nanoid";
import { ResumeData, GeneratedReport, ReportType } from "@/lib/types";
import { getAgent } from "@/lib/agents";
import { getReportPrompt } from "@/i18n/prompts";

const BASE_URL = process.env.LLM_BASE_URL || "https://dashscope.aliyuncs.com/compatible-mode/v1";
const API_KEY = process.env.ANTHROPIC_API_KEY || "";
const MODEL = process.env.LLM_MODEL || "qwen-plus";

function getPrompt() { return getReportPrompt(); }

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
          { role: "system", content: getPrompt() },
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
