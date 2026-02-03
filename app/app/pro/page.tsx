import { Heading } from "@chakra-ui/react";
import ProtectedRoute from "@/components/auth/protect-route";
import { Section } from "@/components/layout/section";
import { generateMetadata } from "@/utils/metadata";

export const metadata = generateMetadata({
  title: "Dashboard",
  description: "Access your personal dashboard and manage your account",
  noIndex: true,
});

export default function Pro() {
  return (
    <ProtectedRoute plansWithAccess="pro">
      <Section header>
        <Heading>Pro</Heading>
      </Section>
    </ProtectedRoute>
  );
}
