"use client";

import { useCallback } from "react";
import type { OutsetaPersonUpdate, OutsetaUser } from "@/types/outseta";

export function useOutsetaPerson() {
  const updatePerson = useCallback(
    async (
      fields: OutsetaPersonUpdate
    ): Promise<OutsetaUser | null> => {
      try {
        const res = await fetch("/api/outseta/person", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(fields),
        });

        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          console.error("[OutsetaPerson] Failed to update person:", data);
          return null;
        }

        return await res.json();
      } catch (error) {
        console.error("[OutsetaPerson] Error updating person:", error);
        return null;
      }
    },
    []
  );

  return { updatePerson };
}
