import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
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

const outsetaOptionsScript = `var o_options = ${JSON.stringify(projectConfig.outsetaOptions)};`;

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
        <script
          // biome-ignore lint/security/noDangerouslySetInnerHtml: Safe - serialized from a controlled config object
          dangerouslySetInnerHTML={{ __html: outsetaOptionsScript }}
        />
        <script
          data-options="o_options"
          src="https://cdn.outseta.com/outseta.min.js"
        />
      </head>
      <body className={inter.className}>
        <noscript>
          <meta content="0; url=/javascript" httpEquiv="refresh" />
        </noscript>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
