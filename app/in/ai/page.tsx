import type { Metadata } from "next";
import IndiaHubPage, { type IndiaHubConfig } from "@/components/IndiaHubPage";
import { resolveMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  return resolveMetadata("/in/ai", {
    title: "AI Consultation, Automation & Agents | MnT Future India",
    description:
      "AI that reaches production: consultation, automation, agent development and custom AI applications, delivered by senior engineers embedded in your team.",
  });
}

const config: IndiaHubConfig = {
  slug: "/in/ai",
  eyebrow: "AI",
  aside: "4 services",
  h1: (
    <>
      AI that reaches <span className="text-brand-700">production</span>.
    </>
  ),
  heroSub:
    "Four things you can buy, and one way we deliver all of them. Whether you need advice on what is worth doing, a workflow automated, an agent that does real work, or an entire application built around AI, the same senior engineers embed in your team and stay until it runs.",

  servicesTitle: "Four ways in, depending on where you are.",
  servicesSub:
    "Most conversations start at the first one and move down the list. If you already know exactly what you want built, start further down.",
  services: [
    {
      icon: "compass",
      title: "AI Consultation",
      desc: "What is genuinely worth doing with AI in your business, whether your data can support it, and what reaching production would cost. Ends in a costed path, not a maturity score.",
      href: "/in/ai/consultation",
    },
    {
      icon: "bolt",
      title: "AI Automation",
      desc: "The work your team repeats every day, automated. Document handling, data entry, classification, routing, reporting. A person stays in the loop wherever the cost of being wrong is real.",
      href: "/in/ai/automation",
    },
    {
      icon: "ai",
      title: "AI Agent Development",
      desc: "Agents that do work inside your systems rather than just answer questions, with clear limits on what they may act on alone and a record of everything they did.",
      href: "/in/ai/agent-development",
    },
    {
      icon: "grid",
      title: "Customised AI Applications",
      desc: "A complete application built for your business with AI inside it, from nothing. For when the shape of your problem means no ready product fits.",
      href: "/in/ai/custom-applications",
    },
  ],

  feature: {
    kicker: "How we deliver",
    title: "Your pilot works in the demo. Ours goes live.",
    body: "Most enterprise AI work in India stops at a proof of concept that impressed a room and then went nowhere. Forward Deployed Engineering is our answer: a senior engineer works inside your team and your environment, builds the system, and stays until it runs in production. It is not consulting, because we write the code. It is not staff augmentation, because we own the outcome. Our method is Discover, Design, Build, Deploy, Optimize, and it is the same one our founder is writing a handbook on.",
    href: "/in/ai/forward-deployed-engineering",
    cta: "How we deliver",
  },

  whyTitle: "Why this works when the last attempt did not.",
  why: [
    {
      icon: "users",
      title: "Embedded, not handed over",
      desc: "Our engineers sit in your repository, your standups and your environment. Your team learns the system as it is built, which is the difference between a handover and a handoff.",
    },
    {
      icon: "gauge",
      title: "Evaluation before go-live",
      desc: "We agree what working means in stage two and test against it before anything reaches a customer. Skipping this is the single most common reason an AI system quietly stops being trusted.",
    },
    {
      icon: "shield",
      title: "Your data can stay yours",
      desc: "Where governance requires it we run smaller models on your own infrastructure and design for that constraint from the start, rather than discovering it at deployment.",
    },
    {
      icon: "wallet",
      title: "Cost you can see",
      desc: "Token spend, model choice and caching are engineering decisions with a monthly bill attached. We make that bill visible from the first week rather than at the first invoice.",
    },
  ],

  faq: [
    {
      q: "Which of the four do we need?",
      a: "If you are not certain what AI should do in your business, start with consultation. If you know the process that is eating your team's time, that is automation. If you want something to take actions rather than answer questions, that is an agent. If none of it fits a ready product and the whole workflow needs building, that is a custom application. One conversation usually settles it.",
    },
    {
      q: "How is this different from buying one of your products?",
      a: "Products start from software that already works, so they are fast and comparatively cheap. Custom AI work starts from your specific problem, so it takes longer and costs more but fits exactly. We will tell you honestly which one your problem is, including when a product would do and you do not need us to build anything.",
    },
    {
      q: "Do we have to use a particular AI provider?",
      a: "No. We work with Claude, OpenAI and open-weight models you can run yourself, and the choice is made on your requirements rather than our preference. Where your data cannot leave your environment, models running on your own hardware are part of the design from the start.",
    },
    {
      q: "How long before we see something working?",
      a: "A discovery sprint is one to two weeks and ends with a costed path. After that, most first useful deployments land in six to twelve weeks depending on how much integration is involved. Anyone promising you production AI in two weeks is describing a demo.",
    },
    {
      q: "What if our data is a mess?",
      a: "It usually is, and that is what discovery is for. We would rather find out in week one and price for it than pretend otherwise and stall in month three. Sometimes the honest answer is that fixing the data is the project, and the AI comes after.",
    },
  ],

  related: [
    { label: "Forward Deployed Engineering", href: "/in/ai/forward-deployed-engineering" },
    { label: "Our products", href: "/in/products" },
    { label: "Ecommerce platforms", href: "/in/ecommerce" },
  ],

  cta: {
    title: "Bring the pilot that stalled.",
    body: "Tell us what you built, where it stopped, and what it was supposed to do. A senior consultant will tell you what reaching production would actually take, and whether it is worth taking. No obligation.",
  },
};

export default function Page() {
  return <IndiaHubPage config={config} />;
}
