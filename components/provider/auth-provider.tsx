"use client";

import { createRemoteJWKSet, jwtVerify } from "jose";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import posthog from "posthog-js";
import {
  createContext,
  Suspense,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { projectConfig } from "@/config";
import type {
  OutsetaAuthOpenOptions,
  OutsetaBillingRenewalTerm,
  OutsetaProfileOpenOptions,
  OutsetaSDK,
  OutsetaUser,
} from "@/types/outseta";
import { isAdminUser } from "@/utils/outseta-utils";

// Create JWKS keyset once — jose handles caching and key rotation automatically
const JWKS = createRemoteJWKSet(
  new URL(`https://${projectConfig.outsetaOptions.domain}/.well-known/jwks`)
);

interface AuthContextType {
  user: OutsetaUser | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isLoading: boolean;
  getAccessToken: () => string | null;
  logout: () => void;
  openLogin: (options?: Partial<OutsetaAuthOpenOptions>) => void;
  openSignup: (options?: Partial<OutsetaAuthOpenOptions>) => void;
  openProfile: (options?: OutsetaProfileOpenOptions) => void;
  openPlanUpgrade: (planUid: string) => void;
  openPurchaseAddOn: (
    addOnUid: string,
    billingRenewalTerm?: number | OutsetaBillingRenewalTerm
  ) => void;
}

const defaultContext: AuthContextType = {
  user: null,
  isAuthenticated: false,
  isAdmin: false,
  isLoading: true,
  getAccessToken: () => null,
  logout: () => undefined,
  openLogin: () => undefined,
  openSignup: () => undefined,
  openProfile: () => undefined,
  openPlanUpgrade: () => undefined,
  openPurchaseAddOn: () => undefined,
};

const AuthContext = createContext<AuthContextType>(defaultContext);

export function useAuth() {
  return useContext(AuthContext);
}

function getOutseta(): OutsetaSDK | null {
  if (typeof window === "undefined") {
    return null;
  }
  return window.Outseta ?? null;
}

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense>
      <AuthProviderContent>{children}</AuthProviderContent>
    </Suspense>
  );
}

