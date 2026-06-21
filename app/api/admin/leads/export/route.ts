import { prisma } from "@/lib/db";

export const runtime = "nodejs";

function cell(v: unknown) {
  const s = (v ?? "").toString().replace(/"/g, '""');
  return `"${s}"`;
}

export async function GET() {
  try {
    const leads = await prisma.lead.findMany({ orderBy: { createdAt: "desc" } });
    const header = ["Date", "Name", "Email", "Company", "Vertical", "Budget", "Status", "Message"];
    const rows = leads.map((l) =>
      [
        new Date(l.createdAt).toISOString(),
        l.name,
        l.email,
        l.company,
        l.vertical,
        l.budget,
        l.status,
        l.message,
      ]
        .map(cell)
        .join(",")
    );
    const csv = [header.join(","), ...rows].join("\n");
    return new Response(csv, {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="mnt-leads-${new Date().toISOString().slice(0, 10)}.csv"`,
      },
    });
  } catch {
    return new Response("Database unavailable", { status: 500 });
  }
}
