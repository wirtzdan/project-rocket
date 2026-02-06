import { authConfig, type PlanConfig } from "@/config/auth-config";
import type { OutsetaUser } from "@/types/outseta";

/**
 * Gets a plan configuration from authConfig by its UID.
 * @param planUid - The Outseta plan UID
 * @returns The plan configuration or null if not found
 */
export function getPlanFromConfig(
  planUid: string
): (PlanConfig & { uid: string }) | null {
  const config = authConfig.plans[planUid];
  return config ? { ...config, uid: planUid } : null;
}

/**
 * Parses a comma-separated string of plan UIDs and returns plan configurations.
 * @param planUids - Comma-separated plan UIDs
 * @returns Array of plan configurations with their UIDs
 */
export function parsePlansFromConfig(
  planUids: string
): (PlanConfig & { uid: string })[] {
  return planUids
    .split(",")
    .map((uid) => uid.trim())
    .map((uid) => getPlanFromConfig(uid))
    .filter(
      (p): p is PlanConfig & { uid: string } => p !== null
    );
}

/**
 * Checks if a user has access to any of the required plans.
 * @param user - The Outseta user object
 * @param requiredPlans - Array of plan UIDs
 * @returns true if user has access to at least one of the required plans
 */
export function userHasPlanAccess(
  user: OutsetaUser | null,
  requiredPlans: string[]
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
  return requiredPlans.includes(planIdForUser);
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
