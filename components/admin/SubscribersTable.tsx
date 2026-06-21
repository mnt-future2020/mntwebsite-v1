"use client";

import { useState } from "react";
import Icon from "@/components/Icon";

type Subscriber = {
  id: string;
  email: string;
  name?: string | null;
  status: string;
  source?: string | null;
  createdAt: string;
};

const statusStyle: Record<string, string> = {
  SUBSCRIBED: "bg-green-100 text-green-700",
  PENDING: "bg-amber-100 text-amber-700",
  UNSUBSCRIBED: "bg-slate-100 text-slatey",
};

function fmt(d: string) {
  return new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

export default function SubscribersTable({ subscribers: initial }: { subscribers: Subscriber[] }) {
  const [subs, setSubs] = useState(initial);

  const del = async (id: string) => {
    if (!confirm("Delete this subscriber? This can't be undone.")) return;
    setSubs((s) => s.filter((x) => x.id !== id));
    await fetch(`/api/admin/subscribers/${id}`, { method: "DELETE" });
  };

  const setStatus = async (id: string, status: string) => {
    setSubs((s) => s.map((x) => (x.id === id ? { ...x, status } : x)));
    await fetch(`/api/admin/subscribers/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
  };

  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white">
      <table className="w-full min-w-[640px] text-sm">
        <thead className="border-b border-slate-200 bg-slate-50 text-left text-xs uppercase tracking-wide text-slatey">
          <tr>
            <th className="px-5 py-3 font-semibold">Subscriber</th>
            <th className="px-5 py-3 font-semibold">Source</th>
            <th className="px-5 py-3 font-semibold">Joined</th>
            <th className="px-5 py-3 font-semibold">Status</th>
            <th className="px-5 py-3" />
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {subs.map((s) => (
            <tr key={s.id} className="hover:bg-slate-50/60">
              <td className="px-5 py-3.5">
                <div className="font-medium text-ink">{s.email}</div>
                {s.name && <div className="text-xs text-slatey">{s.name}</div>}
              </td>
              <td className="px-5 py-3.5 text-slatey">{s.source || "—"}</td>
              <td className="px-5 py-3.5 text-slatey">{fmt(s.createdAt)}</td>
              <td className="px-5 py-3.5">
                <select
                  value={s.status}
                  onChange={(e) => setStatus(s.id, e.target.value)}
                  className={`rounded-full border-0 px-2.5 py-1 text-xs font-semibold outline-none ${
                    statusStyle[s.status] || "bg-slate-100 text-slatey"
                  }`}
                >
                  <option value="SUBSCRIBED">SUBSCRIBED</option>
                  <option value="PENDING">PENDING</option>
                  <option value="UNSUBSCRIBED">UNSUBSCRIBED</option>
                </select>
              </td>
              <td className="px-5 py-3.5 text-right">
                <button
                  onClick={() => del(s.id)}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-red-50 hover:text-red-600"
                  title="Delete subscriber"
                  aria-label="Delete subscriber"
                >
                  <Icon name="trash" className="h-4 w-4" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
