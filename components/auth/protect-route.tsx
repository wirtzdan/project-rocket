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
import { projectConfig } from "@/config";
import type { OutsetaUser } from "@/types/outseta";
import { useAuth } from "../provider/auth-provider";
import { Login, Profile, SignUp } from "./embed";

// Add readonly to prevent accidental mutations
interface Plan
  extends Readonly<{
    uid: string;
    label: string;
  }> {}

interface ProtectedRouteProps
  extends Readonly<{
    children: React.ReactNode;
    plansWithAccess?: string;
    fallback?: React.ReactNode;
  }> {}

function userHasAccessToPlans(
  plans: Plan[],
  user: OutsetaUser | null
): boolean {
  if (!user?.Account) {
    return false;
  }
  const planIdForUser = user.Account.CurrentSubscription?.Plan?.Uid;
  // If no specific plans are required, any plan is valid
  if (plans.length === 0) {
    return true;
  }
  return !!plans.find((plan) => plan.uid === planIdForUser);
}

export default function ProtectedRoute({
  children,
  plansWithAccess,
}: ProtectedRouteProps): React.ReactElement {
  const { user, isLoading } = useAuth();

  const requiredPlans = (() => {
    if (!plansWithAccess) {
      return [];
    }
    const plans = plansWithAccess
      .split(",")
      .map((p) => p.trim().toLowerCase())
      .map((planName) => {
        const configPlan =
          projectConfig.auth.plans[
            planName as keyof typeof projectConfig.auth.plans
          ];
        if (!configPlan) {
          console.warn(`Unknown plan: ${planName}`);
          return null;
        }
        return configPlan;
      })
      .filter((p): p is Plan => p !== null);

    return plans;
  })();

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

  const allowAccess = userHasAccessToPlans(requiredPlans, user);

  if (!allowAccess) {
    return (
      <Box h="100vh" position="relative" w="100vw">
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
                {/* TODO: Directly open the right plan to upgrade to */}
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
