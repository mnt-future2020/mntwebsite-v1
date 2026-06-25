"use client";

import { Fragment, useState } from "react";
import { useRouter } from "next/navigation";
import Icon from "@/components/Icon";
import { toast } from "@/components/admin/Toast";

type Lead = {
  id: string;
  name: string;
  email: string;
  company?: string | null;
  vertical?: string | null;
  budget?: string | null;
  message: string;
  status: string;
  createdAt: string;
};

const STATUSES = ["NEW", "CONTACTED", "QUALIFIED", "WON", "LOST"];
const statusStyle: Record<string, string> = {
  NEW: "bg-brand-50 text-brand-700",
  CONTACTED: "bg-amber-100 text-amber-700",
  QUALIFIED: "bg-purple-100 text-purple-700",
  WON: "bg-green-100 text-green-700",
  LOST: "bg-slate-100 text-slatey",
};

function fmt(d: string) {
  return new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

export default function LeadsTable({ leads: initial }: { leads: Lead[] }) {
  const router = useRouter();
  const [leads, setLeads] = useState(initial);
  const [open, setOpen] = useState<string | null>(null);
  const [converting, setConverting] = useState<string | null>(null);

  const convert = async (l: Lead) => {
    if (!confirm(`Convert "${l.name}" into a CRM deal? Creates a company, contact and an open deal.`)) return;
    setConverting(l.id);
    const res = await fetch("/api/admin/crm/convert-lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ leadId: l.id }),
    });
    setConverting(null);
    if (res.ok) {
      const d = await res.json();
      setLeads((ls) => ls.map((x) => (x.id === l.id ? { ...x, status: "QUALIFIED" } : x)));
      toast("Lead converted to a deal");
      router.push(`/admin/crm?deal=${d.dealId}`);
    } else {
      toast((await res.json().catch(() => ({}))).error || "Conversion failed", "err");
    }
  };

  const setStatus = async (id: string, status: string) => {
    setLeads((ls) => ls.map((l) => (l.id === id ? { ...l, status } : l)));
    await fetch(`/api/admin/leads/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
  };

  const del = async (id: string) => {
    if (!confirm("Delete this lead? This can't be undone.")) return;
    setLeads((ls) => ls.filter((l) => l.id !== id));
    await fetch(`/api/admin/leads/${id}`, { method: "DELETE" });
  };

  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white">
      <table className="w-full min-w-[680px] text-sm">
        <thead className="border-b border-slate-200 bg-slate-50 text-left text-xs uppercase tracking-wide text-slatey">
          <tr>
            <th className="px-5 py-3 font-semibold">Lead</th>
            <th className="px-5 py-3 font-semibold">Enquiry</th>
            <th className="px-5 py-3 font-semibold">Received</th>
            <th className="px-5 py-3 font-semibold">Status</th>
            <th className="px-5 py-3" />
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {leads.map((l) => (
            <Fragment key={l.id}>
              <tr className="hover:bg-slate-50">
                <td className="px-5 py-3">
                  <div className="font-medium text-ink">{l.name}</div>
                  <a href={`mailto:${l.email}`} className="text-xs text-brand-700 hover:underline">{l.email}</a>
                  {l.company && <div className="text-xs text-slate-400">{l.company}</div>}
                </td>
                <td className="px-5 py-3 text-slatey">
                  <div>{l.vertical || "—"}</div>
                  <div className="text-xs text-slate-400">{l.budget || ""}</div>
                </td>
                <td className="px-5 py-3 text-slatey">{fmt(l.createdAt)}</td>
                <td className="px-5 py-3">
                  <select
                    value={l.status}
                    onChange={(e) => setStatus(l.id, e.target.value)}
                    className={`rounded-full border-0 px-2.5 py-1 text-xs font-semibold focus:ring-2 focus:ring-brand-100 ${statusStyle[l.status] || "bg-slate-100 text-slatey"}`}
                  >
                    {STATUSES.map((s) => (
                      <option key={s} value={s}>{s.charAt(0) + s.slice(1).toLowerCase()}</option>
                    ))}
                  </select>
                </td>
                <td className="px-5 py-3">
                  <div className="flex items-center justify-end gap-1">
                    <button onClick={() => convert(l)} disabled={converting === l.id || l.status === "QUALIFIED" || l.status === "WON"} title={l.status === "QUALIFIED" || l.status === "WON" ? "Already converted" : "Convert to CRM deal"} className="rounded-lg p-1.5 text-slatey hover:bg-brand-50 hover:text-brand-700 disabled:opacity-50">
                      <Icon name="network" className="h-4 w-4" />
                    </button>
                    <button onClick={() => setOpen(open === l.id ? null : l.id)} title="View message" className="rounded-lg p-1.5 text-slatey hover:bg-slate-100 hover:text-ink">
                      <Icon name="eye" className="h-4 w-4" />
                    </button>
                    <button onClick={() => del(l.id)} title="Delete" className="rounded-lg p-1.5 text-slatey hover:bg-red-50 hover:text-red-600">
                      <Icon name="trash" className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
              {open === l.id && (
                <tr className="bg-slate-50/60">
                  <td colSpan={5} className="px-5 py-4">
                    <p className="whitespace-pre-wrap text-[13px] leading-relaxed text-ink">{l.message}</p>
                  </td>
                </tr>
              )}
            </Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}
