import { site, commerceNav, aiNav } from "@/lib/site";
import { getPublishedPosts } from "@/lib/blog";
import { caseStudies } from "@/lib/caseStudies";

// Builders for /llms.txt and /llms-full.txt: the LLM-facing equivalents of
// sitemap.xml. llms.txt is a curated Markdown index of the site; llms-full.txt
// inlines the actual content (services, case studies, full blog posts) so an AI
// can ingest everything in one fetch. Both auto-update as blog posts publish.

const abs = (path: string) => `${site.url}${path}`;

// Strip rich-text HTML (TipTap) down to readable plain text for the full dump.
function htmlToText(html: string): string {
  return html
    .replace(/<(script|style)[^>]*>[\s\S]*?<\/(script|style)>/gi, "")
    .replace(/<li[^>]*>/gi, "- ")
    .replace(/<\/(p|div|h[1-6]|li|tr|ul|ol|blockquote)>/gi, "\n")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

export async function buildLlmsTxt(): Promise<string> {
  const posts = (await getPublishedPosts()).filter((p) => !p.noindex);
  const out: string[] = [];

  out.push(`# ${site.name}`);
  out.push("");
  out.push(`> ${site.description}`);
  out.push("");
  out.push(`${site.tagline}. Focused on US D2C & marketplace brands: commerce platforms + AI agents. Contact: ${site.email}`);
  out.push("");

  out.push(`## Commerce Platforms`);
  out.push(`- [Commerce Platforms overview](${abs(commerceNav.href)}): Custom stores & marketplaces, integrations, B2B/wholesale, managed commerce & US compliance.`);
  for (const c of commerceNav.children) out.push(`- [${c.label}](${abs(c.href)}): ${c.desc}`);
  const models: [string, string, string][] = [
    ["D2C / Brand Stores", "/commerce/d2c-brand-stores", "Single-seller brand storefronts for fashion, beauty, food & CPG, custom-built and fully owned"],
    ["Marketplace Platforms", "/commerce/marketplace-platforms", "Multi-seller marketplaces: onboarding, commissions, split payments, search & trust"],
    ["Multi-Vendor Stores", "/commerce/multi-vendor-stores", "Marketplaces at a focused scale: local vendors, community sellers, single-category platforms"],
    ["Subscription Commerce", "/commerce/subscription-commerce", "Boxes, meal kits, refills & memberships: auto-billing, pause/skip, failed-payment recovery"],
    ["Quick Commerce / Hyperlocal", "/commerce/quick-commerce", "Minutes-level delivery: zones, live tracking, real-time stock by location"],
    ["Mobile Commerce Apps", "/commerce/mobile-commerce-apps", "Native iOS & Android shopping apps (React Native / Flutter) on one shared backend"],
  ];
  for (const [label, href, desc] of models) out.push(`- [${label}](${abs(href)}): ${desc}`);
  const integrations: [string, string, string][] = [
    ["ERP & Back-Office Integration", "/commerce/erp-integration", "Two-way, real-time sync between the store and ERP, OMS, PIM & CDP"],
    ["Payments, Shipping & 3PL", "/commerce/payments-shipping-integration", "Gateways, tax engines (Avalara/Anrok) & logistics wired in, with reconciliation"],
    ["Data Pipelines & Single Source of Truth", "/commerce/data-pipelines", "One canonical record for products, stock, pricing & customers, feeding channels and agent feeds"],
    ["Workflow Automation", "/commerce/workflow-automation", "Order routing, stock updates, fulfillment triggers & alerts, monitored with retries"],
  ];
  for (const [label, href, desc] of integrations) out.push(`- [${label}](${abs(href)}): ${desc}`);
  const b2b: [string, string, string][] = [
    ["Customer-Specific Pricing & Catalogs", "/commerce/b2b-pricing", "Negotiated price lists, contract pricing & per-account catalogs, applied automatically"],
    ["Quote / RFQ Workflows", "/commerce/quote-rfq", "RFQ, negotiation & approvals in the store; accepted quotes convert to orders"],
    ["Bulk & Repeat Ordering", "/commerce/bulk-ordering", "One-click reorder, saved lists, CSV upload & bulk carts for real B2B order sizes"],
    ["Self-Serve Buying Portals", "/commerce/buying-portals", "Account hierarchies, roles, purchase approvals, net terms & order history"],
  ];
  for (const [label, href, desc] of b2b) out.push(`- [${label}](${abs(href)}): ${desc}`);
  const managed: [string, string, string][] = [
    ["Support, Monitoring & Performance (SLA)", "/commerce/managed-support", "Proactive monitoring, incident response & performance work on defined SLA targets"],
    ["ADA / WCAG Accessibility", "/commerce/ada-accessibility", "WCAG 2.2 AA audit, fixes in the code & ongoing conformance for US stores"],
    ["PCI DSS v4.0.1 Compliance", "/commerce/pci-compliance", "Scope reduction by architecture (tokenized payments) plus continuous controls & evidence"],
    ["Sales-Tax & Economic Nexus", "/commerce/sales-tax-compliance", "Avalara/Anrok integration: accurate calculation, nexus tracking & filing readiness"],
    ["Uptime & Incident Response", "/commerce/uptime-incident-response", "Alerting, on-call response, runbooks & launch/sale readiness for revenue-critical stores"],
    ["Continuous Hardening", "/commerce/continuous-hardening", "Dependency updates, security patching & performance tuning on a cadence"],
  ];
  for (const [label, href, desc] of managed) out.push(`- [${label}](${abs(href)}): ${desc}`);
  out.push("");

  out.push(`## AI & Agents`);
  out.push(`- [AI & Agents overview](${abs(aiNav.href)}): the AI layer of every platform we build. AI Search & Recommendations, Agent-Ready Commerce, Custom AI Agents.`);
  for (const c of aiNav.children) out.push(`- [${c.label}](${abs(c.href)}): ${c.desc}`);
  const agents: [string, string, string][] = [
    ["Support Agent", "/ai-agents/support-agent", "Resolves order status, returns & product questions end to end; escalates with context"],
    ["Merchandising Agent", "/ai-agents/merchandising-agent", "Tunes collections, promotions & placement from live signals; every change human-approved"],
    ["SEO / AEO Agent", "/ai-agents/seo-aeo-agent", "Keeps the catalog visible in Google & cited in AI answers; drafts reviewed before publish"],
    ["Inventory & Demand Agent", "/ai-agents/inventory-demand-agent", "Projects stockouts, surfaces unmet demand, drafts restock orders for approval"],
  ];
  for (const [label, href, desc] of agents) out.push(`- [${label}](${abs(href)}): ${desc}`);
  out.push("");

  out.push(`## Company`);
  out.push(`- [Book a free strategy session](${abs("/strategy-session")}): Free 45-minute commerce tech consulting session: bring the problem, leave with a written architecture brief.`);
  out.push(`- [About MnT Future](${abs("/about")}): Who we are and how we work.`);
  out.push(`- [Security & Compliance](${abs("/security-compliance")}): ADA/WCAG · PCI DSS v4.0.1 · US sales-tax · SOC 2-aligned.`);
  out.push(`- [Contact](${abs("/contact")}): Book a free strategy session or agent-readiness audit.`);
  out.push("");

  if (caseStudies.length) {
    out.push(`## Work (case studies)`);
    for (const cs of caseStudies) out.push(`- [${cs.title}](${abs(`/work/${cs.slug}`)}): ${cs.tagline}`);
    out.push("");
  }

  if (posts.length) {
    out.push(`## Blog`);
    for (const p of posts) out.push(`- [${p.title}](${abs(`/blog/${p.slug}`)})${p.excerpt ? `: ${p.excerpt}` : ""}`);
    out.push("");
  }

  out.push(`## Optional`);
  out.push(`- [Full content for LLMs](${abs("/llms-full.txt")}): Every service, case study and blog post inlined as Markdown.`);
  out.push("");

  return out.join("\n");
}

export async function buildLlmsFullTxt(): Promise<string> {
  const posts = (await getPublishedPosts()).filter((p) => !p.noindex);
  const out: string[] = [];

  out.push(`# ${site.name}: full content for LLMs`);
  out.push("");
  out.push(`> ${site.description}`);
  out.push("");
  out.push(`Source: ${site.url} · Contact: ${site.email} · ${site.tagline}.`);
  out.push("");

  out.push(`---`);
  out.push("");
  out.push(`## Services`);
  out.push("");
  out.push(`### Commerce Platforms: ${abs(commerceNav.href)}`);
  for (const c of commerceNav.children) out.push(`- **${c.label}** (${abs(c.href)}): ${c.desc}`);
  out.push("");
  out.push(`### AI & Agents: ${abs(aiNav.href)}`);
  for (const c of aiNav.children) out.push(`- **${c.label}** (${abs(c.href)}): ${c.desc}`);
  out.push("");

  if (caseStudies.length) {
    out.push(`---`);
    out.push("");
    out.push(`## Work: case studies`);
    out.push("");
    for (const cs of caseStudies) {
      out.push(`### ${cs.title}: ${cs.tagline}`);
      out.push(`URL: ${abs(`/work/${cs.slug}`)}${cs.liveUrl ? ` · Live: ${cs.liveUrl}` : ""} · ${cs.category}`);
      out.push("");
      out.push(cs.summary);
      out.push("");
      if (cs.problem) {
        out.push(`**Problem:** ${cs.problem}`);
        out.push("");
      }
      if (cs.approach?.length) {
        out.push(`**Approach:**`);
        for (const a of cs.approach) out.push(`- ${a.title}: ${a.desc}`);
        out.push("");
      }
      if (cs.highlights?.length) {
        out.push(`**Highlights:**`);
        for (const h of cs.highlights) out.push(`- ${h.title}: ${h.desc}`);
        out.push("");
      }
    }
  }

  if (posts.length) {
    out.push(`---`);
    out.push("");
    out.push(`## Blog`);
    out.push("");
    for (const p of posts) {
      out.push(`### ${p.title}`);
      const meta = [
        p.publishedAt ? `Published: ${new Date(p.publishedAt).toISOString().slice(0, 10)}` : null,
        p.author ? `By ${p.author}` : null,
        p.tags?.length ? `Tags: ${p.tags.join(", ")}` : null,
      ].filter(Boolean);
      out.push(`URL: ${abs(`/blog/${p.slug}`)}${meta.length ? ` · ${meta.join(" · ")}` : ""}`);
      out.push("");
      if (p.excerpt) {
        out.push(`> ${p.excerpt}`);
        out.push("");
      }
      out.push(htmlToText(p.contentHtml || ""));
      out.push("");
    }
  }

  return out.join("\n");
}
