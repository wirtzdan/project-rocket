import { Heading } from "@chakra-ui/react";
import { PlanGate } from "@/components/auth/plan-gate";
import { Section } from "@/components/layout/section";
import { generateMetadata } from "@/utils/metadata";

export const metadata = generateMetadata({
  title: "Dashboard",
  description: "Access your personal dashboard and manage your account",
  noIndex: true,
});

export default function Pro() {
  return (
    <PlanGate plansWithAccess="LmJZpYmP">
      <Section header>
        <Heading>Pro</Heading>
      </Section>
    </PlanGate>
  );
}
