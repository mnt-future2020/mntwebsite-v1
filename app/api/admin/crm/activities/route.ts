import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export const runtime = "nodejs";
const TYPES = ["NOTE", "CALL", "EMAIL", "MEETING", "TASK"];

export async function POST(req: Request) {
  try {
    const b = await req.json();
    const subject = String(b.subject || "").trim();
    if (!subject) return NextResponse.json({ error: "Subject is required." }, { status: 400 });
    const a = await prisma.activity.create({
      data: {
        type: (TYPES.includes(String(b.type)) ? String(b.type) : "NOTE") as never,
        subject,
        body: (b.body as string) || null,
        dueDate: b.dueDate ? new Date(String(b.dueDate)) : null,
        done: Boolean(b.done),
        dealId: (b.dealId as string) || null,
        contactId: (b.contactId as string) || null,
        clientId: (b.clientId as string) || null,
        ownerId: (b.ownerId as string) || null,
      },
      include: { owner: true },
    });
    return NextResponse.json(a);
  } catch {
    return NextResponse.json({ error: "Couldn't log the activity." }, { status: 500 });
  }
}
