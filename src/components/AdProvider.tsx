"use client";

import { useEffect, useState, createContext, useContext } from "react";
import AdSlot from "@/components/AdSlot";

interface AdCodes {
  adsEnabled: boolean;
  adHeaderScript: string | null;
  adBelowHeader: string | null;
  adSidebarTop: string | null;
  adSidebarBottom: string | null;
  adInArticle: string | null;
  adBelowArticle: string | null;
  adBelowFeatured: string | null;
  adFooterAbove: string | null;
  adPopunder: string | null;
  adReward: string | null;
  adInterstitial: string | null;
  adNative: string | null;
  adSticky: string | null;
}

const defaultAds: AdCodes = {
  adsEnabled: false,
  adHeaderScript: null,
  adBelowHeader: null,
  adSidebarTop: null,
  adSidebarBottom: null,
  adInArticle: null,
  adBelowArticle: null,
  adBelowFeatured: null,
  adFooterAbove: null,
  adPopunder: null,
  adReward: null,
  adInterstitial: null,
  adNative: null,
  adSticky: null,
};

const AdContext = createContext<AdCodes>(defaultAds);

export function useAds() {
  return useContext(AdContext);
}

export function AdProvider({ children }: { children: React.ReactNode }) {
  const [ads, setAds] = useState<AdCodes>(defaultAds);

  useEffect(() => {
    fetch("/api/ads")
      .then((r) => r.json())
      .then((data) => setAds(data))
      .catch(() => {});
  }, []);

  // Inject header scripts when they change
  useEffect(() => {
    if (!ads.adsEnabled || !ads.adHeaderScript) return;

    const container = document.createElement("div");
    container.innerHTML = ads.adHeaderScript;

    const scripts = container.querySelectorAll("script");
    scripts.forEach((oldScript) => {
      const newScript = document.createElement("script");
      Array.from(oldScript.attributes).forEach((attr) => {
        newScript.setAttribute(attr.name, attr.value);
      });
      if (oldScript.textContent) {
        newScript.textContent = oldScript.textContent;
      }
      document.head.appendChild(newScript);
    });

    // Also inject non-script elements (like meta tags, link tags)
    const nonScripts = container.querySelectorAll(":not(script)");
    nonScripts.forEach((el) => {
      document.head.appendChild(el.cloneNode(true));
    });
  }, [ads.adsEnabled, ads.adHeaderScript]);

  return (
    <AdContext.Provider value={ads}>
      {children}
      {ads.adsEnabled && (
        <>
          {ads.adPopunder && <AdSlot code={ads.adPopunder} className="hidden-ad popunder-ad" />}
          {ads.adReward && <AdSlot code={ads.adReward} className="hidden-ad reward-ad" />}
          {ads.adInterstitial && <AdSlot code={ads.adInterstitial} className="hidden-ad interstitial-ad" />}
        </>
      )}
    </AdContext.Provider>
  );
}
