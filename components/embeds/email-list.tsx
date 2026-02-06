"use client";

import { Box } from "@chakra-ui/react";
import type { EmbedProps } from "./types";

export const EmailList = ({ children, popup, uid, ...props }: EmbedProps) => {
  return (
    <Box
      {...(children ? { asChild: true } : {})}
      data-email-list-uid={uid}
      data-mode={popup ? "popup" : "embed"}
      data-o-email-list="1"
      suppressHydrationWarning
      {...props}
    >
      {popup ? children : null}
    </Box>
  );
};
