import { BRAND_ICONS } from "@/lib/brandIcons";

// Renders a brand logo as inline SVG from baked-in path data (no imports at runtime, no network).
export default function BrandLogo({
  slug,
  className = "h-7 w-7",
  color,
}: {
  slug: string;
  className?: string;
  color?: string;
}) {
  const ic = BRAND_ICONS[slug];
  if (!ic) return null;
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      className={className}
      fill={color ?? `#${ic.hex}`}
      aria-label={`${ic.title} logo`}
    >
      <path d={ic.path} />
    </svg>
  );
}
