"use client";

import {
  Box,
  Button,
  Center,
  Collapsible,
  Container,
  HStack,
  Icon,
  IconButton,
  Popover,
  Portal,
  SimpleGrid,
  SkeletonCircle,
  Text,
  useCollapsibleContext,
  VStack,
} from "@chakra-ui/react";
import posthog from "posthog-js";
import type { ReactNode } from "react";
import { PiList, PiX } from "react-icons/pi";
import { Link } from "@/components/ui/link";
import { projectConfig } from "@/config";
import { Logo } from "@/config/theme-config";
import { SignedIn, SignedOut } from "../auth/protect-content";
import { Login, SignUp } from "../embeds";
import { useAuth } from "../provider/auth-provider";
import { UserMenu } from "../ui/user-menu";

interface MenuLinkProps {
  href: string;
  children: ReactNode;
}

export const MenuLink = ({ href, children }: MenuLinkProps) => {
  return (
    <Link href={href} w="full">
      <Button
        colorPalette="gray"
        justifyContent={{ base: "flex-start", md: "center" }}
        variant={{ base: "ghost", md: "plain" }}
        width={{ base: "full", md: "auto" }}
      >
        {children}
      </Button>
    </Link>
  );
};

const DEMO_MENU_ITEMS = [
  {
    title: "Embeds",
    links: [
      { label: "Login", href: "/embed/login" },
      { label: "Sign Up", href: "/embed/sign-up" },
      { label: "Add-on", href: "/embed/add-on" },
      { label: "Lead Capture", href: "/embed/lead-capture" },
      { label: "Email List", href: "/embed/email-list" },
    ],
  },
  {
    title: "Utility",
    links: [
      { label: "Not found", href: "/not-found" },
      { label: "Javascript", href: "/javascript" },
      { label: "Thank you", href: "/thank-you" },
    ],
  },
  {
    title: "Gating",
    links: [
      { label: "Protected Page (Basic)", href: "/app/basic" },
      { label: "Protected Page (Pro)", href: "/app/pro" },
    ],
  },
  {
    title: "Marketing",
    links: [
      { label: "Pricing", href: "/pricing" },
      { label: "Contact", href: "/contact" },
      { label: "Support", href: "/support" },
      {
        label: "Knowledge Base",
        href: projectConfig.outsetaOptions.knowledgeBaseUrl,
      },
    ],
  },
];

export const NavbarLinkMenu = ({ type }: { type: "website" | "app" }) => {
  if (type === "app") {
    return <AppNavbarLinkMenu />;
  }

  return <WebsiteNavbarLinkMenu />;
};

const APP_DEMO_MENU_ITEMS = [{ label: "Add-on", href: "/embed/add-on" }];

const AppNavbarLinkMenu = () => {
  return (
    <>
      <MenuLink href="/app">Tasks</MenuLink>

      {/* Desktop: Popover menu */}
      <Box hideBelow="md">
        <Popover.Root positioning={{ placement: "bottom" }}>
          <Popover.Trigger asChild>
            <Button colorPalette="gray" variant="plain" width="auto">
              Demos
            </Button>
          </Popover.Trigger>
          <Portal>
            <Popover.Positioner>
              <Popover.Content w="auto">
                <Popover.Body p="4">
                  <VStack align="start" gap="1">
                    {APP_DEMO_MENU_ITEMS.map((link) => (
                      <Link href={link.href} key={link.href} w="full">
                        <Button
                          colorPalette="gray"
                          fontWeight="normal"
                          justifyContent="flex-start"
                          size="sm"
                          variant="ghost"
                          w="full"
                        >
                          {link.label}
                        </Button>
                      </Link>
                    ))}
                  </VStack>
                </Popover.Body>
              </Popover.Content>
            </Popover.Positioner>
          </Portal>
        </Popover.Root>
      </Box>

      {/* Mobile: Flat list */}
      <Box hideFrom="md">
        {APP_DEMO_MENU_ITEMS.map((link) => (
          <Link href={link.href} key={link.href} w="full">
            <Button
              colorPalette="gray"
              justifyContent="flex-start"
              variant="ghost"
              width="full"
            >
              {link.label}
            </Button>
          </Link>
        ))}
      </Box>
    </>
  );
};

