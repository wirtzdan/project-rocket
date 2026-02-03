import { Heading } from "@chakra-ui/react";
import ProtectedRoute from "@/components/auth/protect-route";
import { Section } from "@/components/layout/section";

export default function Basic() {
  return (
    <ProtectedRoute plansWithAccess="basic">
      <Section header>
        <Heading>Basic</Heading>
      </Section>
    </ProtectedRoute>
  );
}
