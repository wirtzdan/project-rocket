export interface PlanConfig {
  /** Display name override. If omitted, the name from Outseta is used. */
  name?: string;
  /** Description override. If omitted, the description from Outseta is used. */
  description?: string;
  /** Mark this plan as recommended on the pricing page */
  recommended?: boolean;
  /** Feature list shown on the pricing card */
  features?: Array<{ title: string; icon: string }>;
  /** Set to true to hide this plan from the pricing page */
  hideFromPricing?: boolean;
}

export interface AddOnConfig {
  label: string;
}

export const authConfig = {
  /**
   * Plan configurations keyed by Outseta plan UID.
   *
   * Every plan listed here is the single source of truth for plan UIDs
   * across the app — used for gating, pricing display, and access checks.
   *
   * Pricing data (monthly/annual rates, currency) is loaded dynamically
   * from the Outseta API. Only the fields below are local overrides.
   */
  plans: {
    "7maOrK9E": {
      name: "Free",
      description: "For personal use",
      features: [
        { title: "1 team", icon: "team" },
        { title: "1 user", icon: "user" },
        { title: "100 MB storage", icon: "storage" },
        { title: "Basic support", icon: "help" },
      ],
    },
    L9nqaeQZ: {
      name: "Basic",
      description: "For small teams looking to get started with our platform",
      features: [
        { title: "2 teams", icon: "team" },
        { title: "3 users", icon: "user" },
        { title: "100 GB storage", icon: "storage" },
        { title: "Basic support", icon: "help" },
      ],
    },
    LmJZpYmP: {
      name: "Pro",
      hideFromPricing: true,
      description: "For teams looking to scale their operations",
      recommended: true,
      features: [
        { title: "5 teams", icon: "team" },
        { title: "10 users", icon: "user" },
        { title: "500 GB storage", icon: "storage" },
        { title: "Priority support", icon: "help" },
      ],
    },
  } as Record<string, PlanConfig>,

  /**
   * Add-on configurations for content gating and purchases.
   * Add your Outseta add-on UIDs here.
   *
   * @example
   * // Gate content by add-on
   * <HasAddOn addOnUids="vWydg69b">
   *   <PremiumContent />
   * </HasAddOn>
   *
   * @example
   * // Open purchase flow for an add-on
   * const { openPurchaseAddOn } = useAuth();
   * openPurchaseAddOn("vWydg69b");
   */
  addOns: {
    vWydg69b: {
      label: "Example Add-on",
    },
  } as Record<string, AddOnConfig>,
};

/** Helper to get all plan UIDs */
export const planUids = Object.keys(authConfig.plans);

/** Helper to get a plan config by UID */
export function getPlanConfig(uid: string): PlanConfig | undefined {
  return authConfig.plans[uid];
}
