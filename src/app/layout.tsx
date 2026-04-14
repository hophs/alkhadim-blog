import type { Metadata } from "next";
import { Work_Sans, Lora } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import CookieConsent from "@/components/CookieConsent";
import { AdProvider } from "@/components/AdProvider";
import { CustomCodeInjector } from "@/components/CustomCodeInjector";
import { prisma } from "@/lib/prisma";

const workSans = Work_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const lora = Lora({
  variable: "--font-serif",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://ourwebsite.com";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await prisma.settings.findFirst();
  
  const siteName = settings?.siteName || "Our Website";
  const faviconUrl = settings?.faviconUrl || "/favicon.ico";
  const title = `${siteName} — Political News & Analysis`;
  const description = settings?.siteDescription || 
    "Your trusted source for political news, in-depth analysis, and expert commentary on wars, international politics, diplomacy, military affairs, and geopolitics.";
  const metaImage = settings?.metaImage || `${siteUrl}/og-default.jpg`;

  return {
    title: {
      default: title,
      template: `%s | ${siteName}`,
    },
    description,
    keywords: [
      "news", "politics", "war", "conflict", "international politics",
      "diplomacy", "military", "geopolitics", "analysis", "breaking news",
      "world news", "political analysis", "defense", "foreign policy",
    ],
    authors: [{ name: siteName }],
    creator: siteName,
    publisher: siteName,
    metadataBase: new URL(siteUrl),
    alternates: {
      canonical: siteUrl,
    },
    openGraph: {
      type: "website",
      locale: "en_US",
      url: siteUrl,
      siteName,
      title,
      description,
      images: [
        {
          url: metaImage,
          width: 1200,
          height: 630,
          alt: siteName,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [metaImage],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    verification: {
      // Replace with your actual Google Search Console verification code
      // google: "your-google-verification-code",
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await prisma.settings.findFirst();
  const primaryColor = settings?.primaryColor || "#1a2b3c";
  const accentColor = settings?.accentColor || "#3b82f6";
  
  return (
    <html lang="en" className={`${workSans.variable} ${lora.variable}`} data-scroll-behavior="smooth">
      <body className="antialiased min-h-screen flex flex-col">
        <style dangerouslySetInnerHTML={{ __html: `
          :root {
            --color-primary: ${primaryColor};
            --color-accent: ${accentColor};
          }
        `}} />
        <Toaster />
        <CustomCodeInjector />
        <AdProvider>
          <Toaster position="top-right" />
          {children}
          <CookieConsent />
        </AdProvider>
      </body>
    </html>
  );
}
