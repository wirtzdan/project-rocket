"use client";

import { Box } from "@chakra-ui/react";
import type { EmbedProps } from "./types";

export interface SignUpProps extends EmbedProps {
  /** Pre-select a specific plan during registration */
  planUid?: string;
  /** Payment term. Defaults to "monthly". */
  planPaymentTerm?: "monthly" | "quarter" | "annual" | "oneTime";
  /** Show the plan selection step during registration. Defaults to false (skips straight to checkout). */
  skipPlanOptions?: boolean;
  /** Pre-select an add-on by its Outseta UID */
  addOn?: string;
  /** Pre-apply a discount coupon code */
  discount?: string;
}

function buildRegistrationDefaults(addOn?: string, discount?: string) {
  if (!(addOn || discount)) return undefined;

  const subscription: Record<string, unknown> = {};

  if (addOn) {
    subscription.SubscriptionAddOns = [{ AddOn: { Uid: addOn } }];
  }

  if (discount) {
    subscription.DiscountCouponSubscriptions = [
      { DiscountCoupon: { UniqueIdentifier: discount } },
    ];
  }

  return JSON.stringify({ Subscription: subscription });
}

export const SignUp = ({
  children,
  popup,
  planUid,
  planPaymentTerm = "monthly",
  skipPlanOptions = true,
  addOn,
  discount,
  ...props
}: SignUpProps) => {
  const registrationDefaults = buildRegistrationDefaults(addOn, discount);

  return (
    <Box
      {...(children ? { asChild: true } : {})}
      data-mode={popup ? "popup" : "embed"}
      data-o-auth="1"
      data-plan-payment-term={planPaymentTerm}
      data-plan-uid={planUid}
      data-registration-defaults={registrationDefaults}
      data-skip-plan-options={skipPlanOptions}
      data-widget-mode="register"
      suppressHydrationWarning
      {...props}
    >
      {popup && children}
    </Box>
  );
};
