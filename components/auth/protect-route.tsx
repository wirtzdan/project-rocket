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
import { PiLock, PiSignIn } from "react-icons/pi";
import { parsePlansFromConfig, userHasPlanAccess } from "@/utils/auth-helpers";
import { useAuth } from "../provider/auth-provider";
import { Login, Profile, SignUp } from "./embed";

interface ProtectedRouteProps
  extends Readonly<{
    children: React.ReactNode;
    plansWithAccess?: string;
    fallback?: React.ReactNode;
  }> {}

export default function ProtectedRoute({
  children,
  plansWithAccess,
}: ProtectedRouteProps): React.ReactElement {
  const { user, isLoading } = useAuth();

  const requiredPlans = plansWithAccess
    ? parsePlansFromConfig(plansWithAccess)
    : [];

  if (isLoading) {
    return (
      <Box h="100vh" position="relative" w="100vw">
        <AbsoluteCenter>
          <VStack>
            <Spinner
              borderWidth="4px"
              color="primary.600"
              css={{ "--spinner-track-color": "colors.neutral.200" }}
              size="xl"
            />
            <Text color="fg.subtle" textStyle="lg">
              Loading...
            </Text>
          </VStack>
        </AbsoluteCenter>
      </Box>
    );
  }

  if (!user) {
    return (
      <Box h="100vh" position="relative" w="100vw">
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
                    {`This page is available only to ${
                      plansWithAccess
                        ? requiredPlans.map((p) => p.label).join(" or ")
                        : "registered"
                    } users. To continue, log in to your existing account or sign up.`}
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

  if (!plansWithAccess) {
    return children as React.ReactElement;
  }

  const allowAccess = userHasPlanAccess(user, requiredPlans);

  if (!allowAccess) {
    return (
      <Box bg="bg.subtle" h="100vh" position="relative" w="100vw">
        <AbsoluteCenter>
          <VStack>
            <EmptyState.Root paddingBlock={0} paddingInline={0} width="full">
              <EmptyState.Content>
                <EmptyState.Indicator>
                  <PiLock />
                </EmptyState.Indicator>
                <VStack textAlign="center">
                  <EmptyState.Title maxWidth="lg" textStyle="2xl">
                    Upgrade to unlock
                  </EmptyState.Title>
                  <EmptyState.Description maxWidth="sm" textStyle="md">
                    {`This page is available only to users with a ${requiredPlans[0].label} plan. To continue, please upgrade to a ${requiredPlans[0].label} plan.`}
                  </EmptyState.Description>
                </VStack>
                <Profile data-tab="planChange" popup>
                  <Button>Change plan</Button>
                </Profile>
              </EmptyState.Content>
            </EmptyState.Root>
          </VStack>
        </AbsoluteCenter>
      </Box>
    );
  }

  return children as React.ReactElement;
}
