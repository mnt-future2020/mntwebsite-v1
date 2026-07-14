import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { getPublishedPosts } from "@/lib/blog";
import { caseStudies } from "@/lib/caseStudies";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routes = [
    "",
    "/commerce",
    "/commerce/headless-marketplace",
    "/commerce/integrations",
    "/commerce/b2b-wholesale",
    "/commerce/managed-compliance",
    "/ai-agents",
    "/ai-agents/commerce-starter",
    "/ai-agents/agent-ready-commerce",
    "/ai-agents/embedded-agents",
    "/ai-agents/ai-cleanup",
    "/security-compliance",
    "/about",
    "/open-source",
    "/contact",
    "/work",
    "/blog",
  ];
  const now = new Date();
  const staticEntries: MetadataRoute.Sitemap = routes.map((path) => ({
    url: `${site.url}${path}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: path === "" ? 1 : 0.8,
  }));

  const caseEntries: MetadataRoute.Sitemap = caseStudies.map((c) => ({
    url: `${site.url}/work/${c.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  // Exclude noindex posts — listing a page in the sitemap while its own meta
  // says noindex sends Google a mixed signal.
  const posts = (await getPublishedPosts()).filter((p) => !p.noindex);
  const postEntries: MetadataRoute.Sitemap = posts.map((p) => ({
    url: `${site.url}/blog/${p.slug}`,
    lastModified: p.updatedAt,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticEntries, ...caseEntries, ...postEntries];
}
