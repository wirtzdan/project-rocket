import { projectConfig } from "@/config";
import type { OutsetaUser } from "@/types/outseta";

type Plan = Readonly<{
  uid: string;
  label: string;
}>;

/**
 * Gets a plan configuration from the project config by plan name.
 * @param planName - The plan name (e.g., "basic", "pro")
 * @returns The plan configuration or null if not found
 */
export function getPlanFromConfig(planName: string): Plan | null {
  const normalizedPlanName = planName.trim().toLowerCase();
  const configPlan =
    projectConfig.auth.plans[
      normalizedPlanName as keyof typeof projectConfig.auth.plans
    ];
  return configPlan || null;
}

/**
 * Parses a comma-separated string of plan names and returns plan configurations.
 * @param plansWithAccess - Comma-separated plan names (e.g., "basic,pro")
 * @returns Array of plan configurations
 */
export function parsePlansFromConfig(plansWithAccess: string): Plan[] {
  return plansWithAccess
    .split(",")
    .map((p) => p.trim())
    .map((planName) => getPlanFromConfig(planName))
    .filter((p): p is Plan => p !== null);
}

/**
 * Checks if a user has access to any of the required plans.
 * @param user - The Outseta user object
 * @param requiredPlans - Array of plan configurations or plan UIDs
 * @returns true if user has access to at least one of the required plans
 */
export function userHasPlanAccess(
  user: OutsetaUser | null,
  requiredPlans: Plan[] | string[]
): boolean {
  if (!user?.Account) {
    return false;
  }

  const planIdForUser = user.Account.CurrentSubscription?.Plan?.Uid;
  if (!planIdForUser) {
    return false;
  }

  // If no specific plans are required, any plan is valid
  if (requiredPlans.length === 0) {
    return true;
  }

  // Check if user's plan matches any required plan
  return requiredPlans.some((plan) => {
    const planUid = typeof plan === "string" ? plan : plan.uid;
    return planUid === planIdForUser;
  });
}

/**
 * Checks if a user has access to any of the required add-ons.
 * @param user - The Outseta user object
 * @param requiredAddOns - Comma-separated string of add-on UIDs or array of add-on UIDs
 * @returns true if user has at least one of the required add-ons
 */
export function userHasAddOnAccess(
  user: OutsetaUser | null,
  requiredAddOns: string | string[]
): boolean {
  if (!user?.Account) {
    return false;
  }

  const addOnUids = Array.isArray(requiredAddOns)
    ? requiredAddOns
    : requiredAddOns.split(",").map((a) => a.trim());

  if (addOnUids.length === 0) {
    return true;
  }

  const userAddOns = user.Account.CurrentSubscription?.SubscriptionAddOns || [];
  return userAddOns.some((subscription) =>
    addOnUids.includes(subscription.AddOn.Uid)
  );
}
