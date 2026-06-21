import type { Metadata } from "next";
import ServicePage, { ServiceConfig } from "@/components/ServicePage";
import { images } from "@/lib/site";

export const metadata: Metadata = {
  title: "Custom Healthcare Software Development",
  description:
    "Bespoke, HIPAA & ABDM-compliant healthcare software built around your clinical workflows — from MVP to scale. Senior engineers, AI-native, fast delivery.",
  alternates: { canonical: "/healthcare-software-development/custom" },
};

const config: ServiceConfig = {
  slug: "/healthcare-software-development/custom",
  parent: { label: "Healthcare", href: "/healthcare-software-development" },
  breadcrumb: [
    { label: "Home", href: "/" },
    { label: "Healthcare", href: "/healthcare-software-development" },
    { label: "Custom Software" },
  ],
  eyebrow: "Healthcare · Custom software",
  h1: "Custom healthcare software, built around your workflow — not a template.",
  heroSub:
    "Off-the-shelf health software forces your clinical workflow to bend to its limits. We build custom healthcare software development around how you actually work — HIPAA and ABDM-compliant from the first commit, from MVP to scale.",
  heroImage: images.dev,
  chips: ["HIPAA-ready", "ABDM / FHIR", "AI-native", "MVP to scale"],
  primaryKeyword: "custom healthcare software development",
  intro: {
    title: "What is custom healthcare software development?",
    body: "Custom healthcare software development is the design and engineering of bespoke clinical platforms — built around your specific workflows, integrations and compliance needs rather than a fixed product. MnT builds it for healthtech founders and providers, with security and regulatory compliance engineered into the architecture from day one.",
  },
  featuresTitle: "Built bespoke, certified as we go",
  features: [
    { icon: "compass", title: "Workflow-first design", desc: "We map the clinical and operational workflow before we design the system, so the software fits your reality — not the other way round." },
    { icon: "shield", title: "Compliance baked in", desc: "HIPAA, ABDM, ISO 27001 and SOC 2 controls engineered from the first sprint, validated continuously — never bolted on before launch." },
    { icon: "network", title: "Interoperability", desc: "FHIR and ABDM-ready integration so your platform connects to EHRs, labs, devices and national health networks." },
    { icon: "ai", title: "AI-native", desc: "Ambient documentation, claims automation and decision support built in where AI earns its place in the workflow." },
    { icon: "layers", title: "Cloud & scale", desc: "Modern, observable cloud architecture that holds up under real clinical load and scales as you grow." },
    { icon: "records", title: "Modernisation & migration", desc: "Replace or extend legacy systems with a safe migration path — without disrupting live clinical operations." },
  ],
  approachTitle: "Why teams choose MnT for custom healthcare builds",
  approachSub:
    "Senior engineers who have shipped regulated clinical systems — not juniors learning on your budget.",
  approachPoints: [
    "A senior team that has shipped HIPAA and ABDM-certified platforms end to end.",
    "Compliance designed into the architecture, so certification is a confirmation — not a scramble.",
    "Two-week sprints with working software every cycle, so scope can flex as you learn.",
    "AI-native delivery — we build the AI capabilities into the product where they add real value.",
  ],
  related: [
    { label: "Telemedicine apps", href: "/healthcare-software-development/telemedicine" },
    { label: "EHR / EMR development", href: "/healthcare-software-development/ehr-emr" },
    { label: "ABDM & FHIR integration", href: "/healthcare-software-development/abdm-fhir" },
    { label: "Healthcare SaaS for startups", href: "/healthcare-software-development/saas" },
  ],
  faq: [
    { q: "How much does custom healthcare software cost?", a: "It depends on scope and compliance surface. A focused MVP typically starts in the low-to-mid five figures (USD) for global builds and ₹15L+ for India builds, scaling with integrations and certification needs. Book a discovery call for an honest range against your requirements." },
    { q: "How long does a custom healthcare build take?", a: "Most MVPs ship in 10–16 weeks. We work in two-week sprints so you see working software every cycle and can adjust scope as the product takes shape." },
    { q: "Is the software HIPAA and ABDM compliant?", a: "Yes. We build to HIPAA and ABDM/FHIR from day one — encryption, audit logging, access control, consent management — and validate compliance continuously rather than before go-live." },
    { q: "Can you integrate with our existing EHR or systems?", a: "Yes. We build FHIR and ABDM-ready integrations and connect to EHR/EMR systems, labs, devices, payment and identity providers as your workflow requires." },
    { q: "Do you work with early-stage healthtech startups?", a: "Often. Many clients are funded founders who need senior engineering and compliance expertise without building a large in-house team — including a co-founding engagement for the right partners." },
  ],
  cta: {
    title: "Have a custom healthcare build in mind? Let's scope it.",
    body: "A 30-minute call with a senior engineer who has shipped compliant clinical platforms — leave with a clear scope, timeline and compliance roadmap.",
  },
};

export default function Page() {
  return <ServicePage config={config} />;
}
