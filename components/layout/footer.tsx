import {
  Container,
  HStack,
  Icon,
  Stack,
  Text,
  type TextProps,
} from "@chakra-ui/react";
import { SiGithub, SiLinkedin, SiX } from "react-icons/si";
import { projectConfig } from "@/config";
import { Logo } from "@/config/theme-config";
import { Link } from "../ui/link";

const Copyright = (props: TextProps) => {
  return (
    <Text color="fg.muted" fontSize="sm" {...props}>
      &copy; {new Date().getFullYear()} {projectConfig.general.name}. All rights
      reserved.
    </Text>
  );
};

const socialLinks = [
  {
    href: projectConfig.links.twitter,
    icon: <SiX aria-hidden="true" />,
    label: "X (Twitter)",
  },
  {
    href: projectConfig.links.github,
    icon: <SiGithub aria-hidden="true" />,
    label: "GitHub",
  },
  {
    href: projectConfig.links.linkedin,
    icon: <SiLinkedin aria-hidden="true" />,
    label: "LinkedIn",
  },
].filter((link) => link.href);

export const Footer = () => (
  <Container as="footer" py={{ base: "10", md: "12" }}>
    <Stack gap="6">
      <Stack align="center" direction="row" justify="space-between">
        <Logo height="32" />
        <HStack gap="4">
          {socialLinks.map(({ href, icon, label }) => (
            <Link aria-label={label} colorPalette="gray" href={href} key={href}>
              <Icon size="md">{icon}</Icon>
            </Link>
          ))}
        </HStack>
      </Stack>
      <Copyright />
    </Stack>
  </Container>
);
