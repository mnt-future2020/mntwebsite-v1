"use client";

import { useEffect, useState } from "react";
import Icon from "@/components/Icon";

type Kind = "ok" | "err" | "info";
type Item = { id: number; message: string; kind: Kind };

let counter = 0;

// Fire a toast from anywhere (client-side): toast("Saved"), toast("Failed", "err").
export function toast(message: string, kind: Kind = "ok") {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent("mnt-toast", { detail: { id: ++counter, message, kind } }));
}

const STYLE: Record<Kind, string> = {
  ok: "border-green-200 bg-green-50 text-green-800",
  err: "border-red-200 bg-red-50 text-red-700",
  info: "border-slate-200 bg-white text-ink",
};
const ICON: Record<Kind, "check" | "x" | "bell"> = { ok: "check", err: "x", info: "bell" };

export function Toaster() {
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    const handler = (e: Event) => {
      const t = (e as CustomEvent<Item>).detail;
      setItems((s) => [...s, t]);
      setTimeout(() => setItems((s) => s.filter((x) => x.id !== t.id)), 3200);
    };
    window.addEventListener("mnt-toast", handler);
    return () => window.removeEventListener("mnt-toast", handler);
  }, []);

  return (
    <div className="pointer-events-none fixed bottom-5 right-5 z-[100] flex flex-col gap-2">
      {items.map((t) => (
        <div
          key={t.id}
          className={`pointer-events-auto flex items-center gap-2.5 rounded-xl border px-4 py-2.5 text-sm font-medium shadow-lg shadow-slate-900/5 ${STYLE[t.kind]} animate-[slideIn_.15s_ease-out]`}
        >
          <Icon name={ICON[t.kind]} className="h-4 w-4 shrink-0" />
          <span>{t.message}</span>
        </div>
      ))}
      <style>{`@keyframes slideIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}`}</style>
    </div>
  );
}
