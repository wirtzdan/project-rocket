import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { ClientBootstrap } from "@/components/client-bootstrap";
import Provider from "@/components/provider/provider";
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
      <body className={inter.className}>
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
