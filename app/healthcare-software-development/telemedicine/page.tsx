import type { Metadata } from "next";
import ServicePage, { ServiceConfig } from "@/components/ServicePage";
import { images } from "@/lib/site";

export const metadata: Metadata = {
  title: "Telemedicine App Development Company",
  description:
    "Build a secure, HIPAA-compliant telemedicine app — video visits, e-prescriptions, scheduling, payments. From MVP to scale, engineered by MnT.",
  alternates: { canonical: "/healthcare-software-development/telemedicine" },
};

const config: ServiceConfig = {
  slug: "/healthcare-software-development/telemedicine",
  parent: { label: "Healthcare", href: "/healthcare-software-development" },
  breadcrumb: [
    { label: "Home", href: "/" },
    { label: "Healthcare", href: "/healthcare-software-development" },
    { label: "Telemedicine Apps" },
  ],
  eyebrow: "Healthcare · Telemedicine",
  h1: "Telemedicine apps that pass compliance and delight patients.",
  heroSub:
    "We build secure, HIPAA-compliant telemedicine and telehealth apps — video visits, e-prescriptions, scheduling, payments and EHR integration. From MVP to a platform that scales across states and borders.",
  heroImage: images.healthcare,
  chips: ["HIPAA-ready", "Video & e-Rx", "EHR integration", "MVP to scale"],
  primaryKeyword: "telemedicine app development",
  intro: {
    title: "What goes into telemedicine app development?",
    body: "Telemedicine app development covers the secure video, scheduling, e-prescription, payment and records features that let patients and clinicians consult remotely — all built to HIPAA (and ABDM, in India). MnT engineers telehealth apps that pass compliance and stay reliable under real clinical load.",
  },
  featuresTitle: "Everything a telehealth platform needs",
  features: [
    { icon: "video", title: "Secure video visits", desc: "Low-latency, encrypted video consultations with waiting rooms, multi-party calls and fallback flows." },
    { icon: "records", title: "E-prescriptions & notes", desc: "Compliant e-Rx, clinical notes and visit summaries that flow into the patient record." },
    { icon: "clock", title: "Scheduling & reminders", desc: "Booking, availability, reminders and no-show handling for patients and providers." },
    { icon: "shield", title: "HIPAA & ABDM compliance", desc: "Encryption, audit trails, consent and access control engineered in from day one." },
    { icon: "network", title: "EHR & device integration", desc: "Connect to EHR/EMR systems, labs, pharmacies, payments and remote monitoring devices." },
    { icon: "phone", title: "Patient apps that convert", desc: "Native and cross-platform apps designed so patients actually book, attend and return." },
  ],
  approachTitle: "Built for compliance, engineered for retention",
  approachSub:
    "A telehealth app only works if it passes audits and patients keep using it. We build for both.",
  approachPoints: [
    "HIPAA-aligned architecture with encryption, audit logging and consent baked in.",
    "ABDM/FHIR-ready in India — link to ABHA and the national health stack.",
    "Reliability engineering for video, so consultations hold up under real load.",
    "UX designed for booking and adherence, not just a feature checklist.",
  ],
  related: [
    { label: "Custom healthcare software", href: "/healthcare-software-development/custom" },
    { label: "EHR / EMR development", href: "/healthcare-software-development/ehr-emr" },
    { label: "ABDM & FHIR integration", href: "/healthcare-software-development/abdm-fhir" },
    { label: "Healthcare SaaS for startups", href: "/healthcare-software-development/saas" },
  ],
  faq: [
    { q: "How much does it cost to build a telemedicine app?", a: "A focused, HIPAA-compliant telemedicine MVP typically starts in the mid five figures (USD) globally and ₹15L+ in India, scaling with integrations like EHR, payments and remote monitoring. Book a call for a tailored range." },
    { q: "How long does telemedicine app development take?", a: "Most telemedicine MVPs ship in 10–14 weeks. We work in two-week sprints so you can launch a focused version and expand from there." },
    { q: "Is the app HIPAA compliant?", a: "Yes — encryption in transit and at rest, audit logging, role-based access and BAAs are engineered in from the first sprint and validated continuously." },
    { q: "Can it integrate with our EHR and pharmacy?", a: "Yes. We build FHIR/ABDM-ready integrations to EHR/EMR systems, e-prescription and pharmacy networks, payments and remote monitoring devices." },
  ],
  cta: {
    title: "Planning a telemedicine app? Let's map the build.",
    body: "Talk to a senior engineer who has shipped compliant telehealth platforms — leave with a feature scope, timeline and honest budget range.",
  },
};

export default function Page() {
  return <ServicePage config={config} />;
}
