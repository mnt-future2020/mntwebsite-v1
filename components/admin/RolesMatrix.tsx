"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Icon from "@/components/Icon";
import { SECTIONS, ALL_KEYS } from "@/lib/permissions";
import type { RoleRecord } from "@/lib/permissions-db";

const GROUPS = ["Workspace", "Projects", "CRM", "Human resources"] as const;

export default function RolesMatrix({ initial }: { initial: RoleRecord[] }) {
  const router = useRouter();
  const [roles, setRoles] = useState<RoleRecord[]>(initial);
  const [newName, setNewName] = useState("");
  const [busy, setBusy] = useState<null | "save" | "create" | string>(null);
  const [msg, setMsg] = useState<{ kind: "ok" | "err"; text: string } | null>(null);

  // Admin is rendered as an always-on column; everything else is editable.
  const editable = roles.filter((r) => r.key !== "ADMIN");
  const colSpan = 2 + editable.length;

  const has = (role: string, key: string) => roles.find((r) => r.key === role)?.perms.includes(key) ?? false;

  const toggle = (role: string, key: string) =>
    setRoles((rs) =>
      rs.map((r) =>
        r.key === role
          ? { ...r, perms: r.perms.includes(key) ? r.perms.filter((k) => k !== key) : [...r.perms, key] }
          : r
      )
    );

  const toggleAll = (role: string) =>
    setRoles((rs) =>
      rs.map((r) =>
        r.key === role ? { ...r, perms: r.perms.length === ALL_KEYS.length ? [] : [...ALL_KEYS] } : r
      )
    );

  const save = async () => {
    setBusy("save");
    setMsg(null);
    const res = await fetch("/api/admin/roles", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ roles: editable.map((r) => ({ key: r.key, label: r.label, perms: r.perms })) }),
    });
    const data = await res.json().catch(() => null);
    if (res.ok) {
      if (Array.isArray(data)) setRoles(data);
      setMsg({ kind: "ok", text: "Saved. Each user picks up new access the next time they sign in." });
      router.refresh();
    } else {
      setMsg({ kind: "err", text: data?.error || "Save failed." });
    }
    setBusy(null);
  };

  const createRole = async () => {
    const name = newName.trim();
    if (!name) return;
    setBusy("create");
    setMsg(null);
    const res = await fetch("/api/admin/roles", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });
    const data = await res.json().catch(() => null);
    if (res.ok) {
      if (Array.isArray(data)) setRoles(data);
      setNewName("");
      setMsg({ kind: "ok", text: `Role “${name}” created. Tick the sections it can open, then Save access.` });
      router.refresh();
    } else {
      setMsg({ kind: "err", text: data?.error || "Couldn't create the role." });
    }
    setBusy(null);
  };

  const deleteRole = async (role: RoleRecord) => {
    if (!confirm(`Delete the “${role.label}” role? This can't be undone.`)) return;
    setBusy(role.key);
    setMsg(null);
    const res = await fetch(`/api/admin/roles?role=${encodeURIComponent(role.key)}`, { method: "DELETE" });
    const data = await res.json().catch(() => null);
    if (res.ok) {
      if (Array.isArray(data)) setRoles(data);
      setMsg({ kind: "ok", text: `Role “${role.label}” deleted.` });
      router.refresh();
    } else {
      setMsg({ kind: "err", text: data?.error || "Couldn't delete the role." });
    }
    setBusy(null);
  };

  return (
    <div>
      {/* Create a new role */}
      <div className="mb-5 flex flex-wrap items-end gap-3 rounded-2xl border border-slate-200 bg-white p-4">
        <div className="flex-1 min-w-[200px]">
          <label className="mb-1 block text-xs font-medium text-slatey">New role name</label>
          <input
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && createRole()}
            placeholder="e.g. Support Lead"
            className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none focus:border-brand"
          />
        </div>
        <button
          onClick={createRole}
          disabled={busy === "create" || !newName.trim()}
          className="btn-primary disabled:opacity-60"
        >
          <Icon name="plus" className="h-4 w-4" /> {busy === "create" ? "Adding…" : "Add role"}
        </button>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white">
        <table className="w-full min-w-[560px] text-sm">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/60 text-left">
              <th className="px-4 py-3 font-medium text-slate-400">Section</th>
              <th className="px-3 py-3 text-center font-medium text-slate-400">
                Admin
                <span className="mt-0.5 block text-[10px] font-normal text-slate-300">always on</span>
              </th>
              {editable.map((r) => (
                <th key={r.key} className="px-3 py-3 text-center font-medium text-ink">
                  <span className="flex items-center justify-center gap-1">
                    {r.label}
                    {!r.isSystem && (
                      <button
                        type="button"
                        onClick={() => deleteRole(r)}
                        disabled={busy === r.key}
                        title="Delete role"
                        className="text-slate-300 transition-colors hover:text-red-500 disabled:opacity-50"
                      >
                        <Icon name="trash" className="h-3.5 w-3.5" />
                      </button>
                    )}
                  </span>
                  <button
                    type="button"
                    onClick={() => toggleAll(r.key)}
                    className="mt-0.5 block w-full text-[10px] font-normal text-brand-700 hover:underline"
                  >
                    {r.perms.length === ALL_KEYS.length ? "clear" : "all"}
                  </button>
                  {!r.isSystem && (
                    <span className="mt-0.5 block text-[9px] font-normal uppercase tracking-wide text-slate-300">custom</span>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {GROUPS.map((g) => (
              <GroupBlock key={g}>
                <tr className="bg-white">
                  <td colSpan={colSpan} className="px-4 pb-1 pt-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">
                    {g}
                  </td>
                </tr>
                {SECTIONS.filter((s) => s.group === g).map((s) => (
                  <tr key={s.key} className="border-t border-slate-50">
                    <td className="px-4 py-2.5 font-medium text-ink">{s.label}</td>
                    <td className="px-3 py-2.5 text-center">
                      <span className="mx-auto flex h-6 w-6 items-center justify-center rounded-md border border-slate-200 bg-slate-100 text-slate-400">
                        <Icon name="check" className="h-4 w-4" />
                      </span>
                    </td>
                    {editable.map((r) => (
                      <td key={r.key} className="px-3 py-2.5 text-center">
                        <button
                          type="button"
                          onClick={() => toggle(r.key, s.key)}
                          aria-pressed={has(r.key, s.key)}
                          className={`mx-auto flex h-6 w-6 items-center justify-center rounded-md border transition-colors ${
                            has(r.key, s.key)
                              ? "border-brand bg-brand text-white"
                              : "border-slate-300 bg-white text-transparent hover:border-brand-300"
                          }`}
                        >
                          <Icon name="check" className="h-4 w-4" />
                        </button>
                      </td>
                    ))}
                  </tr>
                ))}
              </GroupBlock>
            ))}
          </tbody>
        </table>
      </div>

      {msg && (
        <p
          className={`mt-4 rounded-lg border px-4 py-2.5 text-sm ${
            msg.kind === "ok" ? "border-green-200 bg-green-50 text-green-800" : "border-red-100 bg-red-50 text-red-700"
          }`}
        >
          {msg.text}
        </p>
      )}

      <div className="mt-5 flex items-center gap-3">
        <button onClick={save} disabled={busy === "save"} className="btn-primary disabled:opacity-70">
          <Icon name="save" className="h-4 w-4" /> {busy === "save" ? "Saving…" : "Save access"}
        </button>
        <p className="text-xs text-slate-400">Changes take effect when a user next signs in.</p>
      </div>
    </div>
  );
}

// Lets us group <tr> rows under a heading without an invalid wrapper element.
function GroupBlock({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
