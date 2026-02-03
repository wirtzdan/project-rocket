"use client";

import { Box, ChakraProvider } from "@chakra-ui/react";
import AuthProvider from "@/components/provider/auth-provider";
import { projectConfig } from "@/config";
import { system } from "@/theme/theme";
import { ColorModeProvider } from "./color-mode-provider";

export default function Provider(props: { children: React.ReactNode }) {
  return (
    <ChakraProvider value={system}>
      <ColorModeProvider
        {...(projectConfig.theme.colorMode !== "auto" && {
          forcedTheme: projectConfig.theme.colorMode,
        })}
      >
        <AuthProvider>
          <Box colorPalette="primary">{props.children}</Box>
        </AuthProvider>
      </ColorModeProvider>
    </ChakraProvider>
  );
}
