"use client";

import { usePathname } from "next/navigation";
import { REGIONS, regionFromPath } from "@/lib/regions";

/**
 * The two sentences in the footer that describe the business, read from the
 * region config rather than hardcoded.
 *
 * Split out as its own client component for the same reason as FooterNav: the
 * rest of the footer has no reason to ship to the browser just because two
 * strings depend on which tree you are standing in.
 */
export default function FooterBlurb({
  field,
  className,
}: {
  field: "footerBlurb" | "newsletterBlurb";
  className?: string;
}) {
  const region = regionFromPath(usePathname() || "/");
  return <p className={className}>{REGIONS[region][field]}</p>;
}
