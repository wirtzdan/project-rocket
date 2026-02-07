import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  todos: defineTable({
    userId: v.string(),
    text: v.string(),
    completed: v.boolean(),
    createdAt: v.number(),
  }).index("by_user", ["userId"]),
});
