"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

// The App Router scrolls the changed segment into view, not the window top —
// with the announcement bar and header above <main>, link navigations land
// 26–55px down the page. Reset to the true top ourselves, but never on
// back/forward, where the router restores the previous scroll position.
export default function ScrollReset() {
  const pathname = usePathname();
  const popped = useRef(false);

  useEffect(() => {
    const onPop = () => {
      popped.current = true;
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  useEffect(() => {
    if (popped.current) {
      popped.current = false;
      return;
    }
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
