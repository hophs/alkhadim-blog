import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  let settings = await prisma.settings.findUnique({ where: { id: "default" } });
  if (!settings) {
    settings = await prisma.settings.create({ data: { id: "default" } });
  }
  return NextResponse.json(settings);
}

export async function PUT(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();

  const settings = await prisma.settings.upsert({
    where: { id: "default" },
    update: {
      siteName: body.siteName,
      siteDescription: body.siteDescription,
      siteUrl: body.siteUrl,
      faviconUrl: body.faviconUrl,
      logoUrl: body.logoUrl,
      metaImage: body.metaImage,
      primaryColor: body.primaryColor,
      accentColor: body.accentColor,
      headerStyle: body.headerStyle,
      postsPerPage: body.postsPerPage ? parseInt(body.postsPerPage) : undefined,
      autoPostEnabled: body.autoPostEnabled,
      autoPostInterval: body.autoPostInterval ? parseInt(body.autoPostInterval) : undefined,
      autoPostCategories: body.autoPostCategories,
      newsApiKey: body.newsApiKey,
      gnewsApiKey: body.gnewsApiKey,
      currentsApiKey: body.currentsApiKey,
      newsDataApiKey: body.newsDataApiKey,
      mediaStackApiKey: body.mediaStackApiKey,
      theNewsApiKey: body.theNewsApiKey,
      preferredNewsApi: body.preferredNewsApi,
      openaiApiKey: body.openaiApiKey,
      preferredAiApi: body.preferredAiApi,
      // Ad fields
      adsEnabled: body.adsEnabled,
      adHeaderScript: body.adHeaderScript,
      adBelowHeader: body.adBelowHeader,
      adSidebarTop: body.adSidebarTop,
      adSidebarBottom: body.adSidebarBottom,
      adInArticle: body.adInArticle,
      adBelowArticle: body.adBelowArticle,
      adBelowFeatured: body.adBelowFeatured,
      adFooterAbove: body.adFooterAbove,
      // Newsletter & SMTP fields
      newsletterEnabled: body.newsletterEnabled,
      autoSendNewsletter: body.autoSendNewsletter,
      newsletterProvider: body.newsletterProvider,
      smtpHost: body.smtpHost,
      smtpPort: body.smtpPort ? parseInt(body.smtpPort) : undefined,
      smtpUser: body.smtpUser,
      smtpPassword: body.smtpPassword,
      smtpFromEmail: body.smtpFromEmail,
      mailchimpApiKey: body.mailchimpApiKey,
      mailchimpListId: body.mailchimpListId,
      // Custom code injection
      customHeadCode: body.customHeadCode,
      customBodyStart: body.customBodyStart,
      customFooterCode: body.customFooterCode,
    },
    create: { id: "default" },
  });

  return NextResponse.json(settings);
}
