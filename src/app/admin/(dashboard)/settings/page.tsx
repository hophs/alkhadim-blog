"use client";

import { useEffect, useState } from "react";
import { Save, RefreshCw, LayoutTemplate, Settings, Code, CircleDollarSign, Fingerprint, Database, Globe, Mail } from "lucide-react";
import toast from "react-hot-toast";

interface SettingsData {
  siteName: string;
  siteDescription: string;
  siteUrl: string;
  faviconUrl: string;
  logoUrl: string;
  metaImage: string;
  primaryColor: string;
  accentColor: string;
  headerStyle: string;
  postsPerPage: number;
  autoPostEnabled: boolean;
  autoPostInterval: number;
  autoPostCategories: string;
  newsApiKey: string;
  gnewsApiKey: string;
  currentsApiKey: string;
  newsDataApiKey: string;
  mediaStackApiKey: string;
  theNewsApiKey: string;
  preferredNewsApi: string;
  openaiApiKey: string;
  preferredAiApi: string;
  adsEnabled: boolean;
  adHeaderScript: string;
  adBelowHeader: string;
  adSidebarTop: string;
  adSidebarBottom: string;
  adInArticle: string;
  adBelowArticle: string;
  adBelowFeatured: string;
  adFooterAbove: string;
  adPopunder: string;
  adReward: string;
  adInterstitial: string;
  adNative: string;
  adSticky: string;
  newsletterEnabled: boolean;
  autoSendNewsletter: boolean;
  newsletterProvider: string;
  smtpHost: string;
  smtpPort: number;
  smtpUser: string;
  smtpPassword: string;
  smtpFromEmail: string;
  mailchimpApiKey: string;
  mailchimpListId: string;
  customHeadCode: string;
  customBodyStart: string;
  customFooterCode: string;
  contactEmail: string;
  contactPhone: string;
  contactAddress: string;
}

