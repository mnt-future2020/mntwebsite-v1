import type { Metadata } from "next";
import ServicePage, { ServiceConfig } from "@/components/ServicePage";
import { images } from "@/lib/site";

export const metadata: Metadata = {
  title: "Hospital Management Software Development",
  description:
    "Custom hospital management software — OPD, IPD, billing, pharmacy, labs and ABDM-ready records. Built for chains and growing hospitals.",
  alternates: { canonical: "/healthcare-software-development/hospital-management" },
};

const config: ServiceConfig = {
  slug: "/healthcare-software-development/hospital-management",
  parent: { label: "Healthcare", href: "/healthcare-software-development" },
  breadcrumb: [
    { label: "Home", href: "/" },
    { label: "Healthcare", href: "/healthcare-software-development" },
    { label: "Hospital Management" },
  ],
  eyebrow: "Healthcare · Hospital management",
  h1: "Hospital management software, built for how your hospital actually runs.",
  heroSub:
    "Custom hospital management software (HMS) that unifies OPD, IPD, billing, pharmacy and labs — with ABDM-ready records. Built for hospital chains and fast-growing facilities, not forced from a rigid template.",
  heroImage: images.hospital,
  chips: ["OPD & IPD", "Billing & pharmacy", "Labs & radiology", "ABDM-ready"],
  primaryKeyword: "hospital management software",
  intro: {
    title: "What is hospital management software?",
    body: "Hospital management software (HMS) digitises and connects a hospital's operations — registration, OPD/IPD, billing, pharmacy, labs, radiology and records — in one system. MnT builds custom HMS around your actual processes, with ABDM-ready records and the reporting administrators need to run the facility.",
  },
  featuresTitle: "One system, every department",
  features: [
    { icon: "users", title: "OPD & IPD management", desc: "Registration, appointments, admissions, bed management and discharge in a single flow." },
    { icon: "tag", title: "Billing & insurance", desc: "Transparent billing, package handling, TPA and insurance claims, and revenue reporting." },
    { icon: "store", title: "Pharmacy & inventory", desc: "Stock, dispensing, expiry and procurement linked to prescriptions and billing." },
    { icon: "records", title: "Labs & radiology", desc: "Order management, sample tracking, results and report delivery integrated with records." },
    { icon: "network", title: "ABDM-ready records", desc: "ABHA linking and consent so patient records connect to India's national health network." },
    { icon: "gauge", title: "Admin dashboards", desc: "Operational, financial and clinical reporting so leadership can actually run the hospital." },
  ],
  approachTitle: "Built around your hospital, not the other way round",
  approachSub:
    "Generic HMS forces your teams to change how they work. We build to fit how your hospital runs.",
  approachPoints: [
    "Modular HMS — start with the departments that hurt most, expand from there.",
    "ABDM-ready records with ABHA linking and consent management.",
    "Role-based access, audit trails and data security across every module.",
    "Reporting and dashboards designed for hospital administrators and finance.",
  ],
  related: [
    { label: "Custom healthcare software", href: "/healthcare-software-development/custom" },
    { label: "EHR / EMR development", href: "/healthcare-software-development/ehr-emr" },
    { label: "ABDM & FHIR integration", href: "/healthcare-software-development/abdm-fhir" },
    { label: "AI in healthcare", href: "/healthcare-software-development/ai-healthcare" },
  ],
  faq: [
    { q: "Can you build HMS for a multi-hospital chain?", a: "Yes. We build multi-facility HMS with centralised administration, shared masters and per-site configuration, plus consolidated reporting across the chain." },
    { q: "Is the hospital management software ABDM-ready?", a: "Yes — we handle ABHA linking, consent and HIP/HIU connectivity so patient records integrate with India's national health stack." },
    { q: "Can it integrate with our existing billing or lab systems?", a: "Yes. We integrate with existing billing, LIS/RIS, pharmacy and insurance systems, or build those modules where you need them." },
    { q: "Do you build it module by module?", a: "Yes — we usually start with the highest-pain departments (OPD, billing, pharmacy) and expand, so value lands quickly without a risky big-bang rollout." },
  ],
  cta: {
    title: "Modernising your hospital systems? Let's plan it.",
    body: "Talk to a senior engineer about a custom HMS that fits your departments and connects to ABDM — built to run real hospital operations.",
  },
};

export default function Page() {
  return <ServicePage config={config} />;
}
