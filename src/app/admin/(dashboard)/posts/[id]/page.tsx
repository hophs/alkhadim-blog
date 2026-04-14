"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { Save, Eye, EyeOff, ArrowLeft, Trash2, ImageIcon } from "lucide-react";
import toast from "react-hot-toast";

interface Category {
  id: string;
  name: string;
}

export default function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    title: "",
    content: "",
    excerpt: "",
    featuredImage: "",
    categoryId: "",
    metaTitle: "",
    metaDesc: "",
    metaKeywords: "",
    tags: "",
    published: false,
  });

  useEffect(() => {
    Promise.all([
      fetch(`/api/posts/${id}`).then((r) => r.json()),
      fetch("/api/categories").then((r) => r.json()),
    ]).then(([post, cats]) => {
      if (post.error) {
        toast.error("Post not found");
        router.push("/admin/posts");
        return;
      }
      setForm({
        title: post.title || "",
        content: post.content || "",
        excerpt: post.excerpt || "",
        featuredImage: post.featuredImage || "",
        categoryId: post.categoryId || "",
        metaTitle: post.metaTitle || "",
        metaDesc: post.metaDesc || "",
        metaKeywords: post.metaKeywords || "",
        tags: post.tags?.map((t: { tag: { name: string } }) => t.tag.name).join(", ") || "",
        published: post.published || false,
      });
      setCategories(cats);
      setLoading(false);
    });
  }, [id, router]);

  const handleSave = async (publish?: boolean) => {
    if (!form.title.trim() || !form.content.trim()) {
      toast.error("Title and content are required");
      return;
    }

    setSaving(true);
    try {
      const res = await fetch(`/api/posts/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          published: publish !== undefined ? publish : form.published,
          tags: form.tags
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean),
        }),
      });

      if (!res.ok) {
        toast.error("Failed to save");
        return;
      }

      toast.success("Post updated!");
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this post?")) return;
    const res = await fetch(`/api/posts/${id}`, { method: "DELETE" });
    if (res.ok) {
      toast.success("Post deleted");
      router.push("/admin/posts");
    }
  };

  if (loading) {
    return (
      <div className="animate-pulse space-y-6 max-w-4xl">
        <div className="h-8 bg-slate-200 rounded w-48" />
        <div className="h-40 bg-slate-200 rounded-xl" />
        <div className="h-80 bg-slate-200 rounded-xl" />
      </div>
    );
  }

  return (
    <div className="animate-fade-in max-w-4xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.back()}
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-all"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-2xl font-bold tracking-tight">Edit Post</h1>
        </div>
        <div className="flex gap-2 self-start sm:self-auto">
          <button
            onClick={handleDelete}
            className="p-2.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
            title="Delete"
          >
            <Trash2 className="w-4.5 h-4.5" />
          </button>
          <button
            onClick={() => handleSave()}
            disabled={saving}
            className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-all disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            Save
          </button>
          <button
            onClick={() => handleSave(!form.published)}
            disabled={saving}
            className={`inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-xl transition-all disabled:opacity-50 ${
              form.published
                ? "text-amber-700 bg-amber-100 hover:bg-amber-200"
                : "text-white bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {form.published ? (
              <>
                <EyeOff className="w-4 h-4" /> Unpublish
              </>
            ) : (
              <>
                <Eye className="w-4 h-4" /> Publish
              </>
            )}
          </button>
        </div>
      </div>

      <div className="space-y-6">
        {/* Title */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <input
            type="text"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            placeholder="Post title..."
            className="w-full text-2xl font-bold border-0 outline-none placeholder:text-slate-300"
          />
        </div>

        {/* Content */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <label className="block text-sm font-medium text-slate-700 mb-2">Content (HTML)</label>
          <textarea
            value={form.content}
            onChange={(e) => setForm({ ...form, content: e.target.value })}
            placeholder="Write your article content here..."
            rows={18}
            className="w-full text-sm border border-slate-200 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 font-mono resize-y"
          />
        </div>

        {/* Details */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-5">
          <h3 className="font-semibold text-slate-700">Post Details</h3>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Excerpt</label>
            <textarea
              value={form.excerpt}
              onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
              rows={3}
              className="w-full text-sm border border-slate-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 resize-y"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              <ImageIcon className="w-4 h-4 inline mr-1" />
              Featured Image URL
            </label>
            <input
              type="url"
              value={form.featuredImage}
              onChange={(e) => setForm({ ...form, featuredImage: e.target.value })}
              className="w-full text-sm border border-slate-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            />
            {form.featuredImage && (
              <img
                src={form.featuredImage}
                alt="Preview"
                className="mt-3 rounded-lg max-h-48 object-cover"
              />
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Category</label>
              <select
                value={form.categoryId}
                onChange={(e) => setForm({ ...form, categoryId: e.target.value })}
                className="w-full text-sm border border-slate-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              >
                <option value="">No category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Tags</label>
              <input
                type="text"
                value={form.tags}
                onChange={(e) => setForm({ ...form, tags: e.target.value })}
                placeholder="tag1, tag2, tag3"
                className="w-full text-sm border border-slate-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        {/* SEO */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-5">
          <h3 className="font-semibold text-slate-700">SEO Settings</h3>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Meta Title</label>
            <input
              type="text"
              value={form.metaTitle}
              onChange={(e) => setForm({ ...form, metaTitle: e.target.value })}
              className="w-full text-sm border border-slate-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Meta Description</label>
            <textarea
              value={form.metaDesc}
              onChange={(e) => setForm({ ...form, metaDesc: e.target.value })}
              rows={2}
              className="w-full text-sm border border-slate-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 resize-y"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Meta Keywords</label>
            <input
              type="text"
              value={form.metaKeywords}
              onChange={(e) => setForm({ ...form, metaKeywords: e.target.value })}
              className="w-full text-sm border border-slate-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