const WebsiteNavbarLinkMenu = () => {
  const handleDocsClick = () => {
    posthog.capture("docs_link_clicked", {
      source: "navbar",
    });
  };

  return (
    <>
      <Link href="/docs" onClick={handleDocsClick} w="full">
        <Button
          colorPalette="gray"
          justifyContent={{ base: "flex-start", md: "center" }}
          variant={{ base: "ghost", md: "plain" }}
          width={{ base: "full", md: "auto" }}
        >
          Docs
        </Button>
      </Link>

      {/* Desktop: Popover mega menu */}
      <Box hideBelow="md">
        <Popover.Root positioning={{ placement: "bottom" }}>
          <Popover.Trigger asChild>
            <Button colorPalette="gray" variant="plain" width="auto">
              Demos
            </Button>
          </Popover.Trigger>
          <Portal>
            <Popover.Positioner>
              <Popover.Content w="auto">
                <Popover.Body p="4">
                  <SimpleGrid columns={4} gap="4">
                    {DEMO_MENU_ITEMS.map((group) => (
                      <VStack align="start" gap="1" key={group.title}>
                        <Text
                          color="fg.muted"
                          fontSize="xs"
                          fontWeight="semibold"
                          pb="1"
                          px="2"
                        >
                          {group.title}
                        </Text>
                        {group.links.map((link) => (
                          <Link href={link.href} key={link.href} w="full">
                            <Button
                              colorPalette="gray"
                              fontWeight="normal"
                              justifyContent="flex-start"
                              size="sm"
                              variant="ghost"
                              w="full"
                            >
                              {link.label}
                            </Button>
                          </Link>
                        ))}
                      </VStack>
                    ))}
                  </SimpleGrid>
                </Popover.Body>
              </Popover.Content>
            </Popover.Positioner>
          </Portal>
        </Popover.Root>
      </Box>

      {/* Mobile: Flat list of links */}
      <Box hideFrom="md">
        {DEMO_MENU_ITEMS.map((group) => (
          <Box key={group.title}>
            <Text
              color="fg.muted"
              fontSize="xs"
              fontWeight="semibold"
              pb="1"
              pt="3"
              px="4"
            >
              {group.title}
            </Text>
            {group.links.map((link) => (
              <Link href={link.href} key={link.href} w="full">
                <Button
                  colorPalette="gray"
                  justifyContent="flex-start"
                  variant="ghost"
                  width="full"
                >
                  {link.label}
                </Button>
              </Link>
            ))}
          </Box>
        ))}
      </Box>
    </>
  );
};

export const NavbarActionMenu = ({ type }: { type: "website" | "app" }) => {
  const { isLoading } = useAuth();

  const handleLoginClick = () => {
    posthog.capture("login_popup_opened", {
      source: "navbar",
    });
  };

  const handleSignupClick = () => {
    posthog.capture("signup_popup_opened", {
      source: "navbar",
    });
  };

  if (isLoading) {
    return <SkeletonCircle size="9" />;
  }

  return (
    <>
      <SignedOut>
        <Login popup>
          <Button
            colorPalette="gray"
            onClick={handleLoginClick}
            size="sm"
            variant="outline"
          >
            Login
          </Button>
        </Login>
        <SignUp popup>
          <Button onClick={handleSignupClick} size="sm">
            Sign up
          </Button>
        </SignUp>
      </SignedOut>
      <SignedIn>
        {type === "app" ? (
          <UserMenu />
        ) : (
          <Link href="/app">
            <Button size="sm">Go to app</Button>
          </Link>
        )}
      </SignedIn>
    </>
  );
};

const CollapsibleTriggerButton = () => {
  const context = useCollapsibleContext();
  return (
    <Collapsible.Trigger asChild>
      <IconButton
        aria-label="Open Menu"
        colorPalette="gray"
        hideFrom="md"
        size="sm"
        variant="ghost"
      >
        <Icon size="lg">{context.open ? <PiX /> : <PiList />}</Icon>
      </IconButton>
    </Collapsible.Trigger>
  );
};

export const Navbar = ({ type }: { type: "website" | "app" }) => {
  return (
    <Center
      as="header"
      position="fixed"
      top={{ base: "4", md: "6" }}
      w="full"
      zIndex="docked"
    >
      <Container maxW={{ base: "full", md: "3xl" }}>
        <Box
          background="bg.panel"
          borderRadius="l3"
          boxShadow="xs"
          px="4"
          py="3"
          w="full"
        >
          <Collapsible.Root>
            <HStack gap={{ base: "3", md: "8" }} justify="space-between">
              <CollapsibleTriggerButton />
              <Link href="/">
                <Logo />
              </Link>
              <HStack hideFrom="md" justify="flex-end" w="full">
                <NavbarActionMenu type={type} />
              </HStack>
              <HStack gap="2" hideBelow="md">
                <NavbarLinkMenu type={type} />
                <NavbarActionMenu type={type} />
              </HStack>
            </HStack>
            <Collapsible.Content hideFrom="md" mt={4}>
              <NavbarLinkMenu type={type} />
            </Collapsible.Content>
          </Collapsible.Root>
        </Box>
      </Container>
    </Center>
  );
};
