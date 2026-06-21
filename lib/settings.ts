import { cache } from "react";
import { prisma } from "@/lib/db";

export type SiteSettings = {
  siteName: string;
  titleTemplate: string;
  defaultDescription: string;
  defaultOgImage: string | null;
  gaMeasurementId: string | null;
  gscVerification: string | null;
  bingVerification: string | null;
  robotsExtra: string | null;
};

export const DEFAULT_SETTINGS: SiteSettings = {
  siteName: "MnT — Healthcare & E-Commerce Software Development",
  titleTemplate: "%s | MnT",
  defaultDescription:
    "We engineer compliant healthcare platforms and high-growth e-commerce stores. Two specialisms, one senior team. India + global.",
  defaultOgImage: null,
  gaMeasurementId: null,
  gscVerification: null,
  bingVerification: null,
  robotsExtra: null,
};

// Cached per request; degrades gracefully to defaults if the DB isn't reachable.
export const getSiteSettings = cache(async (): Promise<SiteSettings> => {
  try {
    const s = await prisma.siteSetting.findUnique({ where: { id: 1 } });
    return s ? { ...DEFAULT_SETTINGS, ...s } : DEFAULT_SETTINGS;
  } catch {
    return DEFAULT_SETTINGS;
  }
});

export async function getSeoOverride(path: string) {
  try {
    return await prisma.seoSetting.findUnique({ where: { path } });
  } catch {
    return null;
  }
}

// The marketing pages whose SEO can be overridden from the admin.
export const SITE_PATHS: { path: string; label: string }[] = [
  { path: "/", label: "Home" },
  { path: "/healthcare-software-development", label: "Healthcare hub" },
  { path: "/ecommerce-development", label: "E-Commerce hub" },
  { path: "/security-compliance", label: "Security & Compliance" },
  { path: "/about", label: "About" },
  { path: "/contact", label: "Contact" },
];
