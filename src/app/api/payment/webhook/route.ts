import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { upgradeUserPlan } from "@/lib/db";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "sk_test_placeholder");
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || "";

export async function POST(request: NextRequest) {
  const body = await request.text();
  const sig = request.headers.get("stripe-signature") || "";

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  try {
    // Handle checkout.session.completed
    if (event.type === "checkout.session.completed") {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const session = event.data.object as any;
      const userId = session.metadata?.userId as string | undefined;
      const customerId = session.customer as string;
      const subscriptionId = session.subscription as string;

      if (userId && subscriptionId) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const sub: any = await stripe.subscriptions.retrieve(subscriptionId);
        const expiresAt = new Date(sub.current_period_end * 1000).toISOString();
        const priceId = sub.items?.data?.[0]?.price?.id || "";
        const plan = priceId.includes("year") ? "pro-yearly" : "pro-monthly";
        upgradeUserPlan(userId, plan, customerId, expiresAt);
      }
    }

    // Handle invoice.paid for renewals
    if (event.type === "invoice.paid") {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const invoice = event.data.object as any;
      const subId = invoice.subscription as string;
      if (subId) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const sub: any = await stripe.subscriptions.retrieve(subId);
        const userId = sub.metadata?.userId as string | undefined;
        const customerId = sub.customer as string;
        if (userId) {
          const expiresAt = new Date(sub.current_period_end * 1000).toISOString();
          const priceId = sub.items?.data?.[0]?.price?.id || "";
          const plan = priceId.includes("year") ? "pro-yearly" : "pro-monthly";
          upgradeUserPlan(userId, plan, customerId, expiresAt);
        }
      }
    }
  } catch (err) {
    console.error("Webhook processing error:", err);
  }

  return NextResponse.json({ received: true });
}
