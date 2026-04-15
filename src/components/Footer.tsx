import Link from "next/link";
import Image from "next/image";
import { Newspaper, Twitter, Facebook, Linkedin, Rss } from "lucide-react";
import { prisma } from "@/lib/prisma";

const secondaryLinks = [
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
  { name: "Privacy Policy", href: "/privacy" },
  { name: "Terms of Service", href: "/terms" },
  { name: "Disclaimer", href: "/disclaimer" },
];

export default async function Footer() {
  const settings = await prisma.settings.findFirst();
  const siteName = settings?.siteName || "AutoBlog";
  const siteDescription = settings?.siteDescription || "AI-powered political news and analysis. Auto-generated, expertly curated articles delivered fresh.";

  const categories = await prisma.category.findMany({ select: { name: true, slug: true }, orderBy: { name: 'asc' } });

  return (
    <footer className="mt-auto bg-white border-t border-gray-200">
      <div className="container-blog py-10 lg:py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-6">
          {/* Brand */}
          <div className="lg:col-span-4">
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              {settings?.logoUrl ? (
                <Image src={settings.logoUrl} alt={settings?.siteName || "Logo"} width={140} height={40} className="object-contain h-10 w-auto" />
              ) : (
                <>
                  <div className="w-8 h-8 bg-[#1a2b3c] rounded-[0.25rem] flex items-center justify-center">
                    <Newspaper className="w-4 h-4 text-white" />
                  </div>
                  <span className="serif-headline text-lg text-[#1a2b3c]">{siteName}</span>
                </>
              )}
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
              {siteDescription}
            </p>
          </div>

          {/* Navigation */}
          <div className="lg:col-span-3">
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-4">
              Categories
            </h3>
            <ul className="space-y-2.5">
              {categories.map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={`/category/${cat.slug}`}
                    className="text-sm text-gray-600 hover:text-[#1a2b3c] transition-colors"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Secondary Links */}
          <div className="lg:col-span-2">
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-4">
              More
            </h3>
            <ul className="space-y-2.5">
              {secondaryLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-600 hover:text-[#1a2b3c] transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social + CTA */}
          <div className="lg:col-span-3">
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-4">
              Follow Us
            </h3>
            <div className="flex items-center gap-2 mb-6">
              <span className="w-9 h-9 flex items-center justify-center rounded-[0.25rem] bg-[#f6f7f7] text-gray-500 hover:bg-[#1a2b3c] hover:text-white transition-colors cursor-pointer">
                <Twitter className="w-4 h-4" />
              </span>
              <span className="w-9 h-9 flex items-center justify-center rounded-[0.25rem] bg-[#f6f7f7] text-gray-500 hover:bg-[#1a2b3c] hover:text-white transition-colors cursor-pointer">
                <Facebook className="w-4 h-4" />
              </span>
              <span className="w-9 h-9 flex items-center justify-center rounded-[0.25rem] bg-[#f6f7f7] text-gray-500 hover:bg-[#1a2b3c] hover:text-white transition-colors cursor-pointer">
                <Linkedin className="w-4 h-4" />
              </span>
              <span className="w-9 h-9 flex items-center justify-center rounded-[0.25rem] bg-[#f6f7f7] text-gray-500 hover:bg-[#1a2b3c] hover:text-white transition-colors cursor-pointer">
                <Rss className="w-4 h-4" />
              </span>
            </div>
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-white bg-[#1a2b3c] hover:bg-[#2a3f54] rounded-[0.125rem] transition-colors"
            >
              Browse Articles
            </Link>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 pt-6 border-t border-gray-200 text-center">
          <p className="text-xs uppercase tracking-widest text-gray-400">
            &copy; {new Date().getFullYear()} {siteName}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}