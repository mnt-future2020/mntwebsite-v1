import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { getPublishedPosts } from "@/lib/blog";
import { caseStudies } from "@/lib/caseStudies";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routes = [
    "",
    "/healthcare-software-development",
    "/healthcare-software-development/custom",
    "/healthcare-software-development/telemedicine",
    "/healthcare-software-development/ehr-emr",
    "/healthcare-software-development/hospital-management",
    "/healthcare-software-development/ai-healthcare",
    "/healthcare-software-development/abdm-fhir",
    "/healthcare-software-development/saas",
    "/ecommerce-development",
    "/ecommerce-development/custom",
    "/ecommerce-development/d2c",
    "/ecommerce-development/marketplace",
    "/ecommerce-development/shopify",
    "/ecommerce-development/b2b",
    "/ecommerce-development/mobile-app",
    "/ecommerce-development/saas",
    "/security-compliance",
    "/about",
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
