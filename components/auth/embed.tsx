"use client";

import { Box } from "@chakra-ui/react";

interface AuthProps {
  children?: React.ReactNode;
  popup?: boolean;
  uid?: string;
  [key: string]: unknown; // For any additional props
}

export const Login = ({ children, popup, ...props }: AuthProps) => {
  return (
    <Box
      {...(children ? { asChild: true } : {})}
      data-mode={popup ? "popup" : "embed"}
      data-o-auth="1"
      data-widget-mode="login"
      suppressHydrationWarning
      {...props}
    >
      {popup && children}
    </Box>
  );
};

interface SignUpProps extends AuthProps {
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

export const Profile = ({ children, popup, ...props }: AuthProps) => {
  return (
    <Box
      {...(children ? { asChild: true } : {})}
      data-mode={popup ? "popup" : "embed"}
      data-o-profile="1"
      suppressHydrationWarning
      {...props}
    >
      {popup && children}
    </Box>
  );
};

export const LeadCapture = ({ children, popup, uid, ...props }: AuthProps) => {
  return (
    <Box
      {...(children ? { asChild: true } : {})}
      data-form-uid={uid}
      data-mode={popup ? "popup" : "embed"}
      data-o-lead-capture="1"
      suppressHydrationWarning
      {...props}
    >
      {popup && children}
    </Box>
  );
};

export const EmailList = ({ children, popup, uid, ...props }: AuthProps) => {
  return (
    <Box
      {...(children ? { asChild: true } : {})}
      data-email-list-uid={uid}
      data-mode={popup ? "popup" : "embed"}
      data-o-email-list="1"
      suppressHydrationWarning
      {...props}
    >
      {popup ? children : null}
    </Box>
  );
};

export const Support = ({ children, popup, ...props }: AuthProps) => {
  return (
    <Box
      {...(children ? { asChild: true } : {})}
      data-mode={popup ? "popup" : "embed"}
      data-o-support="1"
      suppressHydrationWarning
      {...props}
    >
      {popup ? children : null}
    </Box>
  );
};

/**
 * Tracks account-level activity in the Outseta CRM timeline.
 * Activities appear on both the account record and the CRM > Engagement dashboard.
 *
 * @example
 * <AccountActivity name="Viewed Dashboard">
 *   <Button>Dashboard</Button>
 * </AccountActivity>
 *
 * @example
 * // Or use the data attribute directly on any element:
 * <Button data-o-account-activity="Clicked Export">Export</Button>
 */
export const AccountActivity = ({
  children,
  name,
  ...props
}: AuthProps & { name: string }) => {
  return (
    <Box
      {...(children ? { asChild: true } : {})}
      data-o-account-activity={name}
      {...props}
    >
      {children}
    </Box>
  );
};

/**
 * Tracks person-level activity in the Outseta CRM timeline.
 * Activities appear on the person's record and can trigger email drip campaigns.
 *
 * @example
 * <PersonActivity name="Downloaded Ebook">
 *   <Button>Download</Button>
 * </PersonActivity>
 *
 * @example
 * // Or use the data attribute directly on any element:
 * <Button data-o-person-activity="Completed Onboarding">Done</Button>
 */
export const PersonActivity = ({
  children,
  name,
  ...props
}: AuthProps & { name: string }) => {
  return (
    <Box
      {...(children ? { asChild: true } : {})}
      data-o-person-activity={name}
      {...props}
    >
      {children}
    </Box>
  );
};

export const LogOut = ({ children, ...props }: AuthProps) => {
  return (
    <Box
      {...(children ? { asChild: true } : {})}
      data-o-logout-link="1"
      suppressHydrationWarning
      {...props}
    >
      {children}
    </Box>
  );
};
