import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import fs from "fs";
import path from "path";

const KEY_FILE_PATH = path.join(process.cwd(), "google-service-account.json");

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as any)?.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const exists = fs.existsSync(KEY_FILE_PATH);
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

    fs.writeFileSync(KEY_FILE_PATH, fileContents, "utf8");

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
    if (fs.existsSync(KEY_FILE_PATH)) {
      fs.unlinkSync(KEY_FILE_PATH);
    }
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: "Failed to delete key file" }, { status: 500 });
  }
}
