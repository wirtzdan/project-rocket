import {
  Box,
  Button,
  VStack,
  AbsoluteCenter,
  EmptyState,
} from "@chakra-ui/react";
import { EnvelopeOpen, ArrowSquareOut } from "@phosphor-icons/react/dist/ssr";
import { Link } from "@/components/ui/link";
import Confetti from "@/components/ui/confetti";
import { generateMetadata } from "@/utils/metadata";

export const metadata = generateMetadata({
  title: "Thank You",
  description:
    "Thank you for signing up. Please check your email to complete registration",
  noIndex: true,
});

export default function ThankYouPage() {
  return (
    <>
      <Confetti type="fireworks" />
      <Box p="relative" h="100vh" w="100vw">
        <AbsoluteCenter>
          <VStack>
            <EmptyState.Root paddingInline={0} paddingBlock={0} width="full">
              <EmptyState.Content>
                <EmptyState.Indicator>
                  <EnvelopeOpen />
                </EmptyState.Indicator>
                <VStack textAlign="center">
                  <EmptyState.Title textStyle="2xl" maxWidth="lg">
                    Almost there! Check your inbox.
                  </EmptyState.Title>
                  <EmptyState.Description textStyle="md" maxWidth="sm">
                    We've sent you an email to complete your sign-up and set your
                    password. If you don't see it shortly, please check your spam
                    folder.
                  </EmptyState.Description>
                </VStack>
                <Box pt="4">
                  <Link href="https://mail.google.com">
                    <Button size="sm">
                      <ArrowSquareOut weight="duotone" />
                      Open Gmail
                    </Button>
                  </Link>
                </Box>
              </EmptyState.Content>
            </EmptyState.Root>
          </VStack>
        </AbsoluteCenter>
      </Box>
    </>
  );
}
