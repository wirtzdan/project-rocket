"use client";

import { Box } from "@chakra-ui/react";
import type { EmbedProps } from "./types";

export const LeadCapture = ({ children, popup, uid, ...props }: EmbedProps) => {
  return (
    <Box
      {...(children ? { asChild: true } : {})}
      data-form-uid={uid}
      data-mode={popup ? "popup" : "embed"}
      data-o-lead-capture="1"
      suppressHydrationWarning
      {...props}
    >
      {popup && children}
    </Box>
  );
};
