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
  const image = post.ogImage || post.coverImage || undefined;
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
      ...(image ? { images: [image] } : {}),
    },
    twitter: { card: "summary_large_image", title, description, ...(image ? { images: [image] } : {}) },
    robots: post.noindex ? { index: false, follow: false } : { index: true, follow: true },
  };
}

export default async function PostPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const post = await getPostBySlug(params.slug);
  if (!post) notFound();

  const url = `${site.url}/blog/${post.slug}`;
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt || post.metaDescription || "",
    image: post.coverImage ? [post.coverImage] : undefined,
    datePublished: post.publishedAt ? new Date(post.publishedAt).toISOString() : undefined,
    dateModified: new Date(post.updatedAt).toISOString(),
    author: { "@type": "Organization", name: post.author || "MnT Future" },
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
        <header className="relative overflow-hidden bg-navy text-white">
          <div className="pointer-events-none absolute inset-0 bg-grid-faint bg-[size:54px_54px] opacity-40" />
          <div className="pointer-events-none absolute -left-40 -top-24 h-[24rem] w-[24rem] rounded-full bg-brand/20 blur-[120px]" />
          <div className="container-mnt relative py-14 sm:py-16">
            <Breadcrumbs trail={[{ label: "Home", href: "/" }, { label: "Blog", href: "/blog" }, { label: post.title }]} />
            <div className="mt-6 max-w-3xl">
              {post.category && (
                <span className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-300">{post.category}</span>
              )}
              <h1 className="mt-3 font-display text-[2.1rem] font-extrabold leading-[1.12] tracking-tight sm:text-[2.8rem]">
                {post.title}
              </h1>
              <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-white/60">
                <span>{post.author}</span>
                <span>·</span>
                <span>{formatDate(post.publishedAt)}</span>
                <span>·</span>
                <span>{post.readingMins} min read</span>
              </div>
            </div>
          </div>
        </header>

        <div className="container-mnt py-12 sm:py-16">
          {post.coverImage && (
            /* eslint-disable-next-line @next/next/no-img-element */
            (<img src={post.coverImage} alt={post.title} className="mx-auto mb-10 max-h-[460px] w-full max-w-4xl rounded-3xl object-cover" />)
          )}
          <div
            className="prose prose-slate mx-auto max-w-3xl prose-headings:font-display prose-headings:tracking-tight prose-a:text-brand-700 prose-img:rounded-2xl"
            dangerouslySetInnerHTML={{ __html: post.contentHtml }}
          />

          <div className="mx-auto mt-12 max-w-3xl border-t border-slate-100 pt-8">
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
