"use client";

import { useCallback } from "react";

interface TrackUsageOptions {
  amount: number;
  subscriptionAddOnUid: string;
  usageDate?: string;
}

export function useOutsetaUsage() {
  const trackUsage = useCallback(
    async (options: TrackUsageOptions): Promise<void> => {
      try {
        const res = await fetch("/api/outseta/usage", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            Amount: options.amount,
            SubscriptionAddOn: { Uid: options.subscriptionAddOnUid },
            UsageDate: options.usageDate,
          }),
        });

        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          console.error("[OutsetaUsage] Failed to track usage:", data);
        }
      } catch (error) {
        console.error("[OutsetaUsage] Error tracking usage:", error);
      }
    },
    []
  );

  return { trackUsage };
}
