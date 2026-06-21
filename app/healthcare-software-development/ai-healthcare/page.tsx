import type { Metadata } from "next";
import ServicePage, { ServiceConfig } from "@/components/ServicePage";
import { images } from "@/lib/site";

export const metadata: Metadata = {
  title: "AI Healthcare Software Development",
  description:
    "AI-native healthcare platforms — clinical documentation, claims automation, predictive analytics. Built compliant, built to ship.",
  alternates: { canonical: "/healthcare-software-development/ai-healthcare" },
};

const config: ServiceConfig = {
  slug: "/healthcare-software-development/ai-healthcare",
  parent: { label: "Healthcare", href: "/healthcare-software-development" },
  breadcrumb: [
    { label: "Home", href: "/" },
    { label: "Healthcare", href: "/healthcare-software-development" },
    { label: "AI in Healthcare" },
  ],
  eyebrow: "Healthcare · AI",
  h1: "AI that earns its place in clinical workflows.",
  heroSub:
    "We build AI-native healthcare software — ambient clinical documentation, claims and RCM automation, and predictive analytics — engineered to be compliant, explainable and genuinely useful at the point of care.",
  heroImage: images.dev,
  chips: ["Ambient scribe", "Claims automation", "Predictive analytics", "Compliant AI"],
  primaryKeyword: "ai in healthcare software development",
  intro: {
    title: "How is AI used in healthcare software?",
    body: "AI in healthcare software ranges from ambient clinical scribes that draft notes from a consultation, to claims and revenue-cycle automation, to predictive analytics that flag risk earlier. The hard part isn't the model — it's shipping it compliant, explainable and integrated into the clinical workflow. That's what MnT builds.",
  },
  featuresTitle: "AI where it adds real clinical value",
  features: [
    { icon: "ai", title: "Ambient clinical scribe", desc: "Draft structured notes and summaries from the consultation, cutting clinician documentation time." },
    { icon: "records", title: "Claims & RCM automation", desc: "Automate coding, claims and revenue-cycle steps to reduce denials and manual work." },
    { icon: "gauge", title: "Predictive analytics", desc: "Risk stratification and early-warning signals built on your clinical and operational data." },
    { icon: "compass", title: "Decision support", desc: "Explainable, guideline-aligned support surfaced inside the workflow — not a black box." },
    { icon: "shield", title: "Compliant by design", desc: "PHI handling, audit trails and governance engineered so AI features pass compliance." },
    { icon: "network", title: "Integrated, not bolted on", desc: "AI built into your EHR, telemedicine or HMS workflow so clinicians actually use it." },
  ],
  approachTitle: "Compliant, explainable AI — or it doesn't ship",
  approachSub:
    "In healthcare, an AI feature that can't be trusted or audited is worse than none. We build for both.",
  approachPoints: [
    "PHI-safe data pipelines with governance, audit trails and access control.",
    "Explainable outputs aligned to clinical guidelines — not unaccountable black boxes.",
    "Human-in-the-loop by default, with clinicians retaining final judgement.",
    "AI built into the existing workflow so it saves time instead of adding clicks.",
  ],
  related: [
    { label: "Custom healthcare software", href: "/healthcare-software-development/custom" },
    { label: "EHR / EMR development", href: "/healthcare-software-development/ehr-emr" },
    { label: "Telemedicine apps", href: "/healthcare-software-development/telemedicine" },
    { label: "Healthcare SaaS for startups", href: "/healthcare-software-development/saas" },
  ],
  faq: [
    { q: "What AI can you build into healthcare software?", a: "Ambient clinical documentation, claims and revenue-cycle automation, predictive risk analytics and guideline-aligned decision support — always built compliant and integrated into the clinical workflow." },
    { q: "How do you keep AI compliant with HIPAA/ABDM?", a: "PHI is handled through governed, audited pipelines with encryption and access control, and AI features are designed to be explainable and human-in-the-loop so they meet regulatory and clinical-safety bars." },
    { q: "Can you add AI to our existing platform?", a: "Yes. We integrate AI capabilities into your existing EHR, telemedicine or HMS rather than asking you to replatform." },
    { q: "Is the AI explainable?", a: "Yes — we prioritise explainable, guideline-aligned outputs with clinicians retaining final judgement, because trust and auditability are non-negotiable in healthcare." },
  ],
  cta: {
    title: "Want AI that clinicians actually use? Let's build it.",
    body: "Talk to a senior engineer about adding compliant, explainable AI to your healthcare platform — scribe, claims automation or predictive analytics.",
  },
};

export default function Page() {
  return <ServicePage config={config} />;
}
