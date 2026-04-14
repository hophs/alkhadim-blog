import { prisma } from "@/lib/prisma";
import PostCard from "@/components/PostCard";
import { Metadata } from "next";
import { Search } from "lucide-react";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Search",
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const params = await searchParams;
  const q = params.q || "";

  const posts = q
    ? await prisma.post.findMany({
        where: {
          published: true,
          OR: [
            { title: { contains: q, mode: "insensitive" } },
            { content: { contains: q, mode: "insensitive" } },
            { excerpt: { contains: q, mode: "insensitive" } },
          ],
        },
        orderBy: { createdAt: "desc" },
        take: 20,
        include: { category: true },
      })
    : [];

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="border-b border-gray-200">
        <div className="container-blog py-8 lg:py-10">
          <p className="text-[10px] font-bold uppercase tracking-widest text-[#1a2b3c] mb-2">Find</p>
          <h1 className="serif-headline text-2xl lg:text-3xl mb-5">Search</h1>

          <form action="/search" method="GET" className="flex gap-2 max-w-xl">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                name="q"
                defaultValue={q}
                placeholder="Search articles..."
                className="w-full pl-10 pr-4 py-2.5 text-sm bg-[#f6f7f7] border border-gray-200 rounded-[0.25rem] focus:outline-none focus:border-[#1a2b3c] transition-colors"
              />
            </div>
            <button
              type="submit"
              className="px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white bg-[#1a2b3c] hover:bg-[#2a3f54] rounded-[0.125rem] transition-colors"
            >
              Search
            </button>
          </form>
        </div>
      </div>

      <div className="container-blog py-8 lg:py-10">
        {q && (
          <p className="text-gray-500 mb-6">
            <span className="font-semibold text-gray-900">{posts.length}</span> result{posts.length !== 1 ? "s" : ""} for &ldquo;<span className="font-medium text-gray-700">{q}</span>&rdquo;
          </p>
        )}

        {posts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post: any) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          q && (
            <div className="text-center py-20">
              <p className="text-gray-400 text-lg font-medium">No articles found matching your search.</p>
              <p className="text-gray-300 text-sm mt-1">Try different keywords or browse categories.</p>
            </div>
          )
        )}
      </div>
    </div>
  );
}
