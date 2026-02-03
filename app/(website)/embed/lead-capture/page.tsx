import { Box, Button, Heading, VStack } from "@chakra-ui/react";
import { LeadCapture } from "@/components/auth/embed";
import { Section } from "@/components/layout/section";
import { generateMetadata } from "@/utils/metadata";

export const metadata = generateMetadata({
  title: "Lead Capture Embed Demo",
  description:
    "See how the lead capture embed works in both popup and embedded modes",
});

export default function LeadCaptureEmbedPage() {
  return (
    <>
      <Section
        header
        bg="bg.muted"
        borderBottomColor="border"
        borderBottomWidth="1px"
      >
        <VStack gap={{ base: "6", md: "8" }} textAlign="center">
          <VStack gap={{ base: "5", md: "6" }}>
            <VStack gap={{ base: "3", md: "4" }}>
              <Heading as="h1" textStyle={{ base: "4xl", md: "5xl" }}>
                Lead Capture Embed
              </Heading>
            </VStack>
          </VStack>
        </VStack>
      </Section>
      <Section>
        <VStack gap={8}>
          <Heading size="3xl">Popup</Heading>
          <LeadCapture popup uid="BWzy5a9E">
            <Button size="lg">Open Lead Capture Popup</Button>
          </LeadCapture>
          <Heading size="3xl">On page</Heading>

          <Box w="full" p={6} borderWidth="1px" borderRadius="lg" bg="bg.muted">
            <LeadCapture uid="BWzy5a9E" />
          </Box>
        </VStack>
      </Section>
    </>
  );
}
