import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import BlogAdSlots from "@/components/BlogAdSlots";
import VisitTracker from "@/components/VisitTracker";
import { prisma } from "@/lib/prisma";

export default async function BlogLayout({ children }: { children: React.ReactNode }) {
  const settings = await prisma.settings.findFirst();
  const categories = await prisma.category.findMany({ select: { name: true, slug: true }, orderBy: { name: 'asc' } });

  return (
    <>
      <VisitTracker />
      <ScrollProgress />
      <Header settings={settings} categories={categories} />
      <BlogAdSlots placement="belowHeader" />
      <main className="flex-1">{children}</main>
      <BlogAdSlots placement="footerAbove" />
      <BlogAdSlots placement="sticky" />
      <Footer />
    </>
  );
}
