"use client";

import { decodeJwt } from "jose";
import { useCallback, useMemo } from "react";
import { useAuth } from "@/components/provider/auth-provider";

// Return null for expired tokens so Convex transitions to unauthenticated
// rather than retrying endlessly with a stale token
const TOKEN_EXPIRY_LEEWAY_SECONDS = 60;

function isTokenExpired(token: string): boolean {
  try {
    const claims = decodeJwt(token);
    if (!claims.exp) {
      return false;
    }
    const nowSeconds = Math.floor(Date.now() / 1000);
    return claims.exp - nowSeconds < TOKEN_EXPIRY_LEEWAY_SECONDS;
  } catch {
    return true;
  }
}

export function useConvexOutsetaAuth() {
  const { isAuthenticated, isLoading, getAccessToken } = useAuth();

  const fetchAccessToken = useCallback(
    async ({
      forceRefreshToken,
    }: {
      forceRefreshToken: boolean;
    }): Promise<string | null> => {
      const token = getAccessToken();

      if (!token) {
        return null;
      }

      // When Convex requests a forced refresh (e.g. after a token rejection),
      // check if the token is expired. If so, return null so Convex moves to
      // unauthenticated state instead of retrying with the same bad token.
      if (forceRefreshToken && isTokenExpired(token)) {
        return null;
      }

      return token;
    },
    [getAccessToken]
  );

  return useMemo(
    () => ({ isLoading, isAuthenticated, fetchAccessToken }),
    [isLoading, isAuthenticated, fetchAccessToken]
  );
}
