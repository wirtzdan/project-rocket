import { v } from "convex/values";
import { query } from "./_generated/server";

export const getCurrentUser = query({
  args: {},
  returns: v.union(
    v.object({
      authenticated: v.literal(true),
      subject: v.string(),
      email: v.optional(v.string()),
      issuer: v.string(),
      tokenIdentifier: v.string(),
    }),
    v.object({
      authenticated: v.literal(false),
    })
  ),
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      return { authenticated: false as const };
    }

    return {
      authenticated: true as const,
      subject: identity.subject,
      email: identity.email,
      issuer: identity.issuer,
      tokenIdentifier: identity.tokenIdentifier,
    };
  },
});
