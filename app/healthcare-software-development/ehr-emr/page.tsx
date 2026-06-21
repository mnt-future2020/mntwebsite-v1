import type { Metadata } from "next";
import ServicePage, { ServiceConfig } from "@/components/ServicePage";
import { images } from "@/lib/site";

export const metadata: Metadata = {
  title: "EHR / EMR Software Development Services",
  description:
    "Custom EHR & EMR development — interoperable (FHIR/ABDM), secure, and built for clinical workflows. Integrate, modernise, or build from scratch.",
  alternates: { canonical: "/healthcare-software-development/ehr-emr" },
};

const config: ServiceConfig = {
  slug: "/healthcare-software-development/ehr-emr",
  parent: { label: "Healthcare", href: "/healthcare-software-development" },
  breadcrumb: [
    { label: "Home", href: "/" },
    { label: "Healthcare", href: "/healthcare-software-development" },
    { label: "EHR / EMR Development" },
  ],
  eyebrow: "Healthcare · EHR / EMR",
  h1: "EHR & EMR systems that actually talk to each other.",
  heroSub:
    "Custom EHR and EMR software development — interoperable, secure, and built around real clinical workflows. Integrate with what you have, modernise a legacy system, or build from scratch on FHIR and ABDM.",
  heroImage: images.hospital,
  chips: ["FHIR-native", "ABDM-ready", "Interoperable", "Workflow-built"],
  primaryKeyword: "ehr software development",
  intro: {
    title: "What is EHR / EMR software development?",
    body: "EHR/EMR software development is the building of electronic health and medical record systems that capture, store and exchange clinical data securely. Done well, the records are interoperable — they speak FHIR and connect to ABDM and other systems — so data follows the patient instead of being trapped in silos.",
  },
  featuresTitle: "Records that move with the patient",
  features: [
    { icon: "records", title: "Custom EHR / EMR", desc: "Clinical records designed around your specialties, workflows and documentation patterns." },
    { icon: "network", title: "FHIR interoperability", desc: "Standards-based exchange so your records connect to labs, devices, HIEs and partner systems." },
    { icon: "compass", title: "ABDM integration", desc: "ABHA linking, consent and HIP/HIU connectivity for India's national health network." },
    { icon: "shield", title: "Security & audit", desc: "Encryption, granular access control and full audit trails built into the data layer." },
    { icon: "layers", title: "Legacy modernisation", desc: "Migrate or extend an existing EHR safely — without disrupting live clinical operations." },
    { icon: "ai", title: "AI-assisted documentation", desc: "Ambient scribe and structured-data capture that cut clinician documentation time." },
  ],
  approachTitle: "Interoperability is the whole point",
  approachSub:
    "An EHR that can't exchange data is a liability. We build on open standards so your records connect.",
  approachPoints: [
    "FHIR-native data model so records are interoperable by design.",
    "ABDM HIP/HIU and consent handled end to end for the Indian market.",
    "Encryption, RBAC and audit logging engineered into the core.",
    "Safe migration paths from legacy EHR/EMR systems with zero clinical downtime.",
  ],
  related: [
    { label: "Custom healthcare software", href: "/healthcare-software-development/custom" },
    { label: "Hospital management software", href: "/healthcare-software-development/hospital-management" },
    { label: "ABDM & FHIR integration", href: "/healthcare-software-development/abdm-fhir" },
    { label: "AI in healthcare", href: "/healthcare-software-development/ai-healthcare" },
  ],
  faq: [
    { q: "Can you build a custom EHR or extend our existing one?", a: "Both. We build custom EHR/EMR systems from scratch on FHIR, and we extend, integrate with or modernise existing systems — choosing the path that fits your stage and budget." },
    { q: "Is the EHR FHIR and ABDM compliant?", a: "Yes. We build on a FHIR-native data model and handle ABDM HIP/HIU setup, ABHA linking and consent so your records interoperate with India's health stack and global systems." },
    { q: "How do you handle data migration from a legacy system?", a: "With a staged, validated migration plan — mapping, dry runs and reconciliation — so data moves accurately without disrupting live clinical operations." },
    { q: "How long does an EHR/EMR build take?", a: "A focused module ships in weeks; a full custom EHR is a larger programme. We sequence it into milestones so value lands early and often." },
  ],
  cta: {
    title: "Need an EHR that connects? Let's design it.",
    body: "Talk to a senior engineer about building or modernising your EHR/EMR on FHIR and ABDM — interoperable, secure and clinical-workflow-first.",
  },
};

export default function Page() {
  return <ServicePage config={config} />;
}
