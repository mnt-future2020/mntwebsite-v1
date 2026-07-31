import { prisma } from "@/lib/db";
import { PageHeader, DbNotice, Empty } from "@/components/admin/ui";
import LeadsTable from "@/components/admin/LeadsTable";
import Icon from "@/components/Icon";
import { BLOCKED_LEAD_SOURCE } from "@/lib/antispam";

export const dynamic = "force-dynamic";

async function getLeads(held: boolean) {
  try {
    const [leads, heldCount] = await Promise.all([
      prisma.lead.findMany({
        where: held ? { source: BLOCKED_LEAD_SOURCE } : { NOT: { source: BLOCKED_LEAD_SOURCE } },
        orderBy: { createdAt: "desc" },
      }),
      prisma.lead.count({ where: { source: BLOCKED_LEAD_SOURCE } }),
    ]);
    return { leads, heldCount };
  } catch {
    return null;
  }
}

export default async function LeadsPage(props: { searchParams: Promise<{ held?: string }> }) {
  const searchParams = await props.searchParams;
  const held = searchParams.held === "1";
  const data = await getLeads(held);
  const action =
    data && data.leads.length > 0 ? (
      <a href="/api/admin/leads/export" className="btn-ghost">
        <Icon name="download" className="h-4 w-4" /> Export CSV
      </a>
    ) : null;

  return (
    <>
      <PageHeader
        title={held ? "Held submissions" : "Leads"}
        subtitle={
          held
            ? "Caught by the spam filter, but the wording didn't look automated. Worth a skim for a real enquiry."
            : "Enquiries captured from the contact form."
        }
        action={action}
      />

      {/* A held submission is never emailed to anyone, so this link is the only
          place a false positive can surface. Show it only when there is one. */}
      {data && (held || data.heldCount > 0) && (
        <p className="mb-5 text-sm text-slate-500">
          {held ? (
            <a href="/admin/leads" className="font-semibold text-brand-700 hover:underline">
              ← Back to leads
            </a>
          ) : (
            <a href="/admin/leads?held=1" className="font-semibold text-brand-700 hover:underline">
              {data.heldCount} submission{data.heldCount === 1 ? "" : "s"} held by the spam filter →
            </a>
          )}
        </p>
      )}

      {data === null ? (
        <DbNotice />
      ) : data.leads.length === 0 ? (
        <Empty
          icon="users"
          title={held ? "Nothing held" : "No leads yet"}
          body={
            held
              ? "The spam filter hasn't held back anything that looked human."
              : "Submissions from the contact form will appear here automatically."
          }
        />
      ) : (
        <LeadsTable leads={data.leads.map((l) => ({ ...l, createdAt: l.createdAt.toISOString() }))} />
      )}
    </>
  );
}
