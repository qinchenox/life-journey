import { SignJWT, jwtVerify } from "jose";
import bcrypt from "bcryptjs";

const DEFAULT_SECRET = "life-journey-secret-change-in-production";
const USING_DEFAULT_SECRET = !process.env.JWT_SECRET || process.env.JWT_SECRET === DEFAULT_SECRET;

if (USING_DEFAULT_SECRET) {
  console.warn(
    "\n⚠️  安全警告：JWT_SECRET 使用默认值！\n" +
    "   请在生产环境设置 JWT_SECRET 环境变量，否则 JWT token 可被伪造。\n" +
    "   生成随机密钥：node -e \"console.log(require('crypto').randomBytes(64).toString('hex'))\"\n"
  );
}

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || DEFAULT_SECRET
);
const TOKEN_EXPIRY = "7d";

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export async function signToken(payload: { userId: string; email: string }): Promise<string> {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(TOKEN_EXPIRY)
    .sign(JWT_SECRET);
}

export async function verifyToken(token: string): Promise<{ userId: string; email: string } | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload as { userId: string; email: string };
  } catch {
    return null;
  }
}

export function getTokenFromRequest(request: Request): string | null {
  const cookie = request.headers.get("cookie") || "";
  const match = cookie.match(/token=([^;]+)/);
  return match ? match[1] : null;
}
