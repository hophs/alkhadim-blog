"use client";

import { useEffect, useRef, useState } from "react";

interface CustomCodes {
  customHeadCode: string | null;
  customBodyStart: string | null;
  customFooterCode: string | null;
}

function injectCode(html: string, target: HTMLElement) {
  const container = document.createElement("div");
  container.innerHTML = html;

  // Inject script elements by recreating them so the browser executes them
  const scripts = container.querySelectorAll("script");
  scripts.forEach((oldScript) => {
    const newScript = document.createElement("script");
    Array.from(oldScript.attributes).forEach((attr) => {
      newScript.setAttribute(attr.name, attr.value);
    });
    if (oldScript.textContent) {
      newScript.textContent = oldScript.textContent;
    }
    target.appendChild(newScript);
  });

  // Also inject non-script elements (meta tags, link tags, style tags, noscript, etc.)
  Array.from(container.children).forEach((el) => {
    if (el.tagName !== "SCRIPT") {
      target.appendChild(el.cloneNode(true));
    }
  });
}

export function CustomCodeInjector() {
  const [codes, setCodes] = useState<CustomCodes | null>(null);
  const injectedRef = useRef(false);

  useEffect(() => {
    fetch("/api/custom-code")
      .then((r) => r.json())
      .then((data) => setCodes(data))
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (!codes || injectedRef.current) return;
    injectedRef.current = true;

    // Inject head code
    if (codes.customHeadCode) {
      injectCode(codes.customHeadCode, document.head);
    }

    // Inject body start code (prepend to body)
    if (codes.customBodyStart) {
      const wrapper = document.createElement("div");
      wrapper.setAttribute("data-custom-code", "body-start");
      document.body.insertBefore(wrapper, document.body.firstChild);
      injectCode(codes.customBodyStart, wrapper);
    }

    // Inject footer code (append to body end)
    if (codes.customFooterCode) {
      const wrapper = document.createElement("div");
      wrapper.setAttribute("data-custom-code", "footer");
      document.body.appendChild(wrapper);
      injectCode(codes.customFooterCode, wrapper);
    }
  }, [codes]);

  return null;
}
