import { decodeJwt } from "jose";

/**
 * Claims contained in an Outseta JWT token.
 * These can be decoded client-side for fast access checks without API calls.
 */
export interface OutsetaClaims {
  sub: string; // Person UID
  email: string;
  iss: string; // Issuer (Outseta domain)
  "outseta:planUid"?: string;
  "outseta:addOnUids"?: string[];
  [key: string]: unknown;
}

/**
 * Decodes an Outseta JWT token to extract claims.
 *
 * Note: This only decodes the token, it does NOT verify the signature.
 * Use this for UX decisions (showing/hiding UI), not security decisions.
 * For security-critical checks, verify the token server-side.
 *
 * @param token - The JWT access token from Outseta
 * @returns The decoded claims, or null if decoding fails
 */
export const decodeOutsetaToken = (token: string): OutsetaClaims | null => {
  try {
    return decodeJwt(token) as OutsetaClaims;
  } catch (error) {
    console.error("Failed to decode Outseta token:", error);
    return null;
  }
};

/**
 * Extracts the person UID (sub claim) from an Outseta token.
 *
 * @param token - The JWT access token from Outseta
 * @returns The person UID, or null if not found
 */
export const getPersonUid = (token: string | null): string | null => {
  if (!token) {
    return null;
  }
  const claims = decodeOutsetaToken(token);
  return claims?.sub ?? null;
};

/**
 * Extracts the plan UID from an Outseta token.
 *
 * @param token - The JWT access token from Outseta
 * @returns The plan UID, or null if not found
 */
export const getPlanUid = (token: string | null): string | null => {
  if (!token) {
    return null;
  }
  const claims = decodeOutsetaToken(token);
  return claims?.["outseta:planUid"] ?? null;
};

/**
 * Extracts the list of add-on UIDs from an Outseta token.
 *
 * @param token - The JWT access token from Outseta
 * @returns Array of add-on UIDs the user has access to
 */
export const getAddOnUids = (token: string | null): string[] => {
  if (!token) {
    return [];
  }
  const claims = decodeOutsetaToken(token);
  return claims?.["outseta:addOnUids"] ?? [];
};

/**
 * Checks if a user has access to a specific add-on.
 *
 * @param addOnId - The add-on UID to check access for
 * @param userAddOnUids - The user's add-on UIDs (from getAddOnUids)
 * @param isAdmin - Whether the user is an admin (admins have access to everything)
 * @returns true if the user has access to the add-on
 */
export const hasAddOnAccess = (
  addOnId: string | null | undefined,
  userAddOnUids: string[],
  isAdmin = false
): boolean => {
  // Admins have access to everything
  if (isAdmin) {
    return true;
  }

  // If no add-on is required, content is public
  if (!addOnId) {
    return true;
  }

  // Check if the user has the required add-on
  return userAddOnUids.includes(addOnId);
};

/**
 * Checks if a user has access to any of the specified add-ons.
 * Useful when content can be unlocked by multiple different add-ons.
 *
 * @param addOnIds - Comma-separated add-on UIDs or array of UIDs
 * @param userAddOnUids - The user's add-on UIDs (from getAddOnUids)
 * @param isAdmin - Whether the user is an admin (admins have access to everything)
 * @returns true if the user has access to at least one of the add-ons
 */
export const hasAnyAddOnAccess = (
  addOnIds: string | string[] | null | undefined,
  userAddOnUids: string[],
  isAdmin = false
): boolean => {
  // Admins have access to everything
  if (isAdmin) {
    return true;
  }

  // If no add-ons are required, content is public
  if (!addOnIds) {
    return true;
  }

  // Normalize to array
  const addOnArray =
    typeof addOnIds === "string"
      ? addOnIds.split(",").map((id) => id.trim())
      : addOnIds;

  // Check if user has any of the required add-ons
  return addOnArray.some((addOnId) => userAddOnUids.includes(addOnId));
};

/**
 * Checks if a user is an admin based on their person UID.
 *
 * Configure admin UIDs via the NEXT_PUBLIC_ADMIN_USER_IDS environment variable
 * (comma-separated list of person UIDs).
 *
 * @param personUid - The user's person UID (sub claim from token)
 * @returns true if the user is an admin
 */
export const isAdminUser = (personUid: string | null): boolean => {
  if (!personUid) {
    return false;
  }

  const adminUserIds = process.env.NEXT_PUBLIC_ADMIN_USER_IDS ?? "";
  const adminUids = adminUserIds
    .split(",")
    .map((id) => id.trim())
    .filter(Boolean);

  return adminUids.includes(personUid);
};
