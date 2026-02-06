"use client";

import {
  AbsoluteCenter,
  Box,
  Button,
  EmptyState,
  Group,
  Skeleton,
  VStack,
} from "@chakra-ui/react";
import { PiSignIn } from "react-icons/pi";
import { Section } from "../layout/section";
import { useAuth } from "../provider/auth-provider";
import { Login, SignUp } from "./embed";

interface AuthGateProps {
  children: React.ReactNode;
}

export function AuthGate({ children }: AuthGateProps) {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <Section header>
        <VStack
          align="start"
          gap="6"
          maxW={{ base: "full", md: "3xl" }}
          mx="auto"
          w="full"
        >
          <Skeleton height="60px" width="280px" />
          <VStack gap="4" w="full">
            <Skeleton height="48px" width="full" />
            <Skeleton height="48px" width="full" />
          </VStack>
        </VStack>
      </Section>
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
                  <PiSignIn />
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
