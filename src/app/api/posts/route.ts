import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { generateSlug, calculateReadTime, generateExcerpt } from "@/lib/utils";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") || "1");
  const perPage = parseInt(searchParams.get("perPage") || "20");
  const status = searchParams.get("status");
  const category = searchParams.get("category");
  const search = searchParams.get("search");

  const where: Record<string, unknown> = {};
  if (status === "published") where.published = true;
  if (status === "draft") where.published = false;
  if (category) where.categoryId = category;
  if (search) {
    where.OR = [
      { title: { contains: search, mode: "insensitive" } },
      { excerpt: { contains: search, mode: "insensitive" } },
    ];
  }

  const [posts, total] = await Promise.all([
    prisma.post.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * perPage,
      take: perPage,
      include: { category: true, author: { select: { name: true } } },
    }),
    prisma.post.count({ where }),
  ]);

  return NextResponse.json({ posts, total, page, totalPages: Math.ceil(total / perPage) });
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { title, content, excerpt, featuredImage, published, categoryId, metaTitle, metaDesc, metaKeywords, tags } = body;

  if (!title || !content) {
    return NextResponse.json({ error: "Title and content are required" }, { status: 400 });
  }

  let baseSlug = generateSlug(title);
  let slug = baseSlug;
  let counter = 1;
  while (await prisma.post.findUnique({ where: { slug } })) {
    slug = `${baseSlug}-${counter}`;
    counter++;
  }

  const post = await prisma.post.create({
    data: {
      title,
      slug,
      content,
      excerpt: excerpt || generateExcerpt(content),
      featuredImage: featuredImage || null,
      published: published || false,
      metaTitle: metaTitle || title,
      metaDesc: metaDesc || generateExcerpt(content),
      metaKeywords: metaKeywords || "",
      readTime: calculateReadTime(content),
      authorId: (session.user as { id?: string }).id || null,
      categoryId: categoryId || null,
      publishedAt: published ? new Date() : null,
    },
  });

  // Handle tags
  if (tags && Array.isArray(tags)) {
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

  return NextResponse.json(post, { status: 201 });
}
