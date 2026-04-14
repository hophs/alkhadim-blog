import { prisma } from "@/lib/prisma";
import PostCard from "@/components/PostCard";
import { Metadata } from "next";
import { ChevronLeft, ChevronRight } from "lucide-react";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "All Articles",
  description: "Browse all our latest news articles and stories",
};

export default async function AllPostsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const params = await searchParams;
  const page = parseInt(params.page || "1");
  const perPage = 12;
  const skip = (page - 1) * perPage;

  const [posts, total] = await Promise.all([
    prisma.post.findMany({
      where: { published: true },
      orderBy: { createdAt: "desc" },
      skip,
      take: perPage,
      include: { category: true },
    }),
    prisma.post.count({ where: { published: true } }),
  ]);

  const totalPages = Math.ceil(total / perPage);

  return (
    <div className="animate-fade-in">
      {/* Page Header */}
      <div className="border-b border-gray-200">
        <div className="container-blog py-8 lg:py-10">
          <p className="text-[10px] font-bold uppercase tracking-widest text-[#1a2b3c] mb-2">Archive</p>
          <h1 className="serif-headline text-2xl lg:text-3xl">
            All Articles
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            <span className="font-semibold text-gray-900">{total}</span>{" "}
            article{total !== 1 ? "s" : ""} published &mdash; page {page} of{" "}
            {totalPages || 1}
          </p>
        </div>
      </div>

      <div className="container-blog py-8 lg:py-10">
        {posts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg font-medium">No articles published yet.</p>
            <p className="text-gray-300 text-sm mt-1">Check back soon for fresh content.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post: any) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-12">
                {page > 1 && (
                  <a
                    href={`/blog?page=${page - 1}`}
                    className="flex items-center gap-1 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-gray-600 border border-gray-200 rounded-[0.125rem] hover:border-[#1a2b3c] hover:text-[#1a2b3c] transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Previous
                  </a>
                )}
                <div className="flex items-center gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                    <a
                      key={p}
                      href={`/blog?page=${p}`}
                      className={`w-10 h-10 flex items-center justify-center text-sm font-semibold rounded-[0.125rem] transition-colors ${
                        p === page
                          ? "bg-[#1a2b3c] text-white"
                          : "text-gray-600 hover:bg-[#f6f7f7]"
                      }`}
                    >
                      {p}
                    </a>
                  ))}
                </div>
                {page < totalPages && (
                  <a
                    href={`/blog?page=${page + 1}`}
                    className="flex items-center gap-1 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-gray-600 border border-gray-200 rounded-[0.125rem] hover:border-[#1a2b3c] hover:text-[#1a2b3c] transition-colors"
                  >
                    Next
                    <ChevronRight className="w-4 h-4" />
                  </a>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
