import type { Metadata } from "next";
import ServicePage, { ServiceConfig } from "@/components/ServicePage";
import { images } from "@/lib/site";
import { resolveMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  return resolveMetadata("/commerce/ai-cleanup", {
    title: "AI Cleanup: Make Your Vibe-Coded MVP Production-Grade | MnT Future",
    description:
      "Turn an AI or no-code MVP into a secure, scalable, production-grade store: security audit, refactor, hardening, tests, and production deploy.",
  });
}

const config: ServiceConfig = {
  slug: "/commerce/ai-cleanup",
  parent: { label: "Commerce Platforms", href: "/commerce" },
  breadcrumb: [
    { label: "Home", href: "/" },
    { label: "Commerce Platforms", href: "/commerce" },
    { label: "AI Cleanup & MVP Rescue" },
  ],
  eyebrow: "AI cleanup & MVP rescue",
  h1: "Make your AI / no-code MVP production-ready.",
  heroSub:
    "You shipped fast with AI or no-code, and it broke at scale. We turn a vibe-coded MVP into a secure, scalable, production-grade platform: security audit, refactor, hardening, and a re-architecture that holds up under real traffic.",
  heroImage: images.dev,
  chips: ["Security audit", "Refactor & hardening", "Test coverage", "Scalable re-architecture"],
  primaryKeyword: "AI code cleanup & production hardening",
  intro: {
    title: "What is AI Cleanup?",
    body: (
      <>
        AI Cleanup takes a store built with AI coding tools or no-code platforms and makes it
        production-grade. AI-generated code ships fast but carries roughly 2.7× more vulnerabilities and
        rarely survives real scale. We audit the code and security, refactor and harden it, add test
        coverage, re-architect for scalability, and deploy it properly: a low-barrier entry that often
        grows into a full platform build.
      </>
    ),
  },
  featuresTitle: "What we do",
  features: [
    { icon: "shield", title: "Code & security audit", desc: "A full audit of your codebase and security posture: AI-generated code averages ~2.7× more vulnerabilities, and we find them before attackers do." },
    { icon: "code", title: "Refactor & hardening", desc: "We restructure fragile, duplicated, or unsafe code into a maintainable, secure foundation you can build on." },
    { icon: "check", title: "Test coverage", desc: "Automated tests around the critical paths so future changes don't silently break checkout, payments, or data." },
    { icon: "layers", title: "Scalability re-architecture", desc: "Re-architect the parts that buckle under load: data model, queries, and services, so the platform scales with traffic." },
    { icon: "cloud", title: "Production deployment & handover", desc: "Automated deployments (CI/CD), monitoring, and proper environments. Deployed production-grade and handed over cleanly, fully documented." },
    { icon: "gauge", title: "Performance tuning", desc: "Fix the slow queries and heavy pages that hurt conversion and your Google speed scores, and instrument what matters." },
  ],
  approachTitle: "From fragile MVP to production-grade.",
  approachSub:
    "Shipping fast with AI is smart. Running it in production without hardening is a liability. We close that gap.",
  approachPoints: [
    "Security first: AI-generated code carries ~2.7× more vulnerabilities, so the audit leads.",
    "Refactor, harden, and add test coverage so the platform is safe to change and scale.",
    "Re-architect the bottlenecks that break under real traffic, not a full rewrite unless it's warranted.",
    "A low-barrier entry that often expands into a full Commerce Platforms build.",
  ],
  related: [
    { label: "Custom Commerce Platforms", href: "/commerce/headless-marketplace" },
    { label: "AI Search & Recommendations", href: "/ai-agents/commerce-starter" },
    { label: "Managed Support & Compliance", href: "/commerce/managed-compliance" },
    { label: "Integrations & Automation", href: "/commerce/integrations" },
  ],
  faq: [
    { q: "My store works: why does it need cleanup?", a: "\"Works in a demo\" and \"safe at scale\" are different things. AI and no-code builds often hide security holes, fragile data models, and performance cliffs that surface exactly when you get traffic. The audit tells you where you stand." },
    { q: "Do you rewrite everything from scratch?", a: "Rarely. We keep what's sound, refactor what's fragile, and re-architect only the parts that can't scale. A full rewrite is a last resort, and we'll be honest if it's the right call." },
    { q: "Is AI-generated code really less secure?", a: "On average, yes: studies put it around 2.7× more vulnerabilities than hand-written code, largely because it's shipped without review. That's why our process leads with a security audit." },
    { q: "What do we get at the end?", a: "A secure, tested, scalable platform deployed production-grade, with monitoring, CI/CD, and documentation, and a clear handover. Many clients continue with us into a full build or a managed SLA." },
    { q: "How long does cleanup take?", a: "It's scoped to what the audit finds: often a focused few weeks. It's designed as a low-barrier starting point, so you can see our engineering before committing to a larger build." },
  ],
  cta: {
    title: "Ship fast was step one. Let's make it production-grade.",
    body: "Book a free strategy session and we'll run a quick read on your codebase and architecture, and show you what it takes to make it secure and scalable.",
  },
};

export default function Page() {
  return <ServicePage config={config} />;
}
