"use client";

import { importX509, jwtVerify } from "jose";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  createContext,
  Suspense,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { projectConfig } from "@/config";
import type { OutsetaUser } from "@/types/outseta";

interface AuthContextType {
  user: OutsetaUser | null;
  isLoading: boolean;
  logout: () => void;
  openLogin: (options?: any) => void;
  openSignup: (options?: any) => void;
  openProfile: (options?: any) => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function useAuth() {
  return useContext(AuthContext);
}

function getOutseta() {
  if (typeof window === "undefined") return null;
  return (window as any).Outseta;
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
  const outsetaRef = useRef<any>(null);
  const initializingRef = useRef(false);

  const updateUser = async () => {
    try {
      const outsetaUser = await outsetaRef.current.getUser();
      setUser(outsetaUser);
      setStatus("ready");
      return outsetaUser;
    } catch (error) {
      console.error("[Auth] Error updating user:", error);
      setStatus("error");
      throw error;
    }
  };

  const verifyAndSetToken = async (token: string) => {
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
  };

  useEffect(() => {
    if (initializingRef.current) return;
    initializingRef.current = true;

    const outseta = getOutseta();
    if (!outseta) return;

    outsetaRef.current = outseta;

    const accessToken = searchParams.get("access_token");
    if (accessToken) {
      verifyAndSetToken(accessToken).then(() => {
        const params = new URLSearchParams(searchParams);
        params.delete("access_token");
        const newUrl =
          pathname + (params.toString() ? `?${params.toString()}` : "");
        router.replace(newUrl);
      });
    } else if (outseta.getAccessToken()) {
      updateUser();
    } else {
      setStatus("ready");
    }

    // Event handlers
    const handleUserUpdate = () => {
      if (outsetaRef.current?.getAccessToken()) {
        updateUser();
      }
    };

    outseta.on("subscription.update", handleUserUpdate);
    outseta.on("profile.update", handleUserUpdate);
    outseta.on("account.update", handleUserUpdate);
  }, [searchParams, pathname, router, updateUser, verifyAndSetToken]);

  const logout = () => {
    outsetaRef.current?.setAccessToken("");
    setUser(null);
    setStatus("ready");
  };

  const openLogin = (options?: any) => {
    outsetaRef.current?.auth.open({
      widgetMode: "login|register",
      authenticationCallbackUrl: window.location.href,
      ...options,
    });
  };

  const openSignup = (options?: any) => {
    outsetaRef.current?.auth.open({
      widgetMode: "register",
      authenticationCallbackUrl: window.location.href,
      ...options,
    });
  };

  const openProfile = (options?: any) => {
    outsetaRef.current?.profile.open({ tab: "profile", ...options });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading: status !== "ready",
        logout,
        openLogin,
        openSignup,
        openProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
