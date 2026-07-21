import type { Metadata } from "next";
import ServicePage, { ServiceConfig } from "@/components/ServicePage";
import { images } from "@/lib/site";
import { resolveMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  return resolveMetadata("/commerce/uptime-incident-response", {
    title: "E-Commerce Uptime & Incident Response | MnT Future",
    description:
      "Alerting, on-call response and clear runbooks for revenue-critical stores: reliable uptime through launches, sales and traffic spikes.",
  });
}

const config: ServiceConfig = {
  slug: "/commerce/uptime-incident-response",
  parent: { label: "Managed Support & Compliance", href: "/commerce/managed-compliance" },
  breadcrumb: [
    { label: "Home", href: "/" },
    { label: "Commerce Platforms", href: "/commerce" },
    { label: "Managed Support & Compliance", href: "/commerce/managed-compliance" },
    { label: "Uptime & Incident Response" },
  ],
  eyebrow: "Uptime & incident response",
  h1: "Down at midnight is lost revenue by morning.",
  heroSub:
    "For a store, downtime is a cash register that stopped. We engineer the reliability practice around yours: alerting that finds problems fast, an on-call response with clear runbooks, and readiness for the exact moments that break stores: launches, sales, and traffic spikes.",
  heroImage: images.dev,
  chips: ["Alerting that finds it fast", "On-call response", "Clear runbooks", "Launch & sale readiness"],
  primaryKeyword: "E-commerce uptime & incident response",
  intro: {
    title: "What does incident response cover?",
    body: (
      <>
        Everything between something breaking and the store being healthy again: the alert that
        catches it, the person who responds, the runbook that makes the fix fast instead of
        improvised, and the follow-up that stops it recurring. Reliability isn't the absence of
        incidents: it's how quickly and calmly they're handled, and whether the same one ever
        happens twice.
      </>
    ),
  },
  featuresTitle: "The reliability practice we run.",
  features: [
    { icon: "bell", title: "Alerting that finds it fast", desc: "Errors, slowdowns, and failing syncs alert us early: the goal is that we know before your customers do." },
    { icon: "users", title: "On-call response", desc: "A person responds against the SLA's defined targets, with communication you can forward to your team." },
    { icon: "records", title: "Runbooks, not improvisation", desc: "The known failure modes have written playbooks, so 2am fixes are procedure, not heroics." },
    { icon: "rocket", title: "Launch & sale readiness", desc: "Big moments are planned: capacity checked, monitoring tightened, and someone watching when traffic lands." },
    { icon: "gauge", title: "Spike performance", desc: "The store is engineered and tested for its busiest hour, because that's when downtime costs most." },
    { icon: "check", title: "Learn from every incident", desc: "Each incident ends with a why and a fix, so the same failure doesn't get a second showing." },
  ],
  approachTitle: "Calm is a system, not a personality.",
  approachSub:
    "Fast recovery comes from preparation: alerts, runbooks, and rehearsed moments, all in place before they're needed.",
  approachPoints: [
    "Monitoring designed around revenue paths: checkout, search, and sync failures surface first.",
    "Response and resolution run against targets defined in the SLA, not best effort.",
    "Runbooks for known failure modes, so recovery is procedure instead of debugging under fire.",
    "Launches and sales get readiness work in advance: the spike is when reliability pays.",
  ],
  related: [
    { label: "Managed Support & Compliance", href: "/commerce/managed-compliance" },
    { label: "Support, Monitoring & Performance", href: "/commerce/managed-support" },
    { label: "Continuous Hardening", href: "/commerce/continuous-hardening" },
    { label: "Workflow Automation", href: "/commerce/workflow-automation" },
  ],
  faq: [
    { q: "How fast do you respond when something breaks?", a: "Against targets defined in your SLA up front: response and resolution times you see before you sign, not best-effort promises. What those targets are depends on the tier we scope together." },
    { q: "What do you actually monitor?", a: "The paths revenue depends on: checkout, search, page performance, and the integrations that keep stock and orders true. Alerts are tuned so real problems surface fast and noise doesn't bury them." },
    { q: "Can you cover a big launch or sale?", a: "That's a core part of the practice: capacity and performance checked in advance, monitoring tightened for the window, and someone watching while the traffic lands." },
    { q: "What happens after an incident?", a: "A plain-language account of what broke, why, what we did, and what changed so it doesn't recur. Incidents that don't produce a fix are just rehearsals for the next one." },
    { q: "Do you need to have built the store?", a: "No: we can take over reliability for a store we didn't build. It starts with an audit of the platform and its failure history, then monitoring and runbooks under the SLA." },
  ],
  cta: {
    title: "Be ready before the spike, not after the outage.",
    body: "Book a free strategy session: we'll review your uptime history and show you what a real reliability practice would cover.",
  },
};

export default function Page() {
  return <ServicePage config={config} />;
}
