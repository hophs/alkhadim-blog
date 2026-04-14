import { prisma } from '@/lib/prisma';
import { Metadata } from "next";
import { Newspaper, Globe, Zap, Shield, Users, BookOpen } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about {siteName} — professional political news and analysis covering wars, international politics, diplomacy, and geopolitics.",
};

const features = [
  {
    icon: Globe,
    title: "Global Coverage",
    description: "We aggregate news from multiple international sources to bring you comprehensive coverage of wars, conflicts, diplomacy, and geopolitics worldwide.",
  },
  {
    icon: Zap,
    title: "professional",
    description: "Our curated system fetches, filters, and curates articles around the clock, ensuring you never miss a critical development on the world stage.",
  },
  {
    icon: Shield,
    title: "Relevance First",
    description: "Advanced filtering ensures only genuinely relevant political and military news reaches our front page — no celebrity gossip, no clickbait.",
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
          <p className="text-[10px] font-bold uppercase tracking-widest text-[#1a2b3c] mb-2">About</p>
          <h1 className="serif-headline text-2xl lg:text-3xl">About {siteName}</h1>
        </div>
      </div>

      <div className="container-blog py-10 lg:py-14">
        <div className="max-w-3xl">
          {/* Intro */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-[#1a2b3c] rounded-[0.25rem] flex items-center justify-center">
              <Newspaper className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="serif-headline text-xl">{siteName} News</h2>
              <p className="text-sm text-gray-500">professional political news & analysis</p>
            </div>
          </div>

          <div className="space-y-5 text-gray-600 leading-relaxed">
            <p>
              {siteName} is an professional news aggregation platform focused on international politics, wars, conflicts, diplomacy, military developments, and geopolitics. We automatically collect articles from trusted news sources around the world and deliver them in a clean, easy-to-read format.
            </p>
            <p>
              Our system connects to multiple news APIs — including GNews, NewsAPI, Currents, NewsData, MediaStack, and TheNewsAPI — rotating between providers to maintain continuous coverage. Each article is filtered for relevance, ensuring our readers see only the stories that matter.
            </p>
            <p>
              When news sources provide only summaries or snippets, our system automatically retrieves the full article content from the original source, so you get complete reporting rather than truncated teasers.
            </p>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12">
            {features.map((feature) => (
              <div key={feature.title} className="border border-gray-200 rounded-[0.25rem] p-5">
                <feature.icon className="w-5 h-5 text-[#1a2b3c] mb-3" />
                <h3 className="font-semibold text-sm text-gray-900 mb-1.5">{feature.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>

          {/* Our Mission */}
          <div className="mt-12 border border-gray-200 rounded-[0.25rem] p-6">
            <div className="flex items-center gap-2 mb-3">
              <BookOpen className="w-4 h-4 text-[#1a2b3c]" />
              <h3 className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Our Mission</h3>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">
              In a world overloaded with information, finding reliable, relevant news about critical geopolitical events shouldn&apos;t be hard. {siteName} cuts through the noise to surface the stories that truly matter — conflicts, diplomatic developments, military operations, and shifts in the global power balance — all in one clean, distraction-free experience.
            </p>
          </div>

          {/* Editorial Standards */}
          <div className="mt-8">
            <div className="flex items-center gap-2 mb-4">
              <Users className="w-4 h-4 text-[#1a2b3c]" />
              <h2 className="font-semibold text-gray-900">Editorial Standards</h2>
            </div>
            <div className="space-y-3 text-sm text-gray-600 leading-relaxed">
              <p>
                While our content is auto-generated, we maintain strict quality controls. Every article goes through relevance filtering to exclude entertainment, sports, celebrity gossip, and other off-topic content. We source from reputable international news agencies and attribute all content to its original publisher.
              </p>
              <p>
                We believe in transparency: {siteName} is an aggregation platform, not a newsroom. We do not produce original reporting. Every article links back to its source, and we encourage readers to consult original sources for the most current information.
              </p>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="mt-8 p-5 bg-[#f6f7f7] rounded-[0.25rem]">
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Disclaimer</h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              {siteName} is an curated news aggregation service. Articles are sourced from third-party news providers and may be automatically summarized or reformatted. We do not produce original journalism. All content is attributed to its original source. For the most accurate and up-to-date information, we recommend visiting the original source links provided with each article. Read our full{" "}
              <Link href="/disclaimer" className="text-[#1a2b3c] font-semibold hover:underline">Disclaimer</Link>.
            </p>
          </div>

          {/* Contact CTA */}
          <div className="mt-8 flex items-center gap-4 p-5 border border-gray-200 rounded-[0.25rem]">
            <div className="flex-1">
              <p className="font-semibold text-gray-900 text-sm">Have questions or feedback?</p>
              <p className="text-sm text-gray-500">We&apos;d love to hear from you.</p>
            </div>
            <Link
              href="/contact"
              className="px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-white bg-[#1a2b3c] hover:bg-[#2a3f54] rounded-[0.125rem] transition-colors flex-shrink-0"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
