import { Heading, Text } from "@chakra-ui/react";
import ProtectedRoute from "@/components/auth/protect-route";
import { Section } from "@/components/layout/section";
import { generateMetadata } from "@/utils/metadata";
import { SignedIn } from "../../components/auth/protect-content";

export const metadata = generateMetadata({
  title: "Dashboard",
  description: "Access your personal dashboard and manage your account",
  noIndex: true,
});

export default function App() {
  return (
    <ProtectedRoute>
      <Section header>
        <Heading>App Page</Heading>
        <SignedIn isPrimaryContact={false}>
          <Text>Primary content</Text>
        </SignedIn>
      </Section>
    </ProtectedRoute>
  );
}
