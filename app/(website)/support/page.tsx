import { Card, Heading, Stack, Text, VStack } from "@chakra-ui/react";
import { PageViewTracker } from "@/components/analytics/page-view-tracker";
import { Support } from "@/components/embeds";
import { Section } from "@/components/layout/section";
import { Link } from "@/components/ui/link";
import { projectConfig } from "@/config";
import { generateMetadata } from "@/utils/metadata";
import "@/styles/contact-page-styles.css";

export const metadata = generateMetadata({
  title: "Support",
  description:
    "Need help? Send us a support message and we'll typically reply within 24 hours.",
  path: "/support",
});

export default function SupportPage() {
  return (
    <>
      <PageViewTracker
        eventName="support_form_viewed"
        properties={{ source: "support_page" }}
      />
      <Section
        bg="bg.muted"
        borderBottomColor="border"
        borderBottomWidth="1px"
        header
        pb={28}
      >
        <VStack gap={{ base: "6", md: "8" }} textAlign="center">
          <VStack gap={{ base: "5", md: "6" }}>
            <VStack gap={{ base: "3", md: "4" }}>
              <Heading as="h1" textStyle={{ base: "4xl", md: "5xl" }}>
                Support
              </Heading>
            </VStack>
            <Stack
              gap={{ base: "3", md: "4" }}
              maxW="lg"
              textAlign="center"
              textStyle={{ base: "lg", md: "xl" }}
            >
              <Text color="fg.muted">
                Send us a message if you need help. We typically reply within 24
                hours.
              </Text>
              <Text color="fg.muted">
                Prefer self-serve?{" "}
                <Link href={projectConfig.outsetaOptions.knowledgeBaseUrl} text>
                  Browse the knowledge base
                </Link>{" "}
                for instant answers.
              </Text>
            </Stack>
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
