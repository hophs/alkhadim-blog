"use client";

import { useState } from "react";
import { Mail, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

export default function SidebarSubscribe() {
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
    <section className="bg-[#1a2b3c] text-white p-6 rounded-xl shadow-lg">
      <Mail className="w-10 h-10 mb-4" />
      <h3 className="text-xl font-bold mb-2">Stay Updated Instantly</h3>
      <p className="text-slate-300 text-sm mb-6">
        Get the most important political and geopolitical insights delivered instantly to your inbox.
      </p>
      <form onSubmit={handleSubscribe}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
          required
          className="w-full bg-white/10 border border-white/20 rounded-lg py-2 px-4 text-sm mb-4 placeholder:text-white/50 focus:ring-white focus:border-white outline-none text-white"
          placeholder="Your email address"
        />
        <button
          type="submit"
          disabled={loading || !email}
          className="w-full bg-white text-[#1a2b3c] py-2 rounded-lg font-bold hover:bg-slate-100 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Subscribe Now"}
        </button>
      </form>
    </section>
  );
}
