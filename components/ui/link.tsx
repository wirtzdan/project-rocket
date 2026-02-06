import {
  Link as ChakraLink,
  type LinkProps as ChakraLinkProps,
} from "@chakra-ui/react";
import NextLink, { type LinkProps as NextLinkProps } from "next/link";
import {
  PiArrowSquareOut,
  PiDownloadSimple,
  PiEnvelopeSimple,
  PiHeadset,
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
          <PiArrowSquareOut aria-hidden="true" />
        </NextLink>
      </ChakraLink>
    );
  }

  if (email) {
    return (
      <ChakraLink asChild {...props}>
        <NextLink href={href}>
          {props.children}
          <PiEnvelopeSimple aria-hidden="true" />
        </NextLink>
      </ChakraLink>
    );
  }

  if (support) {
    return (
      <ChakraLink asChild {...props}>
        <NextLink href={href}>
          {props.children}
          <PiHeadset aria-hidden="true" />
        </NextLink>
      </ChakraLink>
    );
  }

  if (download) {
    return (
      <ChakraLink asChild {...props}>
        <NextLink href={href}>
          {props.children}
          <PiDownloadSimple aria-hidden="true" />
        </NextLink>
      </ChakraLink>
    );
  }

  return (
    <ChakraLink
      asChild
      {...props}
      _focusVisible={{
        outline: "2px solid",
        outlineColor: "colorPalette.solid",
        outlineOffset: "2px",
        borderRadius: "l1",
      }}
      _hover={{ textDecoration: "none" }}
      textDecoration="none"
    >
      <NextLink href={href}>{props.children}</NextLink>
    </ChakraLink>
  );
};
