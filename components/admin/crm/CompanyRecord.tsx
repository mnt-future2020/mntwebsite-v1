"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Icon from "@/components/Icon";
import { toast } from "@/components/admin/Toast";
import InlineField from "@/components/admin/crm/InlineField";
import ActivityTimeline from "@/components/admin/crm/ActivityTimeline";
import { contactName, money, dealIsOpen, dealStageName, dealStageChip } from "@/lib/crm";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Any = any;

const STATUS_OPTS = [
  { value: "PROSPECT", label: "Prospect" },
  { value: "ACTIVE", label: "Active" },
  { value: "INACTIVE", label: "Inactive" },
];
const STATUS_STYLE: Record<string, string> = {
  PROSPECT: "bg-blue-100 text-blue-700",
  ACTIVE: "bg-green-100 text-green-700",
  INACTIVE: "bg-slate-100 text-slatey",
};

export default function CompanyRecord({
  company,
  contacts,
  deals,
  activities,
}: {
  company: Any;
  contacts: Any[];
  deals: Any[];
  activities: Any[];
}) {
  const router = useRouter();
  const [c, setC] = useState<Any>(company);

  const openDeals = useMemo(() => deals.filter(dealIsOpen), [deals]);
  const pipeline = useMemo(() => openDeals.reduce((s, d) => s + (d.value || 0), 0), [openDeals]);

  const save = (key: string) => async (value: string) => {
    const res = await fetch(`/api/admin/crm/companies/${c.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ [key]: value }),
    }).catch(() => null);
    if (res && res.ok) setC(await res.json());
    else toast("Couldn't save", "err");
  };

  const del = async () => {
    if (!confirm(`Delete ${c.name}?`)) return;
    const res = await fetch(`/api/admin/crm/companies/${c.id}`, { method: "DELETE" }).catch(() => null);
    if (res && res.ok) {
      toast("Company deleted");
      router.push("/admin/crm/companies");
    } else toast((res && (await res.json().catch(() => ({})))?.error) || "Delete failed", "err");
  };

  return (
    <div>
      {/* Header */}
      <div className="flex flex-wrap items-start gap-4">
        <Link href="/admin/crm/companies" className="mt-1 rounded-lg p-1.5 text-slatey hover:bg-slate-100" title="Back to companies">
          <Icon name="arrow" className="h-4 w-4 rotate-180" />
        </Link>
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand-50 text-brand-700">
          <Icon name="building" className="h-6 w-6" />
        </span>
        <div className="min-w-0 flex-1">
          <h1 className="text-xl font-bold text-ink">{c.name}</h1>
          <div className="mt-1 flex flex-wrap items-center gap-2 text-sm text-slatey">
            <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${STATUS_STYLE[c.status] || STATUS_STYLE.PROSPECT}`}>
              {STATUS_OPTS.find((o) => o.value === c.status)?.label || c.status}
            </span>
            {c.website && (
              <a href={c.website.startsWith("http") ? c.website : `https://${c.website}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-brand-700 hover:underline">
                <Icon name="globe" className="h-3.5 w-3.5" /> {c.website.replace(/^https?:\/\//, "")}
              </a>
            )}
          </div>
        </div>
        <button onClick={del} className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-medium text-slatey hover:bg-red-50 hover:text-red-600">
          <Icon name="trash" className="mr-1 inline h-4 w-4" /> Delete
        </button>
      </div>

      {/* Rollup */}
      <div className="mt-5 grid grid-cols-3 gap-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <p className="text-xs text-slatey">People</p>
          <p className="mt-1 text-2xl font-bold text-ink">{contacts.length}</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <p className="text-xs text-slatey">Open deals</p>
          <p className="mt-1 text-2xl font-bold text-ink">{openDeals.length}</p>
        </div>
        <div className="rounded-2xl border border-brand-100 bg-brand-50/50 p-4">
          <p className="text-xs text-slatey">Open pipeline</p>
          <p className="mt-1 text-2xl font-bold text-ink">{money(pipeline)}</p>
        </div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[360px_1fr]">
        <div className="space-y-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-2">
            <p className="px-2.5 pt-2 pb-1 text-xs font-semibold uppercase tracking-wide text-slate-400">Details</p>
            <InlineField label="Name" icon="building" value={c.name || ""} onSave={save("name")} />
            <InlineField label="Primary contact" value={c.contact || ""} onSave={save("contact")} placeholder="Add a name" />
            <InlineField label="Email" icon="mail" type="email" value={c.email || ""} onSave={save("email")} placeholder="Add an email" />
            <InlineField label="Phone" icon="phone" type="tel" value={c.phone || ""} onSave={save("phone")} placeholder="Add a phone" />
            <InlineField label="Website" icon="globe" value={c.website || ""} onSave={save("website")} placeholder="Add a website" />
            <InlineField label="Status" type="select" value={c.status || ""} options={STATUS_OPTS} onSave={save("status")} />
            <InlineField label="Notes" type="textarea" value={c.notes || ""} onSave={save("notes")} placeholder="Add notes" />
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-4">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">People</p>
              <span className="text-xs text-slate-400">{contacts.length}</span>
            </div>
            {contacts.length === 0 ? (
              <p className="mt-3 text-sm text-slate-400">No contacts at this company yet.</p>
            ) : (
              <ul className="mt-3 space-y-1">
                {contacts.map((p) => (
                  <li key={p.id}>
                    <Link href={`/admin/crm/contacts/${p.id}`} className="flex items-center justify-between gap-2 rounded-xl px-3 py-2 hover:bg-slate-50">
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium text-ink">{contactName(p)}</p>
                        {p.title && <p className="text-xs text-slate-400">{p.title}</p>}
                      </div>
                      <Icon name="arrow" className="h-3.5 w-3.5 shrink-0 text-slate-300" />
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-4">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Deals</p>
              <span className="text-xs text-slate-400">{deals.length}</span>
            </div>
            {deals.length === 0 ? (
              <p className="mt-3 text-sm text-slate-400">No deals with this company yet.</p>
            ) : (
              <ul className="mt-3 space-y-2">
                {deals.map((d) => (
                  <li key={d.id} className="flex items-center justify-between gap-2 rounded-xl border border-slate-100 px-3 py-2">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-ink">{d.title}</p>
                      <p className="text-xs text-slate-400">{money(d.value, d.currency)}</p>
                    </div>
                    <span className={`shrink-0 rounded-full px-2 py-0.5 text-[11px] font-semibold ${dealStageChip(d)}`}>{dealStageName(d)}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div>
          <p className="mb-3 px-1 text-xs font-semibold uppercase tracking-wide text-slate-400">Activity</p>
          <ActivityTimeline scope={{ clientId: c.id }} initial={activities} />
        </div>
      </div>
    </div>
  );
}
