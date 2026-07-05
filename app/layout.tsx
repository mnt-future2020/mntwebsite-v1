import type { Metadata, Viewport } from "next";
import "./globals.css";
import { SiteHeader, SiteFooter } from "@/components/SiteChrome";
import PWARegister from "@/components/PWARegister";
import { site } from "@/lib/site";
import { getSiteSettings } from "@/lib/settings";

// PWA: status-bar tint + viewport.
export const viewport: Viewport = {
  themeColor: "#2095F1",
  width: "device-width",
  initialScale: 1,
};

// Driven by the admin Settings (siteName / titleTemplate / defaultDescription /
// defaultOgImage), falling back to DEFAULT_SETTINGS when the DB is unset/down.
export async function generateMetadata(): Promise<Metadata> {
  const s = await getSiteSettings();
  return {
    metadataBase: new URL(site.url),
    title: { default: s.siteName, template: s.titleTemplate },
    description: s.defaultDescription,
    keywords: [
      "AI commerce platform development",
      "agent-ready commerce",
      "agentic commerce ACP",
      "headless commerce development",
      "ecommerce development company",
      "US D2C commerce agency",
      "Magizh NexGen Technologies",
    ],
    openGraph: {
      type: "website",
      url: site.url,
      siteName: site.name,
      title: s.siteName,
      description: s.defaultDescription,
      ...(s.defaultOgImage ? { images: [{ url: s.defaultOgImage }] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: s.siteName,
      description: s.defaultDescription,
      ...(s.defaultOgImage ? { images: [s.defaultOgImage] } : {}),
    },
    alternates: { canonical: site.url },
    robots: { index: true, follow: true },
    applicationName: "MnT Workspace",
    appleWebApp: { capable: true, statusBarStyle: "default", title: "MnT" },
  };
}

const orgSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "MnT (Magizh NexGen Technologies)",
  legalName: site.legalName,
  url: site.url,
  logo: `${site.url}/mnt-logo.png`,
  email: site.email,
  description: site.description,
  knowsAbout: [
    "Agentic commerce",
    "Agent-Ready Commerce",
    "Agentic Commerce Protocol (ACP)",
    "Model Context Protocol (MCP)",
    "Headless commerce",
    "Answer Engine Optimization (AEO)",
    "PCI DSS",
    "ADA/WCAG accessibility",
  ],
  areaServed: { "@type": "Country", name: "United States" },
  contactPoint: {
    "@type": "ContactPoint",
    email: site.email,
    contactType: "sales",
  },
  sameAs: [site.social.instagram, site.social.linkedin, site.social.facebook],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "MnT — Magizh NexGen Technologies",
  url: site.url,
  publisher: { "@type": "Organization", name: "MnT (Magizh NexGen Technologies)" },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getSiteSettings();
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Sora:wght@600;700;800&display=swap"
          rel="stylesheet"
        />
        {settings.gscVerification && (
          <meta name="google-site-verification" content={settings.gscVerification} />
        )}
        {settings.bingVerification && (
          <meta name="msvalidate.01" content={settings.bingVerification} />
        )}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        {settings.gaMeasurementId && (
          <>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${settings.gaMeasurementId}`} />
            <script
              dangerouslySetInnerHTML={{
                __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${settings.gaMeasurementId}');`,
              }}
            />
          </>
        )}
      </head>
      <body>
        <PWARegister />
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
