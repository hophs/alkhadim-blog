import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  try {
    const visits = await prisma.visit.findMany({
      where: { createdAt: { gte: thirtyDaysAgo } },
      select: { createdAt: true },
      orderBy: { createdAt: "asc" },
    });

    const subscribers = await prisma.subscriber.findMany({
      where: { createdAt: { gte: thirtyDaysAgo } },
      select: { createdAt: true },
      orderBy: { createdAt: "asc" },
    });

    const comments = await prisma.comment.findMany({
      where: { createdAt: { gte: thirtyDaysAgo } },
      select: { createdAt: true },
      orderBy: { createdAt: "asc" },
    });

    // Group by day format: "YYYY-MM-DD"
    const formattedData: Record<string, { visits: number; subscribers: number; comments: number }> = {};

    for (let i = 0; i < 30; i++) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        const dayString = d.toISOString().split("T")[0];
        formattedData[dayString] = { visits: 0, subscribers: 0, comments: 0 };
    }

    visits.forEach((v) => {
        const dStr = v.createdAt.toISOString().split("T")[0];
        if (formattedData[dStr]) formattedData[dStr].visits++;
    });

    subscribers.forEach((s) => {
        const dStr = s.createdAt.toISOString().split("T")[0];
        if (formattedData[dStr]) formattedData[dStr].subscribers++;
    });

    comments.forEach((c) => {
        const dStr = c.createdAt.toISOString().split("T")[0];
        if (formattedData[dStr]) formattedData[dStr].comments++;
    });

    const sortedData = Object.entries(formattedData)
        .reverse()
        .map(([date, counts]) => ({ date, ...counts }));

    return NextResponse.json({ chartData: sortedData });
  } catch (error) {
    console.error("Analytics fetch error:", error);
    return NextResponse.json({ error: "Failed to load analytics" }, { status: 500 });
  }
}
