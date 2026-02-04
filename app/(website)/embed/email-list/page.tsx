import { Box, Button, Heading, VStack } from "@chakra-ui/react";
import { EmailList } from "@/components/auth/embed";
import { Section } from "@/components/layout/section";
import { generateMetadata } from "@/utils/metadata";

export const metadata = generateMetadata({
  title: "Email List Embed Demo",
  description:
    "See how the email list embed works in both popup and embedded modes",
});

export default function EmailListEmbedPage() {
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
                Email List Embed
              </Heading>
            </VStack>
          </VStack>
        </VStack>
      </Section>
      <Section>
        <VStack gap={8}>
          <Heading size="3xl">Popup</Heading>
          <EmailList popup uid="OW4k4p9g">
            <Button size="lg">Open Email List Popup</Button>
          </EmailList>
          <Heading size="3xl">On Page</Heading>
          <Box bg="bg.muted" borderRadius="lg" borderWidth="1px" p={6} w="full">
            <EmailList uid="OW4k4p9g" />
          </Box>
        </VStack>
      </Section>
    </>
  );
}
