import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { generateSlug, calculateReadTime, generateExcerpt } from "@/lib/utils";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const post = await prisma.post.findUnique({
    where: { id },
    include: {
      category: true,
      author: { select: { name: true } },
      tags: { include: { tag: true } },
    },
  });

  if (!post) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(post);
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const body = await req.json();
  const { title, content, excerpt, featuredImage, published, categoryId, metaTitle, metaDesc, metaKeywords, tags } = body;

  const existing = await prisma.post.findUnique({ where: { id } });
  if (!existing) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  let slug = existing.slug;
  if (title && title !== existing.title) {
    let baseSlug = generateSlug(title);
    slug = baseSlug;
    let counter = 1;
    while (true) {
      const found = await prisma.post.findUnique({ where: { slug } });
      if (!found || found.id === id) break;
      slug = `${baseSlug}-${counter}`;
      counter++;
    }
  }

  const post = await prisma.post.update({
    where: { id },
    data: {
      title: title ?? existing.title,
      slug,
      content: content ?? existing.content,
      excerpt: excerpt || (content ? generateExcerpt(content) : existing.excerpt),
      featuredImage: featuredImage !== undefined ? featuredImage : existing.featuredImage,
      published: published !== undefined ? published : existing.published,
      metaTitle: metaTitle ?? existing.metaTitle,
      metaDesc: metaDesc ?? existing.metaDesc,
      metaKeywords: metaKeywords ?? existing.metaKeywords,
      readTime: content ? calculateReadTime(content) : existing.readTime,
      categoryId: categoryId !== undefined ? categoryId : existing.categoryId,
      publishedAt:
        published && !existing.publishedAt
          ? new Date()
          : published === false
          ? null
          : existing.publishedAt,
    },
  });

  // Update tags
  if (tags && Array.isArray(tags)) {
    await prisma.tagOnPost.deleteMany({ where: { postId: id } });
    for (const tagName of tags) {
      const tagSlug = generateSlug(tagName);
      const tag = await prisma.tag.upsert({
        where: { slug: tagSlug },
        create: { name: tagName, slug: tagSlug },
        update: {},
      });
      await prisma.tagOnPost.create({
        data: { postId: post.id, tagId: tag.id },
      });
    }
  }

  return NextResponse.json(post);
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  await prisma.post.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
