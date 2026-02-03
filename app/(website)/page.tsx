import {
  Heading,
  Stack,
  VStack,
  Text,
  Card,
  Icon,
  SimpleGrid,
} from "@chakra-ui/react";

import { Button } from "@chakra-ui/react";
import { Section } from "@/components/layout/section";
import { generateMetadata } from "@/utils/metadata";
import { Link } from "@/components/ui/link";
import {
  ArrowSquareOut,
  UserCircle,
  CreditCard,
  Palette,
  EnvelopeSimple,
  Lifebuoy,
  Cube,
  ArrowRight,
} from "@phosphor-icons/react/dist/ssr";

export const metadata = generateMetadata({
  title: "Home",
  description:
    "Deserunt veniam voluptate aliqua consectetur laboris voluptate est labore qui commodo.",
});

export default async function Page() {
  return (
    <>
      <Section
        header
        size="lg"
        bg="bg.subtle"
        borderBottom="1px solid"
        borderColor="border"
      >
        <VStack gap="10">
          <Stack gap="4" textAlign="center">
            <Heading
              as="h1"
              textStyle={{ base: "2xl", md: "5xl" }}
              maxW={{ md: "lg" }}
              mx="auto"
              lineHeight="tighter"
            >
              Publish your next project without the usual headaches
            </Heading>

            <Text color="fg.muted" textStyle="lg" maxW={{ md: "lg" }} mx="auto">
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
            <Link href="/docs">
              <Button size="xl">
                Get started <ArrowRight />
              </Button>
            </Link>
            <Link href="https://github.com/wirtzdan/project-rocket">
              <Button variant="ghost" size="xl">
                Github <ArrowSquareOut />
              </Button>
            </Link>
          </Stack>
        </VStack>
      </Section>
      <Section size="lg" bg="bg">
        <VStack gap="12">
          <Stack gap="4" textAlign="center">
            <Heading
              as="h1"
              textStyle={{ base: "2xl", md: "4xl" }}
              maxW={{ md: "md" }}
              mx="auto"
              lineHeight="tighter"
            >
              Minimal tooling with powerful features
            </Heading>

            <Text color="fg.muted" textStyle="lg" maxW={{ md: "lg" }} mx="auto">
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
    icon: <UserCircle />,
    title: "Authentication",
    description: "Securly login in users and protect pages and elements",
  },
  {
    icon: <CreditCard />,
    title: "Payments",
    description:
      "Setup one-time, subscription or usage billing for individual or teams",
  },
  {
    icon: <Palette />,
    title: "Theming",
    description:
      "Customizable theme to quickly change the look and feel of your app",
  },
  {
    icon: <EnvelopeSimple />,
    title: "Email Marketing",
    description:
      "Automated emails, broadcasts and drip campaigns to nurture users and drive sales",
  },
  {
    icon: <Lifebuoy />,
    title: "Support Desk",
    description:
      "Build-in support ticket system to make customers smile and keep them engaged",
  },
  {
    icon: <Cube />,
    title: "Design System",
    description: "Component library by Chakra UI to build anything you want",
  },
];
