import {
  Badge,
  Button,
  Card,
  Float,
  For,
  HStack,
  List,
  Separator,
  Span,
  Stack,
  type StackProps,
  Text,
} from "@chakra-ui/react";
import {
  LuArrowRight,
  LuBuilding,
  LuMessageSquare,
  LuPackage,
  LuUser,
} from "react-icons/lu";
import type { PlanData } from "../../app/(website)/pricing/data";

const iconMap: Record<string, React.ReactNode> = {
  team: <LuBuilding />,
  user: <LuUser />,
  storage: <LuPackage />,
  help: <LuMessageSquare />,
};

interface PricingCardProps extends StackProps {
  planPaymentTerms: "month" | "annual";
  data: PlanData;
}

export const PricingCard = (props: PricingCardProps) => {
  const { planPaymentTerms, data, ...rest } = props;
  const price =
    planPaymentTerms === "month"
      ? data.monthlyPrice.price
      : data.yearlyPrice.price;
  return (
    <Card.Root
      borderColor={data.recommended ? "colorPalette.solid" : undefined}
      size="lg"
      {...rest}
    >
      {data.recommended && (
        <Float placement="top-center">
          <Badge variant="solid">Most popular</Badge>
        </Float>
      )}
      <Card.Body>
        <Stack gap="5">
          <Card.Title fontWeight="normal">{data.title}</Card.Title>
          <Stack gap="1">
            <Span fontWeight="medium" lineHeight="1" textStyle="5xl">
              {data.priceSymbol}
              {price}
            </Span>
            <Span color="fg.muted" textStyle="sm">
              per month
            </Span>
          </Stack>
          <Card.Description color="fg">{data.description}</Card.Description>
          <Stack gap="2">
            <Button
              bg={data.recommended ? undefined : "bg.panel"}
              colorPalette={data.recommended ? undefined : "gray"}
              data-mode="popup"
              data-o-auth="1"
              data-plan-payment-term={planPaymentTerms}
              data-plan-uid={data.uid}
              data-widget-mode="register"
              size="xl"
              suppressHydrationWarning
              variant={data.recommended ? "solid" : "outline"}
            >
              Get Started <LuArrowRight />
            </Button>
            <Text color="fg.muted" textAlign="center" textStyle="xs">
              7-day free trial
            </Text>
          </Stack>
        </Stack>
      </Card.Body>
      <Separator variant="dashed" />
      <Card.Body gap="6" roundedBottom="l3">
        <List.Root align="center" gap="3" textStyle="sm" variant="plain">
          <For each={data.features}>
            {(item) => (
              <List.Item alignItems="center" key={item.title}>
                <List.Indicator asChild color="fg.muted">
                  {iconMap[item.icon as keyof typeof iconMap]}
                </List.Indicator>
                <HStack gap="2">
                  <Text>{item.title}</Text>
                </HStack>
              </List.Item>
            )}
          </For>
        </List.Root>
      </Card.Body>
    </Card.Root>
  );
};
