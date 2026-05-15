import { NextRequest, NextResponse } from "next/server";
import { extractText, detectMimeType } from "@/lib/text-extractor";
import { parseResumeWithClaude } from "@/lib/claude-parser";
import { ParseResponse } from "@/lib/types";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const MAX_TEXT_LENGTH = 15000;

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!file || !(file instanceof File)) {
      return NextResponse.json(
        { success: false, error: "请上传简历文件。", code: "NO_FILE" } satisfies ParseResponse,
        { status: 400 }
      );
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { success: false, error: "文件大小超过 10MB 限制。", code: "FILE_TOO_LARGE" } satisfies ParseResponse,
        { status: 413 }
      );
    }

    // Read file buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Detect actual MIME type from magic bytes
    const detectedType = detectMimeType(buffer);
    const allowedTypes = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    if (!allowedTypes.includes(detectedType)) {
      return NextResponse.json(
        {
          success: false,
          error: "不支持的文件类型。请上传 PDF 或 DOCX 文件。",
          code: "UNSUPPORTED_TYPE",
        } satisfies ParseResponse,
        { status: 415 }
      );
    }

    // Extract text
    let rawText: string;
    try {
      rawText = await extractText(buffer, detectedType);
    } catch {
      return NextResponse.json(
        {
          success: false,
          error: "无法从文件中提取文字。PDF 可能是扫描件，请使用可搜索的 PDF 或 DOCX 文件。",
          code: "EXTRACTION_FAILED",
        } satisfies ParseResponse,
        { status: 422 }
      );
    }

    if (!rawText || rawText.trim().length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: "文件中未检测到文字内容。请确认简历不是扫描图片。",
          code: "EMPTY_TEXT",
        } satisfies ParseResponse,
        { status: 422 }
      );
    }

    // Truncate to control cost
    const truncatedText = rawText.slice(0, MAX_TEXT_LENGTH);

    // Parse with Claude
    let result: { data: import("@/lib/types").ResumeData; warnings: string[] };
    try {
      result = await parseResumeWithClaude(truncatedText);
    } catch (error) {
      console.error("Claude API error:", error);
      return NextResponse.json(
        {
          success: false,
          error: "AI 解析服务暂时不可用，请稍后重试。",
          code: "AI_UNAVAILABLE",
        } satisfies ParseResponse,
        { status: 502 }
      );
    }

    return NextResponse.json({
      success: true,
      data: result.data,
      warnings: result.warnings,
    } satisfies ParseResponse);
  } catch (error) {
    console.error("Parse API error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "服务器内部错误，请稍后重试。",
        code: "INTERNAL_ERROR",
      } satisfies ParseResponse,
      { status: 500 }
    );
  }
}
