import {
  Badge,
  Center,
  For,
  Heading,
  SimpleGrid,
  Tabs,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Section } from "@/components/layout/section";
import { generateMetadata } from "@/utils/metadata";
import { PricingCard } from "../../../components/ui/pricing-card";
import { plans } from "./data";

export const metadata = generateMetadata({
  title: "Pricing",
  description: "Explore our pricing plans tailored to your needs.",
});

export default function PricingPage() {
  return (
    <Section header>
      <VStack gap="12">
        <VStack gap={{ base: "6", md: "8" }} textAlign="center">
          <VStack gap={{ base: "5", md: "6" }}>
            <VStack gap={{ base: "3", md: "4" }}>
              <Heading as="h1" textStyle={{ base: "4xl", md: "5xl" }} textWrap="balance">
                Pricing
              </Heading>
            </VStack>
            <VStack gap="1">
              <Text
                color="fg.muted"
                maxW="lg"
                textStyle={{ base: "lg", md: "xl" }}
              >
                Transparent pricing with no hidden fees.
              </Text>
              <Text
                color="fg.muted"
                maxW="lg"
                textStyle={{ base: "lg", md: "xl" }}
              >
                Cancel anytime.
              </Text>
            </VStack>
          </VStack>
        </VStack>
        <VStack gap="6">
          <VStack alignSelf="stretch" gap="8">
            <Tabs.Root defaultValue={"annual"} variant="enclosed">
              <Center>
                <Tabs.List>
                  <Tabs.Trigger value="month">Monthly</Tabs.Trigger>
                  <Tabs.Trigger value="annual">
                    Yearly <Badge colorPalette="green">20% off</Badge>
                  </Tabs.Trigger>
                </Tabs.List>
              </Center>
              <Tabs.Content value="annual">
                <SimpleGrid columns={{ base: 1, md: 2 }} gap="6" w="full">
                  <For each={plans}>
                    {(plan) => (
                      <PricingCard
                        data={plan}
                        key={plan.value}
                        planPaymentTerms="annual"
                      />
                    )}
                  </For>
                </SimpleGrid>
              </Tabs.Content>
              <Tabs.Content value="month">
                <SimpleGrid columns={{ base: 1, md: 2 }} gap="6" w="full">
                  <For each={plans}>
                    {(plan) => (
                      <PricingCard
                        data={plan}
                        key={plan.value}
                        planPaymentTerms="month"
                      />
                    )}
                  </For>
                </SimpleGrid>
              </Tabs.Content>
            </Tabs.Root>
          </VStack>
        </VStack>
      </VStack>
    </Section>
  );
}
