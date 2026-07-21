import type { Metadata } from "next";
import ServicePage, { ServiceConfig } from "@/components/ServicePage";
import { images } from "@/lib/site";
import { resolveMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  return resolveMetadata("/commerce/data-pipelines", {
    title: "Commerce Data & Single Source of Truth | MnT Future",
    description:
      "One canonical record for products, inventory, pricing and customers: data pipelines that keep every channel, team and AI agent working from the same numbers.",
  });
}

const config: ServiceConfig = {
  slug: "/commerce/data-pipelines",
  parent: { label: "Integrations & Automation", href: "/commerce/integrations" },
  breadcrumb: [
    { label: "Home", href: "/" },
    { label: "Commerce Platforms", href: "/commerce" },
    { label: "Integrations & Automation", href: "/commerce/integrations" },
    { label: "Data Pipelines & Single Source of Truth" },
  ],
  eyebrow: "Data pipelines & single source of truth",
  h1: "Every team, every channel, the same numbers.",
  heroSub:
    "When the site, the warehouse, and the spreadsheet disagree, people stop trusting the numbers and start exporting CSVs. We build the canonical record and the pipelines that keep products, inventory, pricing, and customers consistent everywhere: including the feeds AI agents read.",
  heroImage: images.dev,
  chips: ["One canonical record", "Products · stock · customers", "Feeds channels & agents", "Numbers you can trust"],
  primaryKeyword: "Commerce data pipelines & single source of truth",
  intro: {
    title: "What is a single source of truth?",
    body: (
      <>
        It means every fact about your business (a price, a stock count, a customer's email) has
        exactly one home, and everything else syncs from it. Without one, systems drift apart and every
        report becomes an argument. We map which system owns which fact, build the canonical record,
        and run the pipelines that feed it to your site, your channels, your dashboards, and the
        structured feeds AI shopping agents read.
      </>
    ),
  },
  featuresTitle: "The record, and everything it feeds.",
  features: [
    { icon: "records", title: "The canonical record", desc: "For each fact, one system owns it and everything else syncs from it: drift ends by design." },
    { icon: "layers", title: "Conflict resolution", desc: "Where systems disagree today, we map who wins and why: fixed once, not argued monthly." },
    { icon: "network", title: "Pipelines to every channel", desc: "Site, marketplaces, ads, email, and agent feeds all fed from the same record: change it once, correct everywhere." },
    { icon: "spark", title: "Ready for AI & agents", desc: "Clean, structured, current data is what AI search and shopping agents run on: the same pipelines feed both." },
    { icon: "eye", title: "Dashboards from truth", desc: "Reports built on the canonical record, so two dashboards never argue again." },
    { icon: "cloud", title: "Monitored & recoverable", desc: "Pipelines with monitoring and retries: failures are visible and fixable, never silent." },
  ],
  approachTitle: "Trustworthy numbers are infrastructure.",
  approachSub:
    "Reports, channels, and AI agents are only as good as the record underneath them.",
  approachPoints: [
    "Ownership mapped first: which system owns which fact, and in which direction data flows.",
    "Products and inventory usually come first: they're where drift costs orders.",
    "The same clean record powers your channels today and the agentic channel next.",
    "Monitoring and retries on every pipeline, so the truth stays true.",
  ],
  related: [
    { label: "Integrations & Automation", href: "/commerce/integrations" },
    { label: "ERP & Back-Office Integration", href: "/commerce/erp-integration" },
    { label: "Agent-Ready Commerce", href: "/ai-agents/agent-ready-commerce" },
    { label: "Workflow Automation", href: "/commerce/workflow-automation" },
  ],
  faq: [
    { q: "Where do we start?", a: "With products and inventory: that's where disagreement between systems costs orders fastest. We map what each system owns, resolve the conflicts, and build the canonical record everything else syncs to." },
    { q: "Does this replace our existing tools?", a: "No, it connects them. Your ERP, storefront, and marketing tools keep their jobs: the pipelines decide which one is the authority for each fact and keep the rest in sync with it." },
    { q: "How does this help with AI and agents?", a: "Directly: AI shopping agents only transact when price and inventory data is current and trustworthy, and AI search is only as good as the catalog it reads. The pipelines that end internal drift are the same ones that make you agent-ready." },
    { q: "Can you build dashboards on top?", a: "Yes: once the canonical record exists, dashboards and a single customer view are a natural layer on it. That's our Data & Analytics add-on, and it stops being a data-cleaning project once the record is right." },
    { q: "How long does it take?", a: "It depends on how many systems disagree and how badly, so we won't invent a number: we'll map the drift in your free strategy session and give you an honest scope." },
  ],
  cta: {
    title: "Make the numbers agree.",
    body: "Book a free strategy session: we'll find where your systems disagree and design the record that ends it.",
  },
};

export default function Page() {
  return <ServicePage config={config} />;
}
