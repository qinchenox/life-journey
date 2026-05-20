import { NextRequest, NextResponse } from "next/server";
import { extractText, detectMimeType } from "@/lib/text-extractor";
import { getTokenFromRequest, verifyToken } from "@/lib/auth";
import { getAgent } from "@/lib/agents";
import { ResumeData } from "@/lib/types";
import { getMergePrompt } from "@/i18n/prompts";

const MAX_FILE_SIZE = 10 * 1024 * 1024;
const MAX_TEXT_LENGTH = 8000;
const BASE_URL = process.env.LLM_BASE_URL || "https://dashscope.aliyuncs.com/compatible-mode/v1";
const API_KEY = process.env.ANTHROPIC_API_KEY || "";
const MODEL = process.env.LLM_MODEL || "qwen-plus";

function getPrompt() { return getMergePrompt(); }

export async function POST(request: NextRequest) {
  try {
    // Handle file upload with JSON metadata
    const formData = await request.formData();
    const file = formData.get("file");
    const currentDataStr = formData.get("currentData") as string;
    const agentId = (formData.get("agentId") as string) || "general-allround";

    if (!file || !(file instanceof File)) {
      return NextResponse.json({ error: "请上传补充材料文件。" }, { status: 400 });
    }
    if (!currentDataStr) {
      return NextResponse.json({ error: "缺少当前简历数据。" }, { status: 400 });
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json({ error: "文件大小超过 10MB 限制。" }, { status: 413 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const detectedType = detectMimeType(buffer);
    const allowedTypes = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    if (!allowedTypes.includes(detectedType)) {
      return NextResponse.json({ error: "仅支持 PDF 和 DOCX 格式。" }, { status: 415 });
    }

    let supplementText: string;
    try {
      supplementText = await extractText(buffer, detectedType);
    } catch {
      return NextResponse.json({ error: "无法从文件中提取文字。" }, { status: 422 });
    }

    if (!supplementText || supplementText.trim().length === 0) {
      return NextResponse.json({ error: "文件中未检测到文字内容。" }, { status: 422 });
    }

    const truncated = supplementText.slice(0, MAX_TEXT_LENGTH);

    // Call LLM to merge
    const response = await fetch(`${BASE_URL}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: 4096,
        temperature: 0.3,
        messages: [
          { role: "system", content: getPrompt() },
          {
            role: "user",
            content: `现有简历数据：\n${currentDataStr}\n\n补充材料文本：\n${truncated}`,
          },
        ],
      }),
    });

    if (!response.ok) {
      return NextResponse.json({ error: "AI 合并服务暂时不可用。" }, { status: 502 });
    }

    const json = await response.json() as {
      choices: Array<{ message: { content: string } }>;
    };
    const text = json.choices?.[0]?.message?.content || "";
    const jsonMatch =
      text.match(/```(?:json)?\n?([\s\S]*?)\n?```/) ||
      text.match(/(\{[\s\S]*\})/);

    if (!jsonMatch) {
      return NextResponse.json({ error: "AI 返回格式异常。" }, { status: 502 });
    }

    const merged = JSON.parse(jsonMatch[1] || jsonMatch[0]);
    return NextResponse.json({ success: true, data: merged });
  } catch (error) {
    console.error("Supplement API error:", error);
    return NextResponse.json({ error: "服务器内部错误。" }, { status: 500 });
  }
}
