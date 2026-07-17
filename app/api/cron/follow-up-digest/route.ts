import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { sendInternal, appBaseUrl } from "@/lib/email";
import { fullName } from "@/lib/hr";
import { money, fmtDate, OPEN_STAGES } from "@/lib/crm";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const esc = (s: string) =>
  s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c] as string));

// Daily digest: emails each rep the open deals whose follow-up is due today or
// earlier. Protect with CRON_SECRET and trigger from any scheduler (see below).
//   GET /api/cron/follow-up-digest?secret=YOUR_SECRET
// or with header: Authorization: Bearer YOUR_SECRET
export async function GET(req: Request) {
  const secret = process.env.CRON_SECRET;
  const given =
    new URL(req.url).searchParams.get("secret") ||
    (req.headers.get("authorization") || "").replace(/^Bearer\s+/i, "");
  if (!secret || given !== secret) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const endOfToday = new Date();
  endOfToday.setHours(23, 59, 59, 999);

  let deals;
  try {
    deals = await prisma.deal.findMany({
      where: {
        stage: { in: [...OPEN_STAGES] as never },
        nextFollowUp: { lte: endOfToday },
        ownerId: { not: null },
      },
      include: { owner: true, client: true },
      orderBy: { nextFollowUp: "asc" },
    });
  } catch {
    return NextResponse.json({ error: "Database unavailable." }, { status: 500 });
  }

  // Group by owner email.
  const byOwner = new Map<string, { name: string; email: string; deals: typeof deals }>();
  for (const d of deals) {
    if (!d.owner?.email) continue;
    const k = d.owner.email;
    if (!byOwner.has(k)) byOwner.set(k, { name: fullName(d.owner), email: k, deals: [] });
    byOwner.get(k)!.deals.push(d);
  }

  const base = appBaseUrl();
  let sent = 0;
  let skipped = 0;
  let failed = 0;
  for (const o of byOwner.values()) {
    const rows = o.deals
      .map(
        (d) =>
          `<li style="margin:0 0 8px"><b>${esc(d.title)}</b>${d.client?.name ? ` — ${esc(d.client.name)}` : ""} · ${money(
            d.value,
            d.currency
          )} · follow up <b>${fmtDate(d.nextFollowUp)}</b></li>`
      )
      .join("");
    const inner = `<h1 style="font-size:20px;margin:0 0 12px">Your follow-ups, ${esc(o.name)}</h1>
      <p style="margin:0 0 16px">${o.deals.length} deal${o.deals.length > 1 ? "s" : ""} need a follow-up today or earlier:</p>
      <ul style="margin:0 0 20px;padding-left:18px">${rows}</ul>
      <p style="margin:0"><a href="${base}/admin/crm" style="display:inline-block;background:#0E66C2;color:#fff;text-decoration:none;padding:10px 18px;border-radius:10px;font-weight:600">Open pipeline</a></p>`;
    const r = await sendInternal(o.email, `${o.deals.length} follow-up${o.deals.length > 1 ? "s" : ""} due — MnT Future CRM`, inner);
    if (r.sent) sent++;
    else if (r.skipped) skipped++;
    else failed++;
  }

  return NextResponse.json({ owners: byOwner.size, deals: deals.length, sent, skipped, failed });
}
