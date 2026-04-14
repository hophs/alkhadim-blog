import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/**
 * Public API to fetch ad codes. Cached for 60s on the edge.
 * Only returns ad fields — no API keys or sensitive settings.
 */
export async function GET() {
  let settings = await prisma.settings.findUnique({
    where: { id: "default" },
    select: {
      adsEnabled: true,
      adHeaderScript: true,
      adBelowHeader: true,
      adSidebarTop: true,
      adSidebarBottom: true,
      adInArticle: true,
      adBelowArticle: true,
      adBelowFeatured: true,
      adFooterAbove: true,
    },
  });

  if (!settings || !settings.adsEnabled) {
    return NextResponse.json({ adsEnabled: false }, {
      headers: { "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300" },
    });
  }

  return NextResponse.json(settings, {
    headers: { "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300" },
  });
}
