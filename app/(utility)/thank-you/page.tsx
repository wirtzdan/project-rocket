import {
  AbsoluteCenter,
  Box,
  Button,
  EmptyState,
  VStack,
} from "@chakra-ui/react";
import { PiArrowSquareOut, PiEnvelopeOpen } from "react-icons/pi";
import Confetti from "@/components/ui/confetti";
import { Link } from "@/components/ui/link";
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
      <Box h="100vh" p="relative" w="100vw">
        <AbsoluteCenter>
          <VStack>
            <EmptyState.Root paddingBlock={0} paddingInline={0} width="full">
              <EmptyState.Content>
                <EmptyState.Indicator>
                  <PiEnvelopeOpen />
                </EmptyState.Indicator>
                <VStack textAlign="center">
                  <EmptyState.Title maxWidth="lg" textStyle="2xl">
                    Almost there! Check your inbox.
                  </EmptyState.Title>
                  <EmptyState.Description maxWidth="sm" textStyle="md">
                    We've sent you an email to complete your sign-up and set
                    your password. If you don't see it shortly, please check
                    your spam folder.
                  </EmptyState.Description>
                </VStack>
                <Box pt="4">
                  <Link href="https://mail.google.com">
                    <Button size="sm">
                      <PiArrowSquareOut />
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
