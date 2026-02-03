"use client";

import {
  Center,
  CollapsibleContent,
  CollapsibleRoot,
  Container,
  HStack,
  VStack,
  StackProps,
  Box,
} from "@chakra-ui/react";
import { Logo } from "./logo";
import { Button } from "@chakra-ui/react";
import { CollapsibleTrigger } from "@/components/ui/collapsible-trigger";
import { UserMenu } from "../ui/user-menu";
import { Link } from "@/components/ui/link";
import { SignedIn, SignedOut } from "../auth/protect-content";
import { Login, SignUp } from "../auth/embed";
import {
  MenuContent,
  MenuItem,
  MenuItemGroup,
  MenuRoot,
  MenuSeparator,
  MenuTrigger,
} from "../ui/menu";

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
export const NavbarLinkMenu = (props: StackProps) => {
  return (
    <>
      <MenuLink href="/docs">Docs</MenuLink>
      <MenuRoot>
        <MenuTrigger asChild>
          <Button
            colorPalette="gray"
            width={{ base: "full", md: "auto" }}
            variant={{ base: "ghost", md: "plain" }}
            justifyContent={{ base: "flex-start", md: "center" }}
          >
            Demo
          </Button>
        </MenuTrigger>
        <MenuContent>
          <MenuItemGroup title="Pages">
            <Link href="/pricing">
              <MenuItem value="pricing">Pricing</MenuItem>
            </Link>
            <Link href="/contact">
              <MenuItem value="contact">Contact</MenuItem>
            </Link>
            <Link href="/support">
              <MenuItem value="contact">Contact</MenuItem>
            </Link>
          </MenuItemGroup>
          <MenuSeparator />
          <MenuItemGroup title="Utility">
            <Link href="/thank-you">
              <MenuItem value="thank-you">Thank you</MenuItem>
            </Link>
            <Link href="/not-found">
              <MenuItem value="not-found">Not found</MenuItem>
            </Link>
            <Link href="/javascript">
              <MenuItem value="javascript">Javascript</MenuItem>
            </Link>
            <Link href="/legal/terms-and-conditions">
              <MenuItem value="terms-and-conditions">
                Terms & Conditions
              </MenuItem>
            </Link>
          </MenuItemGroup>
          <MenuSeparator />
          <MenuItemGroup title="Auth">
            <Link href="/app/basic">
              <MenuItem value="basic">Protected Page (Basic plan)</MenuItem>
            </Link>
            <Link href="/app/pro">
              <MenuItem value="pro">Protected Page (Pro plan)</MenuItem>
            </Link>
          </MenuItemGroup>
          <MenuSeparator />
          <MenuItemGroup title="Embeds">
            <Link href="/embed/login">
              <MenuItem value="login">Login</MenuItem>
            </Link>
            <Link href="/embed/sign-up">
              <MenuItem value="login">Sign up</MenuItem>
            </Link>
            <Link href="/embed/lead-capture">
              <MenuItem value="lead-capture">Lead Capture</MenuItem>
            </Link>
            <Link href="/embed/email-list">
              <MenuItem value="email-list">Email List</MenuItem>
            </Link>
          </MenuItemGroup>
        </MenuContent>
      </MenuRoot>
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
        {type == "app" ? (
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
          <CollapsibleRoot>
            <HStack gap={{ base: "3", md: "8" }} justify="space-between">
              <CollapsibleTrigger />
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
            <CollapsibleContent hideFrom="md" mt={4}>
              <NavbarLinkMenu />
            </CollapsibleContent>
          </CollapsibleRoot>
        </Box>
      </Container>
    </Center>
  );
};
