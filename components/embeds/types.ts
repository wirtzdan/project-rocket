import type { BoxProps } from "@chakra-ui/react";

export interface EmbedProps extends BoxProps {
  children?: React.ReactNode;
  popup?: boolean;
  uid?: string;
}
