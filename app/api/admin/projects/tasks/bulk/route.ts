import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export const runtime = "nodejs";
export const maxDuration = 60;

const STATUSES = ["BACKLOG", "TODO", "IN_PROGRESS", "REVIEW", "DONE"];
const PRIORITIES = ["LOW", "MEDIUM", "HIGH", "URGENT"];
const TYPES = ["FEATURE", "BUG", "CHORE", "RESEARCH"];
const STATUS_ALIAS: Record<string, string> = { TO_DO: "TODO", IN_REVIEW: "REVIEW", INPROGRESS: "IN_PROGRESS", DOING: "IN_PROGRESS" };

const norm = (s: unknown) => String(s ?? "").trim().toUpperCase().replace(/\s+/g, "_");
function pick(value: unknown, allowed: string[], fallback: string, alias: Record<string, string> = {}) {
  const n = norm(value);
  if (allowed.includes(n)) return n;
  if (alias[n] && allowed.includes(alias[n])) return alias[n];
  return fallback;
}

// Split a single CSV line, honoring double-quoted fields.
function splitCsv(line: string): string[] {
  const out: string[] = [];
  let cur = "";
  let inQ = false;
  for (let i = 0; i < line.length; i++) {
    const c = line[i];
    if (c === '"') {
      if (inQ && line[i + 1] === '"') { cur += '"'; i++; }
      else inQ = !inQ;
    } else if (c === "," && !inQ) { out.push(cur); cur = ""; }
    else cur += c;
  }
  out.push(cur);
  return out.map((s) => s.trim());
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const projectId = String(body.projectId || "");
    const text = String(body.text || "");
    const defaultStatus = pick(body.defaultStatus, STATUSES, "TODO");
    if (!projectId) return NextResponse.json({ error: "Missing project." }, { status: 400 });

    const project = await prisma.project.findUnique({ where: { id: projectId }, select: { id: true } });
    if (!project) return NextResponse.json({ error: "Project not found." }, { status: 404 });

    const lines = text.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
    if (lines.length === 0) return NextResponse.json({ error: "Nothing to import — paste at least one task." }, { status: 400 });

    // Header row? (CSV mode) — first line contains a "title" column.
    const firstCols = splitCsv(lines[0]).map((c) => c.toLowerCase());
    const hasHeader = firstCols.includes("title");
    const cols = hasHeader ? firstCols : ["title"];
    const dataLines = hasHeader ? lines.slice(1) : lines;
    if (dataLines.length === 0) return NextResponse.json({ error: "No task rows found below the header." }, { status: 400 });
    if (dataLines.length > 500) return NextResponse.json({ error: "Too many rows (max 500 at once)." }, { status: 400 });

    // For assignee resolution by email or name.
    const employees = await prisma.employee.findMany({ select: { id: true, email: true, firstName: true, lastName: true } });
    const byEmail = new Map(employees.map((e) => [e.email.toLowerCase(), e.id]));
    const byName = new Map(employees.map((e) => [[e.firstName, e.lastName].filter(Boolean).join(" ").toLowerCase(), e.id]));
    const resolveAssignee = (v?: string) => {
      if (!v) return null;
      const k = v.trim().toLowerCase();
      return byEmail.get(k) || byName.get(k) || null;
    };

    const rows = dataLines.map((line) => {
      const fields = hasHeader ? splitCsv(line) : [line];
      const get = (name: string) => {
        const i = cols.indexOf(name);
        return i >= 0 ? fields[i] : undefined;
      };
      const title = (hasHeader ? get("title") : fields[0]) || "";
      const estimate = parseFloat(String(get("estimate") ?? get("hours") ?? "")) || 0;
      const dueRaw = get("due") ?? get("duedate") ?? get("due_date");
      const due = dueRaw && !Number.isNaN(Date.parse(dueRaw)) ? new Date(dueRaw) : null;
      return {
        title: title.trim(),
        description: (get("description") || null) as string | null,
        status: pick(get("status") ?? defaultStatus, STATUSES, defaultStatus, STATUS_ALIAS),
        priority: pick(get("priority"), PRIORITIES, "MEDIUM"),
        type: pick(get("type"), TYPES, "FEATURE"),
        estimateHours: estimate,
        dueDate: due,
        assigneeId: resolveAssignee(get("assignee") ?? get("assignee_email") ?? get("email")),
      };
    });

    const valid = rows.filter((r) => r.title);
    const skipped = rows.length - valid.length;
    if (valid.length === 0) return NextResponse.json({ error: "No rows had a title." }, { status: 400 });

    // Create and return full records (with assignee) so the board can render them.
    // All-or-nothing: a mid-batch failure must not leave a partial import behind
    // (which would duplicate on retry).
    const created = await prisma.$transaction(
      valid.map((r) =>
        prisma.task.create({
          data: {
            projectId,
            title: r.title,
            description: r.description,
            status: r.status as never,
            priority: r.priority as never,
            type: r.type as never,
            estimateHours: r.estimateHours,
            dueDate: r.dueDate,
            assigneeId: r.assigneeId,
          },
          include: { assignee: true },
        })
      )
    );

    return NextResponse.json({ ok: true, created, count: created.length, skipped });
  } catch (e) {
    console.error("Bulk task import failed:", e);
    return NextResponse.json({ error: "Import failed. Check the format and try again." }, { status: 500 });
  }
}
