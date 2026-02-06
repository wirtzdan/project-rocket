"use client";

import {
  AbsoluteCenter,
  Box,
  Button,
  EmptyState,
  Group,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import { PiSignIn } from "react-icons/pi";
import { useAuth } from "../provider/auth-provider";
import { Login, SignUp } from "./embed";

interface AuthGateProps {
  children: React.ReactNode;
}

export function AuthGate({ children }: AuthGateProps) {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <Box minH="60vh" position="relative" w="full">
        <AbsoluteCenter>
          <VStack>
            <Spinner
              borderWidth="4px"
              color="primary.600"
              css={{ "--spinner-track-color": "colors.neutral.200" }}
              size="xl"
            />
            <Text
              aria-live="polite"
              color="fg.subtle"
              role="status"
              textStyle="lg"
            >
              Loading\u2026
            </Text>
          </VStack>
        </AbsoluteCenter>
      </Box>
    );
  }

  if (!user) {
    return (
      <Box minH="60vh" position="relative" w="full">
        <AbsoluteCenter>
          <VStack>
            <EmptyState.Root paddingBlock={0} paddingInline={0} width="full">
              <EmptyState.Content>
                <EmptyState.Indicator>
                  <PiSignIn aria-hidden="true" />
                </EmptyState.Indicator>
                <VStack textAlign="center">
                  <EmptyState.Title maxWidth="lg" textStyle="2xl">
                    Login to continue
                  </EmptyState.Title>
                  <EmptyState.Description maxWidth="sm" textStyle="md">
                    This page is available only to registered users. To
                    continue, log in to your existing account or sign up.
                  </EmptyState.Description>
                </VStack>
                <Group>
                  <Login popup>
                    <Button>Login</Button>
                  </Login>
                  <SignUp popup>
                    <Button variant="outline">Sign up</Button>
                  </SignUp>
                </Group>
              </EmptyState.Content>
            </EmptyState.Root>
          </VStack>
        </AbsoluteCenter>
      </Box>
    );
  }

  return children;
}
