import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(request: NextRequest) {
  try {
    const { message, email, page } = await request.json();
    if (!message || message.trim().length < 2) {
      return NextResponse.json({ error: "请填写反馈内容" }, { status: 400 });
    }

    const entry = {
      id: Date.now().toString(36),
      email: email || "匿名",
      page: page || "未知",
      message: message.trim(),
      createdAt: new Date().toISOString(),
      userAgent: request.headers.get("user-agent") || "",
    };

    // Append to feedback.jsonl
    const filePath = path.join(process.cwd(), "feedback.jsonl");
    fs.appendFileSync(filePath, JSON.stringify(entry) + "\n", "utf-8");

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Feedback error:", error);
    return NextResponse.json({ error: "提交失败" }, { status: 500 });
  }
}
