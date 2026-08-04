import type { Metadata } from "next";
import ProductPage, { type ProductConfig } from "@/components/ProductPage";
import { resolveMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  return resolveMetadata("/in/products/ai-crm", {
    title: "MnT AI CRM: WhatsApp CRM with Automation & AI for Indian Businesses | MnT Future",
    description:
      "Run your whole WhatsApp business from one screen: one official number for the entire team, a sales pipeline, broadcasts on approved templates, no-code automation and an AI reply assistant. Self-hosted.",
  });
}

const config: ProductConfig = {
  slug: "/in/products/ai-crm",
  name: "MnT AI CRM",
  eyebrow: "WhatsApp · Automation · AI agent · CRM",
  h1: (
    <>
      Your whole WhatsApp business on <span className="text-brand-700">one screen</span>.
    </>
  ),
  heroSub:
    "One official WhatsApp number the entire team answers from, every lead becoming a contact with a history, a sales pipeline you can actually see, broadcasts that do not get your number blocked, and automations that follow up while you sleep. With an AI assistant drafting replies from what your business already knows.",
  forWho:
    "Businesses that sell and support over WhatsApp: D2C brands, boutiques, clinics, real estate, education, distributors, and anyone whose leads arrive as chat messages rather than form fills.",
  chips: [
    "One number, whole team",
    "Sales pipeline built in",
    "Broadcasts on approved templates",
    "Automation without code",
  ],

  problem: {
    title: "WhatsApp is where your customers are, and the tools were built for one person.",
    sub: "The WhatsApp Business app is a good app for a shop with one owner. It stops working the day you have a team.",
    points: [
      "One phone, one person. Nobody else can answer, so the whole business waits on whoever holds that handset.",
      "A lead asks for a price, gets busy, and the conversation scrolls away. A week later nobody remembers to follow up, and the lead buys elsewhere.",
      "There is no pipeline. Nobody can say how many people are waiting on a quote right now, or what all of them are worth together.",
      "Follow-ups live in somebody's memory. When that person is on leave, their pipeline goes quiet.",
      "Broadcasts go out from a normal number, recipients report it, and the number gets restricted. The whole channel goes down with it.",
      "When the person handling WhatsApp leaves, the customer relationships leave with them, because the history was never anywhere but their phone.",
    ],
  },

  getsTitle: "What it does, and what that changes.",
  gets: [
    {
      icon: "chat",
      what: "One official number, many agents",
      does: "Every agent works the same number from their own login. Conversations get assigned so two people never reply to the same customer, and every chat has a status so nothing quietly goes cold.",
    },
    {
      icon: "users",
      what: "Every lead becomes a contact",
      does: "Tags, custom fields, and the full conversation history against a real record rather than a phone. Import your existing list from a spreadsheet. When someone leaves the company, the relationships stay with the business.",
    },
    {
      icon: "layers",
      what: "A sales pipeline you can see",
      does: "Enquiry, quote, negotiation, paid, on a board where each card opens the actual conversation behind it. You can answer the question every owner asks on a Monday: what is in the pipeline and what is it worth.",
    },
    {
      icon: "bolt",
      what: "Automation without writing code",
      does: "Build rules by dragging: a message containing \"price\" gets an instant reply, a new lead gets assigned to whoever is on duty, a conversation with no answer in twenty-four hours gets a nudge. Set once, runs forever.",
    },
    {
      icon: "mail",
      what: "Broadcasts that stay safe",
      does: "Sent on Meta-approved templates from a proper business number, personalised per recipient, with delivery and read tracking on every send. The safe way to message a list, rather than the way that gets numbers restricted.",
    },
    {
      icon: "ai",
      what: "An AI assistant on your knowledge",
      does: "Drafts replies from your catalogue, price list and policies so an agent edits rather than types. You choose whether it answers automatically on defined topics or only ever suggests, and it hands to a human on anything it is unsure about.",
    },
    {
      icon: "gauge",
      what: "A dashboard that tells the truth",
      does: "Response times, message volume, pipeline value and who is actually doing the work. Enough to see which agent is drowning and which stage of your pipeline is where deals go to die.",
    },
    {
      icon: "code",
      what: "An API, if you need one",
      does: "A proper REST API with keys you can revoke, so your website, ERP or accounting system can create contacts and trigger messages. Optional, and there if the business grows into it.",
    },
  ],

  ownsTitle: "You own it, including the customer list.",
  owns: [
    {
      title: "Your server, your data",
      desc: "It runs on infrastructure you control and can stay entirely within India. Your customer list, conversations and pipeline are yours, not a vendor's asset that you rent access to.",
    },
    {
      title: "No per-user pricing",
      desc: "Hosted WhatsApp CRM tools charge per user per month, so the tool taxes you for growing. This does not. You still pay Meta for messages, because everyone does, and we show you those numbers plainly.",
    },
    {
      title: "The number is yours",
      desc: "The WhatsApp Business number is registered to your business, not to us. If we part ways, you keep the number, the history and the software.",
    },
  ],
  customise: [
    "Your branding, your domain, your team structure and permissions.",
    "Your pipeline stages named the way your business actually sells, not a generic funnel.",
    "The automations you need, built with you: keyword replies, assignment rules, follow-up sequences, escalation.",
    "Message templates written and submitted to Meta for approval on your behalf, which is a step most businesses get wrong the first three times.",
    "The AI assistant built on your catalogue, price list and policies, with clear limits on what it may answer alone.",
    "Connected to what you already run: your ecommerce platform, ERP, accounting or existing CRM, so a paid order does not need retyping.",
    "Team training, then a support contract with a person who answers.",
  ],

  needsTitle: "What we need from your side.",
  needs: [
    {
      label: "WhatsApp Business API",
      note: "This is the important one. The normal WhatsApp Business app is not enough: you need a Meta WhatsApp Business API account. We apply and configure it, but Meta's verification takes one to two weeks.",
    },
    {
      label: "Business documents",
      note: "GST certificate or company registration, and a business website or verifiable presence. Meta requires these for verification, not us.",
    },
    {
      label: "A number to use",
      note: "A phone number not currently registered on WhatsApp, or one we can migrate. We will walk you through which of your numbers to use and why.",
    },
    {
      label: "Somewhere to run it",
      note: "A server or cloud account. We can host and manage it, or deploy into your own infrastructure.",
    },
    {
      label: "Your price list and policies",
      note: "Whatever your team already sends customers. This is what the AI assistant learns to draft from.",
    },
    {
      label: "Message costs",
      note: "Meta charges per conversation and the rate depends on the type. Those charges go to Meta directly, not to us, and we show you the expected monthly figure before you start.",
    },
  ],
  timeline: [
    { no: "01", title: "Meta application", desc: "We start business verification on day one, because it is the long pole. Everything else happens while Meta reviews." },
    { no: "02", title: "Setup and branding", desc: "Deployed on your infrastructure, branded, pipeline stages configured, team accounts created." },
    { no: "03", title: "Templates and automation", desc: "Message templates submitted for approval, your automation rules built, the AI assistant trained on your content." },
    { no: "04", title: "Team trained, live", desc: "Your team trained on the pipeline and inbox, then live with automations running and the AI suggesting rather than sending." },
  ],

  origin: {
    title: "Started from working software, made yours.",
    body: "MnT AI CRM is built on an open-source WhatsApp CRM released under the MIT licence. We audited it, hardened it, and built our layer on top: your branding, your automations, your integrations, the AI assistant tuned on your content, and the Meta application handled for you. Starting from working software is why you get this in weeks rather than in the year it would take to build the same thing from nothing.",
    note: "Being straight about maturity: the upstream project is young, released in 2026. We will not claim years of production behind it. What we will claim is that we have read the code, tested it, and stand behind what we deploy with a support contract.",
  },

  faq: [
    {
      q: "How is this different from the free WhatsApp Business app?",
      a: "The free app is built for one person on one phone. This is built for a team: several agents on one official number, conversations assigned so nobody doubles up, a sales pipeline, safe broadcasts on approved templates, automations, and a record that stays with your business rather than on somebody's handset.",
    },
    {
      q: "Do we really need the WhatsApp Business API?",
      a: "Yes, for anything beyond one person on one phone. Multiple agents, automation, broadcasts at any real volume and API access all require it. We handle the application and configuration; Meta's verification typically takes one to two weeks.",
    },
    {
      q: "Will broadcasting get our number blocked?",
      a: "Not if it is done properly. Broadcasts go out on templates Meta has approved in advance, from a verified business number, to people who have a reason to hear from you. What gets numbers restricted is bulk messaging strangers from an unverified number, which this does not do.",
    },
    {
      q: "What does it cost to run?",
      a: "Two separate things. Our fee covers setup, customisation and support. Meta charges separately per conversation at rates it sets, which vary by conversation type. We size that second number for your expected volume before you commit, so there are no surprises.",
    },
    {
      q: "Do we need AI Desk as well?",
      a: "Only if you support customers on channels beyond WhatsApp. AI CRM is WhatsApp-first and built for selling: pipeline, broadcasts, follow-ups. AI Desk is for support across every channel: Instagram, Facebook, email, website chat. Some businesses need both and we connect them; many need only one.",
    },
    {
      q: "Can we use our own AI provider?",
      a: "Yes. It works with Claude or OpenAI using your own API keys, stored encrypted, and where data governance requires it we can run a smaller model on your own infrastructure instead.",
    },
    {
      q: "What happens to our data if we stop working with you?",
      a: "Nothing. It runs on your infrastructure, the number is registered to your business, and you hold the source of what we delivered. You can export everything or simply carry on running it without us.",
    },
  ],

  cta: {
    title: "Tell us how WhatsApp works in your business today.",
    body: "Who answers, what gets missed, and what a lost lead costs you. A senior consultant will map how this would run instead, including what Meta will need from you and how long verification takes. No obligation.",
  },
};

export default function Page() {
  return <ProductPage config={config} />;
}
