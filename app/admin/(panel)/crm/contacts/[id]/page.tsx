import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { DbNotice } from "@/components/admin/ui";
import ContactRecord from "@/components/admin/crm/ContactRecord";
import { fullName } from "@/lib/hr";

export const dynamic = "force-dynamic";

async function getData(id: string) {
  try {
    const [contact, deals, activities, companies, employees] = await Promise.all([
      prisma.contact.findUnique({ where: { id }, include: { client: true, owner: true } }),
      prisma.deal.findMany({ where: { contactId: id }, orderBy: { createdAt: "desc" }, include: { stageRef: true } }),
      prisma.activity.findMany({ where: { contactId: id }, orderBy: { createdAt: "desc" }, include: { owner: true } }),
      prisma.client.findMany({ orderBy: { name: "asc" } }),
      prisma.employee.findMany({ where: { status: { not: "EXITED" } }, orderBy: { firstName: "asc" } }),
    ]);
    return { contact, deals, activities, companies, employees };
  } catch {
    return null;
  }
}

export default async function ContactRecordPage(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params;
  const data = await getData(id);
  if (data === null) return <DbNotice />;
  if (!data.contact) notFound();

  return (
    <ContactRecord
      contact={data.contact}
      deals={data.deals}
      activities={data.activities}
      companies={data.companies.map((c) => ({ id: c.id, label: c.name }))}
      owners={data.employees.map((e) => ({ id: e.id, label: fullName(e) }))}
    />
  );
}
