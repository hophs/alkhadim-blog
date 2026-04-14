import { NextRequest, NextResponse } from "next/server";
import { hash } from "bcryptjs";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const { name, email, password } = await req.json();

  if (!name || !email || !password) {
    return NextResponse.json({ error: "All fields are required" }, { status: 400 });
  }

  // Only allow setup if no users exist
  const userCount = await prisma.user.count();
  if (userCount > 0) {
    return NextResponse.json({ error: "Setup already completed" }, { status: 403 });
  }

  const hashedPassword = await hash(password, 12);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      hashedPassword,
      role: "admin",
    },
  });

  // Create default settings
  await prisma.settings.upsert({
    where: { id: "default" },
    create: { id: "default" },
    update: {},
  });

  // Create default categories
  const defaultCategories = [
    { name: "Technology", slug: "technology", color: "#3B82F6" },
    { name: "Business", slug: "business", color: "#10B981" },
    { name: "Science", slug: "science", color: "#8B5CF6" },
    { name: "Health", slug: "health", color: "#EF4444" },
    { name: "Sports", slug: "sports", color: "#F59E0B" },
  ];

  for (const cat of defaultCategories) {
    await prisma.category.upsert({
      where: { slug: cat.slug },
      create: cat,
      update: {},
    });
  }

  return NextResponse.json({
    success: true,
    user: { id: user.id, name: user.name, email: user.email },
  });
}
