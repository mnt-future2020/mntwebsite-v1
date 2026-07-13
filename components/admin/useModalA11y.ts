"use client";

import { useEffect, useRef } from "react";

// Shared overlay accessibility: focus into the panel on open, trap Tab within
// it, lock body scroll, restore focus to the opener on close, and — via a
// module-level stack — let ONLY the topmost overlay handle Escape (so opening
// ⌘K over a drawer and pressing Esc closes just the palette, not both).
const stack: number[] = [];
let seq = 0;
let savedOverflow = "";

const FOCUSABLE =
  'a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])';

export function useModalA11y(ref: React.RefObject<HTMLElement | null>, onClose: () => void) {
  const cb = useRef(onClose);
  cb.current = onClose;

  useEffect(() => {
    const id = ++seq;
    if (stack.length === 0) {
      savedOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
    }
    stack.push(id);
    const opener = document.activeElement as HTMLElement | null;

    const focusables = () =>
      Array.from(ref.current?.querySelectorAll<HTMLElement>(FOCUSABLE) ?? []).filter((el) => el.offsetParent !== null);
    const t = setTimeout(() => {
      const f = focusables();
      (f[0] || ref.current)?.focus?.();
    }, 20);

    const onKey = (e: KeyboardEvent) => {
      if (stack[stack.length - 1] !== id) return; // not the topmost overlay
      if (e.key === "Escape") {
        e.preventDefault();
        e.stopPropagation();
        cb.current();
      } else if (e.key === "Tab") {
        const f = focusables();
        if (f.length === 0) {
          e.preventDefault();
          return;
        }
        const first = f[0];
        const last = f[f.length - 1];
        const active = document.activeElement;
        if (e.shiftKey && (active === first || !ref.current?.contains(active))) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && active === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey, true);

    return () => {
      clearTimeout(t);
      document.removeEventListener("keydown", onKey, true);
      const i = stack.indexOf(id);
      if (i >= 0) stack.splice(i, 1);
      if (stack.length === 0) document.body.style.overflow = savedOverflow;
      opener?.focus?.();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
