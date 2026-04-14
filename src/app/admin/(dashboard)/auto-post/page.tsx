"use client";

import { useState, useEffect } from "react";
import { Bot, Play, RefreshCw, CheckCircle, AlertCircle, Zap } from "lucide-react";
import toast from "react-hot-toast";

interface GenerateResult {
  success?: boolean;
  postId?: string;
  category?: string;
  topic?: string;
  message?: string;
  error?: string;
  mode?: string;
  postsCreated?: number;
  results?: { postId: string; topic: string; apiUsed: string }[];
}

interface ApiLimit {
  name: string;
  limit: number;
}



export default function AutoPostPage() {
  const [generating, setGenerating] = useState(false);
  const [bulkGenerating, setBulkGenerating] = useState(false);
  const [results, setResults] = useState<GenerateResult[]>([]);
  const [apiLimits, setApiLimits] = useState<ApiLimit[]>([]);
  const [autoCategories, setAutoCategories] = useState<{value: string, label: string}[]>([]);

  useEffect(() => {
    fetch("/api/settings")
      .then((r) => r.json())
      .then((data) => {
        const rawCats = data.autoPostCategories 
          ? data.autoPostCategories.split(",").map((t: string) => t.trim().toLowerCase()).filter(Boolean)
          : ["technology", "business", "science", "health", "sports"];
        
        setAutoCategories(rawCats.map((cat: string) => ({
          value: cat,
          label: cat.charAt(0).toUpperCase() + cat.slice(1).replace(/-/g, " ")
        })));
        
        const limits: ApiLimit[] = [];
        if (data.gnewsApiKey) limits.push({ name: "GNews", limit: 100 });
        if (data.newsApiKey) limits.push({ name: "NewsAPI", limit: 100 });
        if (data.currentsApiKey) limits.push({ name: "Currents", limit: 20 });
        if (data.newsDataApiKey) limits.push({ name: "NewsData", limit: 200 });
        if (data.mediaStackApiKey) limits.push({ name: "MediaStack", limit: 100 });
        if (data.theNewsApiKey) limits.push({ name: "TheNewsAPI", limit: 3 });
        setApiLimits(limits);
      });
  }, []);

  const generatePost = async (category?: string) => {
    setGenerating(true);
    try {
      const res = await fetch("/api/auto-generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_CRON_SECRET || ""}`,
        },
        body: category ? JSON.stringify({ category }) : undefined,
      });

      const data = await res.json();
      setResults((prev) => [data, ...prev].slice(0, 10));

      if (data.success) {
        toast.success(`Post generated in ${data.topic || category || "random"} topic!`);
      } else {
        toast.error(data.message || data.error || "No new posts generated");
      }
    } catch {
      toast.error("Failed to generate post");
    } finally {
      setGenerating(false);
    }
  };

  const generateBatch = async () => {
    setGenerating(true);
    for (const cat of autoCategories.slice(0, 4)) {
      try {
        const res = await fetch("/api/auto-generate", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_CRON_SECRET || ""}`,
          },
          body: JSON.stringify({ category: cat.value }),
        });
        const data = await res.json();
        setResults((prev) => [{ ...data, category: cat.value }, ...prev].slice(0, 20));
      } catch {
        // continue with next category
      }
    }
    toast.success("Batch generation complete!");
    setGenerating(false);
  };

  const generateBulk = async () => {
    setBulkGenerating(true);
    try {
      const res = await fetch("/api/auto-generate?bulk=true", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_CRON_SECRET || ""}`,
        },
      });
      const data = await res.json();
      setResults((prev) => [data, ...prev].slice(0, 20));

      if (data.success) {
        toast.success(`Bulk generation complete! ${data.postsCreated} posts created from all APIs.`);
      } else {
        toast.error(data.message || data.error || "Bulk generation failed");
      }
    } catch {
      toast.error("Failed to bulk generate posts");
    } finally {
      setBulkGenerating(false);
    }
  };

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
          <Bot className="w-6 h-6 text-blue-600" />
          Auto Posting
        </h1>
        <p className="text-slate-500 text-sm mt-1">
          Generate blog posts across your configured categories automatically. Trigger generation
          manually below or set up a cron job to call the API endpoint.
        </p>
      </div>

      {/* API Status */}
      {apiLimits.length > 0 && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 mb-6">
          <h3 className="font-semibold mb-3">Configured News APIs</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 mb-4">
            {apiLimits.map((api) => (
              <div
                key={api.name}
                className="bg-green-50 border border-green-200 rounded-lg px-3 py-2 text-center"
              >
                <p className="text-xs font-bold text-green-700">{api.name}</p>
                <p className="text-sm font-semibold text-green-600">{api.limit}/day</p>
              </div>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-blue-50 rounded-lg p-3">
            <p className="text-sm text-blue-700">
              <span className="font-semibold">Total daily capacity:</span>{" "}
              ~{apiLimits.reduce((s, a) => s + a.limit, 0)} API requests across {apiLimits.length} providers
            </p>
            <button
              onClick={generateBulk}
              disabled={bulkGenerating || generating}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all disabled:opacity-50 shrink-0"
            >
              {bulkGenerating ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <Zap className="w-4 h-4" />
              )}
              Bulk Generate
            </button>
          </div>
        </div>
      )}

      {apiLimits.length === 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6">
          <p className="text-sm text-amber-700">
            <strong>No API keys configured.</strong> Go to{" "}
            <a href="/admin/settings" className="text-blue-600 underline">Settings</a>{" "}
            to add news API keys. Without them, mock data will be used for generation.
          </p>
        </div>
      )}

      {/* Manual Trigger */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 mb-6">
        <h3 className="font-semibold mb-4">Manual Generation</h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-4">
          {autoCategories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => generatePost(cat.value)}
              disabled={generating}
              className="flex flex-col items-center gap-2 p-4 rounded-xl border border-slate-200 hover:border-blue-300 hover:bg-blue-50/50 transition-all disabled:opacity-50"
            >
              <span className="text-2xl">📰</span>
              <span className="text-xs text-center font-medium text-slate-600">{cat.label}</span>
            </button>
          ))}
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => generatePost()}
            disabled={generating}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-blue-600 rounded-xl hover:bg-blue-700 transition-all disabled:opacity-50"
          >
            {generating ? (
              <RefreshCw className="w-4 h-4 animate-spin" />
            ) : (
              <Play className="w-4 h-4" />
            )}
            Generate Random Post
          </button>
          <button
            onClick={generateBatch}
            disabled={generating}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-all disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${generating ? "animate-spin" : ""}`} />
            Generate All Categories
          </button>
        </div>
      </div>

      {/* API Info */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 mb-6">
        <h3 className="font-semibold mb-3">API Endpoint for Auto-Posting</h3>
        <p className="text-sm text-slate-500 mb-3">
          Set up a cron job (e.g., Vercel Cron, cron-job.org) to call this endpoint at your desired interval:
        </p>
        <div className="bg-slate-900 rounded-lg p-4 text-sm font-mono text-green-400 overflow-x-auto">
          <p>POST /api/auto-generate</p>
          <p className="text-slate-500 mt-1">Authorization: Bearer YOUR_CRON_SECRET</p>
          <p className="text-slate-500 mt-2"># Or use bulk mode to fetch from all APIs:</p>
          <p className="text-green-400">POST /api/auto-generate?bulk=true</p>
        </div>
        <p className="text-xs text-slate-400 mt-3">
          Set CRON_SECRET in your environment variables and use it in the Authorization header.
        </p>
      </div>

      {/* Results */}
      {results.length > 0 && (
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h3 className="font-semibold mb-4">Generation Log</h3>
          <div className="space-y-2">
            {results.map((result, i) => (
              <div
                key={i}
                className={`flex items-start gap-3 p-3 rounded-lg text-sm ${
                  result.success
                    ? "bg-green-50 text-green-700"
                    : "bg-amber-50 text-amber-700"
                }`}
              >
                {result.success ? (
                  <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                )}
                <div>
                  {result.mode === "bulk" ? (
                    <>
                      <span className="font-semibold">Bulk generation: {result.postsCreated} posts created</span>
                      {result.results && result.results.length > 0 && (
                        <div className="mt-1 space-y-0.5">
                          {result.results.map((r, j) => (
                            <p key={j} className="text-xs opacity-80">
                              • {r.topic} via {r.apiUsed}
                            </p>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <span>
                      {result.success
                        ? `Post generated successfully in "${result.category || result.topic}" topic`
                        : result.message || result.error || "No new post generated"}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
