import type { Metadata } from "next";
import Link from "next/link";
import { resolveMetadata } from "@/lib/seo";
import Icon from "@/components/Icon";
import CTASection from "@/components/CTASection";
import BlueprintMotion from "@/components/BlueprintMotion";
import BlueprintFaq from "@/components/BlueprintFaq";
import { QA } from "@/components/FAQ";
import { Breadcrumbs } from "@/components/blocks";
import { SectionHead, RuleLabel, BpButton, PAGE } from "@/components/blueprint";
import { site } from "@/lib/site";

export async function generateMetadata(): Promise<Metadata> {
  return resolveMetadata("/in/ai/forward-deployed-engineering", {
    title: "Forward Deployed Engineering: AI That Reaches Production | MnT Future",
    description:
      "Senior engineers embedded in your team and your environment, building your AI system and staying until it runs in production. Our documented method: Discover, Design, Build, Deploy, Optimize.",
  });
}

const SPOT =
  "radial-gradient(190px circle at var(--mx,50%) var(--my,0%),rgba(32,149,241,calc(0.05 * var(--spot,0))),transparent 72%)";

const notThis = [
  {
    title: "Not a consultant",
    desc: "A consultant assesses your situation and hands you a document. We write the code, in your environment, and the deliverable is a system that runs.",
  },
  {
    title: "Not staff augmentation",
    desc: "A contractor bills hours and owns nothing. When the contract ends they leave, whatever state the work is in. We own the outcome, which is a different arrangement entirely.",
  },
  {
    title: "Not a licence sale",
    desc: "We are not selling you a platform and calling the integration your problem. The engagement ends when the thing works in your business, not when the software is installed.",
  },
];

const versus = [
  {
    who: "Large IT services firms",
    weakness:
      "Expensive, slow, and layered. You are sold by a partner and delivered by a pyramid of juniors, against a generic AI centre-of-excellence pitch that is the same one they gave the last three clients.",
    us: "One named senior engineer, inside your team, who owns whether it works.",
  },
  {
    who: "Staff augmentation and body shops",
    weakness:
      "They bill hours. They own nothing. Direction has to come from you, and when the contract ends the knowledge walks out with the person.",
    us: "We ship a working production system and stay until it runs without us.",
  },
  {
    who: "AI consultancies and advisory firms",
    weakness:
      "Strategy decks, maturity assessments, roadmaps. Genuinely useful documents that do not, by themselves, put anything into production.",
    us: "We write and own the code, in your environment, against the plan we agreed.",
  },
  {
    who: "Freelancers and small AI shops",
    weakness:
      "Often strong engineers. Usually no evaluation framework, no monitoring, no cost control, and no story for security or data governance when your compliance team asks.",
    us: "Production discipline: evals, observability, cost control, and on-premise where governance demands it.",
  },
];

const stages = [
  {
    no: "01",
    title: "Discover",
    what: "We look at the data you actually have rather than the data you wish you had, the business problem behind the AI request, and what standing this up in production would genuinely involve.",
    get: "A costed path to production, with the parts that will be hard named out loud.",
  },
  {
    no: "02",
    title: "Design",
    what: "Architecture, model choice, how the data flows, where it is allowed to go, and crucially the checks we will judge the system by. Agreed in writing before anybody writes code.",
    get: "A design, and an agreed definition of working so nobody argues about done later.",
  },
  {
    no: "03",
    title: "Build",
    what: "Senior engineers writing code inside your environment, alongside your team, in short cycles you can see. Your engineers learn the system as it is built rather than at handover.",
    get: "Working software, reviewed by you as it appears, not presented at the end.",
  },
  {
    no: "04",
    title: "Deploy",
    what: "Into production, with monitoring, alerting, access control and cost visibility. On your own servers or private cloud where data governance requires it. This is the stage most AI projects never reach.",
    get: "A system running against real users and real data, that somebody is watching.",
  },
  {
    no: "05",
    title: "Optimize",
    what: "Measured against the checks agreed in stage two. Tuned for accuracy and for cost, watched for drift as your data changes, and handed to your team with documentation.",
    get: "Evidence it works, and a team that can keep it working without us.",
  },
];

