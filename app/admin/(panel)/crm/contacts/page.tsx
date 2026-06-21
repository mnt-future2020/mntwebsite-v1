import { prisma } from "@/lib/db";
import { PageHeader, DbNotice } from "@/components/admin/ui";
import ContactsManager from "@/components/admin/crm/ContactsManager";
import { fullName } from "@/lib/hr";

export const dynamic = "force-dynamic";

async function getData() {
  try {
    const [contacts, companies, employees] = await Promise.all([
      prisma.contact.findMany({ orderBy: { createdAt: "desc" }, include: { client: true, owner: true, _count: { select: { deals: true } } } }),
      prisma.client.findMany({ orderBy: { name: "asc" } }),
      prisma.employee.findMany({ where: { status: { not: "EXITED" } }, orderBy: { firstName: "asc" } }),
    ]);
    return { contacts, companies, employees };
  } catch {
    return null;
  }
}

export default async function ContactsPage() {
  const data = await getData();
  return (
    <>
      <PageHeader title="Contacts" subtitle="People at the companies you sell to." />
      {!data ? (
        <DbNotice />
      ) : (
        <ContactsManager
          initial={data.contacts}
          companies={data.companies.map((c) => ({ id: c.id, label: c.name }))}
          owners={data.employees.map((e) => ({ id: e.id, label: fullName(e) }))}
        />
      )}
    </>
  );
}
