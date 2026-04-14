import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const postId = searchParams.get("postId");

  if (!postId) return NextResponse.json({ error: "Missing postId" }, { status: 400 });

  try {
    const comments = await prisma.comment.findMany({
      where: {
        postId,
        status: "approved",
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return NextResponse.json({ comments });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch comments" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { postId, content, author, email } = await req.json();

    if (!postId || !content || !author) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const comment = await prisma.comment.create({
      data: {
        postId,
        content,
        author,
        email,
        status: "pending", // All comments need moderation to avoid spam footprints
      },
    });

    return NextResponse.json({ success: true, message: "Comment submitted successfully and is awaiting moderation." });
  } catch (error) {
    return NextResponse.json({ error: "Failed to post comment" }, { status: 500 });
  }
}
