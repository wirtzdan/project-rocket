"use client";

import {
  Avatar,
  HStack,
  Menu,
  Portal,
  Tag,
  Text,
  VStack,
} from "@chakra-ui/react";
import posthog from "posthog-js";
import { PiQuestion, PiSignOut, PiStar, PiUser } from "react-icons/pi";
import { LogOut, Profile, Support } from "../auth/embed";
import { SignedIn } from "../auth/protect-content";
import { useAuth } from "../provider/auth-provider";

function getInitials(name: string | undefined): string {
  if (!name) {
    return "";
  }
  const names = name.trim().split(" ");
  const firstName = names[0] ?? "";
  const lastName = names.length > 1 ? names.at(-1) : "";
  return firstName && lastName
    ? `${firstName.charAt(0)}${lastName.charAt(0)}`
    : firstName.charAt(0);
}

export const UserMenu = () => {
  const { user } = useAuth();

  const handleMenuAction = (action: string) => {
    posthog.capture("user_menu_action", {
      action,
      source: "user_menu",
    });
  };

  return (
    <Menu.Root positioning={{ placement: "bottom" }}>
      <Menu.Trigger>
        <Avatar.Root size="sm">
          <Avatar.Image src={user?.ProfileImageS3Url ?? undefined} />
          <Avatar.Fallback>{getInitials(user?.FullName)}</Avatar.Fallback>
        </Avatar.Root>
      </Menu.Trigger>

      <Portal>
        <Menu.Positioner>
          <Menu.Content>
            <VStack align="start" gap="0" px="14px" py={2}>
              <HStack>
                <Text fontSize="sm">{user?.FullName}</Text>
                <SignedIn plan="LmJZpYmP">
                  <Tag.Root colorPalette="purple" size="sm">
                    <Tag.StartElement>
                      <PiStar />
                    </Tag.StartElement>
                    <Tag.Label>Pro</Tag.Label>
                  </Tag.Root>
                </SignedIn>
                <SignedIn plan="L9nqaeQZ">
                  <Tag.Root colorPalette="gray" size="sm">
                    <Tag.StartElement>
                      <PiStar />
                    </Tag.StartElement>
                    <Tag.Label>Basic</Tag.Label>
                  </Tag.Root>
                </SignedIn>
              </HStack>
              <Text color="fg.muted" fontSize="sm">
                {user?.Email}
              </Text>
            </VStack>
            <Menu.Separator />

            <Profile popup>
              <Menu.Item
                onClick={() => handleMenuAction("account")}
                value="account"
              >
                <PiUser />
                Account
              </Menu.Item>
            </Profile>
            <Support popup>
              <Menu.Item onClick={() => handleMenuAction("help")} value="help">
                <PiQuestion />
                Help & Support
              </Menu.Item>
            </Support>
            <Menu.Separator />
            <LogOut>
              <Menu.Item
                onClick={() => handleMenuAction("logout")}
                value="logout"
              >
                <PiSignOut />
                Logout
              </Menu.Item>
            </LogOut>
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  );
};
