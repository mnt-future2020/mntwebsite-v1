import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getPublishedPosts } from "@/lib/blog";
import { formatDate } from "@/lib/posts";
import { resolveMetadata } from "@/lib/seo";
import Icon from "@/components/Icon";

export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  return resolveMetadata("/blog", {
    title: "Blog: AI-Native, Agent-Ready Commerce Insights | MnT Future",
    description:
      "Guides and insights on AI-native commerce, agent-ready selling (ACP/UCP/MCP), headless builds, and US commerce compliance: from the senior engineers at MnT Future.",
  });
}

export default async function BlogIndex() {
  const posts = await getPublishedPosts();

  return (
    <>
      <section className="border-b border-line bg-gradient-to-b from-mist to-white">
        <div className="container-mnt relative py-16 sm:py-20">
          <div className="text-[13px] font-semibold uppercase tracking-[0.12em] text-brand-700">Insights</div>
          <h1 className="mt-5 max-w-2xl font-display text-[2.4rem] font-extrabold leading-[1.08] tracking-[-0.02em] text-ink sm:text-5xl">
            Engineering insights for US commerce founders.
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-slatey">
            Practical guides on AI-native commerce, agent-ready selling, headless builds,
            and US commerce compliance: written by the people who ship it.
          </p>
        </div>
      </section>

      <section className="container-mnt py-16 sm:py-20">
        {posts.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-slate-200 bg-soft px-6 py-20 text-center">
            <h2 className="font-display text-xl font-bold text-ink">No articles published yet</h2>
            <p className="mt-2 text-slatey">New guides are on the way: check back soon.</p>
          </div>
        ) : (
          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((p) => (
              <Link
                key={p.id}
                href={`/blog/${p.slug}`}
                className="group flex flex-col overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:border-brand-100 hover:shadow-cardhover"
              >
                <div className="img-zoom relative h-44 overflow-hidden bg-deep">
                  {p.coverImage ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img src={p.coverImage} alt={p.title} className="h-full w-full object-cover" />
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <Icon name="records" className="h-12 w-12 text-brand-200" />
                    </div>
                  )}
                </div>
                <div className="flex flex-1 flex-col p-6">
                  {p.category && (
                    <span className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-700">{p.category}</span>
                  )}
                  <h2 className="mt-2 text-lg font-bold leading-snug text-ink">{p.title}</h2>
                  {p.excerpt && <p className="mt-2 line-clamp-3 text-[15px] leading-relaxed text-slatey">{p.excerpt}</p>}
                  <div className="mt-auto flex items-center gap-2 pt-5 text-xs text-slate-400">
                    <span>{formatDate(p.publishedAt)}</span>
                    <span>·</span>
                    <span>{p.readingMins} min read</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
