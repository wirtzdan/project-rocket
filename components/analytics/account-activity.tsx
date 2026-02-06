"use client";

import { Box } from "@chakra-ui/react";
import type { EmbedProps } from "./types";

export interface AccountActivityProps extends EmbedProps {
  name: string;
}

/**
 * Tracks account-level activity in the Outseta CRM timeline.
 * Activities appear on both the account record and the CRM > Engagement dashboard.
 *
 * @example
 * <AccountActivity name="Viewed Dashboard">
 *   <Button>Dashboard</Button>
 * </AccountActivity>
 *
 * @example
 * // Or use the data attribute directly on any element:
 * <Button data-o-account-activity="Clicked Export">Export</Button>
 */
export const AccountActivity = ({
  children,
  name,
  ...props
}: AccountActivityProps) => {
  return (
    <Box
      {...(children ? { asChild: true } : {})}
      data-o-account-activity={name}
      {...props}
    >
      {children}
    </Box>
  );
};
