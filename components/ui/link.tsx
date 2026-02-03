import NextLink from "next/link";
import {
  Link as ChakraLink,
  type LinkProps as ChakraLinkProps,
} from "@chakra-ui/react";
import { type LinkProps as NextLinkProps } from "next/link";
import {
  PiArrowSquareOut,
  PiHeadset,
  PiDownloadSimple,
  PiEnvelopeSimple,
} from "react-icons/pi";

export type LinkProps = Omit<ChakraLinkProps, "asChild"> & {
  href: NextLinkProps["href"];
  text?: boolean;
  textExternal?: boolean;
  support?: boolean;
  download?: boolean;
  email?: boolean;
};

export const Link = ({
  href,
  text,
  textExternal,
  support,
  download,
  email,
  ...props
}: LinkProps) => {
  if (text) {
    return (
      <ChakraLink asChild {...props}>
        <NextLink href={href}>{props.children}</NextLink>
      </ChakraLink>
    );
  }

  if (textExternal) {
    return (
      <ChakraLink asChild {...props}>
        <NextLink href={href}>
          {props.children}
          <PiArrowSquareOut />
        </NextLink>
      </ChakraLink>
    );
  }

  if (email) {
    return (
      <ChakraLink asChild {...props}>
        <NextLink href={href}>
          {props.children}
          <PiEnvelopeSimple />
        </NextLink>
      </ChakraLink>
    );
  }

  if (support) {
    return (
      <ChakraLink asChild {...props}>
        <NextLink href={href}>
          {props.children}
          <PiHeadset />
        </NextLink>
      </ChakraLink>
    );
  }

  if (download) {
    return (
      <ChakraLink asChild {...props}>
        <NextLink href={href}>
          {props.children}
          <PiDownloadSimple />
        </NextLink>
      </ChakraLink>
    );
  }

  return (
    <ChakraLink asChild {...props}>
      <NextLink href={href}>{props.children}</NextLink>
    </ChakraLink>
  );
};
