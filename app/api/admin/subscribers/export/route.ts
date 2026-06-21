import { prisma } from "@/lib/db";

export const runtime = "nodejs";

function cell(v: unknown) {
  const s = (v ?? "").toString().replace(/"/g, '""');
  return `"${s}"`;
}

export async function GET() {
  try {
    const subs = await prisma.subscriber.findMany({ orderBy: { createdAt: "desc" } });
    const header = ["Email", "Name", "Status", "Source", "Subscribed", "Confirmed"];
    const rows = subs.map((s) =>
      [
        s.email,
        s.name,
        s.status,
        s.source,
        new Date(s.createdAt).toISOString(),
        s.confirmedAt ? new Date(s.confirmedAt).toISOString() : "",
      ]
        .map(cell)
        .join(",")
    );
    const csv = [header.join(","), ...rows].join("\n");
    return new Response(csv, {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="mnt-subscribers-${new Date().toISOString().slice(0, 10)}.csv"`,
      },
    });
  } catch {
    return new Response("Database unavailable", { status: 500 });
  }
}
