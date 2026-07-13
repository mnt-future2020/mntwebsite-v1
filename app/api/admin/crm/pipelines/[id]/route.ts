import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { STAGE_COLOR_TOKENS, STAGE_KINDS } from "@/lib/crm";

export const runtime = "nodejs";

type Ctx = { params: Promise<{ id: string }> };
const has = (b: Record<string, unknown>, k: string) => Object.prototype.hasOwnProperty.call(b, k);
const kindOf = (k: unknown) => ((STAGE_KINDS as readonly string[]).includes(String(k)) ? String(k) : "OPEN");
const colorOf = (c: unknown) => ((STAGE_COLOR_TOKENS as readonly string[]).includes(String(c)) ? String(c) : "slate");
const probOf = (p: unknown) => Math.max(0, Math.min(100, parseInt(String(p ?? 10), 10) || 0));

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function stageFields(s: any, i: number) {
  return {
    name: String(s?.name || `Stage ${i + 1}`).trim().slice(0, 40) || `Stage ${i + 1}`,
    kind: kindOf(s?.kind) as never,
    probability: probOf(s?.probability),
    color: colorOf(s?.color),
    order: i,
  };
}

export async function PATCH(req: Request, props: Ctx) {
  const { id } = await props.params;
  try {
    const b = await req.json();

    if (has(b, "name") || has(b, "isDefault")) {
      const data: Record<string, unknown> = {};
      if (has(b, "name") && String(b.name).trim()) data.name = String(b.name).trim();
      if (has(b, "isDefault")) data.isDefault = Boolean(b.isDefault);
      await prisma.pipeline.update({ where: { id }, data });
      if (data.isDefault === true) {
        await prisma.pipeline.updateMany({ where: { id: { not: id }, isDefault: true }, data: { isDefault: false } });
      }
    }

    // Reconcile stages against the sent array: update-by-id, create new, delete
    // removed (blocked when a removed stage still holds deals).
    if (Array.isArray(b.stages)) {
      const incoming = b.stages as { id?: string }[];
      const keep = new Set(incoming.filter((s) => s.id).map((s) => s.id));
      const existing = await prisma.pipelineStage.findMany({
        where: { pipelineId: id },
        include: { _count: { select: { deals: true } } },
      });
      for (const st of existing) {
        if (!keep.has(st.id)) {
          if (st._count.deals > 0)
            return NextResponse.json({ error: `“${st.name}” has ${st._count.deals} deal(s) — move them before deleting the stage.` }, { status: 409 });
          await prisma.pipelineStage.delete({ where: { id: st.id } });
        }
      }
      for (let i = 0; i < incoming.length; i++) {
        const s = incoming[i];
        const fields = stageFields(s, i);
        if (s.id) await prisma.pipelineStage.update({ where: { id: s.id }, data: fields });
        else await prisma.pipelineStage.create({ data: { ...fields, pipelineId: id } });
      }
    }

    const updated = await prisma.pipeline.findUnique({
      where: { id },
      include: { stages: { orderBy: { order: "asc" } }, _count: { select: { deals: true } } },
    });
    return NextResponse.json(updated);
  } catch {
    return NextResponse.json({ error: "Update failed." }, { status: 500 });
  }
}

export async function DELETE(_req: Request, props: Ctx) {
  const { id } = await props.params;
  try {
    const total = await prisma.pipeline.count();
    if (total <= 1) return NextResponse.json({ error: "You can't delete your only pipeline." }, { status: 409 });
    const deals = await prisma.deal.count({ where: { pipelineId: id } });
    if (deals > 0)
      return NextResponse.json({ error: `${deals} deal(s) are in this pipeline — move them first.` }, { status: 409 });
    const wasDefault = (await prisma.pipeline.findUnique({ where: { id }, select: { isDefault: true } }))?.isDefault;
    await prisma.pipeline.delete({ where: { id } }); // cascades stages
    if (wasDefault) {
      const next = await prisma.pipeline.findFirst({ orderBy: { order: "asc" } });
      if (next) await prisma.pipeline.update({ where: { id: next.id }, data: { isDefault: true } });
    }
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Delete failed." }, { status: 500 });
  }
}
