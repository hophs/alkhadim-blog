"use client";

import { useEffect, useState } from "react";
import { Check, Trash2, Clock, MessageSquare } from "lucide-react";
import toast from "react-hot-toast";

interface AdminComment {
  id: string;
  content: string;
  author: string;
  email: string | null;
  status: string;
  createdAt: string;
  post: {
    id: string;
    title: string;
    slug: string;
  };
}

export default function AdminCommentsPage() {
  const [comments, setComments] = useState<AdminComment[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchComments = async () => {
    try {
      const res = await fetch("/api/admin/comments");
      const data = await res.json();
      if (res.ok) setComments(data.comments);
    } catch (err) {
      toast.error("Failed to load comments.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const handleUpdateStatus = async (id: string, status: string) => {
    try {
      const res = await fetch(`/api/admin/comments`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });
      if (!res.ok) throw new Error();
      toast.success(status === "approved" ? "Comment approved" : "Comment marked as spam");
      setComments((prev) => prev.map((c) => (c.id === id ? { ...c, status } : c)));
    } catch {
      toast.error("Failed to update status");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this comment?")) return;
    try {
      const res = await fetch(`/api/admin/comments?id=${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      toast.success("Comment deleted permanently");
      setComments((prev) => prev.filter((c) => c.id !== id));
    } catch {
      toast.error("Failed to delete comment");
    }
  };

  if (loading) {
    return (
      <div className="animate-pulse space-y-6">
        <div className="h-8 bg-slate-200 rounded w-48 mb-8" />
        <div className="h-64 bg-slate-200 rounded-xl" />
      </div>
    );
  }

  return (
    <div className="animate-fade-in max-w-5xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Moderate Comments</h1>
          <p className="text-slate-500 text-sm mt-1">
            Approve or delete comments submitted by readers.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        {comments.length === 0 ? (
          <div className="p-12 text-center text-slate-500 font-medium flex flex-col items-center gap-3">
             <MessageSquare className="w-10 h-10 text-slate-300" />
             No comments found.
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {comments.map((comment) => (
              <div key={comment.id} className={`p-6 ${comment.status === "pending" ? "bg-amber-50/30" : ""}`}>
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                       <span className="font-semibold text-slate-900">{comment.author}</span>
                       {comment.email && <span className="text-sm text-slate-500">&lt;{comment.email}&gt;</span>}
                       <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                          comment.status === "pending" ? "bg-amber-100 text-amber-700" :
                          comment.status === "approved" ? "bg-green-100 text-green-700" :
                          "bg-red-100 text-red-700"
                       }`}>
                         {comment.status}
                       </span>
                    </div>
                    <p className="text-slate-700 text-sm mb-3">"{comment.content}"</p>
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{new Date(comment.createdAt).toLocaleString()}</span>
                      <span>&bull;</span>
                      <span>Post: <a href={`/blog/${comment.post.slug}`} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">{comment.post.title}</a></span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 shrink-0">
                    {comment.status !== "approved" && (
                       <button
                         onClick={() => handleUpdateStatus(comment.id, "approved")}
                         className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors tooltip"
                         title="Approve"
                       >
                         <Check className="w-5 h-5" />
                       </button>
                    )}
                    <button
                      onClick={() => handleDelete(comment.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors tooltip"
                      title="Delete permanently"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
