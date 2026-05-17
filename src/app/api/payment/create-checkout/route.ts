import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { getTokenFromRequest, verifyToken } from "@/lib/auth";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "sk_test_placeholder");

export async function POST(request: NextRequest) {
  try {
    const token = getTokenFromRequest(request);
    if (!token) return NextResponse.json({ error: "请先登录" }, { status: 401 });
    const payload = await verifyToken(token);
    if (!payload) return NextResponse.json({ error: "请先登录" }, { status: 401 });

    const { priceId } = await request.json();
    if (!priceId) return NextResponse.json({ error: "缺少价格信息" }, { status: 400 });

    const origin = request.headers.get("origin") || "http://localhost:3000";

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const session: any = await stripe.checkout.sessions.create({
      mode: "subscription" as any,
      payment_method_types: ["card", "alipay", "wechat_pay"] as any,
      customer_email: payload.email,
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${origin}/pricing?success=true`,
      cancel_url: `${origin}/pricing?canceled=true`,
      metadata: { userId: payload.userId },
      subscription_data: {
        metadata: { userId: payload.userId },
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Stripe checkout error:", error);
    return NextResponse.json({ error: "支付服务暂不可用" }, { status: 502 });
  }
}
