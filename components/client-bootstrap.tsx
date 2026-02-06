"use client";

import Script from "next/script";
import { useEffect } from "react";
import { run as runCookieConsent } from "vanilla-cookieconsent";
import { projectConfig } from "@/config";
import { useChatVisibility } from "@/utils/use-chat-visibility";

export function ClientBootstrap() {
  useChatVisibility();

  useEffect(() => {
    if (projectConfig.cookieBannerOptions) {
      runCookieConsent(projectConfig.cookieBannerOptions);
    } else {
      console.warn("Cookie banner options are not defined in projectConfig.");
    }
  }, []);

  return (
    <>
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
          if (typeof window !== "undefined") {
            window.dispatchEvent(new Event("outseta:loaded"));
          }
        }}
        src="https://cdn.outseta.com/outseta.min.js"
        strategy="beforeInteractive"
      />
    </>
  );
}
