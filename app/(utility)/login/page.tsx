import { AbsoluteCenter, Box, Container } from "@chakra-ui/react";
import { Login } from "@/components/auth/embed";
import { projectConfig } from "@/config";
import { generateMetadata } from "@/utils/metadata";

export const metadata = generateMetadata({
  title: "Login",
  description: `Login to ${projectConfig.general.name}`,
});

export default function SignUpPage() {
  return (
    <Box bg="bg.muted" h="100vh" p="relative" w="100vw">
      <AbsoluteCenter maxW="lg" w="full">
        <Container w="full">
          <Login />
        </Container>
      </AbsoluteCenter>
    </Box>
  );
}
