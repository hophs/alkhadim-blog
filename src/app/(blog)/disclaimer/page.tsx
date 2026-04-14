import { prisma } from '@/lib/prisma';
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Disclaimer",
  description: "Disclaimer for {siteName} — important information about our AI-generated news content and editorial practices.",
};

export default async function Page() {
  const settings = await (await prisma).settings.findUnique({ where: { id: 'default' } });
  const siteName = settings?.siteName || 'Our Website';

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="border-b border-gray-200">
        <div className="container-blog py-8 lg:py-10">
          <p className="text-[10px] font-bold uppercase tracking-widest text-[#1a2b3c] mb-2">Legal</p>
          <h1 className="serif-headline text-2xl lg:text-3xl">Disclaimer</h1>
          <p className="text-sm text-gray-400 mt-1">Last updated: {new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" })}</p>
        </div>
      </div>

      <div className="container-blog py-10 lg:py-14">
        <div className="max-w-3xl space-y-10">
          {/* Content Disclaimer */}
          <div>
            <h2 className="font-semibold text-gray-900 mb-3">
              <span className="text-[#1a2b3c] mr-2">1.</span>
              AI-Generated Content
            </h2>
            <div className="space-y-3">
              <p className="text-sm text-gray-600 leading-relaxed">
                {siteName} is an curated news aggregation platform. Articles published on this website are sourced from third-party news providers and may be automatically processed, reformatted, or summarized using AI technology. We do not employ journalists or produce original reporting.
              </p>
              <p className="text-sm text-gray-600 leading-relaxed">
                While we strive to ensure the accuracy and relevance of the content presented, we cannot guarantee that all information is complete, current, or error-free. Readers should verify critical information through official news sources.
              </p>
            </div>
          </div>

          {/* Editorial Independence */}
          <div>
            <h2 className="font-semibold text-gray-900 mb-3">
              <span className="text-[#1a2b3c] mr-2">2.</span>
              Editorial Independence
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              The views and opinions expressed in articles are those of the original authors and publishers. Content presented on {siteName} does not necessarily reflect the opinions, policies, or stance of {siteName} or its operators. We present information from multiple sources to enable readers to form their own views.
            </p>
          </div>

          {/* Source Attribution */}
          <div>
            <h2 className="font-semibold text-gray-900 mb-3">
              <span className="text-[#1a2b3c] mr-2">3.</span>
              Source Attribution
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              All articles include attribution to their original source. We encourage readers to visit the original source links provided with each article for the most accurate, complete, and up-to-date information. Source links are provided as a convenience and do not imply endorsement.
            </p>
          </div>

          {/* No Professional Advice */}
          <div>
            <h2 className="font-semibold text-gray-900 mb-3">
              <span className="text-[#1a2b3c] mr-2">4.</span>
              No Professional Advice
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              Content on {siteName} is for informational purposes only. Nothing on this website constitutes professional advice — whether legal, financial, medical, or otherwise. Readers should consult qualified professionals before making decisions based on information found here.
            </p>
          </div>

          {/* Advertising */}
          <div>
            <h2 className="font-semibold text-gray-900 mb-3">
              <span className="text-[#1a2b3c] mr-2">5.</span>
              Advertisements & Sponsored Content
            </h2>
            <div className="space-y-3">
              <p className="text-sm text-gray-600 leading-relaxed">
                This website may display advertisements served by Google AdSense and other third-party advertising networks. These ads are served based on your browsing history and interests. We do not control the content of third-party advertisements and their appearance does not imply endorsement.
              </p>
              <p className="text-sm text-gray-600 leading-relaxed">
                Ad revenue helps support the operation and maintenance of this website. For more information about how advertising data is used, please refer to our{" "}
                <Link href="/privacy" className="text-[#1a2b3c] font-semibold hover:underline">Privacy Policy</Link>.
              </p>
            </div>
          </div>

          {/* External Links */}
          <div>
            <h2 className="font-semibold text-gray-900 mb-3">
              <span className="text-[#1a2b3c] mr-2">6.</span>
              External Links
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              This website may contain links to external websites and resources. We have no control over the content, privacy policies, or practices of third-party sites and assume no responsibility for them. Clicking on external links is at your own risk.
            </p>
          </div>

          {/* Limitation of Liability */}
          <div>
            <h2 className="font-semibold text-gray-900 mb-3">
              <span className="text-[#1a2b3c] mr-2">7.</span>
              Limitation of Liability
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              {siteName} and its operators shall not be held liable for any losses, damages, or consequences arising from the use of or reliance on information provided on this website. This includes but is not limited to errors, omissions, interruptions, or delays in information delivery.
            </p>
          </div>

          {/* Copyright */}
          <div>
            <h2 className="font-semibold text-gray-900 mb-3">
              <span className="text-[#1a2b3c] mr-2">8.</span>
              Copyright Notice
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              Original content, site design, and branding on {siteName} are copyright of {siteName}. News articles sourced from third-party providers remain the intellectual property of their respective owners and publishers. If you believe any content infringes on your copyright, please{" "}
              <Link href="/contact" className="text-[#1a2b3c] font-semibold hover:underline">contact us</Link>{" "}
              and we will promptly address the matter.
            </p>
          </div>

          {/* Changes */}
          <div>
            <h2 className="font-semibold text-gray-900 mb-3">
              <span className="text-[#1a2b3c] mr-2">9.</span>
              Changes to This Disclaimer
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              We reserve the right to update this disclaimer at any time. Changes take effect immediately upon posting. Continued use of the website after modifications constitutes acceptance of the updated disclaimer.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
