"use client";

import { useMemo, useRef, useState } from "react";
import Icon from "@/components/Icon";
import { toast } from "@/components/admin/Toast";
import DealDrawer from "@/components/admin/crm/DealDrawer";
import PipelineManager from "@/components/admin/crm/PipelineManager";
import { money, fmtDate, contactName, followUpStatus, FOLLOWUP_STYLE, openValue, weightedValue, daysInStage, isStale, stageColor } from "@/lib/crm";
import { fullName } from "@/lib/hr";

type Opt = { id: string; label: string };
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Any = any;
const initials = (s: string) => s.split(" ").map((w) => w[0]).filter(Boolean).slice(0, 2).join("").toUpperCase();

export default function DealPipeline({
  pipelines: p0,
  initial,
  companies,
  contacts,
  owners,
}: {
  pipelines: Any[];
  initial: Any[];
  companies: Opt[];
  contacts: Opt[];
  owners: Opt[];
}) {
  const [pipelines, setPipelines] = useState<Any[]>(p0);
  const [deals, setDeals] = useState<Any[]>(initial);
  const defaultId = pipelines.find((p) => p.isDefault)?.id || pipelines[0]?.id || "";
  const [pipeId, setPipeId] = useState<string>(defaultId);
  const [dragId, setDragId] = useState<string | null>(null);
  const [over, setOver] = useState<string | null>(null);
  const [adding, setAdding] = useState<string | null>(null);
  const [newTitle, setNewTitle] = useState("");
  const [openId, setOpenId] = useState<string | null>(null);
  const [manage, setManage] = useState<Any | null>(null); // pipeline being edited, or {} for new
  const [q, setQ] = useState("");
  const [fOwner, setFOwner] = useState("");
  const [needsFu, setNeedsFu] = useState(false);

  const pipeline = pipelines.find((p) => p.id === pipeId) || pipelines[0];
  const stages: Any[] = pipeline?.stages || [];

  const inPipeline = useMemo(
    () => deals.filter((d) => (d.pipelineId ?? defaultId) === (pipeline?.id ?? defaultId)),
    [deals, pipeline, defaultId]
  );
  const filtered = useMemo(
    () =>
      inPipeline.filter(
        (d) =>
          (!q || `${d.title} ${d.client?.name || ""}`.toLowerCase().includes(q.toLowerCase())) &&
          (!fOwner || (fOwner === "none" ? !d.ownerId : d.ownerId === fOwner)) &&
          (!needsFu || ["overdue", "today"].includes(followUpStatus(d.nextFollowUp) || ""))
      ),
    [inPipeline, q, fOwner, needsFu]
  );
  const openVal = openValue(inPipeline);
  const weighted = weightedValue(inPipeline);
  const overdueCount = inPipeline.filter((d) => followUpStatus(d.nextFollowUp) === "overdue").length;

  const addingRef = useRef(false);

  const move = async (id: string, stage: Any) => {
    const d = deals.find((x) => x.id === id);
    if (!d || d.stageId === stage.id) return;
    let lostReason: string | undefined;
    if (stage.kind === "LOST") {
      const r = window.prompt("Why was this deal lost? (optional)");
      if (r === null) return;
      lostReason = r;
    }
    const prev = deals; // snapshot for rollback
    setDeals((s) => s.map((x) => (x.id === id ? { ...x, stageId: stage.id, pipelineId: pipeline.id, stageRef: stage } : x)));
    const body: Any = { stageId: stage.id };
    if (lostReason !== undefined) body.lostReason = lostReason;
    const res = await fetch(`/api/admin/crm/deals/${id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) }).catch(() => null);
    if (res && res.ok) {
      const u = await res.json();
      setDeals((s) => s.map((x) => (x.id === id ? u : x)));
      toast(`Moved to ${stage.name}`);
    } else {
      setDeals(prev); // revert — the drop failed
      toast("Couldn't move deal", "err");
    }
  };

  const add = async (stage: Any) => {
    const title = newTitle.trim();
    if (!title || addingRef.current) return; // guard against Enter + blur double-submit
    addingRef.current = true;
    setNewTitle("");
    setAdding(null);
    const res = await fetch("/api/admin/crm/deals", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ title, stageId: stage.id }) }).catch(() => null);
    addingRef.current = false;
    if (res && res.ok) {
      const d = await res.json();
      setDeals((s) => [...s, d]);
      toast("Deal added");
    } else toast("Couldn't add deal", "err");
  };

  const onSaved = (u: Any) => setDeals((s) => s.map((x) => (x.id === u.id ? u : x)));
  const onDeleted = (id: string) => setDeals((s) => s.filter((x) => x.id !== id));
  const openDeal = deals.find((d) => d.id === openId) || null;

  // PipelineManager callbacks
  const onPipelineSaved = (p: Any) => {
    setPipelines((s) => (s.some((x) => x.id === p.id) ? s.map((x) => (x.id === p.id ? p : x)) : [...s, p]));
    setPipeId(p.id);
    setManage(null);
  };
  const onPipelineDeleted = (id: string) => {
    setPipelines((s) => s.filter((x) => x.id !== id));
    setPipeId((cur) => (cur === id ? defaultId : cur));
    setManage(null);
  };

  return (
    <div>
      {/* Pipeline switcher */}
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <div className="flex flex-wrap items-center gap-1 rounded-xl border border-slate-200 bg-white p-1">
          {pipelines.map((p) => (
            <button
              key={p.id}
              onClick={() => setPipeId(p.id)}
              className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${p.id === pipeId ? "bg-brand-50 text-brand-700" : "text-slatey hover:bg-slate-50"}`}
            >
              {p.name}
              {p.isDefault && <span className="ml-1.5 text-[10px] text-slate-400">default</span>}
            </button>
          ))}
        </div>
        <button
          onClick={() => setManage(pipeline)}
          title="Edit stages"
          className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-sm font-medium text-slatey hover:border-brand-300 hover:text-brand-700"
        >
          <Icon name="edit" className="h-3.5 w-3.5" /> Stages
        </button>
        <button
          onClick={() => setManage({ isNew: true })}
          className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-sm font-medium text-slatey hover:border-brand-300 hover:text-brand-700"
        >
          <Icon name="plus" className="h-3.5 w-3.5" /> New pipeline
        </button>
      </div>

      {/* Filters */}
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <div className="relative">
          <Icon name="search" className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search deals…" className="w-52 rounded-lg border border-slate-200 py-1.5 pl-8 pr-3 text-sm focus:border-brand focus:outline-none" />
        </div>
        <select value={fOwner} onChange={(e) => setFOwner(e.target.value)} className="rounded-lg border border-slate-200 px-2 py-1.5 text-sm text-slatey focus:border-brand focus:outline-none">
          <option value="">All owners</option>
          <option value="none">Unassigned</option>
          {owners.map((o) => <option key={o.id} value={o.id}>{o.label}</option>)}
        </select>
        <button
          onClick={() => setNeedsFu((v) => !v)}
          title="Deals due or overdue for follow-up"
          className={`inline-flex items-center gap-1 rounded-lg border px-2 py-1.5 text-sm font-medium ${needsFu ? "border-brand bg-brand-50 text-brand-700" : "border-slate-200 text-slatey hover:border-brand-300"}`}
        >
          <Icon name="bell" className="h-3.5 w-3.5" /> Needs follow-up{overdueCount > 0 ? ` · ${overdueCount}` : ""}
        </button>
        <span className="ml-auto text-xs text-slate-500">
          Open <b className="text-ink">{money(openVal)}</b> · Weighted <b className="text-ink">{money(weighted)}</b> · {filtered.length}/{inPipeline.length}
        </span>
      </div>

      {/* Board — horizontal scroll, one column per stage */}
      <div className="-mx-1 flex gap-3 overflow-x-auto px-1 pb-3">
        {stages.map((stage) => {
          const col = filtered.filter((d) => d.stageId === stage.id);
          const total = col.reduce((s, d) => s + (d.value || 0), 0);
          const c = stageColor(stage.color);
          const isOver = over === stage.id;
          return (
            <div
              key={stage.id}
              onDragOver={(e) => { e.preventDefault(); setOver(stage.id); }}
              onDragLeave={() => setOver((o) => (o === stage.id ? null : o))}
              onDrop={() => { if (dragId) move(dragId, stage); setDragId(null); setOver(null); }}
              className={`flex max-h-[calc(100vh-330px)] w-[280px] shrink-0 flex-col rounded-2xl border bg-slate-50/70 transition-colors ${isOver ? "border-brand bg-brand-50/40" : "border-slate-200"}`}
            >
              <div className={`h-1.5 rounded-t-2xl ${c.bar}`} />
              <div className="flex items-center justify-between gap-2 px-3 pb-1.5 pt-2.5">
                <span className="flex min-w-0 items-center gap-2">
                  <span className={`h-2 w-2 shrink-0 rounded-full ${c.dot}`} />
                  <span className="truncate text-sm font-semibold text-ink">{stage.name}</span>
                  <span className="rounded-full bg-white px-1.5 text-[11px] text-slate-500">{col.length}</span>
                </span>
                {total > 0 && <span className="shrink-0 text-[11px] font-medium text-slate-500">{money(total)}</span>}
              </div>

              <div className="flex flex-1 flex-col gap-2 overflow-y-auto px-2 pb-2">
                {col.map((d) => {
                  const fu = followUpStatus(d.nextFollowUp);
                  const age = daysInStage(d.stageEnteredAt);
                  const stale = isStale(d);
                  return (
                    <div
                      key={d.id}
                      draggable
                      role="button"
                      tabIndex={0}
                      aria-label={`Deal: ${d.title}. Press Enter to open.`}
                      onDragStart={() => setDragId(d.id)}
                      onDragEnd={() => setDragId(null)}
                      onClick={() => setOpenId(d.id)}
                      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setOpenId(d.id); } }}
                      className={`group cursor-pointer rounded-xl border bg-white p-3 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-1 ${dragId === d.id ? "opacity-50" : ""} ${stale ? "border-amber-300" : "border-slate-200"}`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-sm font-semibold leading-snug text-ink">{d.title}</p>
                        {d.ownerId && (
                          <span title={d.owner ? fullName(d.owner) : ""} className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-50 text-[9px] font-bold text-brand-700">
                            {initials(d.owner ? fullName(d.owner) : "")}
                          </span>
                        )}
                      </div>
                      {d.client?.name && <p className="mt-0.5 text-xs text-slate-500">{d.client.name}</p>}
                      <div className="mt-2 flex items-center justify-between">
                        <span className="text-sm font-bold text-ink">{money(d.value, d.currency)}</span>
                        {d.contact && <span className="truncate text-[11px] text-slate-500">{contactName(d.contact)}</span>}
                      </div>
                      {(fu || stale || age != null) && (
                        <div className="mt-2 flex flex-wrap items-center gap-1.5 border-t border-slate-50 pt-2">
                          {fu && (
                            <span className={`inline-flex items-center gap-1 rounded-full px-1.5 py-0.5 text-[10px] font-semibold ${FOLLOWUP_STYLE[fu]}`}>
                              <Icon name="calendar" className="h-3 w-3" /> {fu === "overdue" ? `Overdue · ${fmtDate(d.nextFollowUp)}` : fu === "today" ? "Today" : fmtDate(d.nextFollowUp)}
                            </span>
                          )}
                          {stale && <span className="inline-flex items-center gap-0.5 rounded-full bg-amber-100 px-1.5 py-0.5 text-[10px] font-semibold text-amber-700"><Icon name="bell" className="h-2.5 w-2.5" /> Stale</span>}
                          {age != null && <span className="text-[10px] text-slate-500">{age}d in stage</span>}
                        </div>
                      )}
                    </div>
                  );
                })}
                {col.length === 0 && <p className="px-1 py-6 text-center text-xs text-slate-400">Drop a deal here</p>}
              </div>

              <div className="px-2 pb-2">
                {adding === stage.id ? (
                  <input
                    autoFocus
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    onKeyDown={(e) => { if (e.key === "Enter") add(stage); if (e.key === "Escape") { setAdding(null); setNewTitle(""); } }}
                    onBlur={() => (newTitle.trim() ? add(stage) : setAdding(null))}
                    placeholder="Deal title…"
                    className="w-full rounded-lg border border-slate-200 px-2 py-1.5 text-sm focus:border-brand focus:outline-none"
                  />
                ) : (
                  <button onClick={() => { setAdding(stage.id); setNewTitle(""); }} className="flex w-full items-center gap-1 rounded-lg px-1.5 py-1 text-xs font-medium text-slate-500 hover:text-brand-700">
                    <Icon name="plus" className="h-3.5 w-3.5" /> Add deal
                  </button>
                )}
              </div>
            </div>
          );
        })}
        {stages.length === 0 && (
          <div className="rounded-2xl border border-dashed border-slate-300 p-8 text-center text-sm text-slate-500">
            This pipeline has no stages yet.{" "}
            <button onClick={() => setManage(pipeline)} className="font-medium text-brand-700 hover:underline">Add stages</button>
          </div>
        )}
      </div>

      {openDeal && <DealDrawer deal={openDeal} pipelines={pipelines} companies={companies} contacts={contacts} owners={owners} onSaved={onSaved} onDeleted={onDeleted} onClose={() => setOpenId(null)} />}
      {manage && (
        <PipelineManager
          pipeline={manage.isNew ? null : manage}
          canDelete={pipelines.length > 1 && !manage.isNew}
          onSaved={onPipelineSaved}
          onDeleted={onPipelineDeleted}
          onClose={() => setManage(null)}
        />
      )}
    </div>
  );
}