const builds = [
  { icon: "search" as const, title: "RAG over your own data", desc: "Retrieval across your documents, tickets, contracts or catalogue, with answers traceable to the source they came from rather than asserted." },
  { icon: "ai" as const, title: "Custom AI agents", desc: "Agents that do real work inside your systems, with clear limits on what they may act on alone and a record of everything they did." },
  { icon: "bolt" as const, title: "Workflow automation", desc: "The work your team repeats every day, automated where the failure cost is understood and a person stays in the loop where it is not." },
  { icon: "gauge" as const, title: "Evaluation frameworks", desc: "The part almost everyone skips. Tests that catch hallucination and regression before your customers do, run on every change." },
  { icon: "network" as const, title: "Integration with what exists", desc: "Your ERP, CRM, data warehouse and internal tools. Most of the difficulty in enterprise AI is here, not in the model." },
  { icon: "shield" as const, title: "On-premise deployment", desc: "Where your data cannot leave your environment, we run smaller models on your own infrastructure and design around that constraint from the start." },
];

const models = [
  {
    no: "01",
    title: "Discovery sprint",
    shape: "One to two weeks, fixed fee",
    desc: "Stage one on its own. We assess your data, the use case and what production would take, and you get a costed path. Paid, because a free assessment is worth what you pay for it and because it starts the relationship honestly.",
  },
  {
    no: "02",
    title: "Embedded engineer",
    shape: "Monthly, ongoing",
    desc: "One or more senior engineers working inside your team as part of it: your standups, your repository, your environment. The core offering, and the one that suits an organisation with several things to build.",
  },
  {
    no: "03",
    title: "Discovery to production",
    shape: "Fixed scope, milestone billed",
    desc: "All five stages on one scoped use case, priced and billed against milestones. Suits an organisation that wants one thing done properly and wants to know the number in advance.",
  },
];

const forWho = {
  yes: [
    "You have data, and a real business problem behind the AI request.",
    "You ran a pilot or a proof of concept, it impressed a room, and then it stopped.",
    "You have budget and someone senior who wants this to actually ship.",
    "Your data governance means some of this has to run inside your own environment.",
  ],
  no: [
    "You are not yet sure what you want AI to do. Start with a discovery sprint instead, which is designed for exactly that.",
    "You want bodies at an hourly rate with direction coming from you. That is staff augmentation, and other firms do it better and cheaper than we would.",
    "You want a strategy document rather than software. A consultancy is the right call.",
  ],
};

const faq: QA[] = [
  {
    q: "What is a Forward Deployed Engineer?",
    a: "A senior engineer who works inside your team and your environment rather than from a vendor's office, and who stays with the system until it runs in production. The role exists because the hard part of enterprise AI is not model access, which everyone has, but deployment: integration, evaluation, monitoring, security and cost. It is a role firms like Palantir, OpenAI and Databricks staff heavily, and it is only now becoming known in India.",
  },
  {
    q: "How is this different from hiring contractors?",
    a: "Ownership of the outcome. A contractor bills for time and takes direction from you; if the project fails they still get paid and they leave. We are accountable for the system working in production, we bring the method rather than waiting for yours, and we do not consider the engagement finished until it runs.",
  },
  {
    q: "Why do so many AI pilots never reach production?",
    a: "Because a demo and a production system are different pieces of engineering. A demo needs a model that answers well on chosen examples. Production needs evaluation that catches wrong answers, monitoring, access control, cost management, and integration with systems built long before anyone said the word AI. Teams that have never shipped one underestimate that gap, and the pilot quietly stalls.",
  },
  {
    q: "Do our engineers work with yours?",
    a: "Yes, and we prefer it. Your engineers are in the repository and in the reviews from day one, which is how the knowledge stays with you. An engagement that leaves your team unable to maintain what we built is a failed engagement even if the software works.",
  },
  {
    q: "Can everything run inside our own environment?",
    a: "Yes. Where data cannot leave your infrastructure we design for that from stage two rather than discovering it at deployment: smaller models running on your own hardware, private cloud, and an architecture that assumes the constraint instead of working around it.",
  },
  {
    q: "How do we start?",
    a: "A discovery sprint. One to two weeks, fixed fee, and at the end you have a costed path to production and a clear view of whether the thing is worth building at all. If the honest answer is that it is not, we will say so, and that is a cheaper way to find out than a six month build.",
  },
  {
    q: "You mentioned a handbook. Is it published?",
    a: "Not yet. Our founder is writing The Forward Deployed Engineer Handbook, and the table of contents and sample chapters are public as they are written. We will not announce a publication date we cannot hold. What matters for your engagement is that the method in it is the method we use.",
  },
];

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Forward Deployed Engineering",
  provider: { "@type": "Organization", name: site.name, legalName: site.legalName, url: site.url },
  areaServed: ["India"],
};

