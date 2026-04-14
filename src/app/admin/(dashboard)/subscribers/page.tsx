"use client";

import { useState, useEffect } from "react";
import { format } from "date-fns";
import { Mail, Trash2, Loader2, Send } from "lucide-react";

export default function SubscribersPage() {
  const [subscribers, setSubscribers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [broadcasting, setBroadcasting] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchSubscribers();
  }, []);

  const fetchSubscribers = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/subscribers");
      if (!res.ok) throw new Error("Failed to load subscribers");
      const data = await res.json();
      setSubscribers(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteSubscriber = async (id: string) => {
    if (!confirm("Remove this subscriber?")) return;
    try {
      const res = await fetch(`/api/admin/subscribers?id=${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete subscriber");
      setSubscribers(subscribers.filter(s => s.id !== id));
      setMessage("Subscriber removed successfully.");
    } catch (err: any) {
      setError(err.message);
    }
  };

  const broadcastNewsletter = async () => {
    if (!confirm("Are you sure you want to broadcast the latest post to all active subscribers?")) return;
    try {
      setBroadcasting(true);
      setError("");
      setMessage("");
      const res = await fetch("/api/admin/newsletter/send", { method: "POST" });
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || "Failed to broadcast newsletter");
      }
      
      setMessage(data.message || "Newsletter broadcasted successfully!");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setBroadcasting(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Newsletter Leads</h1>
          <p className="text-slate-500 mt-1">View and manage your subscribers</p>
        </div>
        
        <button
          onClick={broadcastNewsletter}
          disabled={broadcasting || subscribers.length === 0}
          className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white px-4 py-2.5 rounded-xl font-medium flex items-center gap-2 transition-colors shadow-sm"
        >
          {broadcasting ? (
            <><Loader2 className="w-4 h-4 animate-spin"/> Sending...</>
          ) : (
            <><Send className="w-4 h-4"/> Broadcast Latest Post</>
          )}
        </button>
      </div>

      {error && <div className="p-4 bg-red-50 text-red-700 rounded-xl text-sm border border-red-100">{error}</div>}
      {message && <div className="p-4 bg-emerald-50 text-emerald-700 rounded-xl text-sm border border-emerald-100">{message}</div>}

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        {loading ? (
          <div className="p-8 flex justify-center text-slate-400">
            <Loader2 className="w-6 h-6 animate-spin" />
          </div>
        ) : subscribers.length === 0 ? (
          <div className="p-12 text-center text-slate-500">
             <Mail className="w-12 h-12 text-slate-300 mx-auto mb-3" />
             <p className="text-lg font-medium text-slate-900">No subscribers yet</p>
             <p className="text-sm mt-1">Enable the newsletter widget in settings to capture leads.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="px-6 py-4 text-sm font-semibold text-slate-600">Email Address</th>
                  <th className="px-6 py-4 text-sm font-semibold text-slate-600">Status</th>
                  <th className="px-6 py-4 text-sm font-semibold text-slate-600">Subscribed On</th>
                  <th className="px-6 py-4 text-sm font-semibold text-slate-600">Source</th>
                  <th className="px-6 py-4 text-sm font-semibold text-slate-600 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {subscribers.map((sub: any) => (
                  <tr key={sub.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-medium text-slate-900">{sub.email}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        sub.status === 'active' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                      }`}>
                        {sub.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">
                      {format(new Date(sub.createdAt), 'MMM d, yyyy h:mm a')}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600 capitalize">
                      {sub.source || 'Widget'}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => deleteSubscriber(sub.id)}
                        className="text-slate-400 hover:text-red-500 transition-colors p-2"
                        title="Remove Lead"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}