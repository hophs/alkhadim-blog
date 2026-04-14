import { prisma } from '@/lib/prisma';
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms of service for {siteName} — rules and guidelines for using our news aggregation platform.",
};

const sections = [
  {
    title: "Acceptance of Terms",
    content: [
      "By accessing and using {siteName}, you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our site.",
    ],
  },
  {
    title: "Description of Service",
    content: [
      "{siteName} is an professional news aggregation platform that automatically collects, filters, and presents news articles from third-party sources. We focus on international politics, wars, conflicts, diplomacy, military developments, and geopolitics.",
      "The service is provided \"as is\" and may be modified, updated, or discontinued at any time without prior notice.",
    ],
  },
  {
    title: "Content Disclaimer",
    content: [
      "All articles on {siteName} are sourced from third-party news providers and may be automatically processed, summarized, or reformatted. We do not guarantee the accuracy, completeness, or timeliness of any content.",
      "The views and opinions expressed in articles do not necessarily reflect the views of {siteName}. We are not responsible for the content of external sources.",
    ],
  },
  {
    title: "Intellectual Property",
    content: [
      "All articles are attributed to their original sources. The {siteName} brand, logo, and site design are our property. You may not reproduce, distribute, or create derivative works from our site design without permission.",
      "You may share links to our articles for non-commercial purposes.",
    ],
  },
  {
    title: "User Conduct",
    content: [
      "You agree not to misuse the service, including but not limited to: scraping content in bulk, attempting to access admin areas without authorization, interfering with site operations, or using the service for any unlawful purpose.",
    ],
  },
  {
    title: "Newsletter",
    content: [
      "By subscribing to our newsletter, you consent to receiving periodic email updates. You may unsubscribe at any time using the link provided in each email.",
    ],
  },
  {
    title: "Advertising",
    content: [
      "This website displays advertisements served by Google AdSense and other third-party advertising networks. Advertisements are clearly distinguished from editorial content. The presence of an advertisement does not imply endorsement of the product, service, or company being advertised.",
      "You agree not to click on advertisements fraudulently or repeatedly with the intent to inflate revenue. Such activity violates Google AdSense policies and may result in account termination.",
    ],
  },
  {
    title: "Limitation of Liability",
    content: [
      "{siteName} shall not be liable for any direct, indirect, incidental, or consequential damages arising from your use of the service. This includes damages from reliance on any content obtained through the service.",
    ],
  },
  {
    title: "Changes to Terms",
    content: [
      "We reserve the right to modify these terms at any time. Changes become effective when posted on this page. Continued use of the site after changes constitutes acceptance of the new terms.",
    ],
  },
];

export default async function Page() {
  const settings = await (await prisma).settings.findUnique({ where: { id: 'default' } });
  const siteName = settings?.siteName || 'Our Website';

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="border-b border-gray-200">
        <div className="container-blog py-8 lg:py-10">
          <p className="text-[10px] font-bold uppercase tracking-widest text-[#1a2b3c] mb-2">Legal</p>
          <h1 className="serif-headline text-2xl lg:text-3xl">Terms of Service</h1>
          <p className="text-sm text-gray-400 mt-1">Last updated: {new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" })}</p>
        </div>
      </div>

      <div className="container-blog py-10 lg:py-14">
        <div className="max-w-3xl space-y-10">
          {sections.map((section, index) => (
            <div key={section.title}>
              <h2 className="font-semibold text-gray-900 mb-3">
                <span className="text-[#1a2b3c] mr-2">{index + 1}.</span>
                {section.title}
              </h2>
              <div className="space-y-3">
                {section.content.map((paragraph, pIndex) => (
                  <p key={pIndex} className="text-sm text-gray-600 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
