import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPostBySlug, getAllPublishedSlugs } from "@/lib/blog";
import { formatDate } from "@/lib/posts";
import { site } from "@/lib/site";
import { Breadcrumbs } from "@/components/blocks";
import CTASection from "@/components/CTASection";
import Icon from "@/components/Icon";

export const revalidate = 300;

export async function generateStaticParams() {
  const slugs = await getAllPublishedSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata(props: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const params = await props.params;
  const post = await getPostBySlug(params.slug);
  if (!post) return { title: "Post not found" };
  const title = post.metaTitle || `${post.title} | MnT Future`;
  const description = post.metaDescription || post.excerpt || "";
  // A post with neither an OG image nor a cover still needs a share card, or
  // it goes out as a bare link on every social and chat surface.
  const image = post.ogImage || post.coverImage || `${site.url}/og-default.png`;
  return {
    title: { absolute: title },
    description,
    keywords: post.keywords || undefined,
    alternates: { canonical: post.canonicalUrl || `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title,
      description,
      url: `/blog/${post.slug}`,
      publishedTime: post.publishedAt ? new Date(post.publishedAt).toISOString() : undefined,
      images: [image],
    },
    twitter: { card: "summary_large_image", title, description, images: [image] },
    robots: post.noindex ? { index: false, follow: false } : { index: true, follow: true },
  };
}

export default async function PostPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const post = await getPostBySlug(params.slug);
  if (!post) notFound();

  const url = `${site.url}/blog/${post.slug}`;
  // Bylines are either a named person (e.g. "CEO Udhayaseelan") or the company
  // itself — type the schema accordingly rather than always claiming Organization.
  const authorName = post.author || "MnT Future";
  const authorIsOrg = /\b(team|mnt future)\b/i.test(authorName);
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt || post.metaDescription || "",
    image: post.coverImage ? [post.coverImage] : undefined,
    datePublished: post.publishedAt ? new Date(post.publishedAt).toISOString() : undefined,
    dateModified: new Date(post.updatedAt).toISOString(),
    author: { "@type": authorIsOrg ? "Organization" : "Person", name: authorName },
    publisher: {
      "@type": "Organization",
      name: site.name,
      legalName: site.legalName,
      logo: { "@type": "ImageObject", url: `${site.url}/mnt-logo.png` },
    },
    mainEntityOfPage: url,
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: site.url },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${site.url}/blog` },
      { "@type": "ListItem", position: 3, name: post.title, item: url },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <article>
        <header className="border-b border-bp-line bg-gradient-to-b from-[#FBFCFE] via-white to-white">
          <div className="mx-auto w-full max-w-[1440px] px-[18px] sm:px-8 lg:px-14 relative py-12 sm:py-14">
            <Breadcrumbs trail={[{ label: "Home", href: "/" }, { label: "Blog", href: "/blog" }, { label: post.title }]} tone="light" />
            <div className="mt-6 max-w-3xl">
              {post.category && (
                <span className="text-xs font-semibold uppercase tracking-[0.12em] text-brand-700">{post.category}</span>
              )}
              <h1 className="mt-3 font-display text-[2.1rem] font-extrabold leading-[1.12] tracking-[-0.02em] text-bp-ink sm:text-[2.8rem]">
                {post.title}
              </h1>
              <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-slate-500">
                <span className="font-semibold text-bp-mute">{authorName}</span>
                <span>·</span>
                {post.publishedAt ? (
                  <time dateTime={new Date(post.publishedAt).toISOString()}>{formatDate(post.publishedAt)}</time>
                ) : (
                  <span>{formatDate(post.publishedAt)}</span>
                )}
                <span>·</span>
                <span>{post.readingMins} min read</span>
              </div>
            </div>
          </div>
        </header>

        <div className="mx-auto w-full max-w-[1440px] px-[18px] sm:px-8 lg:px-14 py-12 sm:py-16">
          {post.coverImage && (
            /* eslint-disable-next-line @next/next/no-img-element */
            (<img
              src={post.coverImage}
              alt={post.title}
              width={1200}
              height={630}
              decoding="async"
              className="mx-auto mb-10 max-h-[460px] w-full max-w-4xl object-cover"
            />)
          )}
          <div
            className="prose prose-slate mx-auto max-w-3xl prose-headings:font-display prose-headings:tracking-tight prose-a:text-brand-700 prose-pre:rounded-none prose-img:rounded-none"
            dangerouslySetInnerHTML={{ __html: post.contentHtml }}
          />

          <div className="mx-auto mt-12 max-w-3xl border-t border-bp-hair pt-8">
            <Link href="/blog" className="link-arrow">
              <Icon name="arrow" className="h-4 w-4 rotate-180" /> Back to all articles
            </Link>
          </div>
        </div>
      </article>
      <CTASection />
    </>
  );
}
