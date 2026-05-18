import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { upgradeUserPlan } from "@/lib/db";

const PAYJS_KEY = process.env.PAYJS_KEY || "";

function md5(s: string): string {
  return crypto.createHash("md5").update(s, "utf8").digest("hex");
}

function verifyPayjsSign(params: URLSearchParams): boolean {
  if (!PAYJS_KEY) return false;
  const receivedSign = params.get("sign");
  if (!receivedSign) return false;

  const sorted: string[] = [];
  const keys = Array.from(params.keys()).filter((k) => k !== "sign").sort();
  for (const key of keys) {
    sorted.push(`${key}=${params.get(key)}`);
  }
  const signStr = sorted.join("&") + `&key=${PAYJS_KEY}`;
  const expectedSign = md5(signStr).toUpperCase();
  return receivedSign === expectedSign;
}

// PayJS 支付成功异步通知
export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const params = new URLSearchParams(body);

    if (!verifyPayjsSign(params)) {
      console.error("PayJS notify: signature verification failed");
      return new Response("fail", { status: 403 });
    }

    const returnCode = params.get("return_code");
    const attachStr = params.get("attach") || "";

    if (returnCode !== "1") return new Response("fail", { status: 400 });

    const [userId, planType] = attachStr.split("|");
    if (!userId || !planType) return new Response("fail", { status: 400 });

    const days = planType === "pro-yearly" ? 365 : 30;
    const expiresAt = new Date(Date.now() + days * 86400 * 1000).toISOString();

    upgradeUserPlan(userId, planType, "payjs", expiresAt);
    console.log(`PayJS: user ${userId} upgraded to ${planType}, expires ${expiresAt}`);
    return new Response("success", { status: 200 });
  } catch (err) {
    console.error("PayJS notify error:", err);
    return new Response("fail", { status: 500 });
  }
}
