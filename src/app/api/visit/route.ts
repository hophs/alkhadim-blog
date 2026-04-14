import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const { path, referer } = await req.json();

    const ip = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "unknown";
    const userAgent = req.headers.get("user-agent") || "unknown";

    await prisma.visit.create({
      data: {
        path: path || "/",
        ip: ip.substring(0, 45), // IPv6 compat
        userAgent: userAgent.substring(0, 200),
        referer: referer ? referer.substring(0, 200) : null,
      },
    });

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error("Visit tracking error:", error);
    return NextResponse.json({ error: "Failed to track visit" }, { status: 500 });
  }
}
