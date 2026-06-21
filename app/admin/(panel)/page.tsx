import Link from "next/link";
import { prisma } from "@/lib/db";
import Icon from "@/components/Icon";
import { PageHeader, StatCard, DbNotice } from "@/components/admin/ui";

export const dynamic = "force-dynamic";

async function getStats() {
  try {
    const [posts, published, drafts, leads, newLeads, subscribers] = await Promise.all([
      prisma.post.count(),
      prisma.post.count({ where: { status: "PUBLISHED" } }),
      prisma.post.count({ where: { status: "DRAFT" } }),
      prisma.lead.count(),
      prisma.lead.count({ where: { status: "NEW" } }),
      prisma.subscriber.count({ where: { status: "SUBSCRIBED" } }),
    ]);
    return { posts, published, drafts, leads, newLeads, subscribers };
  } catch {
    return null;
  }
}

export default async function Dashboard() {
  const s = await getStats();

  return (
    <>
      <PageHeader title="Dashboard" subtitle="Your blog, leads and SEO at a glance." />

      {!s ? (
        <DbNotice />
      ) : (
        <>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard label="Published posts" value={s.published} icon="records" href="/admin/posts" />
            <StatCard label="Total leads" value={s.leads} icon="users" href="/admin/leads" />
            <StatCard label="New leads" value={s.newLeads} icon="bell" href="/admin/leads" accent />
            <StatCard label="Subscribers" value={s.subscribers} icon="mail" href="/admin/subscribers" />
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <Link href="/admin/posts/new" className="group flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-5 transition-colors hover:border-brand-200">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                <Icon name="plus" className="h-5 w-5" />
              </span>
              <span className="text-sm font-semibold text-ink">Write a new post</span>
            </Link>
            <Link href="/admin/leads" className="group flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-5 transition-colors hover:border-brand-200">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                <Icon name="users" className="h-5 w-5" />
              </span>
              <span className="text-sm font-semibold text-ink">Review leads</span>
            </Link>
            <Link href="/admin/seo" className="group flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-5 transition-colors hover:border-brand-200">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                <Icon name="compass" className="h-5 w-5" />
              </span>
              <span className="text-sm font-semibold text-ink">Manage SEO</span>
            </Link>
          </div>
        </>
      )}
    </>
  );
}
