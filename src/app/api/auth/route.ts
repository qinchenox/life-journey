import { NextRequest, NextResponse } from "next/server";
import { createUser, findUserByEmail, findUserById } from "@/lib/db";
import { hashPassword, verifyPassword, signToken, getTokenFromRequest } from "@/lib/auth";
import { verifyToken } from "@/lib/auth";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const action = body.action as string;

  // ── Register ──
  if (action === "register") {
    const { email, password, name } = body;
    if (!email || !password) {
      return NextResponse.json({ error: "邮箱和密码不能为空" }, { status: 400 });
    }
    const normalized = email.trim().toLowerCase();
    if (findUserByEmail(normalized)) {
      return NextResponse.json({ error: "该邮箱已注册" }, { status: 409 });
    }
    const hash = await hashPassword(password);
    const user = createUser(normalized, hash, name?.trim() || "");
    const token = await signToken({ userId: user.id, email: user.email });

    const response = NextResponse.json({ success: true, user: { id: user.id, email: user.email, name: user.name } });
    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });
    return response;
  }

  // ── Login ──
  if (action === "login") {
    const { email, password } = body;
    if (!email || !password) {
      return NextResponse.json({ error: "邮箱和密码不能为空" }, { status: 400 });
    }
    const user = findUserByEmail(email.trim().toLowerCase());
    if (!user || !(await verifyPassword(password, user.password_hash))) {
      return NextResponse.json({ error: "邮箱或密码错误" }, { status: 401 });
    }
    const token = await signToken({ userId: user.id, email: user.email });

    const response = NextResponse.json({ success: true, user: { id: user.id, email: user.email, name: user.name } });
    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });
    return response;
  }

  return NextResponse.json({ error: "未知操作" }, { status: 400 });
}

export async function GET(request: NextRequest) {
  const token = getTokenFromRequest(request);
  if (!token) {
    return NextResponse.json({ user: null });
  }
  const payload = await verifyToken(token);
  if (!payload) {
    return NextResponse.json({ user: null });
  }
  const user = findUserById(payload.userId);
  if (!user) {
    return NextResponse.json({ user: null });
  }
  return NextResponse.json({
    user: { id: user.id, email: user.email, name: user.name, createdAt: user.created_at },
  });
}

export async function DELETE() {
  const response = NextResponse.json({ success: true });
  response.cookies.delete("token");
  return response;
}
