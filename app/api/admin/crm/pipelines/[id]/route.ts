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
    const stagesIn = Array.isArray(b.stages) ? (b.stages as { id?: string }[]) : null;

    // Guard checks FIRST — return before any mutation so a rejected save never
    // leaves the pipeline half-edited.
    let toDelete: string[] = [];
    if (stagesIn) {
      const keep = new Set(stagesIn.filter((s) => s.id).map((s) => s.id));
      const existing = await prisma.pipelineStage.findMany({
        where: { pipelineId: id },
        include: { _count: { select: { deals: true } } },
      });
      const removed = existing.filter((st) => !keep.has(st.id));
      const blocked = removed.find((st) => st._count.deals > 0);
      if (blocked)
        return NextResponse.json({ error: `“${blocked.name}” has ${blocked._count.deals} deal(s) — move them before deleting the stage.` }, { status: 409 });
      toDelete = removed.map((st) => st.id);
    }

    const nameChange = has(b, "name") && String(b.name).trim();
    const setDefault = has(b, "isDefault");

    // Apply everything atomically.
    await prisma.$transaction(async (tx) => {
      if (nameChange || setDefault) {
        const data: Record<string, unknown> = {};
        if (nameChange) data.name = String(b.name).trim();
        if (setDefault) data.isDefault = Boolean(b.isDefault);
        await tx.pipeline.update({ where: { id }, data });
        if (data.isDefault === true) {
          await tx.pipeline.updateMany({ where: { id: { not: id }, isDefault: true }, data: { isDefault: false } });
        }
      }
      if (stagesIn) {
        if (toDelete.length) await tx.pipelineStage.deleteMany({ where: { id: { in: toDelete }, pipelineId: id } });
        for (let i = 0; i < stagesIn.length; i++) {
          const s = stagesIn[i];
          const fields = stageFields(s, i);
          // updateMany scoped to this pipeline → a foreign/stale id is a no-op, never cross-pipeline corruption.
          if (s.id) await tx.pipelineStage.updateMany({ where: { id: s.id, pipelineId: id }, data: fields });
          else await tx.pipelineStage.create({ data: { ...fields, pipelineId: id } });
        }
      }
    });

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
