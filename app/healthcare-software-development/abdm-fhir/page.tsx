import type { Metadata } from "next";
import ServicePage, { ServiceConfig } from "@/components/ServicePage";
import { images } from "@/lib/site";

export const metadata: Metadata = {
  title: "ABDM & FHIR Integration Services",
  description:
    "ABDM-ready, FHIR-compliant integration — HIP/HIU setup, consent, certification. Connect your platform to India's national health network.",
  alternates: { canonical: "/healthcare-software-development/abdm-fhir" },
};

const config: ServiceConfig = {
  slug: "/healthcare-software-development/abdm-fhir",
  parent: { label: "Healthcare", href: "/healthcare-software-development" },
  breadcrumb: [
    { label: "Home", href: "/" },
    { label: "Healthcare", href: "/healthcare-software-development" },
    { label: "ABDM & FHIR Integration" },
  ],
  eyebrow: "Healthcare · ABDM & FHIR",
  h1: "ABDM & FHIR integration, done by specialists.",
  heroSub:
    "Connect your platform to India's national health network. We handle ABDM HIP/HIU setup, ABHA linking, consent and the sandbox-to-certification pathway — plus FHIR interoperability for global systems.",
  heroImage: images.healthcare,
  chips: ["HIP / HIU setup", "ABHA & consent", "FHIR-compliant", "Certification"],
  primaryKeyword: "abdm integration services",
  intro: {
    title: "What is ABDM integration — and why does it matter?",
    body: "ABDM (Ayushman Bharat Digital Mission) is India's national digital health framework. ABDM integration connects your app to it as a Health Information Provider (HIP) or User (HIU) — handling ABHA linking, consent and certification — so patient records can be shared securely across the ecosystem. FHIR is the data standard that makes that interoperability work, in India and globally.",
  },
  featuresTitle: "The full ABDM & FHIR pathway",
  features: [
    { icon: "network", title: "HIP / HIU integration", desc: "Become a Health Information Provider or User with the right ABDM building blocks wired in." },
    { icon: "users", title: "ABHA linking", desc: "Link patient records to ABHA (health IDs) with a clean, compliant onboarding flow." },
    { icon: "shield", title: "Consent management", desc: "Implement the ABDM consent framework so data is shared only with patient authorisation." },
    { icon: "check", title: "Sandbox to certification", desc: "We take you through the ABDM sandbox, testing and certification to go live." },
    { icon: "records", title: "FHIR interoperability", desc: "FHIR-compliant data so your platform exchanges records with EHRs, HIEs and global systems." },
    { icon: "globe", title: "Global standards", desc: "Beyond ABDM — FHIR interoperability for US (CMS) and Gulf (NPHIES) markets." },
  ],
  approachTitle: "Own the standard before your competitors do",
  approachSub:
    "ABDM and FHIR are where Indian healthtech is heading. We help you get certified and interoperable now.",
  approachPoints: [
    "End-to-end ABDM: HIP/HIU, ABHA, consent and certification handled for you.",
    "FHIR-native data modelling so interoperability is built in, not bolted on.",
    "Sandbox-to-live experience — we know where teams get stuck and how to clear it.",
    "Works for global interoperability too: US CMS and Gulf NPHIES alignment.",
  ],
  related: [
    { label: "Custom healthcare software", href: "/healthcare-software-development/custom" },
    { label: "EHR / EMR development", href: "/healthcare-software-development/ehr-emr" },
    { label: "Hospital management software", href: "/healthcare-software-development/hospital-management" },
    { label: "Healthcare SaaS for startups", href: "/healthcare-software-development/saas" },
  ],
  faq: [
    { q: "What is the difference between a HIP and a HIU?", a: "A Health Information Provider (HIP) creates and shares health records; a Health Information User (HIU) requests and consumes them with patient consent. Many platforms need both — we set up whichever roles your product requires." },
    { q: "Can you get our platform ABDM certified?", a: "Yes. We take you through the full pathway — ABDM sandbox, integration, testing and certification — so your platform can go live on the network." },
    { q: "Do we need FHIR for ABDM?", a: "Yes. ABDM uses FHIR as its data standard, so a FHIR-compliant data model is foundational. We build on FHIR so you're interoperable for ABDM and global systems alike." },
    { q: "Is there real demand for ABDM integration yet?", a: "It's an emerging but fast-growing requirement as ABDM adoption rises. Building it now wins you authority and interoperability early — and removes a blocker for enterprise and government deals." },
  ],
  cta: {
    title: "Need to connect to ABDM? Let's get you certified.",
    body: "Talk to a specialist about ABDM HIP/HIU setup, ABHA, consent and certification — plus FHIR interoperability for global markets.",
  },
};

export default function Page() {
  return <ServicePage config={config} />;
}
