"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Fetches the anti-spam token that every public form posts back with.
 *
 * The token is minted when the form mounts and is valid exactly once, so a
 * failed submit must take a fresh one before the visitor retries — call
 * `refresh()` on any error path. See lib/antispam.ts for what it defends.
 *
 * `lazy` defers minting until the caller asks, via refresh(). The footer
 * newsletter uses it: that form is on every page, and minting per page view
 * spent a visitor's whole rate-limit budget on pages they only read. Forms
 * that are the point of their page stay eager, so the token is ready to post.
 */
export function useFormToken({ lazy = false }: { lazy?: boolean } = {}) {
  const [token, setToken] = useState<string | null>(null);
  const inFlight = useRef(false);

  const load = useCallback(async () => {
    if (inFlight.current) return;
    inFlight.current = true;
    try {
      // A dropped request would silently cost us a lead, so retry a couple of times.
      for (let attempt = 0; attempt < 3; attempt++) {
        try {
          const res = await fetch("/api/form-token", { cache: "no-store" });
          if (res.ok) {
            const data = await res.json();
            if (data?.token) {
              setToken(data.token);
              return;
            }
          }
        } catch {
          /* offline or blocked: fall through to the retry */
        }
        await new Promise((r) => setTimeout(r, 500 * (attempt + 1)));
      }
    } finally {
      inFlight.current = false;
    }
  }, []);

  useEffect(() => {
    if (lazy) return;
    void load();
  }, [load, lazy]);

  return { token, refresh: load };
}
