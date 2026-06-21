import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export const runtime = "nodejs";

type Ctx = { params: Promise<{ id: string }> };

export async function PATCH(req: Request, props: Ctx) {
  const { id } = await props.params;
  try {
    const b = await req.json();
    const c = await prisma.client.update({
      where: { id },
      data: {
        name: String(b.name || "").trim(),
        contact: (b.contact as string)?.trim() || null,
        email: (b.email as string)?.trim() || null,
        phone: (b.phone as string)?.trim() || null,
        website: (b.website as string)?.trim() || null,
        status: (b.status as string) as never,
        notes: (b.notes as string) || null,
      },
    });
    return NextResponse.json(c);
  } catch {
    return NextResponse.json({ error: "Update failed." }, { status: 500 });
  }
}

export async function DELETE(_req: Request, props: Ctx) {
  const { id } = await props.params;
  try {
    const inUse = await prisma.project.count({ where: { clientId: id } });
    if (inUse > 0) {
      return NextResponse.json(
        { error: `${inUse} project${inUse === 1 ? "" : "s"} still linked. Reassign or delete them first.` },
        { status: 409 }
      );
    }
    await prisma.client.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Delete failed." }, { status: 500 });
  }
}
