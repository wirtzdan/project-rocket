import { AbsoluteCenter, Box, Container } from "@chakra-ui/react";
import { RedirectIfAuthenticated } from "@/components/auth/redirect-if-authenticated";
import { Login } from "@/components/embeds";
import { projectConfig } from "@/config";
import { generateMetadata } from "@/utils/metadata";

export const metadata = generateMetadata({
  title: "Login",
  description: `Login to ${projectConfig.general.name}`,
});

export default function LoginPage() {
  return (
    <RedirectIfAuthenticated>
      <Box bg="bg.muted" h="100vh" p="relative" w="100vw">
        <AbsoluteCenter maxW="lg" w="full">
          <Container w="full">
            <Login />
          </Container>
        </AbsoluteCenter>
      </Box>
    </RedirectIfAuthenticated>
  );
}
