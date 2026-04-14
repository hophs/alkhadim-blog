"use client";

import { useAds } from "@/components/AdProvider";
import AdSlot from "@/components/AdSlot";

type Placement =
  | "belowHeader"
  | "sidebarTop"
  | "sidebarBottom"
  | "inArticle"
  | "belowArticle"
  | "belowFeatured"
  | "footerAbove"
  | "native"
  | "sticky";

const placementMap: Record<Placement, { field: string; wrapperClass: string }> = {
  belowHeader: { field: "adBelowHeader", wrapperClass: "w-full border-b border-gray-100 bg-[#f6f7f7]" },
  sidebarTop: { field: "adSidebarTop", wrapperClass: "" },
  sidebarBottom: { field: "adSidebarBottom", wrapperClass: "" },
  inArticle: { field: "adInArticle", wrapperClass: "my-8" },
  belowArticle: { field: "adBelowArticle", wrapperClass: "mt-8 mb-4" },
  belowFeatured: { field: "adBelowFeatured", wrapperClass: "border-b border-gray-200" },
  footerAbove: { field: "adFooterAbove", wrapperClass: "w-full border-t border-gray-100 bg-[#f6f7f7]" },
  native: { field: "adNative", wrapperClass: "my-6 bg-slate-50 p-4 rounded-xl" },
  sticky: { field: "adSticky", wrapperClass: "fixed bottom-0 left-0 w-full z-[999] border-t border-slate-200 bg-white shadow-[0_-4px_10px_rgba(0,0,0,0.05)]" },
};

interface BlogAdSlotsProps {
  placement: Placement;
  className?: string;
}

export default function BlogAdSlots({ placement, className = "" }: BlogAdSlotsProps) {
  const ads = useAds();

  if (!ads.adsEnabled) return null;

  const config = placementMap[placement];
  const code = (ads as unknown as Record<string, unknown>)[config.field] as string | null;

  if (!code) return null;

  return (
    <div className={`${config.wrapperClass} ${className}`}>
      <div className="container-blog py-2">
        <AdSlot code={code} />
      </div>
    </div>
  );
}
