import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export const runtime = "nodejs";

type Ctx = { params: Promise<{ id: string }> };

// Only map keys actually present in the body, so a partial PATCH never wipes
// fields it didn't mention. (The edit form always sends the full set.)
function parseProjectPatch(b: Record<string, unknown>) {
  const d = (s: unknown) => (s ? new Date(String(s)) : null);
  const i = (n: unknown) => {
    const v = parseInt(String(n ?? ""), 10);
    return Number.isFinite(v) ? v : 0;
  };
  const data: Record<string, unknown> = {};
  const has = (k: string) => Object.prototype.hasOwnProperty.call(b, k);
  if (has("name")) data.name = String(b.name || "").trim();
  if (has("description")) data.description = (b.description as string) || null;
  if (has("clientId")) data.clientId = (b.clientId as string) || null;
  if (has("status")) data.status = b.status as never;
  if (has("billingType")) data.billingType = b.billingType as never;
  if (has("budget")) data.budget = i(b.budget);
  if (has("currency")) data.currency = (b.currency as string) || "INR";
  if (has("hourlyRate")) data.hourlyRate = i(b.hourlyRate);
  if (has("techStack"))
    data.techStack = Array.isArray(b.techStack)
      ? (b.techStack as string[])
      : String(b.techStack || "").split(",").map((s) => s.trim()).filter(Boolean);
  if (has("repoUrl")) data.repoUrl = (b.repoUrl as string) || null;
  if (has("startDate")) data.startDate = d(b.startDate);
  if (has("endDate")) data.endDate = d(b.endDate);
  if (has("leadId")) data.leadId = (b.leadId as string) || null;
  return data;
}

export async function GET(_req: Request, props: Ctx) {
  const { id } = await props.params;
  const p = await prisma.project.findUnique({ where: { id } });
  if (!p) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(p);
}

export async function PATCH(req: Request, props: Ctx) {
  const { id } = await props.params;
  try {
    const data = parseProjectPatch(await req.json());
    if ("name" in data && !data.name) return NextResponse.json({ error: "Project name is required." }, { status: 400 });
    const p = await prisma.project.update({ where: { id }, data });
    return NextResponse.json(p);
  } catch {
    return NextResponse.json({ error: "Update failed." }, { status: 500 });
  }
}

export async function DELETE(_req: Request, props: Ctx) {
  const { id } = await props.params;
  try {
    await prisma.project.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Delete failed." }, { status: 500 });
  }
}
