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
  Menu,
  Portal,
  useCollapsibleContext,
} from "@chakra-ui/react";
import posthog from "posthog-js";
import type { ReactNode } from "react";
import { PiList, PiX } from "react-icons/pi";
import { Link } from "@/components/ui/link";
import { Logo } from "@/config/theme-config";
import { Login, SignUp } from "../auth/embed";
import { SignedIn, SignedOut } from "../auth/protect-content";
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

export const NavbarLinkMenu = () => {
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
      <Menu.Root>
        <Menu.Trigger asChild>
          <Button
            colorPalette="gray"
            justifyContent={{ base: "flex-start", md: "center" }}
            variant={{ base: "ghost", md: "plain" }}
            width={{ base: "full", md: "auto" }}
          >
            Demos
          </Button>
        </Menu.Trigger>
        <Portal>
          <Menu.Positioner>
            <Menu.Content>
              <Menu.ItemGroup title="Pages">
                <Link href="/pricing">
                  <Menu.Item value="pricing">Pricing</Menu.Item>
                </Link>
                <Link href="/contact">
                  <Menu.Item value="contact">Contact</Menu.Item>
                </Link>
                <Link href="/support">
                  <Menu.Item value="support">Support</Menu.Item>
                </Link>
              </Menu.ItemGroup>
              <Menu.Separator />
              <Menu.ItemGroup title="Utility">
                <Link href="/thank-you">
                  <Menu.Item value="thank-you">Thank you</Menu.Item>
                </Link>
                <Link href="/not-found">
                  <Menu.Item value="not-found">Not found</Menu.Item>
                </Link>
                <Link href="/javascript">
                  <Menu.Item value="javascript">Javascript</Menu.Item>
                </Link>
                <Link href="/legal/terms-and-conditions">
                  <Menu.Item value="terms-and-conditions">
                    Terms & Conditions
                  </Menu.Item>
                </Link>
              </Menu.ItemGroup>
              <Menu.Separator />
              <Menu.ItemGroup title="Auth">
                <Link href="/app/basic">
                  <Menu.Item value="basic">
                    Protected Page (Basic plan)
                  </Menu.Item>
                </Link>
                <Link href="/app/pro">
                  <Menu.Item value="pro">Protected Page (Pro plan)</Menu.Item>
                </Link>
              </Menu.ItemGroup>
              <Menu.Separator />
              <Menu.ItemGroup title="Embeds">
                <Link href="/embed/login">
                  <Menu.Item value="login">Login</Menu.Item>
                </Link>
                <Link href="/embed/sign-up">
                  <Menu.Item value="sign-up">Sign up</Menu.Item>
                </Link>
                <Link href="/embed/lead-capture">
                  <Menu.Item value="lead-capture">Lead Capture</Menu.Item>
                </Link>
                <Link href="/embed/email-list">
                  <Menu.Item value="email-list">Email List</Menu.Item>
                </Link>
                <Link href="/embed/add-on">
                  <Menu.Item value="add-on">Add-on</Menu.Item>
                </Link>
              </Menu.ItemGroup>
            </Menu.Content>
          </Menu.Positioner>
        </Portal>
      </Menu.Root>
    </>
  );
};

export const NavbarActionMenu = ({ type }: { type: "website" | "app" }) => {
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
        {type === "app" ? <UserMenu /> : <Button size="sm">Go to app</Button>}
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

export const Navbar = ({ type: _type }: { type: "website" | "app" }) => {
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
                <NavbarActionMenu type="app" />
              </HStack>
              <HStack gap="2" hideBelow="md">
                <NavbarLinkMenu />
                <NavbarActionMenu type="app" />
              </HStack>
            </HStack>
            <Collapsible.Content hideFrom="md" mt={4}>
              <NavbarLinkMenu />
            </Collapsible.Content>
          </Collapsible.Root>
        </Box>
      </Container>
    </Center>
  );
};
