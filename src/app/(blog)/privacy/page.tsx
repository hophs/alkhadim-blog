import { prisma } from '@/lib/prisma';
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for {siteName} — how we handle your data, use cookies, and protect your privacy. Includes information about Google AdSense advertising.",
};

const sections = [
  {
    title: "Information We Collect",
    content: [
      "We collect minimal personal information. When you subscribe to our newsletter, we collect your email address. When you browse our site, standard server logs may record your IP address, browser type, referring pages, and pages visited.",
      "We also collect non-personal information automatically through cookies and similar technologies, including device type, operating system, browser type, screen resolution, and browsing behavior on our site.",
    ],
  },
  {
    title: "How We Use Your Information",
    content: [
      "Email addresses collected through our newsletter signup are used solely to send you news updates. You can unsubscribe at any time using the link in each email.",
      "Non-personal information is used to analyze site traffic, improve our content and user experience, and serve relevant advertisements through our advertising partners.",
      "Server logs are used for site maintenance, performance monitoring, security, and abuse prevention.",
    ],
  },
  {
    title: "Google AdSense & Advertising",
    content: [
      "We use Google AdSense to display advertisements on our website. Google AdSense uses cookies and web beacons to serve ads based on your prior visits to our website and other websites on the internet.",
      "Google's use of advertising cookies enables it and its partners to serve ads to you based on your visit to our site and/or other sites on the internet. You may opt out of personalized advertising by visiting Google's Ads Settings (https://adssettings.google.com).",
      "Third-party vendors, including Google, use cookies to serve ads based on your prior visits to this website. You may opt out of a third-party vendor's use of cookies for personalized advertising by visiting www.aboutads.info/choices or the Network Advertising Initiative opt-out page at www.networkadvertising.org/choices.",
      "For more information on how Google uses your data, please visit Google's Privacy & Terms page at https://policies.google.com/technologies/partner-sites.",
    ],
  },
  {
    title: "Cookies & Tracking Technologies",
    content: [
      "Our website uses the following types of cookies:",
      "Essential Cookies: Required for site functionality, such as session management and admin authentication. These cannot be disabled.",
      "Analytics Cookies: Help us understand how visitors interact with our website by collecting information anonymously.",
      "Advertising Cookies: Used by Google AdSense and other advertising partners to serve relevant ads based on your browsing behavior. These cookies may track your browsing activity across multiple websites.",
      "You can control cookie preferences through your browser settings. Most browsers allow you to block or delete cookies. However, blocking essential cookies may affect site functionality. When you first visit our site, you will be presented with a cookie consent banner where you can accept or decline non-essential cookies.",
    ],
  },
  {
    title: "Data Storage & Security",
    content: [
      "Your data is stored securely using industry-standard encryption and security practices. Our database employs encryption at rest and in transit.",
      "We retain your personal data only for as long as necessary to provide our services and fulfill the purposes described in this policy. You may request deletion of your personal data at any time by contacting us.",
    ],
  },
  {
    title: "Third-Party Services",
    content: [
      "Our content is sourced from third-party news APIs. These services have their own privacy policies governing data they collect.",
      "We use third-party hosting, infrastructure, and advertising providers to deliver our site. These providers may process data according to their own privacy policies, including but not limited to: Google (AdSense, Analytics), and our hosting provider.",
      "We are not responsible for the privacy practices of third-party websites linked from our content. We encourage you to read the privacy policies of every website you visit.",
    ],
  },
  {
    title: "Your Rights (GDPR / CCPA)",
    content: [
      "If you are a resident of the European Economic Area (EEA), you have the following rights under the General Data Protection Regulation (GDPR): the right to access your personal data, the right to rectification, the right to erasure, the right to restrict processing, the right to data portability, and the right to object to processing.",
      "If you are a California resident, under the California Consumer Privacy Act (CCPA) you have the right to: know what personal information is collected, request deletion of your personal information, opt out of the sale of your personal information, and non-discrimination for exercising your rights.",
      "We do not sell your personal information to third parties.",
      "To exercise any of these rights, please contact us through our contact page. We will respond to your request within 30 days.",
    ],
  },
  {
    title: "Children's Privacy",
    content: [
      "Our website is not directed at children under the age of 13. We do not knowingly collect personal information from children under 13. If you believe we have inadvertently collected information from a child under 13, please contact us and we will promptly delete it.",
    ],
  },
  {
    title: "Changes to This Policy",
    content: [
      "We may update this privacy policy from time to time to reflect changes in our practices or legal requirements. Any changes will be posted on this page with an updated effective date. We encourage you to review this policy periodically.",
    ],
  },
  {
    title: "Contact Us",
    content: [
      "If you have any questions about this Privacy Policy or our data practices, please visit our contact page or email us at contact@autoblog.com.",
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
          <h1 className="serif-headline text-2xl lg:text-3xl">Privacy Policy</h1>
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
