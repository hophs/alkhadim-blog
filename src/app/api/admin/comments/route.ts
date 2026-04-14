import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const comments = await prisma.comment.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        post: { select: { id: true, title: true, slug: true } },
      },
    });

    return NextResponse.json({ comments });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch comments" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const { id, status } = await req.json();

    if (!id || !status) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const updated = await prisma.comment.update({
      where: { id },
      data: { status },
    });

    return NextResponse.json({ success: true, comment: updated });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update comment status" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }

  try {
    await prisma.comment.delete({ where: { id } });
    return NextResponse.json({ success: true, message: "Comment deleted" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete comment" }, { status: 500 });
  }
}
