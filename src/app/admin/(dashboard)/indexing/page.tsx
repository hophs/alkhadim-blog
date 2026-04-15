"use client";

import { FileJson, UserPlus, Server, CheckCircle2, UploadCloud, Trash2, Loader2 } from "lucide-react";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import toast from "react-hot-toast";

export default function IndexingSetupPage() {
  const [keyExists, setKeyExists] = useState(false);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    checkKeyStatus();
  }, []);

  const checkKeyStatus = async () => {
    try {
      const res = await fetch("/api/admin/indexing/key");
      const data = await res.json();
      setKeyExists(!!data.exists);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== "application/json" && !file.name.endsWith('.json')) {
      toast.error("Please upload a valid JSON file.");
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/admin/indexing/key", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to upload key file");
      }

      toast.success("Google Indexing Key successfully installed!");
      setKeyExists(true);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (e: any) {
      toast.error(e.message);
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteKey = async () => {
    if (!confirm("Are you sure you want to delete this specific API key? Google Indexing functionality will pause until a new key is added.")) {
      return;
    }

    try {
      const res = await fetch("/api/admin/indexing/key", { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete key file");
      
      toast.success("Key successfully removed");
      setKeyExists(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (e: any) {
      toast.error(e.message);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Auto Indexing Setup</h1>
        <p className="text-slate-500 mt-1">
          Automatically force Google to index your new blog posts the second they are created. No waiting for sitemap crawls.
        </p>
      </div>

      <div className="bg-blue-50 border border-blue-100 rounded-xl p-5 text-sm text-blue-800">
        <p>
          <strong>Why this matters:</strong> Search engines usually rely on visiting your <code>/sitemap.xml</code> on their own schedule (which can take days). By configuring the Google Indexing API, this application will aggressively <strong>Ping Google</strong> the exact moment a new article is generated, often getting it into search results within minutes.
        </p>
      </div>

      <div className="space-y-6">
        {/* Step 1 */}
        <section className="bg-white border text-slate-700 border-slate-200 rounded-xl p-6 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-blue-500"></div>
          <div className="flex flex-col sm:flex-row items-start gap-4">
             <div className="bg-blue-100 text-blue-600 p-2 rounded-lg mt-1 shrink-0">
                <Server className="w-5 h-5" />
             </div>
             <div>
                <h3 className="font-bold text-lg text-slate-900 mb-2">Step 1: Create a Google Cloud Project & Service Account</h3>
                <ol className="list-decimal list-inside space-y-2 text-sm">
                  <li>Go to the <a href="https://console.cloud.google.com/" target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">Google Cloud Console</a>.</li>
                  <li>Create a new project (e.g., "Blog Indexing").</li>
                  <li>Navigate to <strong>APIs & Services &gt; Library</strong> and search for <strong>"Web Search Indexing API"</strong>. Click <strong>Enable</strong>.</li>
                  <li>Go to <strong>IAM & Admin &gt; Service Accounts</strong> and click <strong>Create Service Account</strong>.</li>
                  <li>Give it a name (e.g., <code>indexing-bot</code>) and click <strong>Done</strong>.</li>
                  <li>Find the newly created service account in the list, click the three dots on the right, and select <strong>Manage Keys</strong>.</li>
                  <li>Click <strong>Add Key &gt; Create new key</strong>, choose <strong>JSON</strong>, and download it to your computer.</li>
                  <li>Open the downloaded JSON file in a text editor. You will see a <code>client_email</code> field. <strong>Copy this email address.</strong></li>
                </ol>
             </div>
          </div>
        </section>

        {/* Step 2 */}
        <section className="bg-white border text-slate-700 border-slate-200 rounded-xl p-6 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-purple-500"></div>
          <div className="flex flex-col sm:flex-row items-start gap-4">
             <div className="bg-purple-100 text-purple-600 p-2 rounded-lg mt-1 shrink-0">
                <UserPlus className="w-5 h-5" />
             </div>
             <div>
                <h3 className="font-bold text-lg text-slate-900 mb-2">Step 2: Grant Access in Google Search Console</h3>
                <p className="text-sm mb-3">You must give the bot permission to tell Google about your specific website.</p>
                <ol className="list-decimal list-inside space-y-2 text-sm">
                  <li>Go to <a href="https://search.google.com/search-console" target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">Google Search Console</a>.</li>
                  <li>Select your verified domain/property from the top-left dropdown.</li>
                  <li>Go to <strong>Settings &gt; Users & Permissions</strong>.</li>
                  <li>Click <strong>Add User</strong>.</li>
                  <li>Paste the <code>client_email</code> you copied in Step 1 into the Email address field.</li>
                  <li>Set the <strong>Permission</strong> to <strong>"Owner"</strong>.</li>
                  <li>Click <strong>Add</strong>.</li>
                </ol>
             </div>
          </div>
        </section>

        {/* Step 3 */}
        <section className="bg-white border text-slate-700 border-slate-200 rounded-xl p-6 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500"></div>
          <div className="flex flex-col sm:flex-row items-start gap-4">
             <div className="bg-emerald-100 text-emerald-600 p-2 rounded-lg mt-1 shrink-0">
                <FileJson className="w-5 h-5" />
             </div>
             <div className="flex-1 w-full">
                <h3 className="font-bold text-lg text-slate-900 mb-2">Step 3: Connect your Application Key</h3>
                <p className="text-sm mb-5 text-slate-600">
                  Upload the massive JSON Key file that you downloaded in Step 1 here. We securely place it in the system directory for you.
                </p>

                {loading ? (
                    <div className="flex items-center justify-center p-8 bg-slate-50 rounded-xl border border-slate-200 border-dashed">
                        <Loader2 className="w-6 h-6 animate-spin text-slate-400" />
                    </div>
                ) : keyExists ? (
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 bg-emerald-50 rounded-xl border border-emerald-200">
                        <div className="flex items-center gap-3">
                           <div className="bg-white p-2 rounded-full shadow-sm">
                             <CheckCircle2 className="w-6 h-6 text-emerald-500" />
                           </div>
                           <div>
                              <p className="font-medium text-emerald-900 leading-tight">API Key Installed & Working</p>
                              <p className="text-xs text-emerald-700 mt-1">google-service-account.json is securely stored.</p>
                           </div>
                        </div>
                        <button 
                          onClick={handleDeleteKey}
                          className="text-xs bg-white text-red-600 hover:text-red-700 border border-red-200 px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors shadow-sm"
                        >
                           <Trash2 className="w-3.5 h-3.5" />
                           Remove Key
                        </button>
                    </div>
                ) : (
                    <div className="flex items-center justify-center w-full">
                        <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-40 border-2 border-slate-300 border-dashed rounded-xl cursor-pointer bg-slate-50 hover:bg-slate-100/50 hover:border-slate-400 transition-all group">
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                {uploading ? (
                                   <Loader2 className="w-8 h-8 mb-3 text-slate-400 animate-spin" />
                                ) : (
                                   <UploadCloud className="w-8 h-8 mb-3 text-slate-400 group-hover:text-blue-500 transition-colors" />
                                )}
                                <p className="mb-2 text-sm text-slate-500"><span className="font-semibold text-slate-700">Click to upload</span> or drag and drop</p>
                                <p className="text-xs text-slate-400">JSON API Key File Only (.json)</p>
                            </div>
                            <input 
                               ref={fileInputRef}
                               id="dropzone-file" 
                               type="file" 
                               accept=".json,application/json" 
                               className="hidden" 
                               onChange={handleFileUpload}
                               disabled={uploading}
                            />
                        </label>
                    </div>
                )}
             </div>
          </div>
        </section>

        {/* Success Header */}
        {keyExists && (
            <div className="p-6 bg-slate-900 text-white rounded-xl shadow-lg mt-8 flex flex-col sm:flex-row gap-6 items-center justify-between">
               <div>
                  <h3 className="font-bold text-lg flex items-center gap-2 mb-1">
                     <CheckCircle2 className="text-emerald-400 w-5 h-5" />
                     Ready to auto-index!
                  </h3>
                  <p className="text-slate-400 text-sm">
                     The system will now automatically ping Google Search Console every time a new blog post is officially published via the auto-generator.
                  </p>
               </div>
               <Link href="/admin/auto-post" className="bg-white text-slate-900 px-5 py-2.5 rounded-lg font-medium text-sm whitespace-nowrap hover:bg-slate-100 transition-colors">
                  Go to Auto-Posting
               </Link>
            </div>
        )}

      </div>
    </div>
  );
}