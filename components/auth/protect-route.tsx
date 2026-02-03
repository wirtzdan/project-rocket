"use client";

import { useAuth } from "../provider/auth-provider";
import { Button } from "@chakra-ui/react";
import { projectConfig } from "@/config";

import {
  AbsoluteCenter,
  Box,
  Spinner,
  Text,
  VStack,
  Group,
  EmptyState,
} from "@chakra-ui/react";
import { PiLock, PiSignIn } from "react-icons/pi";
import { OutsetaUser } from "@/types/outseta";
import { Profile, Login, SignUp } from "./embed";

// Add readonly to prevent accidental mutations
interface Plan
  extends Readonly<{
    uid: string;
    label: string;
  }> { }

interface ProtectedRouteProps
  extends Readonly<{
    children: React.ReactNode;
    plansWithAccess?: string;
    fallback?: React.ReactNode;
  }> { }

function userHasAccessToPlans(
  plans: Plan[],
  user: OutsetaUser | null
): boolean {
  if (!user?.Account) return false;
  const planIdForUser = user.Account.CurrentSubscription?.Plan?.Uid;
  // If no specific plans are required, any plan is valid
  if (plans.length === 0) return true;
  return !!plans.find((plan) => plan.uid === planIdForUser);
}

export default function ProtectedRoute({
  children,
  plansWithAccess,
}: ProtectedRouteProps): React.ReactElement {
  const { user, isLoading } = useAuth();

  console.log("ProtectedRoute:", {
    isLoading,
    hasUser: !!user,
    userPlan: user?.Account?.CurrentSubscription?.Plan?.Uid,
    plansWithAccess,
  });

  const requiredPlans = (() => {
    if (!plansWithAccess) return [];
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

    console.log(
      "Required Plans:",
      plans.map((p) => ({ uid: p.uid, label: p.label }))
    );
    return plans;
  })();

  if (isLoading) {
    console.log("ProtectedRoute: Loading state");
    return (
      <Box position="relative" h="100vh" w="100vw">
        <AbsoluteCenter>
          <VStack>
            <Spinner
              color="primary.600"
              size="xl"
              borderWidth="4px"
              css={{ "--spinner-track-color": "colors.neutral.200" }}
            />
            <Text textStyle="lg" color="fg.subtle">
              Loading...
            </Text>
          </VStack>
        </AbsoluteCenter>
      </Box>
    );
  }

  if (!user) {
    console.log("ProtectedRoute: No user - showing login screen");
    return (
      <Box position="relative" h="100vh" w="100vw">
        <AbsoluteCenter>
          <VStack>
            <EmptyState.Root paddingInline={0} paddingBlock={0} width="full">
              <EmptyState.Content>
                <EmptyState.Indicator>
                  <PiSignIn />
                </EmptyState.Indicator>
                <VStack textAlign="center">
                  <EmptyState.Title textStyle="2xl" maxWidth="lg">
                    Login to continue
                  </EmptyState.Title>
                  <EmptyState.Description textStyle="md" maxWidth="sm">
                    {`This page is available only to ${plansWithAccess
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
    console.log("ProtectedRoute: No plans required - allowing access");
    return children as React.ReactElement;
  }

  const allowAccess = userHasAccessToPlans(requiredPlans, user);
  console.log("ProtectedRoute: Plan check result:", {
    allowAccess,
    userPlan: user.Account?.CurrentSubscription?.Plan?.Uid,
    requiredPlans: requiredPlans.map((p) => p.uid),
  });

  if (!allowAccess) {
    console.log("ProtectedRoute: Access denied - showing upgrade screen");
    return (
      <Box position="relative" h="100vh" w="100vw">
        <AbsoluteCenter>
          <VStack>
            <EmptyState.Root paddingInline={0} paddingBlock={0} width="full">
              <EmptyState.Content>
                <EmptyState.Indicator>
                  <PiLock />
                </EmptyState.Indicator>
                <VStack textAlign="center">
                  <EmptyState.Title textStyle="2xl" maxWidth="lg">
                    Upgrade to unlock
                  </EmptyState.Title>
                  <EmptyState.Description textStyle="md" maxWidth="sm">
                    {`This page is available only to users with a ${requiredPlans[0].label} plan. To continue, please upgrade to a ${requiredPlans[0].label} plan.`}
                  </EmptyState.Description>
                </VStack>
                {/* TODO: Directly open the right plan to upgrade to */}
                <Profile popup data-tab="planChange">
                  <Button>Change plan</Button>
                </Profile>
              </EmptyState.Content>
            </EmptyState.Root>
          </VStack>
        </AbsoluteCenter>
      </Box>
    );
  }

  console.log("ProtectedRoute: Access granted");
  return children as React.ReactElement;
}
