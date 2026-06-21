import Link from "next/link";
import { prisma } from "@/lib/db";
import { PageHeader, DbNotice, Empty } from "@/components/admin/ui";
import Icon from "@/components/Icon";

export const dynamic = "force-dynamic";

async function getCampaigns() {
  try {
    return await prisma.campaign.findMany({ orderBy: { createdAt: "desc" } });
  } catch {
    return null;
  }
}

function fmt(d: Date) {
  return new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

export default async function CampaignsPage() {
  const campaigns = await getCampaigns();
  const action = (
    <Link href="/admin/campaigns/new" className="btn-primary">
      <Icon name="plus" className="h-4 w-4" /> New campaign
    </Link>
  );

  return (
    <>
      <PageHeader title="Campaigns" subtitle="Compose and send newsletters to your subscribers." action={action} />

      {campaigns === null ? (
        <DbNotice />
      ) : campaigns.length === 0 ? (
        <Empty
          icon="mail"
          title="No campaigns yet"
          body="Create your first newsletter and send it to your confirmed subscribers."
          action={
            <Link href="/admin/campaigns/new" className="btn-primary">
              <Icon name="plus" className="h-4 w-4" /> New campaign
            </Link>
          }
        />
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white">
          <table className="w-full min-w-[600px] text-sm">
            <thead className="border-b border-slate-200 bg-slate-50 text-left text-xs uppercase tracking-wide text-slatey">
              <tr>
                <th className="px-5 py-3 font-semibold">Subject</th>
                <th className="px-5 py-3 font-semibold">Status</th>
                <th className="px-5 py-3 font-semibold">Sent to</th>
                <th className="px-5 py-3 font-semibold">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {campaigns.map((c) => (
                <tr key={c.id} className="hover:bg-slate-50/60">
                  <td className="px-5 py-3.5">
                    <Link href={`/admin/campaigns/${c.id}`} className="font-medium text-ink hover:text-brand-700">
                      {c.subject || "(no subject)"}
                    </Link>
                    {c.preheader && <div className="text-xs text-slatey">{c.preheader}</div>}
                  </td>
                  <td className="px-5 py-3.5">
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                        c.status === "SENT"
                          ? "bg-green-100 text-green-700"
                          : c.status === "SENDING"
                          ? "bg-amber-100 text-amber-700"
                          : "bg-slate-100 text-slatey"
                      }`}
                    >
                      {c.status}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-slatey">{c.status === "SENT" ? c.sentCount : "—"}</td>
                  <td className="px-5 py-3.5 text-slatey">{c.sentAt ? fmt(c.sentAt) : fmt(c.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
