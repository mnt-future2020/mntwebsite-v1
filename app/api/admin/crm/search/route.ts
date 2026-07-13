import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth";

export const runtime = "nodejs";

// Lightweight cross-record search for the ⌘K command palette.
export async function GET(req: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ results: [] }, { status: 401 });
  const q = (new URL(req.url).searchParams.get("q") || "").trim();
  if (q.length < 1) return NextResponse.json({ results: [] });

  try {
    const ci = { contains: q, mode: "insensitive" as const };
    const [companies, contacts, deals] = await Promise.all([
      prisma.client.findMany({ where: { name: ci }, orderBy: { name: "asc" }, take: 6 }),
      prisma.contact.findMany({
        where: { OR: [{ firstName: ci }, { lastName: ci }, { email: ci }] },
        include: { client: true },
        take: 6,
      }),
      prisma.deal.findMany({ where: { title: ci }, include: { client: true }, orderBy: { updatedAt: "desc" }, take: 6 }),
    ]);

    const results = [
      ...companies.map((c) => ({ type: "company", id: c.id, label: c.name, sub: "Company", href: `/admin/crm/companies/${c.id}` })),
      ...contacts.map((c) => ({
        type: "contact",
        id: c.id,
        label: [c.firstName, c.lastName].filter(Boolean).join(" "),
        sub: c.client?.name || c.email || "Contact",
        href: `/admin/crm/contacts/${c.id}`,
      })),
      ...deals.map((d) => ({ type: "deal", id: d.id, label: d.title, sub: d.client?.name || "Deal", href: "/admin/crm" })),
    ];
    return NextResponse.json({ results });
  } catch {
    return NextResponse.json({ results: [] });
  }
}
