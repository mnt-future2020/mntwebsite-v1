import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { getPublishedPosts } from "@/lib/blog";
import { caseStudies } from "@/lib/caseStudies";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routes = [
    "",
    // India. Only pages that exist today: a sitemap entry for an unbuilt page
    // is a self-inflicted 404 in Search Console.
    "/in",
    "/in/ecommerce",
    "/in/ecommerce/platform-development",
    "/in/ecommerce/d2c-storefront",
    "/in/ecommerce/marketplace",
    "/in/ecommerce/b2b-wholesale",
    "/in/ecommerce/integrations",
    "/in/ecommerce/managed-support",
    "/in/ai",
    "/in/ai/consultation",
    "/in/ai/automation",
    "/in/ai/agent-development",
    "/in/ai/custom-applications",
    "/in/ai/forward-deployed-engineering",
    "/in/products",
    "/in/products/ai-desk",
    "/in/products/ai-crm",
    "/in/products/commerce-india",
    "/in/work",
    "/in/about",
    "/in/contact",
    "/in/strategy-session",
    "/commerce",
    "/commerce/headless-marketplace",
    "/commerce/d2c-brand-stores",
    "/commerce/marketplace-platforms",
    "/commerce/multi-vendor-stores",
    "/commerce/subscription-commerce",
    "/commerce/quick-commerce",
    "/commerce/mobile-commerce-apps",
    "/commerce/integrations",
    "/commerce/erp-integration",
    "/commerce/payments-shipping-integration",
    "/commerce/data-pipelines",
    "/commerce/workflow-automation",
    "/commerce/b2b-wholesale",
    "/commerce/b2b-pricing",
    "/commerce/quote-rfq",
    "/commerce/bulk-ordering",
    "/commerce/buying-portals",
    "/commerce/managed-compliance",
    "/commerce/managed-support",
    "/commerce/ada-accessibility",
    "/commerce/pci-compliance",
    "/commerce/sales-tax-compliance",
    "/commerce/uptime-incident-response",
    "/commerce/continuous-hardening",
    "/commerce/shopify",
    "/ai-agents",
    "/ai-agents/commerce-starter",
    "/ai-agents/agent-ready-commerce",
    "/ai-agents/embedded-agents",
    "/ai-agents/support-agent",
    "/ai-agents/merchandising-agent",
    "/ai-agents/seo-aeo-agent",
    "/ai-agents/inventory-demand-agent",
    "/commerce/ai-cleanup",
    "/security-compliance",
    "/about",
    "/open-source",
    "/open-source/agentready",
    "/open-source/vibecheck",
    "/contact",
    "/strategy-session",
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

  // Exclude noindex posts: listing a page in the sitemap while its own meta
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
