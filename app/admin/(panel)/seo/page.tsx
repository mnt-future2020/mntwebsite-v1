import { prisma } from "@/lib/db";
import { PageHeader } from "@/components/admin/ui";
import SeoForm from "@/components/admin/SeoForm";
import { SITE_PATHS } from "@/lib/settings";

export const dynamic = "force-dynamic";

async function getOverrides() {
  try {
    const list = await prisma.seoSetting.findMany();
    const map: Record<string, { title: string | null; description: string | null; ogImage: string | null; noindex: boolean }> = {};
    for (const o of list) map[o.path] = { title: o.title, description: o.description, ogImage: o.ogImage, noindex: o.noindex };
    return map;
  } catch {
    return {};
  }
}

export default async function SeoPage() {
  const overrides = await getOverrides();
  return (
    <>
      <PageHeader title="SEO" subtitle="Override titles, descriptions and indexing per page. Blog posts are managed in each post." />
      <SeoForm paths={SITE_PATHS} overrides={overrides} />
    </>
  );
}
