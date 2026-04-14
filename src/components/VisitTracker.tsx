"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function VisitTracker() {
  const pathname = usePathname();

  useEffect(() => {
    // We don't want to track admin routes or API routes in visits
    if (!pathname || pathname.startsWith("/admin") || pathname.startsWith("/api")) return;

    fetch("/api/visit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ path: pathname, referer: document.referrer }),
    }).catch((e) => console.error("Could not track visit", e));
  }, [pathname]);

  return null;
}
