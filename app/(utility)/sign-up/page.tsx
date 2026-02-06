import { AbsoluteCenter, Box, Container } from "@chakra-ui/react";
import { SignUp } from "@/components/auth/embed";
import { RedirectIfAuthenticated } from "@/components/auth/redirect-if-authenticated";
import { projectConfig } from "@/config";
import { generateMetadata } from "@/utils/metadata";

export const metadata = generateMetadata({
  title: "Sign up",
  description: `Sign up to ${projectConfig.general.name}`,
});

export default function SignUpPage() {
  return (
    <RedirectIfAuthenticated>
      <Box bg="bg.muted" h="100vh" p="relative" w="100vw">
        <AbsoluteCenter maxW="lg" w="full">
          <Container w="full">
            <SignUp />
          </Container>
        </AbsoluteCenter>
      </Box>
    </RedirectIfAuthenticated>
  );
}
