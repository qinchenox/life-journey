import { NextRequest, NextResponse } from "next/server";
import { getResumeById, deleteResume } from "@/lib/db";
import { getTokenFromRequest, verifyToken } from "@/lib/auth";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const resume = getResumeById(id);
  if (!resume) return NextResponse.json({ error: "简历不存在" }, { status: 404 });
  return NextResponse.json({ resume: { ...resume, data: JSON.parse(resume.data_json) } });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const token = getTokenFromRequest(request);
  if (!token) return NextResponse.json({ error: "请先登录" }, { status: 401 });
  const payload = await verifyToken(token);
  if (!payload) return NextResponse.json({ error: "请先登录" }, { status: 401 });

  const { id } = await params;
  const resume = getResumeById(id);
  if (!resume) return NextResponse.json({ error: "简历不存在" }, { status: 404 });
  if (resume.user_id !== payload.userId) {
    return NextResponse.json({ error: "无权操作" }, { status: 403 });
  }
  deleteResume(id);
  return NextResponse.json({ success: true });
}
