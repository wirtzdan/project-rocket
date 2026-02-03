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
import { Link } from "../ui/link";
import { Logo } from "./logo";

const Copyright = (props: TextProps) => {
  return (
    <Text fontSize="sm" color="fg.muted" {...props}>
      &copy; {new Date().getFullYear()} {projectConfig.general.name}. All rights
      reserved.
    </Text>
  );
};

// TODO: Map only which are available
const socialLinks = [
  { href: projectConfig.links.twitter, icon: <SiX /> },
  { href: projectConfig.links.github, icon: <SiGithub /> },
  { href: projectConfig.links.linkedin, icon: <SiLinkedin /> },
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
