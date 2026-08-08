"use client";

import { usePathname } from "next/navigation";
import { regionFromPath } from "@/lib/regions";
import { site } from "@/lib/site";

/**
 * Phone and WhatsApp in the footer, on the India tree only.
 *
 * The footer is where people look for a phone number when they have decided to
 * call and do not want to hunt for the contact page. It is India-only because
 * the number is an India number: putting it in front of a US buyer offers them
 * a call that lands in the wrong time zone.
 *
 * Both render only when set in lib/site.ts, so an unset number shows nothing
 * rather than a dead link.
 */
export default function FooterContact() {
  const region = regionFromPath(usePathname() || "/");
  if (region !== "in") return null;

  return (
    <>
      {site.phone && (
        <a
          href={`tel:${site.phone.replace(/[^\d+]/g, "")}`}
          className="inline-block py-1.5 transition-colors hover:text-white"
        >
          {site.phone}
        </a>
      )}
      {site.whatsapp && (
        <a
          href={`https://wa.me/${site.whatsapp}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block py-1.5 transition-colors hover:text-white"
        >
          WhatsApp
        </a>
      )}
    </>
  );
}
