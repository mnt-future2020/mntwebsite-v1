import { prisma } from "@/lib/db";
import { PageHeader, DbNotice } from "@/components/admin/ui";
import InboxView from "@/components/admin/crm/InboxView";
import { OPEN_STAGES, followUpStatus, contactName, money } from "@/lib/crm";

export const dynamic = "force-dynamic";

async function getData() {
  try {
    const [tasks, recent, dealFu, contactFu] = await Promise.all([
      prisma.activity.findMany({
        where: { type: "TASK", done: false },
        orderBy: { dueDate: "asc" },
        include: { owner: true, deal: true, contact: true, client: true },
        take: 200,
      }),
      prisma.activity.findMany({
        orderBy: { createdAt: "desc" },
        include: { owner: true, deal: true, contact: true, client: true },
        take: 20,
      }),
      prisma.deal.findMany({
        // "Open" by the stage relation's kind; fall back to the legacy enum for
        // any deal not yet mapped onto a pipeline stage.
        where: {
          nextFollowUp: { not: null },
          OR: [{ stageRef: { kind: "OPEN" } }, { stageId: null, stage: { in: OPEN_STAGES as unknown as string[] } as never }],
        },
        orderBy: { nextFollowUp: "asc" },
        include: { client: true },
        take: 100,
      }),
      prisma.contact.findMany({
        where: { nextFollowUp: { not: null } },
        orderBy: { nextFollowUp: "asc" },
        include: { client: true },
        take: 100,
      }),
    ]);
    return { tasks, recent, dealFu, contactFu };
  } catch {
    return null;
  }
}

export default async function CrmInboxPage() {
  const data = await getData();
  if (!data) {
    return (
      <>
        <PageHeader title="Inbox" subtitle="Your tasks, follow-ups, and recent activity." />
        <DbNotice />
      </>
    );
  }

  // Deals + contacts whose follow-up is overdue or due today, unified for the list.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const followUps: any[] = [];
  for (const d of data.dealFu) {
    const status = followUpStatus(d.nextFollowUp);
    if (status === "overdue" || status === "today")
      followUps.push({ id: d.id, kind: "deal", label: d.title, date: d.nextFollowUp, status, href: "/admin/crm", sub: `${money(d.value, d.currency)}${d.client ? ` · ${d.client.name}` : ""}` });
  }
  for (const c of data.contactFu) {
    const status = followUpStatus(c.nextFollowUp);
    if (status === "overdue" || status === "today")
      followUps.push({ id: c.id, kind: "contact", label: contactName(c), date: c.nextFollowUp, status, href: `/admin/crm/contacts/${c.id}`, sub: c.client?.name || "" });
  }
  followUps.sort((a, b) => (a.status === b.status ? 0 : a.status === "overdue" ? -1 : 1));

  return (
    <>
      <PageHeader title="Inbox" subtitle="Your tasks, follow-ups, and recent activity — one place to start the day." />
      <InboxView tasks={data.tasks} followUps={followUps} recent={data.recent} />
    </>
  );
}
