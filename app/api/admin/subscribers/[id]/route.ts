import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export const runtime = "nodejs";

// Update status (e.g. manually unsubscribe) or delete a subscriber.
export async function PATCH(req: Request, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  try {
    const b = await req.json();
    const status = b.status as "PENDING" | "SUBSCRIBED" | "UNSUBSCRIBED";
    if (!["PENDING", "SUBSCRIBED", "UNSUBSCRIBED"].includes(status)) {
      return NextResponse.json({ error: "Invalid status." }, { status: 400 });
    }
    const sub = await prisma.subscriber.update({
      where: { id: params.id },
      data: {
        status,
        confirmedAt: status === "SUBSCRIBED" ? new Date() : undefined,
        unsubscribedAt: status === "UNSUBSCRIBED" ? new Date() : null,
      },
    });
    return NextResponse.json(sub);
  } catch {
    return NextResponse.json({ error: "Update failed." }, { status: 500 });
  }
}

export async function DELETE(_req: Request, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  try {
    await prisma.subscriber.delete({ where: { id: params.id } });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Delete failed." }, { status: 500 });
  }
}
