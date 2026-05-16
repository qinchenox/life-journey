import { NextRequest, NextResponse } from "next/server";
import { listResumesByUser, saveResume, findUserByEmail } from "@/lib/db";
import { getTokenFromRequest, verifyToken } from "@/lib/auth";

export async function GET(request: NextRequest) {
  const token = getTokenFromRequest(request);
  if (!token) return NextResponse.json({ resumes: [] });
  const payload = await verifyToken(token);
  if (!payload) return NextResponse.json({ resumes: [] });

  const resumes = listResumesByUser(payload.userId);
  return NextResponse.json({ resumes });
}

export async function POST(request: NextRequest) {
  const token = getTokenFromRequest(request);
  if (!token) return NextResponse.json({ error: "请先登录" }, { status: 401 });
  const payload = await verifyToken(token);
  if (!payload) return NextResponse.json({ error: "请先登录" }, { status: 401 });

  const { data, agentId, name } = await request.json();
  const result = saveResume(payload.userId, data, agentId || "general-allround", name);
  return NextResponse.json({ success: true, ...result });
}