export default function SettingsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('general');

  const [form, setForm] = useState<SettingsData>({
    siteName: "",
    siteDescription: "",
    siteUrl: "",
    faviconUrl: "",
    logoUrl: "",
    metaImage: "",
    primaryColor: "#1a2b3c",
    accentColor: "#3b82f6",
    headerStyle: "default",
    postsPerPage: 10,
    autoPostEnabled: false,
    autoPostInterval: 12,
    autoPostCategories: "",
    newsApiKey: "",
    gnewsApiKey: "",
    currentsApiKey: "",
    newsDataApiKey: "",
    mediaStackApiKey: "",
    theNewsApiKey: "",
    preferredNewsApi: "gnews",
    openaiApiKey: "",
    preferredAiApi: "basic",
    adsEnabled: false,
    adHeaderScript: "",
    adBelowHeader: "",
    adSidebarTop: "",
    adSidebarBottom: "",
    adInArticle: "",
    adBelowArticle: "",
    adBelowFeatured: "",
    adFooterAbove: "",
    adPopunder: "",
    adReward: "",
    adInterstitial: "",
    adNative: "",
    adSticky: "",
    newsletterEnabled: true,
    autoSendNewsletter: false,
    newsletterProvider: "local",
    smtpHost: "",
    smtpPort: 587,
    smtpUser: "",
    smtpPassword: "",
    smtpFromEmail: "",
    mailchimpApiKey: "",
    mailchimpListId: "",
    customHeadCode: "",
    customBodyStart: "",
    customFooterCode: "",
    contactEmail: "",
    contactPhone: "",
    contactAddress: "",
  });

  useEffect(() => {
    fetch("/api/settings")
      .then((res) => res.json())
      .then((data) => {
        setForm((prev) => ({ ...prev, ...data }));
        setLoading(false);
      });
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Failed to save settings");
      toast.success("Settings saved successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to save settings");
    } finally {
      setSaving(false);
    }
  };

  const tabs = [
    { id: 'general', label: 'General & SEO', icon: Globe },
    { id: 'branding', label: 'Branding', icon: LayoutTemplate },
    { id: 'contact', label: 'Contact Info', icon: Mail },
    { id: 'apis', label: 'APIs & Automation', icon: Database },
    { id: 'ads', label: 'Advertisements', icon: CircleDollarSign },
    { id: 'newsletter', label: 'Newsletter & SMTP', icon: Mail },
    { id: 'code', label: 'Custom Code', icon: Code },
  ];

  if (loading) {
    return (
      <div className="animate-pulse space-y-6 max-w-4xl opacity-50">
        <div className="h-8 bg-slate-200 rounded w-48 mb-8" />
        <div className="flex gap-2">
           <div className="h-10 bg-slate-200 rounded w-24" />
           <div className="h-10 bg-slate-200 rounded w-24" />
           <div className="h-10 bg-slate-200 rounded w-24" />
        </div>
        <div className="h-96 bg-slate-200 rounded-xl" />
      </div>
    );
  }

  return (
    <div className="animate-fade-in max-w-5xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">System Settings</h1>
          <p className="text-slate-500 text-sm mt-1">Manage global preferences and configurations.</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-blue-600 rounded-xl hover:bg-blue-700 transition-all disabled:opacity-50 self-start sm:self-auto shrink-0"
        >
          {saving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          Save All Changes
        </button>
      </div>

      <div className="flex space-x-1 border-b border-slate-200 mb-6 overflow-x-auto hide-scrollbar">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
              activeTab === tab.id
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      <div className="space-y-6">
        {activeTab === 'general' && (
          <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-5 animate-fade-in">
             <h3 className="font-semibold text-slate-700 border-b pb-3">Basic Information</h3>
             <div className="grid gap-5">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Site Name</label>
                  <input type="text" value={form.siteName || ""} onChange={(e) => setForm({ ...form, siteName: e.target.value })} className="w-full text-sm border border-slate-200 rounded-lg p-2.5" placeholder="e.g. My Awesome Blog" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Site Description</label>
                  <textarea value={form.siteDescription || ""} onChange={(e) => setForm({ ...form, siteDescription: e.target.value })} className="w-full text-sm border border-slate-200 rounded-lg p-2.5 h-20" placeholder="Brief description for SEO..." />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                   <div>
                     <label className="block text-sm font-medium text-slate-700 mb-1.5">Site URL</label>
                     <input type="url" value={form.siteUrl || ""} onChange={(e) => setForm({ ...form, siteUrl: e.target.value })} className="w-full text-sm border border-slate-200 rounded-lg p-2.5" placeholder="https://example.com" />
                   </div>
                   <div>
                     <label className="block text-sm font-medium text-slate-700 mb-1.5">Posts Per Page</label>
                     <input type="number" value={form.postsPerPage || 10} onChange={(e) => setForm({ ...form, postsPerPage: parseInt(e.target.value) })} className="w-full text-sm border border-slate-200 rounded-lg p-2.5" />
                   </div>
                </div>
             </div>
          </div>
        )}

        {activeTab === 'branding' && (
          <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-5 animate-fade-in">
             <h3 className="font-semibold text-slate-700 border-b pb-3">Visual Brand</h3>
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Logo URL</label>
                    <input type="text" value={form.logoUrl || ""} onChange={(e) => setForm({ ...form, logoUrl: e.target.value })} className="w-full text-sm border border-slate-200 rounded-lg p-2.5" placeholder="/logo.png or https://..." />
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Favicon URL (Overrides layout)</label>
                    <input type="text" value={form.faviconUrl || ""} onChange={(e) => setForm({ ...form, faviconUrl: e.target.value })} className="w-full text-sm border border-slate-200 rounded-lg p-2.5" placeholder="/favicon.ico" />
                </div>
                 <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Social Meta Image (OG:Image)</label>
                    <input type="text" value={form.metaImage || ""} onChange={(e) => setForm({ ...form, metaImage: e.target.value })} className="w-full text-sm border border-slate-200 rounded-lg p-2.5" placeholder="/og-image.jpg" />
                </div>
             </div>
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-3">
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Primary Color</label>
                    <div className="flex gap-2">
                       <input type="color" value={form.primaryColor || "#1a2b3c"} onChange={(e) => setForm({ ...form, primaryColor: e.target.value })} className="w-10 h-10 border border-slate-200 cursor-pointer" />
                       <input type="text" value={form.primaryColor || "#1a2b3c"} onChange={(e) => setForm({ ...form, primaryColor: e.target.value })} className="flex-1 text-sm border border-slate-200 rounded-lg p-2.5" />
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Accent Color</label>
                    <div className="flex gap-2">
                       <input type="color" value={form.accentColor || "#3b82f6"} onChange={(e) => setForm({ ...form, accentColor: e.target.value })} className="w-10 h-10 border border-slate-200 cursor-pointer" />
                       <input type="text" value={form.accentColor || "#3b82f6"} onChange={(e) => setForm({ ...form, accentColor: e.target.value })} className="flex-1 text-sm border border-slate-200 rounded-lg p-2.5" />
                    </div>
                </div>
             </div>
          </div>
        )}

        {activeTab === 'apis' && (
          <div className="space-y-6 animate-fade-in">
              <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-5">
                 <h3 className="font-semibold text-slate-700 border-b pb-3">Auto Generation Settings</h3>
                 <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                    <div>
                        <span className="font-medium text-slate-900 block">Enable Auto-Posting</span>
                        <span className="text-sm text-slate-500">Automatically generate posts on an interval.</span>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" checked={form.autoPostEnabled || false} onChange={(e) => setForm({ ...form, autoPostEnabled: e.target.checked })} />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                 </div>
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
                    <div>
                       <label className="block text-sm font-medium text-slate-700 mb-1.5">Interval (Hours)</label>
                       <input type="number" value={form.autoPostInterval || 12} onChange={(e) => setForm({ ...form, autoPostInterval: parseInt(e.target.value) })} className="w-full text-sm border border-slate-200 rounded-lg p-2.5" />
                    </div>
                    <div>
                       <label className="block text-sm font-medium text-slate-700 mb-1.5">Target Categories (Comma Separated)</label>
                       <input type="text" value={form.autoPostCategories || ""} onChange={(e) => setForm({ ...form, autoPostCategories: e.target.value })} className="w-full text-sm border border-slate-200 rounded-lg p-2.5" placeholder="World, Politics, Tech" />
                    </div>
                 </div>
              </div>
              <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-5">
                 <h3 className="font-semibold text-slate-700 border-b pb-3">News API Providers</h3>
                 <div className="mb-4">
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Preferred Generation Source</label>
                    <select value={form.preferredNewsApi || "gnews"} onChange={e => setForm({...form, preferredNewsApi: e.target.value})} className="w-full sm:w-1/2 p-2.5 border border-slate-200 rounded-lg text-sm bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20">
                      <option value="gnews">GNews</option>
                      <option value="newsapi">NewsAPI</option>
                      <option value="currents">Currents API</option>
                      <option value="newsdata">NewsData.io</option>
                      <option value="mediastack">MediaStack</option>
                      <option value="thenews">TheNewsAPI</option>
                    </select>
                 </div>
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">GNews API Key</label>
                        <input type="password" value={form.gnewsApiKey || ""} onChange={(e) => setForm({ ...form, gnewsApiKey: e.target.value })} className="w-full text-sm font-mono border border-slate-200 rounded-lg p-2" />
                    </div>
                    <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">MediaStack API Key</label>
                        <input type="password" value={form.mediaStackApiKey || ""} onChange={(e) => setForm({ ...form, mediaStackApiKey: e.target.value })} className="w-full text-sm font-mono border border-slate-200 rounded-lg p-2" />
                    </div>
                    <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">Currents API Key</label>
                        <input type="password" value={form.currentsApiKey || ""} onChange={(e) => setForm({ ...form, currentsApiKey: e.target.value })} className="w-full text-sm font-mono border border-slate-200 rounded-lg p-2" />
                    </div>
                    <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">NewsData API Key</label>
                        <input type="password" value={form.newsDataApiKey || ""} onChange={(e) => setForm({ ...form, newsDataApiKey: e.target.value })} className="w-full text-sm font-mono border border-slate-200 rounded-lg p-2" />
                    </div>
                    <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">NewsAPI Key</label>
                        <input type="password" value={form.newsApiKey || ""} onChange={(e) => setForm({ ...form, newsApiKey: e.target.value })} className="w-full text-sm font-mono border border-slate-200 rounded-lg p-2" />
                    </div>
                    <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">TheNewsAPI Key</label>
                        <input type="password" value={form.theNewsApiKey || ""} onChange={(e) => setForm({ ...form, theNewsApiKey: e.target.value })} className="w-full text-sm font-mono border border-slate-200 rounded-lg p-2" />
                    </div>
                 </div>
              </div>
              <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-5">
                 <h3 className="font-semibold text-slate-700 border-b pb-3">AI Processing Engine</h3>
                 <div className="mb-4">
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Preferred Rewriting Method</label>
                    <select value={form.preferredAiApi || "basic"} onChange={e => setForm({...form, preferredAiApi: e.target.value})} className="w-full sm:w-1/2 p-2.5 border border-slate-200 rounded-lg text-sm bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20">
                      <option value="basic">Basic Reformatting (Fast / Cost-free)</option>
                      <option value="openai">OpenAI GPT-4o (Premium Humanization)</option>
                    </select>
                 </div>
                 {form.preferredAiApi === 'openai' && (
                     <div>
                         <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">OpenAI Secret Key</label>
                         <input type="password" value={form.openaiApiKey || ""} onChange={(e) => setForm({ ...form, openaiApiKey: e.target.value })} placeholder="sk-..." className="w-full text-sm font-mono border border-slate-200 rounded-lg p-2" />
                     </div>
                 )}
              </div>
          </div>
        )}

        {activeTab === 'ads' && (
          <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-5 animate-fade-in">
              <div className="flex items-center justify-between border-b pb-4">
                 <div>
                    <span className="font-semibold text-slate-900 block">AdSense Global Integration</span>
                    <span className="text-sm text-slate-500">Injects ad slots automatically across pages.</span>
                 </div>
                 <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" checked={form.adsEnabled || false} onChange={(e) => setForm({ ...form, adsEnabled: e.target.checked })} />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                 </label>
              </div>
              <div className="grid gap-5">
                    {[
                      {label: "Global Header Script (e.g., auto-ads meta)", key: "adHeaderScript"},
                      {label: "Below Header Slot", key: "adBelowHeader"},
                      {label: "Sidebar Top Slot", key: "adSidebarTop"},
                      {label: "Sidebar Bottom Slot", key: "adSidebarBottom"},
                      {label: "In-Article Content Slot", key: "adInArticle"},
                      {label: "Native Ads (In-Feed)", key: "adNative"},
                      {label: "Below Article Slot", key: "adBelowArticle"},
                      {label: "Below Featured Article", key: "adBelowFeatured"},
                      {label: "Above Footer Slot", key: "adFooterAbove"},
                      {label: "Popunder Script", key: "adPopunder"},
                      {label: "Reward Ads Script", key: "adReward"},
                      {label: "Interstitial Ads Script", key: "adInterstitial"},
                      {label: "Sticky Bottom Ads", key: "adSticky"},
                  ].map((field) => (
                      <div key={field.key}>
                          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">{field.label}</label>
                          <textarea rows={3} value={form[field.key as keyof SettingsData] as string || ""} onChange={(e) => setForm({ ...form, [field.key]: e.target.value })} className="w-full text-xs font-mono border border-slate-200 rounded-lg p-2.5 bg-slate-50" placeholder="<!-- Ad Script Here -->" />
                      </div>
                  ))}
              </div>
          </div>
        )}

        {activeTab === 'newsletter' && (
          <div className="space-y-6 animate-fade-in">
              <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-5">
                 <div className="flex items-center justify-between border-b pb-4">
                    <div>
                       <span className="font-semibold text-slate-900 block">Enable Newsletter Widget</span>
                       <span className="text-sm text-slate-500">Allow visitors to subscribe to your external newsletter or store leads locally.</span>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                         <input type="checkbox" className="sr-only peer" checked={form.newsletterEnabled ?? false} onChange={(e) => setForm({ ...form, newsletterEnabled: e.target.checked })} />
                         <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                 </div>
                 <div className="flex items-center justify-between border-b pb-4">
                    <div>
                       <span className="font-semibold text-slate-900 block">Enable Auto-Send (Auto-Generated Posts)</span>
                       <span className="text-sm text-slate-500">Automatically broadcast a newsletter when an auto-generated post is published.</span>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                         <input type="checkbox" className="sr-only peer" checked={form.autoSendNewsletter ?? false} onChange={(e) => setForm({ ...form, autoSendNewsletter: e.target.checked })} />
                         <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                 </div>
                 
                 <div className="mb-4">
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Newsletter Provider</label>
                    <select value={form.newsletterProvider || "local"} onChange={e => setForm({...form, newsletterProvider: e.target.value})} className="w-full sm:w-1/2 p-2.5 border border-slate-200 rounded-lg text-sm bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20">
                      <option value="local">Local Database Only (Capture Leads)</option>
                      <option value="smtp">Custom SMTP Server (Send Emails directly)</option>
                      <option value="mailchimp">Mailchimp Integration</option>
                    </select>
                 </div>
              </div>

              {form.newsletterProvider === 'smtp' && (
              <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-5 animate-fade-in">
                 <h3 className="font-semibold text-slate-700 border-b pb-3">SMTP Configuration</h3>
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="col-span-full sm:col-span-1">
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">SMTP Host</label>
                        <input type="text" value={form.smtpHost || ""} onChange={(e) => setForm({ ...form, smtpHost: e.target.value })} className="w-full text-sm font-mono border border-slate-200 rounded-lg p-2" placeholder="smtp.gmail.com" />
                    </div>
                    <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">SMTP Port</label>
                        <input type="number" value={form.smtpPort || 587} onChange={(e) => setForm({ ...form, smtpPort: parseInt(e.target.value) || 587 })} className="w-full text-sm font-mono border border-slate-200 rounded-lg p-2" placeholder="587" />
                    </div>
                    <div className="col-span-full">
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">From Email Address</label>
                        <input type="email" value={form.smtpFromEmail || ""} onChange={(e) => setForm({ ...form, smtpFromEmail: e.target.value })} className="w-full text-sm font-mono border border-slate-200 rounded-lg p-2" placeholder="noreply@yourdomain.com" />
                    </div>
                    <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">SMTP Username</label>
                        <input type="text" value={form.smtpUser || ""} onChange={(e) => setForm({ ...form, smtpUser: e.target.value })} className="w-full text-sm font-mono border border-slate-200 rounded-lg p-2" />
                    </div>
                    <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">SMTP Password</label>
                        <input type="password" value={form.smtpPassword || ""} onChange={(e) => setForm({ ...form, smtpPassword: e.target.value })} className="w-full text-sm font-mono border border-slate-200 rounded-lg p-2" />
                    </div>
                 </div>
              </div>
              )}

              {form.newsletterProvider === 'mailchimp' && (
              <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-5 animate-fade-in">
                 <h3 className="font-semibold text-slate-700 border-b pb-3">Mailchimp Configuration</h3>
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">API Key</label>
                        <input type="password" value={form.mailchimpApiKey || ""} onChange={(e) => setForm({ ...form, mailchimpApiKey: e.target.value })} className="w-full text-sm font-mono border border-slate-200 rounded-lg p-2" placeholder="Your Mailchimp API Key" />
                    </div>
                    <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">Audience List ID</label>
                        <input type="text" value={form.mailchimpListId || ""} onChange={(e) => setForm({ ...form, mailchimpListId: e.target.value })} className="w-full text-sm font-mono border border-slate-200 rounded-lg p-2" placeholder="e.g. 1234567890" />
                    </div>
                 </div>
              </div>
              )}

          </div>
        )}

        {activeTab === 'contact' && (
          <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-5 animate-fade-in">
             <h3 className="font-semibold text-slate-700 border-b pb-3">Contact Information</h3>
             <p className="text-sm text-slate-500">This information will be displayed on the Contact, Terms, and Privacy pages.</p>
             <div className="grid gap-6 mt-4 sm:grid-cols-2">
                 <div>
                     <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">Contact Email</label>
                     <input type="email" value={form.contactEmail || ""} onChange={(e) => setForm({ ...form, contactEmail: e.target.value })} className="w-full text-sm border border-slate-200 rounded-lg p-2" placeholder="contact@yourblog.com" />
                 </div>
                 <div>
                     <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">Contact Phone</label>
                     <input type="text" value={form.contactPhone || ""} onChange={(e) => setForm({ ...form, contactPhone: e.target.value })} className="w-full text-sm border border-slate-200 rounded-lg p-2" placeholder="+1 (555) 123-4567" />
                 </div>
                 <div className="sm:col-span-2">
                     <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">Physical Address</label>
                     <textarea rows={3} value={form.contactAddress || ""} onChange={(e) => setForm({ ...form, contactAddress: e.target.value })} className="w-full text-sm border border-slate-200 rounded-lg p-2" placeholder="123 Blog Street, Web City, WW 12345" />
                 </div>
             </div>
          </div>
        )}

        {activeTab === 'code' && (
          <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-5 animate-fade-in">
             <h3 className="font-semibold text-slate-700 border-b pb-3">Global Tracking & Scripts</h3>
             <p className="text-sm text-slate-500">Inject Google Analytics, Tag Manager, or third-party widgets globally.</p>
             <div className="grid gap-6 mt-4">
                  <div>
                      <div className="flex items-center justify-between mb-1.5">
                          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500">&lt;head&gt; injection</label>
                      </div>
                      <textarea rows={5} value={form.customHeadCode || ""} onChange={(e) => setForm({ ...form, customHeadCode: e.target.value })} className="w-full text-xs font-mono border border-slate-200 rounded-lg p-3 bg-slate-900 text-green-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30" placeholder="<!-- Google Analytics -->" />
                  </div>
                  <div>
                      <div className="flex items-center justify-between mb-1.5">
                          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500">Start of &lt;body&gt;</label>
                      </div>
                      <textarea rows={5} value={form.customBodyStart || ""} onChange={(e) => setForm({ ...form, customBodyStart: e.target.value })} className="w-full text-xs font-mono border border-slate-200 rounded-lg p-3 bg-slate-900 text-green-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30" placeholder="<!-- Tag Manager (noscript) -->" />
                  </div>
                  <div>
                      <div className="flex items-center justify-between mb-1.5">
                          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500">Before &lt;/body&gt;</label>
                      </div>
                      <textarea rows={5} value={form.customFooterCode || ""} onChange={(e) => setForm({ ...form, customFooterCode: e.target.value })} className="w-full text-xs font-mono border border-slate-200 rounded-lg p-3 bg-slate-900 text-green-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30" placeholder="<!-- Live Chat Widget -->" />
                  </div>
             </div>
          </div>
        )}
      </div>
    </div>
  );
}
