"use client";

import { useAutoRefresh } from "./useAutoRefresh";

// Drop into any server-rendered page to make it auto-update. Shows a small
// pulsing "Live" pill so it's clear the view is refreshing on its own.
export default function LiveRefresh({ seconds = 30, label = "Live" }: { seconds?: number; label?: string }) {
  useAutoRefresh(seconds);
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-2.5 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
      </span>
      {label}
    </span>
  );
}
