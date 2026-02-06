"use client";

import {
  AbsoluteCenter,
  Box,
  Button,
  EmptyState,
  VStack,
} from "@chakra-ui/react";
import { PiLock } from "react-icons/pi";
import { parsePlansFromConfig, userHasPlanAccess } from "@/utils/auth-helpers";
import { useAuth } from "../provider/auth-provider";
import { Profile } from "./embed";

interface PlanGateProps {
  children: React.ReactNode;
  plansWithAccess: string;
}

export function PlanGate({ children, plansWithAccess }: PlanGateProps) {
  const { user } = useAuth();

  const requiredPlans = parsePlansFromConfig(plansWithAccess);

  if (!user) {
    return null;
  }

  const hasAccess = userHasPlanAccess(user, requiredPlans);

  if (!hasAccess) {
    return (
      <Box minH="60vh" position="relative" w="full">
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

  return children;
}
