import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as any)?.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const settings = await prisma.settings.findUnique({ where: { id: "default" } });
  const exists = !!settings?.googleServiceAccountKey;
  
  return NextResponse.json({ exists });
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as any)?.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const fileContents = await file.text();

    // Basic validation
    try {
      const parsed = JSON.parse(fileContents);
      if (!parsed.client_email || !parsed.private_key) {
        return NextResponse.json(
          { error: "Invalid JSON format. Make sure it is a valid Google Service Account key containing 'client_email' and 'private_key'." },
          { status: 400 }
        );
      }
    } catch (e) {
      return NextResponse.json({ error: "Invalid JSON file structure" }, { status: 400 });
    }

    await prisma.settings.upsert({
      where: { id: "default" },
      update: { googleServiceAccountKey: fileContents },
      create: { id: "default", googleServiceAccountKey: fileContents }
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Error uploading key file:", error);
    return NextResponse.json({ error: error.message || "Failed to upload file" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as any)?.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await prisma.settings.upsert({
      where: { id: "default" },
      update: { googleServiceAccountKey: null },
      create: { id: "default", googleServiceAccountKey: null }
    });
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: "Failed to delete key file" }, { status: 500 });
  }
}
