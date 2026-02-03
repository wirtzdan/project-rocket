import { Button } from "@chakra-ui/react";
import { Section } from "@/components/layout/section";
import { generateMetadata } from "@/utils/metadata";
import { Heading, VStack, Box, Container } from "@chakra-ui/react";
import { EmailList } from "@/components/auth/embed";

export const metadata = generateMetadata({
  title: "Email List Embed Demo",
  description:
    "See how the email list embed works in both popup and embedded modes",
});

export default function EmailListEmbedPage() {
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
                Email List Embed
              </Heading>
            </VStack>
          </VStack>
        </VStack>
      </Section>
      <Section>
        <VStack gap={8}>
          <Heading size="3xl">Popup</Heading>
          <EmailList uid="OW4k4p9g" popup>
            <Button size="lg">Open Email List Popup</Button>
          </EmailList>
          <Heading size="3xl">On Page</Heading>
          <Box w="full" p={6} borderWidth="1px" borderRadius="lg" bg="bg.muted">
            <EmailList uid="OW4k4p9g" />
          </Box>
        </VStack>
      </Section>
    </>
  );
}
