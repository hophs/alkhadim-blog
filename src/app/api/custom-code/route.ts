import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const settings = await prisma.settings.findUnique({
    where: { id: "default" },
    select: {
      customHeadCode: true,
      customBodyStart: true,
      customFooterCode: true,
    },
  });

  return NextResponse.json(settings || { customHeadCode: null, customBodyStart: null, customFooterCode: null }, {
    headers: { "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300" },
  });
}
