"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      // Small delay so it doesn't flash on load
      const timer = setTimeout(() => setVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const accept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setVisible(false);
  };

  const decline = () => {
    localStorage.setItem("cookie-consent", "declined");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] animate-slide-up">
      <div className="bg-white border-t border-gray-200 shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 sm:py-5">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="flex-1 min-w-0">
              <p className="text-sm text-gray-600 leading-relaxed">
                We use cookies to improve your experience and serve personalized ads through Google AdSense. 
                By clicking &ldquo;Accept&rdquo;, you consent to our use of cookies as described in our{" "}
                <Link href="/privacy" className="text-[#1a2b3c] font-semibold hover:underline">
                  Privacy Policy
                </Link>.
              </p>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <button
                onClick={decline}
                className="px-4 py-2 text-xs font-bold uppercase tracking-widest text-gray-500 border border-gray-200 rounded-[0.125rem] hover:border-gray-400 hover:text-gray-700 transition-colors"
              >
                Decline
              </button>
              <button
                onClick={accept}
                className="px-4 py-2 text-xs font-bold uppercase tracking-widest text-white bg-[#1a2b3c] hover:bg-[#2a3f54] rounded-[0.125rem] transition-colors"
              >
                Accept
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
