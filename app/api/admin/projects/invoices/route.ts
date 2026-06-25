import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
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
    const baseData = {
      projectId,
      clientId,
      amount,
      currency: (b.currency as string) || "INR",
      status: (b.status as string || "DRAFT") as never,
      issueDate: b.issueDate ? new Date(String(b.issueDate)) : null,
      dueDate: b.dueDate ? new Date(String(b.dueDate)) : null,
      notes: (b.notes as string) || null,
    };
    const include = { project: true, client: true };

    // Explicit number from the admin — create directly.
    if (b.number) {
      const inv = await prisma.invoice.create({ data: { number: String(b.number), ...baseData }, include });
      return NextResponse.json(inv);
    }
    // Auto-number from count() is a non-atomic read; concurrent creates can collide
    // on the @unique number, so retry on a unique-violation instead of 500ing.
    for (let attempt = 0; attempt < 5; attempt++) {
      const count = await prisma.invoice.count();
      try {
        const inv = await prisma.invoice.create({
          data: { number: nextInvoiceNumber(count + attempt), ...baseData },
          include,
        });
        return NextResponse.json(inv);
      } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === "P2002") continue;
        throw e;
      }
    }
    return NextResponse.json({ error: "Couldn't generate a unique invoice number, try again." }, { status: 409 });
  } catch {
    return NextResponse.json({ error: "Couldn't create the invoice." }, { status: 500 });
  }
}
