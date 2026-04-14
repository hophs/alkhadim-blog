import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import PostCard from "@/components/PostCard";
import { Metadata } from "next";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = await prisma.category.findUnique({ where: { slug } });
  if (!category) return { title: "Category Not Found" };
  return {
    title: `${category.name} News`,
    description: category.description || `Latest ${category.name} news and articles`,
  };
}

export default async function CategoryPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const sp = await searchParams;
  const page = parseInt(sp.page || "1");
  const perPage = 12;

  const category = await prisma.category.findUnique({ where: { slug } });
  if (!category) notFound();

  const [posts, total] = await Promise.all([
    prisma.post.findMany({
      where: { published: true, categoryId: category.id },
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * perPage,
      take: perPage,
      include: { category: true },
    }),
    prisma.post.count({ where: { published: true, categoryId: category.id } }),
  ]);

  const totalPages = Math.ceil(total / perPage);

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="border-b border-gray-200">
        <div className="container-blog py-8 lg:py-10">
          <p className="text-[10px] font-bold uppercase tracking-widest text-[#1a2b3c] mb-2">Category</p>
          <h1 className="serif-headline text-2xl lg:text-3xl">
            {category.name}
          </h1>
          {category.description && (
            <p className="text-gray-500 mt-1">{category.description}</p>
          )}
          <p className="text-sm text-gray-400 mt-1">
            <span className="font-semibold text-gray-900">{total}</span> article{total !== 1 ? "s" : ""}
          </p>
        </div>
      </div>

      <div className="container-blog py-8 lg:py-10">
        {posts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg font-medium">No articles in this category yet.</p>
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
                    href={`/category/${slug}?page=${page - 1}`}
                    className="flex items-center gap-1 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-gray-600 border border-gray-200 rounded-[0.125rem] hover:border-[#1a2b3c] hover:text-[#1a2b3c] transition-colors"
                  >
                    Previous
                  </a>
                )}
                <div className="flex items-center gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                    <a
                      key={p}
                      href={`/category/${slug}?page=${p}`}
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
                    href={`/category/${slug}?page=${page + 1}`}
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
