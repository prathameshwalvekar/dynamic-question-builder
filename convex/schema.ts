import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  questionPapers: defineTable({
    title: v.string(),
    subject: v.optional(v.string()),
    class: v.optional(v.string()),
    duration: v.optional(v.string()),
    instructions: v.array(v.string()),
    totalMarks: v.number(),
    questions: v.array(
      v.object({
        id: v.string(),
        type: v.string(),
        marks: v.number(),
        // Fill blank
        text: v.optional(v.string()),
        // Word search
        words: v.optional(v.array(v.string())),
        gridSize: v.optional(v.number()),
        instructions: v.optional(v.string()),
        // Match words
        leftColumn: v.optional(v.array(v.string())),
        rightColumn: v.optional(v.array(v.string())),
        // Identify image
        imageUrl: v.optional(v.string()),
        question: v.optional(v.string()),
        // Multiple choice
        options: v.optional(v.array(v.string())),
        // True/False
        statement: v.optional(v.string()),
        // Short/Long answer
        lines: v.optional(v.number()),
      })
    ),
    createdAt: v.number(),
    updatedAt: v.number(),
  }),
});
