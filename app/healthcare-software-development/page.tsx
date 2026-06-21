import type { Metadata } from "next";
import HubPage, { HubConfig } from "@/components/HubPage";
import { images } from "@/lib/site";
import { resolveMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  return resolveMetadata("/healthcare-software-development", {
    title: "Healthcare Software Development Company | MnT",
    description:
      "HIPAA & ABDM-compliant healthcare software development — custom platforms, telemedicine, EHR & AI, engineered by a senior team for healthtech founders.",
  });
}

const config: HubConfig = {
  vertical: "Healthcare",
  breadcrumb: [
    { label: "Home", href: "/" },
    { label: "Healthcare Software Development" },
  ],
  eyebrow: "Healthcare software development",
  h1: "Healthcare software development, engineered for compliance and speed.",
  heroSub:
    "MnT is a healthcare software development company building compliant platforms for providers and healthtech founders — from telemedicine and EHR to AI-native tools and ABDM/FHIR integration. Senior engineers, compliance baked in, MVP to scale.",
  heroChips: ["HIPAA-ready", "ABDM & FHIR", "ISO 27001 · SOC 2", "AI-native"],
  heroImage: images.healthcare,
  servicesTitle: "Seven ways we engineer healthcare software",
  servicesSub:
    "Every build is custom to your clinical workflow and certified as we go — never a template, never compliance-as-an-afterthought.",
  services: [
    { icon: "code", title: "Custom healthcare software", desc: "Bespoke platforms built around your clinical workflow — from MVP to scale, with compliance designed in from the first commit.", href: "/healthcare-software-development/custom" },
    { icon: "video", title: "Telemedicine & telehealth", desc: "Secure video visits, e-prescriptions, scheduling, and payments — HIPAA-compliant apps patients actually keep using.", href: "/healthcare-software-development/telemedicine" },
    { icon: "records", title: "EHR / EMR development", desc: "Interoperable electronic records that talk to each other — FHIR and ABDM-ready, built for real clinical workflows.", href: "/healthcare-software-development/ehr-emr" },
    { icon: "hospital", title: "Hospital management software", desc: "OPD, IPD, billing, pharmacy, and labs in one system — ABDM-ready records, built for chains and growing hospitals.", href: "/healthcare-software-development/hospital-management" },
    { icon: "ai", title: "AI in healthcare", desc: "Ambient clinical scribes, claims automation, and predictive analytics — AI built compliant and built to ship.", href: "/healthcare-software-development/ai-healthcare" },
    { icon: "network", title: "ABDM & FHIR integration", desc: "HIP/HIU setup, consent, and certification — connect your platform to India's national health network and global standards.", href: "/healthcare-software-development/abdm-fhir" },
    { icon: "layers", title: "Healthcare SaaS for startups", desc: "For funded healthtech startups: multi-tenant SaaS products with subscriptions, dashboards and HIPAA/ABDM compliance — built MVP to scale, the product you take to market.", href: "/healthcare-software-development/saas" },
  ],
  diff: {
    eyebrow: "Compliance-first",
    title: (
      <>
        Compliance isn&apos;t a checkbox.
        <br className="hidden sm:block" /> It&apos;s the architecture.
      </>
    ),
    sub: "Health data carries real risk. We design the security and regulatory surface into the system from day one, so certification is a confirmation — not a scramble before launch.",
    points: [
      "HIPAA-aligned architecture: encryption, audit logging, access control and BAAs from the first sprint.",
      "ABDM & FHIR interoperability — HIP/HIU, consent management, and the sandbox-to-certified pathway.",
      "ISO 27001 and SOC 2 practices engineered into your build and your delivery pipeline.",
      "GDPR and data-residency handled for India, US (CMS) and Gulf (NPHIES) markets.",
    ],
  },
  audiencesTitle: "Built for the people shipping healthcare forward",
  audiences: [
    { icon: "rocket", title: "Healthtech founders", desc: "From funded MVP to scale — a senior team that ships fast without cutting compliance corners." },
    { icon: "hospital", title: "Hospitals & providers", desc: "Modernise legacy systems or build new — HMS, EHR, and patient apps that fit how you actually run." },
    { icon: "globe", title: "Global clients", desc: "US, Middle East and Europe delivery with the compliance and cost advantage of an India-based senior team." },
  ],
  stats: [
    { value: "5+", label: "Compliance frameworks engineered in" },
    { value: "MVP→Scale", label: "We build across the full lifecycle" },
    { value: "AI-native", label: "Scribe, claims & analytics built in" },
    { value: "ABDM", label: "FHIR-ready interoperability" },
  ],
  faq: [
    { q: "What does a healthcare software development company do?", a: "We design, build, and certify the software that healthcare runs on — telemedicine apps, EHR/EMR systems, hospital management platforms, patient apps, and AI tools — with security and regulatory compliance engineered into the architecture rather than added before launch." },
    { q: "Is your software HIPAA compliant?", a: "Yes. We build to HIPAA from day one — encryption in transit and at rest, audit logging, role-based access control, and Business Associate Agreements — and we validate compliance continuously as we build, not in a rush before go-live." },
    { q: "Can you integrate with ABDM and FHIR?", a: "Yes. We handle ABDM HIP/HIU setup, consent management, ABHA linking, and the full sandbox-to-certification pathway, plus FHIR-based interoperability for global systems like US CMS and Gulf NPHIES." },
    { q: "How long does an MVP take?", a: "Most healthcare MVPs ship in 10–16 weeks depending on scope and compliance surface. We work in two-week sprints so you see working software every cycle and can adjust scope as you learn." },
    { q: "Do you work with funded startups?", a: "Often. Many of our healthcare clients are seed-to-Series-A founders who need senior engineering and compliance expertise without building a large in-house team. We also offer a co-founding engagement for the right partners." },
    { q: "What does it cost?", a: "It depends on scope, but a focused healthcare MVP typically starts in the low-to-mid five figures (USD) for global builds and ₹15L+ for India builds. Book a discovery call and we'll give you an honest range against your actual requirements." },
  ],
  cta: {
    title: "Building something in healthcare? Let's pressure-test it.",
    body: "A 30-minute call with a senior engineer who has shipped compliant health platforms. Bring your idea — leave with a clear scope, timeline, and compliance roadmap.",
  },
};

export default function HealthcareHub() {
  return <HubPage config={config} />;
}
