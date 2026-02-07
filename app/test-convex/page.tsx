"use client";

import { useQuery } from "convex/react";
import { decodeJwt } from "jose";
import { notFound } from "next/navigation";
import { useAuth } from "@/components/provider/auth-provider";
import { api } from "@/convex/_generated/api";

export default function TestConvexPage() {
  if (process.env.NODE_ENV !== "development") {
    notFound();
  }

  const { isAuthenticated, user, getAccessToken } = useAuth();
  const convexUser = useQuery(api.testAuth.getCurrentUser);

  const token = getAccessToken();
  let jwtClaims: Record<string, unknown> | null = null;
  if (token) {
    try {
      jwtClaims = decodeJwt(token) as Record<string, unknown>;
    } catch {
      // Ignore decode errors
    }
  }

  return (
    <div style={{ padding: "2rem", fontFamily: "monospace" }}>
      <h1>Convex + Outseta Auth Test</h1>

      <h2>Outseta Auth State</h2>
      <pre>
        {JSON.stringify({ isAuthenticated, user: user?.Email }, null, 2)}
      </pre>

      <h2>JWT Claims (for debugging)</h2>
      {jwtClaims ? (
        <pre>{JSON.stringify(jwtClaims, null, 2)}</pre>
      ) : (
        <p>No token available</p>
      )}

      <h2>Convex Auth State</h2>
      {convexUser === undefined ? (
        <p>Loading...</p>
      ) : (
        <pre>{JSON.stringify(convexUser, null, 2)}</pre>
      )}

      {convexUser?.authenticated === false && (
        <div style={{ color: "red", marginTop: "2rem" }}>
          <p>⚠️ Not authenticated in Convex. Check:</p>
          <ul>
            <li>Is OUTSETA_SUBDOMAIN set in Convex dashboard?</li>
            <li>
              Does the JWT aud claim match applicationID in auth.config.ts?
            </li>
            <li>Are you logged in via Outseta?</li>
          </ul>
        </div>
      )}

      {convexUser?.authenticated === true && (
        <div style={{ color: "green", marginTop: "2rem" }}>
          <p>
            ✅ Successfully authenticated! Convex can read your Outseta
            identity.
          </p>
          <p>Subject (UID): {convexUser.subject}</p>
          {convexUser.email && <p>Email: {convexUser.email}</p>}
        </div>
      )}
    </div>
  );
}
