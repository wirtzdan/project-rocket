"use client";

import { Inter } from "next/font/google";
import Head from "next/head";
import Provider from "@/components/provider/provider";
import { projectConfig } from "@/config";
import { useChatVisibility } from "@/utils/use-chat-visibility";
import "vanilla-cookieconsent/dist/cookieconsent.css";
import "@/styles/cookie-banner-styles.css";
import "@/styles/outseta-styles.css";
import Script from "next/script";
import { useEffect } from "react";
import { run as runCookieConsent } from "vanilla-cookieconsent";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export default function AppLayout({ children }: { children: React.ReactNode }) {
  useChatVisibility();

  useEffect(() => {
    if (projectConfig.cookieBannerOptions) {
      runCookieConsent(projectConfig.cookieBannerOptions);
    } else {
      console.warn("Cookie banner options are not defined in projectConfig.");
    }
  }, []);

  return (
    <html className="cc--theme light" lang="en" suppressHydrationWarning>
      <Head>
        <title>{projectConfig.general.name}</title>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <noscript>
          <meta content="0; url=/javascript" httpEquiv="refresh" />
        </noscript>
      </Head>
      <body className={inter.className}>
        <Script
          // biome-ignore lint/security/noDangerouslySetInnerHtml: Safe - JSON.stringify escapes all user input and projectConfig.outsetaOptions is a controlled config object
          dangerouslySetInnerHTML={{
            __html: `var o_options = ${JSON.stringify(projectConfig.outsetaOptions)};`,
          }}
          id="outseta-config"
          strategy="beforeInteractive"
        />
        <Script
          data-options="o_options"
          id="outseta-script"
          onError={(e) => {
            console.error(
              "[Outseta] Failed to load Outseta script. Some features may not work.",
              e
            );
          }}
          onLoad={() => {
            console.log("[Outseta] Script loaded successfully");
            // Dispatch custom event for components waiting for Outseta
            if (typeof window !== "undefined") {
              window.dispatchEvent(new Event("outseta:loaded"));
            }
          }}
          src="https://cdn.outseta.com/outseta.min.js"
          strategy="beforeInteractive"
        />
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
