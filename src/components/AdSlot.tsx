"use client";

import { useEffect, useRef } from "react";

interface AdSlotProps {
  code: string | null | undefined;
  className?: string;
}

/**
 * Renders an ad code (raw HTML/JS) from any ad network.
 * Uses a ref + innerHTML to execute embedded <script> tags properly.
 */
export default function AdSlot({ code, className = "" }: AdSlotProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!code || !containerRef.current) return;

    const container = containerRef.current;
    container.innerHTML = code;

    // Find and re-execute any <script> tags since innerHTML doesn't execute them
    const scripts = container.querySelectorAll("script");
    scripts.forEach((oldScript) => {
      const newScript = document.createElement("script");
      // Copy all attributes
      Array.from(oldScript.attributes).forEach((attr) => {
        newScript.setAttribute(attr.name, attr.value);
      });
      // Copy inline content
      if (oldScript.textContent) {
        newScript.textContent = oldScript.textContent;
      }
      oldScript.parentNode?.replaceChild(newScript, oldScript);
    });

    return () => {
      container.innerHTML = "";
    };
  }, [code]);

  if (!code) return null;

  return (
    <div
      ref={containerRef}
      className={`ad-slot ${className}`}
      data-ad-slot="true"
    />
  );
}
