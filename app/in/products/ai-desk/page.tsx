import type { Metadata } from "next";
import ProductPage, { type ProductConfig } from "@/components/ProductPage";
import { resolveMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  return resolveMetadata("/in/products/ai-desk", {
    title: "MnT AI Desk: Support Desk Software for Indian Businesses | MnT Future",
    description:
      "A support desk that puts WhatsApp, Instagram, Facebook, email and website chat in one inbox, with AI answering the repeat questions. Self-hosted, unlimited agents, no per-seat licence.",
  });
}

const config: ProductConfig = {
  slug: "/in/products/ai-desk",
  name: "MnT AI Desk",
  eyebrow: "Support desk application",
  h1: (
    <>
      Every customer message in <span className="text-brand-700">one inbox</span>, with AI answering
      the repeats.
    </>
  ),
  heroSub:
    "WhatsApp, Instagram, Facebook, email, SMS and the chat widget on your website, all arriving in one screen your whole team works from. The questions you answer forty times a week get answered automatically, from your own documents, and anything the AI is unsure about goes straight to a person.",
  forWho:
    "Businesses handling a few hundred customer messages a month or more, across more than one channel, where adding people is currently the only way to keep up.",
  chips: [
    "One inbox, every channel",
    "AI trained on your documents",
    "Unlimited agents",
    "Runs on your server",
  ],

  problem: {
    title: "Support is spread across five apps and nobody can see all of it.",
    sub: "None of this is a people problem. It is what happens when the tools were never joined up.",
    points: [
      "Messages arrive on WhatsApp, Instagram, Facebook, email and the website widget. Each one lives in a different app, and nobody can tell you what is still unanswered right now.",
      "Two people reply to the same customer because neither could see the other had already picked it up.",
      "Somebody promised a refund three weeks ago in a chat on a phone that has since been wiped. There is no record and no way to check.",
      "The same twenty questions come in every day. Order status, price, sizes, return policy, delivery time. Your team types the same answers by hand.",
      "When volume rises the only available move is hiring another agent, so support cost grows in a straight line with sales.",
      "You cannot answer simple questions about your own service: how fast do we reply, which channel is worst, who is overloaded.",
    ],
  },

  getsTitle: "What it does, and what that changes.",
  gets: [
    {
      icon: "chat",
      what: "Every channel in one screen",
      does: "WhatsApp, Instagram, Facebook, email, SMS, Telegram and your website chat all land in the same inbox. An agent stops switching apps, and a customer who messaged on Instagram last month and WhatsApp today is one person with one history.",
    },
    {
      icon: "ai",
      what: "AI that answers from your own documents",
      does: "Point it at your policies, catalogue, FAQs and past conversations. It answers the repeat questions in your words, not generic ones. Every answer is traceable to the document it came from, so you can check it rather than trust it.",
    },
    {
      icon: "users",
      what: "Handover the moment it matters",
      does: "The AI stops and passes to a person when it is not confident, when the customer asks for a human, or on any topic you decide it should never touch. Nobody gets trapped arguing with a bot, which is the failure everyone has experienced and nobody forgives.",
    },
    {
      icon: "layers",
      what: "Who is handling what",
      does: "Conversations get assigned, labelled and noted. Private notes let one agent brief another without the customer seeing. You can look at the board and know exactly what is open and with whom.",
    },
    {
      icon: "search",
      what: "A help centre customers can search",
      does: "Publish your FAQs and guides as a proper help centre on your own domain. A good chunk of your volume never becomes a conversation at all, because people find the answer themselves.",
    },
    {
      icon: "gauge",
      what: "Numbers you can act on",
      does: "First response time, resolution time, satisfaction score, volume by channel, load per agent. Enough to know whether you need another person or a better answer template.",
    },
  ],

  ownsTitle: "You own it. That is the whole point.",
  owns: [
    {
      title: "Your server, your data",
      desc: "It runs on infrastructure you control, in India if you want it in India. Customer conversations never sit on a vendor's servers under somebody else's terms, and nobody can change those terms on you later.",
    },
    {
      title: "No per-seat licence",
      desc: "Intercom, Zendesk and Freshdesk charge per agent per month, so your support bill grows every time the team does. This does not. Add ten agents in the festive season and your cost does not move.",
    },
    {
      title: "The code is yours",
      desc: "You get the source of what we deliver. If you stop working with us the system keeps running, and any competent engineer can maintain it. There is no switch we can flip.",
    },
  ],
  customise: [
    "Your branding throughout: name, logo, colours, and your own domain. Nothing on screen says anyone else's name.",
    "Your routing rules: which team gets what, escalation paths, out-of-hours handling, priority customers.",
    "Connected to the systems you already run, so an agent can see the order without leaving the conversation: your ecommerce platform, ERP, or order database.",
    "The AI layer built and tuned on your catalogue, your policies and your real past conversations, with the topics it must never answer defined by you.",
    "Evaluation before it goes live: we test the AI against real questions and show you where it is right, where it is wrong, and where it correctly refuses.",
    "Team training, then a support contract so there is somebody to call when something breaks.",
  ],

  needsTitle: "What we need from your side.",
  needs: [
    {
      label: "Somewhere to run it",
      note: "A server or cloud account. We can host and manage it for you, or deploy into your own infrastructure if your policy requires that.",
    },
    {
      label: "WhatsApp Business API",
      note: "A Meta WhatsApp Business account, which needs business verification documents. We apply and set it up, but Meta's approval takes one to two weeks and is outside anyone's control.",
    },
    {
      label: "Your channel logins",
      note: "Admin access to the Instagram, Facebook and email accounts you want connected. Nothing else on those accounts is touched.",
    },
    {
      label: "Your documents",
      note: "Policies, FAQs, catalogue, delivery and returns rules. Whatever your team already uses to answer questions. This is what the AI learns from.",
    },
    {
      label: "One person to decide",
      note: "Somebody on your side who can answer questions about how support should work. Two hours a week during setup, less after.",
    },
    {
      label: "Your escalation rules",
      note: "Which topics must always reach a human, and who handles them. We build this into the handover logic rather than guessing.",
    },
  ],
  timeline: [
    { no: "01", title: "Setup and branding", desc: "Deployed, branded, on your domain. You can log in and look around at the end of week one." },
    { no: "02", title: "Channels connected", desc: "WhatsApp, Instagram, Facebook, email and the site widget wired up and tested with real messages." },
    { no: "03", title: "AI trained and checked", desc: "Built on your documents, then tested against real questions. You see the evaluation before it answers a single customer." },
    { no: "04", title: "Team trained, live", desc: "Your agents trained on the tool, then we go live with the AI handling a narrow set of topics and widening as it proves itself." },
  ],

  origin: {
    title: "We do not rebuild what already works.",
    body: "The inbox underneath MnT AI Desk is Chatwoot, a mature open-source support platform with tens of thousands of production deployments behind it. We did not write it and we will not pretend we did. Rebuilding a battle-tested omnichannel inbox from scratch would take a year and be worse. What you pay us for is everything that makes it yours: the deployment, your branding and domain, integration with the systems you already run, the AI layer we build ourselves on your content, the evaluation that proves it works, and somebody to call when it breaks.",
    note: "The AI in AI Desk is genuinely ours. Chatwoot's own AI assistant sits under a commercial licence we do not ship, so we build the AI layer with the Claude Agent SDK on top of the open-source core. That is the part with our name on it.",
  },

  faq: [
    {
      q: "Is MnT AI Desk open source?",
      a: "The inbox underneath it is: it is built on Chatwoot, which is MIT licensed. The AI layer, the integrations, the branding and the deployment are our work. You get the source of what we deliver, and you are free to have anyone maintain it.",
    },
    {
      q: "How is this different from just installing Chatwoot ourselves?",
      a: "You could, and if you have a senior engineer with time to spare, you should consider it. What we add is the AI layer, which the free version does not include, integration with your own systems, evaluation so you know the AI is safe to switch on, and a support contract. Most businesses find the second month of running it themselves is the expensive one.",
    },
    {
      q: "Where does our customer data live?",
      a: "Wherever you decide. It runs on your server or your cloud account, and it can stay entirely within India. We do not hold copies. If the AI uses a hosted model we tell you exactly what is sent to it, and we can run smaller models on your own infrastructure where policy requires it.",
    },
    {
      q: "How many agents can use it?",
      a: "As many as you want. There is no per-seat licence, which is the main reason businesses move off Intercom, Zendesk or Freshdesk once their team passes about ten people.",
    },
    {
      q: "Can we move our existing conversations across?",
      a: "Usually yes. Most support tools can export contacts and conversation history, and we import what the format allows. We will tell you honestly what will and will not survive the move before you commit.",
    },
    {
      q: "What if the AI gives a wrong answer?",
      a: "You define the topics it is allowed to handle and it refuses everything else. It hands over to a person whenever it is unsure. Before go-live we test it against real questions and show you the results, and after go-live every answer is logged next to the document it came from, so a wrong answer is a fixable document rather than a mystery.",
    },
    {
      q: "Do we need MnT AI CRM as well?",
      a: "Only if you sell on WhatsApp. AI Desk is for answering customers across every channel. AI CRM is for selling on WhatsApp: pipeline, broadcasts, follow-ups. Plenty of businesses need one and not the other, and we will tell you which if you ask.",
    },
  ],

  cta: {
    title: "Show us a week of your support messages.",
    body: "Bring a normal week of conversations and we will tell you which of them the AI could have handled, which needed a person, and what that changes about your support cost. A senior consultant, no obligation.",
  },
};

export default function Page() {
  return <ProductPage config={config} />;
}
