import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Sora, Source_Sans_3, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { SiteHeader, SiteFooter } from "@/components/SiteChrome";
import PWARegister from "@/components/PWARegister";
import ScrollReset from "@/components/ScrollReset";
import { site } from "@/lib/site";
import { getSiteSettings } from "@/lib/settings";

// Self-hosted via next/font: no render-blocking Google Fonts request, no FOUT.
const sora = Sora({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-sora",
  display: "swap",
});
const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-source-sans",
  display: "swap",
});
// Blueprint labels, eyebrows and buttons.
const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-plex-mono",
  display: "swap",
});

// PWA: status-bar tint + viewport.
export const viewport: Viewport = {
  themeColor: "#2095F1",
  width: "device-width",
  initialScale: 1,
  // The design is light-only. "only light" is the documented opt-out from
  // Chrome Android's Auto Dark Theme, which otherwise force-inverts the site
  // when the phone is in dark mode.
  colorScheme: "only light",
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
      "e-commerce development",
      "e-commerce platform development",
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
    applicationName: "MnT Future Workspace",
    appleWebApp: { capable: true, statusBarStyle: "default", title: "MnT Future" },
  };
}

const orgSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  // schema.org has a dedicated `legalName`: the entity belongs there, not
  // bracketed into the brand name.
  name: site.name,
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
  founder: {
    "@type": "Person",
    name: "Udhayaseelan Renganathan",
    jobTitle: "Founder & CEO",
    email: "udhay@mntfuture.com",
    sameAs: "https://www.linkedin.com/in/udhayaseelan-renganathan/",
  },
  employee: [
    {
      "@type": "Person",
      name: "Syed Asrar Ahmed",
      jobTitle: "Chief Tech Consultant",
      email: "syed@mntfuture.com",
      sameAs: "https://www.linkedin.com/in/syed-asrar-ahmed-advisor/",
    },
  ],
  memberOf: [
    { "@type": "Organization", name: "AWS Partner Network" },
    { "@type": "Organization", name: "Google Cloud Partner Advantage" },
    { "@type": "Organization", name: "Shopify Partners" },
    { "@type": "Organization", name: "Claude Partner Network" },
    { "@type": "Organization", name: "NVIDIA Developer Program" },
  ],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: site.name,
  url: site.url,
  publisher: { "@type": "Organization", name: site.name, legalName: site.legalName },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getSiteSettings();
  return (
    // data-scroll-behavior: Next 16 only suppresses CSS smooth-scroll during
    // its route-change scroll resets when this attribute is present: without
    // it, navigations fail to land at the top of the new page.
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${sora.variable} ${sourceSans.variable} ${plexMono.variable}`}
    >
      <head>
        {/* Raw tag, not metadata alternates.types: pages that return their own
            `alternates` (via resolveMetadata) would override the layout's. */}
        <link
          rel="alternate"
          type="application/rss+xml"
          title="MnT Future: Blog"
          href="/feed.xml"
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
      </head>
      <body>
        <ScrollReset />
        <PWARegister />
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
        {/* next/script, not raw <script>: React never executes raw inline
            scripts on client renders, and Script also survives client-side
            navigations. */}
        {settings.gaMeasurementId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${settings.gaMeasurementId}`}
              strategy="afterInteractive"
            />
            <Script
              id="gtag-init"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${settings.gaMeasurementId}');`,
              }}
            />
          </>
        )}
      </body>
    </html>
  );
}
