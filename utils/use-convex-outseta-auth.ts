"use client";

import { useCallback, useMemo } from "react";
import { useAuth } from "@/components/provider/auth-provider";

export function useConvexOutsetaAuth() {
  const { isAuthenticated, isLoading, getAccessToken } = useAuth();

  const fetchAccessToken = useCallback(
    ({
      forceRefreshToken: _forceRefreshToken,
    }: {
      forceRefreshToken: boolean;
    }) => {
      return getAccessToken();
    },
    [getAccessToken]
  );

  return useMemo(
    () => ({ isLoading, isAuthenticated, fetchAccessToken }),
    [isLoading, isAuthenticated, fetchAccessToken]
  );
}
