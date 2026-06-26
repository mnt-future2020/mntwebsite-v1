"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    CLUTCHCO?: { Init: () => void };
  }
}

const SRC = "https://widget.clutch.co/static/js/widget.js";

// Clutch verified-reviews badge. The Clutch script scans the DOM for
// `.clutch-widget` nodes and renders an iframe into each. We load the script
// once and (re)initialize on mount so the badge also appears after a client-side
// route change (when the script is already cached and won't auto-run).
export default function ClutchWidget({ className = "" }: { className?: string }) {
  useEffect(() => {
    let cancelled = false;
    let tries = 0;
    const init = () => {
      if (cancelled) return;
      if (window.CLUTCHCO?.Init) {
        window.CLUTCHCO.Init();
      } else if (tries++ < 20) {
        setTimeout(init, 250); // script still downloading — retry briefly
      }
    };

    const existing = document.querySelector<HTMLScriptElement>(`script[src="${SRC}"]`);
    if (existing) {
      init();
    } else {
      const s = document.createElement("script");
      s.src = SRC;
      s.async = true;
      s.onload = init;
      document.body.appendChild(s);
    }

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className={className}>
      <div
        className="clutch-widget"
        data-url="https://widget.clutch.co"
        data-widget-type="7"
        data-height="65"
        data-nofollow="false"
        data-expandifr="true"
        data-clutchcompany-id="2510934"
      />
    </div>
  );
}
