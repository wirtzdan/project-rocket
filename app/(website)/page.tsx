import {
  Button,
  Card,
  Heading,
  Icon,
  SimpleGrid,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import {
  PiArrowRight,
  PiArrowSquareOut,
  PiCreditCard,
  PiCube,
  PiEnvelopeSimple,
  PiLifebuoy,
  PiPalette,
  PiUserCircle,
} from "react-icons/pi";
import { Section } from "@/components/layout/section";
import { Link } from "@/components/ui/link";
import { generateMetadata } from "@/utils/metadata";

export const metadata = generateMetadata({
  title: "Home",
  description:
    "Deserunt veniam voluptate aliqua consectetur laboris voluptate est labore qui commodo.",
});

export default async function Page() {
  return (
    <>
      <Section
        bg="bg.subtle"
        borderBottom="1px solid"
        borderColor="border"
        header
        size="lg"
      >
        <VStack gap="10">
          <Stack gap="4" textAlign="center">
            <Heading
              as="h1"
              lineHeight="tighter"
              maxW={{ md: "lg" }}
              mx="auto"
              textStyle={{ base: "2xl", md: "5xl" }}
            >
              Publish your next project without the usual headaches
            </Heading>

            <Text color="fg.muted" maxW={{ md: "lg" }} mx="auto" textStyle="lg">
              Project Rocket is a starter/boilerplate template with all engines
              ready to quickly build and publish your next project, whatever it
              might be.
            </Text>
          </Stack>

          <Stack
            align="center"
            direction={{ base: "column", md: "row" }}
            gap="3"
          >
            <Button asChild size="xl">
              <Link href="/docs">
                Get started <PiArrowRight />
              </Link>
            </Button>

            <Link href="https://github.com/wirtzdan/project-rocket">
              <Button size="xl" variant="ghost">
                Github <PiArrowSquareOut />
              </Button>
            </Link>
          </Stack>
        </VStack>
      </Section>
      <Section bg="bg" size="lg">
        <VStack gap="12">
          <Stack gap="4" textAlign="center">
            <Heading
              as="h1"
              lineHeight="tighter"
              maxW={{ md: "md" }}
              mx="auto"
              textStyle={{ base: "2xl", md: "4xl" }}
            >
              Minimal tooling with powerful features
            </Heading>

            <Text color="fg.muted" maxW={{ md: "lg" }} mx="auto" textStyle="lg">
              This templates leverages Outsetas, NextJs and ChakraUIs core
              functionality to save time and focus on shipping code that
              actually matters.
            </Text>
          </Stack>
          <SimpleGrid columns={{ base: 1, md: 3 }} gap="4">
            {features.map((feature) => (
              <Card.Root key={feature.title}>
                <Card.Body gap={{ base: "4", md: "6" }}>
                  <Icon size="2xl">{feature.icon}</Icon>
                  <Stack>
                    <Card.Title>{feature.title}</Card.Title>
                    <Card.Description>{feature.description}</Card.Description>
                  </Stack>
                </Card.Body>
              </Card.Root>
            ))}
          </SimpleGrid>
        </VStack>
      </Section>
    </>
  );
}

const features = [
  {
    icon: <PiUserCircle />,
    title: "Authentication",
    description: "Securly login in users and protect pages and elements",
  },
  {
    icon: <PiCreditCard />,
    title: "Payments",
    description:
      "Setup one-time, subscription or usage billing for individual or teams",
  },
  {
    icon: <PiPalette />,
    title: "Theming",
    description:
      "Customizable theme to quickly change the look and feel of your app",
  },
  {
    icon: <PiEnvelopeSimple />,
    title: "Email Marketing",
    description:
      "Automated emails, broadcasts and drip campaigns to nurture users and drive sales",
  },
  {
    icon: <PiLifebuoy />,
    title: "Support Desk",
    description:
      "Build-in support ticket system to make customers smile and keep them engaged",
  },
  {
    icon: <PiCube />,
    title: "Design System",
    description: "Component library by Chakra UI to build anything you want",
  },
];
