"use client";

import { Box } from "@chakra-ui/react";
import type { EmbedProps } from "./types";

export const LogOut = ({ children, ...props }: EmbedProps) => {
  return (
    <Box
      {...(children ? { asChild: true } : {})}
      data-o-logout-link="1"
      suppressHydrationWarning
      {...props}
    >
      {children}
    </Box>
  );
};
