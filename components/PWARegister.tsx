"use client";

import { useEffect } from "react";

// Registers the service worker so the app is installable as a PWA.
export default function PWARegister() {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      const register = () => navigator.serviceWorker.register("/sw.js").catch(() => {});
      if (document.readyState === "complete") register();
      else window.addEventListener("load", register, { once: true });
    }
  }, []);
  return null;
}
