"use client";

import { useCallback } from "react";
import type { OutsetaAccountUpdate, OutsetaAccount } from "@/types/outseta";

export function useOutsetaAccount() {
  const updateAccount = useCallback(
    async (
      fields: OutsetaAccountUpdate
    ): Promise<OutsetaAccount | null> => {
      try {
        const res = await fetch("/api/outseta/account", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(fields),
        });

        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          console.error("[OutsetaAccount] Failed to update account:", data);
          return null;
        }

        return await res.json();
      } catch (error) {
        console.error("[OutsetaAccount] Error updating account:", error);
        return null;
      }
    },
    []
  );

  return { updateAccount };
}
