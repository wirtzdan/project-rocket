import { Heading } from "@chakra-ui/react";
import { PlanGate } from "@/components/auth/plan-gate";
import { Section } from "@/components/layout/section";

export default function Basic() {
  return (
    <PlanGate plansWithAccess="L9nqaeQZ">
      <Section header>
        <Heading>Basic</Heading>
      </Section>
    </PlanGate>
  );
}
