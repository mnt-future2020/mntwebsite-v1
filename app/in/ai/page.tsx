import type { Metadata } from "next";
import IndiaHubPage, { type IndiaHubConfig } from "@/components/IndiaHubPage";
import { resolveMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  return resolveMetadata("/in/ai", {
    title: "AI Consultation, Automation & Agents | MnT Future India",
    description:
      "AI your team actually ends up using: advice, automation, agents and custom applications, built by senior engineers who sit inside your team.",
  });
}

const config: IndiaHubConfig = {
  slug: "/in/ai",
  eyebrow: "AI",
  aside: "4 services",
  // The plain name of the category, nothing else. A visitor landing here from
  // search wants to know what is sold before they want a promise; the hero
  // paragraph two lines down is where the promise belongs.
  h1: (
    <>
      AI <span className="text-brand-700">Services</span>
    </>
  ),
  heroSub:
    "Four things you can buy, and one way we deliver all of them. Whether you need advice on what is worth doing, a daily task automated, an agent that does real work, or a whole application built around AI, the same senior engineers sit inside your team and stay until it is running.",

  servicesTitle: "Four ways in, depending on where you are.",
  servicesSub:
    "Most conversations start at the first one and move down the list. If you already know exactly what you want built, start further down.",
  services: [
    {
      icon: "compass",
      title: "AI Consultation",
      desc: "What is genuinely worth doing with AI in your business, whether your data can support it, and what getting it working would cost. Ends in a costed plan, not a scorecard.",
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
    title: "Most AI stops after the demo. Ours goes to work.",
    body: "Most AI work in India stops at a trial that impressed a room and then went nowhere. Our answer is simple: a senior engineer sits inside your team, works on your systems, builds the thing, and stays until it is running every day. It is not consulting, because we write the code ourselves. It is not hiring a temporary body, because we answer for whether it works. We call it Forward Deployed Engineering, we follow the same five steps every time, and our founder is writing the handbook on it.",
    href: "/in/ai/forward-deployed-engineering",
    cta: "How we deliver",
  },

  whyTitle: "Why this works when the last attempt did not.",
  why: [
    {
      icon: "users",
      title: "Our engineers sit in your team",
      desc: "They are in your daily meetings and working on your systems, not building something in a corner and posting it over. Your team learns how it works while it is being built, so nobody is stranded when we finish.",
    },
    {
      icon: "gauge",
      title: "We agree what \"working\" means, then prove it",
      desc: "We write down what a good answer looks like in step two, and test against it before a single customer sees it. Skipping this is the most common reason a team quietly stops trusting an AI system.",
    },
    {
      icon: "shield",
      title: "Your data can stay yours",
      desc: "Where your rules say the data cannot leave, we run smaller models on your own servers and design for that from day one, rather than finding out at the end.",
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
      a: "The first study takes one to two weeks and ends with a costed plan. After that, most first useful versions go live in six to twelve weeks, depending on how much has to connect to your existing systems. Anyone promising you a working AI system in two weeks is describing a demo.",
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
    title: "Bring the AI project that stopped halfway.",
    body: "Tell us what you built, where it stopped, and what it was supposed to do. A senior consultant will tell you what it would really take to get it working, and whether it is worth doing at all. No obligation.",
  },
};

export default function Page() {
  return <IndiaHubPage config={config} />;
}
