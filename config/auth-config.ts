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
    // Example add-on configurations - replace with your actual Outseta add-on UIDs
    // premium: {
    //   uid: "your-addon-uid-here",
    //   label: "Premium Features",
    // },
    // course1: {
    //   uid: "your-course-addon-uid",
    //   label: "Course 1 Access",
    // },
  } as Record<string, { uid: string; label: string }>,
};
