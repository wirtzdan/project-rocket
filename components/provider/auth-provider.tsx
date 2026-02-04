"use client";

import { importX509, jwtVerify } from "jose";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import posthog from "posthog-js";
import {
  createContext,
  Suspense,
  useCallback,
  useContext,
  useEffect,
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
  const initializingRef = useRef(false);

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
      const certificate = projectConfig.outsetaOptions.auth.publicKey;
      try {
        const publicKey = await importX509(certificate, "RS256");
        await jwtVerify(token, publicKey);
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

  const initializeOutseta = useCallback(() => {
    if (initializingRef.current) {
      return;
    }
    initializingRef.current = true;

    const outseta = getOutseta();
    if (!outseta) {
      initializingRef.current = false;
      return;
    }

    outsetaRef.current = outseta;

    // Wait for Outseta modules to initialize before using SDK
    let authInitialized = false;
    let nocodeInitialized = false;

    const checkInitialization = () => {
      if (authInitialized && nocodeInitialized) {
        initializeAuth();
      }
    };

    const initializeAuth = () => {
      const accessToken = searchParams.get("access_token");
      if (accessToken) {
        verifyAndSetToken(accessToken)
          .then(() => {
            const params = new URLSearchParams(searchParams);
            params.delete("access_token");
            const newUrl =
              pathname + (params.toString() ? `?${params.toString()}` : "");
            router.replace(newUrl);
          })
          .catch((error) => {
            console.error("[Auth] Error verifying token:", error);
            setStatus("ready");
          });
      } else if (outseta.getAccessToken()) {
        updateUser().catch((error) => {
          console.error("[Auth] Error updating user:", error);
          setStatus("ready");
        });
      } else {
        setStatus("ready");
      }
    };

    // Event handlers
    const handleUserUpdate = () => {
      if (outsetaRef.current?.getAccessToken()) {
        updateUser().catch((error) => {
          console.error("[Auth] Error updating user from event:", error);
        });
      }
    };

    const handleAccessTokenSet = () => {
      if (outsetaRef.current?.getAccessToken()) {
        updateUser().catch((error) => {
          console.error(
            "[Auth] Error updating user from accessToken.set:",
            error
          );
        });
      }
    };

    const handleTokenExpired = () => {
      logout();
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

    // Listen to accessToken.set event for automatic user updates
    outseta.on("accessToken.set", handleAccessTokenSet);

    // Listen to user update events
    outseta.on("subscription.update", handleUserUpdate);
    outseta.on("profile.update", handleUserUpdate);
    outseta.on("account.update", handleUserUpdate);

    // Handle token expiration
    outseta.on("nocode.expired", handleTokenExpired);

    // If modules are already initialized, proceed immediately
    // Check if we can access getUser without errors (indicates initialization)
    try {
      if (typeof outseta.getUser === "function") {
        authInitialized = true;
        nocodeInitialized = true;
        checkInitialization();
      }
    } catch {
      // Modules not ready yet, wait for events
    }
  }, [searchParams, pathname, router, updateUser, verifyAndSetToken, logout]);

  useEffect(() => {
    // Try to initialize immediately if Outseta is available
    initializeOutseta();

    // Listen for Outseta loading event
    const handleOutsetaLoaded = () => {
      initializeOutseta();
    };

    window.addEventListener("outseta:loaded", handleOutsetaLoaded);

    // Fallback timeout: if Outseta doesn't load within 10 seconds, set status to ready
    const timeoutId = setTimeout(() => {
      if (!outsetaRef.current) {
        console.warn("[Auth] Outseta SDK not available after 10 seconds");
        setStatus("ready");
      }
    }, 10_000);

    return () => {
      window.removeEventListener("outseta:loaded", handleOutsetaLoaded);
      clearTimeout(timeoutId);
    };
  }, [initializeOutseta]);

  const openLogin = (options?: Partial<OutsetaAuthOpenOptions>) => {
    outsetaRef.current?.auth.open({
      widgetMode: "login|register",
      authenticationCallbackUrl: window.location.href,
      ...options,
    });
  };

  const openSignup = (options?: Partial<OutsetaAuthOpenOptions>) => {
    outsetaRef.current?.auth.open({
      widgetMode: "register",
      authenticationCallbackUrl: window.location.href,
      ...options,
    });
  };

  const openProfile = (options?: OutsetaProfileOpenOptions) => {
    outsetaRef.current?.profile.open({ tab: "profile", ...options });
  };

  const openPlanUpgrade = (planUid: string) => {
    outsetaRef.current?.profile.open({
      tab: "planChange",
      planUid,
    });
  };

  const openPurchaseAddOn = (
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
  };

  const getAccessToken = useCallback(() => {
    return outsetaRef.current?.getAccessToken() ?? null;
  }, []);

  const isAuthenticated = !!user;
  const isAdmin = isAdminUser(user?.Uid ?? null);

  return (
    <AuthContext.Provider
      value={{
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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
