import {
  Box,
  Button,
  VStack,
  AbsoluteCenter,
  Container,
} from "@chakra-ui/react";
import { Link } from "@/components/ui/link";
import Confetti from "@/components/ui/confetti";
import { generateMetadata } from "@/utils/metadata";
import { Login, SignUp } from "@/components/auth/embed";

export const metadata = generateMetadata({
  title: "Login",
  // TODO: Add product name variable
  description: "Login to Greety",
});

export default function SignUpPage() {
  return (
    <>
      <Box p="relative" h="100vh" w="100vw" bg="bg.muted">
        <AbsoluteCenter w="full" maxW="lg">
          <Container w="full">
            <SignUp />
          </Container>
        </AbsoluteCenter>
      </Box>
    </>
  );
}
