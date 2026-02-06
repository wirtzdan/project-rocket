import { Card, Heading, Text, VStack } from "@chakra-ui/react";
import { PageViewTracker } from "@/components/analytics/page-view-tracker";
import { Support } from "@/components/embeds";
import { Section } from "@/components/layout/section";
import { generateMetadata } from "@/utils/metadata";
import "@/styles/contact-page-styles.css";

export const metadata = generateMetadata({
  title: "Contact",
  description:
    "Get in touch with us. Send a message and we'll typically reply within 24 hours.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageViewTracker
        eventName="contact_form_viewed"
        properties={{ source: "contact_page" }}
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
                Contact us
              </Heading>
            </VStack>
            <Text
              color="fg.muted"
              maxW="lg"
              textStyle={{ base: "lg", md: "xl" }}
            >
              Send us a message if you have question, feedback or an idea. We
              typically reply in 24 hours.
            </Text>
          </VStack>
        </VStack>
      </Section>
      <Section>
        <Card.Root id="contact-form" mt={{ base: "-40", md: "-44" }}>
          <Support />
        </Card.Root>
      </Section>
    </>
  );
}
