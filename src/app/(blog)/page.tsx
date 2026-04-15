import { prisma } from "@/lib/prisma";
import PostCard from "@/components/PostCard";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Clock,
  Mail,
  TrendingUp,
  Newspaper,
} from "lucide-react";
import { formatDate } from "@/lib/utils";
import BlogAdSlots from "@/components/BlogAdSlots";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const settings = await prisma.settings.findFirst();
  const siteName = settings?.siteName || "";
  const siteDescription = settings?.siteDescription || "";

  const posts = await prisma.post.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
    take: 13,
    include: { category: true },
  });

  const categories = await prisma.category.findMany({
    include: { _count: { select: { posts: { where: { published: true } } } } },
    orderBy: { name: "asc" },
  });

  // Trending posts (most viewed)
  const trendingPosts = await prisma.post.findMany({
    where: { published: true },
    orderBy: { views: "desc" },
    take: 4,
    include: { category: true },
  });

  const featuredPost = posts[0];
  const gridPosts = posts.slice(1, 7);
  const morePosts = posts.slice(7);

  return (
    <div className="animate-fade-in">

      {/* ─── FEATURED ARTICLE ─── */}
      {featuredPost ? (
        <section className="border-b border-gray-200">
          <div className="container-blog py-8 lg:py-10">
            <Link href={`/blog/${featuredPost.slug}`} className="group block">
              <article>
                {/* Featured Image */}
                <div className="relative aspect-[21/9] overflow-hidden rounded-[0.25rem]">
                  <Image
                    src={featuredPost.featuredImage || "/placeholder.jpg"}
                    alt={featuredPost.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="100vw"
                    priority
                  />
                </div>

                {/* Content below image */}
                <div className="mt-5 max-w-3xl">
                  <div className="flex items-center gap-2 mb-3">
                    {featuredPost.category && (
                      <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest bg-[#1a2b3c]/10 text-[#1a2b3c] rounded-[0.125rem]">
                        {featuredPost.category.name}
                      </span>
                    )}
                    <span className="text-xs text-gray-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {formatDate(featuredPost.publishedAt || featuredPost.createdAt)}
                    </span>
                  </div>
                  <h2 className="serif-headline text-2xl sm:text-3xl lg:text-4xl xl:text-[2.75rem] leading-tight mb-3 group-hover:text-[#1a2b3c] transition-colors">
                    {featuredPost.title}
                  </h2>
                  {featuredPost.excerpt && (
                    <p className="text-gray-500 text-base leading-relaxed line-clamp-2 mb-4 max-w-2xl">
                      {featuredPost.excerpt}
                    </p>
                  )}
                  <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#1a2b3c] group-hover:gap-3 transition-all">
                    Read Full Story
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </article>
            </Link>
          </div>
        </section>
      ) : (
        /* ─── EMPTY STATE ─── */
        <section className="border-b border-gray-200">
          <div className="container-blog py-20">
            <div className="text-center max-w-lg mx-auto">
              <div className="w-14 h-14 bg-[#1a2b3c] rounded-[0.5rem] flex items-center justify-center mx-auto mb-6">
                <Newspaper className="w-7 h-7 text-white" />
              </div>
              <h1 className="serif-headline text-3xl lg:text-5xl mb-4">
                Welcome to <span className="text-[#1a2b3c]">{siteName}</span>
              </h1>
              <p className="text-gray-500 text-lg leading-relaxed mb-8">
                {siteDescription}
              </p>
              <Link
                href="/admin"
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-[#1a2b3c] hover:bg-[#2a3f54] rounded-[0.125rem] transition-colors"
              >
                Get Started
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ─── AD: Below Featured ─── */}
      <BlogAdSlots placement="belowFeatured" />

      {/* ─── MAIN CONTENT + SIDEBAR ─── */}
      <section className="container-blog py-10 lg:py-12">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* ─── MAIN CONTENT ─── */}
          <div className="flex-1 min-w-0">
            {gridPosts.length > 0 ? (
              <>
                <div className="flex items-center gap-3 mb-8">
                  <div className="border-l-4 border-[#1a2b3c] pl-3">
                    <h2 className="serif-headline text-xl lg:text-2xl">Latest Reports</h2>
                    <p className="text-xs text-gray-400 mt-0.5">Fresh stories, updated hourly</p>
                  </div>
                  <div className="h-px flex-1 bg-gray-200" />
                  <Link
                    href="/blog"
                    className="flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-[#1a2b3c] hover:underline transition-colors"
                  >
                    View All
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {gridPosts.map((post: any) => (
                    <PostCard key={post.id} post={post} />
                  ))}
                </div>
                <div className="mt-8">
                  <BlogAdSlots placement="native" />
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="w-14 h-14 bg-[#1a2b3c]/10 rounded-[0.5rem] flex items-center justify-center mx-auto mb-6">
                  <Newspaper className="w-7 h-7 text-[#1a2b3c]" />
                </div>
                <h2 className="serif-headline text-xl mb-2">No More Stories Yet</h2>
                <p className="text-sm text-gray-500 max-w-sm mb-6">
                  New articles are auto-generated hourly. Check back soon or trigger a manual post from the admin panel.
                </p>
                <Link
                  href="/admin/auto-post"
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white bg-[#1a2b3c] hover:bg-[#2a3f54] rounded-[0.125rem] transition-colors"
                >
                  Generate Posts
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            )}

            {/* ─── MORE STORIES ─── */}
            {morePosts.length > 0 && (
              <div className="mt-12">
                <div className="flex items-center gap-3 mb-8">
                  <div className="border-l-4 border-[#1a2b3c] pl-3">
                    <h2 className="serif-headline text-xl lg:text-2xl">More Stories</h2>
                  </div>
                  <div className="h-px flex-1 bg-gray-200" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {morePosts.map((post: any) => (
                    <PostCard key={post.id} post={post} />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* ─── SIDEBAR ─── */}
          <aside className="w-full lg:w-80 flex-shrink-0 space-y-8">
            {/* Sidebar Ad — Top */}
            <BlogAdSlots placement="sidebarTop" />

            {/* Newsletter Widget */}
            <div className="bg-[#1a2b3c] text-white p-6 rounded-[0.25rem]">
              <div className="flex items-center gap-2 mb-3">
                <Mail className="w-5 h-5 text-white/70" />
                <h3 className="serif-headline text-lg">Newsletter</h3>
              </div>
              <p className="text-sm text-white/60 mb-4 leading-relaxed">
                Get the latest political news and analysis delivered to your inbox.
              </p>
              <div className="space-y-2">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="w-full px-3 py-2.5 text-sm bg-white/10 border border-white/20 rounded-[0.125rem] placeholder:text-white/40 text-white focus:outline-none focus:border-white/40"
                  readOnly
                />
                <button className="w-full py-2.5 text-sm font-bold bg-white text-[#1a2b3c] rounded-[0.125rem] hover:bg-gray-100 transition-colors">
                  Subscribe
                </button>
              </div>
            </div>

            {/* Trending Topics */}
            {trendingPosts.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-5 pb-3 border-b border-gray-200">
                  <TrendingUp className="w-4 h-4 text-[#1a2b3c]" />
                  <h3 className="text-xs font-bold uppercase tracking-widest text-[#1a2b3c]">Trending Now</h3>
                </div>
                <div className="space-y-4">
                  {trendingPosts.map((post: any, index: number) => (
                    <Link
                      key={post.id}
                      href={`/blog/${post.slug}`}
                      className="group flex gap-3 items-start"
                    >
                      <span className="text-2xl font-bold text-gray-200 leading-none mt-0.5">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <div className="flex-1 min-w-0">
                        {post.category && (
                          <span className="text-[10px] font-bold uppercase tracking-widest text-[#1a2b3c] block mb-1">
                            {post.category.name}
                          </span>
                        )}
                        <h4 className="serif-headline text-sm leading-snug group-hover:text-[#1a2b3c] transition-colors line-clamp-2">
                          {post.title}
                        </h4>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Categories */}
            {categories.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-5 pb-3 border-b border-gray-200">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-[#1a2b3c]">Topics</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {categories.map((cat: any) => (
                    <Link
                      key={cat.id}
                      href={`/category/${cat.slug}`}
                      className="px-3 py-1.5 text-xs font-medium text-gray-600 border border-gray-200 rounded-[0.125rem] hover:border-[#1a2b3c] hover:text-[#1a2b3c] transition-colors"
                    >
                      {cat.name}
                      <span className="text-gray-400 ml-1">{cat._count.posts}</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* CTA Box */}
            <div className="bg-[#f6f7f7] p-6 rounded-[0.25rem] text-center">
              <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Explore</p>
              <p className="serif-headline text-lg mb-3">Discover All Stories</p>
              <p className="text-sm text-gray-500 mb-4 leading-relaxed">
                Browse our complete archive of AI-curated news and analysis.
              </p>
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white bg-[#1a2b3c] hover:bg-[#2a3f54] rounded-[0.125rem] transition-colors"
              >
                Browse All
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Sidebar Ad — Bottom */}
            <BlogAdSlots placement="sidebarBottom" />
          </aside>
        </div>
      </section>
    </div>
  );
}
