import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { PageHeader } from "@/components/admin/ui";
import PostForm from "@/components/admin/PostForm";

export const dynamic = "force-dynamic";

export default async function EditPostPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const post = await prisma.post.findUnique({ where: { id: params.id } }).catch(() => null);
  if (!post) notFound();

  return (
    <>
      <PageHeader title="Edit post" subtitle={`/blog/${post.slug}`} />
      <PostForm
        initial={{
          id: post.id,
          slug: post.slug,
          title: post.title,
          excerpt: post.excerpt ?? "",
          contentHtml: post.contentHtml,
          coverImage: post.coverImage ?? "",
          status: post.status,
          category: post.category ?? "",
          tags: post.tags,
          author: post.author,
          metaTitle: post.metaTitle ?? "",
          metaDescription: post.metaDescription ?? "",
          ogImage: post.ogImage ?? "",
          canonicalUrl: post.canonicalUrl ?? "",
          keywords: post.keywords ?? "",
          noindex: post.noindex,
        }}
      />
    </>
  );
}
