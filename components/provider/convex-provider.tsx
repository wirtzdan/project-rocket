"use client";

import { ConvexProviderWithAuth, ConvexReactClient } from "convex/react";
import { useConvexOutsetaAuth } from "@/utils/use-convex-outseta-auth";

const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;
const convex = convexUrl ? new ConvexReactClient(convexUrl) : null;

export function ConvexOutsetaProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  if (!convex) {
    return children;
  }

  return (
    <ConvexProviderWithAuth client={convex} useAuth={useConvexOutsetaAuth}>
      {children}
    </ConvexProviderWithAuth>
  );
}
