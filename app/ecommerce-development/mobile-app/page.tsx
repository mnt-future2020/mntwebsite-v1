import type { Metadata } from "next";
import ServicePage, { ServiceConfig } from "@/components/ServicePage";
import { images } from "@/lib/site";

export const metadata: Metadata = {
  title: "E-Commerce App Development Company",
  description:
    "Native and cross-platform e-commerce apps — fast, beautiful and built to convert. iOS, Android, React Native & Flutter. India + global.",
  alternates: { canonical: "/ecommerce-development/mobile-app" },
};

const config: ServiceConfig = {
  slug: "/ecommerce-development/mobile-app",
  parent: { label: "E-Commerce", href: "/ecommerce-development" },
  breadcrumb: [
    { label: "Home", href: "/" },
    { label: "E-Commerce", href: "/ecommerce-development" },
    { label: "E-Commerce Apps" },
  ],
  eyebrow: "E-Commerce · Mobile apps",
  h1: "Shopping apps your customers actually keep.",
  heroSub:
    "Native and cross-platform e-commerce app development — fast, beautiful and built to convert and retain. iOS, Android, React Native and Flutter, integrated with your store and back office.",
  heroImage: images.mobileShopping,
  chips: ["iOS & Android", "React Native / Flutter", "Push & retention", "Store-integrated"],
  primaryKeyword: "ecommerce app development",
  intro: {
    title: "What is e-commerce app development?",
    body: "E-commerce app development is building the native or cross-platform shopping app customers install on their phones — browsing, search, cart, checkout, payments, push and order tracking — connected to your store and back office. MnT builds apps engineered to convert and, just as importantly, to retain.",
  },
  featuresTitle: "Apps built to convert and retain",
  features: [
    { icon: "phone", title: "Native & cross-platform", desc: "iOS and Android via native, React Native or Flutter — the right choice for your goals and budget." },
    { icon: "tag", title: "Fast, frictionless checkout", desc: "One-tap payments, saved details and a checkout designed to remove every drop-off." },
    { icon: "bolt", title: "Push & retention", desc: "Push notifications, personalisation and loyalty that bring customers back." },
    { icon: "network", title: "Store & back-office sync", desc: "Real-time integration with your store, inventory, payments and order management." },
    { icon: "gauge", title: "Performance-tuned", desc: "Fast launches and smooth scrolling — speed that protects conversion." },
    { icon: "users", title: "Personalised discovery", desc: "Search, recommendations and merchandising tailored to each shopper." },
  ],
  approachTitle: "Built for retention, not just installs",
  approachSub:
    "An app only pays off if customers keep it and keep buying. We build for lifetime value.",
  approachPoints: [
    "The right platform choice — native vs React Native vs Flutter — for your goals.",
    "Frictionless, fast checkout with the payment methods your customers use.",
    "Push, personalisation and loyalty engineered for repeat purchase.",
    "Real-time sync with store, inventory and order management.",
  ],
  related: [
    { label: "Custom e-commerce", href: "/ecommerce-development/custom" },
    { label: "D2C brand platforms", href: "/ecommerce-development/d2c" },
    { label: "Shopify & headless", href: "/ecommerce-development/shopify" },
    { label: "Commerce SaaS for startups", href: "/ecommerce-development/saas" },
  ],
  faq: [
    { q: "Native or cross-platform — which should I choose?", a: "Cross-platform (React Native or Flutter) gives speed and one codebase for iOS and Android; native is best when you need maximum performance or platform-specific features. We recommend based on your goals and budget." },
    { q: "How much does an e-commerce app cost?", a: "It depends on platform choice and feature scope. A focused app MVP typically starts in the mid five figures (USD) globally and ₹15L+ in India. Book a call for a tailored estimate." },
    { q: "Can the app connect to our existing store?", a: "Yes — we integrate with your existing store (Shopify, custom or otherwise), inventory, payments and order management so the app is one connected channel." },
    { q: "Do you handle App Store and Play Store launch?", a: "Yes — we handle build, store submission, review and release for both the App Store and Google Play." },
  ],
  cta: {
    title: "Want a shopping app that retains? Let's build it.",
    body: "Talk to a senior mobile engineer about a native or cross-platform commerce app — fast, integrated and built for lifetime value.",
  },
};

export default function Page() {
  return <ServicePage config={config} />;
}
