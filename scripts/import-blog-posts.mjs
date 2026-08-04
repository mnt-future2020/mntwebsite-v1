// Import blog posts sourced from the MnT Future "Daily Content Pack" Google Doc
// folder into the CMS. Idempotent: upserts by slug, safe to re-run.
// Run:  node --env-file=.env scripts/import-blog-posts.mjs
//
// Each entry below is the "1. BLOG POST" section of one daily content pack doc,
// carried over verbatim (headings/body) with the doc's own internal-link plan
// applied to the site's real routes.
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

function readingMinutes(html) {
  const text = (html || "").replace(/<[^>]+>/g, " ");
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

const POSTS = [
  {
    // Source: "MnT Content Pack — 2026-08-04 — AI Search, Recommendations &
    // Shopping Assistants" (Google Drive content-pack folder)
    slug: "product-page-ai-visibility",
    date: "2026-08-04",
    title: "AI Assistants Read Your Product Pages Worst — And That's the Page That Sells",
    excerpt:
      "Adobe's 2026 data scores US retail product pages at 66% machine-readable — the lowest of any page type. What to fix on your PDP, in order.",
    category: "AI Search & Recommendations",
    tags: ["AI Search", "Product Data", "Structured Data", "Ecommerce"],
    author: "CEO Udhayaseelan",
    coverImage: "/blog/blog-product-page-ai-visibility.png",
    metaTitle: "AI Reads Your Product Pages Worst. Here's the Fix. | MnT Future",
    metaDescription:
      "Adobe's 2026 data scores US retail product pages at 66% machine-readable — the lowest of any page type. What to fix on your PDP, in order.",
    keywords:
      "product page AI visibility, machine-readable product pages, AI shopping assistant optimization, ecommerce AI search visibility, structured product data, AI referral traffic conversion",
    contentHtml: `<p>You have probably already done a round of AI visibility work. Rewrote the homepage copy. Added FAQ schema. Published the buying guides. Checked that ChatGPT and Perplexity mention the brand when someone asks for a recommendation in your category.</p>
<p>Then you looked at where the AI-referred traffic actually lands. Not the homepage. Not the guides. It lands on product pages, and it converts better than almost anything else in your mix.</p>
<p>So here is the question worth sitting with: can an AI assistant actually read those product pages? Most brands have not checked. Adobe has, across the whole US retail sector, and the answer is uncomfortable.</p>
<h2>The number nobody expected</h2>
<p>Adobe's Q2 2026 AI Traffic Report, published 16 April 2026, is built on more than a trillion visits to US retail sites plus a survey of over 5,000 US consumers. Alongside the traffic data, Adobe ran its AI Content Visibility Checker across the sector — a diagnostic that scores a page from 0 to 100% on how much of its content a large language model can actually read. A score of 66% means a third of the page is invisible to the machine.</p>
<p>Here is the sector benchmark:</p>
<ul>
<li>Returns and exchanges pages: 82%</li>
<li>Contact us: 81%</li>
<li>FAQ: 80%</li>
<li>Customer service / help center: 79%</li>
<li>Loyalty and membership: 78%</li>
<li>Homepages: 75%</li>
<li>Category pages: 74%</li>
<li>Store locator: 73%</li>
<li>Product pages: 66%</li>
</ul>
<p>Product pages came last. The pages that describe what you sell are the pages machines read least well on the average US retail site. Your returns policy is more legible to an AI shopping assistant than your product is.</p>
<p>Adobe's own framing is blunt: retailers have thousands of SKUs, and much of that content is currently invisible to LLMs.</p>
<h2>Why this is expensive right now, not later</h2>
<p>The same report puts a price on it.</p>
<p>In March 2026, AI-sourced traffic to US retail sites converted 42% better than non-AI traffic — a record high in Adobe's data. Twelve months earlier, in March 2025, the same channel converted 38% worse. That is roughly an eighty-point swing in one year. Traffic from AI sources to US retail grew 393% year over year across Q1 2026.</p>
<p>And once an AI-referred shopper arrives, they behave like someone who has already made up their mind: 12% higher engagement rate, 48% longer on the page, 13% more pages per visit than other channels.</p>
<p>Read those two findings together and the problem states itself. The highest-intent traffic in your mix is arriving because an assistant read a page about your product — and on the average US retail site, a third of that page is not readable by the thing doing the reading. Every product where the assistant could not confirm the material, the fit, the compatibility or the return window is a product it recommended less confidently, described more vaguely, or skipped.</p>
<blockquote>
<p><strong>Why are product pages the least readable page type for AI?</strong></p>
<p>Product pages score lowest because their decisive facts — specs, materials, sizing, compatibility, availability — live in images, JavaScript tabs and filter facets rather than in server-rendered text and complete Product schema. Adobe's 2026 benchmark puts US retail product pages at 66% machine-readable, against 75% for homepages. The fix is the data layer, not the copy.</p>
</blockquote>
<h2>Three engineering reasons product pages score lowest</h2>
<p>We build and run commerce platforms, so this pattern is familiar. It is almost never a content problem.</p>
<h3>1. The facts live in pixels and scripts</h3>
<p>Spec tables exported as images. Size charts inside a modal that only loads on click. Materials and care instructions in a tabbed accordion that populates via JavaScript after interaction. A human sees all of it. A retrieval agent that does not execute scripts, or does not wait for them, sees a heading and an empty container.</p>
<h3>2. Attributes exist as facets, not as statements</h3>
<p>This one is subtle and extremely common. Your catalog knows the jacket is waterproof — waterproof: true sits in the search index and powers a filter checkbox. But the page itself never says "waterproof" in readable text, and your Product schema never declares it. The attribute exists in your database and not on your page. Filters made the fact machine-queryable for your own site search while leaving it machine-invisible to everyone else.</p>
<h3>3. Variant sprawl with thin, templated copy</h3>
<p>Color and size variants generating dozens of near-identical URLs, templated descriptions that differ by one word, and canonicals that were configured once and never revisited. The differentiating attribute — the thing a shopper actually asked the assistant about — is the one thing the variant page does not clearly state.</p>
<h2>What to fix, in order</h2>
<p>Order matters here. Most teams start at step three and wonder why nothing moved.</p>
<ol>
<li>Score your own PDP template first. Fetch it the way a retrieval bot does: no JavaScript execution, no cookies, no session. Whatever survives is what the assistant sees. Do this before you write a word of new copy — it usually reframes the whole project.</li>
<li>Complete the Product schema, not just the required fields. Most product markup stops at name, price and availability. Complete markup declares GTIN, brand, material, color, size, audience, shipping details and return policy. Incomplete Product markup is the norm; complete Product markup is a genuine differentiator, because it hands the assistant facts it does not have to infer.</li>
<li>State attributes in prose, not only in facets. One honest paragraph per product that says the specs in sentences. Not marketing adjectives — the actual claims a shopper filters on.</li>
<li>Server-render anything behind a click. If a fact lives inside a tab, an accordion or a modal, it belongs in the initial HTML too. Keep the interaction for humans; stop making it a precondition for the content existing.</li>
<li>Then look at on-site search. Deliberately last, and here is why.</li>
</ol>
<h2>The on-site half of the same problem</h2>
<p>Shoppers who arrive from an AI assistant have already compared, filtered and narrowed. They land on your site still speaking the way they spoke to the assistant — "waterproof but breathable, under $150, ships this week."</p>
<p>Keyword search returns nothing for that. Vendor benchmarks put null-search rates across ecommerce catalogs in the 10–30% range with best-in-class under 5%; treat those as directional and measure your own. The point is structural rather than statistical: a rising share of your visitors now search in full sentences, hitting a search layer built for two-word queries.</p>
<p>Semantic search fixes this — but only if the attributes it needs are actually modeled. Bolting a vector index onto a catalog whose facts live in JPEGs and JavaScript produces confident, wrong answers. The structured attribute layer that makes your product page legible to an outside assistant is the same layer your own <a href="/ai-agents">AI search and recommendations</a> run on. Build it once and both problems resolve.</p>
<h2>Where we stand on this</h2>
<p>We are not going to claim a benchmark we have not measured on your store. What we will say is that we build this layer for a living and run it on <a href="/work/mnt-commerce">our own commerce platform</a> — MnT Commerce has semantic search, a shopping assistant and an ops agent in production, which is how we know where these builds break.</p>
<p>If you want to know how your product pages score before spending anything, we run a <a href="/contact">free agent-readiness audit</a>: we fetch your PDP template the way a retrieval agent does, show you what survives, and tell you what to fix in order. If the honest answer is that your data layer is already in decent shape, we will tell you that instead.</p>
<p><em>Figures cited from Adobe's Q2 2026 AI Traffic Report, published 16 April 2026.</em></p>`,
  },
];

async function main() {
  for (const p of POSTS) {
    // The source doc's own date drives publishedAt, so the blog index (ordered
    // publishedAt desc) always leads with the newest pack, whatever order the
    // posts happen to get imported in.
    const publishedAt = p.date ? new Date(`${p.date}T00:00:00Z`) : new Date();
    const fields = {
      title: p.title,
      excerpt: p.excerpt,
      contentHtml: p.contentHtml,
      coverImage: p.coverImage || null,
      ogImage: p.coverImage || null,
      category: p.category,
      tags: p.tags,
      author: p.author,
      metaTitle: p.metaTitle,
      metaDescription: p.metaDescription,
      keywords: p.keywords,
      readingMins: readingMinutes(p.contentHtml),
      status: "PUBLISHED",
      publishedAt,
    };
    const post = await prisma.post.upsert({
      where: { slug: p.slug },
      update: fields,
      create: { slug: p.slug, ...fields },
    });
    console.log(
      `✓ Published /blog/${post.slug} — "${post.title}" (${post.author}, ${publishedAt.toISOString().slice(0, 10)})`
    );
  }
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
