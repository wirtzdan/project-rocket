import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { ClientBootstrap } from "@/components/client-bootstrap";
import Provider from "@/components/provider/provider";
import { OrganizationJsonLd } from "@/components/seo/json-ld";
import { projectConfig } from "@/config";
import { generateMetadata as createMetadata } from "@/utils/metadata";
import "vanilla-cookieconsent/dist/cookieconsent.css";
import "@/styles/cookie-banner-styles.css";
import "@/styles/outseta-styles.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = createMetadata({});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#09090b" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      className="cc--theme light"
      lang={projectConfig.general.language}
      suppressHydrationWarning
    >
      <head>
        <link rel="preconnect" href="https://cdn.outseta.com" />
      </head>
      <body className={inter.className}>
        <OrganizationJsonLd />
        <noscript>
          <meta content="0; url=/javascript" httpEquiv="refresh" />
        </noscript>
        <Provider>
          <ClientBootstrap />
          {children}
        </Provider>
      </body>
    </html>
  );
}