export default function FdePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faq.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          }),
        }}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <BlueprintMotion />

      {/* HERO */}
      <section className="relative overflow-hidden border-b border-bp-line bg-gradient-to-b from-[#FBFCFE] via-white to-white">
        <div
          className="pointer-events-none absolute inset-0 mx-auto max-w-[1440px]"
          style={{
            backgroundImage: "linear-gradient(to right,rgba(11,21,36,0.022) 1px,transparent 1px)",
            backgroundSize: "calc(100% / 12) 100%",
          }}
          aria-hidden="true"
        />
        <div className={`relative ${PAGE} pb-14 pt-10 lg:pb-20 lg:pt-12`}>
          <Breadcrumbs
            trail={[
              { label: "Home", href: "/in" },
              { label: "AI", href: "/in/ai" },
              { label: "Forward Deployed Engineering" },
            ]}
            tone="light"
          />
          <div className="mt-8 flex animate-rise-in items-center gap-4 border-b border-bp-hair pb-7 lg:gap-7">
            <span className="h-px w-[38px] shrink-0 bg-brand-500" />
            <span className="font-mono text-[11.5px] uppercase tracking-[0.2em] text-brand-700">
              How we deliver
            </span>
            <span className="min-w-3 flex-1" />
            <span className="hidden whitespace-nowrap font-mono text-[11.5px] uppercase tracking-[0.2em] text-[#A6B3C4] sm:inline">
              5 stages
            </span>
          </div>

          <h1 className="mt-8 max-w-[18ch] animate-rise-in font-display text-[38px] font-bold leading-[0.99] tracking-[-0.048em] text-bp-ink sm:text-[54px] lg:text-[74px]">
            Your AI pilot works in the demo. Ours{" "}
            <span className="text-brand-700">goes live</span>.
          </h1>

          <div className="mt-9 grid items-start gap-9 lg:grid-cols-[1fr_0.85fr] lg:gap-16">
            <p className="m-0 max-w-[58ch] animate-rise-in text-[18.5px] leading-[1.68] text-bp-mute [animation-delay:120ms]">
              Most enterprise AI work in India stops at a proof of concept that impressed a room and
              then went nowhere. Not because the model was wrong, but because getting a demo to
              answer well and getting a system to run reliably in your business are two different
              pieces of engineering. Forward Deployed Engineering is how we do the second one.
            </p>
            <div className="animate-rise-in border-l-2 border-brand-500 bg-bp-tint px-6 py-5 [animation-delay:200ms]">
              <div className="font-mono text-[11px] sm:text-[10.5px] uppercase tracking-[0.2em] text-brand-700">
                In one sentence
              </div>
              <p className="m-0 mt-2.5 text-[15px] leading-[1.65] text-bp-body">
                A senior engineer works inside your team and your environment, builds your system,
                and stays until it runs in production.
              </p>
            </div>
          </div>

          <div className="mt-9 flex flex-wrap gap-3">
            <BpButton href="/in/strategy-session">Book a discovery sprint</BpButton>
            <BpButton href="/in/ai" variant="outline">
              Back to AI services
            </BpButton>
          </div>
        </div>
      </section>

      {/* 01 WHAT IT IS */}
      <section data-reveal className="border-b border-bp-line bg-bp-wash">
        <div className={`${PAGE} py-20 lg:py-[110px]`}>
          <SectionHead
            no="01"
            total="06"
            eyebrow="What it is"
            title="Embedded, and accountable for whether it works."
            sub="The word is new in India, so it is worth being precise. Here is what it is not, because each of these is something you have probably already been sold once."
          />
          <div className="mt-11 grid border-l border-t border-bp-edge lg:mt-16 lg:grid-cols-3">
            {notThis.map((n) => (
              <div key={n.title} data-stagger className="border-b border-r border-bp-edge bg-white p-7 lg:p-8">
                <h3 className="m-0 font-display text-[19px] font-bold tracking-[-0.024em] text-bp-ink">
                  {n.title}
                </h3>
                <p className="mt-3 text-[15px] leading-[1.72] text-bp-mute">{n.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 02 VERSUS */}
      <section data-reveal className="border-b border-bp-line bg-white">
        <div className={`${PAGE} py-20 lg:py-[110px]`}>
          <SectionHead
            no="02"
            total="06"
            eyebrow="The alternatives"
            title="You have probably tried one of these."
            sub="We are not claiming these firms are bad at what they do. We are saying what they do is a different job, and that the difference is where AI projects usually die."
          />
          <div className="mt-11 border-t border-bp-edge lg:mt-16">
            {versus.map((v, i) => (
              <div
                key={v.who}
                data-stagger
                data-spot
                style={{ backgroundImage: SPOT }}
                className="grid gap-4 border-b border-bp-edge py-7 lg:grid-cols-[0.7fr_1.3fr] lg:gap-12"
              >
                <div className="flex items-start gap-4">
                  <span className="mt-1 font-mono text-[11px] tracking-[0.14em] text-brand-500">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="m-0 font-display text-[19px] font-bold leading-[1.24] tracking-[-0.024em] text-bp-ink">
                    {v.who}
                  </h3>
                </div>
                <div>
                  <p className="m-0 text-[15.5px] leading-[1.7] text-bp-mute">{v.weakness}</p>
                  <p className="mt-3.5 flex items-start gap-3 border-l-2 border-brand-500 pl-4 text-[15px] leading-[1.65] text-bp-ink">
                    {v.us}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 03 THE METHOD */}
      <section data-reveal className="border-b border-bp-line bg-bp-ink">
        <div className={`${PAGE} py-20 lg:py-[110px]`}>
          <SectionHead
            no="03"
            total="06"
            eyebrow="The method"
            title="Discover, Design, Build, Deploy, Optimize."
            sub="Written down, followed on every engagement, and the same method our founder is writing a handbook on. Most firms selling AI services in India have no named method at all, which is why every engagement with them is an experiment."
            tone="dark"
          />
          <div className="mt-11 grid border-l border-t border-white/10 lg:mt-16 sm:grid-cols-2 lg:grid-cols-5">
            {stages.map((s) => (
              <div key={s.no} data-stagger className="flex flex-col border-b border-r border-white/10 bg-white/[0.03] p-6 lg:p-7">
                <div className="flex items-center justify-between gap-4">
                  <span className="font-mono text-[11px] tracking-[0.14em] text-brand-300">{s.no}</span>
                  <span className="h-px flex-1 bg-white/12" />
                </div>
                <h3 className="mt-5 font-display text-[19px] font-bold tracking-[-0.024em] text-white">
                  {s.title}
                </h3>
                <p className="mt-3 text-[14px] leading-[1.65] text-white/60">{s.what}</p>
                <div className="mt-5 border-t border-white/10 pt-4">
                  <div className="font-mono text-[11px] sm:text-[9.5px] uppercase tracking-[0.16em] text-brand-300">
                    You get
                  </div>
                  <p className="mt-2 text-[13.5px] leading-[1.6] text-white/75">{s.get}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 04 WHAT WE BUILD */}
      <section data-reveal className="border-b border-bp-line bg-white">
        <div className={`${PAGE} py-20 lg:py-[110px]`}>
          <SectionHead no="04" total="06" eyebrow="What gets built" title="The work itself." />
          <div className="mt-11 grid border-l border-t border-bp-line lg:mt-16 sm:grid-cols-2 lg:grid-cols-3">
            {builds.map((b) => (
              <div
                key={b.title}
                data-stagger
                data-spot
                style={{ backgroundImage: SPOT }}
                className="border-b border-r border-bp-line bg-white p-7 lg:p-8"
              >
                <span className="flex h-11 w-11 items-center justify-center border border-[#DCE6F2] bg-white text-brand-700">
                  <Icon name={b.icon} className="h-[21px] w-[21px]" />
                </span>
                <h3 className="mt-6 font-display text-[18px] font-bold tracking-[-0.024em] text-bp-ink">
                  {b.title}
                </h3>
                <p className="mt-3 text-[14.5px] leading-[1.7] text-bp-mute">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 05 ENGAGEMENT + BOOK */}
      <section data-reveal className="border-b border-bp-line bg-bp-wash">
        <div className={`${PAGE} py-20 lg:py-[110px]`}>
          <SectionHead
            no="05"
            total="06"
            eyebrow="How we work together"
            title="Three shapes, depending on where you are."
          />
          <div className="mt-11 grid border-l border-t border-bp-edge lg:mt-16 lg:grid-cols-3">
            {models.map((m) => (
              <div key={m.no} data-stagger className="flex flex-col border-b border-r border-bp-edge bg-white p-7 lg:p-8">
                <div className="flex items-center justify-between gap-4">
                  <span className="font-mono text-[11px] tracking-[0.14em] text-brand-500">{m.no}</span>
                  <span className="h-px flex-1 bg-bp-hair" />
                  <span className="whitespace-nowrap font-mono text-[11px] sm:text-[10px] uppercase tracking-[0.12em] text-bp-faint">
                    {m.shape}
                  </span>
                </div>
                <h3 className="mt-5 font-display text-[20px] font-bold tracking-[-0.026em] text-bp-ink">
                  {m.title}
                </h3>
                <p className="mt-3 text-[15px] leading-[1.72] text-bp-mute">{m.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 grid gap-9 border border-bp-edge bg-white p-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14 lg:p-11">
            <div>
              <RuleLabel>The handbook</RuleLabel>
              <h3 className="mt-5 max-w-[18ch] font-display text-[26px] font-bold leading-[1.1] tracking-[-0.032em] text-bp-ink lg:text-[32px]">
                We are writing the reference text for this discipline.
              </h3>
            </div>
            <div>
              <p className="m-0 max-w-[58ch] text-[16px] leading-[1.72] text-bp-mute">
                Udhayaseelan, our founder, is writing <em>The Forward Deployed Engineer
                Handbook</em>: three volumes on taking enterprise AI from discovery to deployment,
                built around the same five-stage method we run every engagement on. The table of
                contents and sample chapters go public as they are written.
              </p>
              <p className="mt-4 max-w-[58ch] text-[14.5px] leading-[1.7] text-bp-faint">
                It is not published yet, and we will not announce a date we cannot hold. What
                matters to you is that the method in it is the method your engineers will be
                working alongside, and that our own engineers are trained on it.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 06 FIT */}
      <section data-reveal className="border-b border-bp-line bg-white">
        <div className={`${PAGE} py-20 lg:py-[110px]`}>
          <SectionHead
            no="06"
            total="06"
            eyebrow="Fit"
            title="Whether this is for you."
            sub="We would rather lose a deal at this paragraph than three months into one."
          />
          <div className="mt-11 grid gap-0 border-l border-t border-bp-edge lg:mt-16 lg:grid-cols-2">
            <div className="border-b border-r border-bp-edge bg-white p-7 lg:p-9">
              <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-[#0E9F6E]">
                This is for you if
              </div>
              <div className="mt-5">
                {forWho.yes.map((y) => (
                  <div key={y} className="flex items-start gap-3 border-b border-bp-hair py-3.5 last:border-b-0">
                    <span className="mt-1 flex h-[17px] w-[17px] shrink-0 items-center justify-center bg-[#0E9F6E]/10 text-[#0E9F6E]">
                      <Icon name="check" className="h-[11px] w-[11px]" />
                    </span>
                    <span className="text-[15px] leading-[1.65] text-bp-body">{y}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="border-b border-r border-bp-edge bg-bp-tint p-7 lg:p-9">
              <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-bp-faint">
                This is not for you if
              </div>
              <div className="mt-5">
                {forWho.no.map((n) => (
                  <div key={n} className="flex items-start gap-3 border-b border-bp-hair py-3.5 last:border-b-0">
                    <span className="mt-1 h-[17px] w-[17px] shrink-0 border border-bp-edge bg-white" aria-hidden="true" />
                    <span className="text-[15px] leading-[1.65] text-bp-mute">{n}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mx-auto mt-16 max-w-[1080px]">
            <BlueprintFaq items={faq} />
          </div>

          <div className="mt-12 border-t border-bp-edge pt-8">
            <RuleLabel>Related</RuleLabel>
            <div className="mt-5 flex flex-wrap gap-2.5">
              {[
                { label: "AI Consultation", href: "/in/ai/consultation" },
                { label: "AI Automation", href: "/in/ai/automation" },
                { label: "AI Agent Development", href: "/in/ai/agent-development" },
                { label: "Customised AI Applications", href: "/in/ai/custom-applications" },
              ].map((r) => (
                <Link
                  key={r.href}
                  href={r.href}
                  className="border border-[#D8E1EC] bg-white px-4 py-2.5 font-mono text-[12px] tracking-[0.06em] text-bp-mute transition-colors hover:border-brand-500 hover:bg-brand-500/[0.07] hover:text-bp-ink"
                >
                  {r.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CTASection
        title="Start with a discovery sprint."
        body="One to two weeks, fixed fee. We assess your data, the use case and what production would actually take, and you leave with a costed path. If the honest answer is that it is not worth building, we will tell you that instead, which is a cheap way to find out."
        primary={{ label: "Book a discovery sprint", href: "/in/strategy-session" }}
        secondary={{ label: "See our work", href: "/in/work" }}
      />
    </>
  );
}
