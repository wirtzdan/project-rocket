"use client";

import { useCallback } from "react";

type EntityType = 1 | 2 | 3; // 1 = Account, 2 = Person, 3 = Deal

interface TrackActivityOptions {
  title: string;
  description?: string;
  activityData?: string;
  entityType: EntityType;
  entityUid: string;
}

export function useOutsetaActivity() {
  const trackActivity = useCallback(
    async (options: TrackActivityOptions): Promise<void> => {
      try {
        const res = await fetch("/api/outseta/activity", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            Title: options.title,
            Description: options.description,
            ActivityData: options.activityData,
            EntityType: options.entityType,
            EntityUid: options.entityUid,
          }),
        });

        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          console.error("[OutsetaActivity] Failed to track activity:", data);
        }
      } catch (error) {
        console.error("[OutsetaActivity] Error tracking activity:", error);
      }
    },
    []
  );

  return { trackActivity };
}
