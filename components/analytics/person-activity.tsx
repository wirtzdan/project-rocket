"use client";

import { Box } from "@chakra-ui/react";
import type { EmbedProps } from "./types";

export interface PersonActivityProps extends EmbedProps {
  name: string;
}

/**
 * Tracks person-level activity in the Outseta CRM timeline.
 * Activities appear on the person's record and can trigger email drip campaigns.
 *
 * @example
 * <PersonActivity name="Downloaded Ebook">
 *   <Button>Download</Button>
 * </PersonActivity>
 *
 * @example
 * // Or use the data attribute directly on any element:
 * <Button data-o-person-activity="Completed Onboarding">Done</Button>
 */
export const PersonActivity = ({
  children,
  name,
  ...props
}: PersonActivityProps) => {
  return (
    <Box
      {...(children ? { asChild: true } : {})}
      data-o-person-activity={name}
      {...props}
    >
      {children}
    </Box>
  );
};
