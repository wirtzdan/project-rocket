import { AbsoluteCenter, Box, Container } from "@chakra-ui/react";
import { Login } from "@/components/auth/embed";
import { generateMetadata } from "@/utils/metadata";

export const metadata = generateMetadata({
  title: "Login",
  // TODO: Add product name variable
  description: "Login to Greety",
});

export default function SignUpPage() {
  return (
    <Box p="relative" h="100vh" w="100vw" bg="bg.muted">
      <AbsoluteCenter w="full" maxW="lg">
        <Container w="full">
          <Login />
        </Container>
      </AbsoluteCenter>
    </Box>
  );
}
