import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import PostCard from "@/components/PostCard";
import { Metadata } from "next";
import { Tag } from "lucide-react";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tag = await prisma.tag.findUnique({ where: { slug } });
  if (!tag) return { title: "Tag Not Found" };
  return {
    title: `${tag.name} — Tagged Articles`,
    description: `Articles tagged with "${tag.name}"`,
  };
}

export default async function TagPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const sp = await searchParams;
  const page = parseInt(sp.page || "1");
  const perPage = 12;

  const tag = await prisma.tag.findUnique({ where: { slug } });
  if (!tag) notFound();

  const [tagOnPosts, total] = await Promise.all([
    prisma.tagOnPost.findMany({
      where: { tagId: tag.id },
      skip: (page - 1) * perPage,
      take: perPage,
      orderBy: { post: { createdAt: "desc" } },
      include: {
        post: {
          include: { category: true },
        },
      },
    }),
    prisma.tagOnPost.count({ where: { tagId: tag.id } }),
  ]);

  const posts = tagOnPosts
    .map((tp: any) => tp.post)
    .filter((post: any) => post.published);

  const totalPages = Math.ceil(total / perPage);

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="border-b border-gray-200">
        <div className="container-blog py-8 lg:py-10">
          <div className="flex items-center gap-2 mb-2">
            <Tag className="w-3.5 h-3.5 text-[#1a2b3c]" />
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#1a2b3c]">Tag</p>
          </div>
          <h1 className="serif-headline text-2xl lg:text-3xl">{tag.name}</h1>
          <p className="text-sm text-gray-400 mt-1">
            <span className="font-semibold text-gray-900">{total}</span> article{total !== 1 ? "s" : ""}
          </p>
        </div>
      </div>

      <div className="container-blog py-8 lg:py-10">
        {posts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg font-medium">No articles with this tag yet.</p>
            <p className="text-gray-300 text-sm mt-1">Check back soon for fresh content.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post: any) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>

            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-12">
                {page > 1 && (
                  <a
                    href={`/tag/${slug}?page=${page - 1}`}
                    className="flex items-center gap-1 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-gray-600 border border-gray-200 rounded-[0.125rem] hover:border-[#1a2b3c] hover:text-[#1a2b3c] transition-colors"
                  >
                    Previous
                  </a>
                )}
                <div className="flex items-center gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                    <a
                      key={p}
                      href={`/tag/${slug}?page=${p}`}
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
                    href={`/tag/${slug}?page=${page + 1}`}
                    className="flex items-center gap-1 px-4 py-2 text-sm font-semibold text-gray-600 border border-gray-200 hover:border-gray-400 hover:text-gray-900 transition-colors"
                  >
                    Next
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
