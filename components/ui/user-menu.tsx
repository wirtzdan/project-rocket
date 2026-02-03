"use client";

import {
  Avatar,
  Menu,
  Tag,
  Text,
  VStack,
  HStack,
  Portal,
} from "@chakra-ui/react";
import { Question, SignOut, User, Star } from "@phosphor-icons/react/dist/ssr";
import { useAuth } from "../provider/auth-provider";
import { SignedIn } from "../auth/protect-content";
import { Profile, Support, LogOut } from "../auth/embed";

function getInitials(name: string | undefined): string {
  if (!name) return "";
  const names = name.trim().split(" ");
  const firstName = names[0] ?? "";
  const lastName = names.length > 1 ? names[names.length - 1] : "";
  return firstName && lastName
    ? `${firstName.charAt(0)}${lastName.charAt(0)}`
    : firstName.charAt(0);
}

export const UserMenu = () => {
  const { user } = useAuth();

  return (
    <Menu.Root positioning={{ placement: "bottom" }}>
      <Menu.Trigger>
        <Avatar.Root size="sm">
          <Avatar.Image src={user?.ProfileImageS3Url} />
          <Avatar.Fallback>
            {getInitials(user?.FullName)}
          </Avatar.Fallback>
        </Avatar.Root>
      </Menu.Trigger>

      <Portal>
        <Menu.Positioner>
          <Menu.Content>
            <VStack py={2} px="14px" align="start" gap="0">
              <HStack>
                <Text fontSize="sm">{user?.FullName}</Text>
                <SignedIn plan="LmJZpYmP">
                  <Tag.Root colorPalette="purple" size="sm">
                    <Tag.StartElement>
                      <Star />
                    </Tag.StartElement>
                    <Tag.Label>Pro</Tag.Label>
                  </Tag.Root>
                </SignedIn>
                <SignedIn plan="L9nqaeQZ">
                  <Tag.Root colorPalette="gray" size="sm">
                    <Tag.StartElement>
                      <Star />
                    </Tag.StartElement>
                    <Tag.Label>Basic</Tag.Label>
                  </Tag.Root>
                </SignedIn>
              </HStack>
              <Text fontSize="sm" color="fg.muted">
                {user?.Email}
              </Text>
            </VStack>
            <Menu.Separator />

            <Profile popup>
              <Menu.Item value="account">
                <User weight="bold" />
                Account
              </Menu.Item>
            </Profile>
            <Support popup>
              <Menu.Item value="help">
                <Question weight="bold" />
                Help & Support
              </Menu.Item>
            </Support>
            <Menu.Separator />
            <LogOut>
              <Menu.Item value="logout">
                <SignOut weight="bold" />
                Logout
              </Menu.Item>
            </LogOut>
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  );
};
