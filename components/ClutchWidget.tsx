"use client";

import { useEffect, useRef } from "react";

declare global {
  interface Window {
    CLUTCHCO?: { Init: () => void };
  }
}

const SRC = "https://widget.clutch.co/static/js/widget.js";
// Accessible name for the third-party iframe (WCAG 4.1.2 / axe `frame-title`).
// Clutch's iframe-resizer overwrites `title` with a handshake string, so we
// enforce ours via a MutationObserver for as long as the widget is mounted.
const IFRAME_TITLE = "Clutch — MnT Future verified client reviews";

// Clutch verified-reviews badge. The Clutch script scans the DOM for
// `.clutch-widget` nodes and renders an iframe into each. We load the script
// once and (re)initialize on mount so the badge also appears after a client-side
// route change (when the script is already cached and won't auto-run).
export default function ClutchWidget({ className = "" }: { className?: string }) {
  const boxRef = useRef<HTMLDivElement>(null);

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

    // Keep a descriptive title on the injected iframe (guard prevents loops).
    const box = boxRef.current;
    const titleIframes = () => {
      box?.querySelectorAll("iframe").forEach((f) => {
        if (f.title !== IFRAME_TITLE) f.setAttribute("title", IFRAME_TITLE);
      });
    };
    titleIframes();
    const mo = new MutationObserver(titleIframes);
    if (box) mo.observe(box, { childList: true, subtree: true, attributes: true, attributeFilter: ["title"] });

    return () => {
      cancelled = true;
      mo.disconnect();
    };
  }, []);

  return (
    <div className={className} ref={boxRef}>
      <div
        className="clutch-widget"
        data-url="https://widget.clutch.co"
        data-widget-type="1"
        data-height="40"
        data-nofollow="false"
        data-expandifr="true"
        data-clutchcompany-id="2510934"
      />
    </div>
  );
}