function AuthProviderContent({ children }: { children: React.ReactNode }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [status, setStatus] = useState("init");
  const [user, setUser] = useState<OutsetaUser | null>(null);
  const outsetaRef = useRef<OutsetaSDK | null>(null);

  const logout = useCallback(() => {
    // Capture logout event before resetting PostHog
    posthog.capture("user_logged_out");
    posthog.reset();

    outsetaRef.current?.setAccessToken("");
    setUser(null);
    setStatus("ready");
  }, []);

  const updateUser = useCallback(async () => {
    if (!outsetaRef.current) {
      throw new Error("Outseta SDK not initialized");
    }
    try {
      const outsetaUser = await outsetaRef.current.getUser();
      setUser(outsetaUser);
      setStatus("ready");

      // Identify user in PostHog when user data is updated
      if (outsetaUser?.Uid) {
        posthog.identify(outsetaUser.Uid, {
          email: outsetaUser.Email,
          name: outsetaUser.FullName,
        });
      }

      return outsetaUser;
    } catch (error) {
      console.error("[Auth] Error updating user:", error);
      posthog.captureException(error);
      setStatus("error");
      throw error;
    }
  }, []);

  const verifyAndSetToken = useCallback(
    async (token: string) => {
      if (!outsetaRef.current) {
        throw new Error("Outseta SDK not initialized");
      }
      try {
        await jwtVerify(token, JWKS);
        outsetaRef.current.setAccessToken(token);
        return await updateUser();
      } catch (error) {
        console.error("[Auth] Token verification failed:", error);
        logout();
        throw error;
      }
    },
    [updateUser, logout]
  );

  // Guard ref to prevent duplicate event handler execution during Strict Mode remounts.
  // Outseta SDK does not expose an `off()` method, so we use this to no-op stale handlers.
  const isActiveRef = useRef(true);

  // One-time SDK setup effect: register event listeners and load existing auth state
  useEffect(() => {
    isActiveRef.current = true;
    let initialized = false;

    const setup = () => {
      if (initialized) {
        return;
      }

      const outseta = getOutseta();
      if (!outseta) {
        return;
      }

      initialized = true;
      outsetaRef.current = outseta;

      // Wait for Outseta modules to initialize before using SDK
      let authInitialized = false;
      let nocodeInitialized = false;

      const checkInitialization = () => {
        if (!isActiveRef.current) return;
        if (authInitialized && nocodeInitialized) {
          // Load existing auth state (not URL token — that's handled separately)
          if (outseta.getAccessToken()) {
            updateUser().catch((error) => {
              console.error("[Auth] Error updating user:", error);
              setStatus("ready");
            });
          } else {
            setStatus("ready");
          }
        }
      };

      // Event handlers — all guarded by isActiveRef
      const handleUserUpdate = () => {
        if (!isActiveRef.current) return;
        if (outsetaRef.current?.getAccessToken()) {
          updateUser().catch((error) => {
            console.error("[Auth] Error updating user from event:", error);
            setStatus("ready");
          });
        }
      };

      const handleAccessTokenSet = () => {
        if (!isActiveRef.current) return;
        if (outsetaRef.current?.getAccessToken()) {
          updateUser().catch((error) => {
            console.error(
              "[Auth] Error updating user from accessToken.set:",
              error
            );
            setStatus("ready");
          });
        }
      };

      // Listen to initialization events
      outseta.on("auth.initialized", () => {
        authInitialized = true;
        checkInitialization();
      });

      outseta.on("nocode.initialized", () => {
        nocodeInitialized = true;
        checkInitialization();
      });

      // Catch-up: handle the case where init events already fired before
      // our listeners were attached (race condition with sync SDK script).
      const attemptImmediateResolution = () => {
        if (!isActiveRef.current) return;
        if (authInitialized && nocodeInitialized) return;

        try {
          const token = outseta.getAccessToken();
          if (!token) {
            authInitialized = true;
            nocodeInitialized = true;
            setStatus("ready");
          } else {
            authInitialized = true;
            nocodeInitialized = true;
            updateUser().catch((error) => {
              console.error("[Auth] Immediate user load failed:", error);
              authInitialized = false;
              nocodeInitialized = false;
            });
          }
        } catch {
          // getAccessToken() threw — SDK truly not ready, wait for events
        }
      };

      attemptImmediateResolution();

      // Listen to accessToken.set event for automatic user updates
      outseta.on("accessToken.set", handleAccessTokenSet);

      // Listen to user update events with PostHog tracking
      outseta.on("subscription.update", (subscription) => {
        if (!isActiveRef.current) return;
        const sub = subscription as {
          Plan?: { Uid?: string; Name?: string };
        };
        posthog.capture("subscription_updated", {
          plan_uid: sub?.Plan?.Uid,
          plan_name: sub?.Plan?.Name,
        });
        handleUserUpdate();
      });
      outseta.on("profile.update", () => {
        if (!isActiveRef.current) return;
        posthog.capture("profile_updated");
        handleUserUpdate();
      });
      outseta.on("account.update", () => {
        if (!isActiveRef.current) return;
        posthog.capture("account_updated");
        handleUserUpdate();
      });

      // Signup events
      outseta.on("signup", (account) => {
        if (!isActiveRef.current) return;
        const acc = account as {
          Uid?: string;
          CurrentSubscription?: { Plan?: { Uid?: string; Name?: string } };
        };
        posthog.capture("user_signed_up", {
          account_uid: acc?.Uid,
          plan_uid: acc?.CurrentSubscription?.Plan?.Uid,
          plan_name: acc?.CurrentSubscription?.Plan?.Name,
        });
      });
      outseta.on("signup.preRegister", () => {
        if (!isActiveRef.current) return;
        posthog.capture("signup_started");
      });

      // Subscription lifecycle events
      outseta.on("subscription.cancel", (cancellation) => {
        if (!isActiveRef.current) return;
        const cancel = cancellation as { CancellationReason?: string };
        posthog.capture("subscription_cancelled", {
          reason: cancel?.CancellationReason,
        });
      });
      outseta.on("subscription.reopen", () => {
        if (!isActiveRef.current) return;
        posthog.capture("subscription_reopened");
      });

      // Access denied event
      outseta.on("nocode.accessDenied", () => {
        if (!isActiveRef.current) return;
        posthog.capture("access_denied", {
          path: window.location.pathname,
        });
      });

      // Handle logout triggered via data-o-logout-link (e.g., <LogOut> embed component)
      outseta.on("logout", () => {
        if (!isActiveRef.current) return;
        posthog.capture("user_logged_out");
        posthog.reset();
        setUser(null);
        setStatus("ready");
      });

      // Handle token expiration
      outseta.on("nocode.expired", () => {
        if (!isActiveRef.current) return;
        logout();
      });
    };

    // Try to initialize immediately if Outseta is available
    setup();

    // Listen for Outseta loading event
    const handleOutsetaLoaded = () => setup();
    window.addEventListener("outseta:loaded", handleOutsetaLoaded);

    // Fallback timeout: if initialization hasn't completed within 5 seconds,
    // force ready state. Uses functional updater to read latest status.
    const timeoutId = setTimeout(() => {
      setStatus((current) => {
        if (current === "init") {
          console.warn(
            "[Auth] Outseta initialization timed out, falling back to ready state"
          );
          return "ready";
        }
        return current;
      });
    }, 5_000);

    return () => {
      isActiveRef.current = false;
      window.removeEventListener("outseta:loaded", handleOutsetaLoaded);
      clearTimeout(timeoutId);
    };
  }, [updateUser, logout]);

  // Handle access_token from URL (separate from SDK init so it works on navigation)
  useEffect(() => {
    const accessToken = searchParams.get("access_token");
    if (!accessToken) {
      return;
    }

    // Clean up the access token from the URL to avoid exposing it in the address bar
    const cleanParams = new URLSearchParams(searchParams.toString());
    cleanParams.delete("access_token");
    const cleanUrl = cleanParams.toString()
      ? `${pathname}?${cleanParams.toString()}`
      : pathname;
    router.replace(cleanUrl, { scroll: false });

    // Wait for SDK to be ready before verifying token
    const tryVerify = () => {
      if (outsetaRef.current) {
        verifyAndSetToken(accessToken).catch((error) => {
          console.error("[Auth] Error verifying token:", error);
          setStatus("ready");
        });
      }
    };

    if (outsetaRef.current) {
      tryVerify();
    } else {
      // SDK not ready yet — listen for it
      const handleReady = () => tryVerify();
      window.addEventListener("outseta:loaded", handleReady);
      return () => window.removeEventListener("outseta:loaded", handleReady);
    }
  }, [searchParams, pathname, router, verifyAndSetToken]);

  const openLogin = useCallback((options?: Partial<OutsetaAuthOpenOptions>) => {
    outsetaRef.current?.auth.open({
      widgetMode: "login|register",
      ...options,
    });
  }, []);

  const openSignup = useCallback(
    (options?: Partial<OutsetaAuthOpenOptions>) => {
      outsetaRef.current?.auth.open({
        widgetMode: "register",
        ...options,
      });
    },
    []
  );

  const openProfile = useCallback((options?: OutsetaProfileOpenOptions) => {
    outsetaRef.current?.profile.open({ tab: "profile", ...options });
  }, []);

  const openPlanUpgrade = useCallback((planUid: string) => {
    outsetaRef.current?.profile.open({
      tab: "planChange",
      planUid,
    });
  }, []);

  const openPurchaseAddOn = useCallback(
    (
      addOnUid: string,
      billingRenewalTerm?: number | OutsetaBillingRenewalTerm
    ) => {
      const stateProps: {
        addOnUid: string;
        billingRenewalTerm?: number;
      } = {
        addOnUid,
      };

      // If billingRenewalTerm is a number, use it directly
      // Otherwise, convert string terms to numbers (Month=1, Year=12, OneTime=4)
      if (typeof billingRenewalTerm === "number") {
        stateProps.billingRenewalTerm = billingRenewalTerm;
      } else if (billingRenewalTerm === "Year") {
        stateProps.billingRenewalTerm = 12;
      } else if (billingRenewalTerm === "OneTime") {
        stateProps.billingRenewalTerm = 4;
      } else if (billingRenewalTerm === "Month") {
        stateProps.billingRenewalTerm = 1;
      }

      outsetaRef.current?.profile.open({
        mode: "popup",
        tab: "purchaseAddOn",
        stateProps,
      });
    },
    []
  );

  const getAccessToken = useCallback(() => {
    return outsetaRef.current?.getAccessToken() ?? null;
  }, []);

  const isAuthenticated = !!user;
  const isAdmin = isAdminUser(user?.Uid ?? null);

  const contextValue = useMemo(
    () => ({
      user,
      isAuthenticated,
      isAdmin,
      isLoading: status !== "ready",
      getAccessToken,
      logout,
      openLogin,
      openSignup,
      openProfile,
      openPlanUpgrade,
      openPurchaseAddOn,
    }),
    [
      user,
      isAuthenticated,
      isAdmin,
      status,
      getAccessToken,
      logout,
      openLogin,
      openSignup,
      openProfile,
      openPlanUpgrade,
      openPurchaseAddOn,
    ]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}
