import Icon, { type IconName } from "./Icon";
import Marquee from "./Marquee";
import BrandLogo from "./BrandLogo";

// Tech stack (real brand logos via Simple Icons CDN) + compliance standards (icon glyphs).
type StackItem = { name: string; slug?: string; color?: string; icon?: IconName };

const stack: StackItem[] = [
  { name: "Next.js", slug: "nextdotjs", color: "0A1B33" },
  { name: "React", slug: "react", color: "149ECA" },
  { name: "TypeScript", slug: "typescript", color: "3178C6" },
  { name: "Node.js", slug: "nodedotjs", color: "5FA04E" },
  { name: "FastAPI", slug: "fastapi", color: "009688" },
  { name: "PostgreSQL", slug: "postgresql", color: "4169E1" },
  { name: "AWS", icon: "cloud" },
  { name: "Flutter", slug: "flutter", color: "02569B" },
  { name: "Shopify", slug: "shopify", color: "5A8E3B" },
  { name: "Stripe", slug: "stripe", color: "635BFF" },
  { name: "Razorpay", slug: "razorpay", color: "0C2451" },
  { name: "Tailwind CSS", slug: "tailwindcss", color: "06B6D4" },
  { name: "HIPAA", icon: "shield" },
  { name: "ABDM", icon: "network" },
  { name: "FHIR", icon: "network" },
  { name: "ISO 27001", icon: "lock" },
  { name: "SOC 2", icon: "records" },
  { name: "GDPR", icon: "globe" },
];

export default function StackMarquee({
  className = "",
  duration = "60s",
}: {
  className?: string;
  duration?: string;
}) {
  return (
    <div className={className}>
      <Marquee duration={duration} gap="1.25rem">
        {stack.map((item) => (
          <span
            key={item.name}
            className="inline-flex items-center gap-3 rounded-full border border-slate-200 bg-white px-7 py-4 text-base font-semibold text-ink"
          >
            {item.slug ? (
              <BrandLogo
                slug={item.slug}
                color={item.color ? `#${item.color}` : undefined}
                className="h-7 w-7 shrink-0"
              />
            ) : (
              <Icon name={item.icon as IconName} className="h-7 w-7 shrink-0 text-brand" />
            )}
            {item.name}
          </span>
        ))}
      </Marquee>
    </div>
  );
}
