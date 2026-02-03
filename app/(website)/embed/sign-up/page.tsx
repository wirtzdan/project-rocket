import { Box, Button, Heading, VStack } from "@chakra-ui/react";
import { SignUp } from "@/components/auth/embed";
import { Section } from "@/components/layout/section";
import { generateMetadata } from "@/utils/metadata";

export const metadata = generateMetadata({
  title: "Sign up Embed Demo",
  description:
    "See how the sign up embed works in both popup and embedded modes",
});

export default function SignUpEmbedPage() {
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
                Sign up Embed
              </Heading>
            </VStack>
          </VStack>
        </VStack>
      </Section>
      <Section>
        <VStack gap={8}>
          <Heading size="3xl">Popup</Heading>
          <SignUp popup>
            <Button size="lg">Open Sign Up Popup</Button>
          </SignUp>
          <Heading size="3xl">On page</Heading>
          <Box w="full" p={6} borderWidth="1px" borderRadius="lg" bg="bg.muted">
            <SignUp />
          </Box>
        </VStack>
      </Section>
    </>
  );
}
