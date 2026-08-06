import type { Metadata } from "next";
import BlueprintMotion from "@/components/BlueprintMotion";
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
      "Guides on AI-native commerce, agent-ready selling (ACP/UCP/MCP), custom platform builds and US commerce compliance, from the engineers at MnT Future.",
  });
}

export default async function BlogIndex() {
  const posts = await getPublishedPosts();

  return (
    <>
      <BlueprintMotion />
      <section className="border-b border-bp-line bg-gradient-to-b from-[#FBFCFE] via-white to-white">
        <div className="mx-auto w-full max-w-[1440px] px-[18px] sm:px-8 lg:px-14 relative py-16 sm:py-20">
          <div className="flex items-center gap-4"><span className="h-px w-[38px] shrink-0 bg-brand-500" /><span className="font-mono text-[11.5px] uppercase tracking-[0.2em] text-brand-700">Insights</span></div>
          <h1 className="mt-5 max-w-2xl font-display text-[2.4rem] font-extrabold leading-[1.08] tracking-[-0.02em] text-bp-ink sm:text-5xl">
            Engineering insights for US commerce founders.
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-bp-mute">
            Practical guides on AI-native commerce, agent-ready selling, custom platform builds,
            and US commerce compliance: written by the people who ship it.
          </p>
        </div>
      </section>

      <section data-reveal className="mx-auto w-full max-w-[1440px] px-[18px] sm:px-8 lg:px-14 py-16 sm:py-20">
        {posts.length === 0 ? (
          <div className="border border-dashed border-bp-edge bg-bp-wash px-6 py-20 text-center">
            <h2 className="font-display text-xl font-bold text-bp-ink">No articles published yet</h2>
            <p className="mt-2 text-bp-mute">New guides are on the way: check back soon.</p>
          </div>
        ) : (
          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((p) => (
              <Link
                key={p.id}
                href={`/blog/${p.slug}`}
                className="group flex flex-col overflow-hidden border border-bp-hair bg-white shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:border-brand-100 hover:shadow-cardhover"
              >
                <div className="img-zoom relative h-44 overflow-hidden bg-deep">
                  {p.coverImage ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    /* Covers come from the CMS, so their real size isn't known
                       at build time. The card is a fixed-height, object-cover
                       box, so these are the share-card ratio purely to give the
                       browser a shape to hold before the file arrives. */
                    <img
                      src={p.coverImage}
                      alt={p.title}
                      width={1200}
                      height={630}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover"
                    />
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
                  <h2 className="mt-2 text-lg font-bold leading-snug text-bp-ink">{p.title}</h2>
                  {p.excerpt && <p className="mt-2 line-clamp-3 text-[15px] leading-relaxed text-bp-mute">{p.excerpt}</p>}
                  <div className="mt-auto flex flex-wrap items-center gap-x-2 gap-y-1 pt-5 text-xs text-slate-400">
                    <span className="font-medium text-slate-500">{p.author}</span>
                    <span>·</span>
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
