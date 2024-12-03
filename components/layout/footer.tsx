import {
  Container,
  HStack,
  Icon,
  Link,
  Stack,
  Text,
  type TextProps,
} from "@chakra-ui/react";
import { SiGithub, SiLinkedin, SiX } from "react-icons/si";
import { Logo } from "./logo";
import { siteConfig } from "@/config/site";

const Copyright = (props: TextProps) => {
  return (
    <Text fontSize="sm" color="fg.muted" {...props}>
      &copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
    </Text>
  );
};

const socialLinks = [
  { href: siteConfig.links.twitter, icon: <SiX /> },
  { href: siteConfig.links.github, icon: <SiGithub /> },
  { href: siteConfig.links.linkedin, icon: <SiLinkedin /> },
];

export const Footer = () => (
  <Container as="footer" py={{ base: "10", md: "12" }}>
    <Stack gap="6">
      <Stack direction="row" justify="space-between" align="center">
        <Logo height="32" />
        <HStack gap="4">
          {socialLinks.map(({ href, icon }, index) => (
            <Link key={index} href={href} colorPalette="gray">
              <Icon size="md">{icon}</Icon>
            </Link>
          ))}
        </HStack>
      </Stack>
      <Copyright />
    </Stack>
  </Container>
);