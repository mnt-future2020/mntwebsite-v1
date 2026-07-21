import type { Metadata } from "next";
import ServicePage, { ServiceConfig } from "@/components/ServicePage";
import { images } from "@/lib/site";
import { resolveMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  return resolveMetadata("/commerce/continuous-hardening", {
    title: "Continuous Security Hardening for Commerce | MnT Future",
    description:
      "Dependency updates, security patching and performance tuning applied continuously: the maintenance that prevents incidents instead of following them.",
  });
}

const config: ServiceConfig = {
  slug: "/commerce/continuous-hardening",
  parent: { label: "Managed Support & Compliance", href: "/commerce/managed-compliance" },
  breadcrumb: [
    { label: "Home", href: "/" },
    { label: "Commerce Platforms", href: "/commerce" },
    { label: "Managed Support & Compliance", href: "/commerce/managed-compliance" },
    { label: "Continuous Hardening" },
  ],
  eyebrow: "Continuous hardening",
  h1: "Maintenance that prevents incidents, not follows them.",
  heroSub:
    "Most breaches and outages aren't exotic: they're a known vulnerability in an old dependency, a patch deferred for months, a slow page nobody tuned. Continuous hardening is the discipline of never letting that backlog build: updates, patches, and tuning applied as a rhythm, not a rescue.",
  heroImage: images.dev,
  chips: ["Dependency updates", "Security patching", "Performance tuning", "A rhythm, not a rescue"],
  primaryKeyword: "Continuous security hardening for e-commerce",
  intro: {
    title: "What is continuous hardening?",
    body: (
      <>
        Every live store decays by default: dependencies age, vulnerabilities get published against
        them, and performance drifts as content grows. Continuous hardening reverses the default:
        dependencies updated on a cadence, security patches applied when they're small, and
        performance tuned before customers feel it. It's the unglamorous work that decides whether
        your store is an easy target or a hard one.
      </>
    ),
  },
  featuresTitle: "The upkeep that keeps you hard to break.",
  features: [
    { icon: "layers", title: "Dependency updates", desc: "Frameworks and packages kept current on a cadence, so updates stay small instead of becoming migrations." },
    { icon: "lock", title: "Security patching", desc: "Published vulnerabilities patched promptly: the fix ships while the exploit is still news, not history." },
    { icon: "gauge", title: "Performance tuning", desc: "Slow queries and heavy pages found and fixed continuously, so speed doesn't erode release by release." },
    { icon: "check", title: "Validated in CI/CD", desc: "Hardening work ships through the same tested pipeline as features: verified, not hoped." },
    { icon: "eye", title: "Watched for drift", desc: "Monitoring catches the regressions and risky changes between cadences, so nothing rots quietly." },
    { icon: "shield", title: "Compliance stays true", desc: "Current dependencies and applied patches are also what PCI and security reviews expect to find." },
  ],
  approachTitle: "Boring on schedule beats exciting at 2am.",
  approachSub:
    "The cheapest incident is the one that never happened because the patch was already applied.",
  approachPoints: [
    "A cadence, not a backlog: small regular updates instead of giant risky ones.",
    "Patches prioritized by real exposure: what's reachable and what it protects.",
    "Performance treated as a budget that hardening defends, release after release.",
    "Runs under the managed SLA, alongside monitoring and incident response.",
  ],
  related: [
    { label: "Managed Support & Compliance", href: "/commerce/managed-compliance" },
    { label: "Uptime & Incident Response", href: "/commerce/uptime-incident-response" },
    { label: "PCI DSS Compliance", href: "/commerce/pci-compliance" },
    { label: "AI Cleanup & MVP Rescue", href: "/ai-agents/ai-cleanup" },
  ],
  faq: [
    { q: "Why not just update when something breaks?", a: "Because by then it's an incident: a breach, an outage, or a giant risky migration. Small regular updates are cheap and boring; deferred ones compound into exactly the 2am emergency this service exists to prevent." },
    { q: "Will updates break our store?", a: "That's why hardening ships through the same CI/CD pipeline as features: tested, validated, and reversible. The risky version of updates is the giant deferred one, not the small regular one." },
    { q: "How is this different from incident response?", a: "Incident response is what happens when something breaks; hardening is why fewer things break. One is the fire brigade, the other is the wiring inspection, and the SLA includes both." },
    { q: "Does this help with PCI?", a: "Directly: current dependencies and promptly applied patches are part of what PCI DSS expects, so hardening keeps your compliance evidence true instead of aspirational." },
    { q: "Our store was built fast with AI tools. Same service?", a: "Close cousin: if the foundation itself needs work, that's AI Cleanup (audit, refactor, harden, then deploy). Continuous hardening is the upkeep that starts once the foundation is sound." },
  ],
  cta: {
    title: "Make your store a hard target.",
    body: "Book a free strategy session: we'll review your dependency and patch backlog and show you what a hardening cadence would cover.",
  },
};

export default function Page() {
  return <ServicePage config={config} />;
}
