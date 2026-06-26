"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

// Lightweight "real-time" via polling: re-fetches the current server component
// on an interval. Pauses when the tab is hidden (no wasted work) and when the
// user is typing in a field (so it never disrupts an edit). This is the
// pragmatic, infra-free real-time for read-mostly views on our Next.js + DO
// App Platform stack.
export function useAutoRefresh(seconds = 30) {
  const router = useRouter();
  useEffect(() => {
    if (!seconds || seconds <= 0) return;
    const tick = () => {
      if (document.visibilityState !== "visible") return;
      const el = document.activeElement;
      const typing = !!el && /^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName);
      if (!typing) router.refresh();
    };
    const id = setInterval(tick, seconds * 1000);
    return () => clearInterval(id);
  }, [seconds, router]);
}
