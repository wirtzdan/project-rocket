import { Box, VStack, AbsoluteCenter, EmptyState } from "@chakra-ui/react";
import { PiCode } from "react-icons/pi";
import { generateMetadata } from "@/utils/metadata";

export const metadata = generateMetadata({
  title: "JavaScript Required",
  description: "Please enable JavaScript to access this website",
  noIndex: true,
});

export default function ActivateJavaScriptPage() {
  return (
    <Box p="relative" h="100vh" w="100vw">
      <AbsoluteCenter>
        <VStack>
          <EmptyState.Root paddingInline={0} paddingBlock={0} width="full">
            <EmptyState.Content>
              <EmptyState.Indicator>
                <PiCode />
              </EmptyState.Indicator>
              <VStack textAlign="center">
                <EmptyState.Title textStyle="2xl" maxWidth="lg">
                  JavaScript is required
                </EmptyState.Title>
                <EmptyState.Description textStyle="md" maxWidth="sm">
                  This website requires JavaScript to function properly. Please enable JavaScript in your browser settings and reload the page.
                </EmptyState.Description>
              </VStack>
            </EmptyState.Content>
          </EmptyState.Root>
        </VStack>
      </AbsoluteCenter>
    </Box>
  );
}
