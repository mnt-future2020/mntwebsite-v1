import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { nextInvoiceNumber } from "@/lib/projects";

export const runtime = "nodejs";

export async function GET() {
  try {
    const list = await prisma.invoice.findMany({
      orderBy: { createdAt: "desc" },
      include: { project: true, client: true },
    });
    return NextResponse.json(list);
  } catch {
    return NextResponse.json([]);
  }
}

export async function POST(req: Request) {
  try {
    const b = await req.json();
    const amount = parseInt(String(b.amount ?? "0"), 10) || 0;
    const projectId = (b.projectId as string) || null;
    let clientId = (b.clientId as string) || null;
    // Derive client from project when not given.
    if (!clientId && projectId) {
      const p = await prisma.project.findUnique({ where: { id: projectId }, select: { clientId: true } });
      clientId = p?.clientId || null;
    }
    const count = await prisma.invoice.count();
    const inv = await prisma.invoice.create({
      data: {
        number: b.number ? String(b.number) : nextInvoiceNumber(count),
        projectId,
        clientId,
        amount,
        currency: (b.currency as string) || "INR",
        status: (b.status as string || "DRAFT") as never,
        issueDate: b.issueDate ? new Date(String(b.issueDate)) : null,
        dueDate: b.dueDate ? new Date(String(b.dueDate)) : null,
        notes: (b.notes as string) || null,
      },
      include: { project: true, client: true },
    });
    return NextResponse.json(inv);
  } catch {
    return NextResponse.json({ error: "Couldn't create the invoice." }, { status: 500 });
  }
}
