import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
    }

    // Check if subscriber exists
    const existing = await prisma.subscriber.findUnique({
      where: { email },
    });

    if (existing) {
      if (existing.status === "unsubscribed") {
        // Resubscribe
        await prisma.subscriber.update({
          where: { email },
          data: { status: "active" },
        });
        return NextResponse.json({ success: true, message: "Welcome back!" }, { status: 200 });
      }
      return NextResponse.json({ error: "You are already subscribed." }, { status: 400 });
    }

    // Create new subscriber
    await prisma.subscriber.create({
      data: { email },
    });

    return NextResponse.json({ success: true, message: "Subscribed successfully!" }, { status: 201 });
  } catch (error) {
    console.error("Subscription error:", error);
    return NextResponse.json({ error: "Failed to subscribe" }, { status: 500 });
  }
}
