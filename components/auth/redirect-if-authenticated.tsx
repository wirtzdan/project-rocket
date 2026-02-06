"use client";

import { AbsoluteCenter, Box, Spinner, Text, VStack } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "../provider/auth-provider";

interface RedirectIfAuthenticatedProps {
  children: React.ReactNode;
  redirectTo?: string;
}

export const RedirectIfAuthenticated = ({
  children,
  redirectTo = "/app",
}: RedirectIfAuthenticatedProps) => {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && user) {
      router.push(redirectTo);
    }
  }, [user, isLoading, router, redirectTo]);

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
            <Text aria-live="polite" color="fg.subtle" role="status" textStyle="lg">
              Loading\u2026
            </Text>
          </VStack>
        </AbsoluteCenter>
      </Box>
    );
  }

  if (user) {
    return null;
  }

  return <>{children}</>;
};
