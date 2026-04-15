import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import {
  Clock,
  Calendar,
  ExternalLink,
  Share2,
  Bookmark,
  ChevronRight,
  Mail,
} from "lucide-react";
import { formatDate } from "@/lib/utils";
import BlogAdSlots from "@/components/BlogAdSlots";
import PostComments from "@/components/PostComments";
import SidebarSubscribe from "@/components/SidebarSubscribe";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await prisma.post.findUnique({ where: { slug } });
  if (!post) return { title: "Post Not Found" };
  return {
    title: post.metaTitle || post.title,
    description: post.metaDesc || post.excerpt || "",
    keywords: post.metaKeywords || "",
    openGraph: {
      title: post.metaTitle || post.title,
      description: post.metaDesc || post.excerpt || "",
      images: post.featuredImage ? [{ url: post.featuredImage }] : [],
      type: "article",
      publishedTime: post.publishedAt?.toISOString(),
    },
    twitter: {
      card: "summary_large_image",
      title: post.metaTitle || post.title,
      description: post.metaDesc || post.excerpt || "",
      images: post.featuredImage ? [post.featuredImage] : [],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;

  const [post, settings] = await Promise.all([
    prisma.post.findUnique({
      where: { slug },
      include: {
        category: true,
        author: { select: { name: true, image: true } },
        tags: { include: { tag: true } },
      },
    }),
    prisma.settings.findFirst()
  ]);

  if (!post || !post.published) notFound();

  // Increment views
  await prisma.post.update({
    where: { id: post.id },
    data: { views: { increment: 1 } },
  });

  // Related posts (for sidebar)
  const relatedPosts = await prisma.post.findMany({
    where: {
      published: true,
      id: { not: post.id },
      categoryId: post.categoryId,
    },
    orderBy: { createdAt: "desc" },
    take: 3,
    include: { category: true },
  });

  // Most read posts (for sidebar)
  const mostReadPosts = await prisma.post.findMany({
    where: {
      published: true,
      id: { not: post.id },
    },
    orderBy: { views: "desc" },
    take: 4,
  });

  const date = post.publishedAt || post.createdAt;

  // JSON-LD Structured Data for SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: post.title,
    description: post.excerpt || "",
    image: post.featuredImage ? [post.featuredImage] : [],
    datePublished: (post.publishedAt || post.createdAt).toISOString(),
    dateModified: post.updatedAt.toISOString(),
    author: {
      "@type": "Person",
      name: post.author?.name || settings?.siteName || "Blog",
    },
    publisher: {
      "@type": "Organization",
      name: settings?.siteName || "Blog",
      logo: {
        "@type": "ImageObject",
        url: settings?.logoUrl || `${process.env.NEXT_PUBLIC_SITE_URL || "https://example.com"}/icon.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${process.env.NEXT_PUBLIC_SITE_URL || "https://example.com"}/blog/${post.slug}`,
    },
    ...(post.category && { articleSection: post.category.name }),
    wordCount: post.content.replace(/<[^>]*>/g, "").split(/\s+/).length,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      {/* ─── BREADCRUMB ─── */}
      <nav className="flex items-center gap-2 text-sm text-slate-500 mb-8">
        <Link href="/" className="hover:text-[#1a2b3c] transition-colors">Home</Link>
        <ChevronRight className="w-3 h-3" />
        {post.category ? (
          <>
            <Link
              href={`/category/${post.category.slug}`}
              className="hover:text-[#1a2b3c] transition-colors"
            >
              {post.category.name}
            </Link>
            <ChevronRight className="w-3 h-3" />
          </>
        ) : null}
        <span className="text-slate-900 font-medium truncate max-w-[300px]">{post.title}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* ═══════════════════════════════════════════
            ARTICLE COLUMN
        ═══════════════════════════════════════════ */}
        <article className="lg:col-span-8">
          {/* ─── HEADER ─── */}
          <header className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight mb-4">
              {post.title}
            </h1>

            {post.excerpt && (
              <p className="text-xl text-slate-600 font-medium leading-relaxed mb-8">
                {post.excerpt}
              </p>
            )}

            <div className="flex items-center justify-between py-6 border-y border-slate-200">
              <div className="flex items-center gap-4">
                {post.author?.image ? (
                  <div className="relative h-12 w-12 rounded-full overflow-hidden flex-shrink-0">
                    <Image
                      src={post.author.image}
                      alt={post.author.name || "Author"}
                      fill
                      className="object-cover"
                      sizes="48px"
                    />
                  </div>
                ) : (
                  <div className="h-12 w-12 rounded-full bg-[#1a2b3c] flex items-center justify-center text-white font-bold">
                    {post.author?.name?.charAt(0) || "A"}
                  </div>
                )}
                <div>
                  <p className="font-bold text-slate-900">
                    {post.author?.name || settings?.siteName || "Blog"}
                  </p>
                  <p className="text-sm text-slate-500">
                    {formatDate(date)} &bull; {post.readTime} min read
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="p-2 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
                  <Share2 className="w-5 h-5 text-slate-600" />
                </button>
                <button className="p-2 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
                  <Bookmark className="w-5 h-5 text-slate-600" />
                </button>
              </div>
            </div>
          </header>

          {/* ─── FEATURED IMAGE ─── */}
          {post.featuredImage && (
            <figure className="mb-10">
              <div className="relative w-full h-[450px] rounded-xl overflow-hidden">
                <Image
                  src={post.featuredImage}
                  alt={post.title}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1024px) 100vw, 66vw"
                />
              </div>
              {post.sourceName && (
                <figcaption className="mt-3 text-sm text-slate-500 italic">
                  Photo source: {post.sourceName}
                </figcaption>
              )}
            </figure>
          )}

          {/* ─── CONTENT ─── */}
          <div
            className="prose-blog mb-12"
            dangerouslySetInnerHTML={{
              __html: post.content
                .replace(/\.{3,}\s*\[\+\d+\s*chars?\]/gi, "")
                .replace(/…\s*\[\+\d+\s*chars?\]/gi, "")
                .replace(/\[\+\d+\s*chars?\]/gi, "")
                .replace(/\[Removed\]/gi, "")
                .replace(/\(Source:\s*https?:\/\/[^)]+\)\s*/gi, "")
            }}
          />

          {/* ─── AD: In-Article ─── */}
          <BlogAdSlots placement="inArticle" />

          {/* ─── SOURCE ─── */}
          {post.sourceUrl && (
            <div className="flex items-center gap-3 p-4 bg-[#f6f7f7] border border-gray-200 rounded-lg mb-8">
              <ExternalLink className="w-4 h-4 text-gray-400 flex-shrink-0" />
              <div className="min-w-0">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Source</p>
                <a
                  href={post.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-700 hover:text-[#1a2b3c] hover:underline truncate block"
                >
                  {post.sourceName || post.sourceUrl}
                </a>
              </div>
            </div>
          )}

          {/* ─── TAGS ─── */}
          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-12 pt-8 border-t border-slate-200">
              {post.tags.map(({ tag }: any) => (
                <Link
                  key={tag.id}
                  href={`/tag/${tag.slug}`}
                  className="px-3 py-1 bg-slate-100 text-slate-600 text-sm font-medium rounded-lg hover:bg-[#1a2b3c]/10 hover:text-[#1a2b3c] transition-colors"
                >
                  #{tag.name}
                </Link>
              ))}
            </div>
          )}

          {/* ─── AD: Below Article ─── */}
          <BlogAdSlots placement="belowArticle" />

          {/* ─── COMMENTS SECTION ─── */}
          <PostComments postId={post.id} />
        </article>

        {/* ═══════════════════════════════════════════
            SIDEBAR
        ═══════════════════════════════════════════ */}
        <aside className="lg:col-span-4 space-y-10">
          {/* ─── AD: Sidebar Top ─── */}
          <BlogAdSlots placement="sidebarTop" />

          {/* ─── RELATED STORIES ─── */}
          {relatedPosts.length > 0 && (
            <section>
              <h3 className="text-lg font-bold mb-6 border-b border-[#1a2b3c]/20 pb-2">
                Related Stories
              </h3>
              <div className="space-y-6">
                {relatedPosts.map((rp: any) => (
                  <Link
                    key={rp.id}
                    href={`/blog/${rp.slug}`}
                    className="group flex gap-4"
                  >
                    <div className="relative w-20 h-20 bg-slate-200 rounded-lg overflow-hidden flex-shrink-0">
                      <Image
                        src={rp.featuredImage || "/placeholder.jpg"}
                        alt={rp.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform"
                        sizes="80px"
                      />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm leading-tight group-hover:text-[#1a2b3c] transition-colors line-clamp-2">
                        {rp.title}
                      </h4>
                      <p className="text-xs text-slate-500 mt-1">
                        {rp.category?.name} &bull; {rp.readTime} min read
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* ─── MOST READ ─── */}
          {mostReadPosts.length > 0 && (
            <section className="bg-slate-100 p-6 rounded-xl border border-slate-200">
              <h3 className="text-lg font-bold mb-6 border-b border-[#1a2b3c]/20 pb-2">
                Most Read
              </h3>
              <div className="space-y-6">
                {mostReadPosts.map((mp: any, i: number) => (
                  <div key={mp.id} className="flex gap-4">
                    <span className="text-3xl font-bold text-slate-300 italic">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <Link
                      href={`/blog/${mp.slug}`}
                      className="text-sm font-bold hover:text-[#1a2b3c] transition-colors leading-snug"
                    >
                      {mp.title}
                    </Link>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* ─── NEWSLETTER ─── */}
          <SidebarSubscribe />

          {/* ─── AD: Sidebar Bottom ─── */}
          <BlogAdSlots placement="sidebarBottom" />
        </aside>
      </div>
    </main>
    </>
  );
}
