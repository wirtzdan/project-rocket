export const authConfig = {
  plans: {
    free: {
      uid: "7maOrK9E",
      label: "Free",
    },
    basic: {
      uid: "L9nqaeQZ",
      label: "Basic",
    },
    pro: {
      uid: "LmJZpYmP",
      label: "Pro",
    },
  },
  /**
   * Add-on configurations for content gating and purchases.
   * Add your Outseta add-on UIDs here.
   *
   * @example
   * // Gate content by add-on
   * <HasAddOn addOnUids={authConfig.addOns.premium.uid}>
   *   <PremiumContent />
   * </HasAddOn>
   *
   * @example
   * // Open purchase flow for an add-on
   * const { openPurchaseAddOn } = useAuth();
   * openPurchaseAddOn(authConfig.addOns.premium.uid);
   */
  addOns: {
    premium: {
      uid: "vWydg69b",
      label: "Example Add-on",
    },
  },
};
