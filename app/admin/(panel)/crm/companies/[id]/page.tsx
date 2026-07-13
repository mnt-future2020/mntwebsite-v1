import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { DbNotice } from "@/components/admin/ui";
import CompanyRecord from "@/components/admin/crm/CompanyRecord";

export const dynamic = "force-dynamic";

async function getData(id: string) {
  try {
    const [company, contacts, deals, activities] = await Promise.all([
      prisma.client.findUnique({ where: { id } }),
      prisma.contact.findMany({ where: { clientId: id }, orderBy: { firstName: "asc" } }),
      prisma.deal.findMany({ where: { clientId: id }, orderBy: { createdAt: "desc" }, include: { stageRef: true } }),
      prisma.activity.findMany({ where: { clientId: id }, orderBy: { createdAt: "desc" }, include: { owner: true } }),
    ]);
    return { company, contacts, deals, activities };
  } catch {
    return null;
  }
}

export default async function CompanyRecordPage(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params;
  const data = await getData(id);
  if (data === null) return <DbNotice />;
  if (!data.company) notFound();

  return <CompanyRecord company={data.company} contacts={data.contacts} deals={data.deals} activities={data.activities} />;
}
