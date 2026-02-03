import { Card, Heading, Text, VStack } from "@chakra-ui/react";
import { Support } from "@/components/auth/embed";
import { Section } from "@/components/layout/section";
import "@/styles/contact-page-styles.css";

export default function SupportPage() {
  return (
    <>
      <Section
        header
        bg="bg.muted"
        borderBottomColor="border"
        borderBottomWidth="1px"
        pb={28}
      >
        <VStack gap={{ base: "6", md: "8" }} textAlign="center">
          <VStack gap={{ base: "5", md: "6" }}>
            <VStack gap={{ base: "3", md: "4" }}>
              <Heading as="h1" textStyle={{ base: "4xl", md: "5xl" }}>
                Support
              </Heading>
            </VStack>
            <Text
              color="fg.muted"
              textStyle={{ base: "lg", md: "xl" }}
              maxW="lg"
            >
              Send us a message if you need help. We typically reply in 24
              hours.
            </Text>
          </VStack>
        </VStack>
      </Section>
      <Section>
        <Card.Root mt={{ base: "-40", md: "-44" }}>
          <Support />
        </Card.Root>
      </Section>
    </>
  );
}
