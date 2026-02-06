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
import { SignUp } from "../embeds";

const iconMap: Record<string, React.ReactNode> = {
  team: <LuBuilding aria-hidden="true" />,
  user: <LuUser aria-hidden="true" />,
  storage: <LuPackage aria-hidden="true" />,
  help: <LuMessageSquare aria-hidden="true" />,
};

interface PricingCardProps extends StackProps {
  planPaymentTerms: "monthly" | "quarter" | "annual" | "oneTime";
  data: PlanData;
}

export const PricingCard = (props: PricingCardProps) => {
  const { planPaymentTerms, data, ...rest } = props;
  const priceMap = {
    monthly: data.monthlyPrice,
    quarter: data.quarterlyPrice,
    annual: data.yearlyPrice,
    oneTime: data.oneTimePrice,
  };
  const price = priceMap[planPaymentTerms];
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
          <Card.Title fontWeight="normal" truncate>
            {data.title}
          </Card.Title>
          <Stack gap="1">
            <Span
              fontVariantNumeric="tabular-nums"
              fontWeight="medium"
              lineHeight="1"
              textStyle="5xl"
            >
              {data.priceSymbol}
              {price}
            </Span>
            <Span color="fg.muted" textStyle="sm">
              {planPaymentTerms === "oneTime"
                ? "one-time"
                : `per\u00A0${{ monthly: "month", quarter: "quarter", annual: "year" }[planPaymentTerms]}`}
            </Span>
          </Stack>
          <Card.Description color="fg">{data.description}</Card.Description>
          <Stack gap="2">
            <SignUp
              planPaymentTerm={planPaymentTerms}
              planUid={data.uid}
              popup
              skipPlanOptions={true}
            >
              <Button
                aria-haspopup="dialog"
                bg={data.recommended ? undefined : "bg.panel"}
                colorPalette={data.recommended ? undefined : "gray"}
                size="xl"
                variant={data.recommended ? "solid" : "outline"}
              >
                Get Started <LuArrowRight aria-hidden="true" />
              </Button>
            </SignUp>
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
