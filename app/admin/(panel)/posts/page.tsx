import Link from "next/link";
import { prisma } from "@/lib/db";
import { PageHeader, DbNotice, Empty } from "@/components/admin/ui";
import Icon from "@/components/Icon";
import { formatDate } from "@/lib/posts";

export const dynamic = "force-dynamic";

async function getPosts() {
  try {
    return await prisma.post.findMany({ orderBy: { updatedAt: "desc" } });
  } catch {
    return null;
  }
}

export default async function PostsPage() {
  const posts = await getPosts();
  const action = (
    <Link href="/admin/posts/new" className="btn-primary">
      <Icon name="plus" className="h-4 w-4" /> New post
    </Link>
  );

  return (
    <>
      <PageHeader title="Blog posts" subtitle="Create and manage your SEO blog." action={action} />
      {posts === null ? (
        <DbNotice />
      ) : posts.length === 0 ? (
        <Empty icon="records" title="No posts yet" body="Write your first post to start building topical authority." action={action} />
      ) : (
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
          <table className="w-full text-sm">
            <thead className="border-b border-slate-200 bg-slate-50 text-left text-xs uppercase tracking-wide text-slatey">
              <tr>
                <th className="px-5 py-3 font-semibold">Title</th>
                <th className="px-5 py-3 font-semibold">Status</th>
                <th className="px-5 py-3 font-semibold">Updated</th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {posts.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50">
                  <td className="px-5 py-3">
                    <Link href={`/admin/posts/${p.id}`} className="font-medium text-ink hover:text-brand-700">
                      {p.title}
                    </Link>
                    <div className="text-xs text-slate-400">/blog/{p.slug}</div>
                  </td>
                  <td className="px-5 py-3">
                    <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${p.status === "PUBLISHED" ? "bg-green-100 text-green-700" : "bg-slate-100 text-slatey"}`}>
                      {p.status === "PUBLISHED" ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-slatey">{formatDate(p.updatedAt)}</td>
                  <td className="px-5 py-3 text-right">
                    <Link href={`/admin/posts/${p.id}`} className="font-medium text-brand-700 hover:underline">Edit</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
