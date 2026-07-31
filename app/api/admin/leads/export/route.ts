import { prisma } from "@/lib/db";
import { BLOCKED_LEAD_SOURCE } from "@/lib/antispam";

export const runtime = "nodejs";

function cell(v: unknown) {
  let s = (v ?? "").toString();
  // Neutralize spreadsheet formula injection: a leading =, +, -, @, tab or CR
  // makes Excel/Sheets evaluate the cell as a formula even when quoted.
  if (/^[=+\-@\t\r]/.test(s)) s = "'" + s;
  s = s.replace(/"/g, '""');
  return `"${s}"`;
}

export async function GET() {
  try {
    // Held submissions stay out of the export: they're a review queue, not leads.
    const leads = await prisma.lead.findMany({
      where: { NOT: { source: BLOCKED_LEAD_SOURCE } },
      orderBy: { createdAt: "desc" },
    });
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
