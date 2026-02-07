"use client";

import { Box, ChakraProvider } from "@chakra-ui/react";
import { useEffect } from "react";
import { run as runCookieConsent } from "vanilla-cookieconsent";
import AuthProvider from "@/components/provider/auth-provider";
import { projectConfig } from "@/config";
import { system } from "@/theme/theme";
import { useChatVisibility } from "@/utils/use-chat-visibility";
import { ColorModeProvider } from "./color-mode-provider";
import { ConvexOutsetaProvider } from "./convex-provider";

export default function Provider(props: { children: React.ReactNode }) {
  const colorMode: string = projectConfig.theme.colorMode;

  useChatVisibility();

  useEffect(() => {
    if (projectConfig.cookieBannerOptions) {
      runCookieConsent(projectConfig.cookieBannerOptions);
    } else {
      console.warn("Cookie banner options are not defined in projectConfig.");
    }
  }, []);

  // Dispatch outseta:loaded when SDK becomes available
  useEffect(() => {
    const checkAndDispatch = () => {
      if (typeof window !== "undefined" && window.Outseta) {
        window.dispatchEvent(new Event("outseta:loaded"));
        return true;
      }
      return false;
    };

    if (checkAndDispatch()) {
      return;
    }

    // Poll briefly for Outseta to become available after script execution
    const interval = setInterval(() => {
      if (checkAndDispatch()) {
        clearInterval(interval);
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <ChakraProvider value={system}>
      <ColorModeProvider
        {...(colorMode !== "auto" && {
          forcedTheme: colorMode,
        })}
      >
        <AuthProvider>
          <ConvexOutsetaProvider>
            <Box colorPalette="primary">{props.children}</Box>
          </ConvexOutsetaProvider>
        </AuthProvider>
      </ColorModeProvider>
    </ChakraProvider>
  );
}
