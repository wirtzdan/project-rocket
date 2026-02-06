"use client";

import { userHasAddOnAccess, userHasPlanAccess } from "@/utils/auth-helpers";
import { useAuth } from "../provider/auth-provider";

const billingStages = {
  trialing: 2,
  subscribing: 3,
  canceling: 4,
  expired: 5,
  trialExpired: 6,
  pastDue: 7,
  cancellingTrial: 8,
} as const;

type BillingStage = keyof typeof billingStages;

interface SignedInProps {
  children: React.ReactNode;
  accountStage?: BillingStage;
  plan?: string; // comma-separated plan UIDs
  addOn?: string; // comma-separated add-on UIDs
  isPrimaryContact?: boolean;
}

interface ShowProps {
  children: React.ReactNode;
  condition: boolean;
  fallback?: React.ReactNode;
}

export function SignedIn({
  children,
  accountStage,
  plan,
  addOn,
  isPrimaryContact,
}: SignedInProps) {
  const { user, isLoading } = useAuth();

  if (isLoading || !user?.Account) {
    return null;
  }

  // Check account stage
  if (
    accountStage &&
    billingStages[accountStage] !== user.Account.AccountStage
  ) {
    return null;
  }

  // Check plans (any match)
  if (plan) {
    const planUids = plan.split(",").map((p) => p.trim());
    if (!userHasPlanAccess(user, planUids)) {
      return null;
    }
  }

  // Check add-ons (any match)
  if (addOn && !userHasAddOnAccess(user, addOn)) {
    return null;
  }

  // Check primary contact
  if (isPrimaryContact && user.Email !== user.Account.PrimaryContact?.Email) {
    return null;
  }

  return <>{children}</>;
}

export function SignedOut({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();
  if (isLoading || user?.Account) {
    return null;
  }
  return <>{children}</>;
}

export function Show({ children, condition, fallback }: ShowProps) {
  if (!condition) {
    return fallback ? fallback : null;
  }
  return <>{children}</>;
}

interface HasAddOnProps {
  children: React.ReactNode;
  /** Comma-separated add-on UIDs or array of UIDs. User must have at least one. */
  addOnUids: string | string[];
  /** Content to show when user doesn't have access */
  fallback?: React.ReactNode;
}

/**
 * Renders children only if the authenticated user has at least one of the specified add-ons.
 * Admins bypass add-on checks and always see the content.
 *
 * @example
 * <HasAddOn addOnUids="addon-uid-1">
 *   <PremiumContent />
 * </HasAddOn>
 *
 * @example
 * <HasAddOn addOnUids={["addon-uid-1", "addon-uid-2"]} fallback={<UpgradePrompt />}>
 *   <PremiumContent />
 * </HasAddOn>
 */
export function HasAddOn({ children, addOnUids, fallback }: HasAddOnProps) {
  const { user, isAdmin } = useAuth();

  // Admins bypass add-on checks
  if (isAdmin) {
    return <>{children}</>;
  }

  // Not authenticated
  if (!user?.Account) {
    return fallback ?? null;
  }

  // Check add-on access
  const normalizedAddOnUids = Array.isArray(addOnUids)
    ? addOnUids
    : addOnUids.split(",").map((uid) => uid.trim());

  if (!userHasAddOnAccess(user, normalizedAddOnUids)) {
    return fallback ?? null;
  }

  return <>{children}</>;
}
