import { prisma } from "@/lib/db";
import { PageHeader, DbNotice, Empty } from "@/components/admin/ui";
import LeadsTable from "@/components/admin/LeadsTable";
import Icon from "@/components/Icon";

export const dynamic = "force-dynamic";

async function getLeads() {
  try {
    return await prisma.lead.findMany({ orderBy: { createdAt: "desc" } });
  } catch {
    return null;
  }
}

export default async function LeadsPage() {
  const leads = await getLeads();
  const action =
    leads && leads.length > 0 ? (
      <a href="/api/admin/leads/export" className="btn-ghost">
        <Icon name="download" className="h-4 w-4" /> Export CSV
      </a>
    ) : null;

  return (
    <>
      <PageHeader title="Leads" subtitle="Enquiries captured from the contact form." action={action} />
      {leads === null ? (
        <DbNotice />
      ) : leads.length === 0 ? (
        <Empty icon="users" title="No leads yet" body="Submissions from the contact form will appear here automatically." />
      ) : (
        <LeadsTable leads={leads.map((l) => ({ ...l, createdAt: l.createdAt.toISOString() }))} />
      )}
    </>
  );
}
