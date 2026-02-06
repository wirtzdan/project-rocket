import { AbsoluteCenter, Box, EmptyState, VStack } from "@chakra-ui/react";
import { PiCode } from "react-icons/pi";
import { generateMetadata } from "@/utils/metadata";

export const metadata = generateMetadata({
  title: "JavaScript Required",
  description: "Please enable JavaScript to access this website",
  noIndex: true,
});

export default function ActivateJavaScriptPage() {
  return (
    <Box bg="bg.muted" h="100vh" p="relative" w="100vw">
      <AbsoluteCenter>
        <VStack>
          <EmptyState.Root paddingBlock={0} paddingInline={0} width="full">
            <EmptyState.Content>
              <EmptyState.Indicator>
                <PiCode />
              </EmptyState.Indicator>
              <VStack textAlign="center">
                <EmptyState.Title maxWidth="lg" textStyle="2xl">
                  JavaScript is required
                </EmptyState.Title>
                <EmptyState.Description maxWidth="sm" textStyle="md">
                  This website requires JavaScript to function properly. Please
                  enable JavaScript in your browser settings and reload the
                  page.
                </EmptyState.Description>
              </VStack>
            </EmptyState.Content>
          </EmptyState.Root>
        </VStack>
      </AbsoluteCenter>
    </Box>
  );
}
