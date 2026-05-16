import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "personal-chronicle-secret-change-in-production"
);

// 不需要登录就能访问的路径
const PUBLIC_PATHS = ["/", "/login", "/api/auth", "/api/parse", "/p/"];

function isPublic(pathname: string): boolean {
  return PUBLIC_PATHS.some(
    (p) => pathname === p || pathname.startsWith(p + "/") || pathname.startsWith(p)
  );
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (isPublic(pathname)) return NextResponse.next();

  const token = request.cookies.get("token")?.value;
  if (!token) {
    // 编辑和预览页允许未登录使用（guest 模式），但不保存历史
    if (pathname.startsWith("/edit") || pathname.startsWith("/preview")) {
      return NextResponse.next();
    }
    // API 路由需要认证
    if (pathname.startsWith("/api/resumes") || pathname.startsWith("/api/supplement")) {
      return NextResponse.json({ error: "请先登录" }, { status: 401 });
    }
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    // 将用户信息注入请求头
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-user-id", payload.userId as string);
    requestHeaders.set("x-user-email", payload.email as string);

    return NextResponse.next({ request: { headers: requestHeaders } });
  } catch {
    const response = NextResponse.redirect(new URL("/login", request.url));
    response.cookies.delete("token");
    return response;
  }
}

export const config = {
  matcher: ["/((?!_next|favicon.ico|static).*)"],
};
