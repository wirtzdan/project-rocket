"use client";

import { Box } from "@chakra-ui/react";
import type { EmbedProps } from "./types";

export const Login = ({ children, popup, ...props }: EmbedProps) => {
  return (
    <Box
      {...(children ? { asChild: true } : {})}
      data-mode={popup ? "popup" : "embed"}
      data-o-auth="1"
      data-widget-mode="login"
      suppressHydrationWarning
      {...props}
    >
      {popup && children}
    </Box>
  );
};
