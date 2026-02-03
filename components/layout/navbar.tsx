"use client";

import {
  Center,
  Collapsible,
  Container,
  HStack,
  Box,
  Menu,
  Portal,
  Button,
  IconButton,
  Icon,
  useCollapsibleContext,
} from "@chakra-ui/react";
import { PiList, PiX } from "react-icons/pi";
import { Logo } from "./logo";
import { UserMenu } from "../ui/user-menu";
import { Link } from "@/components/ui/link";
import { SignedIn, SignedOut } from "../auth/protect-content";
import { Login, SignUp } from "../auth/embed";

export const MenuLink = (props) => {
  return (
    <Link href={props.href} w="full">
      <Button
        colorPalette="gray"
        variant={{ base: "ghost", md: "plain" }}
        width={{ base: "full", md: "auto" }}
        justifyContent={{ base: "flex-start", md: "center" }}
      >
        {props.children}
      </Button>
    </Link>
  );
};

// TODO: Improve nav links
export const NavbarLinkMenu = () => {
  return (
    <>
      <MenuLink href="/docs">Docs</MenuLink>
      <Menu.Root>
        <Menu.Trigger asChild>
          <Button
            colorPalette="gray"
            width={{ base: "full", md: "auto" }}
            variant={{ base: "ghost", md: "plain" }}
            justifyContent={{ base: "flex-start", md: "center" }}
          >
            Demo
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
                  <Menu.Item value="contact">Contact</Menu.Item>
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
                  <Menu.Item value="basic">Protected Page (Basic plan)</Menu.Item>
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
                  <Menu.Item value="login">Sign up</Menu.Item>
                </Link>
                <Link href="/embed/lead-capture">
                  <Menu.Item value="lead-capture">Lead Capture</Menu.Item>
                </Link>
                <Link href="/embed/email-list">
                  <Menu.Item value="email-list">Email List</Menu.Item>
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
  return (
    <>
      <SignedOut>
        <Login popup>
          <Button size="sm" variant="outline" colorPalette="gray">
            Login
          </Button>
        </Login>
        <SignUp popup>
          <Button size="sm">Sign up</Button>
        </SignUp>
      </SignedOut>
      <SignedIn>
        {type === "app" ? (
          <UserMenu />
        ) : (
          <>
            <Button size="sm">Go to app</Button>
          </>
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
        variant="ghost"
        size="sm"
        colorPalette="gray"
        hideFrom="md"
      >
        <Icon size="lg">{context.open ? <PiX /> : <PiList />}</Icon>
      </IconButton>
    </Collapsible.Trigger>
  );
};

export const Navbar = ({ type }: { type: "website" | "app" }) => {
  console.log(type);
  return (
    <Center
      as="header"
      position="fixed"
      zIndex="docked"
      top={{ base: "4", md: "6" }}
      w="full"
    >
      <Container maxW={{ base: "full", md: "3xl" }}>
        <Box
          w="full"
          px="4"
          py="3"
          boxShadow="xs"
          background="bg.panel"
          borderRadius="l3"
        >
          <Collapsible.Root>
            <HStack gap={{ base: "3", md: "8" }} justify="space-between">
              <CollapsibleTriggerButton />
              <Link href="/">
                <Logo />
              </Link>
              <HStack justify="flex-end" w="full" hideFrom="md">
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
