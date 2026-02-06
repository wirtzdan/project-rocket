"use client";

import { Box } from "@chakra-ui/react";
import type { EmbedProps } from "./types";

export const Support = ({ children, popup, ...props }: EmbedProps) => {
  return (
    <Box
      {...(children ? { asChild: true } : {})}
      data-mode={popup ? "popup" : "embed"}
      data-o-support="1"
      suppressHydrationWarning
      {...props}
    >
      {popup ? children : null}
    </Box>
  );
};
