import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { ensureDefaultPipeline } from "@/lib/pipelines";

export const runtime = "nodejs";
const legacyFor = (kind: string) => (kind === "WON" ? "WON" : kind === "LOST" ? "LOST" : "NEW");

// Turn an inbound Lead into a CRM Deal: find/create the company, create a contact,
// open a deal, and mark the lead QUALIFIED.
export async function POST(req: Request) {
  try {
    const { leadId } = await req.json();
    const lead = await prisma.lead.findUnique({ where: { id: String(leadId || "") } });
    if (!lead) return NextResponse.json({ error: "Lead not found." }, { status: 404 });

    // Idempotency: a converted lead is marked QUALIFIED (or later WON). Converting
    // again would create a duplicate contact + deal, so refuse.
    if (lead.status === "QUALIFIED" || lead.status === "WON") {
      return NextResponse.json({ error: "This lead has already been converted." }, { status: 409 });
    }

    // Resolve the default pipeline's first stage so the new deal lands on the
    // board (a null stageId would make it invisible in the kanban).
    const pipe = await ensureDefaultPipeline();
    const firstStage = pipe.stages[0];

    // Do the whole conversion atomically so a partial failure can't orphan a
    // contact/company without a deal (or leave the lead un-qualified after writes).
    const dealId = await prisma.$transaction(async (tx) => {
      // 1) Company (Client) — match by name (case-insensitive) or create.
      let clientId: string | null = null;
      if (lead.company) {
        const existing = await tx.client.findFirst({ where: { name: { equals: lead.company, mode: "insensitive" } } });
        const client = existing || (await tx.client.create({ data: { name: lead.company, status: "PROSPECT", email: lead.email } }));
        clientId = client.id;
      }

      // 2) Contact from the lead's name/email.
      const [first, ...rest] = (lead.name || "Contact").trim().split(/\s+/);
      const contact = await tx.contact.create({
        data: { firstName: first || "Contact", lastName: rest.join(" ") || null, email: lead.email, clientId },
      });

      // 3) Deal — budget string → numeric value (digits only).
      const value = parseInt(String(lead.budget || "").replace(/[^\d]/g, ""), 10) || 0;
      const deal = await tx.deal.create({
        data: {
          title: lead.company ? `${lead.company} — ${lead.vertical || "Software"}` : `${lead.name} — ${lead.vertical || "Software"}`,
          clientId,
          contactId: contact.id,
          pipelineId: pipe.id,
          stageId: firstStage?.id || null,
          stage: legacyFor(firstStage?.kind || "OPEN") as never,
          stageEnteredAt: new Date(),
          probability: firstStage?.probability ?? 10,
          value,
          source: lead.source || "lead",
          notes: lead.message || null,
        },
      });

      // 4) Mark the lead qualified.
      await tx.lead.update({ where: { id: lead.id }, data: { status: "QUALIFIED" } });

      return deal.id;
    });

    return NextResponse.json({ ok: true, dealId });
  } catch {
    return NextResponse.json({ error: "Conversion failed." }, { status: 500 });
  }
}
