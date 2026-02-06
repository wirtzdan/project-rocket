import { Heading } from "@chakra-ui/react";
import { PlanGate } from "@/components/auth/plan-gate";
import { Section } from "@/components/layout/section";
import { generateMetadata } from "@/utils/metadata";

export const metadata = generateMetadata({
  title: "Basic",
  description: "Access your Basic plan dashboard.",
  path: "/app/basic",
  noIndex: true,
});

export default function Basic() {
  return (
    <PlanGate plansWithAccess="basic">
      <Section header>
        <Heading>Basic</Heading>
      </Section>
    </PlanGate>
  );
}
