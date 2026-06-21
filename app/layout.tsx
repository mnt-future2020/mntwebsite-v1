import type { Metadata } from "next";
import "./globals.css";
import { SiteHeader, SiteFooter } from "@/components/SiteChrome";
import { site } from "@/lib/site";
import { getSiteSettings } from "@/lib/settings";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "MnT — Healthcare & E-Commerce Software Development",
    template: "%s | MnT",
  },
  description: site.description,
  keywords: [
    "healthcare software development company",
    "ecommerce development company",
    "custom healthcare software development",
    "telemedicine app development",
    "shopify development agency",
    "ABDM FHIR integration",
    "Magizh NexGen Technologies",
  ],
  openGraph: {
    type: "website",
    url: site.url,
    siteName: site.name,
    title: "MnT — Healthcare & E-Commerce Software Development",
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: "MnT — Healthcare & E-Commerce Software Development",
    description: site.description,
  },
  alternates: { canonical: site.url },
  robots: { index: true, follow: true },
};

const orgSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "MnT (Magizh NexGen Technologies)",
  legalName: site.legalName,
  url: site.url,
  logo: `${site.url}/mnt-logo.png`,
  email: site.email,
  description: site.description,
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
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
