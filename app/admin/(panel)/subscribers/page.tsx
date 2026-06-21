import Link from "next/link";
import { prisma } from "@/lib/db";
import { PageHeader, StatCard, DbNotice, Empty } from "@/components/admin/ui";
import SubscribersTable from "@/components/admin/SubscribersTable";
import Icon from "@/components/Icon";

export const dynamic = "force-dynamic";

async function getData() {
  try {
    const [subscribers, subscribed, pending] = await Promise.all([
      prisma.subscriber.findMany({ orderBy: { createdAt: "desc" } }),
      prisma.subscriber.count({ where: { status: "SUBSCRIBED" } }),
      prisma.subscriber.count({ where: { status: "PENDING" } }),
    ]);
    return { subscribers, subscribed, pending };
  } catch {
    return null;
  }
}

export default async function SubscribersPage() {
  const data = await getData();
  const action = (
    <div className="flex flex-wrap gap-2">
      <Link href="/admin/subscribers/import" className="btn-ghost">
        <Icon name="mail" className="h-4 w-4" /> Import
      </Link>
      {data && data.subscribers.length > 0 && (
        <a href="/api/admin/subscribers/export" className="btn-ghost">
          <Icon name="download" className="h-4 w-4" /> Export CSV
        </a>
      )}
    </div>
  );

  return (
    <>
      <PageHeader
        title="Subscribers"
        subtitle="Your newsletter audience — captured from the site signup form."
        action={action}
      />

      {data === null ? (
        <DbNotice />
      ) : data.subscribers.length === 0 ? (
        <Empty
          icon="mail"
          title="No subscribers yet"
          body="When visitors sign up from the footer newsletter form, they'll appear here."
        />
      ) : (
        <>
          <div className="mb-6 grid gap-4 sm:grid-cols-3">
            <StatCard label="Total" value={data.subscribers.length} icon="users" />
            <StatCard label="Confirmed" value={data.subscribed} icon="check" accent />
            <StatCard label="Pending confirm" value={data.pending} icon="clock" />
          </div>
          <SubscribersTable
            subscribers={data.subscribers.map((s) => ({ ...s, createdAt: s.createdAt.toISOString() }))}
          />
        </>
      )}
    </>
  );
}
