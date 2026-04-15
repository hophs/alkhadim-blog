import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { broadcastLatestPost } from "@/lib/newsletter";

export const maxDuration = 60; // Allow 60s for email broadcasting

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  
  if (!session || (session.user as any)?.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const result = await broadcastLatestPost();
    
    if (!result.success) {
       return NextResponse.json({ error: result.message }, { status: 400 });
    }

    return NextResponse.json({ message: result.message }, { status: 200 });
  } catch (error: any) {
    console.error("Broadcast err", error);
    return NextResponse.json({ error: error.message || "Failed to broadcast newsletter" }, { status: 500 });
  }
}