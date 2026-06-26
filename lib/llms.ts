import { site, healthcareNav, ecommerceNav } from "@/lib/site";
import { getPublishedPosts } from "@/lib/blog";
import { caseStudies } from "@/lib/caseStudies";

// Builders for /llms.txt and /llms-full.txt — the LLM-facing equivalents of
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

  out.push(`# ${site.name} — ${site.legalName}`);
  out.push("");
  out.push(`> ${site.description}`);
  out.push("");
  out.push(`${site.tagline}. One senior team, two specialisms — India + global. Contact: ${site.email}`);
  out.push("");

  out.push(`## Healthcare software development`);
  out.push(`- [Healthcare overview](${abs(healthcareNav.href)}): Compliant healthcare platforms — HIPAA, ABDM, FHIR.`);
  for (const c of healthcareNav.children) out.push(`- [${c.label}](${abs(c.href)}): ${c.desc}`);
  out.push("");

  out.push(`## E-Commerce development`);
  out.push(`- [E-Commerce overview](${abs(ecommerceNav.href)}): High-growth commerce — D2C, marketplace, B2B, headless.`);
  for (const c of ecommerceNav.children) out.push(`- [${c.label}](${abs(c.href)}): ${c.desc}`);
  out.push("");

  out.push(`## Company`);
  out.push(`- [About MnT](${abs("/about")}): Who we are and how we work.`);
  out.push(`- [Security & Compliance](${abs("/security-compliance")}): HIPAA · ABDM · ISO 27001 · SOC 2 · GDPR.`);
  out.push(`- [Contact](${abs("/contact")}): Start a project or book a discovery call.`);
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

  out.push(`# ${site.name} — ${site.legalName}: full content for LLMs`);
  out.push("");
  out.push(`> ${site.description}`);
  out.push("");
  out.push(`Source: ${site.url} · Contact: ${site.email} · ${site.tagline}.`);
  out.push("");

  out.push(`---`);
  out.push("");
  out.push(`## Services`);
  out.push("");
  out.push(`### Healthcare software development — ${abs(healthcareNav.href)}`);
  for (const c of healthcareNav.children) out.push(`- **${c.label}** (${abs(c.href)}): ${c.desc}`);
  out.push("");
  out.push(`### E-Commerce development — ${abs(ecommerceNav.href)}`);
  for (const c of ecommerceNav.children) out.push(`- **${c.label}** (${abs(c.href)}): ${c.desc}`);
  out.push("");

  if (caseStudies.length) {
    out.push(`---`);
    out.push("");
    out.push(`## Work — case studies`);
    out.push("");
    for (const cs of caseStudies) {
      out.push(`### ${cs.title} — ${cs.tagline}`);
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
