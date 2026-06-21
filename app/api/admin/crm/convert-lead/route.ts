import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export const runtime = "nodejs";

// Turn an inbound Lead into a CRM Deal: find/create the company, create a contact,
// open a deal, and mark the lead QUALIFIED.
export async function POST(req: Request) {
  try {
    const { leadId } = await req.json();
    const lead = await prisma.lead.findUnique({ where: { id: String(leadId || "") } });
    if (!lead) return NextResponse.json({ error: "Lead not found." }, { status: 404 });

    // 1) Company (Client) — match by name (case-insensitive) or create.
    let clientId: string | null = null;
    if (lead.company) {
      const existing = await prisma.client.findFirst({ where: { name: { equals: lead.company, mode: "insensitive" } } });
      const client = existing || (await prisma.client.create({ data: { name: lead.company, status: "PROSPECT", email: lead.email } }));
      clientId = client.id;
    }

    // 2) Contact from the lead's name/email.
    const [first, ...rest] = (lead.name || "Contact").trim().split(/\s+/);
    const contact = await prisma.contact.create({
      data: { firstName: first || "Contact", lastName: rest.join(" ") || null, email: lead.email, clientId },
    });

    // 3) Deal — budget string → numeric value (digits only).
    const value = parseInt(String(lead.budget || "").replace(/[^\d]/g, ""), 10) || 0;
    const deal = await prisma.deal.create({
      data: {
        title: lead.company ? `${lead.company} — ${lead.vertical || "Software"}` : `${lead.name} — ${lead.vertical || "Software"}`,
        clientId,
        contactId: contact.id,
        stage: "NEW",
        value,
        source: lead.source || "lead",
        notes: lead.message || null,
      },
    });

    // 4) Mark the lead qualified.
    await prisma.lead.update({ where: { id: lead.id }, data: { status: "QUALIFIED" } });

    return NextResponse.json({ ok: true, dealId: deal.id });
  } catch {
    return NextResponse.json({ error: "Conversion failed." }, { status: 500 });
  }
}
