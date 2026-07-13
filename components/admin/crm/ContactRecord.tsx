"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Icon from "@/components/Icon";
import { toast } from "@/components/admin/Toast";
import InlineField from "@/components/admin/crm/InlineField";
import ActivityTimeline from "@/components/admin/crm/ActivityTimeline";
import { contactName, money, dealStageName, dealStageChip, fmtDate, followUpStatus, FOLLOWUP_STYLE } from "@/lib/crm";

type Opt = { id: string; label: string };
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Any = any;

const initials = (s: string) => s.split(" ").map((w) => w[0]).filter(Boolean).slice(0, 2).join("").toUpperCase();

export default function ContactRecord({
  contact,
  deals,
  activities,
  companies,
  owners,
}: {
  contact: Any;
  deals: Any[];
  activities: Any[];
  companies: Opt[];
  owners: Opt[];
}) {
  const router = useRouter();
  const [c, setC] = useState<Any>(contact);
  const name = contactName(c) || "Unnamed contact";

  const save = (key: string) => async (value: string) => {
    const res = await fetch(`/api/admin/crm/contacts/${c.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ [key]: value }),
    }).catch(() => null);
    if (res && res.ok) setC(await res.json());
    else toast("Couldn't save", "err");
  };

  const del = async () => {
    if (!confirm(`Delete ${name}? This removes their activities too.`)) return;
    const res = await fetch(`/api/admin/crm/contacts/${c.id}`, { method: "DELETE" }).catch(() => null);
    if (res && res.ok) {
      toast("Contact deleted");
      router.push("/admin/crm/contacts");
    } else toast("Delete failed", "err");
  };

  const fu = followUpStatus(c.nextFollowUp);

  return (
    <div>
      {/* Header */}
      <div className="flex flex-wrap items-start gap-4">
        <Link href="/admin/crm/contacts" className="mt-1 rounded-lg p-1.5 text-slatey hover:bg-slate-100" title="Back to contacts">
          <Icon name="arrow" className="h-4 w-4 rotate-180" />
        </Link>
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand-50 text-base font-bold text-brand-700">
          {initials(name)}
        </span>
        <div className="min-w-0 flex-1">
          <h1 className="text-xl font-bold text-ink">{name}</h1>
          <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-slatey">
            {c.title && <span>{c.title}</span>}
            {c.client && (
              <>
                {c.title && <span className="text-slate-300">·</span>}
                <Link href={`/admin/crm/companies/${c.client.id}`} className="inline-flex items-center gap-1 text-brand-700 hover:underline">
                  <Icon name="building" className="h-3.5 w-3.5" /> {c.client.name}
                </Link>
              </>
            )}
            {fu && (
              <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${FOLLOWUP_STYLE[fu]}`}>
                Follow-up {fu === "overdue" ? `overdue · ${fmtDate(c.nextFollowUp)}` : fu === "today" ? "today" : fmtDate(c.nextFollowUp)}
              </span>
            )}
          </div>
        </div>
        <button onClick={del} className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-medium text-slatey hover:bg-red-50 hover:text-red-600">
          <Icon name="trash" className="mr-1 inline h-4 w-4" /> Delete
        </button>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[360px_1fr]">
        {/* Details + related */}
        <div className="space-y-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-2">
            <p className="px-2.5 pt-2 pb-1 text-xs font-semibold uppercase tracking-wide text-slate-400">Details</p>
            <InlineField label="First name" value={c.firstName || ""} onSave={save("firstName")} />
            <InlineField label="Last name" value={c.lastName || ""} onSave={save("lastName")} />
            <InlineField label="Job title" value={c.title || ""} onSave={save("title")} placeholder="Add a title" />
            <InlineField label="Email" icon="mail" type="email" value={c.email || ""} onSave={save("email")} placeholder="Add an email" />
            <InlineField label="Phone" icon="phone" type="tel" value={c.phone || ""} onSave={save("phone")} placeholder="Add a phone" />
            <InlineField label="Company" icon="building" type="select" value={c.clientId || ""} options={companies.map((x) => ({ value: x.id, label: x.label }))} onSave={save("clientId")} placeholder="Link a company" />
            <InlineField label="Owner" icon="users" type="select" value={c.ownerId || ""} options={owners.map((x) => ({ value: x.id, label: x.label }))} onSave={save("ownerId")} placeholder="Assign an owner" />
            <InlineField label="Next follow-up" icon="calendar" type="date" value={c.nextFollowUp || ""} onSave={save("nextFollowUp")} placeholder="Set a date" />
            <InlineField label="Notes" type="textarea" value={c.notes || ""} onSave={save("notes")} placeholder="Add notes" />
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-4">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Deals</p>
              <span className="text-xs text-slate-400">{deals.length}</span>
            </div>
            {deals.length === 0 ? (
              <p className="mt-3 text-sm text-slate-400">No deals linked yet.</p>
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

        {/* Activity */}
        <div>
          <p className="mb-3 px-1 text-xs font-semibold uppercase tracking-wide text-slate-400">Activity</p>
          <ActivityTimeline scope={{ contactId: c.id, clientId: c.clientId || undefined }} initial={activities} />
        </div>
      </div>
    </div>
  );
}
