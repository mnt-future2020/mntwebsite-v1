import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export const runtime = "nodejs";

type Ctx = { params: Promise<{ id: string }> };

export async function DELETE(_req: Request, props: Ctx) {
  const { id } = await props.params;
  try {
    await prisma.projectMember.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Couldn't remove." }, { status: 500 });
  }
}
