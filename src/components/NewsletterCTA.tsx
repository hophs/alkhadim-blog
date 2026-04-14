"use client";

import { useState } from "react";
import { ArrowRight, Mail, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

export default function NewsletterCTA() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "Failed to subscribe.");
      } else {
        toast.success(data.message || "Subscribed successfully!");
        setEmail("");
      }
    } catch (err) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="container-blog py-10 lg:py-14">
      <div className="bg-[#1a2b3c] px-6 py-10 lg:px-12 lg:py-14 rounded-[0.25rem] text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Mail className="w-5 h-5 text-white/60" />
          <p className="text-[10px] font-bold uppercase tracking-widest text-white/50">
            Stay Informed
          </p>
        </div>
        <h2 className="serif-headline text-xl sm:text-2xl lg:text-3xl text-white mb-3 max-w-xl mx-auto">
          Never Miss a Breaking Story
        </h2>
        <p className="text-white/50 text-sm lg:text-base max-w-lg mx-auto mb-8 leading-relaxed">
          Join our newsletter to automatically receive curated highlights of top news straight to your inbox.
        </p>
        <form
          onSubmit={handleSubscribe}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto"
        >
          <input
            type="email"
            placeholder="Your email address"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
            className="w-full sm:flex-1 px-4 py-3 text-sm text-[#1a2b3c] bg-white border-0 rounded-[0.125rem] focus:outline-none focus:ring-2 focus:ring-amber-400 disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={loading || !email}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 text-xs font-bold uppercase tracking-wider text-white bg-blue-600 hover:bg-blue-700 disabled:bg-blue-600/50 rounded-[0.125rem] transition-colors"
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <>
                Subscribe
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>
      </div>
    </section>
  );
}
