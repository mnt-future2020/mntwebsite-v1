import Marquee from "./Marquee";

// Tech stack + compliance standards: v3 text pills.
const stack = [
  "Next.js",
  "React",
  "TypeScript",
  "Node.js",
  "FastAPI",
  "PostgreSQL",
  "AWS",
  "Flutter",
  "Shopify",
  "Stripe",
  "PayPal",
  "OpenAI",
  "Tailwind CSS",
  "ADA / WCAG",
  "PCI DSS",
  "SOC 2-aligned",
  "ACP",
  "MCP",
  "AEO",
];

export default function StackMarquee({
  className = "",
  duration = "55s",
}: {
  className?: string;
  duration?: string;
}) {
  return (
    <div className={className}>
      <Marquee duration={duration} gap="0.875rem">
        {stack.map((name) => (
          <span
            key={name}
            className="inline-flex items-center whitespace-nowrap rounded-full border border-slate-200 bg-slate-50 px-[22px] py-[11px] text-[14.5px] font-semibold text-slate-700"
          >
            {name}
          </span>
        ))}
      </Marquee>
    </div>
  );
}
