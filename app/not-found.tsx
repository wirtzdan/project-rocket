import {
  Box,
  Button,
  Center,
  Container,
  Heading,
  Text,
  VStack,
} from "@chakra-ui/react";
import { PiArrowLeft } from "react-icons/pi";
import { Link } from "@/components/ui/link";
import { projectConfig } from "@/config";
import { generateMetadata } from "@/utils/metadata";

export const metadata = generateMetadata({
  title: "Page Not Found",
  description: "The page you're looking for doesn't exist or has been moved",
  noIndex: true,
});

export default function NotFound() {
  return (
    <Center minH="100vh">
      <Container>
        <VStack gap="6" textAlign="center">
          <VStack gap="4">
            <Heading
              as="h1"
              lineHeight="tight"
              textStyle={{ base: "3xl", md: "4xl" }}
            >
              Page not found
            </Heading>
            <Text
              color="fg.muted"
              maxW="md"
              textStyle={{ base: "md", md: "lg" }}
            >
              Sorry, we couldn't find the page you're looking for. Please check
              the URL or navigate back to the homepage.
            </Text>
            <Text color="fg.muted" maxW="sm">
              Need some help? Shoot us a note at{" "}
              <Link
                href={`mailto:${projectConfig.general.support.email}`}
                support
                variant="underline"
              >
                {projectConfig.general.support.email}
              </Link>
              . We're here to help!
            </Text>
          </VStack>
          <Box pt="4">
            <Link href="/">
              <Button size="sm" variant="outline">
                <PiArrowLeft />
                Back to home
              </Button>
            </Link>
          </Box>
        </VStack>
      </Container>
    </Center>
  );
}
