"use client";

import { useEffect, useRef, useState } from "react";
import Icon from "@/components/Icon";
import { fmtDate } from "@/lib/crm";

type Option = { value: string; label: string };
type Props = {
  label: string;
  value: string;
  onSave: (v: string) => Promise<void> | void;
  type?: "text" | "email" | "tel" | "date" | "textarea" | "select";
  options?: Option[];
  placeholder?: string;
  icon?: React.ComponentProps<typeof Icon>["name"];
};

// A single label + value that turns into an editor on click and commits on
// blur / Enter (Esc cancels). The record's answer to Twenty's inline fields.
export default function InlineField({ label, value, onSave, type = "text", options, placeholder, icon }: Props) {
  const [editing, setEditing] = useState(false);
  const [val, setVal] = useState(value);
  const [busy, setBusy] = useState(false);
  // One ref for input | textarea | select — kept loose to avoid the mutable-ref
  // invariance error across the three element types.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ref = useRef<any>(null);

  useEffect(() => setVal(value), [value]);
  useEffect(() => {
    if (!editing) return;
    const el = ref.current;
    if (!el) return;
    el.focus?.();
    if (type !== "select" && type !== "date") el.select?.();
  }, [editing, type]);

  const commit = async () => {
    setEditing(false);
    if (val === value) return;
    setBusy(true);
    try {
      await onSave(val);
    } finally {
      setBusy(false);
    }
  };
  const cancel = () => {
    setVal(value);
    setEditing(false);
  };

  const display = () => {
    if (!value) return <span className="text-slate-300">{placeholder || "—"}</span>;
    if (type === "date") return fmtDate(value);
    if (type === "select") return options?.find((o) => o.value === value)?.label || value;
    if (type === "email") return <span className="text-brand-700">{value}</span>;
    return value;
  };

  const base =
    "w-full rounded-lg border border-brand-300 bg-white px-2.5 py-1.5 text-sm text-ink focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand-100";

  return (
    <div className="group flex items-start gap-3 rounded-lg px-2.5 py-2 hover:bg-slate-50">
      <span className="mt-0.5 flex w-32 shrink-0 items-center gap-1.5 text-xs font-medium text-slatey">
        {icon && <Icon name={icon} className="h-3.5 w-3.5 text-slate-400" />}
        {label}
      </span>
      <div className="min-w-0 flex-1">
        {editing ? (
          type === "textarea" ? (
            <textarea ref={ref} rows={3} value={val} onChange={(e) => setVal(e.target.value)} onBlur={commit} onKeyDown={(e) => e.key === "Escape" && cancel()} className={`${base} resize-none`} />
          ) : type === "select" ? (
            <select ref={ref} value={val} onChange={(e) => setVal(e.target.value)} onBlur={commit} className={base}>
              <option value="">—</option>
              {options?.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          ) : (
            <input
              ref={ref}
              type={type}
              value={type === "date" && val ? String(val).slice(0, 10) : val}
              onChange={(e) => setVal(e.target.value)}
              onBlur={commit}
              onKeyDown={(e) => {
                if (e.key === "Enter") commit();
                if (e.key === "Escape") cancel();
              }}
              className={base}
            />
          )
        ) : (
          <button
            type="button"
            onClick={() => setEditing(true)}
            className="flex w-full items-center justify-between gap-2 rounded-lg px-1 py-1 text-left text-sm text-ink"
          >
            <span className="min-w-0 truncate">{busy ? <span className="text-slate-400">Saving…</span> : display()}</span>
            <Icon name="edit" className="h-3.5 w-3.5 shrink-0 text-slate-300 opacity-0 transition-opacity group-hover:opacity-100" />
          </button>
        )}
      </div>
    </div>
  );
}
