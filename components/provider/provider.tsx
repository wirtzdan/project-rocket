"use client";

import { Box, ChakraProvider } from "@chakra-ui/react";
import AuthProvider from "@/components/provider/auth-provider";
import { projectConfig } from "@/config";
import { system } from "@/theme/theme";
import { ColorModeProvider } from "./color-mode-provider";
import { ConvexOutsetaProvider } from "./convex-provider";

export default function Provider(props: { children: React.ReactNode }) {
  const colorMode: string = projectConfig.theme.colorMode;

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
