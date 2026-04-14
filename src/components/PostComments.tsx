"use client";

import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { MessageSquare, User, Loader2 } from "lucide-react";
import { formatDate } from "@/lib/utils";

interface Comment {
  id: string;
  author: string;
  content: string;
  createdAt: string;
}

export default function PostComments({ postId }: { postId: string }) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [author, setAuthor] = useState("");
  const [email, setEmail] = useState("");
  const [content, setContent] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetch(`/api/comments?postId=${postId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.comments) setComments(data.comments);
      })
      .catch((err) => console.error("Error loading comments", err))
      .finally(() => setLoading(false));
  }, [postId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!author || !content) return;

    setSubmitting(true);
    try {
      const res = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ postId, content, author, email }),
      });
      const data = await res.json();
      
      if (!res.ok) throw new Error(data.error);

      toast.success(data.message || "Submitted successfully!");
      setAuthor("");
      setEmail("");
      setContent("");
    } catch (err) {
      toast.error("Failed to post comment.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mt-12 bg-white rounded-xl border border-slate-100 p-6 md:p-8" id="comments">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
          <MessageSquare className="w-5 h-5" />
        </div>
        <h2 className="text-2xl font-bold text-slate-800">
          Discussion ({comments.length})
        </h2>
      </div>

      <div className="mb-10 bg-slate-50 p-6 rounded-xl border border-slate-100">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">Leave a Reply</h3>
        <p className="text-sm text-slate-500 mb-6">Your email address will not be published. Required fields are marked *</p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="w-full p-3 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-white"
                placeholder="John Doe"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Email <span className="text-slate-400 font-normal">(optional)</span>
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-white"
                placeholder="john@example.com"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Comment <span className="text-red-500">*</span>
            </label>
            <textarea
              required
              rows={4}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full p-3 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-white resize-y"
              placeholder="What are your thoughts?"
            />
          </div>
          <button
            type="submit"
            disabled={submitting || !author || !content}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[150px]"
          >
            {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : "Post Comment"}
          </button>
        </form>
      </div>

      <div className="space-y-6">
        {loading ? (
          <div className="animate-pulse space-y-4">
            <div className="h-24 bg-slate-100 rounded-xl" />
            <div className="h-24 bg-slate-100 rounded-xl" />
          </div>
        ) : comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment.id} className="flex gap-4 group">
              <div className="shrink-0 w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 mt-1">
                <User className="w-5 h-5" />
              </div>
              <div className="flex-1 bg-white border border-slate-100 rounded-xl p-5 shadow-sm group-hover:border-slate-200 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-bold text-slate-800 text-sm">{comment.author}</h4>
                  <span className="text-xs text-slate-400">{formatDate(comment.createdAt)}</span>
                </div>
                <p className="text-slate-600 text-sm whitespace-pre-wrap leading-relaxed">
                  {comment.content}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-slate-500 text-sm">
            No comments yet. Be the first to share your thoughts!
          </div>
        )}
      </div>
    </div>
  );
}