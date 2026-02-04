"use client";

import { Button, Heading, Text, VStack } from "@chakra-ui/react";
import { SignedIn, SignedOut } from "@/components/auth/protect-content";
import { Section } from "@/components/layout/section";
import { useAuth } from "@/components/provider/auth-provider";
import { authConfig } from "@/config/auth-config";

export default function AddOnDemoPage() {
  const { openPurchaseAddOn } = useAuth();

  const handlePurchase = () => {
    openPurchaseAddOn(authConfig.addOns.premium.uid);
  };

  return (
    <>
      <Section
        bg="bg.muted"
        borderBottomColor="border"
        borderBottomWidth="1px"
        header
      >
        <VStack gap={{ base: "6", md: "8" }} textAlign="center">
          <VStack gap={{ base: "5", md: "6" }}>
            <VStack gap={{ base: "3", md: "4" }}>
              <Heading as="h1" textStyle={{ base: "4xl", md: "5xl" }}>
                Add-on Demo
              </Heading>
              <Text color="fg.muted" textStyle={{ base: "lg", md: "xl" }}>
                Demonstrates the openPurchaseAddOn method
              </Text>
            </VStack>
          </VStack>
        </VStack>
      </Section>
      <Section>
        <VStack gap={8}>
          <Heading size="3xl">Purchase Flow</Heading>
          <Text color="fg.muted" textAlign="center">
            Click the button below to open the add-on purchase flow directly.
          </Text>

          <SignedOut>
            <Text color="fg.muted">Sign in to test the purchase flow.</Text>
          </SignedOut>

          <SignedIn>
            <Button onClick={handlePurchase} size="lg">
              Open Purchase Add-on
            </Button>
          </SignedIn>
        </VStack>
      </Section>
    </>
  );
}
